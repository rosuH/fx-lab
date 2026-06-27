export default {
  meta: {
    "id": "ekg",
    "kind": "canvas",
    "name": "EKG Monitor",
    "nameLocal": null,
    "section": "screen-and-signal",
    "summary": "Green heartbeat trace scrolls across a dark grid; tense clinical EKG monitor simulation.",
    "description": "Animates a stylised ECG waveform that scrolls left to right at a steady pace, with characteristic P, QRS spike, and T deflections per cycle. A phosphor-green glow and faint vertical grid overlay reinforce the medical monitor aesthetic. Use as an inline widget, dramatic overlay, or looping background.",
    "descriptionZh": "心电图 · 滚动",
    "tags": ["oscilloscope", "grid", "lines", "canvas2d", "inline", "overlay"],
    "vibe": ["technical", "dramatic", "minimal"],
    "culture": "signal / medical",
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
  draw: function ekg(ctx,w,h,t){ ctx.fillStyle='#04100a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(60,140,90,0.25)';ctx.lineWidth=1;for(let x=0;x<w;x+=18){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}ctx.strokeStyle='#5fff90';ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor='#5fff90';ctx.beginPath();for(let x=0;x<=w;x+=2){const p=((x/w*3-t*0.5)%1+1)%1;let y=h/2;if(p>=0.5&&p<0.55)y-=h*0.02;else if(p>=0.55&&p<0.59)y-=h*0.33;else if(p>=0.59&&p<0.63)y+=h*0.17;else if(p>=0.63&&p<0.69)y-=h*0.04;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.shadowBlur=0;},
};
