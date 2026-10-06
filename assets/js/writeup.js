/**
 * Writeup post scripts:
 * - Dynamic Table of Contents generation with IntersectionObserver scrollspy
 * - Header anchor link generation
 * - Code block header with language badge & copy-to-clipboard button
 * - Click-to-zoom Image Lightbox
 */

(function () {
  "use strict";

  const content = document.getElementById("writeup-content");
  if (!content) return;

  // ==========================================
  // 1. Table of Contents & Heading Anchors
  // ==========================================
  const headings = Array.from(content.querySelectorAll("h2, h3, h4"));
  const desktopToc = document.getElementById("toc");
  const desktopTocWrap = document.getElementById("toc-wrap");
  const mobileToc = document.getElementById("toc-mobile");
  const mobileTocWrap = document.getElementById("toc-mobile-wrap");

  if (headings.length > 0) {
    function slugify(text) {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }

    const tocFragment = document.createDocumentFragment();
    let currentH2List = null;

    headings.forEach((heading, idx) => {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = slugify(heading.textContent) || `section-${idx}`;
      }

      // Add clickable anchor link beside the heading
      const anchor = document.createElement("a");
      anchor.className = "heading-anchor";
      anchor.href = `#${heading.id}`;
      anchor.setAttribute("aria-label", `Link to ${heading.textContent}`);
      anchor.textContent = "#";
      heading.appendChild(anchor);

      // Build TOC item
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `#${heading.id}`;
      a.textContent = heading.textContent.replace(/#$/, "").trim();

      const level = heading.tagName.toLowerCase();

      if (level === "h2") {
        li.appendChild(a);
        const subList = document.createElement("ol");
        li.appendChild(subList);
        currentH2List = subList;
        tocFragment.appendChild(li);
      } else if (level === "h3" && currentH2List) {
        li.appendChild(a);
        currentH2List.appendChild(li);
      } else {
        li.appendChild(a);
        tocFragment.appendChild(li);
      }
    });

    if (desktopToc) {
      desktopToc.appendChild(tocFragment.cloneNode(true));
      if (desktopTocWrap) desktopTocWrap.hidden = false;
    }
    if (mobileToc) {
      mobileToc.appendChild(tocFragment.cloneNode(true));
      if (mobileTocWrap) mobileTocWrap.hidden = false;
    }

    // ScrollSpy using IntersectionObserver
    const tocLinks = document.querySelectorAll(".toc-list a");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach((link) => {
              const matches = link.getAttribute("href") === `#${id}`;
              link.classList.toggle("is-active", matches);
            });
          }
        });
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 }
    );

    headings.forEach(h => observer.observe(h));
  }

  // ==========================================
  // 2. Code Block Headers & Copy Button
  // ==========================================
  const codeBlocks = content.querySelectorAll("div.highlighter-rouge, figure.highlight, pre");

  codeBlocks.forEach((block) => {
    // Avoid double-wrapping
    if (block.closest(".code-wrapper") || block.querySelector(".code-header")) return;

    let pre = block.tagName === "PRE" ? block : block.querySelector("pre");
    if (!pre) return;

    // Detect language
    let lang = "code";
    const classes = (block.className + " " + (pre.className || "")).split(/\s+/);
    for (const cls of classes) {
      if (cls.startsWith("language-")) {
        lang = cls.replace("language-", "");
        break;
      }
    }

    // Construct header
    const header = document.createElement("div");
    header.className = "code-header";

    const langBadge = document.createElement("span");
    langBadge.className = "code-lang";
    langBadge.textContent = lang;

    const copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "copy-btn";
    copyBtn.setAttribute("aria-label", "Copy code to clipboard");
    copyBtn.innerHTML = `
      <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy</span>
    `;

    copyBtn.addEventListener("click", async () => {
      const codeText = pre.querySelector("code") ? pre.querySelector("code").innerText : pre.innerText;
      try {
        await navigator.clipboard.writeText(codeText);
        copyBtn.classList.add("is-copied");
        copyBtn.innerHTML = `
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.classList.remove("is-copied");
          copyBtn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy</span>
          `;
        }, 2000);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    });

    header.appendChild(langBadge);
    header.appendChild(copyBtn);

    // Insert header before pre
    pre.parentNode.insertBefore(header, pre);
  });

  // ==========================================
  // 3. Image Lightbox
  // ==========================================
  const images = content.querySelectorAll("img");
  if (images.length > 0) {
    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.innerHTML = `
      <img id="lightbox-img" src="" alt="">
      <p id="lightbox-caption"></p>
    `;
    document.body.appendChild(dialog);

    const dialogImg = dialog.querySelector("#lightbox-img");
    const dialogCaption = dialog.querySelector("#lightbox-caption");

    images.forEach((img) => {
      img.addEventListener("click", () => {
        dialogImg.src = img.src;
        dialogImg.alt = img.alt || "";
        dialogCaption.textContent = img.alt || "";
        dialog.showModal();
      });
    });

    // Close on click outside or on image
    dialog.addEventListener("click", (e) => {
      dialog.close();
    });
  }

})();
