// dist/fx-lab.esm.js — ESM re-export
// ponytail: thin layer re-exporting from src/; bundlers tree-shake naturally from here.
// For inlined bundles, use a real bundler (webpack/esbuild).
export { mount, stopAll, REGISTRY, IDS, listEffects } from '../src/index.js';
