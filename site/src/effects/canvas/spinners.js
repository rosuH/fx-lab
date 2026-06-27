export default {
  meta: {
    "id": "spinners",
    "kind": "canvas",
    "name": "Loaders",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Six loading spinner variants — arc, tick, pulse, ring, bar, fade — minimal, technical demo.",
    "description": "Six animated loading-spinner archetypes — spinning arc, radial tick-fade, bouncing dots, tracked arc, rotating bar, and pulse circle — are drawn in a 3×2 grid. All are driven purely by time with no framework needed. Use as a reference panel or embed individual variants in UI mockups.",
    "descriptionZh": "加载动画集",
    "tags": ["loader", "dots", "geometry", "canvas2d"],
    "vibe": ["minimal", "technical"],
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
    "deterministic": true,
    "state": null,
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function spinners(ctx,w,h,t){ ctx.fillStyle='#0c0d12';ctx.fillRect(0,0,w,h);const pts=[[0.25,0.32],[0.5,0.32],[0.75,0.32],[0.25,0.68],[0.5,0.68],[0.75,0.68]];ctx.lineCap='round';pts.forEach((p,i)=>{const cx=p[0]*w,cy=p[1]*h,R=Math.min(w,h)*0.09;ctx.strokeStyle='#7fd0ff';ctx.lineWidth=3;if(i===0){ctx.beginPath();ctx.arc(cx,cy,R,t*3,t*3+4);ctx.stroke();}else if(i===1){for(let k=0;k<8;k++){ctx.globalAlpha=((k+Math.floor(t*8))%8)/8;ctx.beginPath();ctx.moveTo(cx+Math.cos(k*0.785)*R*0.5,cy+Math.sin(k*0.785)*R*0.5);ctx.lineTo(cx+Math.cos(k*0.785)*R,cy+Math.sin(k*0.785)*R);ctx.stroke();}ctx.globalAlpha=1;}else if(i===2){ctx.fillStyle='#7fd0ff';for(let k=0;k<3;k++){ctx.globalAlpha=0.5+0.5*Math.sin(t*4-k*0.6);ctx.beginPath();ctx.arc(cx+(k-1)*12,cy,4,0,7);ctx.fill();}ctx.globalAlpha=1;}else if(i===3){ctx.strokeStyle='rgba(127,208,255,0.2)';ctx.beginPath();ctx.arc(cx,cy,R,0,6.28);ctx.stroke();ctx.strokeStyle='#7fd0ff';ctx.beginPath();ctx.arc(cx,cy,R,t*3,t*3+1.8);ctx.stroke();}else if(i===4){ctx.save();ctx.translate(cx,cy);ctx.rotate(t*3);ctx.fillStyle='#7fd0ff';ctx.fillRect(-R*0.6,-3,R*1.2,6);ctx.restore();}else{ctx.fillStyle='#7fd0ff';ctx.globalAlpha=Math.abs(Math.sin(t*3));ctx.beginPath();ctx.arc(cx,cy,R*0.7,0,7);ctx.fill();ctx.globalAlpha=1;}}); },
};
