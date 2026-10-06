# 🛡️ Y4t0x1 — Cybersecurity & CTF Writeups Blog

A modern, blazing-fast, static cybersecurity blog and CTF writeup showcase built with **Jekyll**, inspired by the clean layout of Chirpy and tailored for security researchers, bug hunters, and blue/red teamers.

Hosted for **free** on **GitHub Pages** with zero backend infrastructure.

---

## ⚡ Key Features

- **Chirpy-Inspired Three-Column Layout**:
  - **Left Sidebar**: Profile avatar, handle, navigation items, theme switcher, and social links.
  - **Main Content**: Dynamic hero terminal, interactive toolbar with real-time filters and search, and writeup cards.
  - **Right Panel (Desktop)**: Recent writeups, trending tags, and an auto-generated Table of Contents with scrollspy on writeup articles.
- **Cool Minimal Blue & Teal Aesthetic**: Tailored color palette designed for terminal lovers, featuring dark mode by default with an instant light/dark toggle (persisted via `localStorage` with zero flash on load).
- **Instant Client-Side Filtering & Search**:
  - Filter by **Category**, **Tag**, **Difficulty** (`Easy`, `Medium`, `Hard`, `Insane`), and free-text keywords without page reloads.
  - Global search dropdown (`search.json`) accessible via keyboard shortcut `/` or <kbd>Ctrl</kbd>+<kbd>K</kbd>.
  - Deep-linkable URL filters (e.g., `/?category=threat-hunting&difficulty=medium#writeups`).
- **Rich Technical Writeup Experience**:
  - Auto-generated **Table of Contents** with real-time scrollspy.
  - Direct **Heading Anchor links** for sharing deep links.
  - Syntax-highlighted code blocks with detected language badges and one-click **Copy to Clipboard**.
  - GitHub-style colored **Callout Boxes** (`info`, `tip`, `warning`, `danger`).
  - Native **Image Lightbox** (click to zoom full-screen).
- **Zero-Config GitHub Pages Deployment**:
  - Custom GitHub Actions workflow with `actions/configure-pages@v5` that automatically configures the `baseurl` whether your repository is named `<username>.github.io` (user site) or `writeups` (project site).
- **SEO & Social Cards**: Semantic HTML5, Schema.org `BlogPosting` JSON-LD, OpenGraph, Twitter Cards, Atom RSS Feed (`/feed.xml`), and `sitemap.xml`.

---

## 📂 Project Structure

```text
.
├── .github/
│   └── workflows/
│       └── pages.yml              # Automated GitHub Pages build & deploy workflow
├── _data/
│   ├── difficulties.yml           # Ordered difficulty levels for dropdown
│   └── navigation.yml             # Sidebar navigation links
├── _includes/
│   ├── difficulty.html            # Colored difficulty meter badge
│   ├── footer.html                # Site footer & Back-to-Top trigger
│   ├── head.html                  # HTML head, typography, pre-render theme script
│   ├── icon.html                  # Lightweight inline SVG icons
│   ├── panel.html                 # Right sidebar widgets (recent posts, tags)
│   ├── seo.html                   # OpenGraph, Twitter cards & JSON-LD metadata
│   ├── sidebar.html               # Off-canvas / sticky left sidebar
│   ├── social-links.html          # Contact & profile links (with email anti-scraper)
│   ├── topbar.html                # Sticky header bar with breadcrumb & search
│   └── writeup-card.html          # Card component with data attributes for filtering
├── _layouts/
│   ├── default.html               # Base HTML shell
│   ├── home.html                  # Homepage layout (hero, filter bar, card grid)
│   ├── page.html                  # Generic page layout
│   └── writeup.html               # Article layout (meta box, TOC, prose, nav)
├── _sass/
│   ├── _base.scss                 # Base typography, reset, buttons, chips, difficulty
│   ├── _home.scss                 # Hero animated grid, terminal widget, filter bar
│   ├── _layout.scss               # Shell responsive grid (sidebar, topbar, panel)
│   ├── _pages.scss                # Category, tag, archive timeline, and about styles
│   ├── _syntax.scss               # Custom Rouge syntax theme (switches with dark/light)
│   ├── _tokens.scss               # Central color & font design tokens
│   └── _writeup.scss              # Prose styles, code header, callout boxes, lightbox
├── _writeups/                     # 📝 Put your Markdown writeup files here!
│   ├── 2026-04-02-picoctf-elliptic-vault.md
│   ├── 2026-05-14-htb-sandworm-prototype-pollution.md
│   └── 2026-06-20-operation-phantom-stealer-threat-hunt.md
├── assets/
│   ├── css/
│   │   └── main.scss              # SCSS entrypoint compiled by Jekyll
│   ├── img/
│   │   ├── avatar.svg             # Cyber monogram avatar
│   │   ├── favicon.svg            # Site favicon
│   │   └── og-default.svg         # Default OpenGraph preview image
│   └── js/
│       ├── home.js                # Instant filtering, chip selection, URL sync
│       ├── main.js                # Theme switcher, drawer menu, global search, back-to-top
│       └── writeup.js             # TOC builder, code copy button, image lightbox
├── .gitignore
├── 404.html                       # Themed 404 terminal page
├── _config.yml                    # Main Jekyll configuration (branding, social links)
├── about.md                       # About page & contact card list
├── archives.html                  # Year-by-year chronological timeline
├── categories.html                # Grouped listing by category
├── feed.xml                       # Atom RSS feed
├── Gemfile                        # Ruby gem dependencies
├── index.html                     # Homepage entrypoint
├── README.md                      # Documentation & deployment guide
├── robots.txt                     # Crawler directives & sitemap pointer
├── search.json                    # Full-text JSON index generated at build time
└── tags.html                      # Grouped listing by tag
```

