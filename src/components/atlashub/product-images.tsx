'use client';

import { useMemo } from 'react';

/* ------------------------------------------------------------------ */
/*  Product visual headers – CSS gradient + SVG pattern compositions   */
/*  Each returns an SVG React element sized to fill a card header.     */
/* ------------------------------------------------------------------ */

import type { ReactNode } from 'react';

const GRADIENTS: Record<string, { stops: [string, string, string]; pattern: string }> = {
  ecommerce: {
    stops: ['#059669', '#10b981', '#34d399'],
    pattern: 'grid',
  },
  dashboard: {
    stops: ['#0f766e', '#14b8a6', '#5eead4'],
    pattern: 'bars',
  },
  marketplace: {
    stops: ['#065f46', '#10b981', '#6ee7b7'],
    pattern: 'nodes',
  },
  ai: {
    stops: ['#064e3b', '#10b981', '#a7f3d0'],
    pattern: 'circuits',
  },
  workflow: {
    stops: ['#065f46', '#059669', '#34d399'],
    pattern: 'flow',
  },
  api: {
    stops: ['#022c22', '#047857', '#10b981'],
    pattern: 'hex',
  },
  bi: {
    stops: ['#064e3b', '#0d9488', '#2dd4bf'],
    pattern: 'chart',
  },
  crm: {
    stops: ['#0f766e', '#14b8a6', '#99f6e4'],
    pattern: 'network',
  },
};

function PatternGrid() {
  const lines = useMemo(() => {
    const l: ReactNode[] = [];
    for (let i = 0; i <= 6; i++) {
      const p = (i / 6) * 100;
      l.push(<line key={`h${i}`} x1="0%" y1={`${p}%`} x2="100%" y2={`${p}%`} stroke="white" strokeWidth="0.5" opacity="0.08" />);
      l.push(<line key={`v${i}`} x1={`${p}%`} y1="0%" x2={`${p}%`} y2="100%" stroke="white" strokeWidth="0.5" opacity="0.08" />);
    }
    return l;
  }, []);
  return <>{lines}</>;
}

function PatternBars() {
  const bars = useMemo(() => {
    const b: ReactNode[] = [];
    const heights = [45, 70, 55, 85, 40, 65, 50, 75];
    for (let i = 0; i < 8; i++) {
      const x = 8 + i * 12;
      const h = heights[i];
      b.push(
        <rect
          key={i}
          x={`${x}%`}
          y={`${100 - h}%`}
          width="6%"
          height={`${h}%`}
          rx="3"
          fill="white"
          opacity={0.06 + (h / 100) * 0.06}
        />
      );
    }
    return b;
  }, []);
  return <>{bars}</>;
}

function PatternNodes() {
  const nodes = useMemo(() => {
    const n: ReactNode[] = [];
    const pts = [[20, 30], [50, 15], [80, 35], [35, 60], [65, 55], [25, 85], [75, 80]];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dist = Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]);
        if (dist < 45) {
          n.push(
            <line key={`l${i}-${j}`} x1={`${pts[i][0]}%`} y1={`${pts[i][1]}%`} x2={`${pts[j][0]}%`} y2={`${pts[j][1]}%`} stroke="white" strokeWidth="0.5" opacity="0.1" />
          );
        }
      }
      n.push(
        <circle key={`n${i}`} cx={`${pts[i][0]}%`} cy={`${pts[i][1]}%`} r="3" fill="white" opacity="0.15" />
      );
    }
    return n;
  }, []);
  return <>{nodes}</>;
}

function PatternCircuits() {
  return (
    <>
      <rect x="10%" y="20%" width="25%" height="15%" rx="3" fill="none" stroke="white" strokeWidth="0.6" opacity="0.1" />
      <rect x="45%" y="55%" width="30%" height="12%" rx="3" fill="none" stroke="white" strokeWidth="0.6" opacity="0.1" />
      <circle cx="60%" cy="30%" r="12" fill="none" stroke="white" strokeWidth="0.6" opacity="0.12" />
      <line x1="35%" y1="27%" x2="48%" y2="30%" stroke="white" strokeWidth="0.5" opacity="0.08" />
      <line x1="60%" y1="42%" x2="60%" y2="55%" stroke="white" strokeWidth="0.5" opacity="0.08" />
      <circle cx="20%" cy="70%" r="8" fill="none" stroke="white" strokeWidth="0.6" opacity="0.1" />
      <circle cx="85%" cy="65%" r="6" fill="white" opacity="0.06" />
      <text x="60%" y="34%" textAnchor="middle" fill="white" opacity="0.12" fontSize="8" fontFamily="monospace">AI</text>
    </>
  );
}

