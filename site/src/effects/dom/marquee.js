export default {
  meta: {
    "id": "marquee",
    "kind": "dom",
    "name": "Marquee Ticker",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "无缝跑马灯",
    "tags": [],
    "vibe": [],
    "culture": "UI / editorial",
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
  selector: "[data-marquee]",
  init(root) {
    const tr = root.querySelector('[data-marquee]');
    if (!tr) return { stop() {} };
    let x = 0;
    return {
      step() { const wdt = tr.scrollWidth / 2 || tr.offsetWidth; x -= 1.3; if (x <= -wdt) x += wdt; tr.style.transform = 'translateX(' + x.toFixed(1) + 'px)'; },
      stop() {},
    };
  },
};
