// build/snippet.js — derives the paste-anywhere `snippet` + short `mountSnippet` per CONTRACT 3.
// One kind-switch. Output is COMPLETE, zero-dependency HTML+script that runs standalone.
import { PRE } from '../src/runtime/preamble.js';
import { vhash, vnoise } from '../src/runtime/noise.js';

// --- attribution + accuracyNote travel with the copied code (CONTRACT 3) ---
function headerComment(meta) {
  const lines = [`fx-lab effect: ${meta.id} — ${meta.name} (${meta.kind}) · license ${meta.license}`];
  if (meta.attribution && meta.attribution.author) {
    lines.push(`attribution: ${meta.attribution.author}${meta.attribution.url ? ' <' + meta.attribution.url + '>' : ''}`);
  }
  if (meta.accuracyNote) lines.push(`accuracy: ${meta.accuracyNote}`);
  return `<!-- ${lines.join('\n     ')} -->\n`;
}

const CANVAS_TAG = (id) =>
  `<canvas id="fx-${id}" style="display:block;width:100%;height:100%;min-height:240px"></canvas>`;

// --- shader: <canvas> + inlined minimal makeGL(PRE+glsl) + rAF + pointer (Y-flipped, centered) ---
function shaderSnippet(m) {
  const id = m.meta.id;
  return `${headerComment(m.meta)}${CANVAS_TAG(id)}
<script type="module">
const PRE = ${JSON.stringify(PRE)};
const GLSL = ${JSON.stringify(m.glsl)};
const cv = document.getElementById('fx-${id}');
const gl = cv.getContext('webgl2');
if (!gl) { console.error('fx-${id}: WebGL2 not supported'); } else {
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const compile = (type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, '#version 300 es\\nin vec2 p;void main(){gl_Position=vec4(p,0,1);}'));
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
</script>`;
}

// --- canvas: <canvas> + setTransform(dpr) + rAF + draw body (NOISE inlined when used) ---
function canvasSnippet(m) {
  const id = m.meta.id;
  const drawSrc = m.draw.toString();
  const usesNoise = /this\.(vhash|vnoise)/.test(drawSrc);
  const noiseInline = usesNoise
    ? `${vhash.toString()}\n${vnoise.toString()}\nconst NOISE = { vhash, vnoise };\n`
    : '';
  const call = usesNoise
    ? 'draw.call(NOISE, ctx, w, h, t, mx, my, state)'
    : 'draw(ctx, w, h, t, mx, my, state)';
  return `${headerComment(m.meta)}${CANVAS_TAG(id)}
<script type="module">
const draw = ${drawSrc};
${noiseInline}const cv = document.getElementById('fx-${id}');
const ctx = cv.getContext('2d');
const DPR = Math.min(2, window.devicePixelRatio || 1);
const state = {};
let mx = -9999, my = -9999; // -9999 == not hovering (CONTRACT 2)
cv.addEventListener('pointermove', (e) => {
  const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top;
});
cv.addEventListener('pointerleave', () => { mx = -9999; my = -9999; });
const t0 = performance.now();
(function frame() {
  const w = Math.max(1, cv.clientWidth || 300), h = Math.max(1, cv.clientHeight || 240);
  if (cv.width !== Math.round(w * DPR) || cv.height !== Math.round(h * DPR)) {
    cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
  }
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0); // draw in CSS px
  const t = (performance.now() - t0) / 1000;
  ${call};
  requestAnimationFrame(frame);
})();
</script>`;
}

