export default {
  meta: {
    "id": "wavegrid",
    "kind": "canvas",
    "name": "Wave Grid",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Perspective dot grid ripples with sine waves receding into depth; geometric, hypnotic background.",
    "description": "A 14×10 dot grid rendered in perspective with depth-colour scaling and a sine-wave displacement creates a rippling 3D plane effect. Dot size and hue shift smoothly with depth. Use as a futuristic or technical background.",
    "descriptionZh": "透视波点阵",
    "tags": ["grid", "dots", "waves", "geometry", "canvas2d", "background"],
    "vibe": ["geometric", "hypnotic"],
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
  draw: function wavegrid(ctx,w,h,t){ ctx.fillStyle='#060810';ctx.fillRect(0,0,w,h);const cols=14,rows=10;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const px=(c/(cols-1)-0.5),pz=r/(rows-1),sc=0.4+pz*0.9,x=w/2+px*w*sc,y=h*0.35+pz*h*0.5+Math.sin(c*0.6+r*0.4-t*2)*8*pz,sz=1+pz*2.5;ctx.fillStyle='hsl('+((200+pz*120)%360)+',80%,'+(40+pz*30|0)+'%)';ctx.beginPath();ctx.arc(x,y,sz,0,7);ctx.fill();} },
};
