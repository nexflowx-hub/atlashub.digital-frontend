'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore, type AppPage } from '@/stores/app-store';
import { Button } from '@/components/ui/button';

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

const PAYMENT_METHODS = ['Stripe', 'Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay', 'PayPal', 'Wise'];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
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
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent 0%, oklch(0.7 0.18 160 / 40%) 50%, transparent 100%)' }} aria-hidden="true" />
      <div className="bg-[oklch(0.07_0.003_270)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Company */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="mb-4 flex items-baseline gap-1 select-none">
                <span className="text-lg font-bold tracking-tight text-foreground">AtlasHub</span>
                <span className="text-lg font-light text-primary">Digital</span>
              </a>
              <p className="text-sm leading-relaxed text-muted-foreground">{t('footer.tagline', locale)}</p>
              <p className="mt-3 text-xs text-muted-foreground/60">Company No. 17379237</p>
              <h4 className="mt-6 mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">{t('footer.company', locale)}</h4>
              <ul className="space-y-2">
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

            {/* Solutions */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">{t('nav.solutions', locale)}</h4>
              <ul className="space-y-2.5">
                {SOLUTIONS_ITEMS.map((item) => (<li key={item} className="text-sm text-muted-foreground">{item}</li>))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">{t('footer.legal', locale)}</h4>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.legalKey}>
                    <button onClick={() => link.legalKey && handleLegalClick(link.legalKey)} className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">{t(link.labelKey, locale)}</button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">{t('footer.support', locale)}</h4>
              <div className="flex flex-col gap-3">
                <a href="mailto:support@atlashub.digital" className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary">support@atlashub.digital</a>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-9 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                    <a href="https://t.me/AtlasHubDigital" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Send className="size-4" /></a>
                  </Button>
                  <span className="text-sm text-muted-foreground">@AtlasHubDigital</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="size-9 text-muted-foreground hover:text-primary hover:bg-primary/10" asChild>
                    <a href="https://wa.me/447451245014" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle className="size-4" /></a>
                  </Button>
                  <span className="text-sm text-muted-foreground">+44 7451 245014</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground/60">© 2026 AtlasHub Digital Ltd. {t('footer.rights', locale)}</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {PAYMENT_METHODS.map((method) => (
                <span key={method} className="rounded border border-border/50 bg-muted/30 px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground/50">{method}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
