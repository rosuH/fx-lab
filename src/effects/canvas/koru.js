export default {
  meta: {
    "id": "koru",
    "kind": "canvas",
    "name": "Koru",
    "nameLocal": null,
    "section": "world-patterns-ii",
    "summary": "Cream fern spirals slowly uncoil across a dark forest ground; meditative Māori koru motif.",
    "description": "Expanding Archimedean spirals rotate gently across a dark green-black ground, evoking the koru — the unfurling silver-fern frond central to Māori art. The rotation is slow and continuous, lending an organic meditative quality. Use as a background for New Zealand or nature-themed designs.",
    "descriptionZh": "蕨芽螺旋",
    "tags": ["spiral", "geometry", "canvas2d", "background"],
    "vibe": ["meditative", "organic", "cultural"],
    "culture": "Maori",
    "accuracyNote": "Procedural approximation of Māori Koru spiral motif; not a faithful reproduction of any specific historical motif.",
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
  draw: function koru(ctx,w,h,t){ ctx.fillStyle='#0a1410';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#e8e0cf';ctx.lineWidth=3;ctx.lineCap='round';const S=78;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.5;a+=0.1){const r=a*3+2,px=x+Math.cos(a+t*0.3)*r,py=y+Math.sin(a+t*0.3)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}},
};
