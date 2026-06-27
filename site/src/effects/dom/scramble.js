export default {
  meta: {
    "id": "scramble",
    "kind": "dom",
    "name": "Decode Text",
    "nameLocal": null,
    "section": "interaction",
    "summary": "",
    "description": "",
    "descriptionZh": "乱码归位",
    "tags": [],
    "vibe": [],
    "culture": "UI / typography",
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
  selector: "[data-scramble]",
  init(root) {
    const el = root.querySelector('[data-scramble]');
    if (!el) return { stop() {} };
    const words = ['CANVAS', 'SHADER', 'EFFECT', 'MOTION'], chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%@&/<>*0123456789';
    let wi = 0, scrTimer = 0;
    const setWord = (target) => {
      let frame = 0; const len = target.length; clearInterval(scrTimer);
      scrTimer = setInterval(() => {
        let s = '';
        for (let i = 0; i < len; i++) { s += i < frame / 2.4 ? target[i] : chars[Math.floor(Math.random() * chars.length)]; }
        el.textContent = s; frame++; if (frame / 2.4 > len) clearInterval(scrTimer);
      }, 42);
    };
    setWord(words[0]);
    const scrCycle = setInterval(() => { wi = (wi + 1) % words.length; setWord(words[wi]); }, 2200);
    return { stop() { clearInterval(scrTimer); clearInterval(scrCycle); } };
  },
};
