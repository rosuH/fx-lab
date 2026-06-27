export default {
  meta: {
    "id": "vortex",
    "kind": "canvas",
    "name": "Vortex",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Colourful particles spiral into the cursor in an accelerating vortex; hypnotic, energetic overlay.",
    "description": "140 particles continuously spiral inward toward the cursor, colour-shifting by radial distance and hue-cycling over time. The canvas fades partially each frame (alpha 0.2), painting a glowing vortex trail. Use as a hypnotic cursor-following overlay on dark hero sections.",
    "descriptionZh": "粒子漩涡",
    "tags": ["particles", "spiral", "orbit", "cursor", "overlay", "canvas2d"],
    "vibe": ["hypnotic", "energetic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": false,
    "state": {"persistent": true, "notes": "Particle positions in s.p accumulate motion each frame; canvas fades partially (alpha 0.2 fill)"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function vortex(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];for(let i=0;i<140;i++)s.p.push({x:Math.random()*w,y:Math.random()*h});}ctx.fillStyle='rgba(8,6,14,0.2)';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2,cy=my>=0?my:h/2;for(const p of s.p){const dx=p.x-cx,dy=p.y-cy,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx)+0.1;p.x=cx+Math.cos(a)*(d-0.6);p.y=cy+Math.sin(a)*(d-0.6);if(d<6){p.x=Math.random()*w;p.y=Math.random()*h;}ctx.fillStyle='hsla('+((d+t*40)%360)+',90%,65%,0.9)';ctx.fillRect(p.x,p.y,2,2);} },
};
