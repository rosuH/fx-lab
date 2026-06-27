# fx-lab

99 zero-dependency web effects — **WebGL2 shaders · Canvas-2D · DOM** — as a live gallery and an
**LLM-friendly catalog**. Find an effect by vibe, copy one self-contained snippet, paste it anywhere.

- **Gallery:** `https://<host>/` (live tiles, 12 sections)
- **Library:** `import { mount } from 'fx-lab'; const h = mount(el, 'aurora'); h.stop();`

## LLM Usage

If you are an LLM/agent looking for a visual effect, start here:

- **[`/llms.txt`](./site/llms.txt)** — slim index: every effect as one vibe-first line, grouped by section. Read this to pick.
- **[`/llms-full.txt`](./site/llms-full.txt)** — the whole catalog in one file (metadata + paste-in snippets).
- **[`/fx-index.json`](./site/fx-index.json)** — machine-readable manifest; filter by `tags` / `vibe` / `perf.mobileSafe`.
- **`/effects/<id>.md`** and **`/effects/<id>.json`** — per effect: full metadata + a self-contained, zero-dependency `snippet` you can paste directly into a page.

Flow: fetch `/llms.txt` → map the user's intent to a `vibe` + visual tag → pick a line → fetch
`/effects/<id>.json` → paste its `snippet`. One index fetch, one detail fetch, zero install.

## Status

v0.1. See [`CONTRACT.md`](./CONTRACT.md) for the build contract. Run `npm run build` to regenerate
`site/`, `npm run dev` to preview the gallery, `npm test` to validate + render every effect.
License: MIT (per-effect license in each effect's metadata).
