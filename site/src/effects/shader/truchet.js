export default {
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
