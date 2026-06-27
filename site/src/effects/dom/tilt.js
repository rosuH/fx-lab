export default {
  meta: {
    "id": "tilt",
    "kind": "dom",
    "name": "3D Tilt Card",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "透视倾斜 · 跟手",
    "tags": [],
    "vibe": [],
    "culture": "UI / 3D perspective",
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
  selector: "[data-tilt]",
  init(root) {
    const tile = root.querySelector('[data-tilt]');
    if (!tile) return { stop() {} };
    const card = tile.querySelector('[data-tiltcard]');
    const onMove = (e) => { const r = tile.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; card.style.transform = 'perspective(600px) rotateY(' + (px * 24).toFixed(1) + 'deg) rotateX(' + (-py * 24).toFixed(1) + 'deg)'; };
    const onLeave = () => { card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)'; };
    tile.addEventListener('pointermove', onMove, { passive: true });
    tile.addEventListener('pointerleave', onLeave);
    return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
  },
};
