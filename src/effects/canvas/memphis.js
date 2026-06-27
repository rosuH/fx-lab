export default {
  meta: {
    "id": "memphis",
    "kind": "canvas",
    "name": "Memphis 80s",
    "nameLocal": null,
    "section": "design-movements",
    "summary": "Neon Memphis shapes drift and spin on dark; vibrant 80s pop-design energy.",
    "description": "Scatters 16 coloured shapes — filled circles, triangles, outline circles, and crosses — across a dark field, each bobbing and rotating to its own phase. Palette echoes 80s Memphis design. Works as a vibrant background or decorative overlay.",
    "descriptionZh": "撞色碎片 · 波普",
    "tags": ["geometry", "canvas2d", "particles", "lines"],
    "vibe": ["playful", "energetic", "retro"],
    "culture": "Memphis / pop design",
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
  draw: function memphis(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.sh=[];for(let i=0;i<16;i++)s.sh.push({x:Math.random()*w,y:Math.random()*h,k:i%4,c:i%5,r:8+Math.random()*15,p:Math.random()*6});} ctx.fillStyle='#0f1020';ctx.fillRect(0,0,w,h); const cols=['#ff5a8a','#34d1c4','#ffd23f','#7b6cf6','#ff8f3f'];
      for(const o of s.sh){ const y=o.y+Math.sin(t*0.6+o.p)*6; ctx.fillStyle=cols[o.c];ctx.strokeStyle=cols[o.c];ctx.lineWidth=3; ctx.save();ctx.translate(o.x,y);ctx.rotate(t*0.2+o.p);
        if(o.k===0){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.fill();} else if(o.k===1){ctx.beginPath();ctx.moveTo(-o.r,o.r);ctx.lineTo(0,-o.r);ctx.lineTo(o.r,o.r);ctx.closePath();ctx.fill();} else if(o.k===2){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.stroke();} else {ctx.beginPath();ctx.moveTo(-o.r,0);ctx.lineTo(o.r,0);ctx.moveTo(0,-o.r);ctx.lineTo(0,o.r);ctx.stroke();} ctx.restore(); } },
};
