export default {
  meta: {
    "id": "life",
    "kind": "canvas",
    "name": "Game of Life",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "Glowing green cells flicker on a dark grid; Conway's Game of Life evolves hypnotic patterns.",
    "description": "Conway's Game of Life rendered on an 8-pixel cell grid, randomly seeded on each resize. Cells are born or killed by neighbour count, producing gliders, oscillators, and stable clusters over time. Use as a meditative background or retro terminal overlay.",
    "descriptionZh": "康威生命游戏",
    "tags": ["cellular", "grid", "dots", "geometry", "canvas2d", "background"],
    "vibe": ["hypnotic", "technical", "geometric"],
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
    "state": {"persistent": true, "notes": "Uint8Array cell grid accumulates across frames; never cleared between generation steps."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  // ponytail: Conway naturally dies to a few still-lifes; for an ambient tile we keep it alive with
  // per-gen "cosmic ray" sparks + a fresh soup blob whenever population collapses below ~6%.
  draw: function life(ctx,w,h,t,mx,my,s){ const C=8,gw=Math.ceil(w/C),gh=Math.ceil(h/C),N=gw*gh;if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(N);for(let i=0;i<N;i++)s.g[i]=Math.random()<0.3?1:0;s.acc=0;}s.acc++;if(s.acc%4===0){const n=new Uint8Array(N);let alive=0;for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){let c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){c+=s.g[((y+dy+gh)%gh)*gw+(x+dx+gw)%gw];}const a=s.g[y*gw+x],v=(a&&(c===2||c===3))||(!a&&c===3)?1:0;n[y*gw+x]=v;alive+=v;}for(let k=0;k<3;k++)n[(Math.random()*N)|0]=1;if(alive<N*0.06){const bx=(Math.random()*gw)|0,by=(Math.random()*gh)|0;for(let dy=0;dy<8;dy++)for(let dx=0;dx<8;dx++)if(Math.random()<0.5)n[((by+dy)%gh)*gw+(bx+dx)%gw]=1;}s.g=n;}ctx.fillStyle='#070b07';ctx.fillRect(0,0,w,h);ctx.fillStyle='#6bf08a';for(let y=0;y<gh;y++)for(let x=0;x<gw;x++)if(s.g[y*gw+x])ctx.fillRect(x*C,y*C,C-1,C-1); },
};
