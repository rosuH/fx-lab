# fx-lab — build contract (authoritative spec)

Every contributor and build step follows THIS file. Do not invent alternative shapes. The 99 effect
modules are already extracted (deterministically, verbatim) into `src/effects/`. Build everything
else to fit them.

## 0. Ground truth already in the repo

- `src/effects/shader/<id>.js` ×11 — `export default { meta, glsl: '<void main(){...}>' }`
- `src/effects/canvas/<id>.js` ×82 — `export default { meta, draw: function(ctx,w,h,t,mx,my,state){...} }`
- `src/effects/dom/<id>.js` ×6 — `export default { meta, selector, _raw, init: null }` (NEEDS adaptation, see §4)
- `src/registry.js` — GENERATED barrel: `export const REGISTRY = { id: module }`, `export const IDS`
- `src/runtime/preamble.js` — `export const PRE` (verbatim GLSL header: `#version 300 es`, precision, uniforms `iResolution`/`iTime`/`iMouse`, `out vec4 o`, helpers `hash/noise/fbm`)
- `src/runtime/noise.js` — `export const NOISE = { vhash, vnoise }`. Canvas effects that call `this.vhash`/`this.vnoise` (only `topo`, `heatmap`) require the runtime to invoke `draw` with `this === NOISE`.
- `build/sections.js` — `export const SECTIONS` (12, ordered)
- `build/taxonomy.js` — closed `TAGS_ALL`, `VIBES`, `validateTaxonomy(meta)`

## 1. Effect metadata schema (the `meta` object)

Fields already present in every module (stub values where authored fields are blank):
`id, kind, name, nameLocal, section, summary, description, descriptionZh, tags, vibe, culture,
accuracyNote, perf{gpu,cpu,mobileSafe}, interactive{followsCursor,trigger}, reducedMotion,
deterministic, state, license, attribution`.

