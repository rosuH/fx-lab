export default {
  meta: {
    "id": "julia",
    "kind": "canvas",
    "name": "Julia Set",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Julia set blooms through parameter space; vivid fractal shapes drift and morph in cyan-blue.",
    "description": "Iterates the Julia set on every pixel with a slowly rotating complex parameter c = 0.7885·(cos t, sin t). Escape-time coloring in cyan-to-blue hues produces intricate fractal boundaries that morph continuously. Use as a hypnotic animated background.",
    "descriptionZh": "朱利亚集 · 漂移",
    "tags": ["fractal", "geometry", "curves", "pixel"],
    "vibe": ["hypnotic", "psychedelic"],
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
  draw: function julia(ctx,w,h,t){ const S=2,jx=0.7885*Math.cos(t*0.3),jy=0.7885*Math.sin(t*0.3),zoom=3; for(let py=0;py<h;py+=S)for(let px=0;px<w;px+=S){let x=(px/w-0.5)*zoom*(w/h),y=(py/h-0.5)*zoom,i=0;for(;i<48&&x*x+y*y<4;i++){const xt=x*x-y*y+jx;y=2*x*y+jy;x=xt;}const c=i/48;ctx.fillStyle='hsl('+((200+c*200)%360)+',80%,'+(c*60|0)+'%)';ctx.fillRect(px,py,S,S);} },
};
