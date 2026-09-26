"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * GrowthBackground
 *
 * Premium atmospheric background for the AtlasHub Growth experience:
 *  - subtle emerald/teal digital "data" rain (canvas)
 *  - soft emerald + teal radial glow fields
 *  - faint grid + dot data texture
 *  - slow atmospheric scan beam (desktop only)
 *  - dark vignette for depth
 *
 * Constraints honoured:
 *  - prefers-reduced-motion → static frame, no rAF loop, no pulsing glow
 *  - document.hidden → rAF paused
 *  - mobile → reduced rain density / opacity, no scan beam
 *  - DPR capped at 2, columns throttled, single rAF loop
 *  - no video, GPU-friendly
 */

const GLYPHS =
  "0123456789ABCDEFabcdef·•/<>{}[]()=+*#$%@&πΣΔΩαβγλμ+-:.";

type RainColumn = {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
};

export function GrowthBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    let width = 0;
    let height = 0;
    let columns: RainColumn[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const fontSize = isMobile ? 12 : 13;
    const colGap = isMobile ? 16 : 15;

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colCount = Math.max(8, Math.floor(width / colGap));
      const density = isMobile ? 0.32 : 0.5; // fraction of columns active
      columns = [];
      for (let i = 0; i < colCount; i++) {
        if (Math.random() > density) continue;
        const len = Math.floor(8 + Math.random() * (isMobile ? 10 : 18));
        columns.push({
          x: i * colGap + colGap / 2,
          y: Math.random() * -height,
          speed: (isMobile ? 0.4 : 0.55) + Math.random() * 0.6,
          length: len,
          chars: Array.from(
            { length: len },
            () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          ),
        });
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px var(--font-geist-mono), ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "center";

      const baseAlpha = isMobile ? 0.12 : 0.18;

      for (const col of columns) {
        for (let i = 0; i < col.length; i++) {
          const y = col.y - i * fontSize;
          if (y < -fontSize || y > height + fontSize) continue;
          const isHead = i === 0;
          if (isHead) {
            ctx.fillStyle = `rgba(167,243,208,${baseAlpha + 0.22})`; // mint head
          } else {
            const fade = 1 - i / col.length;
            const a = baseAlpha * fade;
            // alternate emerald/teal subtly by column position
            const teal = (col.x / colGap) % 3 === 0;
            ctx.fillStyle = teal
              ? `rgba(94,234,212,${a})`
              : `rgba(52,211,153,${a})`;
          }
          ctx.fillText(col.chars[i] ?? "0", col.x, y);
        }
        col.y += col.speed;
        // recycle + occasionally mutate a glyph
        if (col.y - col.length * fontSize > height) {
          col.y = Math.random() * -height * 0.5;
          for (let k = 0; k < col.length; k++) {
            if (Math.random() < 0.3)
              col.chars[k] =
                GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        } else if (Math.random() < 0.04) {
          const idx = Math.floor(Math.random() * col.length);
          col.chars[idx] = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
    };

    let running = true;
    const loop = () => {
      if (!running) return;
      if (!document.hidden) drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    };

    setup();

    if (reduceMotion) {
      // single static frame, no loop
      drawFrame();
    } else {
      loop();
    }

    const handleResize = () => {
      setup();
      if (reduceMotion) drawFrame();
    };
    const handleVisibility = () => {
      // rAF already checks document.hidden; nothing else needed
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {/* Base graphite wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Emerald radial glow — top left */}
      <div
        className="absolute -top-1/4 -left-1/4 h-[80vh] w-[80vh] rounded-full opacity-70 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.16 162 / 0.22) 0%, transparent 65%)",
        }}
      />
      {/* Teal radial glow — bottom right */}
      <div
        className="absolute -bottom-1/4 -right-1/4 h-[70vh] w-[70vh] rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.11 190 / 0.18) 0%, transparent 65%)",
        }}
      />
      {/* Center subtle emerald haze */}
      <div
        className="absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 rounded-full opacity-40 blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.74 0.16 162 / 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Faint grid texture */}
      <div className="absolute inset-0 grid-texture opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      {/* Digital data rain */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_85%)] motion-reduce:opacity-40"
      />

      {/* Dot texture overlay for "data" feel */}
      <div className="absolute inset-0 dot-texture opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_90%)]" />

      {/* Desktop scan beam */}
      <div className="absolute left-0 right-0 top-1/4 hidden h-px overflow-hidden md:block">
        <div className="absolute inset-0 scanline opacity-40 animate-scan" />
      </div>

      {/* Dark vignette for depth & readability */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}

export default GrowthBackground;
