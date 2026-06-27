export default {
  meta: {
    "id": "chevron",
    "kind": "canvas",
    "name": "Chevron",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Scrolling multicolor chevron stripes; vivid zigzag rows stream in retro palette.",
    "description": "Draws alternating V-shaped chevron rows in four vivid colors — coral, yellow, teal, and violet — that scroll horizontally over time. The repeating zigzag creates an energetic, retro-textile feel. Ideal as a lively background or banner pattern.",
    "descriptionZh": "人字折线 · 流动",
    "tags": ["chevron", "stripes", "geometry", "lines", "canvas2d", "background"],
    "vibe": ["energetic", "playful", "retro"],
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
  draw: function chevron(ctx,w,h,t){ const cols=['#ff6b5a','#ffd23f','#34d1c4','#7b6cf6'],S=26,off=(t*20)%(S*2); for(let r=0,y=-S;y<h+S;r++,y+=S/2+0)for(let x=-S*2;x<w+S;x+=S*2){ctx.strokeStyle=cols[r%4];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+off,y+S/2);ctx.lineTo(x+S+off,y);ctx.lineTo(x+2*S+off,y+S/2);ctx.stroke();} },
};
