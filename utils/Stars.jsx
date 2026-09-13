"use client";

import { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Geometry, Program, Mesh } from "ogl";

// ─────────────────────────────────────────────
//  Utilities
// ─────────────────────────────────────────────

const hexToRgb = (hex) => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const int = parseInt(hex, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
};

// ─────────────────────────────────────────────
//  Color Palettes
// ─────────────────────────────────────────────

const STAR_COLORS = ["#ffffff", "#e8eeff", "#fff5e6", "#ffd6cc", "#cce0ff", "#ffffff", "#ffffff"];
const BRIGHT_STAR_COLORS = ["#ffffff", "#ddeeff", "#ffeedd", "#eef8ff"];
const NEBULA_COLORS = ["#ff4488", "#aa44ff", "#44ccbb", "#3355bb", "#dd3399", "#7744dd"];

// ─────────────────────────────────────────────
//  VERTEX SHADERS
// ─────────────────────────────────────────────

// Shared point-cloud vertex shader for stars, bright stars, nebula, black hole
const pointVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor  = color;

    vec3 pos = position * uSpread;
    pos.z *= 3.0; // stretch z-axis for parallax depth

    // Gentle cosmic drift
    pos.x += sin(uTime * 0.15 * random.z + 6.28 * random.w) * mix(0.02, 0.12, random.x);
    pos.y += sin(uTime * 0.12 * random.y + 6.28 * random.x) * mix(0.02, 0.12, random.w);
    pos.z += sin(uTime * 0.10 * random.w + 6.28 * random.y) * mix(0.02, 0.12, random.z);

    vec4 mPos  = modelMatrix * vec4(pos, 1.0);
    vec4 mvPos = viewMatrix  * mPos;

    gl_PointSize = uBaseSize / length(mvPos.xyz);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// Galaxy spiral vertex – no z-stretch so disk stays flat
const galaxyVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor  = color;

    vec3 pos = position * uSpread;

    // Subtle shimmer
    pos.x += sin(uTime * 0.3 + random.w * 6.28) * 0.02;
    pos.y += cos(uTime * 0.2 + random.z * 6.28) * 0.01;

    vec4 mPos  = modelMatrix * vec4(pos, 1.0);
    vec4 mvPos = viewMatrix  * mPos;

    gl_PointSize = max(uBaseSize / length(mvPos.xyz), 1.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// Accretion-disk vertex – Keplerian orbital animation
const accretionVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uBaseSize;

  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vRandom = random;
    vColor  = color;

    vec3 pos = position;

    // Inner particles orbit faster (Kepler-like)
    float radius     = length(pos.xz);
    float orbitSpeed  = 1.5 / (0.3 + radius);
    float angle       = uTime * orbitSpeed + random.z * 6.28;
    pos.x = cos(angle) * radius;
    pos.z = sin(angle) * radius;

    // Slight vertical bobbing
    pos.y += sin(uTime * 2.0 + random.w * 6.28) * 0.02;

    vec4 mPos  = modelMatrix * vec4(pos, 1.0);
    vec4 mvPos = viewMatrix  * mPos;

    gl_PointSize = max(uBaseSize / length(mvPos.xyz), 1.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`;

// ─────────────────────────────────────────────
//  FRAGMENT SHADERS
// ─────────────────────────────────────────────

// Background star field – soft glow + twinkle
const starFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv = gl_PointCoord.xy;
    float d  = length(uv - 0.5);

    float alpha   = smoothstep(0.5, 0.05, d);
    float twinkle = 0.6 + 0.4 * sin(uTime * (1.5 + vRandom.x * 3.0) + vRandom.y * 6.28);

    gl_FragColor = vec4(vColor, alpha * twinkle * 0.9);
  }
`;

// Bright stars with 4-point cross diffraction spikes
const brightStarFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv = gl_PointCoord.xy - 0.5;
    float d  = length(uv);

    // Bright core
    float core = exp(-d * 12.0);

    // Cross diffraction spikes
    float spikeH = exp(-abs(uv.x) * 50.0) * exp(-abs(uv.y) * 5.0);
    float spikeV = exp(-abs(uv.y) * 50.0) * exp(-abs(uv.x) * 5.0);

    // Diagonal spikes (fainter)
    float d1 = abs(uv.x - uv.y) * 0.7071;
    float d2 = abs(uv.x + uv.y) * 0.7071;
    float diagSpike  = exp(-d1 * 35.0) * exp(-d2 * 6.0) * 0.35;
         diagSpike += exp(-d2 * 35.0) * exp(-d1 * 6.0) * 0.35;

    float brightness = core + (spikeH + spikeV) * 0.5 + diagSpike;

    // Slow pulse
    float pulse = 0.8 + 0.2 * sin(uTime * (0.8 + vRandom.z * 1.2) + vRandom.w * 6.28);

    vec3  col   = vColor * brightness * pulse;
    float alpha = clamp(brightness * pulse, 0.0, 1.0);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

// Galaxy particles – soft glow
const galaxyFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv = gl_PointCoord.xy - 0.5;
    float d  = length(uv);

    float alpha   = smoothstep(0.5, 0.0, d) * 0.55;
    float shimmer = 0.85 + 0.15 * sin(uTime * 2.0 + vRandom.x * 6.28);

    gl_FragColor = vec4(vColor * shimmer, alpha * shimmer);
  }
`;

// Black hole – event horizon, photon ring, accretion ring, Einstein ring, halo
const blackHoleFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv    = gl_PointCoord.xy - 0.5;
    float dist  = length(uv);
    float angle = atan(uv.y, uv.x);

    // ── Event horizon (pure-black centre) ──
    float eventHorizon = smoothstep(0.05, 0.09, dist);

    // ── Photon ring (ultra-thin, bright) ──
    float photonRing = exp(-pow((dist - 0.085) * 100.0, 2.0)) * 1.5;

    // ── Inner accretion ring ──
    float innerDisk = exp(-pow((dist - 0.14) * 18.0, 2.0));
    float rot1 = angle + uTime * 1.2;
    innerDisk *= 0.6 + 0.4 * sin(rot1 * 4.0 + dist * 30.0);

    // ── Outer accretion ring ──
    float outerDisk = exp(-pow((dist - 0.22) * 10.0, 2.0));
    float rot2 = angle - uTime * 0.6;
    outerDisk *= 0.5 + 0.5 * sin(rot2 * 3.0 + dist * 15.0);

    // ── Einstein ring (gravitational lensing halo) ──
    float einsteinRing = exp(-pow((dist - 0.30) * 15.0, 2.0)) * 0.25;

    // ── Outer halo glow ──
    float halo = exp(-dist * 4.0) * 0.12;

    // ── Colour mixing ──
    vec3 photonCol   = vec3(1.0, 0.97, 0.85);
    vec3 innerCol    = mix(vec3(1.0, 0.5, 0.05), vec3(1.0, 0.85, 0.2),
                           sin(rot1 * 2.0) * 0.5 + 0.5);
    vec3 outerCol    = mix(vec3(0.9, 0.3, 0.05), vec3(0.2, 0.4, 1.0),
                           sin(rot2 * 2.0 + 1.0) * 0.5 + 0.5);
    vec3 einsteinCol = vec3(0.4, 0.55, 1.0);
    vec3 haloCol     = vec3(0.25, 0.08, 0.45);

    vec3 col = photonCol * photonRing
             + innerCol  * innerDisk  * eventHorizon
             + outerCol  * outerDisk  * eventHorizon
             + einsteinCol * einsteinRing
             + haloCol   * halo;

    float alpha = photonRing
                + innerDisk * eventHorizon
                + outerDisk * eventHorizon
                + einsteinRing
                + halo;
    alpha  = clamp(alpha, 0.0, 1.0);
    alpha *= smoothstep(0.5, 0.42, dist);

    if (alpha < 0.003) discard;
    gl_FragColor = vec4(col, alpha);
  }
`;

// Accretion-disk orbiting particles
const accretionFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv = gl_PointCoord.xy;
    float d  = length(uv - 0.5);

    float alpha  = smoothstep(0.5, 0.05, d) * 0.7;
    float flicker = 0.7 + 0.3 * sin(uTime * 5.0 * vRandom.x + vRandom.y * 6.28);

    gl_FragColor = vec4(vColor * 1.3, alpha * flicker);
  }
