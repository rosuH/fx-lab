export default {
  meta: {
    "id": "ascii",
    "kind": "canvas",
    "name": "ASCII Field",
    "nameLocal": null,
    "section": "post-and-print",
    "summary": "Blue-purple ASCII characters pulse in sine-wave brightness waves; retro terminal glow.",
    "description": "Maps compound sine-wave luminance to an ASCII brightness ramp drawn on a dark background. Colour shifts from dim blue to bright violet with intensity. Use as an ambient animated background for dark-themed or terminal-aesthetic UIs.",
    "descriptionZh": "字符明度场",
    "tags": ["ascii", "canvas2d", "waves", "neon"],
    "vibe": ["retro", "energetic"],
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
  draw: function ascii(ctx,w,h,t){ ctx.fillStyle='#0a0b0d';ctx.fillRect(0,0,w,h); const ramp=' .:-=+*#%@';ctx.font='12px monospace';ctx.textBaseline='top'; const S=11;
      for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const u=x/w,v=y/h; const n=0.5+0.5*Math.sin(u*8+t)*Math.cos(v*8-t*0.7)+0.3*Math.sin((u+v)*12+t*1.4); const b=Math.max(0,Math.min(1,n)); ctx.fillStyle='rgba(120,'+(180+b*60|0)+',255,'+(0.3+b*0.7).toFixed(2)+')'; ctx.fillText(ramp[Math.floor(b*(ramp.length-1))],x,y); } },
};
