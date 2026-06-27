export default {
  meta: {
    "id": "greekkey",
    "kind": "canvas",
    "name": "Greek Key",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Gold meander hooks scroll steadily across deep navy, forming a flowing ancient Greek frieze.",
    "description": "The classic Greek meander (key) motif is drawn as interlocking right-angle hook strokes in gold on a deep navy ground. The horizontal offset advances with time, making the entire frieze scroll continuously. Use as a bold border accent or animated classical background.",
    "descriptionZh": "回纹 · 流动",
    "tags": ["geometry", "lines", "tiling", "canvas2d", "background"],
    "vibe": ["elegant", "cultural", "retro"],
    "culture": "Greece",
    "accuracyNote": "Procedural approximation of Greek meander (key) pattern; not a faithful reproduction of any specific historical motif.",
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
  draw: function greekkey(ctx,w,h,t){ ctx.fillStyle='#0a1a2a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffd23f';ctx.lineWidth=3;const S=30,off=(t*12)%S;for(let y=S;y<h+S;y+=S)for(let x=-S+off;x<w;x+=S){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.28);ctx.lineTo(x+S*0.3,y-S*0.28);ctx.stroke();}},
};
