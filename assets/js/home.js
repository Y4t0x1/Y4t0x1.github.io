/**
 * Home page client-side filtering & sorting:
 * - Text search filter (title, summary, platform, tags)
 * - Category filter chips
 * - Tag filter chips
 * - Difficulty dropdown
 * - Sort order (newest / oldest)
 * - URL query parameter synchronization
 * - Results count & empty state
 */

(function () {
  "use strict";

  const cardGrid = document.getElementById("card-grid");
  if (!cardGrid) return;

  const cards = Array.from(cardGrid.querySelectorAll(".card"));
  const inputQ = document.getElementById("filter-q");
  const selectDiff = document.getElementById("filter-difficulty");
  const selectSort = document.getElementById("filter-sort");
  const categoryChips = document.querySelectorAll("[data-category]");
  const tagChips = document.querySelectorAll(".chip-tag[data-tag]");
  const tagsRow = document.getElementById("tag-row");
  const tagsMoreBtn = document.getElementById("tags-more");
  const resultsCount = document.getElementById("results-count");
  const emptyState = document.getElementById("empty-state");
  const clearFiltersBtn = document.getElementById("clear-filters");

  // State object
  const state = {
    q: "",
    category: "",
    tag: "",
    difficulty: "",
    sort: "new"
  };

  // ==========================================
  // Read URL Params on initial load
  // ==========================================
  function readParamsFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("q")) state.q = params.get("q").trim().toLowerCase();
    if (params.has("category")) state.category = params.get("category").trim().toLowerCase();
    if (params.has("tag")) state.tag = params.get("tag").trim().toLowerCase();
    if (params.has("difficulty")) state.difficulty = params.get("difficulty").trim().toLowerCase();
    if (params.has("sort")) state.sort = params.get("sort").trim().toLowerCase();

    // Sync input controls with URL state
    if (inputQ && state.q) inputQ.value = state.q;
    if (selectDiff && state.difficulty) selectDiff.value = state.difficulty;
    if (selectSort && state.sort) selectSort.value = state.sort;
  }

  function syncUrlParams() {
    const params = new URLSearchParams();
    if (state.q) params.set("q", state.q);
    if (state.category) params.set("category", state.category);
    if (state.tag) params.set("tag", state.tag);
    if (state.difficulty) params.set("difficulty", state.difficulty);
    if (state.sort && state.sort !== "new") params.set("sort", state.sort);

    const queryString = params.toString();
    const newRelativePathQuery = window.location.pathname + (queryString ? `?${queryString}` : "") + window.location.hash;
    window.history.replaceState(null, "", newRelativePathQuery);
  }

  // ==========================================
  // Filter & Sort Logic
  // ==========================================
  function matchesCard(card) {
    const cardCat = (card.getAttribute("data-category") || "").toLowerCase();
    const cardDiff = (card.getAttribute("data-difficulty") || "").toLowerCase();
    const cardTags = (card.getAttribute("data-tags") || "").toLowerCase().split(/\s+/);
    const cardSearch = (card.getAttribute("data-search") || "").toLowerCase();

    // 1. Category check
    if (state.category && cardCat !== state.category) {
      return false;
    }

    // 2. Tag check
    if (state.tag && !cardTags.includes(state.tag)) {
      return false;
    }

    // 3. Difficulty check
    if (state.difficulty && cardDiff !== state.difficulty) {
      return false;
    }

    // 4. Keyword query check
    if (state.q) {
      const tokens = state.q.split(/\s+/).filter(Boolean);
      for (const token of tokens) {
        if (!cardSearch.includes(token)) return false;
      }
    }

    return true;
  }

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach((card) => {
      const match = matchesCard(card);
      if (match) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Sort order
    const sortedCards = [...cards].sort((a, b) => {
      const dateA = a.getAttribute("data-date") || "";
      const dateB = b.getAttribute("data-date") || "";
      return state.sort === "old" ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
    });

    sortedCards.forEach(card => cardGrid.appendChild(card));

    // Update Counter & Empty State
    if (resultsCount) {
      resultsCount.textContent = `${visibleCount} writeup${visibleCount !== 1 ? "s" : ""}`;
    }

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    // Update active UI classes
    updateChipStates();

    // Show/hide Clear button
    const hasActiveFilters = Boolean(state.q || state.category || state.tag || state.difficulty || state.sort !== "new");
    if (clearFiltersBtn) {
      clearFiltersBtn.hidden = !hasActiveFilters;
    }

    syncUrlParams();
  }

  function updateChipStates() {
    categoryChips.forEach((chip) => {
      const cat = chip.getAttribute("data-category") || "";
      const isActive = cat.toLowerCase() === state.category;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    tagChips.forEach((chip) => {
      const tag = chip.getAttribute("data-tag") || "";
      const isActive = tag.toLowerCase() === state.tag;
      chip.classList.toggle("is-active", isActive);
      chip.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  // ==========================================
  // Event Listeners
  // ==========================================

  // Text search input
  if (inputQ) {
    let debounceTimer;
    inputQ.addEventListener("input", (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.q = e.target.value.trim().toLowerCase();
        applyFilters();
      }, 150);
    });
  }

  // Category chips
  categoryChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const val = (chip.getAttribute("data-category") || "").toLowerCase();
      state.category = state.category === val ? "" : val;
      applyFilters();
    });
  });

  // Tag chips
  tagChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const val = (chip.getAttribute("data-tag") || "").toLowerCase();
      state.tag = state.tag === val ? "" : val;
      applyFilters();
    });
  });

  // Difficulty select
  if (selectDiff) {
    selectDiff.addEventListener("change", (e) => {
      state.difficulty = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Sort order select
  if (selectSort) {
    selectSort.addEventListener("change", (e) => {
      state.sort = e.target.value.toLowerCase();
      applyFilters();
    });
  }

  // Expand / collapse tag list
  if (tagsMoreBtn && tagsRow) {
    tagsMoreBtn.addEventListener("click", () => {
      const isExpanded = tagsRow.classList.toggle("is-expanded");
      tagsMoreBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
      tagsMoreBtn.textContent = isExpanded ? "Show fewer" : tagsMoreBtn.dataset.originalText || "More tags";
    });
    tagsMoreBtn.dataset.originalText = tagsMoreBtn.textContent;
  }

  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      state.q = "";
      state.category = "";
      state.tag = "";
      state.difficulty = "";
      state.sort = "new";

      if (inputQ) inputQ.value = "";
      if (selectDiff) selectDiff.value = "";
      if (selectSort) selectSort.value = "new";

      applyFilters();
    });
  }

  // Support clicking tags inside cards
  document.addEventListener("click", (e) => {
    const cardTag = e.target.closest(".card-tags [data-tag]");
    if (cardTag) {
      e.preventDefault();
      const tagVal = cardTag.getAttribute("data-tag");
      if (tagVal) {
        state.tag = tagVal.toLowerCase();
        applyFilters();
        const writeupsElem = document.getElementById("writeups");
        if (writeupsElem) writeupsElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  // Initialize
  readParamsFromUrl();
  applyFilters();

})();
