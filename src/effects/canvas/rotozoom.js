export default {
  meta: {
    "id": "rotozoom",
    "kind": "canvas",
    "name": "Rotozoom",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Pink-and-dark checkerboard spins and zooms in and out; retro demoscene rotozoom.",
    "description": "Transforms pixel coordinates through a time-varying rotation matrix with a sinusoidally oscillating zoom factor, sampling a simple checkerboard texture. The result is a classic infinite-tile pattern that rotates and pulses. Use as a retro fullscreen background or looping transition.",
    "descriptionZh": "旋转缩放贴图",
    "tags": ["geometry", "grid", "tiling", "optical", "canvas2d", "background"],
    "vibe": ["hypnotic", "retro", "playful"],
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
  draw: function rotozoom(ctx,w,h,t){ const S=4,zoom=1.5+Math.sin(t*0.5)*0.8,ca=Math.cos(t*0.3)*zoom,sa=Math.sin(t*0.3)*zoom;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const u=((x-w/2)*ca-(y-h/2)*sa)|0,v=((x-w/2)*sa+(y-h/2)*ca)|0,c=((u>>4)+(v>>4))&1;ctx.fillStyle=c?'#ff5a8a':'#1a1030';ctx.fillRect(x,y,S,S);}},
};
