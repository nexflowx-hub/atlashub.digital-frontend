import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Clapperboard,
  Megaphone,
  MessagesSquare,
  Search,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

export type SmmOfferCategory =
  | "presence"
  | "content"
  | "acquisition"
  | "conversion"
  | "reputation"
  | "automation";

export interface SmmOffer {
  id: string;
  category: SmmOfferCategory;
  title: string;
  description: string;
  icon: LucideIcon;
  delivery: string;
  highlights: string[];
  badge?: string;
}

export const smmCategories: Array<{
  id: "all" | SmmOfferCategory;
  label: string;
}> = [
  { id: "all", label: "All" },
  { id: "presence", label: "Presence" },
  { id: "content", label: "Content" },
  { id: "acquisition", label: "Acquisition" },
  { id: "conversion", label: "Conversion" },
  { id: "reputation", label: "Reputation" },
  { id: "automation", label: "Automation" },
];

/**
 * Launch catalog: sellable, human-fulfillable services.
 *
 * Important: no unverified engagement, fake testimonials or artificial
 * "organic" metrics are promised. Provider-backed fulfillment can be attached
 * later behind the Growth Engine without changing this public contract.
 */
export const smmOffers: SmmOffer[] = [
  {
    id: "social-presence-setup",
    category: "presence",
    title: "Social Presence Setup",
    description:
      "Professional setup and optimization of your main social profiles.",
    icon: Sparkles,
    delivery: "One-time setup",
    highlights: ["Profile optimization", "Brand consistency", "CTA structure"],
    badge: "Quick start",
  },
  {
    id: "content-launch-pack",
    category: "content",
    title: "Content Launch Pack",
    description:
      "A focused creative pack to launch or refresh your social presence.",
    icon: Clapperboard,
    delivery: "Project",
    highlights: ["Content concepts", "Creative production", "Publishing plan"],
  },
  {
    id: "short-form-video",
    category: "content",
    title: "Short-Form Video",
    description:
      "Reels and short-form creative adapted for discovery-first platforms.",
    icon: Clapperboard,
    delivery: "Pack / recurring",
    highlights: ["Reels", "Shorts", "Hooks & captions"],
  },
  {
    id: "paid-media-growth",
    category: "acquisition",
    title: "Paid Media Growth",
    description:
      "Campaign setup, creative direction and ongoing performance optimization.",
    icon: Megaphone,
    delivery: "Setup + management",
    highlights: ["Meta Ads", "Google Ads", "Optimization"],
    badge: "Acquisition",
  },
  {
    id: "lead-generation-funnel",
    category: "conversion",
    title: "Lead Generation Funnel",
    description:
      "Landing, qualification and follow-up flow designed to turn attention into leads.",
    icon: Target,
    delivery: "Project",
    highlights: ["Landing flow", "Qualification", "Lead handoff"],
    badge: "B2B ready",
  },
  {
    id: "whatsapp-sales-flow",
    category: "automation",
    title: "WhatsApp Sales Flow",
    description:
      "Structured WhatsApp intake, qualification and follow-up for commercial teams.",
    icon: MessagesSquare,
    delivery: "Setup + optimization",
    highlights: ["WhatsApp", "Automation", "Human handoff"],
  },
  {
    id: "reputation-local",
    category: "reputation",
    title: "Reputation & Local Presence",
    description:
      "Improve discoverability, reviews workflow and consistency across local surfaces.",
    icon: BadgeCheck,
    delivery: "Project / recurring",
    highlights: ["Local presence", "Review workflow", "Trust assets"],
  },
  {
    id: "growth-automation",
    category: "automation",
    title: "Growth Automation",
    description:
      "Connect forms, CRM, messaging and AI-assisted workflows into one operating flow.",
    icon: Workflow,
    delivery: "Custom implementation",
    highlights: ["CRM flows", "AI assistance", "Follow-up"],
    badge: "Atlas ecosystem",
  },
  {
    id: "visibility-audit",
    category: "presence",
    title: "Visibility Audit",
    description:
      "A structured review of presence, discoverability, conversion paths and opportunities.",
    icon: Search,
    delivery: "Audit",
    highlights: ["Presence review", "Opportunity map", "Action plan"],
  },
];
