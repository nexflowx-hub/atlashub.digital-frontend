import type { GrowthPackage } from "./types";

/**
 * AtlasHub Growth — commercial pricing.
 *
 * THIS IS THE SINGLE SOURCE OF TRUTH FOR PRICING.
 * Change commercial prices here only — never scatter numbers through JSX.
 *
 * Prices are monthly, in BRL. `null` priceBRL means "Let's talk" (custom).
 */

const formatBRL = (value: number): string =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });

export interface GrowthPricingConfig {
  packages: GrowthPackage[];
  /** Environment-driven WhatsApp link (Phase 1 placeholder). */
  whatsappHref: string;
  /** Where the free Growth Audit lives. */
  auditHref: string;
  /** Services overview route. */
  servicesHref: string;
}

function buildPackage(
  pkg: Omit<GrowthPackage, "priceLabel">,
): GrowthPackage {
  const priceLabel =
    pkg.priceBRL === null ? "Let's talk" : formatBRL(pkg.priceBRL);
  return { ...pkg, priceLabel };
}

export const growthPricing: GrowthPricingConfig = {
  whatsappHref:
    process.env.NEXT_PUBLIC_GROWTH_WHATSAPP_URL ??
    "https://wa.me/5562991903462?text=I%27d%20like%20to%20talk%20about%20AtlasHub%20Growth",
  auditHref: "/growth/audit",
  servicesHref: "/growth/services",
  packages: [
    buildPackage({
      id: "start",
      name: "START",
      priceBRL: 497,
      cadence: "/ month",
      description: "Get your brand online with a solid social foundation.",
      accent: "mint",
      cta: { label: "Get Started", href: "/growth/order?plan=start" },
      features: [
        { label: "Social media setup", included: true },
        { label: "8 content pieces / month", included: true },
        { label: "Basic management", included: true },
        { label: "Monthly report", included: true },
        { label: "Paid media management", included: false },
        { label: "WhatsApp automation", included: false },
      ],
    }),
    buildPackage({
      id: "grow",
      name: "GROW",
      priceBRL: 997,
      cadence: "/ month",
      description: "Build momentum with strategy and lead capture.",
      accent: "teal",
      cta: { label: "Choose Grow", href: "/growth/order?plan=grow" },
      features: [
        { label: "Content strategy", included: true },
        { label: "16 content pieces / month", included: true },
        { label: "Community management", included: true },
        { label: "Lead generation setup", included: true },
        { label: "Monthly report", included: true },
        { label: "WhatsApp automation", included: false },
      ],
    }),
    buildPackage({
      id: "scale",
      name: "SCALE",
      priceBRL: 1997,
      cadence: "/ month",
      description: "Full-funnel growth with paid media and automation.",
      accent: "emerald",
      popular: true,
      cta: { label: "Choose Scale", href: "/growth/order?plan=scale" },
      features: [
        { label: "Full content production", included: true },
        { label: "Paid media management", included: true },
        { label: "WhatsApp automation", included: true },
        { label: "Advanced reporting", included: true },
        { label: "Strategy sessions", included: true },
        { label: "Dedicated operation", included: false },
      ],
    }),
    buildPackage({
      id: "custom",
      name: "CUSTOM",
      priceBRL: null,
      cadence: "",
      description: "Tailored B2B and enterprise growth operations.",
      accent: "cyan",
      cta: { label: "Talk to our team", href: "/growth/order?plan=custom" },
      features: [
        { label: "Custom strategy", included: true },
        { label: "Dedicated operation", included: true },
        { label: "Advanced automation", included: true },
        { label: "Multi-channel growth", included: true },
        { label: "Ongoing support", included: true },
        { label: "SLA & priority", included: true },
      ],
    }),
  ],
};
