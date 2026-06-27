export default {
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
