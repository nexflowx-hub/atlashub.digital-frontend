'use client';

import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  SVG Payment Method Icons – Clean, minimal, recognisable            */
/* ------------------------------------------------------------------ */

export function StripeIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Stripe">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M21.6 22.4h-3.2l2-10.8h3.2l-2 10.8zm13.2-10.5c-.6-.2-1.6-.5-2.8-.5-3.1 0-5.3 1.6-5.3 3.9 0 1.7 1.5 2.7 2.7 3.2 1.2.6 1.6.9 1.6 1.4 0 .8-.9 1.1-1.8 1.1-1.2 0-1.8-.2-2.8-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.4.6 3.3 0 5.4-1.6 5.4-4 0-1.4-.8-2.4-2.7-3.3-1.1-.6-1.8-.9-1.8-1.5 0-.5.6-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.4-2.4zm7.9 6.2c.7 0 1.2.1 1.6.2l.3-2.4c-.4-.1-1-.3-2.2-.3-2.4 0-4.1 1.3-4.1 3.4 0 1.5 1.1 2.3 2.1 2.8.9.5 1.2.8 1.2 1.3 0 .7-.8 1-1.6 1-1.1 0-1.7-.2-2.6-.5l-.4-.2-.4 2.5c.8.3 1.8.6 3.2.6 2.6 0 4.2-1.3 4.2-3.5 0-1.5-1-2.5-2.5-3.3-.8-.4-1.3-.7-1.3-1.2 0-.4.5-.9 1.5-.9zm-18.3-4.5h-2.4l-.1.5c-1.8 4.6-3.2 7.8-3.8 9.2l.1-.5c-.2-1.1-.6-2.8-1-4.5l-1.3-4.7H13l2.4 8.7s0 .1.1.2c-.3.7-.7 1.5-1.2 2.1h2.8l3.9-11h-2.5z" fill="#fff" />
    </svg>
  );
}

export function VisaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <path d="M18.7 20.5l1.6-8.5h2.6l-1.6 8.5h-2.6zm10.7-8.3c-.5-.2-1.3-.4-2.3-.4-2.5 0-4.3 1.3-4.3 3.2 0 1.4 1.2 2.2 2.2 2.7 1 .5 1.3.8 1.3 1.2 0 .7-.8 1-1.6 1-.9 0-1.5-.1-2.3-.4l-.3-.1-.3 2c.6.2 1.6.5 2.9.5 2.7 0 4.4-1.3 4.4-3.3 0-1.1-.7-1.9-2.1-2.6-.9-.4-1.4-.7-1.4-1.2 0-.4.5-.8 1.4-.8.7 0 1.3.1 1.7.3l.2.1.3-1.9zm8 0h-2c-.6 0-1.1.2-1.4.8l-3.9 7.5h2.8l.6-1.5h3.3l.3 1.5h2.5l-2.2-8.3zm-3.2 5.3l1.4-3.5.8 3.5h-2.2zm-17.3-5.3l-2.5 5.8-.3-1.3c-.4-1.4-1.8-3-3.4-3.7l2.3 8.2h2.8l4.2-9h-3.1z" fill="#fff" />
      <path d="M10.5 12.2H7l-.1.3c3.7.9 6.1 3.2 7.1 5.9l-1-5.1c-.2-.6-.6-.8-1.2-.9l-1.3-.2z" fill="#F9A533" />
    </svg>
  );
}

export function MastercardIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Mastercard">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <circle cx="20" cy="16" r="7" fill="#EB001B" opacity="0.85" />
      <circle cx="28" cy="16" r="7" fill="#F79E1B" opacity="0.85" />
      <path d="M24 10.8a7 7 0 010 10.4 7 7 0 000-10.4z" fill="#FF5F00" opacity="0.85" />
    </svg>
  );
}

export function AmexIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Amex">
      <rect width="48" height="32" rx="4" fill="#006FCF" />
      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">AMEX</text>
    </svg>
  );
}

export function ApplePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Apple Pay">
      <rect width="48" height="32" rx="4" fill="#000" />
      <path d="M17.5 22c-.3.7-1 1.6-1.7 1.6s-.9-.8-.9-.8c-.5-.8-.7-2.1-.7-3.2 0-2.4 1.2-3.3 2.4-3.3.8 0 1.4.5 1.8.9l.1-1.5c-.6-.3-1.2-.5-1.9-.5-2 0-3.6 1.7-3.6 4.5 0 1.5.4 2.7 1 3.5.6.7 1.4 1.1 2.3 1.1 1.1 0 1.8-.6 2.4-1.5l-1.2-1.3z" fill="#fff" />
      <text x="33" y="19" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="500" fontFamily="Arial, sans-serif">Pay</text>
    </svg>
  );
}

export function GooglePayIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Google Pay">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text x="24" y="19" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="Arial, sans-serif">G Pay</text>
    </svg>
  );
}

export function PayPalIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="PayPal">
      <rect width="48" height="32" rx="4" fill="#003087" />
      <text x="24" y="19.5" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="bold" fontFamily="Arial, sans-serif">PayPal</text>
    </svg>
  );
}

export function WiseIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Wise">
      <rect width="48" height="32" rx="4" fill="#00D9B1" />
      <text x="24" y="19" textAnchor="middle" fill="#1A1F71" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">Wise</text>
    </svg>
  );
}

export const PAYMENT_ICONS: { key: string; Icon: () => ReactNode }[] = [
  { key: 'Stripe', Icon: StripeIcon },
  { key: 'Visa', Icon: VisaIcon },
  { key: 'Mastercard', Icon: MastercardIcon },
  { key: 'Amex', Icon: AmexIcon },
  { key: 'Apple Pay', Icon: ApplePayIcon },
  { key: 'Google Pay', Icon: GooglePayIcon },
  { key: 'PayPal', Icon: PayPalIcon },
  { key: 'Wise', Icon: WiseIcon },
];
