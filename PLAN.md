# Portfolio Plan

Analysis of the site as of 2026-10-14, and the tasks that follow from it. Tick items as you finish them, and add new findings under the matching phase.

Legend: 🔴 visitors can see it / it's broken · 🟡 quality or performance · 🟢 nice to have · 👤 needs input from Oat

---

## Snapshot

| Area | State |
|---|---|
| Stack | Astro 4.16, Tailwind 3.4 (barely used), Bun 1.3.9, GitHub Pages |
| Pages | One page: `src/pages/index.astro` (hero, tech ticker, about, projects, career, contact) |
| Strengths | Strong, consistent terminal style; content kept as data arrays; fast static output |
| Main gaps | Placeholder content is live, details contradict each other, no reduced-motion support, heavy per-frame JS, no social/SEO meta, dead code from the Next.js version |

---

## Phase 1: Placeholders visitors can see 🔴

- [ ] 👤 Remove the `// SUPPLY REAL SCREENSHOTS + LINKS` note under "Selected case studies" (`index.astro` ~L288).
- [ ] 👤 Make the project cards link somewhere real. All three use `href="#"` and show "case study →" (~L293).
  - Option A: add a `link` field to each `projects` entry and render the CTA only when it's set.
  - Option B: build case-study pages from an Astro content collection (`src/content/projects/*.md`) at `/projects/[slug]`.
  - Use the unused `public/images/neon-signature.png` and `neon-github-workspace.png` as card or cover images.
- [ ] 👤 Make the resume link work (~L398, currently `href="#"`). Put the PDF at `public/resume.pdf` and link to it with `download`. `design/Profile.pdf` may be a starting point.
- [ ] 👤 Replace the `[ oat.jpg ] not found` avatar with a real photo (~L173), served through `astro:assets` `<Image>`.
- [ ] 👤 Explain or replace the `07/01` label under "Bangkok" in the hero stats (~L160).

## Phase 2: Contradictory details 🔴

- [ ] Change the default `description` in `src/layouts/Layout.astro`. It says "Mid-level… 5+ years", but the page says "Senior… 8+ years".
- [ ] 👤 Make years of experience agree everywhere: "8+ years" in the hero, `08` in About, "Eight years…" in Career. Work history starts in 2016, which is about 10 years.
- [ ] 👤 Explain the 2018–2020 gap in `workHistory`, or fill it in.
- [ ] 👤 Explain the overlap between the 2020–2022 freelance project and the 2020–2021 job at SO-Siamrajathanee.
- [ ] 👤 Back up the stated move toward ML, LLM and AI engineering with at least one AI project or demo in `projects`.

## Phase 3: Performance and accessibility 🟡

- [x] **Liquid text effect:** it no longer calls `getBoundingClientRect()` every frame.
  - Each character's position is measured once and cached. It is measured again when the page changes size (a `ResizeObserver` on `<body>`) and after fonts load.
  - Animation frames run only after the mouse moves or the page scrolls, and stop once the ring has settled.
  - An `IntersectionObserver` turned out to be unnecessary: with cached positions, checking about 600 characters is just arithmetic, and styles are only written to characters near the pointer.
- [x] **Reduced motion:** the ticker scroll, blinking cursor, icon zoom and smooth scrolling stop under `prefers-reduced-motion: reduce`, and the custom cursor and liquid effect switch off entirely.
- [x] **Touch devices:** one media query (`fancyMQ` in JS, matched in `globals.css`) controls the custom cursor and liquid effect: `(hover: hover) and (pointer: fine) and (min-width: 901px) and (prefers-reduced-motion: no-preference)`. It also handles the setting changing while the page is open. Phones keep the plain text.
- [x] **Ticker accessibility:** the animated ticker is hidden from screen readers (`aria-hidden`). A screen-reader-only list ("Tech stack") replaces it. The three repeated row blocks are now one loop.
- [x] **Character splitting:** each text run becomes a screen-reader-only copy plus a hidden `<span>` holding the per-letter spans. This was used instead of `aria-label`, which screen readers often ignore on `<p>` and `<h2>`.
- [x] **About layout on phones:** under 768px `.about-grid` becomes one column and the stats sit in a row.
- [x] **Fonts:** Roboto Mono now loads only weights 400, 600 and 700.
- [x] **Devicon:** the stylesheet loads without blocking the first render (`media="print"` swapped on load, with a `<noscript>` fallback). `.ticker-icon` reserves its height so the page doesn't jump when icons arrive.
- [x] **Focus states:** added a global `:focus-visible` outline in the accent colour, plus a "Skip to content" link that appears on keyboard focus.
- [x] **Back to top:** the nav logo and the back-to-top button link to `#top` (on `<body>`). `<main>` has `id="main"` as the skip-link target.

