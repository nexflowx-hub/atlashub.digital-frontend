import { NextRequest, NextResponse } from 'next/server';
import { GeoIPResponse } from '@/types';
import { detectCurrencyFromCountry } from '@/lib/currency';
import { Locale } from '@/types';

const countryToLocale: Record<string, Locale> = {
  GB: 'en', US: 'en', CA: 'en', AU: 'en',
  BR: 'pt', PT: 'pt',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es', PE: 'es',
  FR: 'fr', BE: 'fr',
  DE: 'de', AT: 'de', CH: 'de',
};

export async function GET(request: NextRequest) {
  try {
    const cfHeader = request.headers.get('cf-ipcountry');
    const xForwardedFor = request.headers.get('x-forwarded-for');
    let countryCode = '';

    if (cfHeader && cfHeader.length === 2) {
      countryCode = cfHeader;
    } else if (xForwardedFor) {
      // Try GeoIP lookup via free API
      try {
        const ip = xForwardedFor.split(',')[0].trim();
        if (ip && !ip.startsWith('10.') && !ip.startsWith('172.') && !ip.startsWith('192.168.')) {
          const res = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`, {
            signal: AbortSignal.timeout(3000),
          });
          if (res.ok) {
            const data = await res.json();
            countryCode = data.countryCode ?? '';
          }
        }
      } catch {
        // GeoIP lookup failed, use defaults
      }
    }

    const currency = countryCode ? detectCurrencyFromCountry(countryCode) : 'GBP';
    const locale = countryToLocale[countryCode] ?? 'en';

    const response: GeoIPResponse = {
      country_code: countryCode,
      currency,
      locale,
    };

    return NextResponse.json(response);
  } catch {
    return NextResponse.json({
      country_code: 'GB',
      currency: 'GBP',
      locale: 'en',
    });
  }
}
