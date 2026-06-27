export default {
  meta: {
    "id": "lissajous",
    "kind": "canvas",
    "name": "Lissajous",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Glowing green Lissajous figure cycling through phase; oscilloscope curve on dark background.",
    "description": "Draws a 3:4 Lissajous figure with a slowly advancing phase offset, making the loop knot and unknot continuously. A soft shadow glow reinforces the oscilloscope aesthetic. Lightweight and hypnotic; ideal for technical dashboards or dark overlay accents.",
    "descriptionZh": "李萨如图形",
    "tags": ["curves", "oscilloscope", "geometry", "lines", "canvas2d", "background"],
    "vibe": ["hypnotic", "technical", "minimal"],
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
  draw: function lissajous(ctx,w,h,t){ ctx.fillStyle='#0a0e0a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,A=w*0.4,B=h*0.4; ctx.strokeStyle='#9CFF6A';ctx.lineWidth=1.5;ctx.shadowBlur=6;ctx.shadowColor='#9CFF6A';ctx.beginPath(); for(let i=0;i<=600;i++){const u=i/600*6.2831;i?ctx.lineTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B):ctx.moveTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B);} ctx.stroke();ctx.shadowBlur=0; },
};
