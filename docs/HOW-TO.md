# How to

Short recipes for common changes. You only need a text editor and a browser.

A note on paths before you start: `index.html` sits at the root, the other pages sit in `pages/`. So a file in `pages/` reaches shared files with `../` (for example `../assets/css/styles.css` and `../index.html`), while `index.html` uses `assets/...` and `pages/...`. When you copy markup between the two, check the paths.

## Run the site

**Option A, no tools:** double-click `index.html`. Everything works, including the forms and the calendar download.

**Option B, with live reload:** in VS Code, install the "Live Server" extension, right-click `index.html` and choose "Open with Live Server". The page refreshes every time you save. The crossfade between pages only works in this mode, because browsers do not allow it for files opened directly.

## Add an event card

Open `pages/events.html` and find the `<div class="grid grid--3"` inside the "All events" section. Copy one `<article>` and edit it:

```html
<article class="card" data-tags="today talks" data-reveal>
  <span class="badge badge--ieee">Talk</span>
  <p class="card__meta"><span>31 Oct</span><span>Morning session</span><span>Kalam Hall</span></p>
  <h3>Title of the talk</h3>
  <p class="muted">One or two sentences about it.</p>
  <a class="link-arrow" href="events.html"
     data-ics
     data-title="Title of the talk"
     data-start="2026-10-31T10:30:00+05:30"
     data-end="2026-10-31T11:30:00+05:30"
     data-location="Dr. A. P. J. Abdul Kalam Hall, RRCE, Bengaluru"
     data-desc="One line for the calendar entry.">Add to calendar <span class="arrow">→</span></a>
</article>
```

- `data-tags` decides which filter tabs show the card. Use any of: `today`, `talks`, `competitions`, `opportunities`. Separate several with a space.
- `data-ics` turns the link into a calendar download. Times must include the timezone (`+05:30` for India).
- For an external opportunity, drop the `data-ics` attributes and use a normal link with `target="_blank" rel="noopener"`.

## Change the live event date

The site works out whether an event is live, upcoming or finished from the visitor's clock. Three places carry the date:

1. `index.html` and `pages/events.html`: the badge
   `<span class="badge" data-event-status data-start="2026-10-31T09:00:00+05:30" data-end="2026-10-31T16:00:00+05:30">`
2. `pages/events.html`: each schedule row
   `<div class="slot" data-start="..." data-end="...">`
3. `pages/events.html`: the `data-ics` links

Change the dates in all three and the badges, the "now" marker and the calendar files follow.

## Add a page

1. Copy a file from `pages/`, for example `pages/contact.html`, and rename the copy, for example `pages/gallery.html`. Keep it inside `pages/` so its `../` paths keep working.
2. Change the `<title>` and the `<meta name="description">`.
3. Replace everything between `<main id="main">` and `</main>`. Keep one `<h1>`.
4. Add a link to the new page in the menu of **every** page. The menu is the `<div class="nav__links">` block inside `<nav class="nav">`:
   - in the files inside `pages/`, the link is `href="gallery.html"`;
   - in `index.html`, the link is `href="pages/gallery.html"`.
   The script marks the current page automatically.
5. Also add it to the "Explore" list in the footer of every page, with the same two path styles.
6. If the page needs its own styles, create `assets/css/pages/gallery.css` and link it after `styles.css` (from inside `pages/` the href is `../assets/css/pages/gallery.css`).
7. If it needs its own script, create `assets/js/gallery.js` and load it after `main.js`.

## Change a colour

Open `assets/css/styles.css`, go to section **1. DESIGN TOKENS**, and edit the value. For example, to make the gold a little warmer:

```css
--gold: #f0b000;
```

Every button, badge and highlight that uses gold updates at once. Do not search-and-replace hex codes elsewhere; they should all come from the tokens.

Two gold tokens exist on purpose: `--gold` for fills and borders, `--gold-ink` for gold **text** on the paper background (plain gold is too light to read there). See `DESIGN-SYSTEM.md`.

## Replace an image

1. Save the new picture in `assets/img/`. Use `.webp` if you can (smaller files); 1600 to 2000 pixels wide is plenty.
2. In the HTML, change the `src` and write a useful `alt` sentence describing the picture. Remember the `../` prefix inside `pages/`.
3. Keep the `width` and `height` attributes close to the real size so the page does not jump while loading.

Logos live in `assets/brand/`:

- `ieee-logo.svg` is the IEEE mark. CSS turns it white on navy surfaces.
- `rrce-emblem.png` is the RRCE emblem on a transparent background, used in the header on the light bar.
- `ieee-rrce-lockup.webp` is the branch's own lockup, shown in the menu and the footer. To update it, export the newest version from the branch's Instagram profile and replace the file, keeping the name.

## Change a form field

Each field follows the same shape:

```html
<div class="field">
  <label for="usn">USN</label>
  <input id="usn" name="usn" type="text" data-rule="usn" placeholder="1RR23CS001">
  <p class="field__error" aria-live="polite"></p>
</div>
```

- `required` makes it mandatory.
- `data-rule` picks a validation rule from `assets/js/forms.js`: `name`, `usn`, `email`, `phone` or `message`. Leave it out for free text.
- The `for` and `id` must match, so screen readers read the label.

Messages are at the top of `assets/js/forms.js` in the `RULES` object.

## Connect the forms to a real backend

Right now a valid submission is saved in the browser's `localStorage` and a reference number is shown. To send it somewhere:

1. Open `assets/js/forms.js` and find the comment `// Collect data` inside the submit handler.
2. The `data` object already holds every field. Replace the `localStorage.setItem(...)` line with a request, for example:

```js
fetch("https://your-server.example/apply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(() => showSuccess());
```

3. Keep the success card logic that follows, so users still get their reference number.

Services like Formspree or Google Forms also work: they give you a URL to post to.

## Add a speaker to the home strip

In `index.html`, find `<div class="hstrip__track">` and copy one `<article class="card">`. The strip scrolls sideways on desktop automatically.

## Check your work

Open the page at three widths (narrow phone, tablet, desktop) and make sure nothing overflows sideways. Open the menu at each width. Press Tab through the page: every link and button should show a gold focus ring. Open the browser console (F12): it should be empty of errors.
