import type { LucideIcon } from "lucide-react";

/**
 * AtlasHub Growth — shared types.
 * Phase 1: these describe the static catalog/pricing data that powers the
 * Growth experience. Kept centralized so commercial pricing can change often
 * without touching JSX.
 */

export type AccentTone = "emerald" | "teal" | "mint" | "cyan";

export interface GrowthService {
  id: string;
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: AccentTone;
  bullets: string[];
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface GrowthPackage {
  id: string;
  name: string;
  /** Monthly price in BRL (number). null means "Let's talk". */
  priceBRL: number | null;
  priceLabel: string;
  cadence: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  cta: { label: string; href: string };
  accent: AccentTone;
}

export interface EcosystemCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: AccentTone;
  tag: string;
}

export interface ProcessStage {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  accent: AccentTone;
}

export interface SocialChannelRow {
  id: string;
  name: string;
  handle: string;
  progress: number; // 0-100
  accent: AccentTone;
}

/** Maps an accent tone to concrete color tokens used across the UI. */
export interface AccentTokens {
  text: string;
  bg: string;
  border: string;
  glow: string;
  raw: string;
}

export const accentTokenMap: Record<AccentTone, AccentTokens> = {
  emerald: {
    text: "text-emerald-300",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_40px_-12px_rgba(16,185,129,0.5)]",
    raw: "#10b981",
  },
  teal: {
    text: "text-teal-300",
    bg: "bg-teal-400/10",
    border: "border-teal-400/30",
    glow: "shadow-[0_0_40px_-12px_rgba(45,212,191,0.5)]",
    raw: "#2dd4bf",
  },
  mint: {
    text: "text-emerald-200",
    bg: "bg-emerald-300/10",
    border: "border-emerald-300/30",
    glow: "shadow-[0_0_40px_-12px_rgba(110,231,183,0.45)]",
    raw: "#6ee7b7",
  },
  cyan: {
    text: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]",
    raw: "#22d3ee",
  },
};
