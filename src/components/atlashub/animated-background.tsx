'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * Premium animated background with 3D wireframe cube,
 * floating particles, grid pattern overlay, and emerald radial glow.
 * Designed to sit behind hero content – subtle, not distracting.
 */
export function AnimatedBackground() {
  // Generate stable particle positions on mount only
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 25,
      delay: Math.random() * 10,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Subtle emerald radial glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 'min(900px, 90vw)',
          height: 'min(900px, 90vh)',
          background:
            'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 6%) 0%, oklch(0.7 0.18 160 / 2%) 40%, transparent 70%)',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="grid-pattern absolute inset-0 opacity-60" />

      {/* Floating particle dots – CSS-driven, GPU-accelerated */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-emerald-500/20"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              willChange: 'transform',
            }}
            animate={{
              x: [0, p.driftX, 0],
              y: [0, p.driftY, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* 3D Wireframe Cube – centred, subtle, emerald-tinted edges */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative"
          style={{
            width: 200,
            height: 200,
            perspective: 800,
            willChange: 'transform',
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {/* 6 cube faces as wireframe borders */}
            {/* Front face */}
            <div
              className="absolute inset-0 border border-emerald-500/15"
              style={{ transform: 'translateZ(100px)' }}
            />
            {/* Back face */}
            <div
              className="absolute inset-0 border border-emerald-500/10"
              style={{ transform: 'translateZ(-100px) rotateY(180deg)' }}
            />
            {/* Right face */}
            <div
              className="absolute inset-0 border border-emerald-500/12"
              style={{
                transform: 'rotateY(90deg) translateZ(100px)',
              }}
            />
            {/* Left face */}
            <div
              className="absolute inset-0 border border-emerald-500/12"
              style={{
                transform: 'rotateY(-90deg) translateZ(100px)',
              }}
            />
            {/* Top face */}
            <div
              className="absolute inset-0 border border-emerald-500/12"
              style={{
                transform: 'rotateX(90deg) translateZ(100px)',
              }}
            />
            {/* Bottom face */}
            <div
              className="absolute inset-0 border border-emerald-500/10"
              style={{
                transform: 'rotateX(-90deg) translateZ(100px)',
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
