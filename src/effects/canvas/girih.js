export default {
  meta: {
    "id": "girih",
    "kind": "canvas",
    "name": "Girih",
    "nameLocal": "几何",
    "section": "world-patterns",
    "summary": "Dark ground of slowly rotating golden octagram lattice; elegant Islamic geometric meditation.",
    "description": "Two overlapping rotated squares and a central octagon tile the canvas with gold lines on a near-black ground, evoking Islamic girih geometric art. The entire lattice rotates imperceptibly slowly, lending a hypnotic depth. Use as a dark, elegant background for cultural or luxury interfaces.",
    "descriptionZh": "八角星镶嵌 · 金线",
    "tags": ["geometry", "tiling", "mosaic", "canvas2d", "background"],
    "vibe": ["elegant", "hypnotic", "cultural"],
    "culture": "Islamic",
    "accuracyNote": "Procedural approximation of Islamic girih tiling; not a faithful reproduction of any specific historical motif.",
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
  draw: function girih(ctx,w,h,t){ ctx.fillStyle='#10130f';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(212,175,90,0.85)';ctx.lineWidth=1.3; const R=30,rot=t*0.06,S=R*1.7;
      for(let gy=0;gy<h+S;gy+=S)for(let gx=0;gx<w+S;gx+=S){ for(let q=0;q<2;q++){ ctx.beginPath(); for(let i=0;i<4;i++){const a=rot+q*Math.PI/4+i*Math.PI/2;const x=gx+Math.cos(a)*R,y=gy+Math.sin(a)*R;i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.closePath();ctx.stroke(); }
        ctx.beginPath(); for(let i=0;i<8;i++){const a=rot+i*Math.PI/4+Math.PI/8;const x=gx+Math.cos(a)*R*0.46,y=gy+Math.sin(a)*R*0.46;i?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.closePath();ctx.stroke(); } },
};
