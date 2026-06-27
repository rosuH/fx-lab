export default {
  meta: {
    "id": "cursortrail",
    "kind": "canvas",
    "name": "Cursor Trail",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Flowing rainbow streak follows the cursor across a dark canvas; playful, energetic overlay.",
    "description": "A colour-cycling stroke trail follows the mouse across a dark background, fading from opaque at the tip to transparent at the tail. The trail auto-orbits gracefully when no cursor is present. Use as a fun cursor overlay on creative or portfolio sites.",
    "descriptionZh": "彩虹拖尾",
    "tags": ["trail", "particles", "cursor", "overlay", "canvas2d"],
    "vibe": ["playful", "energetic"],
    "culture": null,
    "accuracyNote": null,
    "perf": {
      "gpu": "low",
      "cpu": "low",
      "mobileSafe": true
    },
    "interactive": {
      "followsCursor": true,
      "trigger": "hover"
    },
    "reducedMotion": "freeze",
    "deterministic": true,
    "state": {"persistent": true, "notes": "Trail point array s.tr accumulates cursor positions across frames"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function cursortrail(ctx,w,h,t,mx,my,s){ if(!s.tr)s.tr=[];s.tr.push(mx>=0?[mx,my]:[w/2+Math.cos(t)*w*0.3,h/2+Math.sin(t*1.3)*h*0.3]);if(s.tr.length>40)s.tr.shift();ctx.fillStyle='#0a0b10';ctx.fillRect(0,0,w,h);ctx.lineCap='round';for(let i=1;i<s.tr.length;i++){const a=i/s.tr.length;ctx.strokeStyle='hsla('+((t*60+i*6)%360)+',90%,60%,'+a.toFixed(2)+')';ctx.lineWidth=a*8;ctx.beginPath();ctx.moveTo(s.tr[i-1][0],s.tr[i-1][1]);ctx.lineTo(s.tr[i][0],s.tr[i][1]);ctx.stroke();} },
};
