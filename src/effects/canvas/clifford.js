export default {
  meta: {
    "id": "clifford",
    "kind": "canvas",
    "name": "Clifford Attractor",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Electric-blue dust swirls into alien strange-attractor shapes; meditative accumulator on dark.",
    "description": "Plots 2200 Clifford attractor points per frame in cyan-blue over a near-black background that fades rather than clears, letting the attractor's loop-and-wing topology build up gradually. Parameter a oscillates slowly over time. Use for atmospheric tech or ambient backgrounds.",
    "descriptionZh": "奇异吸引子",
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
  draw: function clifford(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0.1;s.y=0.1;ctx.fillStyle='#06070c';ctx.fillRect(0,0,w,h);}else{ctx.fillStyle='rgba(6,7,12,0.05)';ctx.fillRect(0,0,w,h);} const a=-1.4+Math.sin(t*0.1)*0.3,b=1.6,c=1.0,d=0.7;ctx.fillStyle='rgba(130,210,255,0.5)';for(let i=0;i<2200;i++){const nx=Math.sin(a*s.y)+c*Math.cos(a*s.x),ny=Math.sin(b*s.x)+d*Math.cos(b*s.y);s.x=nx;s.y=ny;ctx.fillRect(w/2+nx*w*0.22,h/2+ny*h*0.22,1,1);} },
};
