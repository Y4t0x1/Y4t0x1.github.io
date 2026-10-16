/**
 * Normalized CV data model — single source of truth for the portfolio.
 * Every value below is extracted verbatim (or neutrally normalized) from
 * "Hossam Hassan Mohamed.pdf". Placeholders are explicit and marked [BRACKETS].
 */

export type ExperienceEntry = {
  id: string;
  organization: string;
  program: string;
  kind: "training" | "employment";
  format: string;
  start: string;
  end: string;
  location: string;
  bullets: string[];
  period?: string;
  mode?: "remote" | "onsite" | "hybrid";
  mostRecent?: boolean;
  role?: string;
  kindBadge?: string;
  tags?: string[];
};

export type CapabilityGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export type ToolCategory = {
  id: string;
  title: string;
  tools: string[];
};

export type Credential = {
  name: string;
  issuer: string;
};

export type Course = {
  name: string;
  issuer: string;
};

export type ProjectCard = {
  id: string;
  category: string;
  title: string;
  badge: "Lab" | "Training Exercise" | "Security Research";
  summary: string;
  focusAreas: string[];
  tools: string[];
  details: {
    objective: string;
    environment: string;
    approach: string;
    findings: string;
    remediation: string;
    lessons: string;
  };
};

export type MethodologyStep = {
  step: string;
  title: string;
  description: string;
};

