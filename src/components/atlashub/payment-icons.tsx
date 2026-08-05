'use client';

import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  Payment Method Logos – using real uploaded images                  */
/* ------------------------------------------------------------------ */

export const PAYMENT_ICONS: { key: string; src: string; alt: string }[] = [
  { key: 'Visa', src: '/visa.svg', alt: 'Visa' },
  { key: 'Mastercard', src: '/mastercard.svg', alt: 'Mastercard' },
  { key: 'Apple Pay', src: '/apple-pay.svg', alt: 'Apple Pay' },
  { key: 'MB WAY', src: '/logo_mbway.png', alt: 'MB WAY' },
  { key: 'Multibanco', src: '/logo_multibanco.png', alt: 'Multibanco' },
  { key: 'PIX', src: '/pix.svg', alt: 'PIX' },
  { key: 'Bizum', src: '/bizum.svg', alt: 'Bizum' },
];

/* Re-exported for any direct usage */
export function PaymentIconBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={26}
      className="h-6 w-auto rounded object-contain"
      unoptimized
    />
  );
}