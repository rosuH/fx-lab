export default {
  meta: {
    "id": "lightning",
    "kind": "canvas",
    "name": "Lightning",
    "nameLocal": null,
    "section": "interaction-and-generative",
    "summary": "Jagged electric bolt crackles from top to cursor with blue glow flicker; dramatic, aggressive overlay.",
    "description": "A jagged multi-segment bolt regenerates from the top of the canvas to the cursor every 30 frames, drawn with a blue neon glow. The stroke opacity pulses sinusoidally for a live electric flicker. Use as a dramatic foreground overlay for sci-fi or energy-themed sites.",
    "descriptionZh": "闪电分叉",
    "tags": ["lightning", "lines", "glow", "canvas2d", "overlay"],
    "vibe": ["dramatic", "aggressive"],
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
    "deterministic": false,
    "state": {"persistent": true, "notes": "Bolt path s.bolt and frame counter s.acc persist across frames"},
    "license": "MIT",
    "attribution": null
  },
  // `this` is bound by the runtime to { vhash, vnoise }
  draw: function lightning(ctx,w,h,t,mx,my,s){ ctx.fillStyle='#05060f';ctx.fillRect(0,0,w,h);s.acc=(s.acc||0)+1;if(!s.bolt||s.acc%30===0){s.bolt=[];let x=mx>=0?mx:w/2,y=0;while(y<h){s.bolt.push([x,y]);y+=h/14;x+=(Math.random()-0.5)*40;}}ctx.strokeStyle='rgba(150,190,255,'+(0.5+0.5*Math.sin(s.acc*0.5)).toFixed(2)+')';ctx.lineWidth=2;ctx.shadowBlur=12;ctx.shadowColor='#9bb8ff';ctx.beginPath();s.bolt.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.shadowBlur=0; },
};
