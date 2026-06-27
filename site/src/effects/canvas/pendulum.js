export default {
  meta: {
    "id": "pendulum",
    "kind": "canvas",
    "name": "Double Pendulum",
    "nameLocal": null,
    "section": "cellular-and-physics",
    "summary": "A double pendulum traces chaotic pink arcs on a deep-blue field; beautiful deterministic chaos.",
    "description": "A double pendulum simulates chaotic Newtonian mechanics via numerical integration, running three sub-steps per frame. The tip draws a pink motion trail (last 120 points) forming ever-changing Lissajous-like arcs. Use as a calm scientific or dramatic overlay background.",
    "descriptionZh": "双摆混沌",
    "tags": ["pendulum", "trail", "attractor", "curves", "geometry", "canvas2d", "background"],
    "vibe": ["hypnotic", "technical", "dramatic"],
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
  // ponytail: original damped into a dull near-collinear swing. Start near-inverted (high energy),
  // integrate finer (8x dt=0.06) to sustain chaos, guard NaN/blowups, and re-kick if it ever settles.
  // Fading rainbow trail + a visible pivot make the chaotic divergence read clearly.
  draw: function pendulum(ctx,w,h,t,mx,my,s){ if(s.a1===undefined){s.a1=Math.PI*0.9;s.a2=Math.PI*0.9;s.v1=0;s.v2=0;s.tr=[];s.calm=0;}const m1=10,m2=10,l1=h*0.2,l2=h*0.2,g=1,DT=0.06;for(let k=0;k<8;k++){const a1=s.a1,a2=s.a2,v1=s.v1,v2=s.v2,d=2*m1+m2-m2*Math.cos(2*a1-2*a2);s.v1+=(-g*(2*m1+m2)*Math.sin(a1)-m2*g*Math.sin(a1-2*a2)-2*Math.sin(a1-a2)*m2*(v2*v2*l2+v1*v1*l1*Math.cos(a1-a2)))/(l1*d)*DT;s.v2+=(2*Math.sin(a1-a2)*(v1*v1*l1*(m1+m2)+g*(m1+m2)*Math.cos(a1)+v2*v2*l2*m2*Math.cos(a1-a2)))/(l2*d)*DT;s.a1+=s.v1*DT;s.a2+=s.v2*DT;}if(!isFinite(s.a1+s.a2+s.v1+s.v2)){s.a1=Math.PI*0.9;s.a2=Math.PI*0.9;s.v1=s.v2=0;s.tr.length=0;}s.calm=(Math.abs(s.v1)+Math.abs(s.v2)<0.03)?s.calm+1:0;if(s.calm>90){s.a1=Math.PI*(0.6+Math.random()*0.7);s.a2=Math.PI*(0.6+Math.random()*0.7);s.v1=s.v2=0;s.calm=0;}const ox=w/2,oy=h*0.42,x1=ox+l1*Math.sin(s.a1),y1=oy+l1*Math.cos(s.a1),x2=x1+l2*Math.sin(s.a2),y2=y1+l2*Math.cos(s.a2);s.tr.push([x2,y2]);if(s.tr.length>150)s.tr.shift();ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);ctx.lineWidth=1.6;for(let i=1;i<s.tr.length;i++){const a=i/s.tr.length;ctx.strokeStyle='hsla('+((i*2+t*30)%360)+',85%,65%,'+(a*0.7).toFixed(2)+')';ctx.beginPath();ctx.moveTo(s.tr[i-1][0],s.tr[i-1][1]);ctx.lineTo(s.tr[i][0],s.tr[i][1]);ctx.stroke();}ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ox,oy);ctx.lineTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();ctx.fillStyle='#9fe0ff';ctx.beginPath();ctx.arc(x1,y1,5,0,7);ctx.fill();ctx.beginPath();ctx.arc(x2,y2,5,0,7);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(ox,oy,3,0,7);ctx.fill(); },
};