function PatternFlow() {
  return (
    <>
      {[25, 50, 75].map((y, i) => (
        <g key={i}>
          <rect x={`${5 + i * 5}%`} y={`${y - 3}%`} width="20%" height="6%" rx="3" fill="white" opacity="0.07" />
          <line x1={`${25 + i * 5}%`} y1={`${y}%`} x2={`${30 + i * 5}%`} y2={`${y}%`} stroke="white" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2" />
          <polygon points={`${32 + i * 5}%,${y - 2}%} ${35 + i * 5}%,${y}%} ${32 + i * 5}%,${y + 2}%`} fill="white" opacity="0.12" />
        </g>
      ))}
    </>
  );
}

function PatternHex() {
  const hexes = useMemo(() => {
    const h: ReactNode[] = [];
    const centers = [[30, 25], [60, 20], [80, 45], [25, 60], [55, 70], [75, 75]];
    for (const [cx, cy] of centers) {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return `${cx + Math.cos(a) * 10},${cy + Math.sin(a) * 10}`;
      }).join(' ');
      h.push(<polygon key={`${cx}-${cy}`} points={pts} fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />);
    }
    return h;
  }, []);
  return <>{hexes}</>;
}

function PatternChart() {
  const points = useMemo(() => {
    const pts: [number, number][] = [[10, 70], [25, 55], [40, 65], [55, 35], [70, 45], [85, 25]];
    const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]}%,${p[1]}%`).join(' ');
    const area = `${path} L85%,95% L10%,95% Z`;
    return (
      <>
        <path d={area} fill="white" opacity="0.04" />
        <path d={path} fill="none" stroke="white" strokeWidth="1" opacity="0.12" />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r="2.5" fill="white" opacity="0.2" />
        ))}
      </>
    );
  }, []);
  return points;
}

function PatternNetwork() {
  const nodes = useMemo(() => {
    const pts = [[50, 20], [25, 40], [75, 40], [15, 65], [40, 70], [60, 70], [85, 65], [50, 90]];
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [4, 7], [5, 7], [6, 7], [3, 4], [5, 6]];
    return (
      <>
        {edges.map(([a, b], i) => (
          <line key={i} x1={`${pts[a][0]}%`} y1={`${pts[a][1]}%`} x2={`${pts[b][0]}%`} y2={`${pts[b][1]}%`} stroke="white" strokeWidth="0.5" opacity="0.08" />
        ))}
        {pts.map(([x, y], i) => (
          <circle key={`n${i}`} cx={`${x}%`} cy={`${y}%`} r={i === 0 ? '5' : '3'} fill="white" opacity={i === 0 ? '0.2' : '0.12'} />
        ))}
      </>
    );
  }, []);
  return nodes;
}

const PATTERN_MAP: Record<string, () => ReactNode> = {
  grid: PatternGrid,
  bars: PatternBars,
  nodes: PatternNodes,
  circuits: PatternCircuits,
  flow: PatternFlow,
  hex: PatternHex,
  chart: PatternChart,
  network: PatternNetwork,
};

export function ProductImage({ type, alt }: { type: string; alt: string }) {
  const config = GRADIENTS[type] ?? GRADIENTS.ecommerce;
  const PatternComponent = PATTERN_MAP[config.pattern] ?? PatternGrid;

  return (
    <svg
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid slice"
      className="h-36 w-full rounded-t-xl"
      role="img"
      aria-label={alt}
    >
      <defs>
        <linearGradient id={`grad-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={config.stops[0]} />
          <stop offset="50%" stopColor={config.stops[1]} />
          <stop offset="100%" stopColor={config.stops[2]} />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#grad-${type})`} />
      <PatternComponent />
      {/* Subtle vignette */}
      <rect width="400" height="200" fill="url(#vignette)" />
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}
