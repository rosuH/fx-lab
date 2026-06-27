// build/build.mjs — single fan-out (CONTRACT 5). Runs the validate GATES, then derives
// source/snippet/mountSnippet/runtimeNotes/url and writes every site/ artifact.
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { REGISTRY, IDS } from '../src/registry.js';
import { SECTIONS } from './sections.js';
import { VIBES } from './taxonomy.js';
import { buildSnippet } from './snippet.js';
import { validateAll, validate, loadEffectSchema } from './validate.mjs';
import { readFileSync } from 'node:fs';

// homepage: edit here. No trailing slash.
const HOMEPAGE = 'https://fx-lab.example';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(ROOT, 'site');
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));

// --- derivations -----------------------------------------------------------------------------
const isOptional = (m) => m.perf.cpu === 'high' || m.perf.mobileSafe === false;

function sourceOf(mod) {
  const k = mod.meta.kind;
  if (k === 'shader') return mod.glsl;
  if (k === 'canvas') return mod.draw.toString();
  return mod.init ? mod.init.toString() : (mod._raw || ''); // dom: adapted init (or raw if un-adapted)
}

function runtimeNotes(meta) {
  const p = meta.perf, out = [];
  if (meta.kind === 'shader')
    out.push('WebGL2 fragment shader compiled against the shared PRE preamble (uniforms iResolution, iTime, iMouse — iMouse is Y-flipped physical px, centered when no pointer). Browsers cap ~8–16 live WebGL2 contexts; the gallery lazy-unmounts off-screen tiles to stay under the limit.');
  else if (meta.kind === 'canvas')
    out.push('Canvas2D: draw(ctx, w, h, t, mx, my, state) runs each frame; w/h and mx/my are CSS px (mx,my = -9999 when not hovering), ctx is pre-scaled by DPR = min(2, devicePixelRatio).');
  else
    out.push('DOM: init(root) wires listeners/timers and returns { step?(t), stop() }; stop() releases everything for leak-free remounts.');
  out.push(`Perf budget — gpu: ${p.gpu}, cpu: ${p.cpu}, mobileSafe: ${p.mobileSafe}.`);
  if (meta.state && meta.state.persistent)
    out.push(`Persistent accumulator: ${meta.state.notes || 'does not clear each frame; remounting resets it.'}`);
  if (meta.deterministic === false)
    out.push('Non-deterministic: uses unseeded randomness or wall-clock time, so output differs run to run.');
  out.push(`Reduced motion: ${meta.reducedMotion}.`);
  return out.join(' ');
}

function summaryText(meta) {
  return (meta.summary && meta.summary.trim()) || meta.descriptionZh || meta.description || meta.name;
}

function metaBlock(meta) {
  const a = meta.attribution;
  const lic = meta.license + (a && a.author ? ` (© ${a.author}${a.url ? ', ' + a.url : ''})` : '');
  return [
    `- **id**: \`${meta.id}\` · **kind**: ${meta.kind} · **section**: ${meta.section}`,
    `- **tags**: ${meta.tags.length ? meta.tags.join(', ') : '—'} · **vibe**: ${meta.vibe.length ? meta.vibe.join(', ') : '—'}`,
    `- **culture**: ${meta.culture || '—'}`,
    `- **perf**: gpu ${meta.perf.gpu} / cpu ${meta.perf.cpu} / mobileSafe ${meta.perf.mobileSafe}`,
    `- **interactive**: followsCursor ${meta.interactive.followsCursor}, trigger ${meta.interactive.trigger}`,
    `- **reducedMotion**: ${meta.reducedMotion} · **deterministic**: ${meta.deterministic}`,
    `- **license**: ${lic}`,
  ].join('\n');
}

