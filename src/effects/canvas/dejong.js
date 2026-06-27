export default {
  meta: {
    "id": "dejong",
    "kind": "canvas",
    "name": "De Jong",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Pink dust drifts into strange alien loops; a De Jong attractor slowly builds on dark violet.",
    "description": "Plots 2200 De Jong attractor points per frame in pink-magenta over a near-black background that fades rather than clears, letting the folded-wing shape accumulate over time. Parameter a oscillates slowly. Best as an ambient or sci-fi background.",
    "descriptionZh": "德容吸引子",
    "tags": ["attractor", "geometry", "curves", "particles"],
    "vibe": ["hypnotic", "ambient", "technical"],
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
    "state": {"persistent": true, "notes": "Accumulates 2200 dots per frame; canvas only partially erased each frame (alpha fade, not full clear)."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function dejong(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0;s.y=0;ctx.fillStyle='#0a060c';ctx.fillRect(0,0,w,h);}else{ctx.fillStyle='rgba(10,6,12,0.05)';ctx.fillRect(0,0,w,h);} const a=1.4+Math.sin(t*0.07),b=-2.3,c=2.4,d=-2.1;ctx.fillStyle='rgba(255,150,200,0.5)';for(let i=0;i<2200;i++){const nx=Math.sin(a*s.y)-Math.cos(b*s.x),ny=Math.sin(c*s.x)-Math.cos(d*s.y);s.x=nx;s.y=ny;ctx.fillRect(w/2+nx*w*0.2,h/2+ny*h*0.2,1,1);} },
};
