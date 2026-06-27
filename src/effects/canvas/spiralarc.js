export default {
  meta: {
    "id": "spiralarc",
    "kind": "canvas",
    "name": "Spiral",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Clean white Archimedean spiral slowly rotating on pure black; minimal and meditative.",
    "description": "Traces an Archimedean spiral (radius proportional to angle) and rotates it continuously over time. Pure monochrome — white stroke on black. Minimal and timeless; suits centered inline use or as a backdrop for text overlays.",
    "descriptionZh": "阿基米德螺线",
    "tags": ["spiral", "curves", "geometry", "lines", "canvas2d", "background"],
    "vibe": ["minimal", "meditative", "calm"],
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
  draw: function spiralarc(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2; ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath(); for(let a=0;a<44;a+=0.1){const r=a*2.2;a?ctx.lineTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r):ctx.moveTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r);} ctx.stroke(); },
};
