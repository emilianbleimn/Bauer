/* =================================================================
   Dämmstoffe Bauer — Sortiment-Filter
   ================================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const chips = $$(".chip");
  const products = $$(".product");
  const empty = $("#noResults");
  if (!chips.length) return;

  function apply(filter) {
    let visible = 0;
    products.forEach((p) => {
      const match = filter === "all" || p.dataset.cat === filter;
      p.classList.toggle("hide", !match);
      if (match) visible++;
    });
    chips.forEach((c) => {
      const on = c.dataset.filter === filter;
      c.classList.toggle("active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    if (empty) empty.style.display = visible ? "none" : "block";
    // keep URL shareable
    const url = new URL(location.href);
    if (filter === "all") url.searchParams.delete("cat");
    else url.searchParams.set("cat", filter);
    history.replaceState(null, "", url);
  }

  chips.forEach((chip) =>
    chip.addEventListener("click", () => apply(chip.dataset.filter))
  );

  // preselect from ?cat=
  const params = new URLSearchParams(location.search);
  const cat = params.get("cat");
  const valid = chips.some((c) => c.dataset.filter === cat);
  apply(valid ? cat : "all");
})();
