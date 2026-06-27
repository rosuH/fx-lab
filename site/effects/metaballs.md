# Metaballs (shader)

> Five glowing purple-magenta blobs orbit and merge organically; cursor draws in a sixth.

- **id**: `metaballs` · **kind**: shader · **section**: generative
- **tags**: metaballs, plasma, glow, fluid, webgl2, background · **vibe**: hypnotic, psychedelic, organic
- **culture**: —
- **perf**: gpu med / cpu low / mobileSafe true
- **interactive**: followsCursor true, trigger hover
- **reducedMotion**: freeze · **deterministic**: true
- **license**: MIT

## Drop-in snippet

```html
<!-- fx-lab effect: metaballs — Metaballs (shader) · license MIT -->
<canvas id="fx-metaballs" style="display:block;width:100%;height:100%;min-height:240px"></canvas>
<script type="module">
const PRE = "#version 300 es\nprecision highp float;\nuniform vec2 iResolution; uniform float iTime; uniform vec2 iMouse;\nout vec4 o;\nfloat hash(vec2 p){ p=fract(p*vec2(123.34,345.45)); p+=dot(p,p+34.345); return fract(p.x*p.y); }\nfloat noise(vec2 p){ vec2 i=floor(p),f=fract(p); float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0)); vec2 u=f*f*(3.0-2.0*f); return mix(mix(a,b,u.x),mix(c,d,u.x),u.y); }\nfloat fbm(vec2 p){ float v=0.0,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.0; a*=0.5; } return v; }\n";
const GLSL = "void main(){ vec2 res=iResolution.xy; vec2 uv=(gl_FragCoord.xy-0.5*res)/res.y; vec2 m=(iMouse.xy-0.5*res)/res.y; float t=iTime; float v=0.0;\n      for(int i=0;i<5;i++){ float fi=float(i); vec2 c=0.55*vec2(sin(t*0.6+fi*1.7),cos(t*0.5+fi*2.3)); v+=0.055/(length(uv-c)+0.001); }\n      v+=0.085/(length(uv-m)+0.001); float s=smoothstep(1.0,1.7,v);\n      vec3 col=mix(vec3(0.03,0.02,0.07),mix(vec3(0.5,0.1,0.92),vec3(0.96,0.26,0.6),s),s); col+=s*vec3(0.18,0.05,0.32); o=vec4(col,1.0); }";
const cv = document.getElementById('fx-metaballs');
const gl = cv.getContext('webgl2');
if (!gl) { console.error('fx-metaballs: WebGL2 not supported'); } else {
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0,1);}'));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, PRE + GLSL));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(prog));
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'iResolution');
  const uTime = gl.getUniformLocation(prog, 'iTime');
  const uMouse = gl.getUniformLocation(prog, 'iMouse');
  let mx = -1, my = -1;
  cv.addEventListener('pointermove', (e) => {
    const r = cv.getBoundingClientRect();
    mx = (e.clientX - r.left) * DPR;
    my = (r.height - (e.clientY - r.top)) * DPR; // Y-flipped to GL space
  });
  cv.addEventListener('pointerleave', () => { mx = -1; my = -1; });
  const t0 = performance.now();
  (function frame() {
    const w = Math.max(1, cv.clientWidth || 300), h = Math.max(1, cv.clientHeight || 240);
    if (cv.width !== Math.round(w * DPR) || cv.height !== Math.round(h * DPR)) {
      cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
    }
    gl.viewport(0, 0, cv.width, cv.height);
    gl.uniform2f(uRes, cv.width, cv.height);
    gl.uniform1f(uTime, (performance.now() - t0) / 1000);
    gl.uniform2f(uMouse, mx < 0 ? cv.width / 2 : mx, my < 0 ? cv.height / 2 : my);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
  })();
}
</script>
```

## Runtime notes

WebGL2 fragment shader compiled against the shared PRE preamble (uniforms iResolution, iTime, iMouse — iMouse is Y-flipped physical px, centered when no pointer). Browsers cap ~8–16 live WebGL2 contexts; the gallery lazy-unmounts off-screen tiles to stay under the limit. Perf budget — gpu: med, cpu: low, mobileSafe: true. Reduced motion: freeze.

## Known limitations

- WebGL2 context limit: browsers cap ~8–16 live contexts; unmount off-screen shaders (the gallery does this) to stay under it.
