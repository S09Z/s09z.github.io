# s09z.github.io

Personal portfolio for Ittichai "Oat" Boonyarakthunya. It is a single-page static site built with Astro 4 and Bun, and deployed to GitHub Pages at https://s09z.github.io.

The current task list is in [PLAN.md](PLAN.md). Check it before starting work, and tick items off as you finish them.

## Commands

```bash
bun install          # install deps (updates bun.lock)
bun run dev          # dev server at localhost:4321
bun run build        # static build to ./dist
bun run preview      # serve ./dist
```

The `Makefile` targets (`make dev`, `make build`…) just call these scripts.

## Layout

- `src/pages/index.astro` holds the whole site. Content is kept as data arrays in the frontmatter (`techRows`, `projects`, `workHistory`), followed by the markup and one inline `<script>` that runs the clock, custom cursor and "liquid" text effect.
- `src/layouts/Layout.astro` contains `<head>`: meta tags, Google Fonts (Roboto Mono) and the devicon CDN stylesheet.
- `src/styles/globals.css` holds the design tokens (`--bg`, `--fg`, `--accent`, `--muted`, `--border`…) and every component class (`t-nav`, `t-section`, `project-card`, `work-entry`, `contact-item`…).
- `design/` holds design references: HTML mockups, `directions/`, and `Profile.pdf`. They are not part of the build.
- `public/` holds static assets served from `/`.

## Conventions

- **Visual style:** a dark terminal / CLI look. Use monospace type, `$ command` prompts, `// labels`, `NN / section` numbering and a violet accent (`--accent: #a78bfa`). New sections should follow the same `t-section` → `t-section-head` → `t-h2` structure.
- **Styling:** use the custom classes in `globals.css` and the CSS variables. Tailwind is installed but barely used, and its theme isn't extended. Don't add hard-coded colours; add a token instead. Prefer classes over new inline `style=""` attributes, because media queries can't override inline styles.
- **Content:** edit the frontmatter arrays rather than duplicating markup. The site mixes English with some Thai lines on purpose.
- **Animations:** any new motion must respect `prefers-reduced-motion` and must not run on touch-only devices. Gate pointer-driven effects behind `fancyMQ` in `index.astro`, and keep that query identical to the `.cursor-ring, .cursor-dot` media query in `globals.css`. CSS animations need an override in the "Reduced motion" block at the end of `globals.css`.
- **Accessibility:** decorative or duplicated content gets `aria-hidden="true"` plus a `sr-only` equivalent. Keep the `:focus-visible` outline and the skip link working.
- **Verifying UI changes:** read the `.astro`/`.css` source and run `bun run build`. Don't take browser screenshots unless asked, because they leave PNG clutter in the repo.

## Dependencies and CI

- The package manager is **Bun 1.3.9**. The lockfile is the text `bun.lock`, not `bun.lockb`.
- After changing `package.json`, run `bun install` and commit `bun.lock`. CI uses `bun install --frozen-lockfile` and fails if the two files disagree.
- `.github/workflows/deploy.yml` builds and deploys to Pages on every push to `main`. It pins `bun-version: 1.3.9`, so update that line when you upgrade Bun locally.
- `.env` and `.env.production` are gitignored. Never commit them.
