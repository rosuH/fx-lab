# FX Lab — Product

**What it is.** An open-source gallery of 99 zero-dependency web effects (WebGL2 shaders, Canvas-2D, DOM/CSS), each a self-contained paste-anywhere snippet, plus an LLM-discoverable catalog (llms.txt + JSON manifest + per-effect pages).

**Register.** brand (design-forward showcase). The effects are the product; the gallery's job is to make a visitor feel the craft in the first five seconds.

**Audience.** Front-end devs and AI/agent builders hunting for a visual effect to drop into a page. They browse by vibe, copy one snippet, done. No signup, no build.

**Primary surface.** `web/index.html` → built into `site/index.html`. Live at https://fx.rosuh.me (also https://fx-lab.pages.dev). A live, dark, responsive grid of effect tiles; EN/中文 i18n; tiles lazy-mount/unmount on scroll.

**Brand stance.** Must read as hand-crafted, not AI-default. The effects are world-class; the chrome has to earn "how was this made?" — not "which AI made this?". Distinctive over safe.

**Constraints.** Zero runtime deps; static-hostable; the gallery imports the framework-agnostic runtime from `./src`. Dark-only by intent (effects pop hardest on near-black).

**Tokens.** `--bg #0a0b0d` · `--panel #101216` · `--line #23262d` · `--fg #e7e9ee` · `--dim #9aa3b2` · `--accent #CDE85A` (lime) · vibe text `#b58cff` (purple). Type: `system-ui` throughout (no display voice yet — a known gap).