`;

// Nebula clouds – very soft, transparent coloured blobs
const nebulaFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  varying vec4 vRandom;
  varying vec3 vColor;

  void main() {
    vec2  uv = gl_PointCoord.xy - 0.5;
    float d  = length(uv);

    float alpha = smoothstep(0.5, 0.0, d) * 0.06;

    // Internal wisps
    float wisp = sin(uv.x * 8.0 + uTime * 0.15 + vRandom.x * 6.28)
               * cos(uv.y * 6.0 + uTime * 0.10 + vRandom.y * 6.28);
    wisp = wisp * 0.15 + 0.85;

    gl_FragColor = vec4(vColor * wisp, alpha);
  }
`;

// ─────────────────────────────────────────────
//  Geometry Data Builders
// ─────────────────────────────────────────────

/** Scatter points uniformly inside a unit sphere */
function createStarFieldData(count, colorPalette) {
  const positions = new Float32Array(count * 3);
  const randoms   = new Float32Array(count * 4);
  const colors    = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    let x, y, z, len;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      len = x * x + y * y + z * z;
    } while (len > 1 || len === 0);

    const r = Math.cbrt(Math.random());
    positions.set([x * r, y * r, z * r], i * 3);
    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

    const col = hexToRgb(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    colors.set(col, i * 3);
  }
  return { positions, randoms, colors };
}

/** Generate spiral-arm galaxy positions in local space */
function createGalaxySpiralData(count, radius, armCount) {
  const positions = new Float32Array(count * 3);
  const randoms   = new Float32Array(count * 4);
  const colors    = new Float32Array(count * 3);

  const spread = radius * 0.15;

  for (let i = 0; i < count; i++) {
    const arm = i % armCount;
    const t   = Math.pow(Math.random(), 0.6);   // denser toward centre
    const r   = t * radius;

    const armAngle    = (arm / armCount) * Math.PI * 2;
    const spiralAngle = armAngle + t * Math.PI * 3.5; // ~1.75 turns
    const jitter      = spread * (0.3 + 0.7 * t);

    const x = r * Math.cos(spiralAngle) + (Math.random() - 0.5) * jitter;
    const y = (Math.random() - 0.5) * 0.06 * radius; // thin disk
    const z = r * Math.sin(spiralAngle) + (Math.random() - 0.5) * jitter;

    positions.set([x, y, z], i * 3);
    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);

    // Warm core → blue-white outer
    const warmth = Math.pow(1 - t, 1.5);
    colors.set([
      1.0  * warmth + 0.55 * (1 - warmth),
      0.82 * warmth + 0.6  * (1 - warmth),
      0.45 * warmth + 0.95 * (1 - warmth),
    ], i * 3);
  }
  return { positions, randoms, colors };
}

/** Ring of orbiting accretion-disk particles (local space) */
function createAccretionDiskData(count, innerR, outerR) {
  const positions = new Float32Array(count * 3);
  const randoms   = new Float32Array(count * 4);
  const colors    = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r     = innerR + Math.random() * (outerR - innerR);

    positions.set([Math.cos(angle) * r, (Math.random() - 0.5) * 0.08, Math.sin(angle) * r], i * 3);
    randoms.set([Math.random(), Math.random(), angle / (Math.PI * 2), r / outerR], i * 4);

    // Hot-gas colour distribution
    const temp = Math.random();
    if (temp < 0.4)      colors.set([1.0, 0.5, 0.08], i * 3); // orange
    else if (temp < 0.7) colors.set([1.0, 0.8, 0.20], i * 3); // yellow
    else                 colors.set([0.3, 0.5, 1.00], i * 3); // blue jet
  }
  return { positions, randoms, colors };
}

// ─────────────────────────────────────────────
//  Stars Component
// ─────────────────────────────────────────────

