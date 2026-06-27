export default {
  meta: {
    "id": "field",
    "kind": "canvas",
    "name": "Flow Field",
    "nameLocal": null,
    "section": "data-and-system",
    "summary": "Dim constellation of drifting particles draws faint connecting lines; cursor repels the swarm.",
    "description": "Maintains 60 particles drifting with gentle noise, connected by faint blue lines when close, leaving soft trails via a partial alpha fill. The cursor repels nearby particles. Ideal as an ambient background for dark-themed interfaces.",
    "descriptionZh": "粒子星座 · 光标搅动",
    "tags": ["particles", "canvas2d", "flow", "trail", "lines"],
    "vibe": ["calm", "ambient", "elegant"],
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
    "state": {"persistent": true, "notes": "Particle positions and connecting-line trails accumulate via partial alpha clear"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function field(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.p=[];for(let i=0;i<60;i++)s.p.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}
      ctx.fillStyle='rgba(12,13,16,0.32)';ctx.fillRect(0,0,w,h); const ps=s.p;
      for(const p of ps){ const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy)||1; if(mx>=0&&d<130){const f=(1-d/130)*0.8;p.vx+=dx/d*f;p.vy+=dy/d*f;} p.vx+=(Math.random()-.5)*0.06;p.vy+=(Math.random()-.5)*0.06;p.vx*=0.95;p.vy*=0.95;p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x+=w;else if(p.x>w)p.x-=w; if(p.y<0)p.y+=h;else if(p.y>h)p.y-=h; }
      ctx.lineWidth=1; for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<8100){ctx.strokeStyle='rgba(127,200,255,'+((1-Math.sqrt(d2)/90)*0.22).toFixed(3)+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      ctx.fillStyle='rgba(190,225,255,0.9)'; for(const p of ps){ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,7);ctx.fill();} },
};
