// fx-lab public entry. ESM, zero runtime deps.
import { REGISTRY, IDS } from './registry.js';
import { mount, stopAll } from './runtime/mount.js';

export function listEffects() {
  return IDS.map((id) => REGISTRY[id].meta);
}

export { mount, stopAll, REGISTRY, IDS };
