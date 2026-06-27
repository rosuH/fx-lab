export default {
  meta: {
    "id": "kente",
    "kind": "canvas",
    "name": "Kente Cloth",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Vivid gold, green and red colour bands tile in the rhythm of West African Kente weaving.",
    "description": "Interlocking horizontal colour blocks in gold, green, red, black, and blue repeat across the canvas in a pattern that echoes the alternating strip-woven structure of West African Kente cloth. The pattern is fully static and scales to any canvas. Use as a celebratory, high-energy cultural background.",
    "descriptionZh": "肯特织锦",
    "tags": ["stripes", "weave", "geometry", "canvas2d", "background"],
    "vibe": ["energetic", "cultural", "geometric"],
    "culture": "West Africa",
    "accuracyNote": "Procedural approximation of West African Kente cloth weaving; not a faithful reproduction of any specific historical motif.",
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
  draw: function kente(ctx,w,h,t){ const cols=['#f2c20a','#0a8a3a','#c0140a','#111','#1a6cc0'],S=17;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[((r%2)?(c+r):(r*2+c))%5];ctx.fillRect(x,y,S,S);if((r+c)%3===0){ctx.fillStyle=cols[c%5];ctx.fillRect(x,y,S,S/2);}}},
};
