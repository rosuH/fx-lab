export default {
  meta: {
    "id": "scope",
    "kind": "canvas",
    "name": "Oscilloscope",
    "nameLocal": null,
    "section": "data-and-system",
    "summary": "Phosphor-green oscilloscope waveform glows on a dim CRT grid; calm technical atmosphere.",
    "description": "Simulates a CRT oscilloscope: a faint green grid overlays a dark background, and a compound glowing sine wave sweeps across the full display each frame. Use for data-vis dashboards, retro instrument UI, or lofi ambient backgrounds.",
    "descriptionZh": "示波器波形 · 荧光",
    "tags": ["oscilloscope", "canvas2d", "waves", "glow", "grid"],
    "vibe": ["calm", "technical", "retro"],
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
  draw: function scope(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(40,120,70,0.3)';ctx.lineWidth=1; for(let x=0;x<w;x+=w/8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=0;y<h;y+=h/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
      ctx.strokeStyle='#7CFFB0';ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor='#7CFFB0';ctx.beginPath(); for(let x=0;x<=w;x+=2){const u=x/w;const y=h/2+Math.sin(u*12+t*3)*h*0.18*Math.sin(t*0.7)+Math.sin(u*30+t*5)*h*0.07;x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();ctx.shadowBlur=0; },
};
