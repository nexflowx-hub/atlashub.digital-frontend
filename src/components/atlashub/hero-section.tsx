'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import { AnimatedBackground } from './animated-background';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                  */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  const locale = useAppStore((s) => s.locale);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Split headline so we can apply gradient-text to 'Digital'
  const headlineParts = t('hero.headline', locale).split('Digital');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* ---- Background layer (z-0) ---- */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* ---- Content layer (z-10) ---- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex max-w-5xl flex-col items-center text-center"
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
        >
          {headlineParts[0]}
          <span className="gradient-text">Digital</span>
          {headlineParts[1]}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
        >
          {t('hero.subtitle', locale)}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" onClick={() => scrollTo('solutions')}>
            {t('hero.cta.solutions', locale)}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollTo('pricing')}
          >
            {t('hero.cta.pricing', locale)}
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => scrollTo('contact')}
          >
            {t('hero.cta.contact', locale)}
          </Button>
        </motion.div>
      </motion.div>

      {/* ---- Bounce down arrow ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo('solutions')}
          aria-label="Scroll to solutions"
          className="text-muted-foreground/60 transition-colors hover:text-primary"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="size-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
