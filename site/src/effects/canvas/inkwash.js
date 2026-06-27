export default {
  meta: {
    "id": "inkwash",
    "kind": "canvas",
    "name": "Ink Wash",
    "nameLocal": "水墨",
    "section": "world-patterns",
    "summary": "Soft ink blobs drift on cream paper; hover to drop a brushstroke wash at the cursor.",
    "description": "Five radial-gradient ink blobs drift in slow Lissajous paths across a warm cream background, building a gently stained ink-wash field. Moving the cursor adds a darker ink mark at the pointer, simulating a brush touching paper. Use for meditative overlays or East Asian-themed interfaces.",
    "descriptionZh": "晕染笔触 · 跟手",
    "tags": ["ink", "canvas2d", "background", "overlay"],
    "vibe": ["calm", "meditative", "cultural", "minimal"],
    "culture": "China",
    "accuracyNote": "Procedural approximation of Chinese ink wash painting; not a faithful reproduction of any specific historical motif.",
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
    "state": { "persistent": true, "notes": "Ink blob positions generated once on first frame via Math.random." },
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function inkwash(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.b=[];for(let i=0;i<5;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,r:24+Math.random()*40,p:Math.random()*6});} ctx.fillStyle='#f3efe6';ctx.fillRect(0,0,w,h);
      for(const b of s.b){ const cx=b.x+Math.sin(t*0.2+b.p)*22,cy=b.y+Math.cos(t*0.17+b.p)*16; const g=ctx.createRadialGradient(cx,cy,0,cx,cy,b.r); g.addColorStop(0,'rgba(18,18,22,0.5)');g.addColorStop(0.6,'rgba(28,28,34,0.2)');g.addColorStop(1,'rgba(40,40,46,0)'); ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,b.r,0,7);ctx.fill(); }
      if(mx>=0){ const g=ctx.createRadialGradient(mx,my,0,mx,my,42);g.addColorStop(0,'rgba(8,8,12,0.55)');g.addColorStop(1,'rgba(8,8,12,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(mx,my,42,0,7);ctx.fill(); } },
};
