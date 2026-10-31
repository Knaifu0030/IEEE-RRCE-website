/* ==========================================================================
   hero.js — "Two Signals, One Network"
   A canvas particle network for the home hero. Half the nodes carry IEEE blue,
   half carry RRCE gold; links form when nodes come close, and the field bends
   gently toward the pointer. Respects reduced motion and scales down on mobile.
   ========================================================================== */
(function () {
  "use strict";
  const canvas = document.querySelector(".hero__canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const COLORS = { ieee: "63,193,255", gold: "242,183,5" };
  const LINK_DIST = 140;
  let W, H, dpr, nodes = [], raf;
  const pointer = { x: -9999, y: -9999, active: false };

  function resize() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(140, Math.max(40, (W * H) / 14000)));
    nodes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: 1.2 + Math.random() * 1.8,
      c: i % 2 ? COLORS.gold : COLORS.ieee
    }));
  }

  function step() {
    ctx.clearRect(0, 0, W, H);
    // Move
    for (const n of nodes) {
      if (!reduceMotion) {
        n.x += n.vx; n.y += n.vy;
        if (pointer.active) { // gentle attraction toward the pointer
          const dx = pointer.x - n.x, dy = pointer.y - n.y, d2 = dx * dx + dy * dy;
          if (d2 < 220 * 220 && d2 > 1) { const f = 0.0012; n.vx += dx * f * 0.1; n.vy += dy * f * 0.1; }
        }
        // soft speed limit
        const sp = Math.hypot(n.vx, n.vy); if (sp > 0.8) { n.vx *= 0.8 / sp; n.vy *= 0.8 / sp; }
        if (n.x < -20) n.x = W + 20; if (n.x > W + 20) n.x = -20;
        if (n.y < -20) n.y = H + 20; if (n.y > H + 20) n.y = -20;
      }
    }
    // Links
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < LINK_DIST) {
          const alpha = (1 - d / LINK_DIST) * 0.35;
          // Blue↔gold links blend both voices
          const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, "rgba(" + a.c + "," + alpha + ")");
          grad.addColorStop(1, "rgba(" + b.c + "," + alpha + ")");
          ctx.strokeStyle = grad;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    // Pointer links
    if (pointer.active) {
      for (const n of nodes) {
        const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        if (d < 180) {
          ctx.strokeStyle = "rgba(" + n.c + "," + (1 - d / 180) * 0.5 + ")";
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(pointer.x, pointer.y); ctx.stroke();
        }
      }
    }
    // Nodes
    for (const n of nodes) {
      ctx.fillStyle = "rgba(" + n.c + ",0.9)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduceMotion) raf = requestAnimationFrame(step);
  }

  canvas.closest(".hero").addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
  });
  canvas.closest(".hero").addEventListener("mouseleave", () => { pointer.active = false; });

  // Pause when the hero is off-screen to save battery
  if ("IntersectionObserver" in window && !reduceMotion) {
    new IntersectionObserver((en) => {
      if (en[0].isIntersecting) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
      else cancelAnimationFrame(raf);
    }).observe(canvas);
  }

  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => { resize(); if (reduceMotion) step(); }, 150); });
  resize();
  step();
})();
