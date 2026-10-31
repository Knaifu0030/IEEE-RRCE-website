# Design system

Everything visual comes from `css/styles.css`. The file is split into numbered sections; the first one, **Design tokens**, holds the values every other rule reuses. Change a token and the whole site follows.

## The idea

The site gives IEEE and RRCE equal weight. Navy is the single page theme (it is the colour of RRCE's own header and of the TechFest poster). IEEE blue and RRCE gold are the two accents. Headlines use one condensed poster typeface; body text uses a quiet sans; small labels and data use a monospace.

## Colours

All colours are CSS custom properties on `:root`.

| Token | Value | Use it for |
|---|---|---|
| `--navy` | `#0a1628` | The page background and the header. |
| `--navy-2` | `#0f2140` | Slightly lighter panels (live strip, image placeholders). |
| `--navy-3` | `#16305c` | Gradients and avatar backgrounds. |
| `--paper` | `#0e1d36` | Background of "reading" sections (`.section.is-light`). |
| `--paper-2` | `#122444` | A second step for alternating sections (`.is-paper-2`). |
| `--ieee` | `#00629b` | IEEE blue. Primary buttons, selected chips. |
| `--ieee-2` | `#0a84c1` | Lighter IEEE blue for hover states. |
| `--cyan` | `#3fc1ff` | IEEE accent on dark backgrounds: labels, links, timeline dots. |
| `--gold` | `#f2b705` | RRCE gold. Gold buttons, the live badge, focus rings, active tabs. |
| `--gold-2` | `#ffd24a` | Lighter gold for text on dark. |
| `--maroon` | `#8b1e2d` | From the RRCE emblem. Used sparingly in avatar gradients. |
| `--text-on-dark` | `#e8eef6` | Main text colour. |
| `--muted-on-dark` | `#9fb0c7` | Secondary text. |
| `--text-on-light`, `--muted-on-light` | same as above | Kept for sections that were once light; they now resolve to the dark-theme values. |
| `--line-dark`, `--line-light` | `rgba(255,255,255,0.12)` | Hairlines and borders. |
| `--white` | `rgba(255,255,255,0.03)` | Very faint fill for inputs and panels. |
| `--glass` | `rgba(10,22,40,0.72)` | The blurred header background. |

Rule: one accent per element. Gold or blue, not both.

## Typography

| Token | Family | Used for |
|---|---|---|
| `--font-display` | Big Shoulders Display (500, 700, 900) | Headlines, buttons, nav links. Condensed and set in uppercase for `h1` and `h2`. |
| `--font-body` | DM Sans (400, 500, 600) | Paragraphs, lists, form fields. |
| `--font-mono` | JetBrains Mono (400, 500) | Small labels, badges, dates, reference numbers. |

Font files are in `assets/fonts/` and declared in `css/fonts.css`. There are no external font requests.

Sizes are fluid with `clamp()`, so they scale with the viewport:

- `h1`: `clamp(3rem, 8.5vw, 8.5rem)`, uppercase, line-height 0.9
- `h2`: `clamp(2.6rem, 6vw, 5.6rem)`, uppercase
- `h3`: `clamp(1.5rem, 2.4vw, 2rem)`
- `.lead`: `clamp(1.1rem, 1.6vw, 1.3rem)`, muted colour, max 60 characters wide
- `.mono`: `0.8rem` with letter-spacing

Emphasis inside a headline uses the **same family**, drawn as outlined type: wrap the words in `<span class="serif">`. (The class name is historical; it no longer uses a serif.)

## Spacing

| Token | Value | Meaning |
|---|---|---|
| `--container` | `1240px` | Maximum content width (`.container`). |
| `--gutter` | `clamp(1rem, 4vw, 2.5rem)` | Side padding of the page. |
| `--section-y` | `clamp(4.5rem, 10vw, 8.5rem)` | Vertical padding of every `.section`. |
| `--header-h` | `76px` | Space reserved under the fixed header. |

Helpers: `.mt-1` (1rem top), `.mt-2` (2rem top), `.spacer` (one section's worth of space), `.stack` (1rem between children).

## Shape rule

- Buttons and the navigation bar are **pills** (fully rounded).
- Cards, inputs, badges and panels are **sharp** (no radius).
- Images are **cut with off-axis edges** using `clip-path` on `.img-frame` and `.card__media`, so they never read as plain rectangles.

Do not mix. A rounded card or a square button breaks the system.

## Motion

- `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`) for things arriving, `--ease-in-out` for things moving.
- Only `transform`, `opacity` and `filter` are animated.
- `prefers-reduced-motion` switches everything off (see `ACCESSIBILITY.md`).

## Components

| Class | What it is | Notes |
|---|---|---|
| `.section` | A full-width block with vertical padding. | Add `.is-dark`, `.is-light` or `.is-paper-2` to choose the background step. |
| `.section-head` | Heading group at the top of a section: `h2` plus an optional `.lead`. | Keep it left-aligned. |
| `.container` | Centres content and applies the gutter. | Add `.container--narrow` for text-heavy blocks. |
| `.grid`, `.grid--2`, `.grid--3`, `.grid--4` | Responsive grids that collapse to one column on small screens. | `.grid--4` renders its children as a two-column hairline list, not cards. |
| `.split` | Two columns side by side on wide screens. | `.split--top` aligns the columns to the top. |
| `.btn` | Button or link styled as a button. | Variants: `.btn--primary` (IEEE blue), `.btn--gold` (RRCE gold), `.btn--ghost` (outline), `.btn--sm`. |
| `.badge` | Small uppercase label. | Variants: `.badge--live`, `.badge--upcoming`, `.badge--done`, `.badge--ieee`, `.badge--gold`. Add `data-event-status` and the script sets the right one. |
| `.card` | Flat hairline container. | Add `.card--gold` or `.card--ieee` for a coloured border, `.card--navy` for a solid call-to-action tile. Put an image in `.card__media`. |
| `.person` | A card for a person: `.person__avatar` (initials), `.person__role`, name, text. | Use `.person__avatar--gold` for RRCE-side people. |
| `.stat` | Big number with a label. | Put `data-count="2297" data-suffix="+"` on the number span to animate it. |
| `.voice` | The two institution panels on the home page. | `.voice--ieee` and `.voice--rrce`. |
| `.tabs` / `.tab` | Filter buttons. | `aria-pressed="true"` marks the active one; `data-filter` names the tag. |
| `.accordion` | Native `<details>`/`<summary>` list with a plus icon. | No JavaScript needed. |
| `.field` | Label + input + error message. | Add `.field--check` for a checkbox row, `.field--fieldset` for a group of chips. |
| `.chip` | A checkbox that looks like a pill tag. | Used for "interests". |
| `.form__success` | The card shown after a valid submit. | `data-ref` and `data-name` are filled by `js/forms.js`. |
| `.hstrip` | Horizontal strip of cards. | Pinned and scrolled sideways on desktop by GSAP; native swipe on mobile. |
| `.timeline` | Vertical timeline with a line that fills as you scroll. | Items are `.timeline__item`; add `--rrce` for gold dots. |
| `.schedule` / `.slot` | Today's programme. | Give each `.slot` `data-start` and `data-end` (ISO time with `+05:30`) and the current one is highlighted. |
| `.live-strip` | The bar under the hero showing event status. | |
| `.cta-band` | Full-width call to action with the circuit backdrop. | |
| `.img-frame` | Framed photo with a cut edge. | Add `.img-frame--wide` for 21:9, `.parallax` for a gentle scroll drift. |
| `.lockup` | The IEEE + RRCE logo pair. | Used in the header and footer. |
| `.rail` | The thin scroll-progress ruler on the left. | Hidden on small screens. |

## Reveal attributes

These are data attributes, not classes. `js/main.js` watches for them.

| Attribute | Effect |
|---|---|
| `data-reveal` | Fades and lifts the element in when it scrolls into view. |
| `data-reveal-stagger` | Same, but each child arrives a little after the previous one. |
| `data-split` | Splits the text into words and resolves each one from a blur. Used on `h1`, `h2` and the first `.lead`. |
| `data-count` | Counts the number up from zero. |
| `data-event-status` | Shows Live now / Today / In N days / Concluded, based on `data-start` and `data-end`. |
