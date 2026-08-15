# Karen The Dentist — Landing Page

**This is the live site, not a handoff bundle.** It started as a design handoff and became production; the spec below is kept because it still documents the design accurately.

- **Live:** https://wemerson123.github.io/karen-the-dentist/
- **Served from:** `index.html`, GitHub Pages, branch `master`, path `/`
- **Deploy:** commit and push to `master`. No build step — plain HTML/CSS/vanilla JS, only Google Fonts is external.

## Overview
Premium single-page marketing site for Dr. Karen Silva's dental practice (Noosaville, Sunshine Coast). Cinematic "Sapphire" art direction: deep navy/ice palette, full-bleed photography, a character-select style profile picker, scroll-reactive hero and chair visuals, and an Instagram-style horizontal photo rail.

**Booking channels:** phone (`+61 420 234 815`) and WhatsApp are the primary calls to action; Instagram is secondary. (An earlier version of this document said bookings ran through Instagram DM — that changed and this line is the current behaviour.)

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and photography are final. Recreate pixel-perfectly; only reflow for real responsive breakpoints (the prototype is desktop-first).

## Screens / Views
Single scrolling page, sections top to bottom:

1. **Nav** — sticky, `rgba(2,7,19,.75)` + `backdrop-filter: blur(16px)`, 3-column grid (logo / links / CTA). Logo "KAREN" in Italiana serif, 19px, letter-spacing .34em. Links: Meet Karen / Care / Technology, DM Sans 9.5px uppercase letter-spacing .22em, color `#9db6d6`. CTA "Book now": outline button, border `#1768ff`, text `#8bd5ff`, hover fills white.
2. **Hero** — full-bleed `tooth-blue-hero.png` background with a left-to-right navy gradient overlay (`rgba(2,7,19,.97)→.1`). Eyebrow "Karen · Dental Care", H1 "Dentistry, personal." (Italiana, clamp(44px,6vw,84px), line-height .97; "personal." in `#51a8ff`), paragraph, two CTAs: gradient "Book your visit →" button (`linear-gradient(120deg,#0e54dc,#2f8dff 52%,#8cdaff)`) and text link "Meet Karen". Scroll cue bottom-right.
3. **Chair scene** — 88vh, radial navy background, `dental-chair-3d.png` full-bleed with `perspective:1400px` on the section; **scroll-driven 3D rotation**: as the section crosses the viewport, the image's `rotateY` sweeps roughly −17deg→+17deg and scale 1.02→1.10 (see Interactions). Headline "Comfort, reimagined." + two stat chips (360° / 01).
4. **Marquee** — infinite horizontal ticker "CARE ✦ PRECISION ✦ CONFIDENCE ✦" repeating, Italiana 24px, 22s linear loop.
5. **Choose Your Experience** (character-select) — eyebrow "The Dentist", H2 "Choose Your Experience". Two-column layout: left = info panel (specialty label, "Dr Karen Silva" name, quote, 3 stat bars: Care 98 / Clarity 96 / Comfort 99, CTA button); right = 3-photo roster, active photo full height/opacity, inactive photos 77% height, 28% opacity, desaturated, scale .86 — clicking a photo (or the ←/→ arrows below) swaps the active profile and cross-fades the panel content. Counter shows "0X / 03".
6. **One philosophy** (team grid) — white section, 3 cards (Warmth / Precision / Confidence), each: photo (390px, saturate .85), numbered eyebrow, title, one-line copy. Cards fade+rise on scroll (see Interactions).
7. **Signature care** — navy, 2×2 bordered grid, 4 items (Gentle Visits / Everyday Care / Smile Confidence / Consultation), numbered Italiana glyph + small-caps label + title + copy.
8. **Science. Art. Care.** (full-bleed break) — `karen-hero.jpg` background with dark vertical gradient, giant stacked Italiana words, note "02 / The future of dentistry still feels deeply human."
9. **Care in Clearer Detail** (technology list) — white section, 3 horizontal rows (number / 170px photo / title+copy): Digital Scanning, Considered Diagnosis, Visual Consultation.
10. **Journey** — navy, 4-column bordered grid, numbered steps: Conversation / Understanding / Personal Plan / Ongoing Care.
11. **Beyond the Dental Chair** (Instagram rail) — near-black section, horizontally scrolling row (native `overflow-x:auto` + `scroll-snap-type:x mandatory`) of 12 photo cards (mixed 260px/360px widths, 380px tall), each a link to `instagram.com/karenthedentist`, numbered caption bottom-left.
12. **Quote** — 2-column: portrait image left, big Italiana pull-quote + Instagram link right.
13. **Booking CTA** — centered, "K" monogram badge, "Ready?" eyebrow, "Begin Your Smile Journey." headline, gradient button "Book via Instagram →" linking out, disclaimer line.
14. **Footer** — logo, nav links, "Photography ↗" credit link, copyright.

