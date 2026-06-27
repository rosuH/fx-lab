export default {
  meta: {
    "id": "interference",
    "kind": "canvas",
    "name": "Interference",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Blue interference fringes from two point-sources pulsing across canvas; hypnotic wave moiré.",
    "description": "Simulates two-source wave interference by summing sinusoidal wavefronts per pixel. One source oscillates laterally over time, continuously shifting the fringe pattern. CPU-heavy pixel raster; best at a fixed small tile or reduced canvas resolution.",
    "descriptionZh": "双源波纹干涉",
    "tags": ["moire", "waves", "optical", "noise", "canvas2d", "background"],
    "vibe": ["hypnotic", "technical", "psychedelic"],
    "culture": null,
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
  draw: function interference(ctx,w,h,t){ const S=4,s1x=w*0.35,s1y=h*0.5,s2x=w*0.65+Math.sin(t)*20,s2y=h*0.5; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const v=Math.sin(Math.hypot(x-s1x,y-s1y)*0.2-t*3)+Math.sin(Math.hypot(x-s2x,y-s2y)*0.2-t*3),c=(v*0.25+0.5)*255|0; ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+c+')';ctx.fillRect(x,y,S,S);} },
};
