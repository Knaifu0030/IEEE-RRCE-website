/* ==========================================================================
   main.js — shared behaviour for every page
   - Progressive enhancement: everything here is optional; content reads without it.
   - Modules: smooth scroll, header/nav, reveals, counters, word-split, live status,
     progress rail, magnetic buttons, marquee, pinned horizontal strip,
     timeline fill, schedule "now" marker.
   ========================================================================== */
(function () {
  "use strict";

  const html = document.documentElement;
  html.classList.add("js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const isDesktop = () => window.innerWidth > 900;
  const hasGsap = typeof window.gsap !== "undefined";

  /* ---------- 1. Smooth scroll (Lenis) + GSAP ticker ---------- */
  let lenis = null;
  if (!reduceMotion && typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({ lerp: 0.09, smoothWheel: true });
    if (hasGsap) {
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
      if (window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        lenis.on("scroll", ScrollTrigger.update);
      }
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    // Keep in-page anchor links working with Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -70 }); }
      });
    });
  }

  /* ---------- 2. Header: compact on scroll, mobile nav, current page ---------- */
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  const onScrollHeader = () => header && header.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
      if (lenis) open ? lenis.stop() : lenis.start();
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.addEventListener("resize", () => { if (isDesktop()) setOpen(false); });
  }

  // Mark the current page in the nav
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) a.setAttribute("aria-current", "page");
  });

  /* ---------- 3. Scroll reveals ---------- */
  const revealEls = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- 4. Count-up numbers: <span data-count="2297" data-suffix="+"> ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  const runCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const dur = 1600, start = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      el.textContent = fmt(end * easeOut(p)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    reduceMotion ? (el.textContent = fmt(end) + suffix) : requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { runCounter(en.target); cio.unobserve(en.target); } });
    }, { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  } else counters.forEach(runCounter);

  /* ---------- 5. Word-mask reveal for headlines: <h1 data-split> ---------- */
  document.querySelectorAll("[data-split]").forEach((el) => {
    let i = 0;
    const wrap = (node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span"); w.className = "w";
          const inner = document.createElement("span"); inner.textContent = part; inner.style.setProperty("--i", i++);
          w.appendChild(inner); frag.appendChild(w);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1 && node.tagName !== "BR") {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);
  });
  const ready = () => html.classList.add("is-ready");
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(ready);
  setTimeout(ready, 1200); // never wait on slow fonts

  /* ---------- 6. Live event status: [data-event-status data-start data-end] ---------- */
  const statusEls = document.querySelectorAll("[data-event-status]");
  const updateStatus = () => {
    const now = new Date();
    statusEls.forEach((el) => {
      const start = new Date(el.dataset.start), end = new Date(el.dataset.end);
      const dayStart = new Date(start); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(end); dayEnd.setHours(23, 59, 59, 999);
      let state, label;
      if (now >= start && now <= end) { state = "live"; label = "Live now"; }
      else if (now >= dayStart && now <= dayEnd) { state = now < start ? "upcoming" : "done"; label = now < start ? "Today" : "Concluded today"; }
      else if (now < start) {
        const days = Math.ceil((dayStart - now) / 86400000);
        state = "upcoming"; label = days === 1 ? "Tomorrow" : "In " + days + " days";
      } else { state = "done"; label = "Concluded"; }
      el.className = el.className.replace(/badge--(live|upcoming|done)/g, "").trim() + " badge--" + state;
      el.innerHTML = (state === "live" ? '<span class="pulse" aria-hidden="true"></span>' : "") + label;
    });
  };
  if (statusEls.length) { updateStatus(); setInterval(updateStatus, 30000); }

  /* ---------- 7. Schedule "now" marker: .slot[data-start][data-end] (ISO datetimes) ---------- */
  const slots = document.querySelectorAll(".slot[data-start]");
  const updateSlots = () => {
    const now = Date.now();
    slots.forEach((s) => {
      const a = Date.parse(s.dataset.start), b = Date.parse(s.dataset.end);
      s.classList.toggle("is-now", now >= a && now <= b);
      s.classList.toggle("is-past", now > b);
    });
  };
  if (slots.length) { updateSlots(); setInterval(updateSlots, 60000); }

  /* ---------- 8. Scroll progress rail ---------- */
  const rail = document.querySelector(".rail");
  if (rail) {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      rail.style.setProperty("--progress", max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 9. Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = "translate(" + dx * 0.18 + "px," + dy * 0.25 + "px)";
      });
      btn.addEventListener("mouseleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- 10. Marquee: duplicate content once for a seamless loop ---------- */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- 13. Pinned horizontal strip (GSAP ScrollTrigger, desktop only) ---------- */
  const strip = document.querySelector(".hstrip");
  if (strip && hasGsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    const track = strip.querySelector(".hstrip__track");
    const build = () => {
      ScrollTrigger.getAll().filter((t) => t.vars.id === "hstrip").forEach((t) => t.kill());
      gsap.set(track, { x: 0 });
      if (!isDesktop()) return;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance, ease: "none",
        scrollTrigger: { id: "hstrip", trigger: strip.closest("section") || strip, start: "top top", end: "+=" + distance, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true }
      });
    };
    build();
    let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { build(); ScrollTrigger.refresh(); }, 200); });
  }

  /* ---------- 14. Timeline fill line ---------- */
  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const fill = timeline.querySelector(".timeline__fill");
    if (fill) {
      const update = () => {
        const r = timeline.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height));
        fill.style.height = (p * 100) + "%";
      };
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
    }
  }

  /* ---------- 15. Footer year + track light/dark for the rail ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
