/**
 * Main site script:
 * - Theme toggle (dark/light, localStorage, syncs across tabs)
 * - Sidebar off-canvas drawer (mobile)
 * - Header search with client-side JSON indexing + keyboard navigation
 * - Back to top button
 * - Email link assembler (obfuscation)
 */

(function () {
  "use strict";

  // ==========================================
  // 1. Theme Management
  // ==========================================
  const themeToggle = document.getElementById("theme-toggle");

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (e) {}
    return "dark";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
    });
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
      applyTheme(e.newValue);
    }
  });

  // ==========================================
  // 2. Mobile Sidebar Drawer
  // ==========================================
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarOverlay = document.getElementById("sidebar-overlay");

  function openSidebar() {
    document.body.classList.add("sidebar-open");
    if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", "true");
    if (sidebarOverlay) sidebarOverlay.hidden = false;
  }

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", "false");
    if (sidebarOverlay) sidebarOverlay.hidden = true;
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.contains("sidebar-open");
      if (isOpen) closeSidebar();
      else openSidebar();
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
  }

  // Close sidebar on Esc key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    }
  });

  // ==========================================
  // 3. Search Engine (Client-side JSON index)
  // ==========================================
  const searchWrap = document.getElementById("search");
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const searchList = document.getElementById("search-list");
  const searchStatus = document.getElementById("search-status");
  const searchTrigger = document.getElementById("search-trigger");
  const searchCancel = document.getElementById("search-cancel");

  let searchIndex = null;
  let isFetchingIndex = false;
  let activeHitIndex = -1;

  async function loadSearchIndex() {
    if (searchIndex || isFetchingIndex || !searchInput) return;
    const url = searchInput.getAttribute("data-index");
    if (!url) return;

    isFetchingIndex = true;
    try {
      const res = await fetch(url);
      if (res.ok) {
        searchIndex = await res.json();
      }
    } catch (err) {
      console.warn("Could not load search index:", err);
    } finally {
      isFetchingIndex = false;
    }
  }

  function escapeHTML(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightMatches(text, query) {
    if (!text || !query) return escapeHTML(text || "");
    const safeText = escapeHTML(text);
    const words = query.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return safeText;

    const pattern = new RegExp(`(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return safeText.replace(pattern, "<mark>$1</mark>");
  }

  function renderHits(hits, query) {
    if (!searchList || !searchResults) return;

    if (!hits.length) {
      searchStatus.textContent = query ? "No matching writeups found." : "";
      searchList.innerHTML = "";
      searchResults.hidden = !query;
      activeHitIndex = -1;
      return;
    }

    searchStatus.textContent = `${hits.length} result${hits.length > 1 ? "s" : ""}`;
    searchList.innerHTML = hits.map((hit, idx) => {
      const titleHl = highlightMatches(hit.title, query);
      const summaryHl = highlightMatches(hit.summary || hit.content.slice(0, 140), query);
      const category = hit.category ? `<span class="hit-cat">${escapeHTML(hit.category)}</span>` : "";
      const platform = hit.platform ? `<span class="hit-platform">${escapeHTML(hit.platform)}</span>` : "";
      const date = hit.date ? `<time>${escapeHTML(hit.date)}</time>` : "";

      return `
        <li>
          <a class="search-hit" href="${hit.url}" data-index="${idx}">
            <strong>${titleHl}</strong>
            <div class="hit-meta">${category}${platform}${date}</div>
            <p class="hit-snippet">${summaryHl}</p>
          </a>
        </li>
      `;
    }).join("");

    searchResults.hidden = false;
    searchInput.setAttribute("aria-expanded", "true");
    activeHitIndex = -1;
  }

  function performSearch(query) {
    if (!searchIndex) return;
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      if (searchResults) searchResults.hidden = true;
      if (searchInput) searchInput.setAttribute("aria-expanded", "false");
      return;
    }

    const tokens = cleanQuery.split(/\s+/).filter(Boolean);
    const results = searchIndex.filter((item) => {
      const haystack = [
        item.title,
        item.summary,
        item.category,
        item.platform,
        (item.tags || []).join(" "),
        item.content
      ].join(" ").toLowerCase();

      return tokens.every(token => haystack.includes(token));
    }).slice(0, 8);

    renderHits(results, cleanQuery);
  }

  if (searchInput) {
    searchInput.addEventListener("focus", () => {
      loadSearchIndex();
      if (searchInput.value.trim().length > 0) {
        performSearch(searchInput.value);
      }
    });

    searchInput.addEventListener("input", (e) => {
      performSearch(e.target.value);
    });

    searchInput.addEventListener("keydown", (e) => {
      const items = searchList ? searchList.querySelectorAll(".search-hit") : [];
      if (!items.length || searchResults.hidden) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeHitIndex = (activeHitIndex + 1) % items.length;
        updateActiveHit(items);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeHitIndex = (activeHitIndex - 1 + items.length) % items.length;
        updateActiveHit(items);
      } else if (e.key === "Enter" && activeHitIndex >= 0) {
        e.preventDefault();
        items[activeHitIndex].click();
      } else if (e.key === "Escape") {
        closeSearch();
      }
    });
  }

  function updateActiveHit(items) {
    items.forEach((item, idx) => {
      if (idx === activeHitIndex) {
        item.classList.add("is-focused");
        item.scrollIntoView({ block: "nearest" });
      } else {
        item.classList.remove("is-focused");
      }
    });
  }

  function openMobileSearch() {
    document.body.classList.add("search-open");
    loadSearchIndex();
    setTimeout(() => {
      if (searchInput) searchInput.focus();
    }, 50);
  }

  function closeSearch() {
    document.body.classList.remove("search-open");
    if (searchResults) searchResults.hidden = true;
    if (searchInput) {
      searchInput.setAttribute("aria-expanded", "false");
      searchInput.blur();
    }
    activeHitIndex = -1;
  }

  if (searchTrigger) {
    searchTrigger.addEventListener("click", openMobileSearch);
  }
  if (searchCancel) {
    searchCancel.addEventListener("click", closeSearch);
  }

  // Global keyboard shortcut '/' or 'Ctrl+K' to focus search
  document.addEventListener("keydown", (e) => {
    const isEditing = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
    if ((e.key === "/" && !isEditing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault();
      if (window.innerWidth < 768) {
        openMobileSearch();
      } else if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    if (searchWrap && !searchWrap.contains(e.target)) {
      if (searchResults) searchResults.hidden = true;
      if (searchInput) searchInput.setAttribute("aria-expanded", "false");
    }
  });

  // ==========================================
  // 4. Back To Top Button
  // ==========================================
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 400) {
            backToTopBtn.hidden = false;
          } else {
            backToTopBtn.hidden = true;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // 5. Anti-Scraping Email Assembler
  // ==========================================
  document.querySelectorAll("[data-email-user][data-email-domain]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const user = el.getAttribute("data-email-user");
      const domain = el.getAttribute("data-email-domain");
      if (user && domain) {
        window.location.href = `mailto:${user}@${domain}`;
      }
    });
  });

})();
