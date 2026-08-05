'use client';

import { useEffect, useRef } from 'react';

/**
 * Canvas-based falling letters/symbols animation (digital rain style).
 * Adapted from iahub360 matrix-bg concept with AtlasHub emerald theme.
 * Renders katakana, digits, hex letters, and programming symbols
 * falling across the full viewport as a subtle background texture.
 */
export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let columns: number;
    let drops: number[];

    const fontSize = 14;
    const chars =
      'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[];:';
    const maxSpeed = 0.5;

    // Emerald theme colors
    const colorBright = '#34d399'; // emerald-400 – leading head
    const colorDim = 'rgba(16, 185, 129, 0.35)'; // emerald-500 at 35%

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      // Staggered entry – new drops start at random negative offsets
      drops = Array(columns)
        .fill(0)
        .map(() => Math.random() * -100);
    };

    const draw = () => {
      if (!canvas || !ctx) return;

      // Semi-transparent overlay creates trail/fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        // Skip delayed columns (negative drops) – advance but don't draw
        if (drops[i] < 0) {
          drops[i] += maxSpeed + Math.random() * 0.5;
          continue;
        }

        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Three-tier brightness for depth effect
        const brightness = Math.random();
        if (brightness > 0.95) {
          // Bright white head – 5% chance
          ctx.fillStyle = '#ffffff';
          ctx.font = `${fontSize}px "Geist Mono", monospace`;
        } else if (brightness > 0.7) {
          // Bright emerald – 25% chance
          ctx.fillStyle = colorBright;
          ctx.font = `${fontSize}px "Geist Mono", monospace`;
        } else {
          // Dim emerald trail – 70% chance
          ctx.fillStyle = colorDim;
          ctx.font = `${fontSize - 2}px "Geist Mono", monospace`;
        }

        ctx.fillText(char, x, y);

        // Stochastic reset to top – organic variation in stream length
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i] += maxSpeed + Math.random() * 0.5;
      }
    };

    // Initial setup
    resize();

    // Seed drops at random positions so animation is immediately visible
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * (canvas.height / fontSize);
    }

    // Start render loop
    animationId = window.requestAnimationFrame(function loop() {
      draw();
      animationId = window.requestAnimationFrame(loop);
    });

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.12 }}
      aria-hidden="true"
    />
  );
}
