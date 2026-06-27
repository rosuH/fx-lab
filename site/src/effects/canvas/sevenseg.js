export default {
  meta: {
    "id": "sevenseg",
    "kind": "canvas",
    "name": "7-Segment",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Red seven-segment digits show a live HH:MM:SS clock on near-black; crisp retro electronics.",
    "description": "Draws six seven-segment display digits updated every frame to show the current local time. Segments glow red against a near-black background using direct rect primitives. Use as an inline widget, overlay, or retro UI accent.",
    "descriptionZh": "数码管 · 实时钟",
    "tags": ["clock", "geometry", "grid", "canvas2d", "inline"],
    "vibe": ["technical", "retro", "minimal"],
    "culture": "signal / electronics / display",
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
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function sevenseg(ctx,w,h,t){ ctx.fillStyle='#0a0c0a';ctx.fillRect(0,0,w,h);const segs={0:[1,1,1,1,1,1,0],1:[0,1,1,0,0,0,0],2:[1,1,0,1,1,0,1],3:[1,1,1,1,0,0,1],4:[0,1,1,0,0,1,1],5:[1,0,1,1,0,1,1],6:[1,0,1,1,1,1,1],7:[1,1,1,0,0,0,0],8:[1,1,1,1,1,1,1],9:[1,1,1,1,0,1,1]};const tm=new Date(),str=[tm.getHours(),tm.getMinutes(),tm.getSeconds()].map(v=>String(v).padStart(2,'0')).join(''),dw=w/6.5,x0=dw*0.3;for(let d=0;d<6;d++){const seg=segs[+str[d]],bx=x0+d*dw,by=h*0.34,sw=dw*0.55,sh=h*0.32;ctx.fillStyle='#ff3a3a';const dr=(i,x,y,wv,hv)=>{if(seg[i])ctx.fillRect(bx+x,by+y,wv,hv);};dr(0,4,0,sw-8,4);dr(1,sw-2,2,4,sh/2-3);dr(2,sw-2,sh/2,4,sh/2-3);dr(3,4,sh-4,sw-8,4);dr(4,0,sh/2,4,sh/2-3);dr(5,0,2,4,sh/2-3);dr(6,4,sh/2-2,sw-8,4);}},
};
