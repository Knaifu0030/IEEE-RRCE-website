# IEEE RRCE

Website for the **IEEE Student Branch at RajaRajeswari College of Engineering, Bengaluru** (IEEE Bangalore Section, Region 10). Built for the Web Designing competition at IEEE TechFest 2026.

## Run it

Open `index.html` in a browser. That is all. No build step, no install, no internet needed: fonts, images and scripts are inside this folder.

For live reload while editing, use the VS Code "Live Server" extension.

## What is inside

```text
index.html                 the home page (kept at the root so it can be double-clicked)
pages/                     about, events, join and contact pages
assets/css/styles.css      the design system (colours, type, every shared component)
assets/css/pages/          styles that only one page needs
assets/css/fonts.css       self-hosted font declarations
assets/js/main.js          behaviour shared by every page
assets/js/events.js        event filters and calendar export
assets/js/forms.js         form validation
assets/js/vendor/          gsap, ScrollTrigger, lenis (local copies)
assets/brand, img, fonts   logos, pictures, font files
docs/                      guides for anyone working on the site, plus the competition brief
```

## Documentation

Start with `docs/STRUCTURE.md`.

- `docs/STRUCTURE.md`: every file and folder, and when to open it
- `docs/DESIGN-SYSTEM.md`: colours, fonts, spacing, components
- `docs/HOW-TO.md`: recipes for common changes
- `docs/ACCESSIBILITY.md`: what the site does for all users and how to keep it
- `docs/CONTENT-SOURCES.md`: where every fact came from
- `docs/Guidelines.pdf`: the competition brief and rubric

## Content rule

All names, dates, venues and figures come from `rrce.org`, the IEEE TechFest 2026 announcement and poster, and `ieee.org`. No people or events were invented. The student committee is shown as "applications open".

## Stack

HTML5, CSS and JavaScript only. Two small vendored libraries (GSAP with ScrollTrigger, Lenis) handle scroll choreography. Everything else is hand-written and commented.