---

## ✍️ How to Add a New Writeup

All writeups live as Markdown (`.md`) files inside the **`_writeups/`** folder.

### 1. File Naming Convention
Name files using `YYYY-MM-DD-slug.md`, for example:
```text
_writeups/2026-07-15-htb-cozyhosting-rce.md
```

### 2. Frontmatter Template
Every writeup must start with frontmatter enclosed in `---`:

```yaml
---
title: "HackTheBox CozyHosting — Session Hijacking to Spring Boot RCE"
date: 2026-07-15 14:00:00 +0300
category: "Web Exploitation"
difficulty: medium          # easy | medium | hard | insane
platform: "HackTheBox"       # TryHackMe | HackTheBox | CyberDefenders | picoCTF | etc.
tags:
  - web
  - spring-boot
  - cookie-theft
  - postgresql
  - linux
summary: "Extracting session tokens from unprotected Actuator endpoints and injecting command payloads via PostgreSQL maintenance queries."
---
```

### 3. Frontmatter Fields Reference

| Field | Required | Description | Example |
| :--- | :---: | :--- | :--- |
| `title` | **Yes** | Post headline displayed on card and page | `"HTB CyberLab Walkthrough"` |
| `date` | **Yes** | Publication date (`YYYY-MM-DD HH:MM:SS ±HHMM`) | `2026-07-15 14:00:00 +0300` |
| `category` | **Yes** | Primary category for filtering and badges | `"Threat Hunting"`, `"Web Exploitation"` |
| `difficulty` | **Yes** | `easy`, `medium`, `hard`, or `insane` | `medium` |
| `platform` | **No** | CTF platform / event name | `"HackTheBox"`, `"CyberDefenders"` |
| `tags` | **Yes** | Array of search tags | `[sqli, rce, linux]` |
| `summary` | **Yes** | 1-2 sentence preview text for cards & SEO meta tags | `"Exploiting SQL injection in..."` |
| `image` | **No** | Optional custom card banner URL | `"/assets/img/posts/banner.png"` |
| `toc` | **No** | Set to `false` to disable table of contents | `false` (default is `true`) |

---

## 🎨 Markdown Formatting Features

### Colored Callout / Alert Boxes
Add a class identifier directly after a blockquote:

```markdown
> ℹ **Info Box:** Useful context or challenge scenario details.
{: .callout-info }

> ✓ **Pro Tip:** Time-saving flags and methodology tricks.
{: .callout-tip }

> ⚠ **Warning:** Potential rabbit holes or common pitfalls.
{: .callout-warning }

> ✕ **Danger:** Destructive commands or irreversible operations.
{: .callout-danger }
```

