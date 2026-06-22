# Portfolio — Mohamed Attia

Static portfolio. Zero build step. Deploys to GitHub Pages.

## Run locally

Any static server. Pick one:

```sh
python3 -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000.

## Deploy

1. Create a public repo (e.g. `Mohamedattiadev.github.io` or `portfolio`).
2. Push this folder to `main`.
3. GitHub → Settings → Pages → Source: **GitHub Actions**.
4. Workflow in `.github/workflows/pages.yml` deploys on every push.

Live URL: `https://mohamedattiadev.github.io/<repo>/`.

## Add a blog post

1. Drop a markdown file into `blog/posts/`.
2. Add an entry to `blog/posts/index.json`:
   ```json
   { "file": "your-post.md", "title": "Your title", "date": "2026-06-22" }
   ```
3. Commit. Done.

## Pick a style

The top bar has 7 style tabs. The chosen one is saved in `localStorage`.
Once you pick a favorite, edit `index.html` to default to it and delete the
others from `assets/js/styles/` plus the switcher block.

## Stack

- Vanilla ES modules — no bundler
- [Three.js](https://threejs.org/) — Cosmos / Neon Grid / Waves
- [anime.js](https://animejs.com/) — text reveals
- [marked](https://marked.js.org/) — blog markdown
- GitHub REST API — live projects list
