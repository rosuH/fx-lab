export default {
  meta: {
    "id": "opart",
    "kind": "canvas",
    "name": "Op-Art Moiré",
    "nameLocal": null,
    "section": "design-movements",
    "summary": "Black-and-white concentric rings create a dizzying moiré illusion; cursor shifts the offset.",
    "description": "Draws two sets of concentric rings composited with `difference` mode to produce a moiré interference pattern. The second ring set tracks the cursor or auto-animates. Striking as a bold background or portfolio statement.",
    "descriptionZh": "莫尔条纹 · 错视",
    "tags": ["moire", "canvas2d", "optical", "rings", "geometry"],
    "vibe": ["hypnotic", "geometric"],
    "culture": "Op-Art / optical illusion",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function opart(ctx,w,h,t,mx,my){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.6)*w*0.22, cy=my>=0?my:h*0.5+Math.cos(t*0.5)*h*0.22; const R=Math.hypot(w,h);
      ctx.lineWidth=7;ctx.strokeStyle='#0a0a0a'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(w*0.5,h*0.5,r,0,7);ctx.stroke();}
      ctx.globalCompositeOperation='difference';ctx.strokeStyle='#fff'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();} ctx.globalCompositeOperation='source-over'; },
};