### Code Blocks with Copy Button & Language Badge
Fenced code blocks are automatically decorated with syntax highlighting, a language tag badge, and an interactive **Copy** button:

````markdown
```powershell
# Extracting malicious scheduled tasks
Get-ScheduledTask | Where-Object { $_.TaskPath -like "*OracleCache*" }
```
````

### Responsive Tables
Tables automatically receive responsive wrappers with alternating row hovers:

```markdown
| Artifact | Value | Notes |
| :--- | :--- | :--- |
| C2 IP | `198.51.100.42` | Port 8080 |
| SHA-256 | `e3b0c44298fc...` | Dropped stage2 binary |
```

### Click-to-Zoom Images with Captions
Images rendered in writeups are automatically wired up to the full-screen lightbox:

```markdown
![Process tree showing PowerShell spawning from explorer](/assets/img/posts/process-tree.png)
_Figure 1: Malicious process execution tree reconstructed via Sysmon._
```

---

## 🚀 Step-by-Step GitHub Pages Deployment

### Option A: User Site (Served at root `https://<username>.github.io`)

1. **Create a GitHub repository** named exactly:
   ```text
   <your-username>.github.io
   ```
2. **Push this codebase** to the `main` branch:
   ```bash
   git init
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git add .
   git commit -m "Initial commit: Y4t0x1 CTF Blog"
   git push -u origin main
   ```
3. **Enable GitHub Actions Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** ➔ **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** ➔ **Source**, select:
     ```text
     GitHub Actions
     ```
4. **Trigger Deployment**:
   - The included workflow file [`.github/workflows/pages.yml`](file:///.github/workflows/pages.yml) will trigger automatically on your push.
   - Once the action completes (typically 30–60 seconds), your site will be live at `https://<your-username>.github.io`!

---

### Option B: Project Site (Served at subpath `https://<username>.github.io/<repo-name>`)

If your repository has another name (for example, `writeups` or `blog`):

1. **Push your code** to the repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. **No manual URL hacks needed!**
   The workflow [`.github/workflows/pages.yml`](file:///.github/workflows/pages.yml) uses:
   ```yaml
   - name: Setup Pages
     id: pages
     uses: actions/configure-pages@v5

   - name: Build with Jekyll
     run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
   ```
   GitHub Actions automatically detects the project subpath (`/<repo-name>`) and injects it into all relative links, CSS, JavaScript, and assets at build time!
3. Enable **Settings** ➔ **Pages** ➔ **Source**: `GitHub Actions`.

---

## 💻 Running & Testing Locally

### Prerequisites
- **Ruby** (v3.1+) & **Bundler**

### Quick Start

```bash
# 1. Install dependencies
bundle install

# 2. Start local development server with live reloading
bundle exec jekyll serve --livereload
```

Open your browser at:
```text
http://127.0.0.1:4000
```

> 💡 **Tip for Windows Users:** The `Gemfile` already includes `tzinfo` and `tzinfo-data` required by Jekyll on Windows environments.

---

## 🛠️ Personalization & Branding

All branding is centralized in two easy-to-edit files:

### 1. Identity & Socials (`_config.yml`)
Open `_config.yml` to change:
- `title`: Your handle or site name (e.g. `Y4t0x1`).
- `tagline`: Your motto or subtitle.
- `author.name` & `author.bio`: Your description.
- `social`: URLs for your GitHub, LinkedIn, Discord, and Email.

### 2. Colors & Visual Theme (`_sass/_tokens.scss`)
To modify the blue/teal palette or switch to purple/cyberpunk or terminal-green, update the CSS variables in `_sass/_tokens.scss`:

```scss
--accent: #2dd4bf;          /* Teal highlight */
--accent-2: #38bdf8;        /* Sky blue highlight */
--gradient: linear-gradient(120deg, #2dd4bf 0%, #38bdf8 100%);
```

---

## 📜 License

Created with ❤️ for the cybersecurity community. You are free to adapt, extend, and publish your own writeups under the [MIT License](https://opensource.org/licenses/MIT).
