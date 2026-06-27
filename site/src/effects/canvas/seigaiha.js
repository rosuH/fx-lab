export default {
  meta: {
    "id": "seigaiha",
    "kind": "canvas",
    "name": "Seigaiha",
    "nameLocal": "青海波",
    "section": "world-patterns",
    "summary": "Serene overlapping blue-white wave fans tile the screen; calm Japanese oceanic elegance.",
    "description": "Overlapping semicircle fans in offset rows form the traditional Japanese Seigaiha wave tiling on a deep navy ground. A subtle per-column sine offset gives the grid a gentle undulating quality. Use as a serene, refined background for Japan-themed or coastal designs.",
    "descriptionZh": "和风波纹",
    "tags": ["waves", "tiling", "geometry", "canvas2d", "background"],
    "vibe": ["calm", "elegant", "cultural"],
    "culture": "Japan",
    "accuracyNote": "Procedural approximation of Japanese Seigaiha wave tiling; not a faithful reproduction of any specific historical motif.",
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
  draw: function seigaiha(ctx,w,h,t){ ctx.fillStyle='#0d1b2a';ctx.fillRect(0,0,w,h); const R=26,sx=R,sy=R*0.62,ph=t*0.4; ctx.lineWidth=2;
      for(let row=0,y=0;y<h+R;row++,y+=sy){ const off=(row%2)*sx; for(let x=-R;x<w+R;x+=sx*2){ const cx=x+off,cy=y+Math.sin(x*0.02+ph)*2;
        for(let k=4;k>=1;k--){ const rr=R*k/4; ctx.strokeStyle=(k%2)?'rgba(120,190,230,0.95)':'rgba(225,238,247,0.85)'; ctx.beginPath();ctx.arc(cx,cy,rr,Math.PI,Math.PI*2);ctx.stroke(); } } } },
};
