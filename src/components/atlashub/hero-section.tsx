'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import { AnimatedBackground } from './animated-background';
import { HeroCube } from './hero-cube';

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

export function HeroSection() {
  const locale = useAppStore((s) => s.locale);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const headlineParts = t('hero.headline', locale).split('Digital');

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      <AnimatedBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-20 lg:items-center"
      >
        {/* Left – Text content */}
        <div className="flex max-w-2xl flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            {headlineParts[0]}
            <span className="gradient-text">Digital</span>
            {headlineParts[1]}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            {t('hero.subtitle', locale)}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
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
        </div>

        {/* Right – Three.js Interactive 3×3×3 Cube Grid */}
        <motion.div
          variants={fadeUp}
          className="flex flex-shrink-0 items-center justify-center"
          style={{ width: 360, height: 360 }}
        >
          <HeroCube />
        </motion.div>
      </motion.div>

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