export default {
  meta: {
    "id": "spot",
    "kind": "dom",
    "name": "Spotlight Mask",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "光标聚光揭示",
    "tags": [],
    "vibe": [],
    "culture": "UI / reveal",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  selector: "[data-spot]",
  init(root) {
    const tile = root.querySelector('[data-spot]');
    if (!tile) return { stop() {} };
    const set = (x, y) => { tile.style.setProperty('--mx', x + 'px'); tile.style.setProperty('--my', y + 'px'); };
    const onMove = (e) => { const r = tile.getBoundingClientRect(); set(e.clientX - r.left, e.clientY - r.top); };
    const onLeave = () => { const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2); };
    tile.addEventListener('pointermove', onMove, { passive: true });
    tile.addEventListener('pointerleave', onLeave);
    const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2);
    return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
  },
};
