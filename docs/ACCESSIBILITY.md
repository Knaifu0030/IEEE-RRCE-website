# Accessibility

The site is built so that people using a keyboard, a screen reader, a small screen or a reduced-motion setting get the same content as everyone else. This page lists what is in place and how to keep it that way.

## What the site does

**Skip link.** The first element on every page is `<a class="skip-link" href="#main">`. It is invisible until a keyboard user presses Tab, then it jumps straight past the header to the content.

**Landmarks.** Every page uses `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<section aria-labelledby="...">`, `<article>` and `<footer>`. Screen readers use these to let people jump around.

**Headings in order.** One `<h1>` per page, then `<h2>` for sections, `<h3>` inside cards. Never skip a level.

**Menu button.** The menu toggle is a real `<button>` with `aria-expanded` (true or false) and `aria-controls="nav"`. Escape closes the menu. The current page's link has `aria-current="page"`.

**Forms.** Every input has a `<label for>` that matches its `id`. Error messages sit in a `<p class="field__error" aria-live="polite">`, so screen readers announce them when they appear. Invalid fields get `aria-invalid="true"`. The success card has `role="status"` and receives focus.

**Focus styles.** Anything focusable shows a 3px gold outline (`:focus-visible` in `css/styles.css`). Do not remove it.

**Colour contrast.** Text on navy is `#e8eef6` (very high contrast) or `#9fb0c7` for secondary text (passes AA). Buttons use white on IEEE blue or navy on gold, both well above the 4.5:1 minimum.

**Alt text.** Every `<img>` has an `alt`. Decorative images use `alt=""`; meaningful ones describe what is in the picture. Logos say what they are ("IEEE", "RajaRajeswari College of Engineering").

**Reduced motion.** If the visitor's system asks for less motion, `@media (prefers-reduced-motion: reduce)` in `css/styles.css` switches off animations and transitions, and `js/main.js` checks the same setting before starting smooth scroll, reveals, counters and the pinned strip. The content is simply shown.

**Works without JavaScript.** Reveal animations only hide elements when the `<html>` tag has the `js` class, which `js/main.js` adds. If scripts fail to load, nothing is hidden.

**Text can grow.** Sizes use `rem` and `clamp()`, so browser zoom and larger default fonts work. Layouts collapse to one column on narrow screens and nothing scrolls sideways.

**Live content.** The event status badge and the schedule "now" marker update themselves; they are plain text, so they read correctly.

## How to keep it that way

When you add something, run through this list:

- Is it a link (goes somewhere) or a button (does something)? Use the right element. Never use a `<div>` with a click handler.
- Does every new image have an `alt`?
- Does every new input have a `<label for>` with a matching `id`?
- Did you keep the heading order?
- Can you reach and use it with Tab and Enter only?
- Does it still make sense with animations off? Toggle "Reduce motion" in your OS settings and reload.
- Is the text readable on the background? Gold or cyan on navy is fine; blue `#00629b` text on navy is not.
- Does it fit on a 360px-wide screen without horizontal scrolling?

## Testing tools

- Keyboard only: unplug the mouse, press Tab through the whole page.
- Screen reader: NVDA (free, Windows) or VoiceOver (macOS). Listen to the menu, a form and the live badge.
- Browser: Chrome's Lighthouse (DevTools, "Lighthouse" tab) gives an accessibility score and lists issues.
