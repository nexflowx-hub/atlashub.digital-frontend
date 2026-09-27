import { ArrowRight, CheckCircle2 } from "lucide-react";
import { GrowthServices } from "@/components/growth/growth-services";
import { GrowthSmmMarketplace } from "@/components/growth/growth-smm-marketplace";
import { GrowthProcess } from "@/components/growth/growth-process";
import { GrowthPackages } from "@/components/growth/growth-packages";
import { GrowthFinalCTA } from "@/components/growth/growth-final-cta";
import {
  GrowthEyebrow,
  GrowthSectionShell,
} from "@/components/growth/growth-section-shell";
import { GrowthPrimaryCTA } from "@/components/growth/growth-cta";

export const metadata = {
  title: "Growth Services — AtlasHub Growth",
  description:
    "Social Media, Content, Paid Media, Leads, Reputation, AI Automation, Web Presence and Custom Growth — all in one ecosystem.",
};

const INCLUDED = [
  "Strategy & content production",
  "Paid media management & optimization",
  "Lead generation funnels & automation",
  "Reputation & local presence",
  "AI agents & smart follow-up",
  "Web presence, landing pages & SEO",
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative py-10 md:py-16">
        <div className="growth-container">
          <div className="flex flex-col items-start">
            <GrowthEyebrow>Services</GrowthEyebrow>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              One ecosystem.{" "}
              <span className="gradient-text-emerald">Every</span> growth
              discipline.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Eight integrated services that work together as a single growth
              system — from social media to AI automation. No silos, no
              fragmented vendors.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <GrowthPrimaryCTA href="/growth/audit">
                Get your free Growth Audit
                <ArrowRight className="h-4 w-4" />
              </GrowthPrimaryCTA>
              <a
                href="/growth#pricing"
                className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-6 text-sm font-medium text-white/90 transition-colors hover:border-emerald-400/40"
              >
                View pricing
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5">
              {INCLUDED.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GrowthServices />
      <GrowthSmmMarketplace />
      <GrowthProcess />
      <GrowthPackages />

      <GrowthSectionShell id="services-cta">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-white/80">
            Not sure which services you need? Start with a free audit and we'll
            recommend the right mix for your brand.
          </p>
          <GrowthPrimaryCTA href="/growth/audit">
            Get your free Growth Audit
            <ArrowRight className="h-4 w-4" />
          </GrowthPrimaryCTA>
        </div>
      </GrowthSectionShell>

      <GrowthFinalCTA />
    </>
  );
}
