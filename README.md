# s09z.github.io

Personal portfolio of Ittichai "Oat" Boonyarakthunya — live at **https://s09z.github.io**.

Static single-page site with a terminal-style design.

## Stack

- [Astro 4](https://astro.build) (static output)
- Tailwind CSS 3 + custom CSS tokens in `src/styles/globals.css`
- [Bun](https://bun.sh) 1.3.9 as package manager / runner
- GitHub Pages via GitHub Actions

## Development

```bash
bun install
bun run dev       # http://localhost:4321
bun run build     # output in ./dist
bun run preview   # serve the build locally
```

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which installs with `bun install --frozen-lockfile`, builds, and publishes `./dist` to GitHub Pages. After changing dependencies, run `bun install` and commit the updated `bun.lock`.

## Project structure

```
src/
  layouts/Layout.astro   <head>, fonts, meta
  pages/index.astro      all content + page script
  styles/globals.css     design tokens and component classes
public/                  static assets
design/                  design references (not built)
```
