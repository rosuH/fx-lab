export default {
  meta: {
    "id": "starburst",
    "kind": "canvas",
    "name": "Starburst",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Yellow and pink radiating wedges slowly spinning; bold retro sunburst from canvas center.",
    "description": "Divides the canvas into 40 alternating yellow and pink triangular sectors radiating from the center, forming a classic starburst motif. The whole pattern rotates slowly over time. Bold and festive; works as a hero background or vintage-style overlay.",
    "descriptionZh": "放射扇面",
    "tags": ["geometry", "spiral", "rings", "lines", "canvas2d", "background"],
    "vibe": ["energetic", "playful", "retro"],
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
  draw: function starburst(ctx,w,h,t){ ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,N=40,D=Math.hypot(w,h); for(let i=0;i<N;i++){const a=i/N*6.2831+t*0.1;ctx.fillStyle=i%2?'#ffd23f':'#ff5a8a';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*D,cy+Math.sin(a)*D);ctx.lineTo(cx+Math.cos(a+6.2831/N)*D,cy+Math.sin(a+6.2831/N)*D);ctx.closePath();ctx.fill();} },
};
