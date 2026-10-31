# Project structure

This is a plain HTML, CSS and JavaScript website. There is no build step, no package manager and no framework. Every file you see is exactly what the browser loads.

## The tree

```text
rrce_web_design/
├── index.html                  Home page. Stays at the root so anyone can double-click it.
├── README.md                   Short overview and how to run the site
├── .editorconfig               Editor settings (2-space indent, UTF-8, LF)
├── .gitignore                  Files git should ignore
│
├── pages/                      The other four pages
│   ├── about.html              IEEE, RRCE, the branch, the people, the timeline
│   ├── events.html             TechFest 2026, today's schedule, all events
│   ├── join.html               Membership paths, application form, committee roles, FAQ
│   └── contact.html            Address, socials, contact form, how to reach the campus
│
├── assets/
│   ├── css/
│   │   ├── styles.css          The design system: tokens, base styles, every shared component
│   │   ├── fonts.css           @font-face rules for the self-hosted fonts
│   │   └── pages/
│   │       ├── about.css       Styles only pages/about.html needs
│   │       └── events.css      Styles only pages/events.html needs
│   ├── js/
│   │   ├── main.js             Behaviour shared by every page (menu, reveals, counters, live status)
│   │   ├── events.js           Event filters and "Add to calendar" (pages/events.html only)
│   │   ├── forms.js            Form validation and success state (join and contact pages)
│   │   └── vendor/
│   │       ├── gsap.min.js             Animation library (local copy)
│   │       ├── ScrollTrigger.min.js    GSAP plugin for scroll-linked animation
│   │       └── lenis.min.js            Smooth scrolling
│   ├── brand/
│   │   ├── ieee-logo.svg       IEEE master brand (blue; turned white on navy by CSS)
│   │   ├── rrce-emblem.png     The RRCE emblem, cropped so it works on light backgrounds
│   │   └── ieee-rrce-lockup.webp   The branch's own lockup (from its Instagram), used in the menu and footer
│   ├── fonts/                  .woff2 font files referenced by assets/css/fonts.css
│   └── img/                    Photographs and backdrops (.webp)
│       ├── fibre.webp              Hero, large cut-out
│       ├── hands-pcb.webp          Hero, small cut-out
│       ├── auditorium.webp         About page
│       ├── corridor.webp           Contact page, "Visit us"
│       ├── techfest-stage.webp     Events page, featured card
│       └── circuit-backdrop.webp   Call-to-action band on every page
│
└── docs/                       You are here
    ├── README.md               Index of these guides
    ├── STRUCTURE.md            This file
    ├── DESIGN-SYSTEM.md        Colours, type, spacing, components
    ├── HOW-TO.md               Recipes for common changes
    ├── ACCESSIBILITY.md        What the site does for all users
    ├── CONTENT-SOURCES.md      Where every fact came from
    └── Guidelines.pdf          The competition brief and rubric
```

## Why `index.html` is at the root and the rest are in `pages/`

Judges and visitors open `index.html` by double-clicking it, so it has to be the first thing they see in the folder. Everything else is grouped: pages in `pages/`, code and media in `assets/`, guides in `docs/`.

Because of this, paths differ by location:

- From `index.html`: `assets/css/styles.css`, `pages/about.html`.
- From a file inside `pages/`: `../assets/css/styles.css`, `../index.html`, and `about.html` for a sibling page.

## What each part does

| Path | What it is | Open it when you want to |
|---|---|---|
| `index.html` | The home page. Hero with two image cut-outs, live TechFest strip, the two institutions, speaker strip, membership, people. | Change anything a visitor sees first. |
| `pages/about.html` | Background on IEEE and RRCE, the branch, counsellor and speakers, the interleaved timeline. | Update history, vision and mission, or people. |
| `pages/events.html` | The featured TechFest card, today's schedule with a live "now" marker, filterable event cards. | Add, remove or edit an event. |
| `pages/join.html` | Two ways to join, the application form, Executive Committee roles, FAQ. | Change form fields, roles or FAQ answers. |
| `pages/contact.html` | Address, phone, email, social links, contact form, how to reach the campus. | Update contact details or social links. |
| `assets/css/styles.css` | The design system. Numbered sections: tokens, reset, typography, layout, header, footer, buttons, cards, forms, page sections, motion, responsive. | Change a colour, font, spacing or any shared component. |
| `assets/css/pages/` | Small stylesheets that only one page loads, after `styles.css`. | Style something that exists on one page only. |
| `assets/css/fonts.css` | Tells the browser where the font files are. | Add or remove a font. |
| `assets/js/main.js` | Everything shared: menu toggle, scroll reveals, number counters, headline word reveal, live event status, progress rail, magnetic buttons, hero cut-out drift, timeline line, schedule "now" marker. | Change how the site moves or behaves on every page. |
| `assets/js/events.js` | Filter tabs and the `.ics` calendar download. | Change filtering or the calendar export. |
| `assets/js/forms.js` | Validation rules, error messages, the success card with a reference number. | Change a rule, a message, or connect a backend. |
| `assets/js/vendor/` | Third-party libraries, copied locally so the site works offline. Do not edit these. | Upgrade a library (replace the file). |
| `assets/brand/` | Logos: the IEEE mark, the RRCE emblem, and the branch's own lockup. | Replace a logo with a higher-quality version. |
| `assets/img/` | Pictures used on the pages. | Swap or add a picture. |
| `assets/fonts/` | Font files. | Rarely. Managed through `assets/css/fonts.css`. |
| `docs/` | These guides, plus `Guidelines.pdf`, the competition brief. | Learn or explain the project. |

## How a page is put together

Every HTML page follows the same order:

1. `<head>`: title, description, favicon, then `fonts.css`, `styles.css`, and a page stylesheet if one exists.
2. A skip link for keyboard users.
3. `<header class="header">`: the floating pill bar with the MENU button, the IEEE and RRCE emblem lockup, and the "Become a member" button. The full-screen menu (`<nav class="nav">`) lives inside it and holds the five links, the branch lockup and contact details.
4. A thin progress rail on the left (`.rail`).
5. `<main id="main">` with one `<section>` per block of content.
6. `<footer class="footer">`.
7. Scripts at the very end: the three vendor files, `main.js`, then the page script if needed.

If you copy an existing page to make a new one, you get all of this for free. See `HOW-TO.md`.

## Rules the codebase follows

- Relative paths only (`assets/css/styles.css` or `../assets/css/styles.css`, never `/assets/...`), so the site works when opened straight from a folder.
- No inline `style=""` attributes. Styles live in CSS files.
- No external requests. Fonts, images and libraries are all inside this folder.
- One `<h1>` per page, headings in order, every form input has a `<label>`.
- Content is never hidden by CSS alone. Animations only hide things when JavaScript is running, so the page always reads without it.
- Every CSS and JS file starts with a comment block that says what it is for and which pages load it.
