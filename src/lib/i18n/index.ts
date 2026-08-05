import { Locale } from '@/types';
import en, { type TranslationKey } from './locales/en';
import pt from './locales/pt';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';

const localeMap: Record<Locale, Partial<Record<TranslationKey, string>>> = {
  en,
  pt,
  es,
  fr,
  de,
};

export function t(key: TranslationKey | string, locale: Locale = 'en'): string {
  const localeTranslations = localeMap[locale];
  const translated = localeTranslations?.[key as TranslationKey];
  if (translated) return translated;
  return (en as Record<string, string>)[key] ?? key;
}

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language?.split('-')[0]?.toLowerCase() ?? 'en';
  const supported: Locale[] = ['en', 'pt', 'es', 'fr', 'de'];
  return supported.includes(lang as Locale) ? (lang as Locale) : 'en';
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
};

export const availableLocales: Locale[] = ['en', 'pt', 'es', 'fr', 'de'];

export type { TranslationKey };
