export default {
  meta: {
    "id": "copperbars",
    "kind": "canvas",
    "name": "Copper Bars",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Five glowing colored bars bounce on black; warm Amiga Copper demoscene glow.",
    "description": "Renders five hue-shifted horizontal bars that oscillate vertically via sine waves, each with a bright centre fading to dark edges — mimicking the colour-per-scanline trick of Amiga Copper hardware. Lightweight and mobile-safe. Use as a retro looping backdrop or section divider.",
    "descriptionZh": "铜条 · Amiga",
    "tags": ["lines", "neon", "glow", "geometry", "canvas2d", "background"],
    "vibe": ["retro", "energetic", "playful"],
    "culture": "demoscene / Amiga",
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
  draw: function copperbars(ctx,w,h,t){ ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);const hues=[30,180,300,90,210];for(let i=0;i<5;i++){const cy=h/2+Math.sin(t*1.5+i*0.6)*h*0.34;for(let y=-18;y<18;y++){ctx.fillStyle='hsl('+hues[i]+',90%,'+(58-Math.abs(y)*2.6)+'%)';ctx.fillRect(0,cy+y,w,1);}}},
};
