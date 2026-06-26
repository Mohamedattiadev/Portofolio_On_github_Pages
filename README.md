# Portfolio — Mohamed Attia

Static portfolio. Zero build step. Pure HTML/CSS/ES modules. Deploys to GitHub Pages.

Live: https://mohamedattiadev.github.io

## Features

- **SPA router** — four pages (`/`, `/work`, `/journal`, `/contact`) + `/404`, hash-free URLs via History API with a GitHub Pages 404-redirect bounce.
- **i18n** — EN / TR / AR with full RTL flip. Persisted in `localStorage`, auto-detected from `navigator.language` on first visit. Topbar dropdown (desktop) + button row (mobile).
- **Live work grid** — repos pulled from GitHub REST API, cached 1h in `localStorage`, retry-on-failure, hover preview with README, stars/forks/issues, license, live-demo detection.
- **Journal** — markdown posts from `assets/data/journal.json`, in-browser CRUD for the owner, draft templates, table-of-contents rail, scroll-spy.
- **Offline-ready** — Service Worker precaches the shell + fonts, stale-while-revalidate for data, offline fallback page.
- **Smooth scroll** — Lenis + GSAP ScrollTrigger.
- **Owner mode** — `?owner=1` or sign-in dialog (SHA-256-hashed password gates the journal editor UI; data lives entirely in the visitor's own `localStorage`).

## Run locally

```sh
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000.

## Deploy

Push to `main` — GitHub Actions (`.github/workflows/pages.yml`) builds the static shell and publishes to Pages.

## Add a journal post

```sh
node scripts/publish-post.mjs path/to/post.md
```

This appends the post to `assets/data/journal.json` and copies the markdown into `posts/`.

Or in the browser as owner: `/journal` → **New post** → pick a template → write markdown → save. Use **Export** to dump a JSON backup.

## i18n

Add a new key:

1. `assets/js/i18n.js` → add the entry to the `en` / `tr` / `ar` dicts.
2. In `index.html`: `<el data-i18n="my.key">English fallback</el>` (or `data-i18n-html` for trusted markup, `data-i18n-attr="placeholder:my.key"` for attributes).
3. In `main.js` dynamic strings: `import { t } from "./i18n.js"` and use `t("my.key")`.

Language change fires `window.dispatchEvent("i18n:change")` so dynamic content (work cards, journal post meta) re-renders.

## Stack

- Vanilla ES modules — no bundler, no framework
- [GSAP](https://gsap.com/) + [ScrollTrigger](https://gsap.com/scrolltrigger/) — animations
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll
- [marked](https://marked.js.org/) — markdown rendering
- GitHub REST API — live projects list
- Simple Icons CDN — tech-stack icons

## Project structure

```
.
├── index.html               # shell + critical CSS + importmap
├── assets/
│   ├── css/base.css         # all styles
│   ├── js/
│   │   ├── main.js          # router, pages, editor, GSAP, fetchers
│   │   ├── i18n.js          # EN/TR/AR dicts + apply/setLang
│   │   └── utils.js         # slugify, readingTime, escape helpers
│   ├── vendor/              # bundled GSAP/Lenis/marked (importmap targets)
│   ├── data/journal.json    # journal index
│   └── fonts/jbmono-*.woff2 # JetBrains Mono subsets
├── posts/                   # markdown post bodies
├── scripts/publish-post.mjs # CLI publisher
├── sw.js                    # service worker (versioned cache)
└── 404.html / offline.html  # GitHub Pages fallback + offline shell
```

## Tests

```sh
npm test
```

Node-based unit tests for `assets/js/utils.js` (slugify, readingTime, escape, date sort, route normalizer).

## Updating the service worker

Bump `VERSION` in `sw.js` whenever you ship CSS / JS / HTML changes — the SW unregisters the old cache + the page auto-reloads on `controllerchange`.
