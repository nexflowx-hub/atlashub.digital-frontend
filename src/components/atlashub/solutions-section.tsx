'use client';

import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Store,
  BrainCircuit,
  Cloud,
  Workflow,
  Check,
  type LucideIcon,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SolutionCardData {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  itemsKeys: string[];
  accent: string; // Tailwind colour for icon bg tint
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SOLUTIONS: SolutionCardData[] = [
  {
    id: 'commerce',
    titleKey: 'solutions.commerce',
    descriptionKey: 'solutions.commerce.desc',
    icon: ShoppingCart,
    itemsKeys: [
      'solutions.commerce.1',
      'solutions.commerce.2',
      'solutions.commerce.3',
      'solutions.commerce.4',
    ],
    accent: 'emerald',
  },
  {
    id: 'marketplace',
    titleKey: 'solutions.marketplace',
    descriptionKey: 'solutions.marketplace.desc',
    icon: Store,
    itemsKeys: [
      'solutions.marketplace.1',
      'solutions.marketplace.2',
      'solutions.marketplace.3',
      'solutions.marketplace.4',
      'solutions.marketplace.5',
    ],
    accent: 'teal',
  },
  {
    id: 'ai',
    titleKey: 'solutions.ai',
    descriptionKey: 'solutions.ai.desc',
    icon: BrainCircuit,
    itemsKeys: [
      'solutions.ai.1',
      'solutions.ai.2',
      'solutions.ai.3',
      'solutions.ai.4',
    ],
    accent: 'emerald',
  },
  {
    id: 'saas',
    titleKey: 'solutions.saas',
    descriptionKey: 'solutions.saas.desc',
    icon: Cloud,
    itemsKeys: [
      'solutions.saas.1',
      'solutions.saas.2',
      'solutions.saas.3',
      'solutions.saas.4',
      'solutions.saas.5',
    ],
    accent: 'teal',
  },
  {
    id: 'workflow',
    titleKey: 'solutions.workflow',
    descriptionKey: 'solutions.workflow.desc',
    icon: Workflow,
    itemsKeys: [
      'solutions.workflow.1',
      'solutions.workflow.2',
      'solutions.workflow.3',
      'solutions.workflow.4',
      'solutions.workflow.5',
    ],
    accent: 'emerald',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-component: SolutionCard                                        */
/* ------------------------------------------------------------------ */

function SolutionCard({ solution, locale }: { solution: SolutionCardData; locale: string }) {
  const Icon = solution.icon;

  return (
    <motion.div
      variants={cardFadeUp}
      className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Gradient border shimmer on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl" style={{
          background: 'linear-gradient(135deg, oklch(0.7 0.18 160 / 8%) 0%, transparent 50%, oklch(0.7 0.18 160 / 4%) 100%)',
        }} />
      </div>

      <div className="relative">
        {/* Icon */}
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/15">
          <Icon className="size-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground">
          {t(solution.titleKey, locale)}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(solution.descriptionKey, locale)}
        </p>

        {/* Capability list */}
        <ul className="mt-4 space-y-2">
          {solution.itemsKeys.map((key) => (
            <li key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Check className="size-3.5 shrink-0 text-primary/70" />
              <span>{t(key, locale)}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function SolutionsSection() {
  const locale = useAppStore((s) => s.locale);

  return (
    <section
      id="solutions"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(800px, 80vw)',
            height: 'min(600px, 50vh)',
            background:
              'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 4%) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ---- Section Header ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <motion.p
            variants={headerFadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t('solutions.title', locale)}
          </motion.p>
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Comprehensive{' '}
            <span className="gradient-text">Technology Solutions</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('solutions.subtitle', locale)}
          </motion.p>
        </motion.div>

        {/* ---- Solutions Grid ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SOLUTIONS.map((solution) => (
            <SolutionCard
              key={solution.id}
              solution={solution}
              locale={locale}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
