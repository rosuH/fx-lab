export default {
  meta: {
    "id": "starfield",
    "kind": "canvas",
    "name": "Starfield Warp",
    "nameLocal": null,
    "section": "data-and-system",
    "summary": "Stars streak inward at warp speed from a deep-space vanishing point; hypnotic forward pull.",
    "description": "Projects 150 stars from a central origin outward, drawing each as a streak from its previous to current position. Stars brighten and widen as they near the viewport edge, leaving soft warp trails via a partial alpha fill. Perfect for sci-fi hero sections or loading screens.",
    "descriptionZh": "星空跃迁",
    "tags": ["starfield", "canvas2d", "stars", "trail", "tunnel"],
    "vibe": ["futuristic", "hypnotic", "energetic"],
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
    "state": {"persistent": true, "notes": "Star positions and warp-streak trails accumulate via partial alpha clear"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function starfield(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.st=[];for(let i=0;i<150;i++)s.st.push({x:(Math.random()-.5)*w,y:(Math.random()-.5)*h,z:Math.random()*w});} ctx.fillStyle='rgba(4,5,12,0.4)';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2;
      for(const p of s.st){ p.z-=4; if(p.z<1){p.z=w;p.x=(Math.random()-.5)*w;p.y=(Math.random()-.5)*h;} const k=128/p.z,k2=128/(p.z+5); const x=cx+p.x*k,y=cy+p.y*k,px=cx+p.x*k2,py=cy+p.y*k2; const b=Math.min(1,(1-p.z/w)*1.6); ctx.strokeStyle='rgba('+(180+b*60|0)+','+(200+b*40|0)+',255,'+b.toFixed(2)+')';ctx.lineWidth=b*1.6;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke(); } },
};
