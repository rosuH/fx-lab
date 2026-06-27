export default {
  meta: {
    "id": "hexgrid",
    "kind": "canvas",
    "name": "Hex Grid",
    "nameLocal": null,
    "section": "geometry-and-curves",
    "summary": "Pulsing blue honeycomb grid; a rippling brightness wave sweeps across hex cells.",
    "description": "Fills the canvas with a regular hexagonal grid, each cell's stroke opacity modulated by a sine wave traveling diagonally. The ripple gives the lattice a living, breathing quality. Works well as a background for tech, futuristic, or sci-fi themes.",
    "descriptionZh": "六边形波动网格",
    "tags": ["hexgrid", "geometry", "grid", "waves", "canvas2d", "background"],
    "vibe": ["technical", "futuristic", "ambient"],
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
  draw: function hexgrid(ctx,w,h,t){ ctx.fillStyle='#0a0d12';ctx.fillRect(0,0,w,h);const R=17,SQ=Math.sqrt(3); ctx.lineWidth=1.2; for(let row=0,y=0;y<h+R;row++,y+=R*1.5)for(let x=0;x<w+R;x+=R*SQ){const cx=x+(row%2)*R*SQ/2,cy=y,ph=0.5+0.5*Math.sin(t*2-(cx+cy)*0.02); ctx.strokeStyle='rgba(100,210,255,'+(0.2+ph*0.6).toFixed(2)+')';ctx.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3+Math.PI/6;i?ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R):ctx.moveTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);}ctx.closePath();ctx.stroke();} },
};
