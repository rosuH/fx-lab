export default {
  meta: {
    "id": "kinetic",
    "kind": "dom",
    "name": "Kinetic Type",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "可变字重波动",
    "tags": [],
    "vibe": [],
    "culture": "typography / variable font",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": false,
      "trigger": "auto"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  selector: "[data-kinetic]",
  init(root) {
    const el = root.querySelector('[data-kinetic]');
    if (!el) return { stop() {} };
    const word = 'MOTION'; el.innerHTML = '';
    const spans = [...word].map((ch) => { const s = document.createElement('span'); s.textContent = ch; s.style.cssText = 'display:inline-block;font-weight:400;font-size:clamp(28px,5vw,46px)'; el.appendChild(s); return s; });
    return {
      step(t) {
        spans.forEach((s, i) => { const ph = t * 2 - i * 0.5; s.style.fontWeight = Math.round(400 + 300 * (0.5 + 0.5 * Math.sin(ph))); s.style.transform = 'translateY(' + (Math.sin(ph) * 8).toFixed(1) + 'px)'; });
      },
      stop() { el.innerHTML = ''; },
    };
  },
};
