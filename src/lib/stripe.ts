/**
 * Stripe Checkout Service – Architecture Only
 * 
 * All Stripe credentials MUST come from environment variables.
 * Never hardcode any credentials.
 * 
 * Expected environment variables:
 * - STRIPE_SECRET_KEY
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
 * - NEXT_PUBLIC_STRIPE_PRICE_STARTER
 * - NEXT_PUBLIC_STRIPE_PRICE_PRO
 * - NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE
 */

import { CurrencyCode } from '@/types';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const PRICE_IDS: Record<string, string | undefined> = {
  starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER,
  pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
};

export interface CheckoutSessionParams {
  priceId: string;
  planId: 'starter' | 'pro' | 'enterprise';
  mode: 'subscription' | 'payment';
  currency?: CurrencyCode;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

export interface CheckoutSessionResult {
  sessionId: string;
  url?: string;
}

export function getPublishableKey(): string {
  if (!PUBLISHABLE_KEY) {
    console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not configured.');
    return '';
  }
  return PUBLISHABLE_KEY;
}

export function isStripeConfigured(): boolean {
  return !!(STRIPE_SECRET_KEY && PUBLISHABLE_KEY);
}

export async function createCheckoutSession(
  params: CheckoutSessionParams
): Promise<CheckoutSessionResult> {
  if (!STRIPE_SECRET_KEY) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY environment variable.');
  }

  const priceId = PRICE_IDS[params.planId] ?? params.priceId;
  if (!priceId) {
    throw new Error(`No Stripe price ID configured for plan: ${params.planId}`);
  }

  // When Stripe SDK is installed, uncomment:
  // const stripe = require('stripe')(STRIPE_SECRET_KEY);
  // const session = await stripe.checkout.sessions.create({
  //   mode: params.mode,
  //   payment_method_types: ['card'],
  //   line_items: [{ price: priceId, quantity: 1 }],
  //   success_url: params.successUrl,
  //   cancel_url: params.cancelUrl,
  //   customer_email: params.customerEmail,
  //   ...(params.currency ? { currency: params.currency.toLowerCase() } : {}),
  // });
  // return { sessionId: session.id, url: session.url ?? undefined };

  // Placeholder until Stripe is integrated
  return { sessionId: 'placeholder', url: undefined };
}

export async function verifyWebhookSignature(
  body: string,
  signature: string
): Promise<Record<string, unknown> | null> {
  if (!STRIPE_SECRET_KEY) return null;

  // When Stripe SDK is installed, uncomment:
  // const stripe = require('stripe')(STRIPE_SECRET_KEY);
  // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // if (!webhookSecret) return null;
  // const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  // return event.data.object as Record<string, unknown>;

  return null;
}
