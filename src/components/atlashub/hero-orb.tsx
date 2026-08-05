'use client';

import { useCallback, useEffect, useRef } from 'react';

// ─── Icosahedron geometry ─────────────────────────────────────────
// Golden ratio φ = (1 + √5) / 2
const PHI = (1 + Math.sqrt(5)) / 2;
const NORM = 1 / Math.sqrt(1 + PHI * PHI); // normalize to unit sphere ≈ 0.5257

// 12 vertices of a regular icosahedron (normalized)
const icosaVertices: [number, number, number][] = [
  [0, 1, PHI],
  [0, 1, -PHI],
  [0, -1, PHI],
  [0, -1, -PHI],
  [1, PHI, 0],
  [1, -PHI, 0],
  [-1, PHI, 0],
  [-1, -PHI, 0],
  [PHI, 0, 1],
  [PHI, 0, -1],
  [-PHI, 0, 1],
  [-PHI, 0, -1],
].map(([x, y, z]) => [x * NORM, y * NORM, z * NORM] as [number, number, number]);

// 30 edges: pairs of vertex indices that are distance 2 apart (before normalization)
const icosaEdges: [number, number][] = [
  [0, 2], [0, 4], [0, 6], [0, 8], [0, 10],
  [1, 3], [1, 4], [1, 6], [1, 9], [1, 11],
  [2, 5], [2, 7], [2, 8], [2, 10],
  [3, 5], [3, 7], [3, 9], [3, 11],
  [4, 6], [4, 8], [4, 9],
  [5, 7], [5, 8], [5, 9],
  [6, 10], [6, 11],
  [7, 10], [7, 11],
  [8, 9],
  [10, 11],
];

// ─── Orbit particles ───────────────────────────────────────────────
interface OrbitParticle {
  radius: number;     // orbital radius (1.4 – 2.2)
  speed: number;      // angular speed
  phase: number;      // starting angle
  tiltX: number;      // orbital plane tilt X
  tiltZ: number;      // orbital plane tilt Z
  size: number;       // particle size
  opacity: number;    // base opacity
}

function createOrbitParticles(count: number): OrbitParticle[] {
  const particles: OrbitParticle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      radius: 1.4 + Math.random() * 0.8,
      speed: 0.15 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      tiltX: (Math.random() - 0.5) * Math.PI * 0.6,
      tiltZ: (Math.random() - 0.5) * Math.PI * 0.6,
      size: 0.8 + Math.random() * 1.5,
      opacity: 0.2 + Math.random() * 0.5,
    });
  }
  return particles;
}

// ─── 3D Math helpers ───────────────────────────────────────────────
function rotateY(x: number, y: number, z: number, angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c + z * s, y, -x * s + z * c];
}

function rotateX(x: number, y: number, z: number, angle: number): [number, number, number] {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x, y * c - z * s, y * s + z * c];
}

function project(
  x: number,
  y: number,
  z: number,
  cx: number,
  cy: number,
  scale: number,
  fov: number,
): [number, number, number] {
  const perspective = fov / (fov + z);
  return [x * scale * perspective + cx, y * scale * perspective + cy, z];
}

// ─── Color helpers ─────────────────────────────────────────────────
function lerpColor(z: number, minZ: number, maxZ: number): string {
  // Map z-depth to opacity and hue shift
  const t = maxZ !== minZ ? (z - minZ) / (maxZ - minZ) : 0.5; // 0 = far, 1 = near
  const r = Math.round(5 + t * 47);    // 5 → 52 (emerald-600 → emerald-400)
  const g = Math.round(150 + t * 61);  // 150 → 211
  const b = Math.round(105 + t * 48);  // 105 → 153
  return `rgba(${r}, ${g}, ${b}, ${0.25 + t * 0.55})`;
}

