export default {
  meta: {
    "id": "doomfire",
    "kind": "canvas",
    "name": "Doom Fire",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "Roiling orange-red fire climbs from a white-hot base; retro demoscene flame in warm pixel blocks.",
    "description": "Recreation of the Doom (1993) fire algorithm: a bottom row of max-heat pixels propagates upward with random lateral drift and gradual cooling each step. Produces natural-looking animated flame rendered as coloured 4-pixel blocks on a black background. Classic demoscene effect; ideal as a dramatic or retro fullscreen background.",
    "descriptionZh": "毁灭战士火焰",
    "tags": ["fire", "particles", "noise", "trail", "pixel", "canvas2d", "background"],
    "vibe": ["dramatic", "aggressive", "retro", "energetic"],
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
    "state": {"persistent": true, "notes": "Uint8Array heat-propagation grid accumulates upward each frame; bottom row stays at max heat."},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function doomfire(ctx,w,h,t,mx,my,s){ const C=4,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.p||s.gw!==gw){s.gw=gw;s.gh=gh;s.p=new Uint8Array(gw*gh);for(let x=0;x<gw;x++)s.p[(gh-1)*gw+x]=36;s.pal=[];for(let i=0;i<37;i++){const f=i/36;s.pal.push('rgb('+Math.min(255,f*510|0)+','+Math.min(255,f*f*400|0)+','+(f>0.7?(f-0.7)*600|0:0)+')');}}for(let x=0;x<gw;x++)for(let y=1;y<gh;y++){const src=y*gw+x,r=Math.random(),dst=src-gw+(r<0.5?-1:r<0.66?1:0),nv=Math.max(0,s.p[src]-(r<0.4?1:0));if(dst>=0)s.p[dst]=nv;}ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.p[y*gw+x];if(v>0){ctx.fillStyle=s.pal[v];ctx.fillRect(x*C,y*C,C,C);}} },
};
