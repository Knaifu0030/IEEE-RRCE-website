# IEEE RRCE — Student Branch Website

Website for the **IEEE Student Branch at RajaRajeswari College of Engineering, Bengaluru** (IEEE Bangalore Section, Region 10).
Built for the Web Designing competition at IEEE TechFest 2026 (31 October 2026).

## Run it

No build step and no server required. Open `index.html` in a browser, or serve the folder with any static server (e.g. VS Code Live Server).
Everything, including fonts, images and animation libraries, is inside this folder, so the site works fully offline.

## Stack

- **HTML5** with semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), one `h1` per page, labelled forms.
- **CSS** in a single design-system stylesheet (`css/styles.css`) built on custom properties. Mobile-first, fluid type with `clamp()`, `grid auto-fit` layouts. Progressive enhancements for Chromium: cross-document View Transitions and scroll-driven parallax.
- **JavaScript** (no framework). Hand-written modules plus two vendored libraries for scroll choreography.

## Structure

```
index.html          Home: hero network, live TechFest strip, two voices, pinned speaker strip, membership, people
about.html          IEEE, RRCE, the branch, counsellor & speakers, interleaved timeline
events.html         TechFest 2026 featured + today's schedule, filterable event cards, .ics export
join.html           Two membership paths, application form, Execom roles, FAQ
contact.html        Address & socials, contact form, visit us
css/styles.css      Design tokens → base → components → page sections → motion → responsive/a11y
css/fonts.css       Self-hosted @font-face rules
js/main.js          Shared behaviour: nav, reveals, counters, word-split, live status, rail, cursor, tilt, pinned strip
js/hero.js          Canvas "Two Signals, One Network" (IEEE blue + RRCE gold nodes)
js/events.js        Filter tabs + Add-to-calendar (.ics generated in the browser)
js/forms.js         Accessible validation + success state with reference number
js/vendor/          gsap, ScrollTrigger, lenis (local copies, MIT)
assets/brand/       IEEE master brand (SVG) and RRCE emblem (PNG)
assets/img/         Generated backdrops (WebP)
assets/fonts/       Bricolage Grotesque, DM Sans, Instrument Serif, JetBrains Mono (woff2)
```

## Design concept: "Two Signals, One Network"

The site gives IEEE and RRCE equal weight. Navy (shared by RRCE's identity and the TechFest poster) is the ground; **IEEE blue** and **RRCE gold** are co-equal accents. Headings use a geometric sans (the technology voice), taglines use a serif italic (the academic voice). The hero network has blue and gold nodes that link into one mesh, which is the branch.

## Accessibility & resilience

- Skip link, visible focus states, `aria-current`, `aria-expanded` nav toggle, `aria-live` form errors, descriptive alt text.
- Content is never hidden by CSS alone: reveal states only apply when `html.js` is present.
- `prefers-reduced-motion` disables the cursor, rail, canvas motion and reveals.
- Event status badges and the schedule's "now" marker are computed from the visitor's clock (IST timestamps).

## Content sources

All names, dates, venues and figures come from rrce.org, the IEEE TechFest 2026 announcement and poster, and ieee.org. No people or events were invented; the student committee is shown as "applications open".
