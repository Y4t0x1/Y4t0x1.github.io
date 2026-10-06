---
title: About
permalink: /about/
description: Who I am, what I'm learning, and how to reach me.
---

<div class="about-intro">
  <img class="about-avatar" src="{{ site.author.avatar | relative_url }}" width="120" height="120" alt="{{ site.author.name }} logo">
  <div>
    <p class="about-handle">@{{ site.author.name }}</p>
    <p>{{ site.author.bio }}</p>
  </div>
</div>

## Hi, I'm Y4t0x1 👋

I'm a security enthusiast who learns best by doing. This site is my public notebook: every writeup walks through how I approached a challenge, including the rabbit holes, so you can learn from my process and not just copy the final payload.

<!-- ✏️ Replace the placeholder text below with your own story. -->

## What I focus on

- **Web exploitation**: injection bugs, auth flaws, SSRF, template injection
- **Digital forensics & incident response**: PCAPs, memory images, log analysis
- **Linux & Windows privilege escalation**
- **Crypto & reversing** for CTF challenges

## Toolbox

`nmap` · `ffuf` · `Burp Suite` · `Wireshark` · `pwntools` · `Ghidra` · `Volatility` · `CyberChef`

## Platforms

I play regularly on CTF platforms and build my own vulnerable labs with Docker. Writeups for **active** challenges are only published after they retire, in line with each platform's rules.

## Contact

Got feedback, found a mistake, or want to team up for a CTF? Reach out:

{% include social-links.html style="cards" %}
