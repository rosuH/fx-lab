// dist/fx-lab.iife.js — bundled IIFE for browser globals
// ponytail: inlined tree; window.FXLab = { mount, stopAll, REGISTRY, IDS, listEffects }
(function() {
  'use strict';
  // src/effects/shader/gradient.js
  const _mod_0 = {
    meta: {
      "id": "gradient",
      "kind": "shader",
      "name": "Gradient Flow",
      "nameLocal": null,
      "section": "generative",
      "summary": "Silky domain-warped color field in deep blue, purple and teal; slow hypnotic drift.",
      "description": "Layered FBM domain-warp generates a continuously morphing gradient across the frame. Mouse position subtly shifts the warp anchor, making the color field breathe toward the cursor. Ideal as a calm animated background behind text or UI.",
      "descriptionZh": "域扭曲 FBM · 跟随光标",
      "tags": ["noise", "flow", "plasma", "glow", "webgl2", "background"],
      "vibe": ["calm", "ambient", "meditative"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float t=iTime*0.09;
        vec2 q=vec2(fbm(uv*3.0+t),fbm(uv*3.0+vec2(5.2,1.3)-t));
        vec2 r=vec2(fbm(uv*3.0+4.0*q+vec2(1.7,9.2)+m*1.2),fbm(uv*3.0+4.0*q+vec2(8.3,2.8)));
        float f=fbm(uv*3.0+4.0*r);
        vec3 col=mix(vec3(0.04,0.05,0.13),vec3(0.28,0.5,0.96),clamp(f*f*2.2,0.0,1.0));
        col=mix(col,vec3(0.86,0.34,0.72),clamp(length(r)*0.55,0.0,1.0));
        col=mix(col,vec3(0.10,0.82,0.62),clamp(q.x*0.5,0.0,1.0)); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/dots.js
  const _mod_1 = {
    meta: {
      "id": "dots",
      "kind": "shader",
      "name": "Dot-Matrix Wave",
      "nameLocal": null,
      "section": "generative",
      "summary": "Blue-teal dot grid pulses in rolling waves; cursor pushes dots outward in a satisfying bulge.",
      "description": "A 24×24 grid of round dots ripples with a traveling sine wave keyed to each cell's distance from the origin. Moving the cursor creates a localized bulge that expands nearby dots. Works as a subtle animated overlay or panel background.",
      "descriptionZh": "点阵波动 + 光标隆起",
      "tags": ["dots", "grid", "waves", "noise", "webgl2", "background"],
      "vibe": ["calm", "playful", "geometric"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y;
        float N=24.0; vec2 g=uv*N; vec2 id=floor(g); vec2 cell=fract(g)-0.5;
        float dM=length(uv-m); float wave=0.5+0.5*sin(length(id)*0.5-iTime*2.0); float bulge=smoothstep(0.55,0.0,dM)*0.95;
        float rad=0.10+0.26*wave+bulge; float d=length(cell); float c=smoothstep(rad,rad-0.09,d);
        vec3 base=mix(vec3(0.10,0.55,0.96),vec3(0.2,0.96,0.78),wave); o=vec4(base*c,1.0); }`,
  };

  // src/effects/shader/metaballs.js
  const _mod_2 = {
    meta: {
      "id": "metaballs",
      "kind": "shader",
      "name": "Metaballs",
      "nameLocal": null,
      "section": "generative",
      "summary": "Five glowing purple-magenta blobs orbit and merge organically; cursor draws in a sixth.",
      "description": "Five metaballs travel sine-path orbits and merge via a smooth potential-field threshold. The cursor injects a sixth ball, pulling the fluid mass toward the pointer. Good for psychedelic loading states or dark hero backgrounds.",
      "descriptionZh": "有机融合光球",
      "tags": ["metaballs", "plasma", "glow", "fluid", "webgl2", "background"],
      "vibe": ["hypnotic", "psychedelic", "organic"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y; float t=iTime; float v=0.0;
        for(int i=0;i<5;i++){ float fi=float(i); vec2 c=0.55*vec2(sin(t*0.6+fi*1.7),cos(t*0.5+fi*2.3)); v+=0.055/(length(uv-c)+0.001); }
        v+=0.085/(length(uv-m)+0.001); float s=smoothstep(1.0,1.7,v);
        vec3 col=mix(vec3(0.03,0.02,0.07),mix(vec3(0.5,0.1,0.92),vec3(0.96,0.26,0.6),s),s); col+=s*vec3(0.18,0.05,0.32); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/aurora.js
  const _mod_3 = {
    meta: {
      "id": "aurora",
      "kind": "shader",
      "name": "Aurora Ribbons",
      "nameLocal": null,
      "section": "generative",
      "summary": "Shimmering green-and-purple aurora curtains stream down a starry night sky; serene fullscreen background.",
      "description": "Three fbm-driven aurora curtains with vertical rays sway over a faint starfield, fading into a horizon glow and cycling through green-to-purple hues on a near-black sky. The cursor's vertical position nudges the curtains. Slow and meditative; ideal as a dark-mode hero background.",
      "descriptionZh": "极光丝带",
      "tags": ["aurora", "waves", "glow", "noise", "webgl2", "background"],
      "vibe": ["calm", "meditative", "ambient"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float t=iTime*0.12;
        vec3 col=vec3(0.015,0.02,0.05)+vec3(0.0,0.02,0.05)*uv.y;
        float sp=hash(floor(gl_FragCoord.xy*0.5)); col+=smoothstep(0.992,1.0,sp)*smoothstep(0.25,1.0,uv.y)*vec3(0.7,0.8,1.0);
        for(int i=0;i<3;i++){ float fi=float(i);
          float base=0.45+0.13*fi+0.10*sin(uv.x*2.0+t*1.3+fi)+(fbm(vec2(uv.x*1.5+fi*4.0,t))-0.5)*0.30+(m.y-0.5)*0.2;
          float d=uv.y-base; float curtain=exp(-d*d*9.0);
          float rays=fbm(vec2(uv.x*22.0+fi*13.0,uv.y*3.0-t*3.0)); curtain*=0.35+0.9*rays*rays; curtain*=smoothstep(0.0,0.3,uv.y);
          vec3 c=mix(vec3(0.15,0.95,0.55),vec3(0.55,0.20,0.95),0.5+0.5*sin(t+fi*2.0+uv.x*2.5)); col+=curtain*c*1.3; }
        col+=vec3(0.04,0.10,0.07)*smoothstep(0.35,0.0,uv.y);
        col=col/(col+0.6); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/ripple.js
  const _mod_4 = {
    meta: {
      "id": "ripple",
      "kind": "shader",
      "name": "Ripple Grid",
      "nameLocal": null,
      "section": "generative",
      "summary": "Teal grid lines bend under expanding ripple rings that emanate from the cursor.",
      "description": "An 18×18 cell grid is distorted by a sine ripple that decays exponentially away from the mouse pointer. Far cells remain crisp while near cells warp dramatically. Use as an interactive background for demos or landing pages.",
      "descriptionZh": "光标涟漪位移",
      "tags": ["ripple", "grid", "waves", "noise", "webgl2", "background"],
      "vibe": ["hypnotic", "technical", "geometric"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 uv=gl_FragCoord.xy/iResolution.xy; vec2 m=iMouse.xy/iResolution.xy; float asp=iResolution.x/iResolution.y;
        float d=length((uv-m)*vec2(asp,1.0)); float ripple=sin(d*34.0-iTime*4.0)*exp(-d*5.0)*0.045; vec2 duv=uv+normalize(uv-m+vec2(0.0001))*ripple;
        vec2 gr=abs(fract(duv*18.0)-0.5); float line=smoothstep(0.44,0.5,max(gr.x,gr.y));
        vec3 col=mix(vec3(0.04,0.05,0.08),vec3(0.3,0.82,0.92),line); col+=exp(-d*6.0)*vec3(0.1,0.32,0.42); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/voronoi.js
  const _mod_5 = {
    meta: {
      "id": "voronoi",
      "kind": "shader",
      "name": "Voronoi Cells",
      "nameLocal": null,
      "section": "generative",
      "summary": "Animated colour-cell mosaic with drifting seeds in jewel tones; organic and hypnotic.",
      "description": "A Voronoi partition whose seed points travel sine-path orbits, making cells grow and shrink continuously. Each cell's colour is derived from its hashed seed. Fits as a bold geometric background or section divider.",
      "descriptionZh": "细胞晶格 · 自然分形",
      "tags": ["voronoi", "cellular", "geometry", "noise", "webgl2", "background"],
      "vibe": ["hypnotic", "organic", "geometric"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
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
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y*3.0+vec2(iTime*0.1); vec2 g=floor(uv),f=fract(uv); float md=8.0; vec2 mid=vec2(0.0);
        for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){ vec2 ofs=vec2(float(i),float(j)); vec2 r=vec2(hash(g+ofs),hash(g+ofs+3.1)); vec2 p=ofs+0.5+0.45*sin(iTime+6.2831*r); float d=length(f-p); if(d<md){md=d;mid=g+ofs;} }
        vec3 col=0.5+0.5*cos(6.2831*(hash(mid)+vec3(0.0,0.33,0.67))); col*=0.55+0.45*smoothstep(0.0,0.5,md); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/truchet.js
  const _mod_6 = {
    meta: {
      "id": "truchet",
      "kind": "shader",
      "name": "Truchet Tiles",
      "nameLocal": null,
      "section": "generative",
      "summary": "Scrolling arc-tile maze in dark teal; endlessly generative, calm, low-contrast texture.",
      "description": "Each tile is randomly assigned one of two Truchet arc orientations, producing a connected maze-like pattern. The pattern scrolls horizontally over time. A calm, low-contrast texture for backgrounds or overlays.",
      "descriptionZh": "程序化迷宫纹",
      "tags": ["tiling", "geometry", "lines", "webgl2", "background"],
      "vibe": ["calm", "geometric", "meditative"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
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
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=gl_FragCoord.xy/res.y*6.0; uv.x+=iTime*0.12; vec2 id=floor(uv); vec2 f=fract(uv)-0.5;
        if(hash(id)>0.5) f.x=-f.x; float d=abs(length(f-0.5)-0.5); d=min(d,abs(length(f+0.5)-0.5)); float line=smoothstep(0.09,0.04,d);
        vec3 col=mix(vec3(0.04,0.06,0.09),vec3(0.3,0.85,0.9),line); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/kaleido.js
  const _mod_7 = {
    meta: {
      "id": "kaleido",
      "kind": "shader",
      "name": "Kaleidoscope",
      "nameLocal": null,
      "section": "generative",
      "summary": "8-fold FBM kaleidoscope blooms with shifting hues; cursor tilts the mandala in real time.",
      "description": "UV coordinates are folded into 8 symmetric segments before sampling layered FBM noise. Colour cycles slowly over time; mouse position shifts the noise anchor for live pattern control. Lush and hypnotic as a fullscreen hero or overlay.",
      "descriptionZh": "万花筒 · 曼陀罗",
      "tags": ["kaleidoscope", "mandala", "fractal", "noise", "webgl2", "background"],
      "vibe": ["hypnotic", "psychedelic"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "hover"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y; float a=atan(uv.y,uv.x); float r=length(uv);
        float seg=6.2831/8.0; a=mod(a,seg); a=abs(a-seg*0.5); vec2 ku=vec2(cos(a),sin(a))*r+iTime*0.1; float n=fbm(ku*3.0+m);
        vec3 col=0.5+0.5*cos(6.2831*(n+vec3(0.0,0.3,0.6)+iTime*0.05)); col*=smoothstep(1.2,0.1,r); o=vec4(col,1.0); }`,
  };

  // src/effects/shader/raymarch.js
  const _mod_8 = {
    meta: {
      "id": "raymarch",
      "kind": "shader",
      "name": "Raymarch SDF",
      "nameLocal": null,
      "section": "generative",
      "summary": "Glowing torus spins in deep space via 48-step SDF raymarching; blue-to-magenta Fresnel rim.",
      "description": "A torus SDF is raymarched with dual-axis rotation driven by time. Fresnel shading produces a cool blue core transitioning to magenta at glancing angles on a near-black void. Best as a centerpiece or 3D-flavoured hero element.",
      "descriptionZh": "光线步进 · 旋转环面",
      "tags": ["geometry", "orbit", "glow", "rings", "webgl2", "background"],
      "vibe": ["hypnotic", "futuristic", "technical"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
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
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec3 ro=vec3(0.0,0.0,-3.0); vec3 rd=normalize(vec3(uv,1.5)); float t=iTime*0.6;
        float dO=0.0; float d=0.0; for(int i=0;i<48;i++){ vec3 p=ro+rd*dO; p.xz=mat2(cos(t),-sin(t),sin(t),cos(t))*p.xz; p.xy=mat2(cos(t*0.7),-sin(t*0.7),sin(t*0.7),cos(t*0.7))*p.xy; vec2 q=vec2(length(p.xz)-1.0,p.y); d=length(q)-0.35; if(d<0.001||dO>8.0)break; dO+=d; }
        vec3 col=vec3(0.03,0.03,0.06); if(d<0.01){ vec3 p=ro+rd*dO; float fres=pow(1.0-abs(dot(rd,normalize(p))),2.0); col=mix(vec3(0.2,0.5,0.95),vec3(0.95,0.3,0.6),fres)+fres*0.5; } o=vec4(col,1.0); }`,
  };

  // src/effects/shader/vapor.js
  const _mod_9 = {
    meta: {
      "id": "vapor",
      "kind": "shader",
      "name": "Vaporwave Grid",
      "nameLocal": null,
      "section": "post-and-print",
      "summary": "Retro vaporwave: banded sunset sun over a perspective cyan neon grid scrolling to the horizon.",
      "description": "The upper half renders a purple-to-pink sky with a horizontally-banded sun; the lower half draws a perspective-projected cyan grid that scrolls forward over time. A self-contained 80s aesthetic requiring no assets.",
      "descriptionZh": "落日 + 透视霓虹网格",
      "tags": ["grid", "neon", "geometry", "lines", "webgl2", "background"],
      "vibe": ["retro", "calm", "futuristic"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
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
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=gl_FragCoord.xy/res; vec3 col; float hz=0.55;
        if(uv.y>hz){ vec3 sky=mix(vec3(0.18,0.05,0.32),vec3(0.95,0.32,0.55),(uv.y-hz)/(1.0-hz)); float sd=length((uv-vec2(0.5,0.8))*vec2(res.x/res.y,1.0)); float sun=smoothstep(0.26,0.25,sd); float bands=step(0.5,fract(uv.y*26.0)); sun*=(uv.y>0.8)?1.0:bands; col=mix(sky,vec3(1.0,0.85,0.4),sun); }
        else { vec2 p=vec2(uv.x-0.5,hz-uv.y); float gz=1.0/max(p.y,0.02); vec2 g=vec2((p.x*gz)*1.2,gz*0.6-iTime*1.5); vec2 gp=abs(fract(g)-0.5); vec2 gw=fwidth(g); vec2 li=1.0-smoothstep(vec2(0.6),vec2(2.0),gp/max(gw,vec2(1e-4))); float line=max(li.x,li.y); line*=smoothstep(0.0,0.12,p.y); col=mix(vec3(0.05,0.0,0.1),vec3(0.2,0.9,0.95),line); }
        o=vec4(col,1.0); }`,
  };

  // src/effects/shader/glitch.js
  const _mod_10 = {
    meta: {
      "id": "glitch",
      "kind": "shader",
      "name": "Chromatic Glitch",
      "nameLocal": null,
      "section": "post-and-print",
      "summary": "Horizontal RGB bands jitter and split over CRT scanlines; aggressive retro glitch.",
      "description": "Hash-based band selection randomly shifts the R and B channels horizontally, creating chromatic aberration bursts. A scanline multiply darkens every other row for a CRT feel. Use as an aggressive overlay for retro or cyberpunk themes.",
      "descriptionZh": "RGB 分离 + 扫描线",
      "tags": ["glitch", "scanlines", "noise", "neon", "webgl2", "overlay"],
      "vibe": ["aggressive", "retro", "dramatic"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "med",
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
    glsl: `void main(){ vec2 res=iResolution.xy; vec2 uv=gl_FragCoord.xy/res; float t=iTime;
        float band=step(0.85,hash(vec2(floor(uv.y*18.0),floor(t*9.0)))); float sh=(hash(vec2(floor(uv.y*18.0),floor(t*9.0)))-0.5)*0.08*band;
        float r=step(0.5,fract((uv.x+sh)*9.0+sin(uv.y*4.0+t))); float g=step(0.5,fract(uv.x*9.0+sin(uv.y*4.0+t))); float b=step(0.5,fract((uv.x-sh)*9.0+sin(uv.y*4.0+t)));
        vec3 col=vec3(r,g,b)*vec3(0.9,0.4,0.9)+vec3(0.05,0.1,0.15); col=mix(col,col.bgr,band*0.5); col*=0.65+0.35*step(0.5,fract(uv.y*140.0)); o=vec4(col,1.0); }`,
  };

  // src/effects/canvas/field.js
  const _mod_11 = {
    meta: {
      "id": "field",
      "kind": "canvas",
      "name": "Flow Field",
      "nameLocal": null,
      "section": "data-and-system",
      "summary": "Dim constellation of drifting particles draws faint connecting lines; cursor repels the swarm.",
      "description": "Maintains 60 particles drifting with gentle noise, connected by faint blue lines when close, leaving soft trails via a partial alpha fill. The cursor repels nearby particles. Ideal as an ambient background for dark-themed interfaces.",
      "descriptionZh": "粒子星座 · 光标搅动",
      "tags": ["particles", "canvas2d", "flow", "trail", "lines"],
      "vibe": ["calm", "ambient", "elegant"],
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
      "state": {"persistent": true, "notes": "Particle positions and connecting-line trails accumulate via partial alpha clear"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function field(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.p=[];for(let i=0;i<60;i++)s.p.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}
        ctx.fillStyle='rgba(12,13,16,0.32)';ctx.fillRect(0,0,w,h); const ps=s.p;
        for(const p of ps){ const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy)||1; if(mx>=0&&d<130){const f=(1-d/130)*0.8;p.vx+=dx/d*f;p.vy+=dy/d*f;} p.vx+=(Math.random()-.5)*0.06;p.vy+=(Math.random()-.5)*0.06;p.vx*=0.95;p.vy*=0.95;p.x+=p.vx;p.y+=p.vy; if(p.x<0)p.x+=w;else if(p.x>w)p.x-=w; if(p.y<0)p.y+=h;else if(p.y>h)p.y-=h; }
        ctx.lineWidth=1; for(let i=0;i<ps.length;i++)for(let j=i+1;j<ps.length;j++){const a=ps[i],b=ps[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<8100){ctx.strokeStyle='rgba(127,200,255,'+((1-Math.sqrt(d2)/90)*0.22).toFixed(3)+')';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
        ctx.fillStyle='rgba(190,225,255,0.9)'; for(const p of ps){ctx.beginPath();ctx.arc(p.x,p.y,1.5,0,7);ctx.fill();} },
  };

  // src/effects/canvas/seigaiha.js
  const _mod_12 = {
    meta: {
      "id": "seigaiha",
      "kind": "canvas",
      "name": "Seigaiha",
      "nameLocal": "青海波",
      "section": "world-patterns",
      "summary": "Serene overlapping blue-white wave fans tile the screen; calm Japanese oceanic elegance.",
      "description": "Overlapping semicircle fans in offset rows form the traditional Japanese Seigaiha wave tiling on a deep navy ground. A subtle per-column sine offset gives the grid a gentle undulating quality. Use as a serene, refined background for Japan-themed or coastal designs.",
      "descriptionZh": "和风波纹",
      "tags": ["waves", "tiling", "geometry", "canvas2d", "background"],
      "vibe": ["calm", "elegant", "cultural"],
      "culture": "Japan",
      "accuracyNote": "Procedural approximation of Japanese Seigaiha wave tiling; not a faithful reproduction of any specific historical motif.",
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
    draw: function seigaiha(ctx,w,h,t){ ctx.fillStyle='#0d1b2a';ctx.fillRect(0,0,w,h); const R=26,sx=R,sy=R*0.62,ph=t*0.4; ctx.lineWidth=2;
        for(let row=0,y=0;y<h+R;row++,y+=sy){ const off=(row%2)*sx; for(let x=-R;x<w+R;x+=sx*2){ const cx=x+off,cy=y+Math.sin(x*0.02+ph)*2;
          for(let k=4;k>=1;k--){ const rr=R*k/4; ctx.strokeStyle=(k%2)?'rgba(120,190,230,0.95)':'rgba(225,238,247,0.85)'; ctx.beginPath();ctx.arc(cx,cy,rr,Math.PI,Math.PI*2);ctx.stroke(); } } } },
  };

  // src/effects/canvas/girih.js
  const _mod_13 = {
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

  // src/effects/canvas/celtic.js
  const _mod_14 = {
    meta: {
      "id": "celtic",
      "kind": "canvas",
      "name": "Celtic Knot",
      "nameLocal": null,
      "section": "world-patterns",
      "summary": "Glowing green interlace arcs weave across a dark field with a flowing animated dash; hypnotic.",
      "description": "Pairs of quarter-circle arcs are drawn with an animated dashed stroke whose offset advances each frame, creating the illusion of light flowing through an interlaced knot grid. The alternating arc directions mimic an over-under weave. Use as a moody background for Celtic-themed or fantasy designs.",
      "descriptionZh": "交织绳结 · 流光",
      "tags": ["knot", "weave", "geometry", "canvas2d", "background"],
      "vibe": ["hypnotic", "elegant", "cultural"],
      "culture": "Celtic",
      "accuracyNote": "Procedural approximation of Celtic knotwork interlace; not a faithful reproduction of any specific historical motif.",
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
    draw: function celtic(ctx,w,h,t){ ctx.fillStyle='#0c1410';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(120,225,170,0.9)';ctx.lineWidth=3.2;ctx.lineCap='round'; ctx.setLineDash([15,9]);ctx.lineDashOffset=-t*22; const C=34;
        for(let y=0;y<h+C;y+=C)for(let x=0;x<w+C;x+=C){ const o=(((x/C)+(y/C))%2===0); ctx.beginPath(); if(o){ctx.arc(x,y,C*0.5,0,Math.PI*0.5);ctx.moveTo(x+C,y+C);ctx.arc(x+C,y+C,C*0.5,Math.PI,Math.PI*1.5);} else {ctx.arc(x+C,y,C*0.5,Math.PI*0.5,Math.PI);ctx.moveTo(x,y+C);ctx.arc(x,y+C,C*0.5,Math.PI*1.5,Math.PI*2);} ctx.stroke(); } ctx.setLineDash([]); },
  };

  // src/effects/canvas/aboriginal.js
  const _mod_15 = {
    meta: {
      "id": "aboriginal",
      "kind": "canvas",
      "name": "Dot Painting",
      "nameLocal": null,
      "section": "world-patterns",
      "summary": "Warm earth-tone concentric dot rings orbit fixed anchors on dark brown; organic and meditative.",
      "description": "Six randomly placed anchor points each emit six rings of coloured dots in ochre, sienna, cream, and red that slowly orbit in alternating directions. Positions are randomised once per mount and then persist. Inspired by the concentric dot technique of Australian Aboriginal art.",
      "descriptionZh": "同心点画 · 大地色",
      "tags": ["dots", "geometry", "canvas2d", "background"],
      "vibe": ["meditative", "organic", "cultural"],
      "culture": "Aboriginal Australian",
      "accuracyNote": "Procedural approximation of Aboriginal Australian dot painting; not a faithful reproduction of any specific historical motif.",
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
      "state": { "persistent": true, "notes": "Dot centre positions generated once on first frame via Math.random." },
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function aboriginal(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.c=[];for(let i=0;i<6;i++)s.c.push({x:Math.random()*w,y:Math.random()*h});} ctx.fillStyle='#2a1a0f';ctx.fillRect(0,0,w,h); const cols=['#e8b04b','#d9763a','#ece0cf','#b5472a','#7a3b1f'];
        for(const c of s.c){ for(let ring=0;ring<6;ring++){ const rad=7+ring*9; const n=Math.max(6,Math.floor(rad*0.7)); for(let i=0;i<n;i++){ const a=i/n*6.2831+ring*0.3+t*0.12*(ring%2?1:-1); ctx.fillStyle=cols[(ring+i)%cols.length]; ctx.beginPath();ctx.arc(c.x+Math.cos(a)*rad,c.y+Math.sin(a)*rad,2.0,0,7);ctx.fill(); } } } },
  };

  // src/effects/canvas/inkwash.js
  const _mod_16 = {
    meta: {
      "id": "inkwash",
      "kind": "canvas",
      "name": "Ink Wash",
      "nameLocal": "水墨",
      "section": "world-patterns",
      "summary": "Soft ink blobs drift on cream paper; hover to drop a brushstroke wash at the cursor.",
      "description": "Five radial-gradient ink blobs drift in slow Lissajous paths across a warm cream background, building a gently stained ink-wash field. Moving the cursor adds a darker ink mark at the pointer, simulating a brush touching paper. Use for meditative overlays or East Asian-themed interfaces.",
      "descriptionZh": "晕染笔触 · 跟手",
      "tags": ["ink", "canvas2d", "background", "overlay"],
      "vibe": ["calm", "meditative", "cultural", "minimal"],
      "culture": "China",
      "accuracyNote": "Procedural approximation of Chinese ink wash painting; not a faithful reproduction of any specific historical motif.",
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
      "state": { "persistent": true, "notes": "Ink blob positions generated once on first frame via Math.random." },
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function inkwash(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.b=[];for(let i=0;i<5;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,r:24+Math.random()*40,p:Math.random()*6});} ctx.fillStyle='#f3efe6';ctx.fillRect(0,0,w,h);
        for(const b of s.b){ const cx=b.x+Math.sin(t*0.2+b.p)*22,cy=b.y+Math.cos(t*0.17+b.p)*16; const g=ctx.createRadialGradient(cx,cy,0,cx,cy,b.r); g.addColorStop(0,'rgba(18,18,22,0.5)');g.addColorStop(0.6,'rgba(28,28,34,0.2)');g.addColorStop(1,'rgba(40,40,46,0)'); ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,b.r,0,7);ctx.fill(); }
        if(mx>=0){ const g=ctx.createRadialGradient(mx,my,0,mx,my,42);g.addColorStop(0,'rgba(8,8,12,0.55)');g.addColorStop(1,'rgba(8,8,12,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(mx,my,42,0,7);ctx.fill(); } },
  };

  // src/effects/canvas/opart.js
  const _mod_17 = {
    meta: {
      "id": "opart",
      "kind": "canvas",
      "name": "Op-Art Moiré",
      "nameLocal": null,
      "section": "design-movements",
      "summary": "Black-and-white concentric rings create a dizzying moiré illusion; cursor shifts the offset.",
      "description": "Draws two sets of concentric rings composited with `difference` mode to produce a moiré interference pattern. The second ring set tracks the cursor or auto-animates. Striking as a bold background or portfolio statement.",
      "descriptionZh": "莫尔条纹 · 错视",
      "tags": ["moire", "canvas2d", "optical", "rings", "geometry"],
      "vibe": ["hypnotic", "geometric"],
      "culture": "Op-Art / optical illusion",
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function opart(ctx,w,h,t,mx,my){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.6)*w*0.22, cy=my>=0?my:h*0.5+Math.cos(t*0.5)*h*0.22; const R=Math.hypot(w,h);
        ctx.lineWidth=7;ctx.strokeStyle='#0a0a0a'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(w*0.5,h*0.5,r,0,7);ctx.stroke();}
        ctx.globalCompositeOperation='difference';ctx.strokeStyle='#fff'; for(let r=4;r<R;r+=14){ctx.beginPath();ctx.arc(cx,cy,r,0,7);ctx.stroke();} ctx.globalCompositeOperation='source-over'; },
  };

  // src/effects/canvas/bauhaus.js
  const _mod_18 = {
    meta: {
      "id": "bauhaus",
      "kind": "canvas",
      "name": "Bauhaus",
      "nameLocal": null,
      "section": "design-movements",
      "summary": "Bold Bauhaus shapes — blue circle, red arc, yellow triangle — slow-turn in primary colours.",
      "description": "Draws a Bauhaus-inspired geometric composition: a blue circle, a slowly rotating red half-disc, and a yellow triangle on a warm grey field, anchored by two horizontal black bars. Minimal and rhythmic — works well as a design-movement background or splash screen.",
      "descriptionZh": "三原色几何构成",
      "tags": ["geometry", "canvas2d", "curves", "lines"],
      "vibe": ["elegant", "geometric", "minimal"],
      "culture": "Bauhaus / design movement",
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
    draw: function bauhaus(ctx,w,h,t){ ctx.fillStyle='#e8e2d4';ctx.fillRect(0,0,w,h); const a=t*0.3,M=Math.min(w,h);
        ctx.fillStyle='#2b4a9b';ctx.beginPath();ctx.arc(w*0.32,h*0.4,M*0.26,0,7);ctx.fill();
        ctx.save();ctx.translate(w*0.7,h*0.62);ctx.rotate(a);ctx.fillStyle='#d23b2a';ctx.beginPath();ctx.arc(0,0,M*0.2,0,Math.PI);ctx.fill();ctx.restore();
        ctx.fillStyle='#e8b53a';ctx.beginPath();ctx.moveTo(w*0.55,h*0.08);ctx.lineTo(w*0.82,h*0.08);ctx.lineTo(w*0.55,h*0.42);ctx.closePath();ctx.fill();
        ctx.fillStyle='#1a1a1a';ctx.fillRect(w*0.1,h*0.76,w*0.8,6);ctx.fillRect(w*0.12,h*0.86,w*0.46,6); },
  };

  // src/effects/canvas/memphis.js
  const _mod_19 = {
    meta: {
      "id": "memphis",
      "kind": "canvas",
      "name": "Memphis 80s",
      "nameLocal": null,
      "section": "design-movements",
      "summary": "Neon Memphis shapes drift and spin on dark; vibrant 80s pop-design energy.",
      "description": "Scatters 16 coloured shapes — filled circles, triangles, outline circles, and crosses — across a dark field, each bobbing and rotating to its own phase. Palette echoes 80s Memphis design. Works as a vibrant background or decorative overlay.",
      "descriptionZh": "撞色碎片 · 波普",
      "tags": ["geometry", "canvas2d", "particles", "lines"],
      "vibe": ["playful", "energetic", "retro"],
      "culture": "Memphis / pop design",
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
    draw: function memphis(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.sh=[];for(let i=0;i<16;i++)s.sh.push({x:Math.random()*w,y:Math.random()*h,k:i%4,c:i%5,r:8+Math.random()*15,p:Math.random()*6});} ctx.fillStyle='#0f1020';ctx.fillRect(0,0,w,h); const cols=['#ff5a8a','#34d1c4','#ffd23f','#7b6cf6','#ff8f3f'];
        for(const o of s.sh){ const y=o.y+Math.sin(t*0.6+o.p)*6; ctx.fillStyle=cols[o.c];ctx.strokeStyle=cols[o.c];ctx.lineWidth=3; ctx.save();ctx.translate(o.x,y);ctx.rotate(t*0.2+o.p);
          if(o.k===0){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.fill();} else if(o.k===1){ctx.beginPath();ctx.moveTo(-o.r,o.r);ctx.lineTo(0,-o.r);ctx.lineTo(o.r,o.r);ctx.closePath();ctx.fill();} else if(o.k===2){ctx.beginPath();ctx.arc(0,0,o.r,0,7);ctx.stroke();} else {ctx.beginPath();ctx.moveTo(-o.r,0);ctx.lineTo(o.r,0);ctx.moveTo(0,-o.r);ctx.lineTo(0,o.r);ctx.stroke();} ctx.restore(); } },
  };

  // src/effects/canvas/matrix.js
  const _mod_20 = {
    meta: {
      "id": "matrix",
      "kind": "canvas",
      "name": "Matrix Rain",
      "nameLocal": null,
      "section": "data-and-system",
      "summary": "Green Katakana glyphs cascade in columns on black; iconic hacker-terminal rain effect.",
      "description": "Renders falling Katakana characters with a partial alpha fill that leaves persistent green trails, recreating the classic Matrix rain aesthetic. Each column resets at a random interval. An unmistakable retro-cyber background.",
      "descriptionZh": "片假名数字雨",
      "tags": ["ascii", "canvas2d", "rain", "trail", "neon"],
      "vibe": ["retro", "dramatic", "technical"],
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
      "deterministic": false,
      "state": {"persistent": true, "notes": "Column y-positions and character trails accumulate via partial alpha clear"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function matrix(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.cols=Math.floor(w/12);s.y=[];for(let i=0;i<s.cols;i++)s.y[i]=Math.random()*h;} ctx.fillStyle='rgba(2,8,4,0.16)';ctx.fillRect(0,0,w,h); ctx.font='13px monospace';
        for(let i=0;i<s.cols;i++){ const x=i*12; ctx.fillStyle='rgba(190,255,205,0.95)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]); ctx.fillStyle='rgba(60,220,120,0.4)';ctx.fillText(String.fromCharCode(0x30A0+Math.floor(Math.random()*92)),x,s.y[i]-15); s.y[i]+=8; if(s.y[i]>h&&Math.random()>0.975)s.y[i]=0; } },
  };

  // src/effects/canvas/scope.js
  const _mod_21 = {
    meta: {
      "id": "scope",
      "kind": "canvas",
      "name": "Oscilloscope",
      "nameLocal": null,
      "section": "data-and-system",
      "summary": "Phosphor-green oscilloscope waveform glows on a dim CRT grid; calm technical atmosphere.",
      "description": "Simulates a CRT oscilloscope: a faint green grid overlays a dark background, and a compound glowing sine wave sweeps across the full display each frame. Use for data-vis dashboards, retro instrument UI, or lofi ambient backgrounds.",
      "descriptionZh": "示波器波形 · 荧光",
      "tags": ["oscilloscope", "canvas2d", "waves", "glow", "grid"],
      "vibe": ["calm", "technical", "retro"],
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
    draw: function scope(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h); ctx.strokeStyle='rgba(40,120,70,0.3)';ctx.lineWidth=1; for(let x=0;x<w;x+=w/8){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();} for(let y=0;y<h;y+=h/6){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
        ctx.strokeStyle='#7CFFB0';ctx.lineWidth=2;ctx.shadowBlur=8;ctx.shadowColor='#7CFFB0';ctx.beginPath(); for(let x=0;x<=w;x+=2){const u=x/w;const y=h/2+Math.sin(u*12+t*3)*h*0.18*Math.sin(t*0.7)+Math.sin(u*30+t*5)*h*0.07;x?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke();ctx.shadowBlur=0; },
  };

  // src/effects/canvas/starfield.js
  const _mod_22 = {
    meta: {
      "id": "starfield",
      "kind": "canvas",
      "name": "Starfield Warp",
      "nameLocal": null,
      "section": "data-and-system",
      "summary": "Stars streak inward at warp speed from a deep-space vanishing point; hypnotic forward pull.",
      "description": "Projects 150 stars from a central origin outward, drawing each as a streak from its previous to current position. Stars brighten and widen as they near the viewport edge, leaving soft warp trails via a partial alpha fill. Perfect for sci-fi hero sections or loading screens.",
      "descriptionZh": "星空跃迁",
      "tags": ["starfield", "canvas2d", "stars", "trail", "tunnel"],
      "vibe": ["futuristic", "hypnotic", "energetic"],
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
      "deterministic": false,
      "state": {"persistent": true, "notes": "Star positions and warp-streak trails accumulate via partial alpha clear"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function starfield(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.st=[];for(let i=0;i<150;i++)s.st.push({x:(Math.random()-.5)*w,y:(Math.random()-.5)*h,z:Math.random()*w});} ctx.fillStyle='rgba(4,5,12,0.4)';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2;
        for(const p of s.st){ p.z-=4; if(p.z<1){p.z=w;p.x=(Math.random()-.5)*w;p.y=(Math.random()-.5)*h;} const k=128/p.z,k2=128/(p.z+5); const x=cx+p.x*k,y=cy+p.y*k,px=cx+p.x*k2,py=cy+p.y*k2; const b=Math.min(1,(1-p.z/w)*1.6); ctx.strokeStyle='rgba('+(180+b*60|0)+','+(200+b*40|0)+',255,'+b.toFixed(2)+')';ctx.lineWidth=b*1.6;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x,y);ctx.stroke(); } },
  };

  // src/effects/canvas/halftone.js
  const _mod_23 = {
    meta: {
      "id": "halftone",
      "kind": "canvas",
      "name": "Halftone CMYK",
      "nameLocal": null,
      "section": "post-and-print",
      "summary": "Warm CMYK halftone dots bloom from cursor position; editorial print-design feel.",
      "description": "Renders three overlapping dot screens — cyan, magenta, yellow — using multiply blending. Dot radius swells toward the cursor or a slow auto-animated hotspot. Ideal as a decorative background or poster overlay.",
      "descriptionZh": "网点半调 · 套色",
      "tags": ["halftone", "dots", "canvas2d", "geometry"],
      "vibe": ["elegant", "retro"],
      "culture": "print / design",
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function halftone(ctx,w,h,t,mx,my){ ctx.fillStyle='#f4f1ea';ctx.fillRect(0,0,w,h); const cx=mx>=0?mx:w*0.5+Math.sin(t*0.5)*w*0.25, cy=my>=0?my:h*0.5+Math.cos(t*0.4)*h*0.25; const screens=[['rgba(0,170,235,0.8)',2,1],['rgba(236,0,140,0.72)',6,4],['rgba(255,210,0,0.78)',4,7]]; const S=10,maxd=Math.hypot(w,h)*0.62;
        ctx.globalCompositeOperation='multiply'; for(const sc of screens){ ctx.fillStyle=sc[0]; for(let y=sc[2];y<h;y+=S)for(let x=sc[1];x<w;x+=S){ const v=Math.max(0,1-Math.hypot(x-cx,y-cy)/maxd); const rad=v*S*0.62; if(rad>0.3){ctx.beginPath();ctx.arc(x,y,rad,0,7);ctx.fill();} } } ctx.globalCompositeOperation='source-over'; },
  };

  // src/effects/canvas/ascii.js
  const _mod_24 = {
    meta: {
      "id": "ascii",
      "kind": "canvas",
      "name": "ASCII Field",
      "nameLocal": null,
      "section": "post-and-print",
      "summary": "Blue-purple ASCII characters pulse in sine-wave brightness waves; retro terminal glow.",
      "description": "Maps compound sine-wave luminance to an ASCII brightness ramp drawn on a dark background. Colour shifts from dim blue to bright violet with intensity. Use as an ambient animated background for dark-themed or terminal-aesthetic UIs.",
      "descriptionZh": "字符明度场",
      "tags": ["ascii", "canvas2d", "waves", "neon"],
      "vibe": ["retro", "energetic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function ascii(ctx,w,h,t){ ctx.fillStyle='#0a0b0d';ctx.fillRect(0,0,w,h); const ramp=' .:-=+*#%@';ctx.font='12px monospace';ctx.textBaseline='top'; const S=11;
        for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const u=x/w,v=y/h; const n=0.5+0.5*Math.sin(u*8+t)*Math.cos(v*8-t*0.7)+0.3*Math.sin((u+v)*12+t*1.4); const b=Math.max(0,Math.min(1,n)); ctx.fillStyle='rgba(120,'+(180+b*60|0)+',255,'+(0.3+b*0.7).toFixed(2)+')'; ctx.fillText(ramp[Math.floor(b*(ramp.length-1))],x,y); } },
  };

  // src/effects/canvas/topo.js
  const _mod_25 = {
    meta: {
      "id": "topo",
      "kind": "canvas",
      "name": "Topographic",
      "nameLocal": null,
      "section": "data-and-system",
      "summary": "Animated teal contour lines map slowly shifting noise terrain; cursor warps the topology.",
      "description": "Uses value noise to generate a scrolling height field and draws teal isolines wherever the field crosses fixed level thresholds. The cursor horizontally warps the noise domain in real time. Best as a calm ambient background for data or nature-themed UIs.",
      "descriptionZh": "等高线地形 · 跟手",
      "tags": ["terrain", "canvas2d", "noise", "flow", "lines"],
      "vibe": ["calm", "ambient", "organic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function topo(ctx,w,h,t,mx,my){ ctx.fillStyle='#0b1a18';ctx.fillRect(0,0,w,h); const warp=mx>=0?(mx/w-0.5):Math.sin(t*0.2)*0.3; const S=5;
        for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ const vv=this.vnoise(x*0.012+warp,y*0.012+t*0.05); const band=Math.abs((vv*10)%1-0.5); if(band<0.05){const c=80+vv*120|0;ctx.fillStyle='rgba('+c+',220,180,0.85)';ctx.fillRect(x,y,S,S);} else {ctx.fillStyle='rgba(20,60,55,'+(0.08+vv*0.12).toFixed(2)+')';ctx.fillRect(x,y,S,S);} } },
  };

  // src/effects/canvas/quasicrystal.js
  const _mod_26 = {
    meta: {
      "id": "quasicrystal",
      "kind": "canvas",
      "name": "Quasicrystal",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Shimmering five-fold crystal interference; blue-purple moiré tiles slowly pulse and breathe.",
      "description": "Sums five cosine waves at pentagonal angles per pixel to generate a quasicrystal interference pattern. The combined phase shifts over time, producing a pulsing blue-purple-gold moiré field. CPU-heavy; best as a small inline tile or low-resolution background.",
      "descriptionZh": "五重对称干涉",
      "tags": ["moire", "optical", "geometry", "noise", "canvas2d", "background"],
      "vibe": ["hypnotic", "psychedelic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function quasicrystal(ctx,w,h,t){ const S=3; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){ let v=0; for(let i=0;i<5;i++){const a=i*Math.PI/5; v+=Math.cos((x*Math.cos(a)+y*Math.sin(a))*0.07+t);} const c=Math.sin(v)*0.5+0.5; ctx.fillStyle='rgb('+(c*255|0)+','+(c*150|0)+','+((1-c)*255|0)+')'; ctx.fillRect(x,y,S,S);} },
  };

  // src/effects/canvas/phyllotaxis.js
  const _mod_27 = {
    meta: {
      "id": "phyllotaxis",
      "kind": "canvas",
      "name": "Phyllotaxis",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Sunflower spiral of rainbow glowing dots; golden-angle phyllotaxis slowly rotating outward.",
      "description": "Places 420 dots using the golden angle (~137.5°) to recreate the seed-packing geometry found in sunflowers and pine cones. Each dot's hue advances with time, making the spiral bloom through rainbow color. Lightweight and meditative; suits dark backgrounds or inline ornaments.",
      "descriptionZh": "向日葵螺旋 · 黄金角",
      "tags": ["dots", "spiral", "geometry", "particles", "canvas2d", "background"],
      "vibe": ["calm", "meditative", "organic"],
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
    draw: function phyllotaxis(ctx,w,h,t){ ctx.fillStyle='#0a0b12';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,g=2.399963; for(let i=0;i<420;i++){const r=Math.sqrt(i)*5.4,a=i*g+t*0.2; ctx.fillStyle='hsl('+((i*0.8+t*20)%360)+',70%,60%)'; ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2.2,0,7);ctx.fill();} },
  };

  // src/effects/canvas/rose.js
  const _mod_28 = {
    meta: {
      "id": "rose",
      "kind": "canvas",
      "name": "Rose Curve",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Soft pink rose curve cycling through 3-to-8-petal forms on a dark field; elegant math bloom.",
      "description": "Traces the polar rose equation r = cos(k·θ), stepping k through integer values over time to produce 3-, 4-, 5-, 6-, 7-, and 8-petal flowers. Each petal count redraws cleanly with a single pink stroke. A minimal, elegant mathematical curve suited to dark inline or background use.",
      "descriptionZh": "玫瑰线 · 玫瑰花形",
      "tags": ["curves", "geometry", "spiral", "rings", "canvas2d", "inline"],
      "vibe": ["elegant", "minimal", "calm"],
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
    draw: function rose(ctx,w,h,t){ ctx.fillStyle='#0b0a12';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,R=Math.min(w,h)*0.42,k=Math.floor(t*0.2)%6+3; ctx.strokeStyle='#ff7ab0';ctx.lineWidth=1.5;ctx.beginPath(); for(let a=0;a<6.30;a+=0.01){const r=R*Math.cos(k*a);a?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);} ctx.stroke(); },
  };

  // src/effects/canvas/spiro.js
  const _mod_29 = {
    meta: {
      "id": "spiro",
      "kind": "canvas",
      "name": "Spirograph",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Electric-blue spirograph tracing a hypotrochoid; intricate lace-like winding slowly rotates.",
      "description": "Animates a hypotrochoid — the path of a point on a smaller gear rolling inside a larger gear — producing an interlocking lace-like loop. The inner gear rotates continuously over time, shifting the winding. Crisp blue stroke on dark navy; works as a centered inline ornament or calm background.",
      "descriptionZh": "万花尺 · 内旋轮线",
      "tags": ["curves", "spiral", "geometry", "rings", "canvas2d", "inline"],
      "vibe": ["elegant", "hypnotic", "geometric"],
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
    draw: function spiro(ctx,w,h,t){ ctx.fillStyle='#08101a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,R=Math.min(w,h)*0.34,r=R*0.55,d=R*0.72; ctx.strokeStyle='#6fd0ff';ctx.lineWidth=1;ctx.beginPath(); for(let a=0;a<37.7;a+=0.03){const x=cx+(R-r)*Math.cos(a)+d*Math.cos((R-r)/r*a+t),y=cy+(R-r)*Math.sin(a)-d*Math.sin((R-r)/r*a+t);a?ctx.lineTo(x,y):ctx.moveTo(x,y);} ctx.stroke(); },
  };

  // src/effects/canvas/lissajous.js
  const _mod_30 = {
    meta: {
      "id": "lissajous",
      "kind": "canvas",
      "name": "Lissajous",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Glowing green Lissajous figure cycling through phase; oscilloscope curve on dark background.",
      "description": "Draws a 3:4 Lissajous figure with a slowly advancing phase offset, making the loop knot and unknot continuously. A soft shadow glow reinforces the oscilloscope aesthetic. Lightweight and hypnotic; ideal for technical dashboards or dark overlay accents.",
      "descriptionZh": "李萨如图形",
      "tags": ["curves", "oscilloscope", "geometry", "lines", "canvas2d", "background"],
      "vibe": ["hypnotic", "technical", "minimal"],
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
    draw: function lissajous(ctx,w,h,t){ ctx.fillStyle='#0a0e0a';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,A=w*0.4,B=h*0.4; ctx.strokeStyle='#9CFF6A';ctx.lineWidth=1.5;ctx.shadowBlur=6;ctx.shadowColor='#9CFF6A';ctx.beginPath(); for(let i=0;i<=600;i++){const u=i/600*6.2831;i?ctx.lineTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B):ctx.moveTo(cx+Math.sin(u*3+t)*A,cy+Math.sin(u*4)*B);} ctx.stroke();ctx.shadowBlur=0; },
  };

  // src/effects/canvas/superformula.js
  const _mod_31 = {
    meta: {
      "id": "superformula",
      "kind": "canvas",
      "name": "Superformula",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Purple superformula outline morphing through stars, flowers, and polygons; organic math shapes.",
      "description": "Implements Johan Gielis's superformula — a single polar equation that generates stars, flowers, polygons, and organic blobs by varying one symmetry parameter. The parameter m steps over time, cycling through 14 distinct silhouettes. Elegant on dark backgrounds as a centered inline motif.",
      "descriptionZh": "超公式 · 万象有机形",
      "tags": ["curves", "geometry", "rings", "spiral", "canvas2d", "inline"],
      "vibe": ["elegant", "hypnotic", "organic"],
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
    draw: function superformula(ctx,w,h,t){ ctx.fillStyle='#0c0a14';ctx.fillRect(0,0,w,h); const cx=w/2,cy=h/2,S=Math.min(w,h)*0.36,m=Math.floor(2+t*0.3)%14; const sf=(a)=>Math.pow(Math.pow(Math.abs(Math.cos(m*a/4)),7)+Math.pow(Math.abs(Math.sin(m*a/4)),7),-1/7); ctx.strokeStyle='#c79bff';ctx.lineWidth=2;ctx.beginPath(); for(let a=0;a<6.2831;a+=0.01){const r=sf(a)*S;a?ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r):ctx.moveTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);} ctx.closePath();ctx.stroke(); },
  };

  // src/effects/canvas/hexgrid.js
  const _mod_32 = {
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

  // src/effects/canvas/concentric.js
  const _mod_33 = {
    meta: {
      "id": "concentric",
      "kind": "canvas",
      "name": "Concentric",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Rainbow concentric squares scrolling outward from center; bold, cycling hue tunnel effect.",
      "description": "Draws 26 nested squares whose sizes and hues advance with time, creating a continuous outward-scroll tunnel of color. The rapid hue cycling produces a vivid, psychedelic depth effect. Use as a bold background or retro-style overlay.",
      "descriptionZh": "同心方 · 色相轮转",
      "tags": ["geometry", "rings", "optical", "grid", "canvas2d", "background"],
      "vibe": ["psychedelic", "energetic", "hypnotic"],
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
    draw: function concentric(ctx,w,h,t){ ctx.fillStyle='#120a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,M=Math.max(w,h); for(let i=0;i<26;i++){const s=(i*14+t*20)%M; ctx.strokeStyle='hsl('+((i*12+t*30)%360)+',65%,58%)';ctx.lineWidth=4;ctx.strokeRect(cx-s/2,cy-s/2,s,s);} },
  };

  // src/effects/canvas/spiralarc.js
  const _mod_34 = {
    meta: {
      "id": "spiralarc",
      "kind": "canvas",
      "name": "Spiral",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Clean white Archimedean spiral slowly rotating on pure black; minimal and meditative.",
      "description": "Traces an Archimedean spiral (radius proportional to angle) and rotates it continuously over time. Pure monochrome — white stroke on black. Minimal and timeless; suits centered inline use or as a backdrop for text overlays.",
      "descriptionZh": "阿基米德螺线",
      "tags": ["spiral", "curves", "geometry", "lines", "canvas2d", "background"],
      "vibe": ["minimal", "meditative", "calm"],
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
    draw: function spiralarc(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2; ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath(); for(let a=0;a<44;a+=0.1){const r=a*2.2;a?ctx.lineTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r):ctx.moveTo(cx+Math.cos(a+t)*r,cy+Math.sin(a+t)*r);} ctx.stroke(); },
  };

  // src/effects/canvas/interference.js
  const _mod_35 = {
    meta: {
      "id": "interference",
      "kind": "canvas",
      "name": "Interference",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Blue interference fringes from two point-sources pulsing across canvas; hypnotic wave moiré.",
      "description": "Simulates two-source wave interference by summing sinusoidal wavefronts per pixel. One source oscillates laterally over time, continuously shifting the fringe pattern. CPU-heavy pixel raster; best at a fixed small tile or reduced canvas resolution.",
      "descriptionZh": "双源波纹干涉",
      "tags": ["moire", "waves", "optical", "noise", "canvas2d", "background"],
      "vibe": ["hypnotic", "technical", "psychedelic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function interference(ctx,w,h,t){ const S=4,s1x=w*0.35,s1y=h*0.5,s2x=w*0.65+Math.sin(t)*20,s2y=h*0.5; for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const v=Math.sin(Math.hypot(x-s1x,y-s1y)*0.2-t*3)+Math.sin(Math.hypot(x-s2x,y-s2y)*0.2-t*3),c=(v*0.25+0.5)*255|0; ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+c+')';ctx.fillRect(x,y,S,S);} },
  };

  // src/effects/canvas/chevron.js
  const _mod_36 = {
    meta: {
      "id": "chevron",
      "kind": "canvas",
      "name": "Chevron",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Scrolling multicolor chevron stripes; vivid zigzag rows stream in retro palette.",
      "description": "Draws alternating V-shaped chevron rows in four vivid colors — coral, yellow, teal, and violet — that scroll horizontally over time. The repeating zigzag creates an energetic, retro-textile feel. Ideal as a lively background or banner pattern.",
      "descriptionZh": "人字折线 · 流动",
      "tags": ["chevron", "stripes", "geometry", "lines", "canvas2d", "background"],
      "vibe": ["energetic", "playful", "retro"],
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
    draw: function chevron(ctx,w,h,t){ const cols=['#ff6b5a','#ffd23f','#34d1c4','#7b6cf6'],S=26,off=(t*20)%(S*2); for(let r=0,y=-S;y<h+S;r++,y+=S/2+0)for(let x=-S*2;x<w+S;x+=S*2){ctx.strokeStyle=cols[r%4];ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(x+off,y+S/2);ctx.lineTo(x+S+off,y);ctx.lineTo(x+2*S+off,y+S/2);ctx.stroke();} },
  };

  // src/effects/canvas/herringbone.js
  const _mod_37 = {
    meta: {
      "id": "herringbone",
      "kind": "canvas",
      "name": "Herringbone",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Warm gold herringbone tile weave on dark brown; a rich static textile pattern.",
      "description": "Renders interlocking diagonal rectangular tiles in the classic herringbone arrangement — gold on dark brown. The geometry is fully static with no animation. A warm, tactile textile backdrop suited to cozy or editorial layouts.",
      "descriptionZh": "鱼骨拼贴",
      "tags": ["geometry", "tiling", "weave", "stripes", "canvas2d", "background"],
      "vibe": ["elegant", "cozy", "retro"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "low",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": false,
        "trigger": "none"
      },
      "reducedMotion": "freeze",
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function herringbone(ctx,w,h,t){ ctx.fillStyle='#16140f';ctx.fillRect(0,0,w,h);const L=22,W=8; ctx.fillStyle='#c9a86a'; for(let y=-L,r=0;y<h+L;y+=W*2,r++)for(let x=-L;x<w+L;x+=L){ctx.save();ctx.translate(x+(r%2)*L/2,y);ctx.rotate(((Math.floor(x/L)+r)%2?1:-1)*Math.PI/4);ctx.fillRect(0,0,L,W);ctx.restore();} },
  };

  // src/effects/canvas/polka.js
  const _mod_38 = {
    meta: {
      "id": "polka",
      "kind": "canvas",
      "name": "Polka Dots",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "White polka dots gently breathing on vivid hot-pink; cheerful and playful pop-art pattern.",
      "description": "Fills a hot-pink canvas with a staggered grid of white circles whose radii pulse with a slow sine wave. The breathing rhythm gives a light, bouncy energy. Great as a retro or pop-art background.",
      "descriptionZh": "波点 · 呼吸",
      "tags": ["dots", "geometry", "grid", "canvas2d", "background"],
      "vibe": ["playful", "energetic", "retro"],
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
    draw: function polka(ctx,w,h,t){ ctx.fillStyle='#e8366b';ctx.fillRect(0,0,w,h);ctx.fillStyle='#fff';const S=28; for(let row=0,y=0;y<h+S;row++,y+=S)for(let x=0;x<w+S;x+=S){const r=6+2*Math.sin(t*2+x*0.05+y*0.05);ctx.beginPath();ctx.arc(x+(row%2)*S/2,y,r,0,7);ctx.fill();} },
  };

  // src/effects/canvas/houndstooth.js
  const _mod_39 = {
    meta: {
      "id": "houndstooth",
      "kind": "canvas",
      "name": "Houndstooth",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Classic black-and-white houndstooth check slowly scrolling; crisp tailoring pattern.",
      "description": "Tiles the traditional houndstooth check in pure black and white, with the pattern scrolling diagonally over time. Each tile uses the characteristic interlocking angular comma-shapes. Sharp and graphic; suits fashion-forward or editorial backgrounds.",
      "descriptionZh": "千鸟格",
      "tags": ["geometry", "tiling", "stripes", "grid", "canvas2d", "background"],
      "vibe": ["elegant", "retro", "minimal"],
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
    draw: function houndstooth(ctx,w,h,t){ ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.fillStyle='#111';const S=20,off=(t*10)%S; for(let y=-S;y<h+S;y+=S)for(let x=-S;x<w+S;x+=S){const px=x+off;ctx.fillRect(px,y,S/2,S/2);ctx.beginPath();ctx.moveTo(px+S/2,y);ctx.lineTo(px+S,y);ctx.lineTo(px+S/2,y+S/2);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(px,y+S/2);ctx.lineTo(px+S/2,y+S);ctx.lineTo(px,y+S);ctx.closePath();ctx.fill();} },
  };

  // src/effects/canvas/plaid.js
  const _mod_40 = {
    meta: {
      "id": "plaid",
      "kind": "canvas",
      "name": "Tartan Plaid",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Scrolling tartan plaid in forest green, red, and cream; classic Scottish textile in motion.",
      "description": "Lays overlapping horizontal and vertical translucent color bands on a dark green ground, mimicking tartan weave structure. The bands scroll diagonally over time. A warm, culturally evocative backdrop for heritage, seasonal, or cozy themes.",
      "descriptionZh": "苏格兰格纹",
      "tags": ["stripes", "geometry", "tiling", "grid", "canvas2d", "background"],
      "vibe": ["cozy", "retro", "elegant"],
      "culture": "Scotland",
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
    draw: function plaid(ctx,w,h,t){ ctx.fillStyle='#13362a';ctx.fillRect(0,0,w,h);const bands=[['rgba(220,60,50,0.55)',0,14],['rgba(240,225,185,0.45)',18,4],['rgba(40,40,70,0.5)',30,10]],o=(t*8)%40; for(let p=-40;p<w;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(p+b[1]+o,0,b[2],h);} for(let p=-40;p<h;p+=40)for(const b of bands){ctx.fillStyle=b[0];ctx.fillRect(0,p+b[1]+o,w,b[2]);} },
  };

  // src/effects/canvas/starburst.js
  const _mod_41 = {
    meta: {
      "id": "starburst",
      "kind": "canvas",
      "name": "Starburst",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Yellow and pink radiating wedges slowly spinning; bold retro sunburst from canvas center.",
      "description": "Divides the canvas into 40 alternating yellow and pink triangular sectors radiating from the center, forming a classic starburst motif. The whole pattern rotates slowly over time. Bold and festive; works as a hero background or vintage-style overlay.",
      "descriptionZh": "放射扇面",
      "tags": ["geometry", "spiral", "rings", "lines", "canvas2d", "background"],
      "vibe": ["energetic", "playful", "retro"],
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
    draw: function starburst(ctx,w,h,t){ ctx.fillStyle='#0a0a14';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,N=40,D=Math.hypot(w,h); for(let i=0;i<N;i++){const a=i/N*6.2831+t*0.1;ctx.fillStyle=i%2?'#ffd23f':'#ff5a8a';ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*D,cy+Math.sin(a)*D);ctx.lineTo(cx+Math.cos(a+6.2831/N)*D,cy+Math.sin(a+6.2831/N)*D);ctx.closePath();ctx.fill();} },
  };

  // src/effects/canvas/wavelines.js
  const _mod_42 = {
    meta: {
      "id": "wavelines",
      "kind": "canvas",
      "name": "Wave Lines",
      "nameLocal": null,
      "section": "geometry-and-curves",
      "summary": "Stacked rainbow sine waves undulating on dark blue-black; hypnotic layered ribbon flow.",
      "description": "Draws 20 overlapping sine waves across the canvas, each with a different phase, frequency offset, and hue cycling through blue-to-rainbow range. Amplitudes oscillate slowly, creating a rippling layered ribbon effect. Ideal as a calm ambient background.",
      "descriptionZh": "叠层正弦波带",
      "tags": ["waves", "lines", "geometry", "flow", "canvas2d", "background"],
      "vibe": ["calm", "ambient", "hypnotic"],
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
    draw: function wavelines(ctx,w,h,t){ ctx.fillStyle='#070a14';ctx.fillRect(0,0,w,h);ctx.lineWidth=1.6; for(let i=0;i<20;i++){ctx.strokeStyle='hsl('+((200+i*6)%360)+',80%,60%)';ctx.beginPath();for(let x=0;x<=w;x+=4){const y=h*0.5+Math.sin(x*0.02+t+i*0.4)*(20+i*3)*Math.sin(t*0.5+i);x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();} },
  };

  // src/effects/canvas/mandelbrot.js
  const _mod_43 = {
    meta: {
      "id": "mandelbrot",
      "kind": "canvas",
      "name": "Mandelbrot",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Hypnotic zoom into the Mandelbrot set; cycling hues trace infinite fractal complexity.",
      "description": "Renders the Mandelbrot set pixel-by-pixel in 2×2 blocks, slowly zooming into a detail region near the boundary at (-0.745, 0.115). Escape-time coloring cycles the full hue spectrum as time advances. Use as a meditative or psychedelic fullscreen background.",
      "descriptionZh": "曼德博集合 · 缩放",
      "tags": ["fractal", "geometry", "curves", "pixel"],
      "vibe": ["hypnotic", "psychedelic", "meditative"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function mandelbrot(ctx,w,h,t){ const S=2,zoom=1.7+Math.sin(t*0.1)*0.6,cx=-0.745,cy=0.115; for(let py=0;py<h;py+=S)for(let px=0;px<w;px+=S){const x0=(px/w-0.5)*zoom+cx,y0=(py/h-0.5)*zoom*(h/w)+cy;let x=0,y=0,i=0;for(;i<42&&x*x+y*y<4;i++){const xt=x*x-y*y+x0;y=2*x*y+y0;x=xt;}const c=i===42?0:i/42;ctx.fillStyle='hsl('+((c*300+t*20)%360)+','+(c>0?70:0)+'%,'+(c*55|0)+'%)';ctx.fillRect(px,py,S,S);} },
  };

  // src/effects/canvas/julia.js
  const _mod_44 = {
    meta: {
      "id": "julia",
      "kind": "canvas",
      "name": "Julia Set",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Julia set blooms through parameter space; vivid fractal shapes drift and morph in cyan-blue.",
      "description": "Iterates the Julia set on every pixel with a slowly rotating complex parameter c = 0.7885·(cos t, sin t). Escape-time coloring in cyan-to-blue hues produces intricate fractal boundaries that morph continuously. Use as a hypnotic animated background.",
      "descriptionZh": "朱利亚集 · 漂移",
      "tags": ["fractal", "geometry", "curves", "pixel"],
      "vibe": ["hypnotic", "psychedelic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function julia(ctx,w,h,t){ const S=2,jx=0.7885*Math.cos(t*0.3),jy=0.7885*Math.sin(t*0.3),zoom=3; for(let py=0;py<h;py+=S)for(let px=0;px<w;px+=S){let x=(px/w-0.5)*zoom*(w/h),y=(py/h-0.5)*zoom,i=0;for(;i<48&&x*x+y*y<4;i++){const xt=x*x-y*y+jx;y=2*x*y+jy;x=xt;}const c=i/48;ctx.fillStyle='hsl('+((200+c*200)%360)+',80%,'+(c*60|0)+'%)';ctx.fillRect(px,py,S,S);} },
  };

  // src/effects/canvas/clifford.js
  const _mod_45 = {
    meta: {
      "id": "clifford",
      "kind": "canvas",
      "name": "Clifford Attractor",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Electric-blue dust swirls into alien strange-attractor shapes; meditative accumulator on dark.",
      "description": "Plots 2200 Clifford attractor points per frame in cyan-blue over a near-black background that fades rather than clears, letting the attractor's loop-and-wing topology build up gradually. Parameter a oscillates slowly over time. Use for atmospheric tech or ambient backgrounds.",
      "descriptionZh": "奇异吸引子",
      "tags": ["attractor", "geometry", "curves", "particles"],
      "vibe": ["hypnotic", "ambient", "technical"],
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
      "deterministic": true,
      "state": {"persistent": true, "notes": "Accumulates 2200 dots per frame; canvas only partially erased each frame (alpha fade, not full clear)."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function clifford(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0.1;s.y=0.1;ctx.fillStyle='#06070c';ctx.fillRect(0,0,w,h);}else{ctx.fillStyle='rgba(6,7,12,0.05)';ctx.fillRect(0,0,w,h);} const a=-1.4+Math.sin(t*0.1)*0.3,b=1.6,c=1.0,d=0.7;ctx.fillStyle='rgba(130,210,255,0.5)';for(let i=0;i<2200;i++){const nx=Math.sin(a*s.y)+c*Math.cos(a*s.x),ny=Math.sin(b*s.x)+d*Math.cos(b*s.y);s.x=nx;s.y=ny;ctx.fillRect(w/2+nx*w*0.22,h/2+ny*h*0.22,1,1);} },
  };

  // src/effects/canvas/dejong.js
  const _mod_46 = {
    meta: {
      "id": "dejong",
      "kind": "canvas",
      "name": "De Jong",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Pink dust drifts into strange alien loops; a De Jong attractor slowly builds on dark violet.",
      "description": "Plots 2200 De Jong attractor points per frame in pink-magenta over a near-black background that fades rather than clears, letting the folded-wing shape accumulate over time. Parameter a oscillates slowly. Best as an ambient or sci-fi background.",
      "descriptionZh": "德容吸引子",
      "tags": ["attractor", "geometry", "curves", "particles"],
      "vibe": ["hypnotic", "ambient", "technical"],
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
      "deterministic": true,
      "state": {"persistent": true, "notes": "Accumulates 2200 dots per frame; canvas only partially erased each frame (alpha fade, not full clear)."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function dejong(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0;s.y=0;ctx.fillStyle='#0a060c';ctx.fillRect(0,0,w,h);}else{ctx.fillStyle='rgba(10,6,12,0.05)';ctx.fillRect(0,0,w,h);} const a=1.4+Math.sin(t*0.07),b=-2.3,c=2.4,d=-2.1;ctx.fillStyle='rgba(255,150,200,0.5)';for(let i=0;i<2200;i++){const nx=Math.sin(a*s.y)-Math.cos(b*s.x),ny=Math.sin(c*s.x)-Math.cos(d*s.y);s.x=nx;s.y=ny;ctx.fillRect(w/2+nx*w*0.2,h/2+ny*h*0.2,1,1);} },
  };

  // src/effects/canvas/lorenz.js
  const _mod_47 = {
    meta: {
      "id": "lorenz",
      "kind": "canvas",
      "name": "Lorenz",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Electric-blue butterfly trace of the Lorenz attractor; calm chaotic orbit on dark navy.",
      "description": "Numerically integrates the Lorenz system (σ=10, ρ=28, β=8/3) and draws a trailing 900-point path projected onto the XZ plane, redrawn each frame over a cleared background. The butterfly attractor slowly unfurls. Ideal as a calm scientific or ambient overlay.",
      "descriptionZh": "洛伦兹蝴蝶",
      "tags": ["attractor", "curves", "geometry", "trail"],
      "vibe": ["calm", "ambient", "technical", "hypnotic"],
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
      "state": {"persistent": true, "notes": "Accumulates up to 900 XZ path points across frames."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function lorenz(ctx,w,h,t,mx,my,s){ if(!s.init){s.init=1;s.x=0.1;s.y=0;s.z=0;s.pts=[];} for(let i=0;i<8;i++){const dx=10*(s.y-s.x),dy=s.x*(28-s.z)-s.y,dz=s.x*s.y-8/3*s.z;s.x+=dx*0.008;s.y+=dy*0.008;s.z+=dz*0.008;s.pts.push([s.x,s.z]);} if(s.pts.length>900)s.pts.splice(0,s.pts.length-900); ctx.fillStyle='#05060a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#7fd0ff';ctx.lineWidth=1;ctx.globalAlpha=0.7;ctx.beginPath();for(let i=0;i<s.pts.length;i++){const p=s.pts[i],x=w/2+p[0]*w*0.018,y=h*0.92-p[1]*h*0.026;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.globalAlpha=1; },
  };

  // src/effects/canvas/fern.js
  const _mod_48 = {
    meta: {
      "id": "fern",
      "kind": "canvas",
      "name": "Barnsley Fern",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Bright green Barnsley fern materializes from chaos; organic fractal nature on dark green.",
      "description": "Applies the Barnsley iterated function system to scatter 7000 random points each frame, painting a photorealistic fern silhouette in bright green on near-black. Uses Math.random() so each rendered frame is unique. Best as a decorative or meditative panel.",
      "descriptionZh": "分形蕨",
      "tags": ["fractal", "particles", "geometry", "noise"],
      "vibe": ["calm", "organic", "meditative"],
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function fern(ctx,w,h,t){ ctx.fillStyle='#060c06';ctx.fillRect(0,0,w,h);ctx.fillStyle='rgba(120,230,120,0.7)';let x=0,y=0;for(let i=0;i<7000;i++){const r=Math.random();let nx,ny;if(r<0.01){nx=0;ny=0.16*y;}else if(r<0.86){nx=0.85*x+0.04*y;ny=-0.04*x+0.85*y+1.6;}else if(r<0.93){nx=0.2*x-0.26*y;ny=0.23*x+0.22*y+1.6;}else{nx=-0.15*x+0.28*y;ny=0.26*x+0.24*y+0.44;}x=nx;y=ny;ctx.fillRect(w/2+x*w*0.085,h-y*h*0.095,1,1);} },
  };

  // src/effects/canvas/sierpinski.js
  const _mod_49 = {
    meta: {
      "id": "sierpinski",
      "kind": "canvas",
      "name": "Sierpinski",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Warm amber Sierpinski triangle emerges from the chaos game; minimal fractal on dark.",
      "description": "Uses the chaos game algorithm — repeatedly jumping halfway to a random vertex — to paint 7000 points per frame as a Sierpinski triangle in warm amber. Math.random() means each frame is a unique instance. Clean and minimal for decorative use.",
      "descriptionZh": "谢尔宾斯基三角",
      "tags": ["fractal", "geometry", "particles", "dots"],
      "vibe": ["minimal", "geometric", "hypnotic"],
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function sierpinski(ctx,w,h,t){ ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,w,h);const V=[[w/2,8],[8,h-8],[w-8,h-8]];let x=w/2,y=h/2;ctx.fillStyle='rgba(255,210,120,0.7)';for(let i=0;i<7000;i++){const v=V[Math.floor(Math.random()*3)];x=(x+v[0])/2;y=(y+v[1])/2;if(i>10)ctx.fillRect(x,y,1,1);} },
  };

  // src/effects/canvas/dragon.js
  const _mod_50 = {
    meta: {
      "id": "dragon",
      "kind": "canvas",
      "name": "Dragon Curve",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Purple dragon-curve fractal slowly rotates; clean self-similar line on dark violet.",
      "description": "Precomputes an 11-generation dragon curve sequence and renders it as a connected line that slowly rotates over time. The self-similar L-system fold produces a space-filling dragon shape in lavender-purple. Low CPU; ideal as a subtle decorative background.",
      "descriptionZh": "龙形曲线",
      "tags": ["fractal", "curves", "geometry", "lines"],
      "vibe": ["minimal", "geometric", "hypnotic"],
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
    draw: function dragon(ctx,w,h,t,mx,my,s){ if(!s.seq){let seq=[1];for(let g=0;g<11;g++){const rev=seq.slice().reverse().map(v=>v?0:1);seq=seq.concat([1],rev);}s.seq=seq;} ctx.fillStyle='#0b0a14';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#a98bff';ctx.lineWidth=1;let x=w*0.62,y=h*0.42,dir=Math.PI+t*0.05;ctx.beginPath();ctx.moveTo(x,y);for(const turn of s.seq){dir+=turn?1.5708:-1.5708;x+=Math.cos(dir)*3.2;y+=Math.sin(dir)*3.2;ctx.lineTo(x,y);}ctx.stroke(); },
  };

  // src/effects/canvas/fractaltree.js
  const _mod_51 = {
    meta: {
      "id": "fractaltree",
      "kind": "canvas",
      "name": "Fractal Tree",
      "nameLocal": null,
      "section": "fractal-and-chaos",
      "summary": "Wind-blown fractal tree sways gently; organic green branches on dark, calm and alive.",
      "description": "Recursively draws a branching tree up to 9 levels deep, with branch angle oscillating to a slow sine wave simulating wind. Colors shift from dark olive at the trunk to bright lime at the tips. Elegant and organic for calm or ambient backgrounds.",
      "descriptionZh": "分形树 · 风动",
      "tags": ["fractal", "curves", "geometry", "lines"],
      "vibe": ["calm", "organic", "ambient"],
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
    draw: function fractaltree(ctx,w,h,t){ ctx.fillStyle='#0a0c0a';ctx.fillRect(0,0,w,h);const ang=0.35+Math.sin(t*0.6)*0.25;const br=(x,y,len,a,d)=>{if(d>9||len<2)return;const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;ctx.strokeStyle='hsl('+(110+d*8)+','+(50+d*4)+'%,'+(30+d*5)+'%)';ctx.lineWidth=10-d;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x2,y2);ctx.stroke();br(x2,y2,len*0.74,a-ang,d+1);br(x2,y2,len*0.74,a+ang,d+1);};br(w/2,h-6,h*0.22,-1.5708,0); },
  };

  // src/effects/canvas/life.js
  const _mod_52 = {
    meta: {
      "id": "life",
      "kind": "canvas",
      "name": "Game of Life",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "Glowing green cells flicker on a dark grid; Conway's Game of Life evolves hypnotic patterns.",
      "description": "Conway's Game of Life rendered on an 8-pixel cell grid, randomly seeded on each resize. Cells are born or killed by neighbour count, producing gliders, oscillators, and stable clusters over time. Use as a meditative background or retro terminal overlay.",
      "descriptionZh": "康威生命游戏",
      "tags": ["cellular", "grid", "dots", "geometry", "canvas2d", "background"],
      "vibe": ["hypnotic", "technical", "geometric"],
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
      "state": {"persistent": true, "notes": "Uint8Array cell grid accumulates across frames; never cleared between generation steps."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    // ponytail: Conway naturally dies to a few still-lifes; for an ambient tile we keep it alive with
    // per-gen "cosmic ray" sparks + a fresh soup blob whenever population collapses below ~6%.
    draw: function life(ctx,w,h,t,mx,my,s){ const C=8,gw=Math.ceil(w/C),gh=Math.ceil(h/C),N=gw*gh;if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(N);for(let i=0;i<N;i++)s.g[i]=Math.random()<0.3?1:0;s.acc=0;}s.acc++;if(s.acc%4===0){const n=new Uint8Array(N);let alive=0;for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){let c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){c+=s.g[((y+dy+gh)%gh)*gw+(x+dx+gw)%gw];}const a=s.g[y*gw+x],v=(a&&(c===2||c===3))||(!a&&c===3)?1:0;n[y*gw+x]=v;alive+=v;}for(let k=0;k<3;k++)n[(Math.random()*N)|0]=1;if(alive<N*0.06){const bx=(Math.random()*gw)|0,by=(Math.random()*gh)|0;for(let dy=0;dy<8;dy++)for(let dx=0;dx<8;dx++)if(Math.random()<0.5)n[((by+dy)%gh)*gw+(bx+dx)%gw]=1;}s.g=n;}ctx.fillStyle='#070b07';ctx.fillRect(0,0,w,h);ctx.fillStyle='#6bf08a';for(let y=0;y<gh;y++)for(let x=0;x<gw;x++)if(s.g[y*gw+x])ctx.fillRect(x*C,y*C,C-1,C-1); },
  };

  // src/effects/canvas/briansbrain.js
  const _mod_53 = {
    meta: {
      "id": "briansbrain",
      "kind": "canvas",
      "name": "Brian's Brain",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "White sparks and blue trailing echoes pulse across a dark grid; three-state cellular automaton.",
      "description": "Brian's Brain three-state automaton: cells fire bright white, decay to blue, then rest before firing again. The interplay produces rolling spark-waves that perpetually travel the grid without stabilizing. Good for energetic sci-fi overlays.",
      "descriptionZh": "三态元胞",
      "tags": ["cellular", "grid", "dots", "particles", "neon", "canvas2d", "background"],
      "vibe": ["hypnotic", "technical", "energetic"],
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
      "state": {"persistent": true, "notes": "Uint8Array three-state cell grid accumulates across frames; never cleared between generation steps."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    // ponytail: Brian's Brain often burns out to a near-empty grid; reseed a random soup blob whenever
    // the firing population collapses below ~2% so the tile keeps churning.
    draw: function briansbrain(ctx,w,h,t,mx,my,s){ const C=7,gw=Math.ceil(w/C),gh=Math.ceil(h/C),N=gw*gh;if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(N);for(let i=0;i<N;i++)s.g[i]=Math.random()<0.25?1:0;s.acc=0;}s.acc++;if(s.acc%4===0){const n=new Uint8Array(N);let firing=0;for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const i=y*gw+x;if(s.g[i]===1)n[i]=2;else if(s.g[i]===2)n[i]=0;else{let c=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(dx||dy){if(s.g[((y+dy+gh)%gh)*gw+(x+dx+gw)%gw]===1)c++;}n[i]=c===2?1:0;}if(n[i]===1)firing++;}if(firing<N*0.02){const bx=(Math.random()*gw)|0,by=(Math.random()*gh)|0;for(let dy=0;dy<10;dy++)for(let dx=0;dx<10;dx++)if(Math.random()<0.4)n[((by+dy)%gh)*gw+(bx+dx)%gw]=1;}s.g=n;}ctx.fillStyle='#04060c';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.g[y*gw+x];if(v){ctx.fillStyle=v===1?'#fff':'#3a6cff';ctx.fillRect(x*C,y*C,C-1,C-1);}} },
  };

  // src/effects/canvas/langton.js
  const _mod_54 = {
    meta: {
      "id": "langton",
      "kind": "canvas",
      "name": "Langton's Ant",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "A lone ant traces deterministic yellow highways on a black grid, growing complex structure from nothing.",
      "description": "Langton's Ant: a single deterministic agent turns left on white cells and right on black, flipping each visited cell. After roughly 10,000 steps it breaks out of apparent chaos into a periodic diagonal highway. Canvas accumulates incrementally — no full clear each frame.",
      "descriptionZh": "兰顿蚂蚁",
      "tags": ["cellular", "grid", "geometry", "attractor", "canvas2d", "background"],
      "vibe": ["hypnotic", "technical", "geometric"],
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
      "deterministic": true,
      "state": {"persistent": true, "notes": "Uint8Array cell grid and ant position accumulate; canvas is only partially redrawn each frame (no full clear)."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function langton(ctx,w,h,t,mx,my,s){ const C=5,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(gw*gh);s.ax=gw>>1;s.ay=gh>>1;s.dir=0;ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);}for(let k=0;k<40;k++){const i=s.ay*gw+s.ax;if(s.g[i]){s.dir=(s.dir+3)%4;s.g[i]=0;}else{s.dir=(s.dir+1)%4;s.g[i]=1;}ctx.fillStyle=s.g[i]?'#ffcf5a':'#0a0a0a';ctx.fillRect(s.ax*C,s.ay*C,C,C);s.ax=(s.ax+[0,1,0,-1][s.dir]+gw)%gw;s.ay=(s.ay+[-1,0,1,0][s.dir]+gh)%gh;}ctx.fillStyle='#ff4a6a';ctx.fillRect(s.ax*C,s.ay*C,C,C); },
  };

  // src/effects/canvas/boids.js
  const _mod_55 = {
    meta: {
      "id": "boids",
      "kind": "canvas",
      "name": "Boids Flocking",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "60 pale-blue flecks flock and steer toward the cursor; fluid organic swarm with motion trails.",
      "description": "Sixty triangle-shaped boids apply separation, alignment, and cohesion rules to flock naturally across the canvas. When the cursor hovers, boids are gently attracted to its position, reshaping the flock in real time. Canvas uses a 30%-opacity fade each frame rather than a full clear, leaving soft motion trails.",
      "descriptionZh": "鸟群 · 跟手",
      "tags": ["flocking", "particles", "flow", "trail", "canvas2d", "background", "overlay"],
      "vibe": ["hypnotic", "organic", "ambient"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "low",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "auto"
      },
      "reducedMotion": "freeze",
      "deterministic": false,
      "state": {"persistent": true, "notes": "Canvas not fully cleared each frame; motion trail fades at 30% opacity overlay per tick."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function boids(ctx,w,h,t,mx,my,s){ if(!s.b){s.b=[];for(let i=0;i<60;i++)s.b.push({x:Math.random()*w,y:Math.random()*h,vx:Math.random()-.5,vy:Math.random()-.5});}ctx.fillStyle='rgba(8,10,16,0.3)';ctx.fillRect(0,0,w,h);for(const b of s.b){let ax=0,ay=0,cx=0,cy=0,sx=0,sy=0,n=0;for(const o of s.b){const dx=o.x-b.x,dy=o.y-b.y,d=Math.hypot(dx,dy);if(o!==b&&d<40){ax+=o.vx;ay+=o.vy;cx+=o.x;cy+=o.y;if(d<18){sx-=dx;sy-=dy;}n++;}}if(n){b.vx+=(ax/n-b.vx)*0.05+(cx/n-b.x)*0.0008+sx*0.004;b.vy+=(ay/n-b.vy)*0.05+(cy/n-b.y)*0.0008+sy*0.004;}if(mx>=0){b.vx+=(mx-b.x)*0.001;b.vy+=(my-b.y)*0.001;}const sp=Math.hypot(b.vx,b.vy)||1;b.vx=b.vx/sp*1.6;b.vy=b.vy/sp*1.6;b.x=(b.x+b.vx+w)%w;b.y=(b.y+b.vy+h)%h;const a=Math.atan2(b.vy,b.vx);ctx.fillStyle='#9fe0ff';ctx.beginPath();ctx.moveTo(b.x+Math.cos(a)*5,b.y+Math.sin(a)*5);ctx.lineTo(b.x+Math.cos(a+2.5)*4,b.y+Math.sin(a+2.5)*4);ctx.lineTo(b.x+Math.cos(a-2.5)*4,b.y+Math.sin(a-2.5)*4);ctx.closePath();ctx.fill();} },
  };

  // src/effects/canvas/doomfire.js
  const _mod_56 = {
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

  // src/effects/canvas/sandfall.js
  const _mod_57 = {
    meta: {
      "id": "sandfall",
      "kind": "canvas",
      "name": "Falling Sand",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "Colorful sand grains pour from the cursor and settle into dunes; playful particle physics.",
      "description": "Colored sand grains spawn at the cursor position (or screen center) each frame and fall under cellular gravity, piling and avalanching into natural dunes. Five distinct particle colors accumulate in a persistent grid each session. Use for playful or generative-art backgrounds.",
      "descriptionZh": "落沙模拟 · 跟手",
      "tags": ["particles", "cellular", "grid", "dots", "canvas2d", "background"],
      "vibe": ["playful", "organic", "ambient"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "low",
        "cpu": "high",
        "mobileSafe": false
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "auto"
      },
      "reducedMotion": "freeze",
      "deterministic": false,
      "state": {"persistent": true, "notes": "Uint8Array particle grid accumulates settled grains each frame; dunes grow until canvas is full."},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function sandfall(ctx,w,h,t,mx,my,s){ const C=4,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.g||s.gw!==gw){s.gw=gw;s.gh=gh;s.g=new Uint8Array(gw*gh);}const sx=mx>=0?Math.floor(mx/C):gw>>1;for(let k=-1;k<=1;k++){const xx=sx+k;if(xx>=0&&xx<gw)s.g[xx]=1+Math.floor(Math.random()*5);}for(let y=gh-2;y>=0;y--)for(let x=0;x<gw;x++){const i=y*gw+x;if(s.g[i]){if(!s.g[(y+1)*gw+x])s.g[(y+1)*gw+x]=s.g[i],s.g[i]=0;else{const dir=Math.random()<0.5?-1:1,bx=x+dir;if(bx>=0&&bx<gw&&!s.g[(y+1)*gw+bx]){s.g[(y+1)*gw+bx]=s.g[i];s.g[i]=0;}}}}ctx.fillStyle='#0a0a0c';ctx.fillRect(0,0,w,h);const cols=['','#ff6b5a','#ffd23f','#34d1c4','#7b6cf6','#ff8f3f'];for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.g[y*gw+x];if(v){ctx.fillStyle=cols[v];ctx.fillRect(x*C,y*C,C,C);}} },
  };

  // src/effects/canvas/pendulum.js
  const _mod_58 = {
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

  // src/effects/canvas/orbits.js
  const _mod_59 = {
    meta: {
      "id": "orbits",
      "kind": "canvas",
      "name": "Orbits",
      "nameLocal": null,
      "section": "cellular-and-physics",
      "summary": "Four colored planets orbit a golden sun on deep space; calm, minimal cosmic loop.",
      "description": "Four planets with distinct colors and angular speeds orbit a central yellow star, with faint circular orbital rings drawn each frame. Positions are computed analytically from elapsed time — fully deterministic and zero-accumulation. A calm, minimal background for space or science themes.",
      "descriptionZh": "行星轨道",
      "tags": ["orbit", "rings", "stars", "dots", "geometry", "canvas2d", "background"],
      "vibe": ["calm", "ambient", "meditative"],
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
    draw: function orbits(ctx,w,h,t){ ctx.fillStyle='#05060e';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2;ctx.fillStyle='#ffd23f';ctx.beginPath();ctx.arc(cx,cy,8,0,7);ctx.fill();const pl=[[28,1.2,'#7fd0ff',3],[50,0.8,'#ff8f6a',5],[74,0.5,'#9fe0a0',4],[98,0.34,'#c79bff',6]];for(const p of pl){const a=t*p[1];ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.beginPath();ctx.arc(cx,cy,p[0],0,7);ctx.stroke();ctx.fillStyle=p[2];ctx.beginPath();ctx.arc(cx+Math.cos(a)*p[0],cy+Math.sin(a)*p[0],p[3],0,7);ctx.fill();} },
  };

  // src/effects/canvas/asanoha.js
  const _mod_60 = {
    meta: {
      "id": "asanoha",
      "kind": "canvas",
      "name": "Asanoha",
      "nameLocal": "麻の葉",
      "section": "world-patterns-ii",
      "summary": "Crisp blue-white hemp-leaf hexagonal lattice on indigo; serene Japanese textile geometry.",
      "description": "Triangle pairs radiate from each node of a hexagonal grid to form the traditional Japanese Asanoha (hemp-leaf) tiling in soft blue on dark indigo. The pattern is fully static — the same tessellation is drawn every frame. Use as a refined textile-inspired background.",
      "descriptionZh": "麻叶几何",
      "tags": ["geometry", "tiling", "grid", "canvas2d", "background"],
      "vibe": ["minimal", "elegant", "cultural"],
      "culture": "Japan",
      "accuracyNote": "Procedural approximation of Japanese Asanoha hemp-leaf tiling; not a faithful reproduction of any specific historical motif.",
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
    draw: function asanoha(ctx,w,h,t){ ctx.fillStyle='#10243a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(150,200,235,0.7)';ctx.lineWidth=1;const R=24,SQ=Math.sqrt(3);for(let row=0,y=0;y<h+R;row++,y+=R*1.5)for(let x=0;x<w+R;x+=R*SQ){const cx=x+(row%2)*R*SQ/2,cy=y;for(let i=0;i<6;i++){const a=i*Math.PI/3;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.lineTo(cx+Math.cos(a+Math.PI/3)*R,cy+Math.sin(a+Math.PI/3)*R);ctx.stroke();}}},
  };

  // src/effects/canvas/kolam.js
  const _mod_61 = {
    meta: {
      "id": "kolam",
      "kind": "canvas",
      "name": "Kolam",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Pink circle rings and warm dots repeat on deep plum; delicate South Indian threshold geometry.",
      "description": "A grid of pink stroke circles interleaves with warm beige dots at each lattice vertex, evoking the loop-and-dot structure of South Indian Kolam floor art on a deep plum ground. The pattern is static and tiles seamlessly to any canvas size. Use as a decorative cultural background.",
      "descriptionZh": "点格环线",
      "tags": ["dots", "geometry", "tiling", "canvas2d", "background"],
      "vibe": ["elegant", "meditative", "cultural"],
      "culture": "India",
      "accuracyNote": "Procedural approximation of South Indian Kolam floor patterns; not a faithful reproduction of any specific historical motif.",
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
    draw: function kolam(ctx,w,h,t){ ctx.fillStyle='#2a0a1e';ctx.fillRect(0,0,w,h);const S=30;ctx.strokeStyle='#ff7ab0';ctx.lineWidth=2;for(let y=S;y<h-S/2;y+=S)for(let x=S;x<w-S/2;x+=S){ctx.beginPath();ctx.arc(x+S/2,y+S/2,S*0.46,0,7);ctx.stroke();}ctx.fillStyle='#ffd9b0';for(let y=S;y<h;y+=S)for(let x=S;x<w;x+=S){ctx.beginPath();ctx.arc(x,y,2,0,7);ctx.fill();}},
  };

  // src/effects/canvas/greekkey.js
  const _mod_62 = {
    meta: {
      "id": "greekkey",
      "kind": "canvas",
      "name": "Greek Key",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Gold meander hooks scroll steadily across deep navy, forming a flowing ancient Greek frieze.",
      "description": "The classic Greek meander (key) motif is drawn as interlocking right-angle hook strokes in gold on a deep navy ground. The horizontal offset advances with time, making the entire frieze scroll continuously. Use as a bold border accent or animated classical background.",
      "descriptionZh": "回纹 · 流动",
      "tags": ["geometry", "lines", "tiling", "canvas2d", "background"],
      "vibe": ["elegant", "cultural", "retro"],
      "culture": "Greece",
      "accuracyNote": "Procedural approximation of Greek meander (key) pattern; not a faithful reproduction of any specific historical motif.",
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
    draw: function greekkey(ctx,w,h,t){ ctx.fillStyle='#0a1a2a';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffd23f';ctx.lineWidth=3;const S=30,off=(t*12)%S;for(let y=S;y<h+S;y+=S)for(let x=-S+off;x<w;x+=S){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.62);ctx.lineTo(x+S*0.62,y-S*0.28);ctx.lineTo(x+S*0.3,y-S*0.28);ctx.stroke();}},
  };

  // src/effects/canvas/aztec.js
  const _mod_63 = {
    meta: {
      "id": "aztec",
      "kind": "canvas",
      "name": "Aztec Step-Fret",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Earthy step-fret squares in terracotta and teal tile boldly; vivid Mesoamerican graphic rhythm.",
      "description": "A chequerboard of terracotta, amber, teal, and red squares each contain two nested concentric squares, evoking the step-fret motif found in Mesoamerican stonework and textiles. The pattern is fully static. Use as a bold, colourful cultural background.",
      "descriptionZh": "阶梯回纹",
      "tags": ["geometry", "mosaic", "tiling", "grid", "canvas2d", "background"],
      "vibe": ["energetic", "cultural", "geometric"],
      "culture": "Mesoamerica",
      "accuracyNote": "Procedural approximation of Mesoamerican step-fret pattern; not a faithful reproduction of any specific historical motif.",
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
    draw: function aztec(ctx,w,h,t){ ctx.fillStyle='#1a0f0a';ctx.fillRect(0,0,w,h);const cols=['#d9763a','#e8b04b','#3a9b8a','#c0392b'],S=28;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[(r+c)%4];ctx.fillRect(x,y,S,S);ctx.fillStyle='#1a0f0a';ctx.fillRect(x+S*0.3,y+S*0.3,S*0.4,S*0.4);ctx.fillStyle=cols[(r+c+1)%4];ctx.fillRect(x+S*0.4,y+S*0.4,S*0.2,S*0.2);}},
  };

  // src/effects/canvas/kente.js
  const _mod_64 = {
    meta: {
      "id": "kente",
      "kind": "canvas",
      "name": "Kente Cloth",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Vivid gold, green and red colour bands tile in the rhythm of West African Kente weaving.",
      "description": "Interlocking horizontal colour blocks in gold, green, red, black, and blue repeat across the canvas in a pattern that echoes the alternating strip-woven structure of West African Kente cloth. The pattern is fully static and scales to any canvas. Use as a celebratory, high-energy cultural background.",
      "descriptionZh": "肯特织锦",
      "tags": ["stripes", "weave", "geometry", "canvas2d", "background"],
      "vibe": ["energetic", "cultural", "geometric"],
      "culture": "West Africa",
      "accuracyNote": "Procedural approximation of West African Kente cloth weaving; not a faithful reproduction of any specific historical motif.",
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
    draw: function kente(ctx,w,h,t){ const cols=['#f2c20a','#0a8a3a','#c0140a','#111','#1a6cc0'],S=17;for(let y=0,r=0;y<h;y+=S,r++)for(let x=0,c=0;x<w;x+=S,c++){ctx.fillStyle=cols[((r%2)?(c+r):(r*2+c))%5];ctx.fillRect(x,y,S,S);if((r+c)%3===0){ctx.fillStyle=cols[c%5];ctx.fillRect(x,y,S,S/2);}}},
  };

  // src/effects/canvas/talavera.js
  const _mod_65 = {
    meta: {
      "id": "talavera",
      "kind": "canvas",
      "name": "Talavera",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Cream tiles edged in cobalt, petalled in gold; bright repeating Mexican Talavera ceramics.",
      "description": "Square tiles on a cream ground are outlined in cobalt blue, decorated with eight radiating gold petal ellipses and a central cobalt circle, evoking the painted floral motifs of Mexican Talavera ceramics. The pattern is static and tiles seamlessly. Use as a warm decorative background for Latin-themed designs.",
      "descriptionZh": "陶砖花",
      "tags": ["mosaic", "tiling", "geometry", "canvas2d", "background"],
      "vibe": ["elegant", "cultural", "playful"],
      "culture": "Mexico",
      "accuracyNote": "Procedural approximation of Mexican Talavera ceramic tile; not a faithful reproduction of any specific historical motif.",
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
    draw: function talavera(ctx,w,h,t){ ctx.fillStyle='#f4f0e4';ctx.fillRect(0,0,w,h);const S=58;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.strokeStyle='#1a5fa8';ctx.lineWidth=2;ctx.strokeRect(x,y,S,S);ctx.fillStyle='#e8a800';for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.save();ctx.translate(x+S/2+Math.cos(a)*S*0.28,y+S/2+Math.sin(a)*S*0.28);ctx.rotate(a);ctx.beginPath();ctx.ellipse(0,0,5,2,0,0,7);ctx.fill();ctx.restore();}ctx.fillStyle='#1a5fa8';ctx.beginPath();ctx.arc(x+S/2,y+S/2,6,0,7);ctx.fill();}},
  };

  // src/effects/canvas/cloud.js
  const _mod_66 = {
    meta: {
      "id": "cloud",
      "kind": "canvas",
      "name": "Ruyi Cloud",
      "nameLocal": "云纹",
      "section": "world-patterns-ii",
      "summary": "Crimson field of pulsing five-lobed cloud medallions; festive and elegant Chinese folk pattern.",
      "description": "Each tile contains a star-shaped cloud outline whose radius oscillates via a five-lobe sinusoidal waveform, creating a slow pulsing ruyi-cloud medallion on a deep crimson ground. A small arc accents each centre. Use as a festive East Asian or Chinese New Year themed background.",
      "descriptionZh": "祥云回旋",
      "tags": ["curves", "geometry", "tiling", "canvas2d", "background"],
      "vibe": ["elegant", "cultural", "calm"],
      "culture": "China",
      "accuracyNote": "Procedural approximation of Chinese Ruyi cloud patterns; not a faithful reproduction of any specific historical motif.",
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
    draw: function cloud(ctx,w,h,t){ ctx.fillStyle='#7a1420';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffcf5a';ctx.lineWidth=2.5;const S=60;for(let y=S/2;y<h+S;y+=S)for(let x=S/2;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.2831;a+=0.15){const r=S*0.3*(1+0.32*Math.sin(a*5+t*0.5));const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();ctx.stroke();ctx.beginPath();ctx.arc(x,y,S*0.1,0,7);ctx.stroke();}},
  };

  // src/effects/canvas/koru.js
  const _mod_67 = {
    meta: {
      "id": "koru",
      "kind": "canvas",
      "name": "Koru",
      "nameLocal": null,
      "section": "world-patterns-ii",
      "summary": "Cream fern spirals slowly uncoil across a dark forest ground; meditative Māori koru motif.",
      "description": "Expanding Archimedean spirals rotate gently across a dark green-black ground, evoking the koru — the unfurling silver-fern frond central to Māori art. The rotation is slow and continuous, lending an organic meditative quality. Use as a background for New Zealand or nature-themed designs.",
      "descriptionZh": "蕨芽螺旋",
      "tags": ["spiral", "geometry", "canvas2d", "background"],
      "vibe": ["meditative", "organic", "cultural"],
      "culture": "Maori",
      "accuracyNote": "Procedural approximation of Māori Koru spiral motif; not a faithful reproduction of any specific historical motif.",
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
    draw: function koru(ctx,w,h,t){ ctx.fillStyle='#0a1410';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#e8e0cf';ctx.lineWidth=3;ctx.lineCap='round';const S=78;for(let y=0;y<h+S;y+=S)for(let x=0;x<w+S;x+=S){ctx.beginPath();for(let a=0;a<6.5;a+=0.1){const r=a*3+2,px=x+Math.cos(a+t*0.3)*r,py=y+Math.sin(a+t*0.3)*r;a?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}},
  };

  // src/effects/canvas/paisley.js
  const _mod_68 = {
    meta: {
      "id": "paisley",
      "kind": "canvas",
      "name": "Paisley",
      "nameLocal": "佩斯利",
      "section": "world-patterns-ii",
      "summary": "Jewel-toned boteh teardrops gently sway on deep indigo; lush Persian paisley textile rhythm.",
      "description": "Bezier-curve teardrop (boteh) shapes in amber, pink, and teal are arranged in offset rows and gently rock with a sinusoidal rotation, evoking the repeating motif of Persian paisley textiles. The inner void gives each shape its characteristic hollow. Use as a rich, ornate background for textile or fashion themes.",
      "descriptionZh": "火腿纹 boteh",
      "tags": ["curves", "geometry", "tiling", "canvas2d", "background"],
      "vibe": ["elegant", "cultural", "hypnotic"],
      "culture": "Persia",
      "accuracyNote": "Procedural approximation of Persian Paisley (boteh) textile pattern; not a faithful reproduction of any specific historical motif.",
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
    draw: function paisley(ctx,w,h,t){ ctx.fillStyle='#1a0a2a';ctx.fillRect(0,0,w,h);const cols=['#e8b04b','#ff7ab0','#34d1c4'],S=64;for(let y=0,r=0;y<h+S;y+=S,r++)for(let x=0,c=0;x<w+S;x+=S,c++){ctx.save();ctx.translate(x+(r%2)*S/2,y);ctx.rotate(Math.sin(t*0.3+r+c)*0.2);ctx.fillStyle=cols[(r+c)%3];ctx.beginPath();ctx.moveTo(0,-18);ctx.bezierCurveTo(17,-16,17,9,0,17);ctx.bezierCurveTo(-9,10,-7,-5,0,-18);ctx.fill();ctx.fillStyle='#1a0a2a';ctx.beginPath();ctx.moveTo(0,-12);ctx.bezierCurveTo(9,-10,9,5,0,10);ctx.bezierCurveTo(-4,6,-3,-3,0,-12);ctx.fill();ctx.restore();}},
  };

  // src/effects/canvas/tunnel.js
  const _mod_69 = {
    meta: {
      "id": "tunnel",
      "kind": "canvas",
      "name": "Tunnel",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Hypnotic blue checkerboard rushes toward you in an infinite demoscene tunnel flythrough.",
      "description": "Maps every pixel to polar coordinates — angle for the column, inverse-radius for depth — then shades a checkerboard pattern driven by time. The result is an endless forward rush through a cylindrical tunnel with depth-based shading. Best as a fullscreen looping background or retro hero section.",
      "descriptionZh": "棋盘隧道",
      "tags": ["tunnel", "geometry", "grid", "optical", "canvas2d", "background"],
      "vibe": ["hypnotic", "retro"],
      "culture": "demoscene",
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function tunnel(ctx,w,h,t){ const S=4;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const dx=x-w/2,dy=y-h/2,a=Math.atan2(dy,dx),r=Math.hypot(dx,dy)||1,u=a/Math.PI*8,v=320/r+t*2,c=((Math.floor(u)+Math.floor(v))&1)?1:0.25,sh=Math.min(1,r/(w*0.5));ctx.fillStyle='rgb('+(c*120*sh|0)+','+(c*200*sh|0)+','+(c*255*sh|0)+')';ctx.fillRect(x,y,S,S);}},
  };

  // src/effects/canvas/plasma.js
  const _mod_70 = {
    meta: {
      "id": "plasma",
      "kind": "canvas",
      "name": "Plasma",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Swirling rainbow sine-wave blobs morph endlessly; psychedelic demoscene classic.",
      "description": "Sums four sinusoidal fields — horizontal, vertical, diagonal, and radial — to produce continuously shifting color blobs. The combined value drives HSL hue, producing a full-spectrum wash that cycles over time. A CPU-heavy effect; best used as a looping fullscreen background.",
      "descriptionZh": "经典等离子",
      "tags": ["plasma", "waves", "noise", "geometry", "canvas2d", "background"],
      "vibe": ["psychedelic", "energetic", "retro"],
      "culture": "demoscene",
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function plasma(ctx,w,h,t){ const S=4;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const v=Math.sin(x*0.04+t)+Math.sin(y*0.05+t*1.1)+Math.sin((x+y)*0.03+t*0.7)+Math.sin(Math.hypot(x-w/2,y-h/2)*0.04-t),c=v/4;ctx.fillStyle='hsl('+(((c*180+t*40)%360+360)%360)+',80%,'+(50+c*20|0)+'%)';ctx.fillRect(x,y,S,S);}},
  };

  // src/effects/canvas/rotozoom.js
  const _mod_71 = {
    meta: {
      "id": "rotozoom",
      "kind": "canvas",
      "name": "Rotozoom",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Pink-and-dark checkerboard spins and zooms in and out; retro demoscene rotozoom.",
      "description": "Transforms pixel coordinates through a time-varying rotation matrix with a sinusoidally oscillating zoom factor, sampling a simple checkerboard texture. The result is a classic infinite-tile pattern that rotates and pulses. Use as a retro fullscreen background or looping transition.",
      "descriptionZh": "旋转缩放贴图",
      "tags": ["geometry", "grid", "tiling", "optical", "canvas2d", "background"],
      "vibe": ["hypnotic", "retro", "playful"],
      "culture": "demoscene",
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function rotozoom(ctx,w,h,t){ const S=4,zoom=1.5+Math.sin(t*0.5)*0.8,ca=Math.cos(t*0.3)*zoom,sa=Math.sin(t*0.3)*zoom;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){const u=((x-w/2)*ca-(y-h/2)*sa)|0,v=((x-w/2)*sa+(y-h/2)*ca)|0,c=((u>>4)+(v>>4))&1;ctx.fillStyle=c?'#ff5a8a':'#1a1030';ctx.fillRect(x,y,S,S);}},
  };

  // src/effects/canvas/copperbars.js
  const _mod_72 = {
    meta: {
      "id": "copperbars",
      "kind": "canvas",
      "name": "Copper Bars",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Five glowing colored bars bounce on black; warm Amiga Copper demoscene glow.",
      "description": "Renders five hue-shifted horizontal bars that oscillate vertically via sine waves, each with a bright centre fading to dark edges — mimicking the colour-per-scanline trick of Amiga Copper hardware. Lightweight and mobile-safe. Use as a retro looping backdrop or section divider.",
      "descriptionZh": "铜条 · Amiga",
      "tags": ["lines", "neon", "glow", "geometry", "canvas2d", "background"],
      "vibe": ["retro", "energetic", "playful"],
      "culture": "demoscene / Amiga",
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
    draw: function copperbars(ctx,w,h,t){ ctx.fillStyle='#000';ctx.fillRect(0,0,w,h);const hues=[30,180,300,90,210];for(let i=0;i<5;i++){const cy=h/2+Math.sin(t*1.5+i*0.6)*h*0.34;for(let y=-18;y<18;y++){ctx.fillStyle='hsl('+hues[i]+',90%,'+(58-Math.abs(y)*2.6)+'%)';ctx.fillRect(0,cy+y,w,1);}}},
  };

  // src/effects/canvas/sevenseg.js
  const _mod_73 = {
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

  // src/effects/canvas/ledmatrix.js
  const _mod_74 = {
    meta: {
      "id": "ledmatrix",
      "kind": "canvas",
      "name": "LED Matrix",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Amber LED dot grid ripples with a traveling sine wave; warm retro electronics glow.",
      "description": "Fills the canvas with a tight grid of circular dot-matrix LEDs whose brightness ripples as a diagonal traveling wave. Dots glow amber-orange against near-black, fading to dim at the trough. Works as a warm retro background or ambient overlay.",
      "descriptionZh": "点阵屏波动",
      "tags": ["dots", "grid", "waves", "neon", "canvas2d", "background"],
      "vibe": ["retro", "technical", "ambient"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function ledmatrix(ctx,w,h,t){ ctx.fillStyle='#0a0a0a';ctx.fillRect(0,0,w,h);const C=9,gw=Math.ceil(w/C),gh=Math.ceil(h/C);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const on=0.5+0.5*Math.sin((x-gw/2)*0.3+(y-gh/2)*0.2-t*3);ctx.fillStyle='rgba(255,'+(80+on*120|0)+',20,'+(0.15+on*0.8).toFixed(2)+')';ctx.beginPath();ctx.arc(x*C+C/2,y*C+C/2,C*0.35,0,7);ctx.fill();}},
  };

  // src/effects/canvas/radar.js
  const _mod_75 = {
    meta: {
      "id": "radar",
      "kind": "canvas",
      "name": "Radar Sweep",
      "nameLocal": null,
      "section": "screen-and-signal",
      "summary": "Phosphor-green radar sweep rotates over range rings on dark; tense sci-fi monitor.",
      "description": "Draws four concentric range rings and a rotating sweep arm in phosphor green on a near-black field. The arm leaves a fading wedge trail behind it as it advances clockwise with time. Use as a sci-fi dashboard background or dramatic overlay.",
      "descriptionZh": "雷达扫描",
      "tags": ["radar", "geometry", "rings", "canvas2d", "background", "overlay"],
      "vibe": ["technical", "futuristic", "dramatic"],
      "culture": "signal / military / sci-fi",
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
    draw: function radar(ctx,w,h,t){ ctx.fillStyle='#04140a';ctx.fillRect(0,0,w,h);const cx=w/2,cy=h/2,R=Math.min(w,h)*0.46;ctx.strokeStyle='rgba(80,255,140,0.3)';for(let i=1;i<=4;i++){ctx.beginPath();ctx.arc(cx,cy,R*i/4,0,7);ctx.stroke();}const a=t*1.2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,a-0.85,a);ctx.closePath();ctx.fillStyle='rgba(80,255,140,0.16)';ctx.fill();ctx.strokeStyle='#5fff90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();},
  };

  // src/effects/canvas/ekg.js
  const _mod_76 = {
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

  // src/effects/canvas/cursortrail.js
  const _mod_77 = {
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

  // src/effects/canvas/crosshair.js
  const _mod_78 = {
    meta: {
      "id": "crosshair",
      "kind": "canvas",
      "name": "Crosshair HUD",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Sci-fi HUD crosshair locks to the cursor with real-time coordinate readout; minimal, technical.",
      "description": "A green monospace HUD crosshair with full-width guide lines tracks the cursor and prints live X/Y pixel coordinates. Falls back to a slow circular orbit when no pointer is detected. Use as a sci-fi or game-style interactive overlay.",
      "descriptionZh": "准星 + 坐标读出",
      "tags": ["lines", "geometry", "cursor", "overlay", "canvas2d"],
      "vibe": ["technical", "minimal"],
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function crosshair(ctx,w,h,t,mx,my){ ctx.fillStyle='#0a0c10';ctx.fillRect(0,0,w,h);const x=mx>=0?mx:w/2+Math.cos(t)*w*0.3,y=my>=0?my:h/2+Math.sin(t)*h*0.3;ctx.strokeStyle='rgba(120,255,180,0.3)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();ctx.strokeStyle='#7CFFB0';ctx.beginPath();ctx.arc(x,y,14,0,7);ctx.stroke();ctx.font='11px monospace';ctx.fillStyle='#7CFFB0';ctx.fillText('X:'+String(Math.round(x)).padStart(4,'0')+' Y:'+String(Math.round(y)).padStart(4,'0'),x+18,y-10); },
  };

  // src/effects/canvas/ripplewater.js
  const _mod_79 = {
    meta: {
      "id": "ripplewater",
      "kind": "canvas",
      "name": "Water Ripple",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Blue water ripples spread from cursor touch across a CPU-simulated height field; calm, fluid.",
      "description": "A 2D wave-propagation height field simulates water ripples from the cursor position, rendered as tinted blue pixels. Two Float32Array grids swap each frame with 0.95 damping to sustain oscillation. Best used as a confined interactive panel; skip on mobile due to CPU cost.",
      "descriptionZh": "水波高度场",
      "tags": ["ripple", "waves", "fluid", "canvas2d", "overlay"],
      "vibe": ["calm", "organic"],
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
      "deterministic": true,
      "state": {"persistent": true, "notes": "Two Float32Array height field buffers s.a and s.b swap and accumulate wave energy across frames"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function ripplewater(ctx,w,h,t,mx,my,s){ const C=6,gw=Math.ceil(w/C),gh=Math.ceil(h/C);if(!s.a||s.gw!==gw){s.gw=gw;s.gh=gh;s.a=new Float32Array(gw*gh);s.b=new Float32Array(gw*gh);}const di=mx>=0?Math.floor(my/C)*gw+Math.floor(mx/C):(Math.floor(gh/2+Math.sin(t*2)*gh*0.3))*gw+Math.floor(gw/2+Math.cos(t*2)*gw*0.3);if(di>=0&&di<s.a.length)s.a[di]=320;for(let y=1;y<gh-1;y++)for(let x=1;x<gw-1;x++){const i=y*gw+x;s.b[i]=((s.a[i-1]+s.a[i+1]+s.a[i-gw]+s.a[i+gw])/2-s.b[i])*0.95;}const tmp=s.a;s.a=s.b;s.b=tmp;ctx.fillStyle='#04101c';ctx.fillRect(0,0,w,h);for(let y=0;y<gh;y++)for(let x=0;x<gw;x++){const v=s.a[y*gw+x];if(Math.abs(v)>2){const c=Math.min(255,128+v);ctx.fillStyle='rgb('+(c*0.3|0)+','+(c*0.7|0)+','+(c|0)+')';ctx.fillRect(x*C,y*C,C,C);}} },
  };

  // src/effects/canvas/blobcursor.js
  const _mod_80 = {
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

  // src/effects/canvas/ironfilings.js
  const _mod_81 = {
    meta: {
      "id": "ironfilings",
      "kind": "canvas",
      "name": "Iron Filings",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Tiny iron filings snap to magnetic field lines emanating from the cursor; geometric, hypnotic.",
      "description": "Short line segments across a regular grid rotate to align tangent to the magnetic field of a point source at the cursor, producing a classic iron-filings pattern. The simulation is purely trigonometric with no random state. Use as a physics-inspired interactive overlay.",
      "descriptionZh": "磁场铁屑",
      "tags": ["lines", "geometry", "flow", "cursor", "overlay", "canvas2d"],
      "vibe": ["geometric", "hypnotic"],
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function ironfilings(ctx,w,h,t,mx,my){ ctx.fillStyle='#0c0c0e';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2+Math.cos(t)*w*0.2,cy=my>=0?my:h/2;ctx.strokeStyle='rgba(200,210,230,0.6)';ctx.lineWidth=1.2;const S=16;for(let y=S/2;y<h;y+=S)for(let x=S/2;x<w;x+=S){const a=Math.atan2(y-cy,x-cx)+Math.PI/2;ctx.beginPath();ctx.moveTo(x-Math.cos(a)*6,y-Math.sin(a)*6);ctx.lineTo(x+Math.cos(a)*6,y+Math.sin(a)*6);ctx.stroke();} },
  };

  // src/effects/canvas/vortex.js
  const _mod_82 = {
    meta: {
      "id": "vortex",
      "kind": "canvas",
      "name": "Vortex",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Colourful particles spiral into the cursor in an accelerating vortex; hypnotic, energetic overlay.",
      "description": "140 particles continuously spiral inward toward the cursor, colour-shifting by radial distance and hue-cycling over time. The canvas fades partially each frame (alpha 0.2), painting a glowing vortex trail. Use as a hypnotic cursor-following overlay on dark hero sections.",
      "descriptionZh": "粒子漩涡",
      "tags": ["particles", "spiral", "orbit", "cursor", "overlay", "canvas2d"],
      "vibe": ["hypnotic", "energetic"],
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
      "state": {"persistent": true, "notes": "Particle positions in s.p accumulate motion each frame; canvas fades partially (alpha 0.2 fill)"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function vortex(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];for(let i=0;i<140;i++)s.p.push({x:Math.random()*w,y:Math.random()*h});}ctx.fillStyle='rgba(8,6,14,0.2)';ctx.fillRect(0,0,w,h);const cx=mx>=0?mx:w/2,cy=my>=0?my:h/2;for(const p of s.p){const dx=p.x-cx,dy=p.y-cy,d=Math.hypot(dx,dy)||1,a=Math.atan2(dy,dx)+0.1;p.x=cx+Math.cos(a)*(d-0.6);p.y=cy+Math.sin(a)*(d-0.6);if(d<6){p.x=Math.random()*w;p.y=Math.random()*h;}ctx.fillStyle='hsla('+((d+t*40)%360)+',90%,65%,0.9)';ctx.fillRect(p.x,p.y,2,2);} },
  };

  // src/effects/canvas/confetti.js
  const _mod_83 = {
    meta: {
      "id": "confetti",
      "kind": "canvas",
      "name": "Confetti",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Colourful confetti flakes drift down with gentle sine sway; celebratory, playful overlay.",
      "description": "Coloured rectangular confetti pieces spawn at the top and drift down with sine-wave sway and random spin until they exit the canvas. Up to 120 particles are maintained; new pieces spawn each frame at random. Use as a celebration overlay for achievement or success moments.",
      "descriptionZh": "纸屑飘落",
      "tags": ["confetti", "particles", "trail", "canvas2d", "overlay"],
      "vibe": ["playful", "energetic"],
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
      "deterministic": false,
      "state": {"persistent": true, "notes": "Particle array s.p grows each frame up to cap; particles removed when off-screen"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function confetti(ctx,w,h,t,mx,my,s){ if(!s.p)s.p=[];if(s.p.length<120&&Math.random()<0.6){const cols=['#ff5a8a','#ffd23f','#34d1c4','#7b6cf6','#ff8f3f'];s.p.push({x:Math.random()*w,y:-10,vy:1+Math.random()*2,vx:(Math.random()-.5)*2,r:2+Math.random()*5,c:cols[Math.floor(Math.random()*5)],rot:Math.random()*6,vr:(Math.random()-.5)*0.3});}ctx.fillStyle='#0a0a12';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.y<h+10);for(const p of s.p){p.y+=p.vy;p.x+=p.vx+Math.sin(t+p.y*0.05);p.rot+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.fillStyle=p.c;ctx.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);ctx.restore();} },
  };

  // src/effects/canvas/fireworks.js
  const _mod_84 = {
    meta: {
      "id": "fireworks",
      "kind": "canvas",
      "name": "Fireworks",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Glittering firework bursts erupt automatically across a dark sky with gravity fade; dramatic.",
      "description": "Particle bursts of 50 sparks erupt automatically every 40 frames at or near the cursor, spreading radially with slight gravity and fading out. The canvas partially clears each frame, creating motion-blur trails. Use as a celebratory background or click-effect overlay.",
      "descriptionZh": "烟花 · 点击放",
      "tags": ["particles", "stars", "fire", "canvas2d", "overlay"],
      "vibe": ["energetic", "dramatic"],
      "culture": null,
      "accuracyNote": null,
      "perf": {
        "gpu": "low",
        "cpu": "low",
        "mobileSafe": true
      },
      "interactive": {
        "followsCursor": true,
        "trigger": "auto"
      },
      "reducedMotion": "freeze",
      "deterministic": false,
      "state": {"persistent": true, "notes": "Particle array s.p and frame counter s.acc persist; bursts fire automatically every 40 frames; canvas fades partially each frame"},
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function fireworks(ctx,w,h,t,mx,my,s){ if(!s.p){s.p=[];s.acc=0;}s.acc++;if(s.acc%40===0){const ox=mx>=0?mx:Math.random()*w,oy=my>=0?my:Math.random()*h*0.6,hue=Math.random()*360;for(let i=0;i<50;i++){const a=Math.random()*6.28,sp=Math.random()*3+1;s.p.push({x:ox,y:oy,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:1,hue});}}ctx.fillStyle='rgba(6,6,14,0.22)';ctx.fillRect(0,0,w,h);s.p=s.p.filter(p=>p.life>0);for(const p of s.p){p.x+=p.vx;p.y+=p.vy;p.vy+=0.04;p.life-=0.012;ctx.fillStyle='hsla('+p.hue+',90%,65%,'+p.life.toFixed(2)+')';ctx.fillRect(p.x,p.y,2.4,2.4);} },
  };

  // src/effects/canvas/bokeh.js
  const _mod_85 = {
    meta: {
      "id": "bokeh",
      "kind": "canvas",
      "name": "Bokeh",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Soft luminous circles drift upward like out-of-focus lights; calm, elegant background.",
      "description": "24 blurred radial-gradient circles in cyan-to-blue hues drift slowly upward in a loop, simulating the bokeh circles of a shallow-depth-of-field photograph. Composite mode 'lighter' adds soft glow overlap. Use as an ambient atmospheric background.",
      "descriptionZh": "焦外光斑",
      "tags": ["dots", "glow", "particles", "canvas2d", "background"],
      "vibe": ["calm", "elegant"],
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
      "deterministic": false,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function bokeh(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<24;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:10+Math.random()*40,hue:Math.random()*60+180,sp:0.2+Math.random()*0.5,ph:Math.random()*6});}ctx.fillStyle='#06080f';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const y=(c.y+t*c.sp*20)%(h+80)-40,g=ctx.createRadialGradient(c.x,y,0,c.x,y,c.r),al=0.12+0.08*Math.sin(t+c.ph);g.addColorStop(0,'hsla('+c.hue+',80%,70%,'+al.toFixed(2)+')');g.addColorStop(1,'hsla('+c.hue+',80%,70%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(c.x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over'; },
  };

  // src/effects/canvas/nebula.js
  const _mod_86 = {
    meta: {
      "id": "nebula",
      "kind": "canvas",
      "name": "Nebula",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Drifting cloud wisps and twinkling stars form a deep-space nebula; ambient, meditative background.",
      "description": "14 slowly swaying radial-gradient clouds in blue-violet hues overlay 40 twinkling star points against a near-black background. Composite mode 'lighter' blends the clouds for a luminous depth effect. Use as a space-themed ambient background or hero section backdrop.",
      "descriptionZh": "星云叠加",
      "tags": ["nebula", "stars", "starfield", "glow", "canvas2d", "background"],
      "vibe": ["ambient", "meditative"],
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
      "deterministic": false,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function nebula(ctx,w,h,t,mx,my,s){ if(!s.c){s.c=[];for(let i=0;i<14;i++)s.c.push({x:Math.random()*w,y:Math.random()*h,r:30+Math.random()*60,hue:Math.random()*120+200,ph:Math.random()*6});}ctx.fillStyle='#04040a';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';for(const c of s.c){const x=c.x+Math.sin(t*0.2+c.ph)*20,y=c.y+Math.cos(t*0.15+c.ph)*16,g=ctx.createRadialGradient(x,y,0,x,y,c.r);g.addColorStop(0,'hsla('+c.hue+',80%,60%,0.16)');g.addColorStop(1,'hsla('+c.hue+',80%,60%,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,c.r,0,7);ctx.fill();}ctx.globalCompositeOperation='source-over';for(let i=0;i<40;i++){ctx.fillStyle='rgba(255,255,255,'+(0.2+0.3*Math.sin(t+i)).toFixed(2)+')';ctx.fillRect((i*97)%w,(i*53)%h,1,1);} },
  };

  // src/effects/canvas/lightning.js
  const _mod_87 = {
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

  // src/effects/canvas/neonpipes.js
  const _mod_88 = {
    meta: {
      "id": "neonpipes",
      "kind": "canvas",
      "name": "Neon Pipes",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Six glowing neon sine waves undulate in cyan, magenta, and lime; retro, energetic background.",
      "description": "Six horizontal sine-wave bands in cycling neon colours (cyan, magenta, lime, sky) undulate across a near-black canvas with canvas shadow glow. The waves are purely trigonometric with no random state. Use as a retro synth-wave background.",
      "descriptionZh": "发光管线",
      "tags": ["neon", "waves", "lines", "glow", "canvas2d", "background"],
      "vibe": ["retro", "energetic"],
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
    draw: function neonpipes(ctx,w,h,t){ ctx.fillStyle='#08040f';ctx.fillRect(0,0,w,h);const cols=['#00fff0','#ff00aa','#aaff00','#00aaff'];ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<6;i++){ctx.strokeStyle=cols[i%4];ctx.shadowBlur=10;ctx.shadowColor=cols[i%4];ctx.beginPath();for(let x=0;x<=w;x+=8){const y=h*(i+1)/7+Math.sin(x*0.03+t*1.5+i)*18;x?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.shadowBlur=0; },
  };

  // src/effects/canvas/spinners.js
  const _mod_89 = {
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

  // src/effects/canvas/wavegrid.js
  const _mod_90 = {
    meta: {
      "id": "wavegrid",
      "kind": "canvas",
      "name": "Wave Grid",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Perspective dot grid ripples with sine waves receding into depth; geometric, hypnotic background.",
      "description": "A 14×10 dot grid rendered in perspective with depth-colour scaling and a sine-wave displacement creates a rippling 3D plane effect. Dot size and hue shift smoothly with depth. Use as a futuristic or technical background.",
      "descriptionZh": "透视波点阵",
      "tags": ["grid", "dots", "waves", "geometry", "canvas2d", "background"],
      "vibe": ["geometric", "hypnotic"],
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
    draw: function wavegrid(ctx,w,h,t){ ctx.fillStyle='#060810';ctx.fillRect(0,0,w,h);const cols=14,rows=10;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const px=(c/(cols-1)-0.5),pz=r/(rows-1),sc=0.4+pz*0.9,x=w/2+px*w*sc,y=h*0.35+pz*h*0.5+Math.sin(c*0.6+r*0.4-t*2)*8*pz,sz=1+pz*2.5;ctx.fillStyle='hsl('+((200+pz*120)%360)+',80%,'+(40+pz*30|0)+'%)';ctx.beginPath();ctx.arc(x,y,sz,0,7);ctx.fill();} },
  };

  // src/effects/canvas/audiobars.js
  const _mod_91 = {
    meta: {
      "id": "audiobars",
      "kind": "canvas",
      "name": "Audio Bars",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Simulated spectrum bars pulse in blue-green gradient (no mic); energetic audio-visualiser look.",
      "description": "32 vertical bars whose heights are driven by Math.sin combinations simulate a frequency-spectrum visualiser without any microphone or Web Audio API — the audio is entirely fake. Bar colours cycle from blue to green across the 32 bins. Use as a decorative audio-aesthetic background or loader.",
      "descriptionZh": "频谱律动",
      "tags": ["oscilloscope", "lines", "geometry", "canvas2d"],
      "vibe": ["energetic", "technical"],
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
    draw: function audiobars(ctx,w,h,t){ ctx.fillStyle='#0a0a0f';ctx.fillRect(0,0,w,h);const n=32,bw=w/n;for(let i=0;i<n;i++){const v=(0.25+0.75*Math.abs(Math.sin(i*0.5+t*4)*Math.sin(i*0.13+t)))*h*0.8;ctx.fillStyle='hsl('+(i/n*120+200|0)+',85%,60%)';ctx.fillRect(i*bw+1,h-v,bw-2,v);} },
  };

  // src/effects/canvas/heatmap.js
  const _mod_92 = {
    meta: {
      "id": "heatmap",
      "kind": "canvas",
      "name": "Heatmap",
      "nameLocal": null,
      "section": "interaction-and-generative",
      "summary": "Noise-driven heatmap shifts cool-to-hot; cursor adds a warm bloom; technical, hypnotic overlay.",
      "description": "A per-pixel noise field is coloured from cool blue (240°) to hot red (0°) using the runtime vnoise function, refreshed every frame with a slow vertical drift. When the cursor is active, a warm bloom radiates from the pointer position. Use as a data-aesthetic background or interactive heatmap overlay.",
      "descriptionZh": "噪声热力 · 跟手",
      "tags": ["noise", "flow", "cursor", "overlay", "canvas2d"],
      "vibe": ["technical", "hypnotic"],
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
      "deterministic": true,
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    // `this` is bound by the runtime to { vhash, vnoise }
    draw: function heatmap(ctx,w,h,t,mx,my){ const S=6;for(let y=0;y<h;y+=S)for(let x=0;x<w;x+=S){let v=this.vnoise(x*0.02,y*0.02+t*0.3);if(mx>=0)v+=Math.max(0,1-Math.hypot(x-mx,y-my)/80)*0.6;v=Math.min(1,v);ctx.fillStyle='hsl('+(240-v*240|0)+',90%,'+(20+v*40|0)+'%)';ctx.fillRect(x,y,S,S);} },
  };

  // src/effects/dom/scramble.js
  const _mod_93 = {
    meta: {
      "id": "scramble",
      "kind": "dom",
      "name": "Decode Text",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "乱码归位",
      "tags": [],
      "vibe": [],
      "culture": "UI / typography",
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
    selector: "[data-scramble]",
    init(root) {
      const el = root.querySelector('[data-scramble]');
      if (!el) return { stop() {} };
      const words = ['CANVAS', 'SHADER', 'EFFECT', 'MOTION'], chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ#%@&/<>*0123456789';
      let wi = 0, scrTimer = 0;
      const setWord = (target) => {
        let frame = 0; const len = target.length; clearInterval(scrTimer);
        scrTimer = setInterval(() => {
          let s = '';
          for (let i = 0; i < len; i++) { s += i < frame / 2.4 ? target[i] : chars[Math.floor(Math.random() * chars.length)]; }
          el.textContent = s; frame++; if (frame / 2.4 > len) clearInterval(scrTimer);
        }, 42);
      };
      setWord(words[0]);
      const scrCycle = setInterval(() => { wi = (wi + 1) % words.length; setWord(words[wi]); }, 2200);
      return { stop() { clearInterval(scrTimer); clearInterval(scrCycle); } };
    },
  };

  // src/effects/dom/magnetic.js
  const _mod_94 = {
    meta: {
      "id": "magnetic",
      "kind": "dom",
      "name": "Magnetic Cursor",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "磁吸自定义光标",
      "tags": [],
      "vibe": [],
      "culture": "UI / interaction",
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    selector: "[data-magnetic]",
    init(root) {
      const tile = root.querySelector('[data-magnetic]');
      if (!tile) return { stop() {} };
      const cursor = tile.querySelector('[data-magcursor]'), chips = [...tile.querySelectorAll('[data-magchip]')];
      let tx = 0, ty = 0, cx = 0, cy = 0, scale = 1;
      const center = () => { const r = tile.getBoundingClientRect(); tx = r.width / 2; ty = r.height / 2; };
      center(); cx = tx; cy = ty;
      const onMove = (e) => { const r = tile.getBoundingClientRect(); tx = e.clientX - r.left; ty = e.clientY - r.top; };
      tile.addEventListener('pointermove', onMove, { passive: true });
      tile.addEventListener('pointerleave', center);
      return {
        step() {
          const r = tile.getBoundingClientRect(); let best = null, bd = 1e9;
          chips.forEach((ch) => { const cr = ch.getBoundingClientRect(); const ccx = cr.left - r.left + cr.width / 2, ccy = cr.top - r.top + cr.height / 2; const d = Math.hypot(tx - ccx, ty - ccy); if (d < bd) { bd = d; best = { x: ccx, y: ccy, el: ch }; } });
          const active = best && bd < 64; let gx = tx, gy = ty, ts = 1; if (active) { gx = best.x; gy = best.y; ts = 2.5; }
          chips.forEach((ch) => { const on = active && ch === best.el; ch.style.color = on ? '#0a0b0d' : ''; ch.style.background = on ? '#CDE85A' : ''; ch.style.borderColor = on ? '#CDE85A' : ''; });
          cx += (gx - cx) * 0.2; cy += (gy - cy) * 0.2; scale += (ts - scale) * 0.2;
          cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%) scale(' + scale.toFixed(3) + ')';
        },
        stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', center); },
      };
    },
  };

  // src/effects/dom/kinetic.js
  const _mod_95 = {
    meta: {
      "id": "kinetic",
      "kind": "dom",
      "name": "Kinetic Type",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "可变字重波动",
      "tags": [],
      "vibe": [],
      "culture": "typography / variable font",
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
    selector: "[data-kinetic]",
    init(root) {
      const el = root.querySelector('[data-kinetic]');
      if (!el) return { stop() {} };
      const word = 'MOTION'; el.innerHTML = '';
      const spans = [...word].map((ch) => { const s = document.createElement('span'); s.textContent = ch; s.style.cssText = 'display:inline-block;font-weight:400;font-size:clamp(28px,5vw,46px)'; el.appendChild(s); return s; });
      return {
        step(t) {
          spans.forEach((s, i) => { const ph = t * 2 - i * 0.5; s.style.fontWeight = Math.round(400 + 300 * (0.5 + 0.5 * Math.sin(ph))); s.style.transform = 'translateY(' + (Math.sin(ph) * 8).toFixed(1) + 'px)'; });
        },
        stop() { el.innerHTML = ''; },
      };
    },
  };

  // src/effects/dom/marquee.js
  const _mod_96 = {
    meta: {
      "id": "marquee",
      "kind": "dom",
      "name": "Marquee Ticker",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "无缝跑马灯",
      "tags": [],
      "vibe": [],
      "culture": "UI / editorial",
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
    selector: "[data-marquee]",
    init(root) {
      const tr = root.querySelector('[data-marquee]');
      if (!tr) return { stop() {} };
      let x = 0;
      return {
        step() { const wdt = tr.scrollWidth / 2 || tr.offsetWidth; x -= 1.3; if (x <= -wdt) x += wdt; tr.style.transform = 'translateX(' + x.toFixed(1) + 'px)'; },
        stop() {},
      };
    },
  };

  // src/effects/dom/tilt.js
  const _mod_97 = {
    meta: {
      "id": "tilt",
      "kind": "dom",
      "name": "3D Tilt Card",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "透视倾斜 · 跟手",
      "tags": [],
      "vibe": [],
      "culture": "UI / 3D perspective",
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    selector: "[data-tilt]",
    init(root) {
      const tile = root.querySelector('[data-tilt]');
      if (!tile) return { stop() {} };
      const card = tile.querySelector('[data-tiltcard]');
      const onMove = (e) => { const r = tile.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; card.style.transform = 'perspective(600px) rotateY(' + (px * 24).toFixed(1) + 'deg) rotateX(' + (-py * 24).toFixed(1) + 'deg)'; };
      const onLeave = () => { card.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)'; };
      tile.addEventListener('pointermove', onMove, { passive: true });
      tile.addEventListener('pointerleave', onLeave);
      return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
    },
  };

  // src/effects/dom/spot.js
  const _mod_98 = {
    meta: {
      "id": "spot",
      "kind": "dom",
      "name": "Spotlight Mask",
      "nameLocal": null,
      "section": "interaction",
      "summary": "",
      "description": "",
      "descriptionZh": "光标聚光揭示",
      "tags": [],
      "vibe": [],
      "culture": "UI / reveal",
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
      "state": null,
      "license": "MIT",
      "attribution": null
    },
    selector: "[data-spot]",
    init(root) {
      const tile = root.querySelector('[data-spot]');
      if (!tile) return { stop() {} };
      const set = (x, y) => { tile.style.setProperty('--mx', x + 'px'); tile.style.setProperty('--my', y + 'px'); };
      const onMove = (e) => { const r = tile.getBoundingClientRect(); set(e.clientX - r.left, e.clientY - r.top); };
      const onLeave = () => { const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2); };
      tile.addEventListener('pointermove', onMove, { passive: true });
      tile.addEventListener('pointerleave', onLeave);
      const r = tile.getBoundingClientRect(); set(r.width / 2, r.height / 2);
      return { stop() { tile.removeEventListener('pointermove', onMove); tile.removeEventListener('pointerleave', onLeave); } };
    },
  };

  // src/registry.js
  // GENERATED by build extraction — do not edit by hand.

  const REGISTRY = {
    "gradient": fx_gradient,
    "dots": fx_dots,
    "metaballs": fx_metaballs,
    "aurora": fx_aurora,
    "ripple": fx_ripple,
    "voronoi": fx_voronoi,
    "truchet": fx_truchet,
    "kaleido": fx_kaleido,
    "raymarch": fx_raymarch,
    "vapor": fx_vapor,
    "glitch": fx_glitch,
    "field": fx_field,
    "seigaiha": fx_seigaiha,
    "girih": fx_girih,
    "celtic": fx_celtic,
    "aboriginal": fx_aboriginal,
    "inkwash": fx_inkwash,
    "opart": fx_opart,
    "bauhaus": fx_bauhaus,
    "memphis": fx_memphis,
    "matrix": fx_matrix,
    "scope": fx_scope,
    "starfield": fx_starfield,
    "halftone": fx_halftone,
    "ascii": fx_ascii,
    "topo": fx_topo,
    "quasicrystal": fx_quasicrystal,
    "phyllotaxis": fx_phyllotaxis,
    "rose": fx_rose,
    "spiro": fx_spiro,
    "lissajous": fx_lissajous,
    "superformula": fx_superformula,
    "hexgrid": fx_hexgrid,
    "concentric": fx_concentric,
    "spiralarc": fx_spiralarc,
    "interference": fx_interference,
    "chevron": fx_chevron,
    "herringbone": fx_herringbone,
    "polka": fx_polka,
    "houndstooth": fx_houndstooth,
    "plaid": fx_plaid,
    "starburst": fx_starburst,
    "wavelines": fx_wavelines,
    "mandelbrot": fx_mandelbrot,
    "julia": fx_julia,
    "clifford": fx_clifford,
    "dejong": fx_dejong,
    "lorenz": fx_lorenz,
    "fern": fx_fern,
    "sierpinski": fx_sierpinski,
    "dragon": fx_dragon,
    "fractaltree": fx_fractaltree,
    "life": fx_life,
    "briansbrain": fx_briansbrain,
    "langton": fx_langton,
    "boids": fx_boids,
    "doomfire": fx_doomfire,
    "sandfall": fx_sandfall,
    "pendulum": fx_pendulum,
    "orbits": fx_orbits,
    "asanoha": fx_asanoha,
    "kolam": fx_kolam,
    "greekkey": fx_greekkey,
    "aztec": fx_aztec,
    "kente": fx_kente,
    "talavera": fx_talavera,
    "cloud": fx_cloud,
    "koru": fx_koru,
    "paisley": fx_paisley,
    "tunnel": fx_tunnel,
    "plasma": fx_plasma,
    "rotozoom": fx_rotozoom,
    "copperbars": fx_copperbars,
    "sevenseg": fx_sevenseg,
    "ledmatrix": fx_ledmatrix,
    "radar": fx_radar,
    "ekg": fx_ekg,
    "cursortrail": fx_cursortrail,
    "crosshair": fx_crosshair,
    "ripplewater": fx_ripplewater,
    "blobcursor": fx_blobcursor,
    "ironfilings": fx_ironfilings,
    "vortex": fx_vortex,
    "confetti": fx_confetti,
    "fireworks": fx_fireworks,
    "bokeh": fx_bokeh,
    "nebula": fx_nebula,
    "lightning": fx_lightning,
    "neonpipes": fx_neonpipes,
    "spinners": fx_spinners,
    "wavegrid": fx_wavegrid,
    "audiobars": fx_audiobars,
    "heatmap": fx_heatmap,
    "scramble": fx_scramble,
    "magnetic": fx_magnetic,
    "kinetic": fx_kinetic,
    "marquee": fx_marquee,
    "tilt": fx_tilt,
    "spot": fx_spot,
  };

  const IDS = Object.keys(REGISTRY);

  // src/runtime/scheduler.js
  // One rAF loop for every mounted effect. Visibility-gated, per-draw try/catch,
  // DPR-aware resize, prefers-reduced-motion honoring each effect's meta.reducedMotion.
  // No DOM/global access at module top-level (Node can import this file).

  let rafId = null;
  let origin = 0;
  const items = new Set();
  const byTarget = new Map(); // target element -> item (for shared IO/RO callbacks)
  let io = null, ro = null, reduceMQ = null;

  function ensureObservers() {
    if (io) return;
    reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
    // Toggling reduce off should resume frozen effects; toggling on draws one more frame then freezes.
    reduceMQ.addEventListener('change', () => { for (const it of items) it.framesDrawn = 0; });
    io = new IntersectionObserver((entries) => {
      for (const e of entries) { e.target.__vis = e.isIntersecting; }
    }, { rootMargin: '100px' });
    ro = new ResizeObserver((entries) => {
      for (const e of entries) { const it = byTarget.get(e.target); if (it) doResize(it); }
    });
    // Pause the entire loop when the tab/page is hidden (rAF throttles but doesn't fully stop).
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (rafId != null) { cancelAnimationFrame(rafId); rafId = null; } }
      else { ensureLoop(); }
    });
  }

  // Start the loop iff there's work to do and the page is visible. Idempotent.
  function ensureLoop() {
    if (rafId == null && items.size > 0 && !(typeof document !== 'undefined' && document.hidden)) {
      if (origin === 0) origin = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  }

  function doResize(item) {
    if (!item.resize) return;
    const r = item.target.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width));
    const h = Math.max(1, Math.round(r.height));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    try { item.resize(w, h, dpr); } catch (e) { logOnce(item, e); }
    item.framesDrawn = 0; // redraw at least one frame at the new size (matters under freeze)
  }

  function logOnce(item, e) {
    if (item.errored) return;
    item.errored = true;
    console.error('fx-lab: effect error (suppressing further logs for this mount):', e);
  }

  function frame(now) {
    rafId = requestAnimationFrame(frame);
    const t = (now - origin) / 1000;
    const reduce = reduceMQ.matches;
    for (const item of items) {
      if (reduce && item.reducedMotion !== 'animate' && item.framesDrawn >= 1) continue;
      if (item.target.__vis === false) continue; // off-screen
      try { item.draw(t); item.framesDrawn++; }
      catch (e) { logOnce(item, e); }
    }
  }

  // opts: { target (Element observed for visibility/resize), draw(t), reducedMotion, resize?(w,h,dpr) }
  // Returns an unschedule() that fully detaches this item. Idempotent.
  function schedule(opts) {
    ensureObservers();
    const item = { ...opts, framesDrawn: 0, errored: false, dead: false };
    item.reducedMotion = item.reducedMotion || 'freeze';
    items.add(item);
    byTarget.set(item.target, item);
    item.target.__vis = true; // optimistic until IO reports
    io.observe(item.target);
    if (item.resize) { ro.observe(item.target); doResize(item); }
    ensureLoop();
    return function unschedule() {
      if (item.dead) return;
      item.dead = true;
      items.delete(item);
      byTarget.delete(item.target);
      try { io.unobserve(item.target); } catch {}
      try { if (item.resize) ro.unobserve(item.target); } catch {}
      delete item.target.__vis;
      if (items.size === 0 && rafId != null) { cancelAnimationFrame(rafId); rafId = null; }
    };
  }

  // src/runtime/preamble.js
  // Verbatim GLSL preamble prepended to every shader before compilation (from FX Lab.dc.html).
  const PRE = `#version 300 es
  precision highp float;
  uniform vec2 iResolution; uniform float iTime; uniform vec2 iMouse;
  out vec4 o;
  float hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }
  float noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }
  float fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }
  `;

  // src/runtime/gl.js
  // WebGL2 renderer for shader effects. PRE + glsl, full-screen triangle.
  // Module-level live-context counter refuses creation beyond the cap (returns null + console.error,
  // never throws) and decrements on stop / webglcontextlost.


  // Browsers allow ~16 live WebGL2 contexts before evicting the oldest. The gallery lazy-unmounts
  // off-screen tiles, so concurrent contexts stay bounded by the viewport regardless. Override per-mount via opts.glCap.
  // ponytail: 16 fits all 11 shaders on screen at once; single-context virtualization is the path past dozens.
  const GL_CAP = 16;
  let liveContexts = 0;

  const VS_SRC = `#version 300 es
  in vec2 p;
  void main(){ gl_Position=vec4(p,0,1); }`;

  function compile(gl, type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.error('fx-lab: shader compile error:\n' + gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  }

  // makeGL(canvas, glsl, opts?) -> { resize(w,h,dpr), render(t, mxCss, myCss), dispose() } | null
  function makeGL(canvas, glsl, opts = {}) {
    const cap = opts.glCap ?? GL_CAP;
    if (liveContexts >= cap) {
      console.error(`fx-lab: WebGL2 context cap (${cap}) reached — refusing to create another. Mount fewer shader effects per page.`);
      return null;
    }
    const gl = canvas.getContext('webgl2', {
      antialias: false, depth: false, stencil: false, premultipliedAlpha: false, powerPreference: 'low-power',
    });
    if (!gl) { console.error('fx-lab: WebGL2 is not available in this browser.'); return null; }

    const lose = () => { const ext = gl.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); };

    const vs = compile(gl, gl.VERTEX_SHADER, VS_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, PRE + glsl);
    if (!vs || !fs) { lose(); return null; }

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('fx-lab: shader link error:\n' + gl.getProgramInfoLog(prog));
      lose();
      return null;
    }

    // Success — count this live context.
    liveContexts++;
    let released = false;
    const release = () => { if (released) return; released = true; liveContexts--; };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW); // full-screen triangle
    const pLoc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(pLoc);
    gl.vertexAttribPointer(pLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'iResolution');
    const uTime = gl.getUniformLocation(prog, 'iTime');
    const uMouse = gl.getUniformLocation(prog, 'iMouse');

    let dpr = 1;
    const onLost = (e) => { e.preventDefault(); release(); };
    canvas.addEventListener('webglcontextlost', onLost);

    return {
      resize(w, h, _dpr) {
        dpr = _dpr;
        canvas.width = Math.max(1, Math.round(w * dpr));
        canvas.height = Math.max(1, Math.round(h * dpr));
      },
      render(t, mxCss, myCss) {
        if (released) return;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(prog);
        gl.bindVertexArray(vao);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        // iMouse: physical px, Y-flipped, centered when not hovering (mxCss < 0).
        let mpx, mpy;
        if (mxCss < 0) { mpx = canvas.width * 0.5; mpy = canvas.height * 0.5; }
        else { mpx = mxCss * dpr; mpy = canvas.height - myCss * dpr; }
        gl.uniform2f(uMouse, mpx, mpy);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },
      dispose() {
        canvas.removeEventListener('webglcontextlost', onLost);
        if (!released) {
          try { gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf); gl.deleteVertexArray(vao); } catch {}
        }
        release();
        lose();
      },
    };
  }

  // src/runtime/noise.js
  // JS noise helpers bound as `this` for canvas effects (verbatim from FX Lab.dc.html).
  function vhash(x,y){ let n=Math.sin(x*127.1+y*311.7)*43758.5453; return n-Math.floor(n); }
  function vnoise(x,y){ const xi=Math.floor(x),yi=Math.floor(y),xf=x-xi,yf=y-yi; const u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf); const a=this.vhash(xi,yi),b=this.vhash(xi+1,yi),c=this.vhash(xi,yi+1),d=this.vhash(xi+1,yi+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
  const NOISE = { vhash, vnoise };

  // src/runtime/canvas.js
  // Canvas2D renderer. ctx.setTransform(dpr) each frame (coords in CSS px); draw is called with
  // `this === NOISE` so effects that use this.vhash/this.vnoise resolve. state persists per mount.
  //
  // opts.resScale (0–1) shrinks the LOGICAL canvas handed to draw(): effects loop over fewer pixels
  // (work drops ~scale²), then the browser upscales the smaller bitmap to fill the box. Critical for
  // per-pixel effects (mandelbrot, julia, plasma, …) whose cost is the JS loop, not fillRect. The
  // coordinate space stays self-consistent at any scale — effects see a smaller w/h, not a squished
  // one. Defaults to 1 (full res); the gallery passes 0.5 for cpu:"high" effects.


  // makeCanvas2D(canvas, module, opts?) -> { resize(w,h,dpr), render(t, mxCss, myCss), dispose() }
  function makeCanvas2D(canvas, module, opts = {}) {
    const ctx = canvas.getContext('2d');
    const resScale = Math.min(1, Math.max(0.1, Number(opts.resScale) || 1));
    const state = {}; // persisted across frames for this mount
    let w = 0, h = 0, dpr = 1;
    return {
      resize(_w, _h, _dpr) {
        w = _w; h = _h; dpr = _dpr;
        // Backing store matches the scaled logical size × dpr; CSS box (width/height:100%) upscales it.
        const sw = Math.max(1, Math.round(_w * resScale));
        const sh = Math.max(1, Math.round(_h * resScale));
        canvas.width = Math.max(1, Math.round(sw * dpr));
        canvas.height = Math.max(1, Math.round(sh * dpr));
      },
      render(t, mx, my) {
        // dpr maps the (scaled) logical space onto the backing store. Pass the scaled w/h so the
        // effect's pixel loops iterate over fewer cells.
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // CSS-px coords; resets any transform the effect left behind
        const sw = Math.max(1, Math.round(w * resScale));
        const sh = Math.max(1, Math.round(h * resScale));
        module.draw.call(NOISE, ctx, sw, sh, t, mx, my, state); // mx,my are CSS px, -9999 when not hovering
      },
      dispose() {},
    };
  }

  // src/runtime/dom.js
  // Dispatches an adapted dom effect's init(root) -> { step?(t), stop() }.
  // Normalizes the result so mount.js always gets a step (or null) and a stop().

  function makeDom(root, module) {
    const handle = module.init(root) || {};
    return {
      step: typeof handle.step === 'function' ? handle.step : null,
      stop: typeof handle.stop === 'function' ? handle.stop : () => {},
    };
  }

  // src/runtime/mount.js
  // mount(el, id, opts) -> { stop() }. stop() releases EVERYTHING (rAF dereg, GL context + counter,
  // observers, listeners, timers) with no leaks across repeated mount/stop. Routes by meta.kind.


  const handles = new Set();

  function track(stopFn) {
    const handle = {
      stop() {
        if (!handles.has(handle)) return; // idempotent
        handles.delete(handle);
        try { stopFn(); } catch (e) { console.error('fx-lab: error during stop():', e); }
      },
    };
    handles.add(handle);
    return handle;
  }

  function makeCanvasEl(el) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    el.appendChild(canvas);
    return canvas;
  }

  // Pointer tracking shared by shader + canvas mounts. mx,my in CSS px relative to canvas; -9999 when not hovering.
  function trackPointer(canvas) {
    const p = { mx: -9999, my: -9999 };
    const onMove = (e) => { const r = canvas.getBoundingClientRect(); p.mx = e.clientX - r.left; p.my = e.clientY - r.top; };
    const onLeave = () => { p.mx = -9999; p.my = -9999; };
    canvas.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerleave', onLeave);
    p.detach = () => { canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('pointerleave', onLeave); };
    return p;
  }

  function mountRendered(el, module, opts, makeRenderer) {
    const canvas = makeCanvasEl(el);
    const renderer = makeRenderer(canvas);
    if (!renderer) { el.removeChild(canvas); return track(() => {}); } // cap reached / no context — already logged
    const p = trackPointer(canvas);
    const unschedule = schedule({
      target: canvas,
      reducedMotion: module.meta.reducedMotion,
      resize: (w, h, dpr) => renderer.resize(w, h, dpr),
      draw: (t) => renderer.render(t, p.mx, p.my),
    });
    return track(() => {
      unschedule();
      p.detach();
      renderer.dispose();
      if (canvas.parentNode === el) el.removeChild(canvas);
    });
  }

  function mountDom(el, module) {
    const handle = makeDom(el, module);
    let unschedule = null;
    if (handle.step) {
      unschedule = schedule({
        target: el,
        reducedMotion: module.meta.reducedMotion,
        draw: (t) => handle.step(t),
      });
    }
    return track(() => {
      if (unschedule) unschedule();
      handle.stop();
    });
  }

  function mount(el, id, opts = {}) {
    if (typeof el === 'string') el = document.querySelector(el);
    const module = REGISTRY[id];
    if (!module || !el) { console.error(`fx-lab: cannot mount "${id}" (unknown id or missing element).`); return { stop() {} }; }
    switch (module.meta.kind) {
      case 'shader': return mountRendered(el, module, opts, (c) => makeGL(c, module.glsl, opts));
      case 'canvas': return mountRendered(el, module, opts, (c) => makeCanvas2D(c, module, opts));
      case 'dom': return mountDom(el, module);
      default: console.error(`fx-lab: unknown kind "${module.meta.kind}" for "${id}".`); return { stop() {} };
    }
  }

  function stopAll() {
    for (const h of [...handles]) h.stop();
  }

  // src/index.js
  // fx-lab public entry. ESM, zero runtime deps.

  function listEffects() {
    return IDS.map((id) => REGISTRY[id].meta);
  }

  ;

  // Exports
  const api = { mount, stopAll, REGISTRY, IDS, listEffects };
  if (typeof window !== 'undefined') window.FXLab = api;
})();