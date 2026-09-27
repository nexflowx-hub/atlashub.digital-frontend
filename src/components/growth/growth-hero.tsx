"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Compass, BarChart3 } from "lucide-react";
import { GrowthCommandCenter } from "./growth-command-center";
import { GrowthPrimaryCTA, GrowthSecondaryCTA } from "./growth-cta";
import { smoothEase } from "@/lib/motion";

/**
 * GrowthHero — full-viewport, two-column (desktop) / stacked (mobile).
 * Left: eyebrow, headline, body, primary + secondary CTAs.
 * Right: Growth Command Center glass panel.
 */
export function GrowthHero() {
  const reduce = useReducedMotion();

  const leftVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: smoothEase },
    },
  };
  const rightVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: 0.15, ease: smoothEase },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100vh-6rem)] items-center pt-10 pb-16 md:pt-16">
      <div className="growth-container w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* LEFT */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-emerald-300">
                Atlas Growth
              </span>
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Brand.
              <br />
              <span className="gradient-text-emerald">More Reach.</span>
              <br />
              Real Results.
            </h1>

            {/* Body */}
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Social Media. Content. Paid Media. Leads. Reputation. AI
              Automation. All in one growth ecosystem.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GrowthPrimaryCTA href="/growth/audit">
                Get your free Growth Audit
                <ArrowRight className="h-4 w-4" />
              </GrowthPrimaryCTA>
              <GrowthSecondaryCTA href="/growth/services">
                <Compass className="h-4 w-4 text-emerald-300" />
                Explore Services
              </GrowthSecondaryCTA>
            </div>

            {/* trust row */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-emerald-300/80" />
                <span>Data-driven growth system</span>
              </div>
              <div className="hidden h-3 w-px bg-white/10 sm:block" />
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                <span>Built on a powerful ecosystem</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Command Center */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate="visible"
            className="relative w-full"
          >
            {/* glow behind panel */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-emerald-500/10 blur-3xl sm:-inset-6" />
            <GrowthCommandCenter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GrowthHero;
