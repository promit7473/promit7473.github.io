# AGENTS.md

Static GitHub Pages personal site (promit7473.github.io). Hand-written HTML/CSS/JS served from the root of `main`. No package.json, no build step, no tests, no CI — push to `main` deploys.

## Critical gotchas

- **Cache-bust `styles.css`**: every page links it with a version query (`styles.css?v=20260731b`, blog posts use `../styles.css?v=20260731b`). After editing `styles.css`, bump `?v=` in **all 12 HTML files** (6 top-level + 6 under `blog/`), or visitors keep seeing stale CSS.
- **Shared nav/footer**: pages contain empty `<div id="nav-placeholder">`; `components.js` injects the nav, footer, mobile menu, and dark-mode toggle client-side. Edit `components.js` to change the nav, footer, or CV link — never edit individual pages. The CV filename is the `CV_PATH` constant in `components.js`.
- **`archive/` is dead**: stale snapshot of the old Tailwind-based design, referenced by nothing live. Do not edit it or copy from it.

## Adding a page or blog post

Every page head must include: the inline theme script (sets `data-theme` from localStorage/prefers-color-scheme before first paint), IBM Plex + Font Awesome + Academicons CDN links, and the nav/footer placeholders. Blog posts go in `blog/` and use `../`-prefixed asset links; `components.js` auto-detects the `blog/` path prefix. Add new posts to the list in `blog.html`.

## Conventions

- Light academic PhD-applicant theme; dark mode via the `data-theme` attribute.
- Body text is justified with hyphenation (`main { text-align: justify; hyphens: auto; }`) and constrained to ~68ch via `.prose`.
- No em-dashes (—) in copy anywhere, site-wide rule.
- Project demos: MP4s in `assets/gifs/`; photos in `assets/images/`; book covers in `assets/images/books/`.
- Scripts: `components.js` (nav/footer/theme), `script.js` (scroll reveal + footer clock).

## Verification

No lint/typecheck/test. Verify by opening the HTML in a browser or serving the folder (e.g. `python -m http.server`). Test blog pages via their `/blog/...` path so the `../` link logic is exercised.
