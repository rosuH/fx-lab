export default {
  meta: {
    "id": "fern",
    "kind": "canvas",
    "name": "Barnsley Fern",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Bright green Barnsley fern materializes from chaos; organic fractal nature on dark green.",
    "description": "Applies the Barnsley iterated function system to scatter 7000 random points each frame, painting a photorealistic fern silhouette in bright green on near-black. Uses Math.random() so each rendered frame is unique. Best as a decorative or meditative panel.",
    "descriptionZh": "分形蕨",
    "tags": ["fractal", "particles", "geometry", "noise"],
    "vibe": ["calm", "organic", "meditative"],
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
    "deterministic": false,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function fern(ctx,w,h,t){ ctx.fillStyle='#060c06';ctx.fillRect(0,0,w,h);ctx.fillStyle='rgba(120,230,120,0.7)';let x=0,y=0;for(let i=0;i<7000;i++){const r=Math.random();let nx,ny;if(r<0.01){nx=0;ny=0.16*y;}else if(r<0.86){nx=0.85*x+0.04*y;ny=-0.04*x+0.85*y+1.6;}else if(r<0.93){nx=0.2*x-0.26*y;ny=0.23*x+0.22*y+1.6;}else{nx=-0.15*x+0.28*y;ny=0.26*x+0.24*y+0.44;}x=nx;y=ny;ctx.fillRect(w/2+x*w*0.085,h-y*h*0.095,1,1);} },
};
