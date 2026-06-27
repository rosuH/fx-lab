export default {
  meta: {
    "id": "mandelbrot",
    "kind": "canvas",
    "name": "Mandelbrot",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Hypnotic zoom into the Mandelbrot set; cycling hues trace infinite fractal complexity.",
    "description": "Renders the Mandelbrot set pixel-by-pixel in 2×2 blocks, slowly zooming into a detail region near the boundary at (-0.745, 0.115). Escape-time coloring cycles the full hue spectrum as time advances. Use as a meditative or psychedelic fullscreen background.",
    "descriptionZh": "曼德博集合 · 缩放",
    "tags": ["fractal", "geometry", "curves", "pixel"],
    "vibe": ["hypnotic", "psychedelic", "meditative"],
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
  draw: function mandelbrot(ctx,w,h,t){ const S=2,zoom=1.7+Math.sin(t*0.1)*0.6,cx=-0.745,cy=0.115; for(let py=0;py<h;py+=S)for(let px=0;px<w;px+=S){const x0=(px/w-0.5)*zoom+cx,y0=(py/h-0.5)*zoom*(h/w)+cy;let x=0,y=0,i=0;for(;i<42&&x*x+y*y<4;i++){const xt=x*x-y*y+x0;y=2*x*y+y0;x=xt;}const c=i===42?0:i/42;ctx.fillStyle='hsl('+((c*300+t*20)%360)+','+(c>0?70:0)+'%,'+(c*55|0)+'%)';ctx.fillRect(px,py,S,S);} },
};
