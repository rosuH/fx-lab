export default {
  meta: {
    "id": "plasma",
    "kind": "canvas",
    "name": "Plasma",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Swirling rainbow sine-wave blobs morph endlessly; psychedelic demoscene classic.",
    "description": "Sums four sinusoidal fields — horizontal, vertical, diagonal, and radial — to produce continuously shifting color blobs. The combined value drives HSL hue, producing a full-spectrum wash that cycles over time. A CPU-heavy effect; best used as a looping fullscreen background.",
    "descriptionZh": "经典等离子",
    "tags": ["plasma", "waves", "noise", "geometry", "canvas2d", "background"],
    "vibe": ["psychedelic", "energetic", "retro"],
    "culture": "demoscene",
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
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
  draw: function plasma(ctx,w,h,t){ const S=4;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const v=Math.sin(x*0.04+t)+Math.sin(y*0.05+t*1.1)+Math.sin((x+y)*0.03+t*0.7)+Math.sin(Math.hypot(x-w/2,y-h/2)*0.04-t),c=v/4;ctx.fillStyle='hsl('+(((c*180+t*40)%360+360)%360)+',80%,'+(50+c*20|0)+'%)';ctx.fillRect(x,y,S,S);}},
};
