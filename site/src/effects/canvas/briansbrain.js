export default {
  meta: {
    "id": "briansbrain",
    "kind": "canvas",
    "name": "Brian's Brain",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "White sparks and blue trailing echoes pulse across a dark grid; three-state cellular automaton.",
    "description": "Brian's Brain three-state automaton: cells fire bright white, decay to blue, then rest before firing again. The interplay produces rolling spark-waves that perpetually travel the grid without stabilizing. Good for energetic sci-fi overlays.",
    "descriptionZh": "三态元胞",
    "tags": ["cellular", "grid", "dots", "particles", "neon", "canvas2d", "background"],
    "vibe": ["hypnotic", "technical", "energetic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
    },
    "interactive": {
      "followsCursor": false,
      "trigger": "auto"
    },
    "reducedMotion": "freeze",
    "deterministic": false,
    "state": {"persistent": true, "notes": "Uint8Array three-state cell grid accumulates across frames; never cleared between generation steps."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  // ponytail: Brian's Brain often burns out to a near-empty grid; reseed a random soup blob whenever
  // the firing population collapses below ~2% so the tile keeps churning.
  draw: function briansbrain(ctx,w,h,t,mx,my,s){ const C=7,gw=Math.ceil(w/C),gh=Math.ceil(h/C),N=gw*gh;if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(N);for(let i=0;i<N;i++)s.g[i]=Math.random()<0.25?1:0;s.acc=0;}s.acc++;if(s.acc%4===0){const n=new Uint8Array(N);let firing=0;for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const i=y*gw+x;if(s.g[i]===1)n[i]=2;else if(s.g[i]===2)n[i]=0;else{let c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){if(s.g[((y+dy+gh)%gh)*gw+(x+dx+gw)%gw]===1)c++;}n[i]=c===2?1:0;}if(n[i]===1)firing++;}if(firing<N*0.02){const bx=(Math.random()*gw)|0,by=(Math.random()*gh)|0;for(let dy=0;dy<10;dy++)for(let dx=0;dx<10;dx++)if(Math.random()<0.4)n[((by+dy)%gh)*gw+(bx+dx)%gw]=1;}s.g=n;}ctx.fillStyle='#04060c';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.g[y*gw+x];if(v){ctx.fillStyle=v===1?'#fff':'#3a6cff';ctx.fillRect(x*C,y*C,C-1,C-1);}} },
};
