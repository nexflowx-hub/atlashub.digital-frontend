import {
  Share2,
  Clapperboard,
  Target,
  Filter,
  Star,
  Bot,
  Globe,
  Layers,
  Headphones,
  Workflow,
  Sparkles,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";
import type {
  GrowthService,
  EcosystemCard,
  ProcessStage,
  ImpactMetric,
  SocialChannelRow,
} from "./types";

/**
 * AtlasHub Growth — service catalog + ecosystem + process + impact data.
 * Illustrative UI / demonstration content. NOT historical customer results.
 */

export const growthServices: GrowthService[] = [
  {
    id: "social-media",
    index: 1,
    title: "Social Media",
    description: "Strategy, content, management and growth.",
    icon: Share2,
    accent: "emerald",
    bullets: ["Strategy", "Content", "Management", "Growth"],
  },
  {
    id: "content-creation",
    index: 2,
    title: "Content Creation",
    description: "Reels, videos, design and copywriting.",
    icon: Clapperboard,
    accent: "teal",
    bullets: ["Reels", "Video", "Design", "Copywriting"],
  },
  {
    id: "paid-media",
    index: 3,
    title: "Paid Media",
    description: "Meta, Google, TikTok Ads and optimization.",
    icon: Target,
    accent: "cyan",
    bullets: ["Meta", "Google", "TikTok", "Optimization"],
  },
  {
    id: "lead-generation",
    index: 4,
    title: "Lead Generation",
    description: "Funnels, WhatsApp, forms and automation.",
    icon: Filter,
    accent: "mint",
    bullets: ["Funnels", "WhatsApp", "Forms", "Automation"],
  },
  {
    id: "reputation",
    index: 5,
    title: "Reputation",
    description: "Reviews, local presence and trust.",
    icon: Star,
    accent: "emerald",
    bullets: ["Reviews", "Local", "Presence", "Trust"],
  },
  {
    id: "ai-automation",
    index: 6,
    title: "AI Automation",
    description: "Workflows, chatbots, agents and smart follow-up.",
    icon: Bot,
    accent: "teal",
    bullets: ["Workflows", "Chatbots", "Agents", "Follow-up"],
  },
  {
    id: "web-presence",
    index: 7,
    title: "Web Presence",
    description: "Websites, landing pages, SEO and visibility.",
    icon: Globe,
    accent: "cyan",
    bullets: ["Websites", "Landing", "SEO", "Visibility"],
  },
  {
    id: "custom-growth",
    index: 8,
    title: "Custom Growth",
    description: "Tailored B2B and enterprise growth operations.",
    icon: Layers,
    accent: "mint",
    bullets: ["Custom", "B2B", "Enterprise", "Operations"],
  },
];

export const ecosystemCards: EcosystemCard[] = [
  {
    id: "atendimento-center",
    title: "Atendimento.Center",
    description:
      "Multi-channel support, WhatsApp, social channels and future webchat.",
    icon: Headphones,
    accent: "emerald",
    tag: "Support",
  },
  {
    id: "typebot",
    title: "Typebot",
    description:
      "Interactive qualification funnels and deterministic automations.",
    icon: Workflow,
    accent: "teal",
    tag: "Funnels",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    description: "Intelligent assistance, qualification and sales support.",
    icon: Sparkles,
    accent: "cyan",
    tag: "Intelligence",
  },
  {
    id: "growth-panel",
    title: "Growth Panel",
    description: "Orders, services, status and operational fulfillment.",
    icon: LayoutDashboard,
    accent: "mint",
    tag: "Operations",
  },
];

export const processStages: ProcessStage[] = [
  {
    id: "audit",
    step: "01",
    title: "Audit",
    description: "We analyze your current presence and identify opportunities.",
  },
  {
    id: "strategy",
    step: "02",
    title: "Strategy",
    description: "We create a tailored growth plan.",
  },
  {
    id: "execution",
    step: "03",
    title: "Execution",
    description: "We implement and manage the actions.",
  },
  {
    id: "results",
    step: "04",
    title: "Results",
    description: "We deliver reporting and recommendations.",
  },
];

/**
 * Impact metrics — DEMONSTRATION / illustrative UI data only.
 * Do not imply historical AtlasHub customer results.
 */
export const impactMetrics: ImpactMetric[] = [
  {
    id: "reach",
    label: "Reach",
    value: "+128%",
    delta: "vs. baseline",
    positive: true,
    accent: "emerald",
  },
  {
    id: "leads",
    label: "Leads",
    value: "184",
    delta: "qualified / mo",
    positive: true,
    accent: "teal",
  },
  {
    id: "engagement",
    label: "Engagement",
    value: "6.4%",
    delta: "avg. rate",
    positive: true,
    accent: "cyan",
  },
  {
    id: "authority",
    label: "Authority Score",
    value: "74",
    delta: "/ 100",
    positive: true,
    accent: "mint",
  },
];

/**
 * Social channel progress rows shown inside the Growth Command Center.
 * Illustrative UI data.
 */
export const socialChannels: SocialChannelRow[] = [
  { id: "instagram", name: "Instagram", handle: "@brand", progress: 86, accent: "emerald" },
  { id: "tiktok", name: "TikTok", handle: "@brand", progress: 72, accent: "teal" },
  { id: "linkedin", name: "LinkedIn", handle: "Brand", progress: 64, accent: "cyan" },
  { id: "youtube", name: "YouTube", handle: "@brand", progress: 58, accent: "mint" },
];

/** Command Center headline KPIs (illustrative). */
export const commandCenterKpis = {
  authorityScore: 74,
  reachDelta: "+128%",
  leads: 184,
  engagement: "6.4%",
} as const;
