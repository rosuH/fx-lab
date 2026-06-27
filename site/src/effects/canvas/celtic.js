export default {
  meta: {
    "id": "celtic",
    "kind": "canvas",
    "name": "Celtic Knot",
    "nameLocal": null,
    "section": "world-patterns",
    "summary": "Glowing green interlace arcs weave across a dark field with a flowing animated dash; hypnotic.",
    "description": "Pairs of quarter-circle arcs are drawn with an animated dashed stroke whose offset advances each frame, creating the illusion of light flowing through an interlaced knot grid. The alternating arc directions mimic an over-under weave. Use as a moody background for Celtic-themed or fantasy designs.",
    "descriptionZh": "交织绳结 · 流光",
    "tags": ["knot", "weave", "geometry", "canvas2d", "background"],
    "vibe": ["hypnotic", "elegant", "cultural"],
    "culture": "Celtic",
    "accuracyNote": "Procedural approximation of Celtic knotwork interlace; not a faithful reproduction of any specific historical motif.",
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
  draw: function celtic(ctx,w,h,t){ ctx.fillStyle='#0c1410';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(120,225,170,0.9)';ctx.lineWidth=3.2;ctx.lineCap='round'; ctx.setLineDash([15,9]);ctx.lineDashOffset=-t*22; const C=34;
      for(let y=0;y<h+C;y+=C)for(let x=0;x<w+C;x+=C){ const o=(((x/C)+(y/C))%2===0); ctx.beginPath(); if(o){ctx.arc(x,y,C*0.5,0,Math.PI*0.5);ctx.moveTo(x+C,y+C);ctx.arc(x+C,y+C,C*0.5,Math.PI,Math.PI*1.5);} else {ctx.arc(x+C,y,C*0.5,Math.PI*0.5,Math.PI);ctx.moveTo(x,y+C);ctx.arc(x,y+C,C*0.5,Math.PI*1.5,Math.PI*2);} ctx.stroke(); } ctx.setLineDash([]); },
};
