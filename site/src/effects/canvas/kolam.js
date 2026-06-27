export default {
  meta: {
    "id": "kolam",
    "kind": "canvas",
    "name": "Kolam",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Pink circle rings and warm dots repeat on deep plum; delicate South Indian threshold geometry.",
    "description": "A grid of pink stroke circles interleaves with warm beige dots at each lattice vertex, evoking the loop-and-dot structure of South Indian Kolam floor art on a deep plum ground. The pattern is static and tiles seamlessly to any canvas size. Use as a decorative cultural background.",
    "descriptionZh": "点格环线",
    "tags": ["dots", "geometry", "tiling", "canvas2d", "background"],
    "vibe": ["elegant", "meditative", "cultural"],
    "culture": "India",
    "accuracyNote": "Procedural approximation of South Indian Kolam floor patterns; not a faithful reproduction of any specific historical motif.",
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
  draw: function kolam(ctx,w,h,t){ ctx.fillStyle='#2a0a1e';ctx.fillRect(0,0,w,h);const S=30;ctx.strokeStyle='#ff7ab0';ctx.lineWidth=2;for(let y=S;y<h-S/2;y+=S)for(let x=S;x<w-S/2;x+=S){ctx.beginPath();ctx.arc(x+S/2,y+S/2,S*0.46,0,7);ctx.stroke();}ctx.fillStyle='#ffd9b0';for(let y=S;y<h;y+=S)for(let x=S;x<w;x+=S){ctx.beginPath();ctx.arc(x,y,2,0,7);ctx.fill();}},
};
