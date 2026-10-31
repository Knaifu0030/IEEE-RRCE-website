# Design system

Everything visual comes from `assets/css/styles.css`. The file is split into numbered sections; the first one, **Design tokens**, holds the values every other rule reuses. Change a token and the whole site follows.

## The idea

The site gives IEEE and RRCE equal weight. The page sits on warm paper. Navy (the colour of RRCE's own header and of the TechFest poster) is kept for three surfaces only: the full-screen menu, the footer and the call-to-action band. IEEE blue and RRCE gold are the two accents. Headlines use one condensed poster typeface; body text uses a quiet sans; small labels and data use a monospace. Photographs are cut with off-axis edges instead of plain rectangles.

## Colours

All colours are CSS custom properties on `:root`.

| Token | Value | Use it for |
|---|---|---|
| `--paper` | `#f4f1ea` | The page background. |
| `--paper-2` | `#ebe6da` | A darker step for alternating sections (`.is-paper-2`). |
| `--white` | `#ffffff` | Feature sections (`.section.is-dark`), inputs, cards on hover, the live strip. |
| `--navy` | `#0a1628` | The menu, the footer, the CTA band, the success card, `.card--navy`. |
| `--navy-2` | `#0f2140` | Image placeholders. |
| `--navy-3` | `#16305c` | Gradients and avatar backgrounds. |
| `--ieee` | `#00629b` | IEEE blue. Primary buttons, selected chips, links, labels and timeline dots on paper. |
| `--ieee-2` | `#0a84c1` | Lighter IEEE blue for hover states and `.accent-ieee`. |
| `--cyan` | `#3fc1ff` | IEEE accent on navy surfaces only (footer headings, menu details). |
| `--gold` | `#f2b705` | RRCE gold. Gold buttons, focus rings, active tabs, borders. |
| `--gold-ink` | `#8a6500` | Gold as **text** on paper: badges, timeline years, outlined headline words. Plain gold is too light to read on paper, so use this instead. |
| `--gold-2` | `#ffd24a` | Gold as text on navy only (menu current page, footer tagline, reference numbers). |
| `--maroon` | `#8b1e2d` | From the RRCE emblem. Form error text and avatar gradients. |
| `--text-on-light` | `#10192b` | Main text colour. |
| `--muted-on-light` | `#4f5b70` | Secondary text. |
| `--line-light` | `rgba(16,25,43,0.14)` | Hairlines and borders on paper. |
| `--text-on-dark`, `--muted-on-dark`, `--line-dark` | `#e8eef6`, `#9fb0c7`, `rgba(255,255,255,0.12)` | The same three roles on navy surfaces. |
| `--glass` | `rgba(255,255,255,0.65)` | The blurred header pill. |

Rule: one accent per element. Gold or blue, not both.

### Which surfaces stay navy

`.nav` (full-screen menu), `.footer`, `.cta-band`, `.form__success` and `.card--navy`. Inside these, use the `--*-on-dark` tokens, `--cyan` and `--gold-2`. Everywhere else, use the `--*-on-light` tokens, `--ieee` and `--gold-ink`.

`.section.is-dark` is a historical name: those sections are now **white feature panels**. The class redefines the dark tokens to their light values, so older rules written for navy keep working. New code should still prefer `.section.is-light` and `.section.is-paper-2`.

## Typography

| Token | Family | Used for |
|---|---|---|
| `--font-display` | Big Shoulders Display (500, 700, 900) | Headlines, buttons, menu links. Condensed and set in uppercase for `h1` and `h2`. |
| `--font-body` | DM Sans (400, 500, 600) | Paragraphs, lists, form fields. |
| `--font-mono` | JetBrains Mono (400, 500) | Small labels, badges, dates, reference numbers, the MENU button. |

Font files are in `assets/fonts/` and declared in `assets/css/fonts.css`. There are no external font requests.

Sizes are fluid with `clamp()`, so they scale with the viewport:

- `h1` (home hero): `clamp(2.8rem, 4.6vw, 4.6rem)`, uppercase, line-height 0.9
- `h1` (inner pages): `clamp(3rem, 9vw, 8rem)`, uppercase
- `h2`: `clamp(2.6rem, 6vw, 5.6rem)`, uppercase
- `h3`: `clamp(1.5rem, 2.4vw, 2rem)`
- `.lead`: `clamp(1.1rem, 1.6vw, 1.3rem)`, muted colour, max 60 characters wide
- `.mono`: `0.8rem` with letter-spacing

Emphasis inside a headline uses the **same family**, drawn as outlined type: wrap the words in `<span class="serif">`. (The class name is historical; it no longer uses a serif.) Pair it with `.accent-gold` or `.accent-ieee` to colour the outline.

Headlines and the first paragraph on each page carry `data-split`: the words resolve from a blur when they scroll into view.

## Spacing

| Token | Value | Meaning |
|---|---|---|
| `--container` | `1240px` | Maximum content width (`.container`). |
| `--gutter` | `clamp(1rem, 4vw, 2.5rem)` | Side padding of the page. |
| `--section-y` | `clamp(5rem, 12vw, 10rem)` | Vertical padding of every `.section`. |
| `--header-h` | `80px` (`74px` on phones) | Space reserved under the floating header. |

Helpers: `.mt-1` (1rem top), `.mt-2` (2rem top), `.spacer` (one section's worth of space), `.stack` (1rem between children).

## Shape rule

- **Pills** (fully rounded): buttons, the header bar, badges, tabs, chips.
- **Sharp** (no radius): cards, inputs, panels, the success card.
- **Cut edges**: images use `clip-path` with slightly off-axis corners (`.img-frame`, `.card__media`, the hero `.shard`s), so they never read as plain rectangles.

Do not mix. A rounded card or a square button breaks the system.

## Motion

- `--ease-out` (`cubic-bezier(0.22, 1, 0.36, 1)`) for things arriving, `--ease-in-out` for things moving.
- Only `transform`, `opacity` and `filter` are animated.
- `prefers-reduced-motion` switches everything off (see `ACCESSIBILITY.md`).

## Components

| Class | What it is | Notes |
|---|---|---|
| `.header` / `.header__bar` | The floating glass pill: MENU button, lockup, CTA. | `.header__cta` hides on phones; the menu still has the link. |
| `.nav` | The full-screen menu. | `.nav__links` (five giant links), `.nav__aside` (branch lockup, address, email, Instagram). Opens with `.is-open`. |
| `.lockup` | The IEEE mark and RRCE emblem side by side. | Header only. `.nav__mark` and `.footer__mark` show the branch lockup image instead. |
| `.section` | A full-width block with vertical padding. | `.is-light` (paper, default), `.is-paper-2` (darker paper), `.is-dark` (white feature panel, see above). |
| `.section-head` | Heading group at the top of a section: `h2` plus an optional `.lead`. | Keep it left-aligned. |
| `.container` | Centres content and applies the gutter. | Add `.container--narrow` for text-heavy blocks. |
| `.grid`, `.grid--2`, `.grid--3`, `.grid--4` | Responsive grids that collapse to one column on small screens. | `.grid--4` renders its children as a two-column hairline list, not cards. |
| `.split` | Two columns side by side on wide screens. | `.split--top` aligns the columns to the top. |
| `.hero` | The home hero: copy on the left, `.hero__visual` with two `.shard` images on the right. | `.parallax-slow` and `.parallax-fast` on the shards make them drift on scroll. Stacks on phones. |
| `.page-hero` | The heading block at the top of inner pages, with a breadcrumb. | |
| `.btn` | Button or link styled as a button. | Variants: `.btn--primary` (IEEE blue), `.btn--gold` (RRCE gold), `.btn--ghost` (outline), `.btn--sm`. |
| `.badge` | Small uppercase pill label. | Variants: `.badge--live`, `.badge--upcoming`, `.badge--done`, `.badge--ieee`, `.badge--gold`. Add `data-event-status` and the script sets the right one. |
| `.card` | Flat hairline container, white on hover. | Add `.card--gold` or `.card--ieee` for a coloured border, `.card--navy` for a solid call-to-action tile. Put an image in `.card__media`. |
| `.person` | A card for a person: `.person__avatar` (initials), `.person__role`, name, text. | Use `.person__avatar--gold` for RRCE-side people. |
| `.stat` | Big number with a label. | Put `data-count="2297" data-suffix="+"` on the number span to animate it. |
| `.voice` | The two institution panels on the home page. | `.voice--ieee` and `.voice--rrce`. |
| `.tabs` / `.tab` | Filter buttons. | `aria-pressed="true"` marks the active one; `data-filter` names the tag. |
| `.accordion` | Native `<details>`/`<summary>` list with a plus icon. | No JavaScript needed. |
| `.field` | Label + input + error message. | Add `.field--check` for a checkbox row, `.field--fieldset` for a group of chips. |
| `.chip` | A checkbox that looks like a pill tag. | Used for "interests". |
| `.form__success` | The navy card shown after a valid submit. | `data-ref` and `data-name` are filled by `assets/js/forms.js`. |
| `.hstrip` | Horizontal strip of cards. | Pinned and scrolled sideways on desktop by GSAP; native swipe on mobile. |
| `.timeline` | Vertical timeline with a line that fills as you scroll. | Items are `.timeline__item`; add `--rrce` for gold dots. |
| `.schedule` / `.slot` | Today's programme. | Give each `.slot` `data-start` and `data-end` (ISO time with `+05:30`) and the current one is highlighted. |
| `.live-strip` | The white bar under the hero showing event status. | |
| `.cta-band` | Full-width navy call to action with the circuit backdrop. | |
| `.img-frame` | Framed photo with a cut edge. | Add `.img-frame--wide` for 21:9, `.parallax` for a gentle scroll drift, `.img-frame__caption` for a small label. |
| `.rail` | The thin scroll-progress ruler on the left. | Hidden on small screens. |

## Reveal attributes

These are data attributes, not classes. `assets/js/main.js` watches for them.

| Attribute | Effect |
|---|---|
| `data-reveal` | Fades and lifts the element in when it scrolls into view. |
| `data-reveal-stagger` | Same, but each child arrives a little after the previous one. |
| `data-split` | Splits the text into words and resolves each one from a blur. Used on `h1`, every `h2` and the first `.lead` of each page. |
| `data-count` | Counts the number up from zero. |
| `data-event-status` | Shows Live now / Today / In N days / Concluded, based on `data-start` and `data-end`. |
