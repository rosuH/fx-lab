export default {
  meta: {
    "id": "heatmap",
    "kind": "canvas",
    "name": "Heatmap",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Noise-driven heatmap shifts cool-to-hot; cursor adds a warm bloom; technical, hypnotic overlay.",
    "description": "A per-pixel noise field is coloured from cool blue (240°) to hot red (0°) using the runtime vnoise function, refreshed every frame with a slow vertical drift. When the cursor is active, a warm bloom radiates from the pointer position. Use as a data-aesthetic background or interactive heatmap overlay.",
    "descriptionZh": "噪声热力 · 跟手",
    "tags": ["noise", "flow", "cursor", "overlay", "canvas2d"],
    "vibe": ["technical", "hypnotic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function heatmap(ctx,w,h,t,mx,my){ const S=6;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){let v=this.vnoise(x*0.02,y*0.02+t*0.3);if(mx>=0)v+=Math.max(0,1-Math.hypot(x-mx,y-my)/80)*0.6;v=Math.min(1,v);ctx.fillStyle='hsl('+(240-v*240|0)+',90%,'+(20+v*40|0)+'%)';ctx.fillRect(x,y,S,S);} },
};
