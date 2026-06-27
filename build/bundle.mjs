// build/bundle.mjs — write dist/ bundles (ESM re-export + IIFE concatenation)
// ponytail: ESM re-exports from src/, IIFE inlines and wraps for browser globals.
// For production, use a real bundler (webpack/esbuild); this handles the dev/CDN case.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

// --- IIFE concatenation (for browser globals) -----------------------------------------------
// ponytail: tree-walk + inline; assumes no circular deps and all imports have explicit extensions
const visited = new Set();
const modules = [];

function extractLocalImports(code) {
  const pattern = /import\s+[^;]*from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  let match;
  while ((match = pattern.exec(code)) !== null) {
    const spec = match[1];
    if (!spec.startsWith('node:')) imports.push(spec);
  }
  return imports;
}

function walkIIFE(fileRelToRoot, counter = 0) {
  const abs = resolve(ROOT, fileRelToRoot);
  if (visited.has(abs)) return counter;
  visited.add(abs);

  const code = readFileSync(abs, 'utf8');
  const imports = extractLocalImports(code);

  let currentCounter = counter;

  // Depth-first
  for (const imp of imports) {
    const impAbs = resolve(dirname(abs), imp);
    const impRel = impAbs.startsWith(ROOT) ? impAbs.slice(ROOT.length + 1) : imp;
    currentCounter = walkIIFE(impRel, currentCounter);
  }

  // Strip imports and exports, add to modules
  const stripped = stripForIIFE(code, currentCounter);
  modules.push({ name: fileRelToRoot, code: stripped });

  return currentCounter + 1;
}

function stripForIIFE(code, counter) {
  // Remove import statements; convert exports to plain declarations
  let result = code
    .split('\n')
    .filter((line) => !line.trim().startsWith('import ') || !line.includes(' from '))
    .join('\n')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+function\s+/g, 'function ')
    .replace(/export\s+class\s+/g, 'class ')
    .replace(/export\s+\{[^}]*\}/g, '');

  // Replace each default export with a unique variable name
  result = result.replace(/export\s+default\s+/, `const _mod_${counter} = `);
  return result;
}

function main() {
  mkdirSync(DIST, { recursive: true });

  // ESM: thin re-export
  const esm = `// dist/fx-lab.esm.js — ESM re-export
// ponytail: thin layer re-exporting from src/; bundlers tree-shake naturally from here.
// For inlined bundles, use a real bundler (webpack/esbuild).
export { mount, stopAll, REGISTRY, IDS, listEffects } from '../src/index.js';
`;

  writeFileSync(join(DIST, 'fx-lab.esm.js'), esm);
  console.log(`[bundle] wrote dist/fx-lab.esm.js (${esm.length} bytes, re-export)`);

  // IIFE: concatenate + wrap for browser globals
  visited.clear();
  modules.length = 0;
  walkIIFE('src/index.js', 0);

  const iife_parts = [
    '// dist/fx-lab.iife.js — bundled IIFE for browser globals',
    '// ponytail: inlined tree; window.FXLab = { mount, stopAll, REGISTRY, IDS, listEffects }',
    '(function() {',
    "  'use strict';",
  ];

  for (const mod of modules) {
    iife_parts.push(`  // ${mod.name}`);
    // Indent
    const indented = mod.code
      .split('\n')
      .map((line) => (line.trim() ? '  ' + line : ''))
      .join('\n');
    iife_parts.push(indented);
  }

  iife_parts.push('  // Exports');
  iife_parts.push('  const api = { mount, stopAll, REGISTRY, IDS, listEffects };');
  iife_parts.push("  if (typeof window !== 'undefined') window.FXLab = api;");
  iife_parts.push('})();');

  const iife = iife_parts.join('\n');
  writeFileSync(join(DIST, 'fx-lab.iife.js'), iife);
  console.log(`[bundle] wrote dist/fx-lab.iife.js (${iife.length} bytes, ${modules.length} modules)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
