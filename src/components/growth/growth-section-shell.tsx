"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { smoothEase } from "@/lib/motion";
import type { ReactNode } from "react";

/**
 * GrowthSectionShell
 * Consistent vertical rhythm + reveal-on-scroll motion for every Growth section.
 * Respects prefers-reduced-motion (renders static).
 */

export function GrowthSectionShell({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  const reduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: smoothEase },
    },
  };

  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-28", className)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className={cn("growth-container", containerClassName)}
      >
        {children}
      </motion.div>
    </section>
  );
}

/** Eyebrow label (mono, emerald, letter-spaced). */
export function GrowthEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/90",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
      {children}
    </span>
  );
}

/** Section heading with optional kicker. */
export function GrowthSectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <GrowthEyebrow>{eyebrow}</GrowthEyebrow> : null}
      <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default GrowthSectionShell;
