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

- [ ] **Liquid text effect** (`liquify()` in the `index.astro` script) calls `getBoundingClientRect()` on every `.ch` span every frame, even when the mouse is still.
  - Run it only after a `mousemove`, and stop the loop once the ring has settled.
  - Cache each element's rect; recompute on resize and scroll.
  - Skip elements that are off screen (`IntersectionObserver`).
- [ ] **Reduced motion:** add `@media (prefers-reduced-motion: reduce)` support. Stop the ticker scroll, the liquid effect and the cursor spring, and turn off `scroll-behavior: smooth`.
- [ ] **Touch devices:** load the custom cursor and liquid effect only when `matchMedia('(hover: hover) and (pointer: fine)')` matches. The CSS already hides the cursor this way, but the JS still runs.
- [ ] **Ticker accessibility:** each row is repeated four times. Add `aria-hidden="true"` to the copies and give each icon a text label (screen-reader-only is fine). `title` alone isn't enough.
- [ ] **Character splitting:** the `data-liq` split turns headings into one `<span>` per letter. Add `aria-label` with the full text to each `[data-liq]` element so screen readers don't spell words out.
- [ ] **About layout on phones:** now in the `.about-grid` class (Phase 5). It still needs a single-column `@media` rule for phones.
- [ ] **Fonts:** load only the Roboto Mono weights in use instead of all of 100–700, or self-host with `@fontsource/roboto-mono`.
- [ ] **Devicon:** the full devicon CSS from jsDelivr blocks the first render. Consider inline SVGs for the 24 icons, or load the stylesheet without blocking.
- [ ] **Focus states:** check that `a:focus-visible` is clearly visible, since the custom cursor hides the default pointer.
- [ ] **Back to top:** the link is `href="#"`. Point it at `#top`, or skip-link to `<main>`.

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