- **Authored** (metadata pass fills): `summary` (≤120 chars, **vibe-first**: mood+visual, NOT tech), `description` (1–3 EN sentences), `tags` (4–8 from `TAGS_ALL`), `vibe` (1–4 from `VIBES`), `culture` (clean string or null), `accuracyNote` (set ONLY for procedural approximations of real cultural patterns), and corrections to `interactive.trigger` (`none|hover|click|scroll|auto`), `reducedMotion` (`freeze|static|crossfade|animate`), `deterministic` (false for unseeded `Math.random`/live `new Date()`), `state` (`{persistent:true,notes}` for effects that don't clear each frame), `attribution` (`{author,url}` when `license==='custom'`).
- **Pre-filled deterministically** (refine only if wrong): `id, kind, name, nameLocal, section, descriptionZh, perf, interactive.followsCursor, license='MIT'`.
- `source`, `snippet`, `mountSnippet`, `runtimeNotes`, `url`, `preview` are **DERIVED by build** — never authored, never stored in modules.

JSON Schema lives at `schema/effect.schema.json` (build it from this list).

## 2. Runtime — `src/runtime/`

- `scheduler.js`: ONE `requestAnimationFrame` loop for all mounted effects. `IntersectionObserver` sets `canvas.__vis`; skip drawing off-screen tiles. Each `draw(t)` wrapped in `try/catch` (one effect erroring never breaks others). `t` = seconds (`performance.now()/1000` from a shared origin). `ResizeObserver` keeps physical size in sync; `DPR = Math.min(2, devicePixelRatio||1)`. Reads `matchMedia('(prefers-reduced-motion: reduce)')`; under reduce, honor each effect's `meta.reducedMotion` (default `freeze` = render exactly one frame then stop scheduling it).
- `gl.js`: `makeGL(canvas, glsl)` builds a WebGL2 context using `PRE + glsl`, full-screen triangle VS (`in vec2 p; void main(){ gl_Position=vec4(p,0,1); }`), uniforms `iResolution`(physical px), `iTime`(s), `iMouse`(physical px, **Y-flipped**, defaults to center when no pointer). Keep a **module-level live-context counter**; refuse beyond cap (default 8) returning `null` + a clear `console.error` (do NOT throw). Decrement on stop/`webglcontextlost`.
- `canvas.js`: per-tile 2D context with `ctx.setTransform(dpr,0,0,dpr,0,0)` (coords in CSS px). Call `module.draw.call(NOISE, ctx, w, h, t, mx, my, state)` — `this===NOISE` so `this.vhash/this.vnoise` resolve. `mx,my` in CSS px, **`-9999` when not hovering**. `state` = a per-mount `{}` persisted across frames.
- `dom.js`: dispatches an adapted dom effect's `init(root)`.
- `mount.js`: **`mount(el, id, opts) -> handle` where `handle.stop()` releases everything** (rAF dereg, GL context + counter decrement, observers, listeners, timers). Route by `REGISTRY[id].meta.kind`. This lifecycle is what the original demo lacked — get it right (no leaks on repeated mount/stop).
- `index.js`: `export { mount, stopAll, REGISTRY, IDS, listEffects }`. `listEffects()` returns the meta array.

## 3. snippet.js (build/) — the field an LLM pastes

`buildSnippet(module) -> { snippet, mountSnippet }`. `snippet` is a COMPLETE zero-dependency,
paste-anywhere block that runs with no imports. One `switch (kind)`:
- **shader**: a `<canvas>` + inlined minimal `makeGL` harness with the `PRE` string + the effect's `glsl` + a self-contained rAF loop + pointer handling. Must run standalone.
- **canvas**: a `<canvas>` + inlined `setTransform(dpr)` + a self-contained rAF loop calling the `draw` body. **If the effect uses `this.vhash/this.vnoise`, inline `vhash`+`vnoise` and call `draw.call({vhash,vnoise}, …)`.**
- **dom**: the sentinel HTML (from `selector`) + the adapted `init` inlined.
Prepend `attribution` (author/url) and `accuracyNote` as code comments so they travel with copied code.
`mountSnippet`: short form for runtime users — `import { mount } from 'fx-lab'; mount(el, '<id>');`.

## 4. The 6 dom effects need adaptation (runtime task)

Each `src/effects/dom/<id>.js` has `_raw` (the original `initXxx(){...}` using `this.root`,
`this.domSteps`, timers). Rewrite into `init(root) => ({ step?(t){}, stop(){} })`:
`this.root` -> `root`; pushes to `this.domSteps` -> return a `step(t)`; event listeners + timers
must be removable in `stop()`. Keep behavior identical. Delete `_raw` and `init:null` when done.

## 5. build.mjs (build/) — fan-out, with GATES

Import `src/registry.js`. Validate every `meta` against `schema/effect.schema.json` AND
`validateTaxonomy`. **FAIL the build (non-zero exit) on:** duplicate `id`; unknown tag/vibe;
`license==='custom'` with null `attribution`. Then derive `source`/`snippet`/`mountSnippet`/
`runtimeNotes`/`url` and write into `site/`:
- `site/fx-index.json` — `{ name, version, homepage, sections, effects:[meta-without-source + url + preview] }` (validate vs `schema/manifest.schema.json`)
- `site/effects/<id>.json` — full meta + source + snippet + mountSnippet + runtimeNotes (self-contained)
- `site/effects/<id>.md` — H1 `name (kind)` → blockquote (visual + mood) → metadata block → `## Drop-in snippet` (fenced) → `## Runtime notes` → `## Known limitations` (accuracyNote + non-determinism/accumulator + WebGL cap for shaders)
- `site/llms.txt` — H1 `FX Lab`; blockquote (what it is + runtime contract in one breath); one body paragraph printing the `VIBES` vocabulary once; then 12 `## <section.label>` with lines `- [name](<homepage>/effects/<id>.md): <summary>`; a trailing `## Optional` for the heaviest/niche effects (perf.cpu==='high' or mobileSafe===false) so short-context agents can skip.
- `site/llms-full.txt` — all `<id>.md` concatenated with `---`; inline canvas snippets; for shaders link the glsl in `<id>.json` rather than inlining.
- copy `schema/effect.schema.json` into `site/schema/`.
`runtimeNotes` assembled from kind+perf+state+cap (shaders: "Browsers cap ~8–16 live WebGL2 contexts; safe up to ~8 shader effects per page.").

## 6. gallery — site/index.html

Reads `fx-index.json`, renders 12 sections of tiles, mounts each via the runtime (`dist/fx-lab.esm.js` or `src/index.js` during dev). `<head>` MUST carry
`<link rel="alternate" type="text/markdown" href="/llms.txt">` and `<meta name="llms-txt" content="/llms.txt">`. Respect `prefers-reduced-motion`.

## 7. tests — test/smoke.mjs

(1) Node: import registry, assert each `meta` validates + taxonomy passes + no duplicate id.
(2) Headless (Playwright, skip gracefully if unavailable): load each generated `snippet` standalone in a page, wait 2 rAF, assert no uncaught error and a non-blank canvas where applicable. The snippet is the ONLY use path — this guards "paste = runs". Skip pixel asserts where `deterministic===false`.

## 8. Paths & conventions

Repo root = the directory containing `package.json`. ESM everywhere (`"type":"module"`). No runtime deps.
`site/` is generated — never hand-edit except `index.html` is a template that reads the manifest.
No MCP, no CLI (non-goals). The paste IS the install.
