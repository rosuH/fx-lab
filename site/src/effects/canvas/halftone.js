export default {
  meta: {
    "id": "halftone",
    "kind": "canvas",
    "name": "Halftone CMYK",
    "nameLocal": null,
    "section": "post-and-print",
    "summary": "Warm CMYK halftone dots bloom from cursor position; editorial print-design feel.",
    "description": "Renders three overlapping dot screens — cyan, magenta, yellow — using multiply blending. Dot radius swells toward the cursor or a slow auto-animated hotspot. Ideal as a decorative background or poster overlay.",
    "descriptionZh": "网点半调 · 套色",
    "tags": ["halftone", "dots", "canvas2d", "geometry"],
    "vibe": ["elegant", "retro"],
    "culture": "print / design",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
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
  draw: function halftone(ctx,w,h,t,mx,my){ ctx.fillStyle='#f4f1ea';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.5)*w*0.25, cy=my>=0?my:h*0.5+Math.cos(t*0.4)*h*0.25; const screens=[['rgba(0,170,235,0.8)',2,1],['rgba(236,0,140,0.72)',6,4],['rgba(255,210,0,0.78)',4,7]]; const S=10,maxd=Math.hypot(w,h)*0.62;
      ctx.globalCompositeOperation='multiply'; for(const sc of screens){ ctx.fillStyle=sc[0]; for(let y=sc[2];y<h;y+=S)for(let x=sc[1];x<w;x+=S){ const v=Math.max(0,1-Math.hypot(x-cx,y-cy)/maxd); const rad=v*S*0.62; if(rad>0.3){ctx.beginPath();ctx.arc(x,y,rad,0,7);ctx.fill();} } } ctx.globalCompositeOperation='source-over'; },
};
