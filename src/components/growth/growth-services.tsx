"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { accentTokenMap } from "@/lib/growth/types";
import { growthServices } from "@/lib/growth/catalog";
import {
  GrowthSectionShell,
  GrowthEyebrow,
  GrowthSectionHeading,
} from "@/components/growth/growth-section-shell";

/**
 * GrowthServices
 * Eight integrated growth disciplines presented as a premium glass card grid.
 * Reuses the shared accentTokenMap + glass utilities — no local color tokens.
 */
export function GrowthServices() {
  return (
    <GrowthSectionShell id="services">
      <GrowthSectionHeading
        eyebrow="What we do"
        title={
          <>
            Everything your brand needs to{" "}
            <span className="gradient-text-emerald">grow</span>
          </>
        }
        description="Eight integrated disciplines, one growth ecosystem."
      />

      <div className="mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {growthServices.map((service, i) => {
          const tokens = accentTokenMap[service.accent];
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass-card glass-card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset",
                    tokens.bg,
                    tokens.border,
                  )}
                >
                  <Icon className={cn("h-6 w-6", tokens.text)} />
                </span>
                <span className="font-mono text-sm text-white/20">
                  {String(service.index).padStart(2, "0")}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {service.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60"
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </GrowthSectionShell>
  );
}

export default GrowthServices;
