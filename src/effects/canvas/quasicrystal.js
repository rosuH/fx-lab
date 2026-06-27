export default {
  meta: {
    "id": "quasicrystal",
    "kind": "canvas",
    "name": "Quasicrystal",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Shimmering five-fold crystal interference; blue-purple moiré tiles slowly pulse and breathe.",
    "description": "Sums five cosine waves at pentagonal angles per pixel to generate a quasicrystal interference pattern. The combined phase shifts over time, producing a pulsing blue-purple-gold moiré field. CPU-heavy; best as a small inline tile or low-resolution background.",
    "descriptionZh": "五重对称干涉",
    "tags": ["moire", "optical", "geometry", "noise", "canvas2d", "background"],
    "vibe": ["hypnotic", "psychedelic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
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
  draw: function quasicrystal(ctx,w,h,t){ const S=3; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ let v=0; for(let i=0;i<5;i++){const a=i*Math.PI/5; v+=Math.cos((x*Math.cos(a)+y*Math.sin(a))*0.07+t);} const c=Math.sin(v)*0.5+0.5; ctx.fillStyle='rgb('+(c*255|0)+','+(c*150|0)+','+((1-c)*255|0)+')'; ctx.fillRect(x,y,S,S);} },
};
