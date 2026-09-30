import { useEffect, useRef } from "react";

interface HalftoneVeilProps {
  /** Dot spacing in CSS px */
  cell?: number;
  /** Max dot radius as a fraction of the cell (0.2–0.5) */
  size?: number;
  /** Speed of the drifting noise field */
  flow?: number;
  /** Cursor reach in CSS px */
  radius?: number;
  /** How far dots are pushed away from the cursor (0–1) */
  push?: number;
  /** Resting dot colour */
  dot?: string;
  /** Colour dots take on near the cursor */
  accent?: string;
  /** Overall dot opacity (0–1) */
  opacity?: number;
  /** Change `id` to send a ripple out from (x, y) in viewport coordinates */
  pulse?: { id: number; x: number; y: number };
  className?: string;
}

const TRAIL = 12;
const PULSES = 4;
const PULSE_LIFE = 2.4; // seconds

const vert = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const frag = `
precision highp float;
uniform vec2 u_res;
uniform float u_time, u_cell, u_size, u_radius, u_push, u_flow, u_opacity;
uniform vec3 u_trail[${TRAIL}];
uniform vec3 u_pulses[${PULSES}];
uniform float u_pulseSpeed;
uniform vec3 u_dot, u_accent;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  vec2 center = (floor(frag / u_cell) + 0.5) * u_cell;
  vec2 uv = center / u_res.y;
  float t = u_time * u_flow;

  // Flowing field: domain-warped noise, drifting slowly
  vec2 q = vec2(fbm(uv * 1.4 + vec2(0.0, t * 0.12)), fbm(uv * 1.4 + vec2(5.2, -t * 0.10)));
  float v = fbm(uv * 1.8 + q * 1.6 + vec2(t * 0.05, 0.0));

  // Veil: heavier towards the lower right, thinning out top left
  vec2 n = center / u_res;
  float veil = smoothstep(0.1, 1.1, n.x * 0.6 + (1.0 - n.y) * 0.6);
  v = smoothstep(0.32, 0.78, v) * mix(0.25, 1.0, veil);

  // Cursor and its fading trail
  float m = 0.0;
  vec2 push = vec2(0.0);
  for (int i = 0; i < ${TRAIL}; i++){
    vec3 tr = u_trail[i];
    if (tr.z <= 0.001) continue;
    vec2 d = center - tr.xy;
    float dist = length(d);
    float r = u_radius * (0.55 + 0.45 * tr.z);
    float k = tr.z * smoothstep(r, 0.0, dist);
    m = max(m, k);
    push += (dist > 0.001 ? d / dist : vec2(0.0)) * k;
  }

  // Ripples: a ring that spreads out from the origin, swelling and pushing dots as it passes
  for (int i = 0; i < ${PULSES}; i++){
    vec3 pu = u_pulses[i];
    if (pu.z < 0.0 || pu.z > ${PULSE_LIFE.toFixed(1)}) continue;
    vec2 d = center - pu.xy;
    float dist = length(d);
    float life = pu.z / ${PULSE_LIFE.toFixed(1)};
    float ringR = pu.z * u_pulseSpeed;
    float width = u_cell * (5.0 + 10.0 * life);
    float k = smoothstep(width, 0.0, abs(dist - ringR)) * (1.0 - life) * (1.0 - life);
    m = max(m, k);
    push += (dist > 0.001 ? d / dist : vec2(0.0)) * k;
  }

  float pl = length(push);
  if (pl > 1.0) push /= pl;

  float rad = u_cell * min(u_size * (0.12 + v + m * 0.95), 0.5);
  vec2 c = center + push * u_push * max(0.0, 0.5 * u_cell - rad);
  float cover = 1.0 - smoothstep(rad - 0.8, rad + 0.8, length(frag - c));
  cover *= step(0.5, rad);

  // Only the dots are drawn; everything else stays transparent (premultiplied alpha)
  vec3 dotCol = mix(u_dot, u_accent, smoothstep(0.05, 0.75, m));
  float alpha = cover * mix(0.28, 1.0, clamp(v * 1.2 + m, 0.0, 1.0)) * u_opacity;
  gl_FragColor = vec4(dotCol * alpha, alpha);
}`;

