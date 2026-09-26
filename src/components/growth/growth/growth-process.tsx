"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processStages } from "@/lib/growth/catalog";
import {
  GrowthSectionShell,
  GrowthSectionHeading,
} from "@/components/growth/growth-section-shell";

/**
 * GrowthProcess
 * Four-stage process (Audit → Strategy → Execution → Results) with a
 * desktop horizontal connector and a mobile vertical connector that threads
 * through the numbered nodes.
 */
export function GrowthProcess() {
  const reduce = useReducedMotion();

  return (
    <GrowthSectionShell id="process">
      <GrowthSectionHeading
        eyebrow="How it works"
        title={
          <>
            From audit to <span className="gradient-text-emerald">results</span>
          </>
        }
        description="A clear four-stage process built for momentum."
        align="center"
      />

      <div className="relative mt-14">
        {/* DESKTOP horizontal connector */}
        <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-emerald-400/10 via-emerald-400/40 to-teal-400/10 md:block" />

        {/* MOBILE vertical connector — aligns with node center (56px node → 28px center = left-7) */}
        <div className="pointer-events-none absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/30 to-teal-400/10 md:hidden" />

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-5">
          {processStages.map((stage, i) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex items-start gap-4 md:flex-col md:items-start md:gap-0"
            >
              {/* Numbered node */}
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-background/80 backdrop-blur">
                <span className="font-mono text-lg font-semibold gradient-text-emerald">
                  {stage.step}
                </span>
              </div>

              {/* Text block */}
              <div className="min-w-0 flex-1 pl-1 md:mt-6 md:flex-none md:pl-0">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {stage.title}
                </h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GrowthSectionShell>
  );
}

export default GrowthProcess;
