export default {
  meta: {
    "id": "asanoha",
    "kind": "canvas",
    "name": "Asanoha",
    "nameLocal": "麻の葉",
    "section": "world-patterns-ii",
    "summary": "Crisp blue-white hemp-leaf hexagonal lattice on indigo; serene Japanese textile geometry.",
    "description": "Triangle pairs radiate from each node of a hexagonal grid to form the traditional Japanese Asanoha (hemp-leaf) tiling in soft blue on dark indigo. The pattern is fully static — the same tessellation is drawn every frame. Use as a refined textile-inspired background.",
    "descriptionZh": "麻叶几何",
    "tags": ["geometry", "tiling", "grid", "canvas2d", "background"],
    "vibe": ["minimal", "elegant", "cultural"],
    "culture": "Japan",
    "accuracyNote": "Procedural approximation of Japanese Asanoha hemp-leaf tiling; not a faithful reproduction of any specific historical motif.",
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
  draw: function asanoha(ctx,w,h,t){ ctx.fillStyle='#10243a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(150,200,235,0.7)';ctx.lineWidth=1;const R=24,SQ=Math.sqrt(3);for(let row=0,y=0;y<h+R;row++,y+=R*1.5)for(let x=0;x<w+R;x+=R*SQ){const cx=x+(row%2)*R*SQ/2,cy=y;for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.lineTo(cx+Math.cos(a+Math.PI/3)*R,cy+Math.sin(a+Math.PI/3)*R);ctx.stroke();}}},
};