export const identity = {
  name: "Hossam Hassan Mohamed",
  title: "Junior Penetration Tester",
  location: "Cairo, Egypt",
  email: "Hossam.sec@outlook.com",
  phone: "+201021697952",
  linkedinUrl: "https://linkedin.com/in/hossam-mohamed-sec",
  linkedinLabel: "linkedin.com/in/hossam-mohamed-sec",
  githubUrl: null as string | null, // [ADD GITHUB URL]
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const profile =
  "Penetration testing hands-on experience across web, mobile, and infrastructure security assessment. Skilled in identifying, exploiting, and reporting vulnerabilities with Burp Suite in Linux-based environments, with a strong grounding in offensive security methodologies, authentication flaws, and common attack vectors against web and network targets.";

export const positioning =
  "Junior Penetration Tester focused on finding, exploiting, and clearly reporting security weaknesses across web applications, APIs, Android apps, and network infrastructure — built on intensive lab-based training and a formal information technology education.";

export const heroChips = [
  "Web & API Security",
  "Active Directory",
  "Android Security",
  "Network Pentesting",
  "Exploit Fundamentals",
  "Technical Reporting",
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "web-api",
    title: "Web & API Security",
    description:
      "Application-layer testing covering injection, broken access control, session handling, and business logic across web apps and REST APIs.",
    items: [
      "OWASP Top 10",
      "REST APIs",
      "JWT/OAuth",
      "Auth & Session Testing",
      "Business Logic",
      "SQL Injection",
      "XSS",
      "IDOR",
      "SSRF",
      "Authentication Bypass",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Network Security",
    description:
      "Network and service-level assessment, exploitation of common enterprise protocols, and host privilege escalation.",
    items: [
      "Network Pentesting",
      "Privilege Escalation",
      "Lateral Movement",
      "MSSQL",
      "SMB",
      "PsExec",
    ],
  },
  {
    id: "active-directory",
    title: "Active Directory",
    description:
      "Domain attack-path techniques practiced in lab environments, from credential exposure to post-compromise movement.",
    items: [
      "Kerberoasting",
      "AS-REP Roasting",
      "Pass-the-Hash",
      "Privilege Escalation",
      "Lateral Movement",
      "Attack-Path Mapping",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Security",
    description:
      "Android-focused assessment: static analysis of packaged apps and runtime traffic inspection with pinning bypass.",
    items: ["Android Security Testing", "APK Reverse Engineering", "SSL Pinning Bypass"],
  },
  {
    id: "exploit-dev",
    title: "Exploit Development",
    description:
      "Fundamentals of memory-corruption exploitation on Windows and Linux targets.",
    items: ["Stack-based Buffer Overflow", "Windows Exploitation Fundamentals", "Linux Exploitation Fundamentals"],
  },
  {
    id: "defensive",
    title: "Security Operations / Defensive Exposure",
    description:
      "Defensive-side training that grounds reporting in how SOC teams detect, triage, and respond.",
    items: [
      "SOC Workflows",
      "SIEM Monitoring",
      "Incident Response",
      "Threat Detection",
      "Vulnerability Assessment",
      "Security Reporting & Documentation",
    ],
  },
];

export const toolkit: ToolCategory[] = [
  {
    id: "web",
    title: "Web & API Testing",
    tools: ["Burp Suite", "ffuf", "sqlmap"],
  },
  {
    id: "network",
    title: "Network & Exploitation",
    tools: ["Nmap", "Metasploit", "Wireshark"],
  },
  {
    id: "mobile",
    title: "Mobile & Reverse Engineering",
    tools: ["JADX", "ADB", "Frida", "Ghidra"],
  },
  {
    id: "ad",
    title: "Active Directory",
    tools: ["BloodHound", "Metasploit"],
  },
  {
    id: "environment",
    title: "Working Environment",
    tools: ["Linux-based testing", "Reporting & documentation"],
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "tech-biz",
    organization: "Tech Biz Security",
    program: "Cyber Security Program",
    role: "Cyber Security Program",
    kind: "training",
    kindBadge: "Program",
    format: "Training program",
    start: "08/2026",
    end: "09/2026",
    period: "Aug 2026 — Sep 2026",
    location: "Remote",
    mode: "remote",
    mostRecent: true,
    bullets: [
      "Receiving hands-on training in Security Operations Center (SOC) workflows, SIEM monitoring, and Incident Response.",
      "Developing practical skills in Vulnerability Assessment, Web Application Security, and Penetration Testing methodologies.",
      "Performing cybersecurity labs and real-world security exercises focused on threat detection and defensive operations.",
      "Strengthening technical reporting, documentation, and security analysis skills under industry mentorship.",
    ],
    tags: ["SOC", "SIEM", "Incident Response", "Vulnerability Assessment", "Threat Detection"],
  },
  {
    id: "we-innovate",
    organization: "We Innovate",
    program: "Cyber Security Bootcamp",
    role: "Cyber Security Bootcamp",
    kind: "training",
    kindBadge: "Bootcamp",
    format: "Bootcamp — lab environment",
    start: "09/2024",
    end: "12/2024",
    period: "Sep 2024 — Dec 2024",
    location: "Cairo",
    mode: "onsite",
    bullets: [
      "Performed web, mobile, and infrastructure penetration testing in lab environments, exploiting vulnerabilities including SQLi, XSS, IDOR, SSRF, authentication bypass, privilege escalation, and AD attacks.",
      "Web application testing using Burp Suite",
      "APK reverse engineering & SSL pinning bypass",
      "Network/service exploitation (MSSQL, SMB, PsExec)",
      "Buffer overflow fundamentals (Windows/Linux)",
    ],
    tags: [
      "Burp Suite",
      "APK Reverse Engineering",
      "SSL Pinning Bypass",
      "MSSQL",
      "SMB",
      "PsExec",
      "Buffer Overflow",
    ],
  },
  {
    id: "iti",
    organization: "Information Technology Institute (ITI)",
    program: "Network Security Program — Winter Training",
    role: "Network Security Program — Winter Training",
    kind: "training",
    kindBadge: "Training",
    format: "Winter training",
    start: "01/2023",
    end: "02/2023",
    period: "Jan 2023 — Feb 2023",
    location: "Cairo / Remote",
    mode: "hybrid",
    bullets: [
      "Studied computer networking fundamentals and TCP/IP concepts.",
      "Learned network security principles and defensive security controls.",
      "Completed hands-on ethical hacking and penetration testing labs.",
    ],
    tags: ["Networking Fundamentals", "TCP/IP", "Defensive Controls", "Ethical Hacking Labs"],
  },
];

export const experienceNote =
  "Lab and training environments throughout — assessment practice across web, mobile, infrastructure and Active Directory, plus SOC-side detection and reporting.";

export const employment: ExperienceEntry[] = [
  // [ADD PROFESSIONAL EMPLOYMENT] — the CV documents no formal employment history.
];

export const certifications: Credential[] = [
  { name: "CC - Certified In Cybersecurity", issuer: "(ISC)2" },
  { name: "Certified AppSec Practitioner v2 (CAP)", issuer: "The SecOps Group" },
  { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group" },
  { name: "Certified Social Engineering Defense Practitioner (CSEDP)", issuer: "The SecOps Group" },
  { name: "Cisco CyberOps Associate Badge", issuer: "Cisco Networking Academy" },
];

export const courses: Course[] = [
  { name: "Web Application Penetration Testing Professional", issuer: "INE" },
  { name: "HCIA-Security V4.0", issuer: "Huawei ICT Academy" },
  { name: "Android App Hacking - Black Belt Edition", issuer: "Udemy" },
  { name: "Advanced Bug Bounty Secrets", issuer: "Udemy" },
  { name: "Offensive Security PEN-200 (OSCP Course Content)", issuer: "OffSec" },
  { name: "Practical Bug Bounty", issuer: "TCM Security" },
  { name: "Practical Ethical Hacking", issuer: "TCM Security" },
  { name: "SC-200 Microsoft Security Operations Analyst Course & SIMs", issuer: "Udemy" },
];

export const education = {
  degree: "B.Sc. Information Technology",
  institution: "The Egyptian E-Learning University",
  period: "2020 – 2024",
  location: "Cairo, Egypt",
  gpa: "3.5 / 4",
};

export const languages = [
  { name: "Arabic", level: "Native/Bilingual" },
  { name: "English", level: "Proficient" },
];

export const projects: ProjectCard[] = [
  {
    id: "web-app-security",
    category: "Web Application Security",
    title: "Web application vulnerability assessment lab track",
    badge: "Training Exercise",
    summary:
      "Lab-based web application testing covering injection, access-control, and authentication flaws against deliberately vulnerable targets.",
    focusAreas: ["SQL Injection", "XSS", "IDOR", "SSRF", "Authentication Bypass", "Business Logic"],
    tools: ["Burp Suite", "ffuf", "sqlmap"],
    details: {
      objective:
        "Identify, exploit, and document common OWASP Top 10 weaknesses in an authorized lab environment.",
      environment:
        "Isolated training lab — We Innovate Cyber Security Bootcamp (09/2024 – 12/2024). [ADD TARGET APP NAMES]",
      approach:
        "Proxy-based interception and request tampering with Burp Suite, content discovery with ffuf, and injection validation with sqlmap, following a recon → enumeration → exploitation → reporting flow.",
      findings: "[ADD FINDINGS — vulnerability classes confirmed in the lab, with reproduction steps]",
      remediation: "[ADD REMEDIATION — fixes recommended for each finding class]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
  {
    id: "android-security",
    category: "Android Security",
    title: "APK reverse engineering & SSL pinning bypass",
    badge: "Training Exercise",
    summary:
      "Static and dynamic Android assessment: decompiling packaged applications and intercepting pinned HTTPS traffic.",
    focusAreas: ["APK Reverse Engineering", "SSL Pinning Bypass", "Traffic Interception", "Secret Discovery"],
    tools: ["JADX", "ADB", "Frida"],
    details: {
      objective:
        "Recover client-side logic and secrets from an APK, then bypass certificate pinning to inspect live traffic.",
      environment:
        "Training lab Android application on an emulated/physical device. [ADD APP / LAB NAME]",
      approach:
        "Decompile with JADX, enumerate components and exported surfaces, then instrument the running process with Frida to disable pinning before proxy capture.",
      findings: "[ADD FINDINGS — hardcoded secrets, exported components, insecure storage]",
      remediation: "[ADD REMEDIATION]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
  {
    id: "active-directory",
    category: "Active Directory",
    title: "Active Directory attack-path exercises",
    badge: "Lab",
    summary:
      "Domain escalation and movement techniques practiced in a controlled lab: Kerberoasting, AS-REP roasting, Pass-the-Hash, and lateral movement.",
    focusAreas: ["Kerberoasting", "AS-REP Roasting", "Pass-the-Hash", "Privilege Escalation", "Lateral Movement"],
    tools: ["BloodHound", "Metasploit", "BloodHound attack-path mapping"],
    details: {
      objective:
        "Map an attack path from a standard domain user to elevated privileges and demonstrate lateral movement.",
      environment:
        "Isolated Active Directory lab. [ADD LAB NAME / DOMAIN SCENARIO]",
      approach:
        "Collect domain data with BloodHound, request service-ticket material via Kerberoasting, target AS-REP-prone accounts, replay captured hashes, and move laterally with PsExec-style execution.",
      findings: "[ADD FINDINGS — paths found, accounts escalated]",
      remediation: "[ADD REMEDIATION — hardening recommendations]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
  {
    id: "network-exploitation",
    category: "Network Exploitation",
    title: "Network service exploitation exercises",
    badge: "Training Exercise",
    summary:
      "Service discovery and exploitation against common enterprise network services in a lab range.",
    focusAreas: ["Service Enumeration", "MSSQL", "SMB", "PsExec", "Traffic Analysis"],
    tools: ["Nmap", "Metasploit", "Wireshark"],
    details: {
      objective:
        "Enumerate live hosts and services, identify exploitable configurations, and gain controlled access.",
      environment: "Training lab network range. [ADD LAB NAME]",
      approach:
        "Host and port discovery with Nmap, protocol analysis with Wireshark, and module-based exploitation with Metasploit against MSSQL and SMB services.",
      findings: "[ADD FINDINGS]",
      remediation: "[ADD REMEDIATION]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
  {
    id: "exploit-development",
    category: "Exploit Development",
    title: "Stack-based buffer overflow fundamentals",
    badge: "Lab",
    summary:
      "Memory-corruption fundamentals: crashing a vulnerable binary, controlling execution flow, and building a proof-of-concept on Windows and Linux.",
    focusAreas: ["Stack-based Buffer Overflow", "EIP/RIP Control", "Proof-of-Concept Development"],
    tools: ["Ghidra", "Debugger tooling"],
    details: {
      objective:
        "Understand how a stack overflow becomes code execution, from crash to controlled PoC.",
      environment:
        "Deliberately vulnerable training binaries (Windows/Linux). [ADD BINARY / COURSE REFERENCE]",
      approach:
        "Analyze the binary in Ghidra, locate the overflow, control the saved return address, and document offset discovery.",
      findings: "[ADD FINDINGS — offsets, constraints]",
      remediation: "[ADD REMEDIATION — mitigations observed: canary, NX, ASLR]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
  {
    id: "template",
    category: "Future Case Study",
    title: "[ADD PROJECT TITLE]",
    badge: "Security Research",
    summary:
      "[ADD PROJECT DETAILS — a short, factual description of the scope, target type, and your role. Only publish work you are authorized to describe.]",
    focusAreas: ["[ADD FOCUS AREAS]"],
    tools: ["[ADD TOOLS]"],
    details: {
      objective: "[ADD OBJECTIVE]",
      environment: "[ADD ENVIRONMENT — lab, CTF, research, or authorized engagement]",
      approach: "[ADD METHODOLOGY NOTES]",
      findings: "[ADD FINDINGS]",
      remediation: "[ADD REMEDIATION]",
      lessons: "[ADD LESSONS LEARNED]",
    },
  },
];

export const methodology: MethodologyStep[] = [
  {
    step: "01",
    title: "Reconnaissance",
    description: "Scope review, target profiling, and source gathering before touching the target.",
  },
  {
    step: "02",
    title: "Enumeration",
    description: "Hosts, services, endpoints, and content discovery to build the attack surface map.",
  },
  {
    step: "03",
    title: "Vulnerability Analysis",
    description: "Correlating observed behavior with known weakness classes and misconfigurations.",
  },
  {
    step: "04",
    title: "Exploitation",
    description: "Controlled proof-of-concept validation of confirmed weaknesses in authorized environments.",
  },
  {
    step: "05",
    title: "Privilege Escalation",
    description: "Windows, Linux, and Active Directory elevation paths from the initial foothold.",
  },
  {
    step: "06",
    title: "Post-Exploitation",
    description: "Lateral movement, impact assessment, and evidence collection while staying in scope.",
  },
  {
    step: "07",
    title: "Reporting",
    description: "Reproducible steps, risk-rated findings, remediation guidance, and clear documentation.",
  },
];

export const navLinks: { href: string; label: string; external?: boolean }[] = [
  { href: "#about", label: "About" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#toolkit", label: "Toolkit" },
  { href: "#experience", label: "Experience" },
  { href: "#certifications", label: "Credentials" },
  { href: "#work", label: "Work" },
  { href: "https://y4t0x1.github.io/blog", label: "Writeups", external: true },
  { href: "#methodology", label: "Methodology" },
  { href: "#contact", label: "Contact" },
];
