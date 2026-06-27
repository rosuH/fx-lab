export default {
  meta: {
    "id": "crosshair",
    "kind": "canvas",
    "name": "Crosshair HUD",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Sci-fi HUD crosshair locks to the cursor with real-time coordinate readout; minimal, technical.",
    "description": "A green monospace HUD crosshair with full-width guide lines tracks the cursor and prints live X/Y pixel coordinates. Falls back to a slow circular orbit when no pointer is detected. Use as a sci-fi or game-style interactive overlay.",
    "descriptionZh": "准星 + 坐标读出",
    "tags": ["lines", "geometry", "cursor", "overlay", "canvas2d"],
    "vibe": ["technical", "minimal"],
    "culture": null,
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
  draw: function crosshair(ctx,w,h,t,mx,my){ ctx.fillStyle='#0a0c10';ctx.fillRect(0,0,w,h);const x=mx>=0?mx:w/2+Math.cos(t)*w*0.3,y=my>=0?my:h/2+Math.sin(t)*h*0.3;ctx.strokeStyle='rgba(120,255,180,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();ctx.strokeStyle='#7CFFB0';ctx.beginPath();ctx.arc(x,y,14,0,7);ctx.stroke();ctx.font='11px monospace';ctx.fillStyle='#7CFFB0';ctx.fillText('X:'+String(Math.round(x)).padStart(4,'0')+' Y:'+String(Math.round(y)).padStart(4,'0'),x+18,y-10); },
};
