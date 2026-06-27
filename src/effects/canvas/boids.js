export default {
  meta: {
    "id": "boids",
    "kind": "canvas",
    "name": "Boids Flocking",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "60 pale-blue flecks flock and steer toward the cursor; fluid organic swarm with motion trails.",
    "description": "Sixty triangle-shaped boids apply separation, alignment, and cohesion rules to flock naturally across the canvas. When the cursor hovers, boids are gently attracted to its position, reshaping the flock in real time. Canvas uses a 30%-opacity fade each frame rather than a full clear, leaving soft motion trails.",
    "descriptionZh": "鸟群 · 跟手",
    "tags": ["flocking", "particles", "flow", "trail", "canvas2d", "background", "overlay"],
    "vibe": ["hypnotic", "organic", "ambient"],
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
    "state": {"persistent": true, "notes": "Canvas not fully cleared each frame; motion trail fades at 30% opacity overlay per tick."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function boids(ctx,w,h,t,mx,my,s){ if(!s.b){s.b=[];for(let i=0;i<60;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}ctx.fillStyle='rgba(8,10,16,0.3)';ctx.fillRect(0,0,w,h);for(const b of s.b){let ax=0,ay=0,cx=0,cy=0,sx=0,sy=0,n=0;for(const o of s.b){const dx=o.x-b.x,dy=o.y-b.y,d=Math.hypot(dx,dy);if(o!==b&&d<40){ax+=o.vx;ay+=o.vy;cx+=o.x;cy+=o.y;if(d<18){sx-=dx;sy-=dy;}n++;}}if(n){b.vx+=(ax/n-b.vx)*0.05+(cx/n-b.x)*0.0008+sx*0.004;b.vy+=(ay/n-b.vy)*0.05+(cy/n-b.y)*0.0008+sy*0.004;}if(mx>=0){b.vx+=(mx-b.x)*0.001;b.vy+=(my-b.y)*0.001;}const sp=Math.hypot(b.vx,b.vy)||1;b.vx=b.vx/sp*1.6;b.vy=b.vy/sp*1.6;b.x=(b.x+b.vx+w)%w;b.y=(b.y+b.vy+h)%h;const a=Math.atan2(b.vy,b.vx);ctx.fillStyle='#9fe0ff';ctx.beginPath();ctx.moveTo(b.x+Math.cos(a)*5,b.y+Math.sin(a)*5);ctx.lineTo(b.x+Math.cos(a+2.5)*4,b.y+Math.sin(a+2.5)*4);ctx.lineTo(b.x+Math.cos(a-2.5)*4,b.y+Math.sin(a-2.5)*4);ctx.closePath();ctx.fill();} },
};
