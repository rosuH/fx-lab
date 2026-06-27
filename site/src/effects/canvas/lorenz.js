export default {
  meta: {
    "id": "lorenz",
    "kind": "canvas",
    "name": "Lorenz",
    "nameLocal": null,
    "section": "fractal-and-chaos",
    "summary": "Electric-blue butterfly trace of the Lorenz attractor; calm chaotic orbit on dark navy.",
    "description": "Numerically integrates the Lorenz system (σ=10, ρ=28, β=8/3) and draws a trailing 900-point path projected onto the XZ plane, redrawn each frame over a cleared background. The butterfly attractor slowly unfurls. Ideal as a calm scientific or ambient overlay.",
    "descriptionZh": "洛伦兹蝴蝶",
    "tags": ["attractor", "curves", "geometry", "trail"],
    "vibe": ["calm", "ambient", "technical", "hypnotic"],
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
    "state": {"persistent": true, "notes": "Accumulates up to 900 XZ path points across frames."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function lorenz(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0.1;s.y=0;s.z=0;s.pts=[];} for(let i=0;i<8;i++){const dx=10*(s.y-s.x),dy=s.x*(28-s.z)-s.y,dz=s.x*s.y-8/3*s.z;s.x+=dx*0.008;s.y+=dy*0.008;s.z+=dz*0.008;s.pts.push([s.x,s.z]);} if(s.pts.length>900)s.pts.splice(0,s.pts.length-900); ctx.fillStyle='#05060a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#7fd0ff';ctx.lineWidth=1;ctx.globalAlpha=0.7;ctx.beginPath();for(let i=0;i<s.pts.length;i++){const p=s.pts[i],x=w/2+p[0]*w*0.018,y=h*0.92-p[1]*h*0.026;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.globalAlpha=1; },
};