// --- dom: sentinel HTML (from selector) + inlined adapted init(root)->{step?,stop} ---
// Sentinels mirror the inner [data-*] hooks each effect's source queries.
const SENTINELS = {
  scramble: '<p data-scramble style="font-family:ui-monospace,monospace;font-size:2rem;letter-spacing:.1em;color:#CDE85A;margin:0">DECODE</p>',
  spot: '<div data-spot style="position:relative;width:320px;height:200px;background:#111;color:#fff;overflow:hidden;-webkit-mask-image:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),#000 0,transparent 72%);mask-image:radial-gradient(160px circle at var(--mx,50%) var(--my,50%),#000 0,transparent 72%)"><div style="padding:1.2rem;font-size:1.1rem;line-height:1.5">Move the cursor across this panel to reveal the spotlight mask. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div></div>',
  magnetic: '<div data-magnetic style="position:relative;width:340px;height:200px;background:#0a0b0d;color:#fff;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap"><div data-magcursor style="position:absolute;left:0;top:0;width:16px;height:16px;border-radius:50%;border:1px solid #CDE85A;pointer-events:none"></div><span data-magchip style="padding:6px 14px;border:1px solid #333;border-radius:999px">Home</span><span data-magchip style="padding:6px 14px;border:1px solid #333;border-radius:999px">Work</span><span data-magchip style="padding:6px 14px;border:1px solid #333;border-radius:999px">About</span></div>',
  kinetic: '<div data-kinetic style="color:#fff;font-family:system-ui,sans-serif"></div>',
  marquee: '<div style="overflow:hidden;white-space:nowrap;width:320px;color:#fff;font-family:ui-monospace,monospace;padding:.6rem 0"><div data-marquee style="display:inline-block">FX LAB · ZERO-DEP WEB EFFECTS · PASTE ANYWHERE · FX LAB · ZERO-DEP WEB EFFECTS · PASTE ANYWHERE · </div></div>',
  tilt: '<div data-tilt style="width:300px;height:200px;perspective:600px"><div data-tiltcard style="width:100%;height:100%;background:linear-gradient(135deg,#1f6feb,#CDE85A);border-radius:12px;display:flex;align-items:center;justify-content:center;color:#0a0b0d;font-weight:700;font-family:system-ui">Tilt me</div></div>',
};

function attrFromSelector(sel) {
  const m = /\[([^\]=~|^$*]+)/.exec(sel || '');
  return m ? m[1] : 'data-fx';
}

// Fallback adapter for un-adapted dom modules (init:null, _raw present): turns the original
// `initXxx(){...}` (this.root / this.domSteps / this.<timer>) into a self-contained init(root).
function adaptRaw(raw) {
  let body = String(raw).replace(/^[\s\S]*?\{/, '').replace(/\}\s*$/, '');
  body = body
    .replace(/this\.domSteps\.push\(/g, '__steps.push(')
    .replace(/this\.root/g, 'root')
    .replace(/this\./g, '__s.');
  return `(root) => {
  const __steps = [], __s = {};
${body}
  return {
    step: (t) => __steps.forEach((f) => { try { f(t); } catch (e) {} }),
    stop: () => { for (const k in __s) { clearInterval(__s[k]); clearTimeout(__s[k]); } }
  };
}`;
}

// Normalize a function's toString() into a valid assignment RHS. Module methods stringify as
// shorthand (`init(root){...}`) which is not assignable; wrap those in an object literal.
function asExpr(src) {
  const s = src.trim();
  if (/^(async\s+)?function\b/.test(s)) return s;                          // function expression
  if (/^(async\s*)?(\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/.test(s)) return s;    // arrow
  const name = (s.match(/^([A-Za-z_$][\w$]*)/) || [, 'init'])[1];          // method shorthand
  return `({ ${s} }).${name}`;
}

function domSnippet(m) {
  const id = m.meta.id;
  const sentinel = SENTINELS[id] || `<div ${attrFromSelector(m.selector)}>fx</div>`;
  const initSrc = asExpr(m.init ? m.init.toString() : adaptRaw(m._raw));
  return `${headerComment(m.meta)}<div id="fx-root-${id}">${sentinel}</div>
<script type="module">
const init = ${initSrc};
const root = document.getElementById('fx-root-${id}');
const inst = init(root) || {};
if (inst.step) {
  const t0 = performance.now();
  (function loop() { inst.step((performance.now() - t0) / 1000); requestAnimationFrame(loop); })();
}
</script>`;
}

export function buildSnippet(module) {
  const kind = module.meta.kind;
  let snippet;
  switch (kind) {
    case 'shader': snippet = shaderSnippet(module); break;
    case 'canvas': snippet = canvasSnippet(module); break;
    case 'dom': snippet = domSnippet(module); break;
    default: throw new Error(`unknown kind: ${kind}`);
  }
  const mountSnippet =
    `import { mount } from 'fx-lab';\nmount(document.querySelector('#app'), '${module.meta.id}');`;
  return { snippet, mountSnippet };
}
