# IEEE RRCE

Website for the **IEEE Student Branch at RajaRajeswari College of Engineering, Bengaluru** (IEEE Bangalore Section, Region 10). Built for the Web Designing competition at IEEE TechFest 2026.

## Run it

Open `index.html` in a browser. That is all. No build step, no install, no internet needed: fonts, images and scripts are inside this folder.

For live reload while editing, use the VS Code "Live Server" extension.

## What is inside

```text
index.html, about.html, events.html, join.html, contact.html   the five pages
css/styles.css        the design system (colours, type, every shared component)
css/pages/            styles that only one page needs
css/fonts.css         self-hosted font declarations
js/main.js            behaviour shared by every page
js/events.js          event filters and calendar export
js/forms.js           form validation
js/vendor/            gsap, ScrollTrigger, lenis (local copies)
assets/               logos, images, fonts
docs/                 guides for anyone working on the site
```

## Documentation

Start with `docs/STRUCTURE.md`.

- `docs/STRUCTURE.md`: every file and folder, and when to open it
- `docs/DESIGN-SYSTEM.md`: colours, fonts, spacing, components
- `docs/HOW-TO.md`: recipes for common changes
- `docs/ACCESSIBILITY.md`: what the site does for all users and how to keep it
- `docs/CONTENT-SOURCES.md`: where every fact came from

## Content rule

All names, dates, venues and figures come from `rrce.org`, the IEEE TechFest 2026 announcement and poster, and `ieee.org`. No people or events were invented. The student committee is shown as "applications open".

## Stack

HTML5, CSS and JavaScript only. Two small vendored libraries (GSAP with ScrollTrigger, Lenis) handle scroll choreography. Everything else is hand-written and commented.
