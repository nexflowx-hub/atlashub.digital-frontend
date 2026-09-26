"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { accentTokenMap } from "@/lib/growth/types";
import { impactMetrics } from "@/lib/growth/catalog";
import {
  GrowthSectionShell,
  GrowthEyebrow,
} from "@/components/growth/growth-section-shell";

/**
 * GrowthImpact
 * Demonstration impact metrics + a premium before/after Social Presence card.
 * All figures are illustrative UI data — NOT historical AtlasHub customer results.
 */
export function GrowthImpact() {
  const reduce = useReducedMotion();

  return (
    <GrowthSectionShell id="impact">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* LEFT — narrative + 2x2 metric tiles */}
        <div className="flex flex-col">
          <GrowthEyebrow>Demonstration</GrowthEyebrow>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Growth you can <span className="gradient-text-emerald">measure</span>
          </h2>

          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Illustrative performance from a demonstration account. Not
            historical customer results.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
            {impactMetrics.map((m, i) => {
              const token = accentTokenMap[m.accent];
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="glass-card rounded-xl p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-2xl font-semibold sm:text-3xl",
                      token.text,
                    )}
                  >
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{m.delta}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — premium before/after Social Presence card */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-emerald-500/10 blur-3xl sm:-inset-4" />

          <div className="glass-panel luminous-border rounded-2xl p-5 sm:p-6">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Social Presence
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/70">
                Before / After
              </span>
            </div>

            {/* Before / After inner grid */}
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* BEFORE */}
              <div className="rounded-xl border border-white/8 bg-white/[0.015] p-4 opacity-70">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Before
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Followers
                    </span>
                    <span className="font-mono text-sm text-white/60">1.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Engagement
                    </span>
                    <span className="font-mono text-sm text-white/60">1.1%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Reach</span>
                    <span className="font-mono text-sm text-white/60">3.0K</span>
                  </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.05] p-4 shadow-[0_0_40px_-12px_rgba(16,185,129,0.4)]">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                  After
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Followers
                    </span>
                    <span className="font-mono text-sm text-emerald-200">
                      9.8K
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Engagement
                    </span>
                    <span className="font-mono text-sm text-emerald-200">
                      6.4%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Reach</span>
                    <span className="font-mono text-sm text-emerald-200">
                      68K
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
                Demonstration content
              </span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </GrowthSectionShell>
  );
}

export default GrowthImpact;
