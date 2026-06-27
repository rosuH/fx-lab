export default {
  meta: {
    "id": "fireworks",
    "kind": "canvas",
    "name": "Fireworks",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Glittering firework bursts erupt automatically across a dark sky with gravity fade; dramatic.",
    "description": "Particle bursts of 50 sparks erupt automatically every 40 frames at or near the cursor, spreading radially with slight gravity and fading out. The canvas partially clears each frame, creating motion-blur trails. Use as a celebratory background or click-effect overlay.",
    "descriptionZh": "烟花 · 点击放",
    "tags": ["particles", "stars", "fire", "canvas2d", "overlay"],
    "vibe": ["energetic", "dramatic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "auto"
    },
    "reducedMotion": "freeze",
    "deterministic": false,
    "state": {"persistent": true, "notes": "Particle array s.p and frame counter s.acc persist; bursts fire automatically every 40 frames; canvas fades partially each frame"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function fireworks(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];s.acc=0;}s.acc++;if(s.acc%40===0){const ox=mx>=0?mx:Math.random()*w,oy=my>=0?my:Math.random()*h*0.6,hue=Math.random()*360;for(let i=0;i<50;i++){const a=Math.random()*6.28,sp=Math.random()*3+1;s.p.push({x:ox,y:oy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,hue});}}ctx.fillStyle='rgba(6,6,14,0.22)';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.life>0);for(const p of s.p){p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.life-=0.012;ctx.fillStyle='hsla('+p.hue+',90%,65%,'+p.life.toFixed(2)+')';ctx.fillRect(p.x,p.y,2.4,2.4);} },
};
