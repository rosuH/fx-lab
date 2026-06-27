export default {
  meta: {
    "id": "aboriginal",
    "kind": "canvas",
    "name": "Dot Painting",
    "nameLocal": null,
    "section": "world-patterns",
    "summary": "Warm earth-tone concentric dot rings orbit fixed anchors on dark brown; organic and meditative.",
    "description": "Six randomly placed anchor points each emit six rings of coloured dots in ochre, sienna, cream, and red that slowly orbit in alternating directions. Positions are randomised once per mount and then persist. Inspired by the concentric dot technique of Australian Aboriginal art.",
    "descriptionZh": "同心点画 · 大地色",
    "tags": ["dots", "geometry", "canvas2d", "background"],
    "vibe": ["meditative", "organic", "cultural"],
    "culture": "Aboriginal Australian",
    "accuracyNote": "Procedural approximation of Aboriginal Australian dot painting; not a faithful reproduction of any specific historical motif.",
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
    "state": { "persistent": true, "notes": "Dot centre positions generated once on first frame via Math.random." },
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function aboriginal(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.c=[];for(let i=0;i<6;i++)s.c.push({x:Math.random()*w,y:Math.random()*h});} ctx.fillStyle='#2a1a0f';ctx.fillRect(0,0,w,h); const cols=['#e8b04b','#d9763a','#ece0cf','#b5472a','#7a3b1f'];
      for(const c of s.c){ for(let ring=0;ring<6;ring++){ const rad=7+ring*9; const n=Math.max(6,Math.floor(rad*0.7)); for(let i=0;i<n;i++){ const a=i/n*6.2831+ring*0.3+t*0.12*(ring%2?1:-1); ctx.fillStyle=cols[(ring+i)%cols.length]; ctx.beginPath();ctx.arc(c.x+Math.cos(a)*rad,c.y+Math.sin(a)*rad,2.0,0,7);ctx.fill(); } } } },
};
