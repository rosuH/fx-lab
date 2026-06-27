export default {
  meta: {
    "id": "bokeh",
    "kind": "canvas",
    "name": "Bokeh",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Soft luminous circles drift upward like out-of-focus lights; calm, elegant background.",
    "description": "24 blurred radial-gradient circles in cyan-to-blue hues drift slowly upward in a loop, simulating the bokeh circles of a shallow-depth-of-field photograph. Composite mode 'lighter' adds soft glow overlap. Use as an ambient atmospheric background.",
    "descriptionZh": "焦外光斑",
    "tags": ["dots", "glow", "particles", "canvas2d", "background"],
    "vibe": ["calm", "elegant"],
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
  draw: function bokeh(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<24;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:10+Math.random()*40,hue:Math.random()*60+180,sp:0.2+Math.random()*0.5,ph:Math.random()*6});}ctx.fillStyle='#06080f';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const y=(c.y+t*c.sp*20)%(h+80)-40,g=ctx.createRadialGradient(c.x,y,0,c.x,y,c.r),al=0.12+0.08*Math.sin(t+c.ph);g.addColorStop(0,'hsla('+c.hue+',80%,70%,'+al.toFixed(2)+')');g.addColorStop(1,'hsla('+c.hue+',80%,70%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(c.x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over'; },
};