// ─── Component ─────────────────────────────────────────────────────
export function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<OrbitParticle[]>([]);
  const animRef = useRef(0);

  const initParticles = useCallback(() => {
    if (particlesRef.current.length === 0) {
      particlesRef.current = createOrbitParticles(24);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    initParticles();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Sizing ──
    const setSize = () => {
      const w = container.clientWidth;
      const size = w >= 1024 ? 320 : 280;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    // ── Mouse tracking on container ──
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,  // -1 to 1
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 };
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', setSize);

    // ── Animation constants ──
    const Y_SPEED = 0.00035;           // main Y rotation (rad/ms)
    const X_WOBBLE_SPEED = 0.00025;   // X wobble speed
    const X_WOBBLE_AMP = 0.35;        // X wobble amplitude in radians (~20°)
    const MOUSE_SENSITIVITY = 0.26;   // max ±15° ≈ 0.26 rad
    const PULSE_SPEED = 0.0008;       // pulse frequency
    const PULSE_AMP = 0.04;           // ±4% scale
    const FOV = 3.5;
    const particles = particlesRef.current;

    let startTime = performance.now();

    // ── Render loop ──
    const draw = (now: number) => {
      const elapsed = now - startTime;
      const size = parseInt(canvas.style.width, 10);
      const cx = size / 2;
      const cy = size / 2;
      const scale = size * 0.32;

      // Smooth mouse (lerp)
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * 0.06;
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * 0.06;

      // Compute rotation angles
      const rotY = elapsed * Y_SPEED;
      const rotX = Math.sin(elapsed * X_WOBBLE_SPEED) * X_WOBBLE_AMP;
      const mouseRotX = smoothMouseRef.current.y * MOUSE_SENSITIVITY;
      const mouseRotY = smoothMouseRef.current.x * MOUSE_SENSITIVITY;

      // Pulse
      const pulse = 1 + Math.sin(elapsed * PULSE_SPEED) * PULSE_AMP;

      // Clear
      ctx.clearRect(0, 0, size, size);

      // ── Inner glow sphere ──
      const glowRadius = scale * 0.7 * pulse;
      const innerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
      innerGlow.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      innerGlow.addColorStop(0.4, 'rgba(16, 185, 129, 0.06)');
      innerGlow.addColorStop(0.7, 'rgba(5, 150, 105, 0.02)');
      innerGlow.addColorStop(1, 'rgba(5, 150, 105, 0)');
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // ── Transform vertices ──
      const transformed: [number, number, number][] = icosaVertices.map(([vx, vy, vz]) => {
        let [x, y, z] = rotateY(vx, vy, vz, rotY + mouseRotY);
        [x, y, z] = rotateX(x, y, z, rotX + mouseRotX);
        // Apply pulse
        x *= pulse;
        y *= pulse;
        z *= pulse;
        return [x, y, z];
      });

      // Project vertices
      const projected: [number, number, number][] = transformed.map(([x, y, z]) =>
        project(x, y, z, cx, cy, scale, FOV),
      );

      // Find z range for depth coloring
      let minZ = Infinity;
      let maxZ = -Infinity;
      for (const [, , z] of transformed) {
        if (z < minZ) minZ = z;
        if (z > maxZ) maxZ = z;
      }
      // Expand slightly to avoid edge cases
      const zRange = maxZ - minZ;
      minZ -= zRange * 0.05;
      maxZ += zRange * 0.05;

      // ── Draw edges with depth-based gradient ──
      for (const [a, b] of icosaEdges) {
        const [x1, y1, z1] = projected[a];
        const [x2, y2, z2] = projected[b];
        const avgZ = (z1 + z2) / 2;
        const color = lerpColor(avgZ, minZ, maxZ);

        // Line width varies with depth
        const depthT = maxZ !== minZ ? (avgZ - minZ) / (maxZ - minZ) : 0.5;
        const lineWidth = 0.6 + depthT * 1.2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }

      // ── Draw vertex glow particles ──
      for (let i = 0; i < projected.length; i++) {
        const [px, py, z] = projected[i];
        const depthT = maxZ !== minZ ? (z - minZ) / (maxZ - minZ) : 0.5;
        const baseRadius = 1.5 + depthT * 1.5;
        const glowSize = baseRadius * (2.5 + Math.sin(elapsed * 0.003 + i * 1.2) * 0.5);

        // Outer glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        glow.addColorStop(0, `rgba(52, 211, 153, ${0.6 + depthT * 0.4})`);
        glow.addColorStop(0.4, `rgba(16, 185, 129, ${0.2 + depthT * 0.2})`);
        glow.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(255, 255, 255, ${0.6 + depthT * 0.4})`;
        ctx.beginPath();
        ctx.arc(px, py, baseRadius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Draw orbit particles ──
      for (const p of particles) {
        const angle = elapsed * 0.001 * p.speed + p.phase;

        // Position on orbital circle
        let ox = Math.cos(angle) * p.radius;
        let oy = Math.sin(angle) * p.radius * 0.3; // flatten orbit
        let oz = Math.sin(angle) * p.radius;

        // Apply orbital tilt
        [ox, oy, oz] = rotateX(ox, oy, oz, p.tiltX);
        [ox, oy, oz] = rotateY(ox, oy, oz, p.tiltZ);

        // Apply icosahedron rotation
        [ox, oy, oz] = rotateY(ox, oy, oz, rotY + mouseRotY);
        [ox, oy, oz] = rotateX(ox, oy, oz, rotX + mouseRotX);
        ox *= pulse;
        oy *= pulse;
        oz *= pulse;

        // Project
        const perspective = FOV / (FOV + oz);
        const sx = ox * scale * perspective + cx;
        const sy = oy * scale * perspective + cy;

        // Depth-based appearance
        const depthFactor = (oz + 2.5) / 5; // rough 0-1 mapping
        const alpha = p.opacity * Math.max(0.1, Math.min(1, depthFactor + 0.3));
        const sz = p.size * perspective;

        // Particle glow
        const pGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, sz * 2.5);
        pGlow.addColorStop(0, `rgba(52, 211, 153, ${alpha})`);
        pGlow.addColorStop(0.5, `rgba(16, 185, 129, ${alpha * 0.4})`);
        pGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = pGlow;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Particle core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(sx, sy, sz * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Outer ambient glow ──
      const outerGlow = ctx.createRadialGradient(cx, cy, size * 0.15, cx, cy, size * 0.5);
      outerGlow.addColorStop(0, 'rgba(16, 185, 129, 0.03)');
      outerGlow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', setSize);
    };
  }, [initParticles]);

  return (
    <div ref={containerRef} className="relative">
      <canvas ref={canvasRef} className="pointer-events-none" aria-hidden="true" />
    </div>
  );
}
