export default {
  meta: {
    "id": "plaid",
    "kind": "canvas",
    "name": "Tartan Plaid",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Scrolling tartan plaid in forest green, red, and cream; classic Scottish textile in motion.",
    "description": "Lays overlapping horizontal and vertical translucent color bands on a dark green ground, mimicking tartan weave structure. The bands scroll diagonally over time. A warm, culturally evocative backdrop for heritage, seasonal, or cozy themes.",
    "descriptionZh": "苏格兰格纹",
    "tags": ["stripes", "geometry", "tiling", "grid", "canvas2d", "background"],
    "vibe": ["cozy", "retro", "elegant"],
    "culture": "Scotland",
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
  draw: function plaid(ctx,w,h,t){ ctx.fillStyle='#13362a';ctx.fillRect(0,0,w,h);const bands=[['rgba(220,60,50,0.55)',0,14],['rgba(240,225,185,0.45)',18,4],['rgba(40,40,70,0.5)',30,10]],o=(t*8)%40; for(let p=-40;p<w;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(p+b[1]+o,0,b[2],h);} for(let p=-40;p<h;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(0,p+b[1]+o,w,b[2]);} },
};
