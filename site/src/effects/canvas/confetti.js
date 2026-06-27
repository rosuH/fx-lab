export default {
  meta: {
    "id": "confetti",
    "kind": "canvas",
    "name": "Confetti",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Colourful confetti flakes drift down with gentle sine sway; celebratory, playful overlay.",
    "description": "Coloured rectangular confetti pieces spawn at the top and drift down with sine-wave sway and random spin until they exit the canvas. Up to 120 particles are maintained; new pieces spawn each frame at random. Use as a celebration overlay for achievement or success moments.",
    "descriptionZh": "纸屑飘落",
    "tags": ["confetti", "particles", "trail", "canvas2d", "overlay"],
    "vibe": ["playful", "energetic"],
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
    "state": {"persistent": true, "notes": "Particle array s.p grows each frame up to cap; particles removed when off-screen"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function confetti(ctx,w,h,t,mx,my,s){ if(!s.p)s.p=[];if(s.p.length<120&&Math.random()<0.6){const cols=['#ff5a8a','#ffd23f','#34d1c4','#7b6cf6','#ff8f3f'];s.p.push({x:Math.random()*w,y:-10,vy:1+Math.random()*2,vx:(Math.random()-.5)*2,r:2+Math.random()*5,c:cols[Math.floor(Math.random()*5)],rot:Math.random()*6,vr:(Math.random()-.5)*0.3});}ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.y<h+10);for(const p of s.p){p.y+=p.vy;p.x+=p.vx+Math.sin(t+p.y*0.05);p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);ctx.restore();} },
};
