export default {
  meta: {
    "id": "fractaltree",
    "kind": "canvas",
    "name": "Fractal Tree",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Wind-blown fractal tree sways gently; organic green branches on dark, calm and alive.",
    "description": "Recursively draws a branching tree up to 9 levels deep, with branch angle oscillating to a slow sine wave simulating wind. Colors shift from dark olive at the trunk to bright lime at the tips. Elegant and organic for calm or ambient backgrounds.",
    "descriptionZh": "分形树 · 风动",
    "tags": ["fractal", "curves", "geometry", "lines"],
    "vibe": ["calm", "organic", "ambient"],
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
  draw: function fractaltree(ctx,w,h,t){ ctx.fillStyle='#0a0c0a';ctx.fillRect(0,0,w,h);const ang=0.35+Math.sin(t*0.6)*0.25;const br=(x,y,len,a,d)=>{if(d>9||len<2)return;const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;ctx.strokeStyle='hsl('+(110+d*8)+','+(50+d*4)+'%,'+(30+d*5)+'%)';ctx.lineWidth=10-d;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();br(x2,y2,len*0.74,a-ang,d+1);br(x2,y2,len*0.74,a+ang,d+1);};br(w/2,h-6,h*0.22,-1.5708,0); },
};
