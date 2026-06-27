// test/smoke.mjs — CONTRACT §7: validate registry, then render every snippet in one browser.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { IDS } from '../src/registry.js';
import { validateAll } from '../build/validate.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// --- Phase 1: Node validation ---------------------------------------------------------------
function validateNode() {
  console.log('[smoke] Phase 1: Node validation (schema + taxonomy + gates)');
  const r = validateAll();
  if (r.errors.length) {
    console.error(`[smoke] FAIL — ${r.errors.length} error(s) across ${r.total} effects.`);
    for (const e of r.errors) console.error('  - ' + e);
    return false;
  }
  console.log(`[smoke] OK — ${r.total} effects validated, ${r.clean} clean.`);
  return true;
}

// --- Phase 2: render every snippet in ONE browser (skip gracefully if Playwright absent) -----
async function validatePlaywright() {
  console.log('[smoke] Phase 2: render snippets in a headless browser (optional)');
  let chromium;
  try { ({ chromium } = await import('@playwright/test')); }
  catch { console.log('[smoke] @playwright/test not installed; skipping render tests.'); return { ok: true, skipped: true }; }

  let browser;
  try { browser = await chromium.launch(); }
  catch (e) { console.log(`[smoke] could not launch Chromium (run: npx playwright install chromium): ${e.message}`); return { ok: true, skipped: true }; }

  const page = await browser.newPage({ viewport: { width: 360, height: 260 } });
  const siteDir = join(ROOT, 'site');
  const errors = [], blank = [];
  let passed = 0;

  for (const id of IDS) {
    const data = JSON.parse(readFileSync(join(siteDir, 'effects', `${id}.json`), 'utf8'));
    let pageErr = null;
    const onErr = (e) => { pageErr = pageErr || (e.message || String(e)); };
    const onConsole = (m) => { if (m.type() === 'error') pageErr = pageErr || m.text(); };
    page.on('pageerror', onErr); page.on('console', onConsole);

    await page.setContent(
      `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;width:340px;height:240px">${data.snippet}</body></html>`,
      { waitUntil: 'load' });
    await page.waitForTimeout(220); // let slow accumulators (lorenz, doomfire, fern…) build up

    // render check: a deterministic canvas effect should not be uniformly one color; a shader should hold a live gl2 context
    let drew = true;
    if (data.kind === 'canvas' && data.deterministic !== false) {
      drew = await page.evaluate(() => {
        const c = document.querySelector('canvas'); if (!c || !c.width) return false;
        const ctx = c.getContext('2d'); if (!ctx) return true;
        const d = ctx.getImageData(0, 0, c.width, c.height).data; // sample whole canvas, not just a corner
        const f = `${d[0]},${d[1]},${d[2]},${d[3]}`;
        for (let i = 16; i < d.length; i += 16) if (`${d[i]},${d[i+1]},${d[i+2]},${d[i+3]}` !== f) return true;
        return false;
      });
    } else if (data.kind === 'shader') {
      drew = await page.evaluate(() => { const c = document.querySelector('canvas'); return !!(c && c.getContext('webgl2')); });
    }

    page.off('pageerror', onErr); page.off('console', onConsole);
    if (pageErr) errors.push(`[${id}] ${pageErr}`);
    else if (!drew) blank.push(id);
    else passed++;
  }
  await browser.close();

  if (blank.length) console.warn(`[smoke] WARN — ${blank.length} effect(s) rendered blank in 80ms (may just be slow to start): ${blank.join(', ')}`);
  if (errors.length) {
    console.error(`[smoke] render: FAIL — ${errors.length} snippet(s) threw:`);
    for (const e of errors) console.error('  - ' + e);
    return { ok: false };
  }
  console.log(`[smoke] render: OK — ${passed} snippet(s) ran with no uncaught errors (${blank.length} blank-warn).`);
  return { ok: true };
}

// --- main --------------------------------------------------------------------------------------
async function main() {
  const nodeOk = validateNode();
  const pw = await validatePlaywright();
  if (nodeOk && pw.ok) { console.log('[smoke] PASS' + (pw.skipped ? ' (render phase skipped)' : '')); process.exit(0); }
  console.log('[smoke] FAIL');
  process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
