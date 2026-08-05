'use client';

import { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  Activity,
  TrendingUp,
  ShieldCheck,
  Globe,
  CreditCard,
  Store,
  Bot,
  Code,
  Wrench,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  nameKey: string;
  icon: LucideIcon;
  status: 'operational' | 'comingSoon';
}

interface InfoCard {
  label: string;
  value: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const services: ServiceItem[] = [
  { nameKey: 'status.website', icon: Globe, status: 'operational' },
  { nameKey: 'status.portal', icon: Store, status: 'operational' },
  { nameKey: 'status.payments', icon: CreditCard, status: 'operational' },
  { nameKey: 'status.marketplace', icon: Store, status: 'operational' },
  { nameKey: 'status.ai', icon: Bot, status: 'operational' },
  { nameKey: 'status.api', icon: Code, status: 'comingSoon' },
  { nameKey: 'status.devServices', icon: Wrench, status: 'comingSoon' },
];

const infoCards: InfoCard[] = [
  { label: 'Response Time', value: '< 200ms', icon: Activity },
  { label: 'Uptime', value: '99.9%', icon: TrendingUp },
  { label: 'Last Incident', value: 'None recorded', icon: ShieldCheck },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StatusCenter() {
  const { activePage, setActivePage, locale } = useAppStore();
  const isOpen = activePage === 'status';

  const uptimeSquares = useMemo(() => Array.from({ length: 90 }, (_, i) => i), []);

  const lastChecked = useMemo(
    () =>
      new Date().toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    [locale],
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setActivePage(null);
      }}
    >
      <DialogContent className="max-w-3xl w-[95vw] h-[85vh] p-0 overflow-hidden flex flex-col bg-background">
        {/* Header */}
        <DialogHeader className="sr-only">
          <DialogTitle>{t('status.title', locale)}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-6 md:p-10 space-y-10">
            {/* -------------------------------------------------------- */}
            {/*  1. Overall Status Banner                                  */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-5"
            >
              {/* Pulsing circle */}
              <motion.div
                variants={fadeUp}
                className="relative flex-shrink-0"
              >
                <span className="absolute inset-0 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
                <motion.span
                  className="absolute inset-0 rounded-full bg-emerald-500/20"
                  animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative size-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle className="size-10 text-emerald-400" strokeWidth={1.5} />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                variants={fadeUp}
                className="text-center sm:text-left space-y-2"
              >
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {t('status.allSystems', locale)}
                </h2>
                <Badge
                  variant="outline"
                  className="border-emerald-500/40 text-emerald-400 bg-emerald-500/10 text-sm font-semibold px-3 py-1"
                >
                  {t('status.uptimeValue', locale)} {t('status.uptime', locale)}
                </Badge>
              </motion.div>
            </motion.div>

            {/* -------------------------------------------------------- */}
            {/*  2. Uptime Bar (90-day grid)                             */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="text-sm text-muted-foreground mb-3"
              >
                {t('status.overall', locale)} — Past 90 days
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-[2px] rounded-lg bg-muted/30 p-2"
              >
                {uptimeSquares.map((i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    whileInView={{ opacity: 1, scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.008, duration: 0.3 }}
                    className="block w-[3px] h-3 rounded-[1px] bg-emerald-500/60 origin-bottom"
                  />
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="text-xs text-muted-foreground mt-2"
              >
                {t('status.uptimeValue', locale)} {t('status.uptime', locale).toLowerCase()}
              </motion.div>
            </motion.div>

            {/* -------------------------------------------------------- */}
            {/*  3. Services Status                                        */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              <motion.div
                variants={fadeUp}
                className="text-lg font-semibold mb-4 pb-3 border-b border-border/50"
              >
                {t('status.components', locale)}
              </motion.div>

              <div className="divide-y divide-border/40">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isOp = service.status === 'operational';

                  return (
                    <motion.div
                      key={service.nameKey}
                      variants={fadeUp}
                      className="flex items-center justify-between py-3.5 px-2 -mx-2 rounded-lg transition-colors hover:bg-muted/30"
                    >
                      {/* Left: icon + name */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center size-8 rounded-full ${
                            isOp
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          <Icon className="size-4" strokeWidth={1.8} />
                        </div>
                        <span className="text-sm font-medium">{t(service.nameKey, locale)}</span>
                      </div>

                      {/* Right: status */}
                      <div className="flex items-center gap-1.5">
                        {isOp ? (
                          <CheckCircle className="size-4 text-emerald-400" strokeWidth={2} />
                        ) : (
                          <Clock className="size-4 text-amber-400" strokeWidth={2} />
                        )}
                        <span
                          className={`text-xs font-medium ${
                            isOp ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {isOp ? t('common.operational', locale) : t('common.comingSoon', locale)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* -------------------------------------------------------- */}
            {/*  4. System Info Cards                                      */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {infoCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.label}
                    variants={fadeUp}
                    className="rounded-xl border border-border/40 bg-muted/20 backdrop-blur-sm p-4 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center size-9 rounded-full bg-emerald-500/10">
                        <Icon className="size-4 text-emerald-400" strokeWidth={1.8} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {card.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold tracking-tight">{card.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* -------------------------------------------------------- */}
            {/*  5. Footer                                                */}
            {/* -------------------------------------------------------- */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs text-muted-foreground text-center pt-2"
            >
              {t('status.lastChecked', locale)}: {lastChecked}
            </motion.div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
