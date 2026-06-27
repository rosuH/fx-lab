export default {
  meta: {
    "id": "blobcursor",
    "kind": "canvas",
    "name": "Gooey Blob",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Pulsing purple gooey blob clings to the cursor with orbiting metaball satellites; playful, organic.",
    "description": "Six orbiting metaball satellites fuse with a central blob that tracks the cursor, drawing an implicit-surface isoline via per-pixel threshold sampling. The blob colour shifts from purple to vivid pink at the hottest isovalue. Use as a playful cursor overlay on dark interactive pages.",
    "descriptionZh": "融合光标",
    "tags": ["metaballs", "fluid", "cursor", "overlay", "canvas2d"],
    "vibe": ["playful", "organic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "high",
      "mobileSafe": false
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": false,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function blobcursor(ctx,w,h,t,mx,my,s){ if(!s.b){s.b=[];for(let i=0;i<6;i++)s.b.push({a:Math.random()*6,r:14+Math.random()*10});}const cx=mx>=0?mx:w/2+Math.cos(t)*40,cy=my>=0?my:h/2+Math.sin(t)*40,S=5;ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){let v=400/((x-cx)*(x-cx)+(y-cy)*(y-cy)+40);for(const b of s.b){const bx=cx+Math.cos(b.a+t)*b.r*2,by=cy+Math.sin(b.a+t*1.2)*b.r*2;v+=300/((x-bx)*(x-bx)+(y-by)*(y-by)+40);}if(v>1){const e=Math.min(1,(v-1)*3);ctx.fillStyle='rgb('+(120+e*130|0)+',60,'+(200+e*55|0)+')';ctx.fillRect(x,y,S,S);}} },
};
