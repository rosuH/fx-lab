export default {
  meta: {
    "id": "aztec",
    "kind": "canvas",
    "name": "Aztec Step-Fret",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Earthy step-fret squares in terracotta and teal tile boldly; vivid Mesoamerican graphic rhythm.",
    "description": "A chequerboard of terracotta, amber, teal, and red squares each contain two nested concentric squares, evoking the step-fret motif found in Mesoamerican stonework and textiles. The pattern is fully static. Use as a bold, colourful cultural background.",
    "descriptionZh": "阶梯回纹",
    "tags": ["geometry", "mosaic", "tiling", "grid", "canvas2d", "background"],
    "vibe": ["energetic", "cultural", "geometric"],
    "culture": "Mesoamerica",
    "accuracyNote": "Procedural approximation of Mesoamerican step-fret pattern; not a faithful reproduction of any specific historical motif.",
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
  draw: function aztec(ctx,w,h,t){ ctx.fillStyle='#1a0f0a';ctx.fillRect(0,0,w,h);const cols=['#d9763a','#e8b04b','#3a9b8a','#c0392b'],S=28;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[(r+c)%4];ctx.fillRect(x,y,S,S);ctx.fillStyle='#1a0f0a';ctx.fillRect(x+S*0.3,y+S*0.3,S*0.4,S*0.4);ctx.fillStyle=cols[(r+c+1)%4];ctx.fillRect(x+S*0.4,y+S*0.4,S*0.2,S*0.2);}},
};
