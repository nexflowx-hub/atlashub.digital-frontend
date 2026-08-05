'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, FileCheck, KeyRound, Headphones, Globe, type LucideIcon } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TrustCardData {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TRUST_ITEMS: TrustCardData[] = [
  {
    id: 'uk',
    titleKey: 'trust.uk',
    descriptionKey: 'trust.uk.desc',
    icon: Shield,
  },
  {
    id: 'payments',
    titleKey: 'trust.payments',
    descriptionKey: 'trust.payments.desc',
    icon: Lock,
  },
  {
    id: 'gdpr',
    titleKey: 'trust.gdpr',
    descriptionKey: 'trust.gdpr.desc',
    icon: FileCheck,
  },
  {
    id: 'ssl',
    titleKey: 'trust.ssl',
    descriptionKey: 'trust.ssl.desc',
    icon: KeyRound,
  },
  {
    id: 'support',
    titleKey: 'trust.support',
    descriptionKey: 'trust.support.desc',
    icon: Headphones,
  },
  {
    id: 'global',
    titleKey: 'trust.global',
    descriptionKey: 'trust.global.desc',
    icon: Globe,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-component: TrustCard                                           */
/* ------------------------------------------------------------------ */

function TrustCard({ item, locale }: { item: TrustCardData; locale: Locale }) {
  const Icon = item.icon;

  return (
    <motion.div
      variants={cardFadeUp}
      className="relative rounded-xl glass p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 gradient-border"
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon circle */}
        <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10">
          <Icon className="size-8 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground">
          {t(item.titleKey, locale)}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(item.descriptionKey, locale)}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function TrustSection() {
  const locale = useAppStore((s) => s.locale);

  return (
    <section
      id="trust"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Grid pattern background */}
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(800px, 80vw)',
            height: 'min(500px, 40vh)',
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
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="gradient-text">{t('trust.title', locale)}</span>
          </motion.h2>
        </motion.div>

        {/* ---- Trust Cards Grid ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TRUST_ITEMS.map((item) => (
            <TrustCard
              key={item.id}
              item={item}
              locale={locale}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
