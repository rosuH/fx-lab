export default {
  meta: {
    "id": "talavera",
    "kind": "canvas",
    "name": "Talavera",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Cream tiles edged in cobalt, petalled in gold; bright repeating Mexican Talavera ceramics.",
    "description": "Square tiles on a cream ground are outlined in cobalt blue, decorated with eight radiating gold petal ellipses and a central cobalt circle, evoking the painted floral motifs of Mexican Talavera ceramics. The pattern is static and tiles seamlessly. Use as a warm decorative background for Latin-themed designs.",
    "descriptionZh": "陶砖花",
    "tags": ["mosaic", "tiling", "geometry", "canvas2d", "background"],
    "vibe": ["elegant", "cultural", "playful"],
    "culture": "Mexico",
    "accuracyNote": "Procedural approximation of Mexican Talavera ceramic tile; not a faithful reproduction of any specific historical motif.",
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
  draw: function talavera(ctx,w,h,t){ ctx.fillStyle='#f4f0e4';ctx.fillRect(0,0,w,h);const S=58;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.strokeStyle='#1a5fa8';ctx.lineWidth=2;ctx.strokeRect(x,y,S,S);ctx.fillStyle='#e8a800';for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.save();ctx.translate(x+S/2+Math.cos(a)*S*0.28,y+S/2+Math.sin(a)*S*0.28);ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,0,5,2,0,0,7);ctx.fill();ctx.restore();}ctx.fillStyle='#1a5fa8';ctx.beginPath();ctx.arc(x+S/2,y+S/2,6,0,7);ctx.fill();}},
};