## Phase 4: Link previews and search 🟡

- [ ] Accept `ogImage` and `canonical` props in `Layout.astro`, and output Open Graph and Twitter meta tags.
- [ ] 👤 Make a 1200×630 preview image in the terminal style and save it as `public/og.png`.
- [ ] Add `@astrojs/sitemap` (`site` is already set in `astro.config.mjs`) and `public/robots.txt`.
- [ ] Add JSON-LD structured data for a `Person` (name, jobTitle, sameAs: GitHub and LinkedIn).
- [ ] Add `apple-touch-icon` and a PNG favicon fallback. `public/images/_favicon.png` exists but isn't used.

## Phase 5: Cleanup 🟡

- [x] Delete `src/components/StarField.astro` and `src/components/HackedTextTitle.astro`; neither is imported.
- [x] Remove `gsap` from `package.json` (only StarField used it), then run `bun install` and commit `bun.lock`.
- [x] Delete the Next.js leftovers `public/next.svg` and `public/vercel.svg`.
- [x] Replace the Next.js boilerplate in `README.md` with a short project README (stack, commands, deploy).
- [x] Make the `Makefile` call the `bun run` scripts, or delete it.
- [x] Move repeated inline styles in `index.astro` (paragraph font size, colour and line height) into classes in `globals.css`. Added `about-grid`, `about-body`, `about-stats`, `project-card-role` and `.stat-num.accent`. One-off inline styles were left alone; the placeholder note goes in Phase 1.
- [ ] 👤 Decide whether to keep the phone number in Contact. It invites spam; email and LinkedIn are usually enough.

## Phase 6: New features 🟢

- [ ] **Thai/English toggle:** Astro i18n routing (`/` and `/th/`), or a client-side toggle for a single page.
- [ ] **Notes/blog section:** a content collection (`src/content/notes`) for short AI/ML write-ups. Mark it up as `$ ls ./notes`.
- [ ] **Privacy-friendly analytics:** Cloudflare Web Analytics or Plausible, without cookies.
- [ ] **Terminal easter egg:** a hidden prompt where `help`, `whoami` and `cat resume` jump to sections. `design/directions/terminal-addons.js` may already have ideas.
- [ ] **Astro 5 upgrade:** do it after Phases 1–5 so you're upgrading less code. Check that `@astrojs/tailwind` is still supported, or move to Tailwind 4 + `@tailwindcss/vite`.

---

## Done

- [x] 2026-10-14: Updated dependencies (astro 4.16.19, tailwind 3.4.19, gsap 3.15, TS 5.9) and brought `bun.lock` back in line with `package.json`.
- [x] 2026-10-14: CI pins `bun-version: 1.3.9`; the cache key now hashes `bun.lock` instead of the missing `bun.lockb`.
- [x] 2026-10-14: Security review of the dependency and CI changes found nothing.

## Inputs needed from Oat 👤

1. Links or screenshots for the three projects, or approval to build case-study pages.
2. The resume PDF (current version).
3. A profile photo.
4. What `07/01` means.
5. The correct years of experience, and notes on the 2018–2020 gap and the 2020–2021 overlap.
6. Any AI/ML project to feature.
7. Whether to keep the phone number public.
