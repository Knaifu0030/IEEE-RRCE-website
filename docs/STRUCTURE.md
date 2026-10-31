# Project structure

This is a plain HTML, CSS and JavaScript website. There is no build step, no package manager and no framework. Every file you see is exactly what the browser loads.

## The tree

```
rrce_web_design/
├── index.html              Home page
├── about.html              IEEE, RRCE, the branch, the people, the timeline
├── events.html             TechFest 2026, today's schedule, all events
├── join.html               Membership paths, application form, committee roles, FAQ
├── contact.html            Address, socials, contact form
├── README.md               Short overview and how to run the site
├── .editorconfig           Editor settings (2-space indent, UTF-8, LF)
├── .gitignore              Files git should ignore
│
├── css/
│   ├── fonts.css           @font-face rules for the self-hosted fonts
│   ├── styles.css          The design system: tokens, base styles, every shared component
│   └── pages/
│       ├── about.css       Styles only about.html needs
│       └── events.css      Styles only events.html needs
│
├── js/
│   ├── main.js             Behaviour shared by every page (nav, reveals, counters, live status)
│   ├── events.js           Event filters and "Add to calendar" (events.html only)
│   ├── forms.js            Form validation and success state (join.html, contact.html)
│   └── vendor/
│       ├── gsap.min.js         Animation library (local copy)
│       ├── ScrollTrigger.min.js GSAP plugin for scroll-linked animation
│       └── lenis.min.js        Smooth scrolling
│
├── assets/
│   ├── brand/
│   │   ├── ieee-logo.svg   IEEE master brand
│   │   └── rrce-logo.png   RRCE emblem with the college name
│   ├── fonts/              .woff2 font files referenced by css/fonts.css
│   └── img/                Photographs and backdrops (.webp)
│
└── docs/                   You are here
```

## What each part does

| Path | What it is | Open it when you want to |
|---|---|---|
| `index.html` | The home page. Hero, live TechFest strip, the two institutions, speaker strip, membership, people. | Change anything a visitor sees first. |
| `about.html` | Background on IEEE and RRCE, the branch, counsellor and speakers, the interleaved timeline. | Update history, vision and mission, or people. |
| `events.html` | The featured TechFest card, today's schedule with a live "now" marker, filterable event cards. | Add, remove or edit an event. |
| `join.html` | Two ways to join, the application form, Executive Committee roles, FAQ. | Change form fields, roles or FAQ answers. |
| `contact.html` | Address, phone, email, social links, contact form, how to reach the campus. | Update contact details or social links. |
| `css/styles.css` | The design system. Numbered sections: tokens, reset, typography, layout, header, footer, buttons, cards, forms, page sections, motion, responsive. | Change a colour, font, spacing or any shared component. |
| `css/pages/` | Small stylesheets that only one page loads, after `styles.css`. | Style something that exists on one page only. |
| `css/fonts.css` | Tells the browser where the font files are. | Add or remove a font. |
| `js/main.js` | Everything shared: menu toggle, scroll reveals, number counters, headline word reveal, live event status, progress rail, magnetic buttons, pinned speaker strip, timeline line, schedule "now" marker. | Change how the site moves or behaves on every page. |
| `js/events.js` | Filter tabs and the `.ics` calendar download. | Change filtering or the calendar export. |
| `js/forms.js` | Validation rules, error messages, the success card with a reference number. | Change a rule, a message, or connect a backend. |
| `js/vendor/` | Third-party libraries, copied locally so the site works offline. Do not edit these. | Upgrade a library (replace the file). |
| `assets/brand/` | Official logos. | Replace a logo with a higher-quality version. |
| `assets/img/` | Pictures used on the pages. | Swap or add a picture. |
| `assets/fonts/` | Font files. | Rarely. Managed through `css/fonts.css`. |
| `docs/` | These guides. | Learn or explain the project. |

## How a page is put together

Every HTML page follows the same order:

1. `<head>`: title, description, favicon, then `css/fonts.css`, `css/styles.css`, and a page stylesheet if one exists.
2. A skip link for keyboard users.
3. `<header class="header">`: the floating bar with the menu button, the IEEE and RRCE lockup, and the "Become a member" button. The full-screen menu lives inside it.
4. A thin progress rail on the left (`.rail`).
5. `<main id="main">` with one `<section>` per block of content.
6. `<footer class="footer">`.
7. Scripts at the very end: the three vendor files, `js/main.js`, then the page script if needed.

If you copy an existing page to make a new one, you get all of this for free. See `HOW-TO.md`.

## Rules the codebase follows

- Relative paths only (`css/styles.css`, not `/css/styles.css`), so the site works when opened straight from a folder.
- No inline `style=""` attributes. Styles live in CSS files.
- No external requests. Fonts, images and libraries are all inside this folder.
- One `<h1>` per page, headings in order, every form input has a `<label>`.
- Content is never hidden by CSS alone. Animations only hide things when JavaScript is running, so the page always reads without it.