function limitations(mod) {
  const meta = mod.meta, out = [];
  if (meta.accuracyNote) out.push(meta.accuracyNote);
  if (meta.deterministic === false) out.push('Non-deterministic (unseeded random / wall-clock): pixels differ run to run.');
  if (meta.state && meta.state.persistent) out.push(`Accumulates state across frames${meta.state.notes ? ' — ' + meta.state.notes : ''}; remount to reset.`);
  if (meta.kind === 'shader') out.push('WebGL2 context limit: browsers cap ~8–16 live contexts; unmount off-screen shaders (the gallery does this) to stay under it.');
  if (!out.length) out.push('None noted.');
  return out.map((l) => `- ${l}`).join('\n');
}

// One markdown twin. inlineShader=false (llms-full) links the shader snippet out instead of inlining.
function effectMd(mod, snippet, { inlineShader = true } = {}) {
  const meta = mod.meta;
  const linkShaderOut = meta.kind === 'shader' && !inlineShader;
  const snippetSection = linkShaderOut
    ? `See full GLSL + drop-in snippet in [${meta.id}.json](${HOMEPAGE}/effects/${meta.id}.json).`
    : '```html\n' + snippet + '\n```';
  return `# ${meta.name} (${meta.kind})

> ${summaryText(meta)}

${metaBlock(meta)}

## Drop-in snippet

${snippetSection}

## Runtime notes

${runtimeNotes(meta)}

## Known limitations

${limitations(mod)}
`;
}

function llmsTxt() {
  const bySection = new Map(SECTIONS.map((s) => [s.id, []]));
  const optional = [];
  for (const id of IDS) {
    const meta = REGISTRY[id].meta;
    const line = `- [${meta.name}](${HOMEPAGE}/effects/${meta.id}.md): ${summaryText(meta)}`;
    if (isOptional(meta)) optional.push(line);
    else (bySection.get(meta.section) || optional).push(line);
  }
  const parts = [];
  parts.push('# FX Lab');
  parts.push('');
  parts.push('> 99 zero-dependency web effects (WebGL2 / Canvas2D / DOM), each a paste-anywhere snippet. Canvas effects run draw(ctx,w,h,t,mx,my,state) in CSS px (mx,my = -9999 off-cursor); shaders compile against a shared PRE preamble exposing iResolution/iTime/iMouse; DOM effects expose init(root)->{step,stop}. Pick by vibe, then fetch a row’s .md for the snippet + runtime constraints.');
  parts.push('');
  parts.push('Vibes (map intent first): ' + VIBES.join(' · ') + '.');
  parts.push('');
  for (const s of SECTIONS) {
    parts.push(`## ${s.label}`);
    const lines = bySection.get(s.id) || [];
    if (lines.length) parts.push(lines.join('\n'));
    parts.push('');
  }
  parts.push('## Optional');
  parts.push('Heavier or niche effects (cpu: high or not mobile-safe) — short-context agents can skip.');
  if (optional.length) parts.push(optional.join('\n'));
  parts.push('');
  return parts.join('\n');
}

// Chinese twin of llms.txt — for zh-language agents. Uses native names + descriptionZh + section labelZh.
function llmsTxtZh() {
  const bySection = new Map(SECTIONS.map((s) => [s.id, []]));
  const optional = [];
  for (const id of IDS) {
    const m = REGISTRY[id].meta;
    const name = m.nameLocal || m.name;
    const desc = (m.descriptionZh && m.descriptionZh.trim()) || summaryText(m);
    const line = `- [${name}](${HOMEPAGE}/effects/${m.id}.md): ${desc}`;
    if (isOptional(m)) optional.push(line);
    else (bySection.get(m.section) || optional).push(line);
  }
  const parts = ['# FX Lab', ''];
  parts.push('> 99 个零依赖网页特效（WebGL2 着色器 / Canvas2D / DOM），每个都是可粘贴即用的代码片段。Canvas 特效以 draw(ctx,w,h,t,mx,my,state) 逐帧绘制，坐标为 CSS 像素（无悬停时 mx,my = -9999）；着色器编译时共用 PRE 头，提供 iResolution / iTime / iMouse；DOM 特效暴露 init(root)->{step,stop}。先按氛围（vibe）挑选，再抓取对应 .md 获取片段与运行约束。');
  parts.push('');
  parts.push('氛围标签 vibe（先按意图匹配）：' + VIBES.join(' · ') + '。');
  parts.push('');
  for (const s of SECTIONS) {
    parts.push(`## ${s.labelZh || s.label}`);
    const lines = bySection.get(s.id) || [];
    if (lines.length) parts.push(lines.join('\n'));
    parts.push('');
  }
  parts.push('## 可选（重型 / 小众）');
  parts.push('CPU 较重或非移动端友好的特效——上下文有限的 agent 可跳过。');
  if (optional.length) parts.push(optional.join('\n'));
  parts.push('');
  return parts.join('\n');
}

