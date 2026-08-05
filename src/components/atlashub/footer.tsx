'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore, type AppPage } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import { PAYMENT_ICONS } from './payment-icons';

interface FooterLink {
  labelKey: string;
  href?: string;
  legalKey?: string;
  page?: AppPage;
}

const COMPANY_LINKS: FooterLink[] = [
  { labelKey: 'nav.company', href: '#company' },
  { labelKey: 'nav.solutions', href: '#solutions' },
  { labelKey: 'nav.pricing', href: '#pricing' },
  { labelKey: 'nav.developers', page: 'developers' },
  { labelKey: 'nav.trustCenter', page: 'trust' },
  { labelKey: 'nav.status', page: 'status' },
  { labelKey: 'nav.contact', href: '#contact' },
];

const SOLUTIONS_ITEMS = ['Digital Commerce', 'Marketplace Solutions', 'AI Solutions', 'SaaS Development', 'Workflow Automation'];

const LEGAL_LINKS: FooterLink[] = [
  { labelKey: 'legal.privacy', legalKey: 'privacy' },
  { labelKey: 'legal.terms', legalKey: 'terms' },
  { labelKey: 'legal.refund', legalKey: 'refund' },
  { labelKey: 'legal.cookie', legalKey: 'cookie' },
  { labelKey: 'legal.shipping', legalKey: 'shipping' },
  { labelKey: 'legal.acceptable', legalKey: 'acceptable' },
  { labelKey: 'legal.aml', legalKey: 'aml' },
  { labelKey: 'legal.gdpr', legalKey: 'gdpr' },
  { labelKey: 'legal.accessibility', legalKey: 'accessibility' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: smoothEase } },
};

export function Footer() {
  const locale = useAppStore((s) => s.locale);
  const setLegalPage = useAppStore((s) => s.setLegalPage);
  const setActivePage = useAppStore((s) => s.setActivePage);

  const scrollTo = useCallback((href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleLegalClick = useCallback((key: string) => setLegalPage(key), [setLegalPage]);
  const handlePageClick = useCallback((page: AppPage) => setActivePage(page), [setActivePage]);

  return (
    <footer className="mt-auto relative">
      {/* Top separator line */}
      <div
        className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent 0%, oklch(0.7 0.18 160 / 40%) 50%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="bg-[oklch(0.07_0.003_270)]">
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-6 md:px-8">

          {/* ---- Main grid: 4 cols condensed ---- */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">

            {/* Brand + Company (spans 2 on lg) */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="sm:col-span-2 lg:col-span-2"
            >
              <a
                href="#hero"
                onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
                className="mb-3 flex items-baseline gap-1.5 select-none"
              >
                <span className="text-lg font-bold tracking-tight text-foreground">AtlasHub</span>
                <span className="text-lg font-light text-primary">Digital</span>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                {t('footer.tagline', locale)}
              </p>

              {/* Contact row – compact */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground/70">
                <a href="mailto:support@atlashub.digital" className="flex items-center gap-1.5 transition-colors hover:text-primary">
                  <Mail className="size-3.5" />support@atlashub.digital
                </a>
                <a href="https://wa.me/447451245014" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-primary">
                  <Phone className="size-3.5" />+44 7451 245014
                </a>
                <a href="https://t.me/AtlasHubDigital" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 transition-colors hover:text-primary">
                  <Send className="size-3.5" />Telegram
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" />London, UK
                </span>
              </div>
              <p className="mt-3 text-[10px] text-muted-foreground/40">Company No. 17379237 · England & Wales</p>
            </motion.div>

            {/* Company links */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">{t('footer.company', locale)}</h4>
              <ul className="space-y-1.5">
                {COMPANY_LINKS.map((link, i) => (
                  <li key={`${link.labelKey}-${i}`}>
                    <button
                      onClick={() => link.href ? scrollTo(link.href) : link.page ? handlePageClick(link.page) : null}
                      className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                    >{t(link.labelKey, locale)}</button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions + Legal – combined condensed */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">{t('nav.solutions', locale)}</h4>
              <ul className="space-y-1.5">
                {SOLUTIONS_ITEMS.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-foreground">{t('footer.legal', locale)}</h4>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.legalKey}>
                    <button
                      onClick={() => link.legalKey && handleLegalClick(link.legalKey)}
                      className="text-xs text-muted-foreground transition-colors duration-200 hover:text-primary leading-tight"
                    >{t(link.labelKey, locale)}</button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* ---- Bottom bar: copyright + payment icons ---- */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
            <p className="text-[11px] text-muted-foreground/50">
              © {new Date().getFullYear()} AtlasHub Digital Ltd. {t('footer.rights', locale)}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PAYMENT_ICONS.map(({ key, Icon }) => (
                <div
                  key={key}
                  className="rounded-md opacity-50 transition-opacity duration-300 hover:opacity-90"
                  title={key}
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
