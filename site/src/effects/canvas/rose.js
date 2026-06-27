export default {
  meta: {
    "id": "rose",
    "kind": "canvas",
    "name": "Rose Curve",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Soft pink rose curve cycling through 3-to-8-petal forms on a dark field; elegant math bloom.",
    "description": "Traces the polar rose equation r = cos(k·θ), stepping k through integer values over time to produce 3-, 4-, 5-, 6-, 7-, and 8-petal flowers. Each petal count redraws cleanly with a single pink stroke. A minimal, elegant mathematical curve suited to dark inline or background use.",
    "descriptionZh": "玫瑰线 · 玫瑰花形",
    "tags": ["curves", "geometry", "spiral", "rings", "canvas2d", "inline"],
    "vibe": ["elegant", "minimal", "calm"],
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
  draw: function rose(ctx,w,h,t){ ctx.fillStyle='#0b0a12';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,R=Math.min(w,h)*0.42,k=Math.floor(t*0.2)%6+3; ctx.strokeStyle='#ff7ab0';ctx.lineWidth=1.5;ctx.beginPath(); for(let a=0;a<6.30;a+=0.01){const r=R*Math.cos(k*a);a?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);} ctx.stroke(); },
};
