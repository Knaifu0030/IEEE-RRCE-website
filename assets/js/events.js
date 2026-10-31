/* ==========================================================================
   js/events.js - Events page behaviour
   - Loaded only by events.html, after js/main.js.
   - Filter tabs: <button class="tab" data-filter="talks"> shows cards whose
     data-tags attribute contains that word; "all" shows everything.
   - Add to calendar: <a data-ics data-title data-start data-end data-location data-desc>
     builds a real .ics file in the browser (works offline, no server needed).
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Filters ---------- */
  const tabs = document.querySelectorAll(".tab[data-filter]");
  const cards = document.querySelectorAll("[data-tags]");
  const empty = document.querySelector("[data-empty]");

  const applyFilter = (key) => {
    let visible = 0;
    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").split(/\s+/);
      const show = key === "all" || tags.includes(key);
      card.hidden = !show;
      if (show) { visible++; card.classList.remove("is-in"); requestAnimationFrame(() => card.classList.add("is-in")); }
    });
    if (empty) empty.hidden = visible > 0;
    tabs.forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.filter === key)));
    try { history.replaceState(null, "", key === "all" ? location.pathname : "#" + key); } catch (e) { /* file:// may block */ }
  };

  tabs.forEach((t) => t.addEventListener("click", () => applyFilter(t.dataset.filter)));
  if (tabs.length) {
    const fromHash = location.hash.replace("#", "");
    applyFilter(Array.from(tabs).some((t) => t.dataset.filter === fromHash) ? fromHash : "all");
  }

  /* ---------- Add to calendar (.ics) ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const toICS = (iso) => {
    const d = new Date(iso);
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z";
  };
  const esc = (s) => String(s || "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

  document.querySelectorAll("[data-ics]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const ics = [
        "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//IEEE RRCE//Events//EN", "CALSCALE:GREGORIAN",
        "BEGIN:VEVENT",
        "UID:" + Date.now() + "@ieee-rrce",
        "DTSTAMP:" + toICS(new Date().toISOString()),
        "DTSTART:" + toICS(link.dataset.start),
        "DTEND:" + toICS(link.dataset.end),
        "SUMMARY:" + esc(link.dataset.title),
        "LOCATION:" + esc(link.dataset.location),
        "DESCRIPTION:" + esc(link.dataset.desc),
        "END:VEVENT", "END:VCALENDAR"
      ].join("\r\n");
      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = (link.dataset.title || "event").replace(/[^a-z0-9]+/gi, "-").toLowerCase() + ".ics";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      const original = link.textContent;
      link.textContent = "Added ✓";
      setTimeout(() => { link.textContent = original; }, 1800);
    });
  });
})();
