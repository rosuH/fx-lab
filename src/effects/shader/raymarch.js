export default {
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
