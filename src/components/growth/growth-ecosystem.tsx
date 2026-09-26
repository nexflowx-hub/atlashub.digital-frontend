"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { accentTokenMap } from "@/lib/growth/types";
import { ecosystemCards } from "@/lib/growth/catalog";
import {
  GrowthSectionShell,
  GrowthEyebrow,
  GrowthSectionHeading,
} from "@/components/growth/growth-section-shell";

/**
 * GrowthEcosystem
 * Four platform products that surround the Growth offering. Cards mirror the
 * GrowthServices recipe (premium glass + accent icon chip) but surface a
 * categorical tag pill instead of an index number, and the grid sits behind a
 * subtle horizontal "connected" gradient line on desktop.
 */
export function GrowthEcosystem() {
  return (
    <GrowthSectionShell id="ecosystem" containerClassName="relative">
      <GrowthSectionHeading
        eyebrow="Platform"
        title={
          <>
            Built on a powerful{" "}
            <span className="gradient-text-emerald">ecosystem</span>
          </>
        }
        description="AtlasHub Growth is not just an agency landing page — it's part of a larger operating platform."
      />

      {/* decorative "connected" line — links the four cards on desktop */}
      <div className="pointer-events-none absolute left-0 right-0 top-[88px] hidden h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent lg:block" />

      <div className="relative mt-12 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {ecosystemCards.map((card, i) => {
          const tokens = accentTokenMap[card.accent];
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
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
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ring-1 ring-inset",
                    tokens.bg,
                    tokens.border,
                    tokens.text,
                  )}
                >
                  {card.tag}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </GrowthSectionShell>
  );
}

export default GrowthEcosystem;
