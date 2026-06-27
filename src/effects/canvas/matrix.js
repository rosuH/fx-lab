export default {
  meta: {
    "id": "matrix",
    "kind": "canvas",
    "name": "Matrix Rain",
    "nameLocal": null,
    "section": "data-and-system",
    "summary": "Green Katakana glyphs cascade in columns on black; iconic hacker-terminal rain effect.",
    "description": "Renders falling Katakana characters with a partial alpha fill that leaves persistent green trails, recreating the classic Matrix rain aesthetic. Each column resets at a random interval. An unmistakable retro-cyber background.",
    "descriptionZh": "片假名数字雨",
    "tags": ["ascii", "canvas2d", "rain", "trail", "neon"],
    "vibe": ["retro", "dramatic", "technical"],
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
    "state": {"persistent": true, "notes": "Column y-positions and character trails accumulate via partial alpha clear"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function matrix(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.cols=Math.floor(w/12);s.y=[];for(let i=0;i<s.cols;i++)s.y[i]=Math.random()*h;} ctx.fillStyle='rgba(2,8,4,0.16)';ctx.fillRect(0,0,w,h); ctx.font='13px monospace';
      for(let i=0;i<s.cols;i++){ const x=i*12; ctx.fillStyle='rgba(190,255,205,0.95)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]); ctx.fillStyle='rgba(60,220,120,0.4)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]-15); s.y[i]+=8; if(s.y[i]>h&&Math.random()>0.975)s.y[i]=0; } },
};
