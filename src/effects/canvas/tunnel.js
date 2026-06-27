export default {
  meta: {
    "id": "tunnel",
    "kind": "canvas",
    "name": "Tunnel",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Hypnotic blue checkerboard rushes toward you in an infinite demoscene tunnel flythrough.",
    "description": "Maps every pixel to polar coordinates — angle for the column, inverse-radius for depth — then shades a checkerboard pattern driven by time. The result is an endless forward rush through a cylindrical tunnel with depth-based shading. Best as a fullscreen looping background or retro hero section.",
    "descriptionZh": "棋盘隧道",
    "tags": ["tunnel", "geometry", "grid", "optical", "canvas2d", "background"],
    "vibe": ["hypnotic", "retro"],
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
  draw: function tunnel(ctx,w,h,t){ const S=4;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const dx=x-w/2,dy=y-h/2,a=Math.atan2(dy,dx),r=Math.hypot(dx,dy)||1,u=a/Math.PI*8,v=320/r+t*2,c=((Math.floor(u)+Math.floor(v))&1)?1:0.25,sh=Math.min(1,r/(w*0.5));ctx.fillStyle='rgb('+(c*120*sh|0)+','+(c*200*sh|0)+','+(c*255*sh|0)+')';ctx.fillRect(x,y,S,S);}},
};