## Interactions & Behavior
- **Character-select**: click a roster photo or the ←/→ buttons → updates `activeProfile` state (0/1/2) → info panel (label, quote, stat-bar widths, counter) and roster photo styles (height/opacity/filter/scale, all `transition: .6s cubic-bezier(.22,1,.36,1)`) re-render.
- **Chair scroll rotation**: on `scroll` (passive listener), compute `progress = clamp((viewportHeight - sectionTop) / (viewportHeight + sectionHeight), 0, 1)`; apply `rotateY((progress-0.5)*34deg) scale(1.02 + progress*0.08)` to the chair image, recalculated every scroll tick (no easing/debounce needed at this scale).
- **Scroll reveals**: every element with the reveal treatment starts at `opacity:0; transform: translateY(24px)`; an `IntersectionObserver` (threshold 0.15) flips it to `opacity:1; transform:none` once, then unobserves — cards within the same grid stagger via `transition-delay` (0, .1s, .2s, .3s).
- **Marquee**: pure CSS `@keyframes marquee { to { transform: translateX(-50%) } }` on a row containing the ticker content duplicated, 22s linear infinite.
- **Instagram rail**: native horizontal scroll with snap; no JS beyond that.
- All external links (`instagram.com/karenthedentist`, the Pixieset photography credit) open in a new tab (`target="_blank" rel="noreferrer"`).
- No forms on this page — booking is entirely via the Instagram CTAs.

## State Management
- `activeProfile: number` (0–2) — which roster photo/info panel is showing. Derived values per render: `profileCounter`, panel label/quote/stat percentages, and per-photo style (height/opacity/filter/scale/border).
- No async data fetching; all content is static copy + local images.

## Design Tokens
**Colors**
- Background (deep navy): `#020713`
- Section navy (alt): `#061126`
- Light section bg: `#f7fbff`
- Primary text (on navy): `#f7fbff`
- Muted text (on navy): `#9db6d6` / `#8798b2` / `#71809a`
- Accent blue: `#1768ff`
- Accent light blue: `#8bd5ff` / `#51a8ff`
- CTA gradient: `linear-gradient(120deg,#0e54dc,#2f8dff 52%,#8cdaff)`
- Divider lines (on navy): `#1c2b45`
- Divider lines (on light): `#dbe4f0`
- Dark section (Instagram rail): `#0b0a08` / card bg `#171510`

**Typography**
- Display/serif: **Italiana** (headlines, numerals, quotes), weight 400
- Body/UI: **DM Sans**, weights 300/400/500/600
- Scale: eyebrows 9–10.5px uppercase (letter-spacing .2–.3em); H1/H2 `clamp(44px,5.5–7vw,90px)` line-height .9–.97; body 13–17px, line-height 1.6–1.8

**Spacing / Radius / Shadows**
- Section padding: 100–140px vertical, 5vw horizontal
- Card/grid gaps: 18–50px depending on section
- Corner radius: 0 (the whole design is intentionally square-edged/architectural)
- Shadows: CTA buttons `box-shadow: 0 12px 40px rgba(20,101,255,.25)`, hover `0 18px 48px rgba(34,128,255,.45)`; nothing else is shadowed (flat, editorial look)

## Assets
All photography is the client's own (not stock):
- `tooth-blue-hero.png`, `dental-chair-3d.png` — hero/chair renders
- `karen-hero.jpg`, `karen-care.jpg`, `karen-mirror.jpg`, `karen-portrait.jpg`, `karen-with-child.jpg`, `karen-scanning-action.jpg`, `karen-closeup-exam.jpg`, `karen-shade-mirror.jpg`, `karen-mirror-reveal.jpg` — clinic/portrait photography supplied by the client (originally sourced from her photographer's Pixieset gallery and her own camera roll)
- `ig-01.jpg` … `ig-12.jpg` — Instagram-rail photography, also client-supplied
- Fonts: Google Fonts "Italiana" and "DM Sans" (loaded via `<link>`, no license concerns)

## Files
- `index.html` — **the site.** Structure, inline styles and interaction logic, all in one file. This is what Pages serves and the only file to edit.
- `assets/` — every image referenced above, at the same relative paths the HTML uses

Two files were removed on 2026-08-15: `karen-the-dentist.html` (a byte-identical copy of `index.html` that had to be hand-synced and had already drifted once) and `karen-the-dentist-source.dc.html` (a broken design-tool export — it loads `./support.js`, which was never in the repo). Both were publicly reachable and served duplicate content. They remain in git history if ever needed.
