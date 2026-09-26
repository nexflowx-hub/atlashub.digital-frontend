"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Minus, Star } from "lucide-react";
import { accentTokenMap } from "@/lib/growth/types";
import { growthPricing } from "@/lib/growth/pricing";
import {
  GrowthSectionShell,
  GrowthSectionHeading,
} from "@/components/growth/growth-section-shell";
import {
  GrowthPrimaryCTA,
  GrowthSecondaryCTA,
} from "@/components/growth/growth-cta";

/**
 * GrowthPackages — pricing section.
 *
 * Renders the 4 commercial packages (START / GROW / SCALE / CUSTOM) sourced
 * from `growthPricing` (single source of truth). The "SCALE" package is marked
 * `popular` and gets an emerald luminous ring, glow halo and "Most Popular"
 * badge, plus the primary CTA treatment.
 *
 * Design notes:
 * - Section is transparent; GrowthSectionShell owns rhythm + reveal + container.
 * - Card recipe: glass-card with `flex h-full flex-col` so the CTA can be pushed
 *   to the bottom with `mt-auto`, keeping all four CTAs aligned across the row.
 * - Accent tokens (emerald/teal/mint/cyan) come from `accentTokenMap`; never
 *   hard-code colors here.
 */

const baseCard =
  "glass-card relative flex h-full flex-col overflow-hidden rounded-2xl p-6";

export function GrowthPackages() {
  return (
    <GrowthSectionShell id="pricing">
      <GrowthSectionHeading
        eyebrow="Pricing"
        title={
          <>
            Growth packages that{" "}
            <span className="gradient-text-emerald">scale with you</span>
          </>
        }
        description="Transparent monthly plans. Change or cancel anytime. All prices in BRL."
      />

      <div className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {growthPricing.packages.map((pkg, i) => {
          const tokens = accentTokenMap[pkg.accent];
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative h-full"
            >
              {pkg.popular ? (
                <>
                  <div className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl bg-emerald-500/15 blur-2xl" />
                  <div className="absolute -top-3 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500 px-3 py-1 text-emerald-950 shadow-[0_0_24px_-6px_rgba(16,185,129,0.6)]">
                    <Star className="h-3 w-3 fill-emerald-950" />
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                      Most Popular
                    </span>
                  </div>
                </>
              ) : null}

              <div
                className={cn(
                  baseCard,
                  pkg.popular && "ring-2 ring-emerald-400/50 luminous-border",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.25em]",
                    tokens.text,
                  )}
                >
                  {pkg.name}
                </p>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="font-mono text-3xl font-semibold text-white">
                    {pkg.priceLabel}
                  </span>
                  {pkg.cadence ? (
                    <span className="text-sm text-muted-foreground">
                      {pkg.cadence}
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pkg.description}
                </p>

                <div className="my-5 h-px w-full bg-white/8" />

                <ul className="flex flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-2.5">
                      {f.included ? (
                        <Check
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            tokens.text,
                          )}
                        />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-white/25" />
                      )}
                      <span
                        className={cn(
                          "text-sm leading-relaxed",
                          f.included
                            ? "text-white/80"
                            : "text-white/35 line-through",
                        )}
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  {pkg.popular ? (
                    <GrowthPrimaryCTA
                      href={pkg.cta.href}
                      className="w-full"
                    >
                      {pkg.cta.label}
                    </GrowthPrimaryCTA>
                  ) : (
                    <GrowthSecondaryCTA
                      href={pkg.cta.href}
                      className="w-full"
                    >
                      {pkg.cta.label}
                    </GrowthSecondaryCTA>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
        Prices are illustrative for Phase 1. Final pricing confirmed during audit.
      </p>
    </GrowthSectionShell>
  );
}

export default GrowthPackages;
