export default {
  meta: {
    "id": "nebula",
    "kind": "canvas",
    "name": "Nebula",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Drifting cloud wisps and twinkling stars form a deep-space nebula; ambient, meditative background.",
    "description": "14 slowly swaying radial-gradient clouds in blue-violet hues overlay 40 twinkling star points against a near-black background. Composite mode 'lighter' blends the clouds for a luminous depth effect. Use as a space-themed ambient background or hero section backdrop.",
    "descriptionZh": "星云叠加",
    "tags": ["nebula", "stars", "starfield", "glow", "canvas2d", "background"],
    "vibe": ["ambient", "meditative"],
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
    "deterministic": false,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function nebula(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<14;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:30+Math.random()*60,hue:Math.random()*120+200,ph:Math.random()*6});}ctx.fillStyle='#04040a';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const x=c.x+Math.sin(t*0.2+c.ph)*20,y=c.y+Math.cos(t*0.15+c.ph)*16,g=ctx.createRadialGradient(x,y,0,x,y,c.r);g.addColorStop(0,'hsla('+c.hue+',80%,60%,0.16)');g.addColorStop(1,'hsla('+c.hue+',80%,60%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over';for(let i=0;i<40;i++){ctx.fillStyle='rgba(255,255,255,'+(0.2+0.3*Math.sin(t+i)).toFixed(2)+')';ctx.fillRect((i*97)%w,(i*53)%h,1,1);} },
};