const Stars = ({
  starCount           = 1500,
  brightStarCount     = 80,
  galaxyParticleCount = 600,
  nebulaCount         = 250,
  speed               = 0.08,
  moveOnHover         = true,
  cameraDistance       = 20,
  className           = "",
}) => {
  const containerRef = useRef(null);
  const mouseRef     = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Renderer & Camera ───────────────────
    const renderer = new Renderer({ depth: false, alpha: true });
    const gl       = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0, 0, 0, 0);

    const camera = new Camera(gl, { fov: 25 });
    camera.position.set(0, 0, cameraDistance);

    const scene = new Transform();

    // ── Resize ──────────────────────────────
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
    };
    window.addEventListener("resize", resize, false);
    resize();

    // ── Mouse Parallax ──────────────────────
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x:  ((e.clientX - rect.left) / rect.width)  * 2 - 1,
        y: -(((e.clientY - rect.top) / rect.height) * 2 - 1),
      };
    };
    if (moveOnHover) container.addEventListener("mousemove", handleMouseMove);

    // ═══════════════════════════════════════
    //  LAYER 1 — Nebula Clouds (back)
    // ═══════════════════════════════════════
    const nebData = createStarFieldData(nebulaCount, NEBULA_COLORS);
    const nebGeo  = new Geometry(gl, {
      position: { size: 3, data: nebData.positions },
      random:   { size: 4, data: nebData.randoms },
      color:    { size: 3, data: nebData.colors },
    });
    const nebProg = new Program(gl, {
      vertex: pointVertex, fragment: nebulaFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 12 }, uBaseSize: { value: 4000 } },
      transparent: true, depthTest: false,
    });
    const nebMesh = new Mesh(gl, { mode: gl.POINTS, geometry: nebGeo, program: nebProg });
    nebMesh.renderOrder = 0;
    nebMesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 2 — Star Field
    // ═══════════════════════════════════════
    const starData = createStarFieldData(starCount, STAR_COLORS);
    const starGeo  = new Geometry(gl, {
      position: { size: 3, data: starData.positions },
      random:   { size: 4, data: starData.randoms },
      color:    { size: 3, data: starData.colors },
    });
    const starProg = new Program(gl, {
      vertex: pointVertex, fragment: starFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 10 }, uBaseSize: { value: 80 } },
      transparent: true, depthTest: false,
    });
    const starMesh = new Mesh(gl, { mode: gl.POINTS, geometry: starGeo, program: starProg });
    starMesh.renderOrder = 1;
    starMesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 3 — Galaxy Spiral 1
    // ═══════════════════════════════════════
    const gal1Data = createGalaxySpiralData(galaxyParticleCount, 2.5, 3);
    const gal1Geo  = new Geometry(gl, {
      position: { size: 3, data: gal1Data.positions },
      random:   { size: 4, data: gal1Data.randoms },
      color:    { size: 3, data: gal1Data.colors },
    });
    const gal1Prog = new Program(gl, {
      vertex: galaxyVertex, fragment: galaxyFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 1 }, uBaseSize: { value: 200 } },
      transparent: true, depthTest: false,
    });
    const gal1Mesh = new Mesh(gl, { mode: gl.POINTS, geometry: gal1Geo, program: gal1Prog });
    gal1Mesh.position.set(-6, 3, -12);
    gal1Mesh.rotation.x = 0.8;
    gal1Mesh.rotation.z = 0.3;
    gal1Mesh.renderOrder = 2;
    gal1Mesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 4 — Galaxy Spiral 2
    // ═══════════════════════════════════════
    const gal2Data = createGalaxySpiralData(galaxyParticleCount, 1.8, 2);
    const gal2Geo  = new Geometry(gl, {
      position: { size: 3, data: gal2Data.positions },
      random:   { size: 4, data: gal2Data.randoms },
      color:    { size: 3, data: gal2Data.colors },
    });
    const gal2Prog = new Program(gl, {
      vertex: galaxyVertex, fragment: galaxyFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 1 }, uBaseSize: { value: 160 } },
      transparent: true, depthTest: false,
    });
    const gal2Mesh = new Mesh(gl, { mode: gl.POINTS, geometry: gal2Geo, program: gal2Prog });
    gal2Mesh.position.set(7, -4, -18);
    gal2Mesh.rotation.x = -0.5;
    gal2Mesh.rotation.z = -0.7;
    gal2Mesh.renderOrder = 3;
    gal2Mesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 5 — Black Hole (single large point)
    // ═══════════════════════════════════════
    const bhGeo = new Geometry(gl, {
      position: { size: 3, data: new Float32Array([0, 0, 0]) },
      random:   { size: 4, data: new Float32Array([0, 0, 0, 0]) },
      color:    { size: 3, data: new Float32Array([1, 1, 1]) },
    });
    const bhProg = new Program(gl, {
      vertex: pointVertex, fragment: blackHoleFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 1 }, uBaseSize: { value: 9000 } },
      transparent: true, depthTest: false,
    });
    const bhMesh = new Mesh(gl, { mode: gl.POINTS, geometry: bhGeo, program: bhProg });
    bhMesh.position.set(5, -1.5, -8);
    bhMesh.renderOrder = 4;
    bhMesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 6 — Accretion Disk Particles
    // ═══════════════════════════════════════
    const accData = createAccretionDiskData(60, 0.4, 1.5);
    const accGeo  = new Geometry(gl, {
      position: { size: 3, data: accData.positions },
      random:   { size: 4, data: accData.randoms },
      color:    { size: 3, data: accData.colors },
    });
    const accProg = new Program(gl, {
      vertex: accretionVertex, fragment: accretionFragment,
      uniforms: { uTime: { value: 0 }, uBaseSize: { value: 100 } },
      transparent: true, depthTest: false,
    });
    const accMesh = new Mesh(gl, { mode: gl.POINTS, geometry: accGeo, program: accProg });
    accMesh.position.set(5, -1.5, -8); // co-located with black hole
    accMesh.rotation.x = 0.5;
    accMesh.renderOrder = 5;
    accMesh.setParent(scene);

    // ═══════════════════════════════════════
    //  LAYER 7 — Bright Stars (foreground)
    // ═══════════════════════════════════════
    const brData = createStarFieldData(brightStarCount, BRIGHT_STAR_COLORS);
    const brGeo  = new Geometry(gl, {
      position: { size: 3, data: brData.positions },
      random:   { size: 4, data: brData.randoms },
      color:    { size: 3, data: brData.colors },
    });
    const brProg = new Program(gl, {
      vertex: pointVertex, fragment: brightStarFragment,
      uniforms: { uTime: { value: 0 }, uSpread: { value: 10 }, uBaseSize: { value: 350 } },
      transparent: true, depthTest: false,
    });
    const brMesh = new Mesh(gl, { mode: gl.POINTS, geometry: brGeo, program: brProg });
    brMesh.renderOrder = 6;
    brMesh.setParent(scene);

    // ═══════════════════════════════════════
    //  Animation Loop
    // ═══════════════════════════════════════
    const allProgs = [nebProg, starProg, gal1Prog, gal2Prog, bhProg, accProg, brProg];

    let animationFrameId;
    let lastTime = performance.now();
    let elapsed  = 0;

    const update = (t) => {
      animationFrameId = requestAnimationFrame(update);
      const delta = t - lastTime;
      lastTime    = t;
      elapsed    += delta * speed;
      const time  = elapsed * 0.001;

      // Push time to every program
      allProgs.forEach((p) => { p.uniforms.uTime.value = time; });

      // Black-hole breathing
      bhProg.uniforms.uBaseSize.value = 9000 + Math.sin(time * 0.3) * 600;

      // Galaxy orbital rotation
      gal1Mesh.rotation.y += 0.0003 * delta;
      gal2Mesh.rotation.y -= 0.0002 * delta;

      // Accretion-disk tilt wobble
      accMesh.rotation.z = Math.sin(time * 0.2) * 0.12;

      // Star field slow counter-rotation
      starMesh.rotation.z += 0.00005 * delta;

      // Mouse parallax
      if (moveOnHover) {
        scene.position.x = -mouseRef.current.x * 0.4;
        scene.position.y = -mouseRef.current.y * 0.4;
      }

      // Subtle ambient scene drift
      scene.rotation.x = Math.sin(time * 0.08) * 0.04;
      scene.rotation.y = Math.sin(time * 0.03) * 0.08;

      renderer.render({ scene, camera });
    };

    animationFrameId = requestAnimationFrame(update);

    // ═══════════════════════════════════════
    //  Cleanup (prevent VRAM leaks)
    // ═══════════════════════════════════════
    return () => {
      window.removeEventListener("resize", resize);
      if (moveOnHover) container.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      // Delete GPU buffers
      [nebGeo, starGeo, gal1Geo, gal2Geo, bhGeo, accGeo, brGeo].forEach((geo) => {
        if (!geo) return;
        Object.keys(geo.attributes).forEach((key) => {
          const attr = geo.attributes[key];
          if (attr && attr.buffer) gl.deleteBuffer(attr.buffer);
        });
      });

      // Delete shader programs
      allProgs.forEach((prog) => {
        if (prog && prog.gl) gl.deleteProgram(prog.program);
      });

      // Release WebGL context
      const loseCtx = gl.getExtension("WEBGL_lose_context");
      if (loseCtx) loseCtx.loseContext();

      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starCount, brightStarCount, galaxyParticleCount, nebulaCount, speed, moveOnHover, cameraDistance]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${className}`}
    />
  );
};

export default Stars;
