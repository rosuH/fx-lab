export default {
  meta: {
    "id": "paisley",
    "kind": "canvas",
    "name": "Paisley",
    "nameLocal": "佩斯利",
    "section": "world-patterns-ii",
    "summary": "Jewel-toned boteh teardrops gently sway on deep indigo; lush Persian paisley textile rhythm.",
    "description": "Bezier-curve teardrop (boteh) shapes in amber, pink, and teal are arranged in offset rows and gently rock with a sinusoidal rotation, evoking the repeating motif of Persian paisley textiles. The inner void gives each shape its characteristic hollow. Use as a rich, ornate background for textile or fashion themes.",
    "descriptionZh": "火腿纹 boteh",
    "tags": ["curves", "geometry", "tiling", "canvas2d", "background"],
    "vibe": ["elegant", "cultural", "hypnotic"],
    "culture": "Persia",
    "accuracyNote": "Procedural approximation of Persian Paisley (boteh) textile pattern; not a faithful reproduction of any specific historical motif.",
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
  draw: function paisley(ctx,w,h,t){ ctx.fillStyle='#1a0a2a';ctx.fillRect(0,0,w,h);const cols=['#e8b04b','#ff7ab0','#34d1c4'],S=64;for(let y=0,r=0;y<h+S;y+=S,r++)for(let x=0,c=0;x<w+S;x+=S,c++){ctx.save();ctx.translate(x+(r%2)*S/2,y);ctx.rotate(Math.sin(t*0.3+r+c)*0.2);ctx.fillStyle=cols[(r+c)%3];ctx.beginPath();ctx.moveTo(0,-18);ctx.bezierCurveTo(17,-16,17,9,0,17);ctx.bezierCurveTo(-9,10,-7,-5,0,-18);ctx.fill();ctx.fillStyle='#1a0a2a';ctx.beginPath();ctx.moveTo(0,-12);ctx.bezierCurveTo(9,-10,9,5,0,10);ctx.bezierCurveTo(-4,6,-3,-3,0,-12);ctx.fill();ctx.restore();}},
};