// --- write everything ------------------------------------------------------------------------
export function buildSite() {
  rmSync(SITE, { recursive: true, force: true });
  mkdirSync(join(SITE, 'effects'), { recursive: true });
  mkdirSync(join(SITE, 'schema'), { recursive: true });

  const written = [];
  const w = (rel, data) => { writeFileSync(join(SITE, rel), data); written.push(join('site', rel)); };

  const manifestEffects = [];
  const fullMdChunks = [];

  for (const id of IDS) {
    const mod = REGISTRY[id];
    const meta = mod.meta;
    const { snippet, mountSnippet } = buildSnippet(mod);
    const source = sourceOf(mod);
    const url = `/effects/${id}.md`;

    // self-contained per-effect JSON
    w(`effects/${id}.json`, JSON.stringify(
      { ...meta, source, snippet, mountSnippet, runtimeNotes: runtimeNotes(meta), url, preview: null },
      null, 2));

    // markdown twin (inline snippet)
    w(`effects/${id}.md`, effectMd(mod, snippet, { inlineShader: true }));

    // llms-full uses the link-out variant for shaders
    fullMdChunks.push(effectMd(mod, snippet, { inlineShader: false }));

    // manifest row: full meta minus derived source, + url + preview
    manifestEffects.push({ ...meta, url, preview: null });
  }

  const manifest = {
    name: pkg.name,
    version: pkg.version,
    homepage: HOMEPAGE + '/',
    sections: SECTIONS.map((s) => ({ id: s.id, name: s.label, nameLocal: s.labelZh || null })),
    effects: manifestEffects,
  };

  // validate our own manifest against manifest.schema.json before publishing
  const manifestSchema = JSON.parse(readFileSync(join(ROOT, 'schema/manifest.schema.json'), 'utf8'));
  const mErrs = validate(manifest, manifestSchema, 'fx-index');
  if (mErrs.length) throw new Error('fx-index.json failed manifest schema:\n' + mErrs.join('\n'));

  w('fx-index.json', JSON.stringify(manifest, null, 2));
  w('llms.txt', llmsTxt());
  w('llms.zh.txt', llmsTxtZh());
  w('llms-full.txt', fullMdChunks.join('\n\n---\n\n'));
  w('schema/effect.schema.json', JSON.stringify(loadEffectSchema(), null, 2));

  // Make site/ self-contained for GitHub Pages: the gallery shell (web/) + the ESM runtime (src/).
  // ponytail: copying src/ is the zero-dep "bundle"; swap for a real bundled site/fx-lab.esm.js if size matters.
  cpSync(join(ROOT, 'web'), SITE, { recursive: true });
  cpSync(join(ROOT, 'src'), join(SITE, 'src'), { recursive: true });
  written.push('site/index.html', 'site/src/');

  return written;
}

function main() {
  const r = validateAll();
  if (r.errors.length) {
    console.error(`build: BLOCKED — validation failed (${r.errors.length} error(s) across ${r.total}).`);
    for (const e of r.errors) console.error('  - ' + e);
    process.exit(1);
  }
  const written = buildSite();
  console.log(`build: OK — ${written.length} files written under site/ (${IDS.length} effects).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
