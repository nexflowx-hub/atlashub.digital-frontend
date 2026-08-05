'use client';

import { motion } from 'framer-motion';
import {
  Building2, MapPin, Shield, Lock, Cloud, CreditCard,
  ShieldAlert, Code, Eye, Fingerprint, FileCheck, Cookie,
  DatabaseBackup, Scale, Banknote, UserCheck, Landmark,
  HeartHandshake,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import type { LucideIcon } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const container = {
  hidden: {}, show: { transition: { staggerChildren: 0.08 } },
};

interface InfoItem { icon: LucideIcon; titleKey: string; descKey: string; }

const SECURITY_ITEMS: InfoItem[] = [
  { icon: Lock, titleKey: 'trustCenter.ssl', descKey: 'trustCenter.ssl.desc' },
  { icon: Cloud, titleKey: 'trustCenter.infrastructure', descKey: 'trustCenter.infrastructure.desc' },
  { icon: CreditCard, titleKey: 'trustCenter.securePayments', descKey: 'trustCenter.securePayments.desc' },
  { icon: ShieldAlert, titleKey: 'trustCenter.fraud', descKey: 'trustCenter.fraud.desc' },
  { icon: Code, titleKey: 'trustCenter.devPractices', descKey: 'trustCenter.devPractices.desc' },
];

const PRIVACY_ITEMS: InfoItem[] = [
  { icon: Fingerprint, titleKey: 'trustCenter.privacyByDesign', descKey: 'trustCenter.privacyByDesign.desc' },
  { icon: FileCheck, titleKey: 'trustCenter.gdprReady', descKey: 'trustCenter.gdprReady.desc' },
  { icon: Cookie, titleKey: 'trustCenter.cookieMgmt', descKey: 'trustCenter.cookieMgmt.desc' },
  { icon: DatabaseBackup, titleKey: 'trustCenter.dataProtection', descKey: 'trustCenter.dataProtection.desc' },
];

interface ComplianceItem { icon: LucideIcon; titleKey: string; descKey: string; }

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  { icon: Banknote, titleKey: 'trustCenter.aml', descKey: 'trustCenter.aml.desc' },
  { icon: UserCheck, titleKey: 'trustCenter.kyb', descKey: 'trustCenter.kyb.desc' },
  { icon: Landmark, titleKey: 'trustCenter.ukRegulations', descKey: 'trustCenter.ukRegulations.desc' },
  { icon: HeartHandshake, titleKey: 'trustCenter.responsibleBiz', descKey: 'trustCenter.responsibleBiz.desc' },
  { icon: Eye, titleKey: 'trustCenter.transparency', descKey: 'trustCenter.transparency.desc' },
];

const PAYMENT_METHODS = ['Stripe', 'Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Wise'];

const LAST_SECURITY = SECURITY_ITEMS[4];

export function TrustCenter() {
  const locale = useAppStore((s) => s.locale);
  const activePage = useAppStore((s) => s.activePage);
  const setActivePage = useAppStore((s) => s.setActivePage);

  const open = activePage === 'trust';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && setActivePage(null)}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 overflow-hidden flex flex-col bg-background">
        <DialogHeader className="sr-only">
          <DialogTitle>Trust Center</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {/* Header */}
          <motion.div initial="hidden" animate="show" variants={container} className="mb-12">
            <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-bold tracking-tight">
              <span className="gradient-text">Trust</span> Center
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 text-lg text-muted-foreground">
              {t('trustCenter.subtitle', locale)}
            </motion.p>
          </motion.div>

          {/* Company Information */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <Building2 className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('trustCenter.company', locale)}</h2>
            </motion.div>
            <motion.div variants={fadeUp} className="glass gradient-border rounded-xl p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Company Name</p><p className="mt-1 text-sm font-medium">{t('trustCenter.companyName', locale)}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Registration</p><p className="mt-1 text-sm font-medium">{t('trustCenter.registered', locale)}</p></div>
                <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Company Number</p><p className="mt-1 text-sm font-medium">{t('trustCenter.companyNumber', locale)}</p></div>
                <div className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-sm">{t('trustCenter.address', locale)}</p></div>
              </div>
            </motion.div>
          </motion.section>

          {/* Security */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <Shield className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('trustCenter.security', locale)}</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SECURITY_ITEMS.slice(0, 4).map((item) => (
                <motion.div key={item.titleKey} variants={fadeUp} className="glass gradient-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{t(item.titleKey, locale)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t(item.descKey, locale)}</p>
                </motion.div>
              ))}
            </div>
            <motion.div variants={fadeUp} className="mt-4 glass gradient-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <LAST_SECURITY.icon className="size-5 text-primary" />
                </div>
                <div><h3 className="font-semibold">{t(SECURITY_ITEMS[4].titleKey, locale)}</h3><p className="mt-1.5 text-sm text-muted-foreground">{t(SECURITY_ITEMS[4].descKey, locale)}</p></div>
              </div>
            </motion.div>
          </motion.section>

          {/* Privacy */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <Eye className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('trustCenter.privacy', locale)}</h2>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {PRIVACY_ITEMS.map((item) => (
                <motion.div key={item.titleKey} variants={fadeUp} className="glass gradient-border rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                  <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{t(item.titleKey, locale)}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t(item.descKey, locale)}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Compliance */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="mb-12">
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <Scale className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('trustCenter.compliance', locale)}</h2>
            </motion.div>
            <div className="glass gradient-border rounded-xl divide-y divide-border">
              {COMPLIANCE_ITEMS.map((item) => (
                <motion.div key={item.titleKey} variants={fadeUp} className="flex items-start gap-4 p-5 first:rounded-t-xl last:rounded-b-xl">
                  <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div><h3 className="font-semibold">{t(item.titleKey, locale)}</h3><p className="mt-1 text-sm text-muted-foreground">{t(item.descKey, locale)}</p></div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Payments */}
          <motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">{t('trustCenter.payments', locale)}</h2>
            </motion.div>
            <motion.p variants={fadeUp} className="mb-4 text-sm text-muted-foreground">{t('trustCenter.payments.desc', locale)}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <span key={m} className="rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">{m}</span>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
