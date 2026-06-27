export default {
  meta: {
    "id": "langton",
    "kind": "canvas",
    "name": "Langton's Ant",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "A lone ant traces deterministic yellow highways on a black grid, growing complex structure from nothing.",
    "description": "Langton's Ant: a single deterministic agent turns left on white cells and right on black, flipping each visited cell. After roughly 10,000 steps it breaks out of apparent chaos into a periodic diagonal highway. Canvas accumulates incrementally — no full clear each frame.",
    "descriptionZh": "兰顿蚂蚁",
    "tags": ["cellular", "grid", "geometry", "attractor", "canvas2d", "background"],
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
    "deterministic": true,
    "state": {"persistent": true, "notes": "Uint8Array cell grid and ant position accumulate; canvas is only partially redrawn each frame (no full clear)."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function langton(ctx,w,h,t,mx,my,s){ const C=5,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(gw*gh);s.ax=gw>>1;s.ay=gh>>1;s.dir=0;ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);}for(let k=0;k<40;k++){const i=s.ay*gw+s.ax;if(s.g[i]){s.dir=(s.dir+3)%4;s.g[i]=0;}else{s.dir=(s.dir+1)%4;s.g[i]=1;}ctx.fillStyle=s.g[i]?'#ffcf5a':'#0a0a0a';ctx.fillRect(s.ax*C,s.ay*C,C,C);s.ax=(s.ax+[0,1,0,-1][s.dir]+gw)%gw;s.ay=(s.ay+[-1,0,1,0][s.dir]+gh)%gh;}ctx.fillStyle='#ff4a6a';ctx.fillRect(s.ax*C,s.ay*C,C,C); },
};
