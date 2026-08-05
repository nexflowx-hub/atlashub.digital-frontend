import { create } from 'zustand';
import { Locale, CurrencyCode } from '@/types';
import { detectLocale } from '@/lib/i18n';
import { detectCurrencyFromCountry } from '@/lib/currency';

interface AppState {
  locale: Locale;
  currency: CurrencyCode;
  activeSection: string;
  legalPage: string | null;
  companyPageOpen: boolean;
  mobileMenuOpen: boolean;
  productFilter: string;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setActiveSection: (section: string) => void;
  setLegalPage: (page: string | null) => void;
  setCompanyPageOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setProductFilter: (filter: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  currency: 'GBP',
  activeSection: 'hero',
  legalPage: null,
  companyPageOpen: false,
  mobileMenuOpen: false,
  productFilter: 'all',
  setLocale: (locale) => set({ locale }),
  setCurrency: (currency) => set({ currency }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setLegalPage: (legalPage) => set({ legalPage }),
  setCompanyPageOpen: (companyPageOpen) => set({ companyPageOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setProductFilter: (productFilter) => set({ productFilter }),
}));

export function initializeApp(countryCode?: string) {
  const locale = detectLocale();
  const currency = countryCode ? detectCurrencyFromCountry(countryCode) : 'GBP';
  return { locale, currency };
}
