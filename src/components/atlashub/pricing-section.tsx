'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Zap, Building2, Check } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { formatPrice } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PricingTier {
  id: string;
  titleKey: string;
  descriptionKey: string;
  priceGBP: number;
  featureKeys: string[];
  icon: LucideIcon;
  popular: boolean;
  ctaVariant: 'default' | 'outline';
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TIERS: PricingTier[] = [
  {
    id: 'starter',
    titleKey: 'pricing.starter',
    descriptionKey: 'pricing.starter.desc',
    priceGBP: 190,
    featureKeys: [
      'pricing.starter.f1',
      'pricing.starter.f2',
      'pricing.starter.f3',
      'pricing.starter.f4',
      'pricing.starter.f5',
    ],
    icon: Rocket,
    popular: false,
    ctaVariant: 'outline',
  },
  {
    id: 'professional',
    titleKey: 'pricing.professional',
    descriptionKey: 'pricing.professional.desc',
    priceGBP: 260,
    featureKeys: [
      'pricing.professional.f1',
      'pricing.professional.f2',
      'pricing.professional.f3',
      'pricing.professional.f4',
      'pricing.professional.f5',
      'pricing.professional.f6',
      'pricing.professional.f7',
    ],
    icon: Zap,
    popular: true,
    ctaVariant: 'default',
  },
  {
    id: 'enterprise',
    titleKey: 'pricing.enterprise',
    descriptionKey: 'pricing.enterprise.desc',
    priceGBP: 340,
    featureKeys: [
      'pricing.enterprise.f1',
      'pricing.enterprise.f2',
      'pricing.enterprise.f3',
      'pricing.enterprise.f4',
      'pricing.enterprise.f5',
      'pricing.enterprise.f6',
      'pricing.enterprise.f7',
      'pricing.enterprise.f8',
    ],
    icon: Building2,
    popular: false,
    ctaVariant: 'outline',
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  Animated Price Counter                                             */
/* ------------------------------------------------------------------ */

function AnimatedPrice({
  priceGBP,
  currency,
  locale,
}: {
  priceGBP: number;
  currency: 'GBP' | 'EUR' | 'USD' | 'BRL';
  locale: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const rates: Record<string, number> = {
      GBP: 1,
      EUR: 1.17,
      USD: 1.27,
      BRL: 7.85,
    };
    const target = Math.round(priceGBP * (rates[currency] ?? 1));
    const duration = 1200; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, priceGBP, currency]);

  const symbols: Record<string, string> = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    BRL: 'R$',
  };
  const sym = symbols[currency] ?? '£';

  return (
    <span ref={ref} className="tabular-nums">
      {currency === 'BRL' ? `${sym} ${displayValue.toLocaleString(locale)}` : `${sym}${displayValue.toLocaleString(locale)}`}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-component: PricingCard                                         */
/* ------------------------------------------------------------------ */

function PricingCard({
  tier,
  locale,
  currency,
}: {
  tier: PricingTier;
  locale: string;
  currency: 'GBP' | 'EUR' | 'USD' | 'BRL';
}) {
  const Icon = tier.icon;

  return (
    <motion.div
      variants={cardFadeUp}
      className={`relative flex flex-col rounded-xl glass p-8 transition-shadow duration-300 ${
        tier.popular
          ? 'scale-105 glow-emerald border border-primary/30'
          : 'gradient-border'
      }`}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            {t('pricing.popular', locale)}
          </Badge>
        </div>
      )}

      {/* Icon */}
      <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-primary/10">
        <Icon className="size-6 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        {t(tier.titleKey, locale)}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-1">
        <AnimatedPrice
          priceGBP={tier.priceGBP}
          currency={currency}
          locale={locale}
        />
        <span className="text-muted-foreground">
          {t('pricing.monthly', locale)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {t(tier.descriptionKey, locale)}
      </p>

      {/* Features */}
      <ul className="mt-6 flex-1 space-y-3">
        {tier.featureKeys.map((key) => (
          <li
            key={key}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{t(key, locale)}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        <Button
          variant={tier.ctaVariant}
          className="w-full"
          size="lg"
        >
          {t('pricing.cta', locale)}
        </Button>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function PricingSection() {
  const locale = useAppStore((s) => s.locale);
  const currency = useAppStore((s) => s.currency);

  const currencyLabels: Record<string, string> = {
    GBP: 'GBP (£)',
    EUR: 'EUR (€)',
    USD: 'USD ($)',
    BRL: 'BRL (R$)',
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Grid pattern background */}
      <div className="grid-pattern pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(900px, 90vw)',
            height: 'min(500px, 40vh)',
            background:
              'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 5%) 0%, transparent 70%)',
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
            {t('pricing.title', locale)}
          </motion.p>
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Simple,{' '}
            <span className="gradient-text">Transparent Pricing</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('pricing.subtitle', locale)}
          </motion.p>
        </motion.div>

        {/* ---- Pricing Cards ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-3"
        >
          {TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              locale={locale}
              currency={currency}
            />
          ))}
        </motion.div>

        {/* ---- Exchange Rate Note ---- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          Prices shown in {currencyLabels[currency] ?? currency}. Actual charges may vary based on exchange rates.
        </motion.p>
      </div>
    </section>
  );
}
