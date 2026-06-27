export default {
  meta: {
    "id": "sierpinski",
    "kind": "canvas",
    "name": "Sierpinski",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Warm amber Sierpinski triangle emerges from the chaos game; minimal fractal on dark.",
    "description": "Uses the chaos game algorithm — repeatedly jumping halfway to a random vertex — to paint 7000 points per frame as a Sierpinski triangle in warm amber. Math.random() means each frame is a unique instance. Clean and minimal for decorative use.",
    "descriptionZh": "谢尔宾斯基三角",
    "tags": ["fractal", "geometry", "particles", "dots"],
    "vibe": ["minimal", "geometric", "hypnotic"],
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
  draw: function sierpinski(ctx,w,h,t){ ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,w,h);const V=[[w/2,8],[8,h-8],[w-8,h-8]];let x=w/2,y=h/2;ctx.fillStyle='rgba(255,210,120,0.7)';for(let i=0;i<7000;i++){const v=V[Math.floor(Math.random()*3)];x=(x+v[0])/2;y=(y+v[1])/2;if(i>10)ctx.fillRect(x,y,1,1);} },
};
