export default {
  meta: {
    "id": "concentric",
    "kind": "canvas",
    "name": "Concentric",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Rainbow concentric squares scrolling outward from center; bold, cycling hue tunnel effect.",
    "description": "Draws 26 nested squares whose sizes and hues advance with time, creating a continuous outward-scroll tunnel of color. The rapid hue cycling produces a vivid, psychedelic depth effect. Use as a bold background or retro-style overlay.",
    "descriptionZh": "同心方 · 色相轮转",
    "tags": ["geometry", "rings", "optical", "grid", "canvas2d", "background"],
    "vibe": ["psychedelic", "energetic", "hypnotic"],
    "culture": null,
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
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function concentric(ctx,w,h,t){ ctx.fillStyle='#120a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,M=Math.max(w,h); for(let i=0;i<26;i++){const s=(i*14+t*20)%M; ctx.strokeStyle='hsl('+((i*12+t*30)%360)+',65%,58%)';ctx.lineWidth=4;ctx.strokeRect(cx-s/2,cy-s/2,s,s);} },
};
