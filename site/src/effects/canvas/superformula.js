export default {
  meta: {
    "id": "superformula",
    "kind": "canvas",
    "name": "Superformula",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Purple superformula outline morphing through stars, flowers, and polygons; organic math shapes.",
    "description": "Implements Johan Gielis's superformula — a single polar equation that generates stars, flowers, polygons, and organic blobs by varying one symmetry parameter. The parameter m steps over time, cycling through 14 distinct silhouettes. Elegant on dark backgrounds as a centered inline motif.",
    "descriptionZh": "超公式 · 万象有机形",
    "tags": ["curves", "geometry", "rings", "spiral", "canvas2d", "inline"],
    "vibe": ["elegant", "hypnotic", "organic"],
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
  draw: function superformula(ctx,w,h,t){ ctx.fillStyle='#0c0a14';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,S=Math.min(w,h)*0.36,m=Math.floor(2+t*0.3)%14; const sf=(a)=>Math.pow(Math.pow(Math.abs(Math.cos(m*a/4)),7)+Math.pow(Math.abs(Math.sin(m*a/4)),7),-1/7); ctx.strokeStyle='#c79bff';ctx.lineWidth=2;ctx.beginPath(); for(let a=0;a<6.2831;a+=0.01){const r=sf(a)*S;a?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);} ctx.closePath();ctx.stroke(); },
};
