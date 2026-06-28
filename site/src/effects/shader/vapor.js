export default {
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