const hex = (h: string) =>
  [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

const HalftoneVeil: React.FC<HalftoneVeilProps> = ({
  cell = 12,
  size = 0.42,
  flow = 0.6,
  radius = 200,
  push = 0.7,
  dot = "#ffffff",
  accent = "#a8862f",
  opacity = 0.55,
  pulse,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Viewport-space ripple origins waiting to be picked up by the render loop
  const pulseQueue = useRef<{ x: number; y: number }[]>([]);
  useEffect(() => {
    if (pulse) pulseQueue.current.push({ x: pulse.x, y: pulse.y });
  }, [pulse?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Read by the render loop, so prop changes apply without rebuilding GL
  const settings = useRef({ cell, size, flow, radius, push, dot, accent, opacity });
  settings.current = { cell, size, flow, radius, push, dot, accent, opacity };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: true,
      alpha: true,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = Object.fromEntries(
      [
        "u_res",
        "u_time",
        "u_cell",
        "u_size",
        "u_radius",
        "u_push",
        "u_flow",
        "u_opacity",
        "u_trail",
        "u_pulses",
        "u_pulseSpeed",
        "u_dot",
        "u_accent",
      ].map((n) => [n, gl.getUniformLocation(prog, n)]),
    );

    let dpr = 1;
    let rect = canvas.getBoundingClientRect();
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    // Trail: a ring of recent pointer positions that fade out
    const trail = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0, s: 0 }));
    let head = 0;
    let lastAdd = 0;
    let lastX = -1e4;
    let lastY = -1e4;
    let lastMove = -1e9;
    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, active: false };

    const addPoint = (x: number, y: number, now: number) => {
      head = (head + 1) % TRAIL;
      trail[head].x = x;
      trail[head].y = y;
      trail[head].s = 1;
      lastAdd = now;
      lastX = x;
      lastY = y;
    };

    // Canvas ignores pointer events so the form stays usable; track on window instead
    const onMove = (e: PointerEvent) => {
      rect = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) * dpr;
      pointer.ty = (rect.bottom - e.clientY) * dpr;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.active = true;
      lastMove = performance.now();
    };
    const onLeave = () => {
      pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let time = 0;
    let prev = performance.now();
    const data = new Float32Array(TRAIL * 3);

    // Active ripples in canvas pixels; start is in the same clock as `now`
    const pulses: { x: number; y: number; start: number }[] = [];
    const pulseData = new Float32Array(PULSES * 3);

    const frame = (now: number) => {
      const s = settings.current;
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      if (!reduce.matches) time += dt;

      // Idle ghost: when nobody is touching, a soft sun drifts across the page
      const idle = !reduce.matches && now - lastMove > 2500;
      if (idle) {
        const g = (now / 1000) * 0.25;
        pointer.tx = canvas.width * (0.5 + 0.32 * Math.sin(g * 1.3));
        pointer.ty = canvas.height * (0.5 + 0.28 * Math.sin(g * 1.9 + 1.0));
        if (!pointer.active) {
          pointer.x = pointer.tx;
          pointer.y = pointer.ty;
          pointer.active = true;
        }
      }
      // Ease towards the target so movement feels soft
      const ease = 1 - Math.pow(0.001, dt);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;

      const moved = Math.hypot(pointer.x - lastX, pointer.y - lastY);
      if (pointer.active && (moved > 14 * dpr || now - lastAdd > 120))
        addPoint(pointer.x, pointer.y, now);

      const decay = Math.pow(0.12, dt); // trail fades in about a second
      trail.forEach((p, i) => {
        if (i !== head) p.s *= decay;
        data[i * 3] = p.x;
        data[i * 3 + 1] = p.y;
        data[i * 3 + 2] = p.s * (idle ? 0.7 : 1);
      });
      // Live cursor always at full strength
      trail[head].x = pointer.x;
      trail[head].y = pointer.y;
      data[head * 3] = pointer.x;
      data[head * 3 + 1] = pointer.y;

      // Ripples are motion, so skip them for reduced-motion users
      for (const q of pulseQueue.current.splice(0)) {
        if (reduce.matches) continue;
        pulses.push({
          x: (q.x - rect.left) * dpr,
          y: (rect.bottom - q.y) * dpr,
          start: now,
        });
      }
      while (
        pulses.length &&
        (pulses.length > PULSES ||
          (now - pulses[0].start) / 1000 > PULSE_LIFE)
      )
        pulses.shift();
      pulseData.fill(-1);
      pulses.forEach((p, i) => {
        pulseData[i * 3] = p.x;
        pulseData[i * 3 + 1] = p.y;
        pulseData[i * 3 + 2] = (now - p.start) / 1000;
      });

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.u_res, canvas.width, canvas.height);
      gl.uniform1f(U.u_time, time);
      gl.uniform1f(U.u_cell, s.cell * dpr);
      gl.uniform1f(U.u_size, s.size);
      gl.uniform1f(U.u_radius, s.radius * dpr);
      gl.uniform1f(U.u_push, s.push);
      gl.uniform1f(U.u_flow, s.flow);
      gl.uniform1f(U.u_opacity, s.opacity);
      gl.uniform3fv(U.u_trail, data);
      gl.uniform3fv(U.u_pulses, pulseData);
      // The ring reaches the far corner just as it finishes fading
      gl.uniform1f(
        U.u_pulseSpeed,
        Math.hypot(canvas.width, canvas.height) / PULSE_LIFE,
      );
      gl.uniform3fv(U.u_dot, hex(s.dot));
      gl.uniform3fv(U.u_accent, hex(s.accent));
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        prev = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      // Don't force-lose the context: StrictMode remounts reuse this canvas's context
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
    />
  );
};

export default HalftoneVeil;
