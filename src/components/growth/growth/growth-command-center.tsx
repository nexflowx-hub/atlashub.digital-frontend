"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Users,
  Heart,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  commandCenterKpis,
  socialChannels,
} from "@/lib/growth/catalog";
import { accentTokenMap } from "@/lib/growth/types";

/**
 * GrowthCommandCenter
 * Premium glass dashboard panel shown on the right of the hero.
 * All numbers are illustrative UI / demonstration data.
 */

const reachSeries = [22, 30, 28, 41, 38, 52, 60, 58, 72, 80, 78, 96];
const barSeries = [40, 55, 48, 70, 62, 85, 78];

const CHART_W = 280;
const CHART_H = 70;
const CHART_PAD_X = 8;
const CHART_PAD_Y = 6;
const CHART_INNER_W = CHART_W - CHART_PAD_X * 2;
const CHART_INNER_H = CHART_H - CHART_PAD_Y * 2;

function buildPaddedLinePath(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = CHART_INNER_W / (values.length - 1);
  return values
    .map((v, i) => {
      const x = CHART_PAD_X + i * stepX;
      const y =
        CHART_PAD_Y + CHART_INNER_H - ((v - min) / span) * CHART_INNER_H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function lastPoint(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const stepX = CHART_INNER_W / (values.length - 1);
  return {
    x: CHART_PAD_X + (values.length - 1) * stepX,
    y: CHART_PAD_Y + CHART_INNER_H - ((values[values.length - 1] - min) / span) * CHART_INNER_H,
  };
}

function KpiTile({
  icon: Icon,
  label,
  value,
  delta,
  accent,
  delay,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  delta: string;
  accent: keyof typeof accentTokenMap;
  delay: number;
}) {
  const tokens = accentTokenMap[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card relative overflow-hidden rounded-xl p-3.5"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
            tokens.bg,
          )}
        >
          <Icon className={cn("h-3 w-3", tokens.text)} />
        </span>
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-mono text-2xl font-semibold tracking-tight text-white">
          {value}
        </span>
        <span className={cn("text-[11px] font-medium", tokens.text)}>
          {delta}
        </span>
      </div>
    </motion.div>
  );
}

export function GrowthCommandCenter() {
  const reduce = useReducedMotion();
  const linePath = buildPaddedLinePath(reachSeries);
  const endDot = lastPoint(reachSeries);
  const lineLength = 600;
  const areaPath = `${linePath} L${CHART_PAD_X + CHART_INNER_W},${CHART_H - CHART_PAD_Y} L${CHART_PAD_X},${CHART_H - CHART_PAD_Y} Z`;

  return (
    <div className="glass-panel luminous-border relative w-full overflow-hidden rounded-3xl p-5 sm:p-6">
      {/* ambient top glow */}
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/30">
            <Activity className="h-4 w-4 text-emerald-300" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              AtlasHub
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              Growth Command Center
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
            Live
          </span>
        </div>
      </div>

      {/* Authority Score + mini stats */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-5">
        {/* Authority gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card relative flex flex-col items-center justify-center rounded-2xl p-4 sm:col-span-2"
        >
          <div className="relative h-28 w-28">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="url(#authGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 50}
                initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 50 * (1 - commandCenterKpis.authorityScore / 100),
                }}
                transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="authGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-semibold text-white">
                {commandCenterKpis.authorityScore}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                / 100
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              Authority Score
            </span>
          </div>
        </motion.div>

        {/* KPI tiles */}
        <div className="grid grid-cols-1 gap-3 sm:col-span-3 sm:grid-cols-3">
          <KpiTile
            icon={TrendingUp}
            label="Reach"
            value={commandCenterKpis.reachDelta}
            delta="vs base"
            accent="emerald"
            delay={0.18}
          />
          <KpiTile
            icon={Users}
            label="Leads"
            value={String(commandCenterKpis.leads)}
            delta="/ mo"
            accent="teal"
            delay={0.26}
          />
          <KpiTile
            icon={Heart}
            label="Engagement"
            value={commandCenterKpis.engagement}
            delta="avg"
            accent="cyan"
            delay={0.34}
          />
        </div>
      </div>

      {/* Animated chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card mt-4 rounded-2xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Reach — 12 weeks
            </span>
          </div>
          <span className="font-mono text-[10px] font-medium text-emerald-300">
            ▲ {commandCenterKpis.reachDelta}
          </span>
        </div>
        <div className="relative mt-3 h-[78px] w-full">
          <svg
            viewBox="0 0 280 70"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(52,211,153,0.35)" />
                <stop offset="100%" stopColor="rgba(52,211,153,0)" />
              </linearGradient>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            {/* gridlines */}
            {[14, 35, 56].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="280"
                y2={y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            ))}
            <motion.path
              d={areaPath}
              fill="url(#areaGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
            <motion.path
              d={linePath}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={lineLength}
              initial={{ strokeDashoffset: reduce ? 0 : lineLength }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.6, delay: 0.6, ease: "easeInOut" }}
            />
            {/* end dot */}
            <motion.circle
              cx={endDot.x}
              cy={endDot.y}
              r="3.5"
              fill="#34d399"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.4 }}
            />
          </svg>
        </div>
        {/* mini bar row */}
        <div className="mt-3 flex h-8 items-end gap-1.5">
          {barSeries.map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-teal-400/70"
              initial={{ height: reduce ? `${v}%` : 0 }}
              animate={{ height: `${v}%` }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.06 }}
            />
          ))}
        </div>
      </motion.div>

      {/* Social channel progress rows */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 space-y-2.5"
      >
        {socialChannels.map((ch) => {
          const tokens = accentTokenMap[ch.accent];
          return (
            <div
              key={ch.id}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
            >
              <div className="flex w-28 shrink-0 flex-col leading-tight">
                <span className="text-xs font-medium text-white">
                  {ch.name}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {ch.handle}
                </span>
              </div>
              <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className={cn("absolute inset-y-0 left-0 rounded-full", tokens.bg)}
                  style={{ backgroundColor: tokens.raw }}
                  initial={{ width: reduce ? `${ch.progress}%` : 0 }}
                  animate={{ width: `${ch.progress}%` }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
              <span className="w-9 shrink-0 text-right font-mono text-xs text-white/70">
                {ch.progress}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* AI Optimization status */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-4 flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-3.5 py-3"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/15 ring-1 ring-inset ring-emerald-400/30">
            <Cpu className="h-4 w-4 text-emerald-300" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-medium text-white">
              AI Optimization
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              Tuning content & bids
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300">
            Active
          </span>
        </div>
      </motion.div>

      {/* Demo disclaimer */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-white/30" />
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
          Demo interface — illustrative data
        </span>
        <span className="h-1 w-1 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

export default GrowthCommandCenter;
