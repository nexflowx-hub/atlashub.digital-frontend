import { create } from 'zustand';
import { Locale, CurrencyCode } from '@/types';
import { detectLocale } from '@/lib/i18n';
import { detectCurrencyFromCountry } from '@/lib/currency';

export type AppPage = null | 'developers' | 'status' | 'trust';

interface AppState {
  locale: Locale;
  currency: CurrencyCode;
  activeSection: string;
  legalPage: string | null;
  companyPageOpen: boolean;
  mobileMenuOpen: boolean;
  productFilter: string;
  activePage: AppPage;
  chatOpen: boolean;
  setLocale: (locale: Locale) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setActiveSection: (section: string) => void;
  setLegalPage: (page: string | null) => void;
  setCompanyPageOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setProductFilter: (filter: string) => void;
  setActivePage: (page: AppPage) => void;
  setChatOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  currency: 'GBP',
  activeSection: 'hero',
  legalPage: null,
  companyPageOpen: false,
  mobileMenuOpen: false,
  productFilter: 'all',
  activePage: null,
  chatOpen: false,
  setLocale: (locale) => set({ locale }),
  setCurrency: (currency) => set({ currency }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setLegalPage: (legalPage) => set({ legalPage }),
  setCompanyPageOpen: (companyPageOpen) => set({ companyPageOpen }),
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setProductFilter: (productFilter) => set({ productFilter }),
  setActivePage: (activePage) => set({ activePage }),
  setChatOpen: (chatOpen) => set({ chatOpen }),
}));

export function initializeApp(countryCode?: string) {
  const locale = detectLocale();
  const currency = countryCode ? detectCurrencyFromCountry(countryCode) : 'GBP';
  return { locale, currency };
}
