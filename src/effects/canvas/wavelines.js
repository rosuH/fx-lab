export default {
  meta: {
    "id": "wavelines",
    "kind": "canvas",
    "name": "Wave Lines",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Stacked rainbow sine waves undulating on dark blue-black; hypnotic layered ribbon flow.",
    "description": "Draws 20 overlapping sine waves across the canvas, each with a different phase, frequency offset, and hue cycling through blue-to-rainbow range. Amplitudes oscillate slowly, creating a rippling layered ribbon effect. Ideal as a calm ambient background.",
    "descriptionZh": "叠层正弦波带",
    "tags": ["waves", "lines", "geometry", "flow", "canvas2d", "background"],
    "vibe": ["calm", "ambient", "hypnotic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
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
  draw: function wavelines(ctx,w,h,t){ ctx.fillStyle='#070a14';ctx.fillRect(0,0,w,h);ctx.lineWidth=1.6; for(let i=0;i<20;i++){ctx.strokeStyle='hsl('+((200+i*6)%360)+',80%,60%)';ctx.beginPath();for(let x=0;x<=w;x+=4){const y=h*0.5+Math.sin(x*0.02+t+i*0.4)*(20+i*3)*Math.sin(t*0.5+i);x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();} },
};
