export default {
  meta: {
    "id": "phyllotaxis",
    "kind": "canvas",
    "name": "Phyllotaxis",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Sunflower spiral of rainbow glowing dots; golden-angle phyllotaxis slowly rotating outward.",
    "description": "Places 420 dots using the golden angle (~137.5°) to recreate the seed-packing geometry found in sunflowers and pine cones. Each dot's hue advances with time, making the spiral bloom through rainbow color. Lightweight and meditative; suits dark backgrounds or inline ornaments.",
    "descriptionZh": "向日葵螺旋 · 黄金角",
    "tags": ["dots", "spiral", "geometry", "particles", "canvas2d", "background"],
    "vibe": ["calm", "meditative", "organic"],
    "culture": null,
    "accuracyNote": null,
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
  draw: function phyllotaxis(ctx,w,h,t){ ctx.fillStyle='#0a0b12';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,g=2.399963; for(let i=0;i<420;i++){const r=Math.sqrt(i)*5.4,a=i*g+t*0.2; ctx.fillStyle='hsl('+((i*0.8+t*20)%360)+',70%,60%)'; ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2.2,0,7);ctx.fill();} },
};
