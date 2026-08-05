'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/atlashub/navbar';
import { HeroSection } from '@/components/atlashub/hero-section';
import { SolutionsSection } from '@/components/atlashub/solutions-section';
import { WorkflowSection } from '@/components/atlashub/workflow-section';
import { ProductsSection } from '@/components/atlashub/products-section';
import { PricingSection } from '@/components/atlashub/pricing-section';
import { TrustSection } from '@/components/atlashub/trust-section';
import { CompanyPage } from '@/components/atlashub/company-page';
import { ContactSection } from '@/components/atlashub/contact-section';
import { Footer } from '@/components/atlashub/footer';
import { LegalPages } from '@/components/atlashub/legal-pages';
import { DeveloperPortal } from '@/components/atlashub/developer-portal';
import { StatusCenter } from '@/components/atlashub/status-center';
import { TrustCenter } from '@/components/atlashub/trust-center';
import { AiChat } from '@/components/atlashub/ai-chat';
import { useAppStore, initializeApp } from '@/stores/app-store';
import type { Locale, CurrencyCode } from '@/types';

export default function Home() {
  const setLocale = useAppStore((s) => s.setLocale);
  const setCurrency = useAppStore((s) => s.setCurrency);

  useEffect(() => {
    async function init() {
      const initial = initializeApp();
      let locale: Locale = initial.locale;
      let currency: CurrencyCode = initial.currency;
      try {
        const res = await fetch('/api/geoip');
        if (res.ok) {
          const data = await res.json();
          if (data.currency) currency = data.currency;
          if (data.locale) locale = data.locale;
        }
      } catch { /* browser fallback */ }
      setLocale(locale);
      setCurrency(currency);
    }
    init();
  }, [setLocale, setCurrency]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SolutionsSection />
        <WorkflowSection />
        <ProductsSection />
        <PricingSection />
        <TrustSection />
        <CompanyPage />
        <ContactSection />
      </main>
      <Footer />
      <LegalPages />
      <DeveloperPortal />
      <StatusCenter />
      <TrustCenter />
      <AiChat />
    </div>
  );
}
