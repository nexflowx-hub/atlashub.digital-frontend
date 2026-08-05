'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Target,
  Eye,
  Lightbulb,
  ShieldCheck,
  Award,
  Handshake,
  Briefcase,
  ArrowRight,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import type { Locale } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ValueCard {
  titleKey: string;
  textKey: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CORE_VALUES: ValueCard[] = [
  { titleKey: 'company.values.innovation', textKey: 'company.values.innovation.text', icon: Lightbulb },
  { titleKey: 'company.values.integrity', textKey: 'company.values.integrity.text', icon: ShieldCheck },
  { titleKey: 'company.values.excellence', textKey: 'company.values.excellence.text', icon: Award },
  { titleKey: 'company.values.partnership', textKey: 'company.values.partnership.text', icon: Handshake },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
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

const itemFadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const dialogContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const dialogItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ValueCard({ value, locale }: { value: ValueCard; locale: Locale }) {
  const Icon = value.icon;
  return (
    <motion.div
      variants={dialogItem}
      className="relative rounded-xl glass p-6 gradient-border"
    >
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon className="size-6 text-primary" />
        </div>
        <div>
          <h4 className="text-base font-semibold text-foreground">
            {t(value.titleKey, locale)}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t(value.textKey, locale)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CompanyDialog({ locale }: { locale: Locale }) {
  const companyPageOpen = useAppStore((s) => s.companyPageOpen);
  const setCompanyPageOpen = useAppStore((s) => s.setCompanyPageOpen);

  return (
    <Dialog open={companyPageOpen} onOpenChange={setCompanyPageOpen}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto p-6 md:p-8">
        <motion.div
          variants={dialogContainer}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={dialogItem}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold md:text-3xl">
                <span className="gradient-text">{t('company.title', locale)}</span>
              </DialogTitle>
              <DialogDescription className="mt-2 text-base">
                {t('company.subtitle', locale)}
              </DialogDescription>
            </DialogHeader>
          </motion.div>

          {/* Company Details Card */}
          <motion.div
            variants={dialogItem}
            className="rounded-xl glass p-6 gradient-border space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Building2 className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {t('company.name', locale)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t('company.registered', locale)}
                </p>
              </div>
            </div>
            <div className="border-t border-border/50 pt-4">
              <p className="text-sm font-medium text-foreground/80">
                {t('company.number', locale)}
              </p>
              <div className="mt-3 flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t('company.address', locale)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div variants={dialogItem} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Target className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('company.mission.title', locale)}
              </h3>
            </div>
            <p className="pl-[52px] text-sm leading-relaxed text-muted-foreground">
              {t('company.mission.text', locale)}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div variants={dialogItem} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Eye className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('company.vision.title', locale)}
              </h3>
            </div>
            <p className="pl-[52px] text-sm leading-relaxed text-muted-foreground">
              {t('company.vision.text', locale)}
            </p>
          </motion.div>

          {/* Core Values */}
          <motion.div variants={dialogItem} className="space-y-5">
            <h3 className="text-xl font-semibold text-foreground">
              {t('company.values.title', locale)}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {CORE_VALUES.map((value) => (
                <ValueCard key={value.titleKey} value={value} locale={locale} />
              ))}
            </div>
          </motion.div>

          {/* Business Activities */}
          <motion.div variants={dialogItem} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Briefcase className="size-5 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('company.activities.title', locale)}
              </h3>
            </div>
            <p className="pl-[52px] text-sm leading-relaxed text-muted-foreground">
              {t('company.activities.text', locale)}
            </p>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function CompanyPage() {
  const locale = useAppStore((s) => s.locale);
  const setCompanyPageOpen = useAppStore((s) => s.setCompanyPageOpen);

  return (
    <>
      <section id="company" className="relative overflow-hidden px-4 py-24 md:py-32">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2" aria-hidden="true">
          <div
            style={{
              width: 'min(700px, 80vw)',
              height: 'min(400px, 40vh)',
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
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h2
              variants={headerFadeUp}
              className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <span className="gradient-text">{t('company.title', locale)}</span>
            </motion.h2>

            <motion.p
              variants={headerFadeUp}
              className="mt-4 text-lg text-muted-foreground"
            >
              {t('company.subtitle', locale)}
            </motion.p>

            <motion.div variants={itemFadeUp} className="mt-8">
              <Button
                variant="default"
                size="lg"
                onClick={() => setCompanyPageOpen(true)}
                className="group gap-2"
              >
                {t('common.learnMore', locale)}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ---- Full Company Dialog ---- */}
      <CompanyDialog locale={locale} />
    </>
  );
}
