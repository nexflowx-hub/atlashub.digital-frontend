import { CurrencyCode, CurrencyInfo } from '@/types';

export const currencies: Record<CurrencyCode, CurrencyInfo> = {
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', rate: 1.17 },
  USD: { code: 'USD', symbol: '$', locale: 'en-US', rate: 1.27 },
  BRL: { code: 'BRL', symbol: 'R$', locale: 'pt-BR', rate: 7.85 },
};

const countryToCurrency: Record<string, CurrencyCode> = {
  GB: 'GBP',
  IE: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  ES: 'EUR',
  IT: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  PT: 'EUR',
  FI: 'EUR',
  GR: 'EUR',
  LU: 'EUR',
  US: 'USD',
  CA: 'USD',
  BR: 'BRL',
};

export function detectCurrencyFromCountry(countryCode: string): CurrencyCode {
  return countryToCurrency[countryCode.toUpperCase()] ?? 'GBP';
}

export function formatPrice(priceGBP: number, currency: CurrencyCode): string {
  const info = currencies[currency];
  const converted = priceGBP * info.rate;
  try {
    return new Intl.NumberFormat(info.locale, {
      style: 'currency',
      currency: info.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(converted);
  } catch {
    return `${info.symbol}${Math.round(converted)}`;
  }
}

export function convertPrice(priceGBP: number, currency: CurrencyCode): number {
  return priceGBP * currencies[currency].rate;
}
