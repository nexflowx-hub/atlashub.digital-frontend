export type Locale = 'en' | 'pt' | 'es' | 'fr' | 'de';

export type CurrencyCode = 'GBP' | 'EUR' | 'USD' | 'BRL';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  rate: number;
}

export interface PricingPlan {
  id: string;
  nameKey: string;
  priceGBP: number;
  featuresKeys: string[];
  popular?: boolean;
  ctaKey: string;
}

export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  priceGBP: number;
  categoryKey: string;
  image: string;
}

export interface Solution {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  itemsKeys: string[];
}

export interface WorkflowStep {
  id: string;
  labelKey: string;
  icon: string;
}

export interface NavLink {
  labelKey: string;
  href: string;
}

export interface LegalPageKey {
  key: string;
  titleKey: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GeoIPResponse {
  country_code: string;
  currency: CurrencyCode;
  locale: Locale;
}
