export default {
  meta: {
    "id": "ironfilings",
    "kind": "canvas",
    "name": "Iron Filings",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Tiny iron filings snap to magnetic field lines emanating from the cursor; geometric, hypnotic.",
    "description": "Short line segments across a regular grid rotate to align tangent to the magnetic field of a point source at the cursor, producing a classic iron-filings pattern. The simulation is purely trigonometric with no random state. Use as a physics-inspired interactive overlay.",
    "descriptionZh": "磁场铁屑",
    "tags": ["lines", "geometry", "flow", "cursor", "overlay", "canvas2d"],
    "vibe": ["geometric", "hypnotic"],
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
  draw: function ironfilings(ctx,w,h,t,mx,my){ ctx.fillStyle='#0c0c0e';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2+Math.cos(t)*w*0.2,cy=my>=0?my:h/2;ctx.strokeStyle='rgba(200,210,230,0.6)';ctx.lineWidth=1.2;const S=16;for(let y=S/2;y<h;y+=S)for(let x=S/2;x<w;x+=S){const a=Math.atan2(y-cy,x-cx)+Math.PI/2;ctx.beginPath();ctx.moveTo(x-Math.cos(a)*6,y-Math.sin(a)*6);ctx.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*6);ctx.stroke();} },
};
