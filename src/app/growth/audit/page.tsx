import { ArrowRight, BarChart3, Bot, Clock, ShieldCheck } from "lucide-react";
import { GrowthAuditForm } from "@/components/growth/growth-audit-form";
import { GrowthPrimaryCTA } from "@/components/growth/growth-cta";
import { GrowthEyebrow } from "@/components/growth/growth-section-shell";
import { GrowthFinalCTA } from "@/components/growth/growth-final-cta";

export const metadata = {
  title: "Free Growth Audit — AtlasHub Growth",
  description:
    "Get a free, personalized Growth Audit. We analyze your presence and identify opportunities.",
};

const VALUE_POINTS = [
  {
    icon: BarChart3,
    title: "Full presence analysis",
    desc: "Social, content, paid, and reputation reviewed against benchmarks.",
  },
  {
    icon: Bot,
    title: "AI-assisted insights",
    desc: "Quick wins and automation opportunities flagged for you.",
  },
  {
    icon: Clock,
    title: "1 business day",
    desc: "A concise, actionable audit — no long sales calls required.",
  },
  {
    icon: ShieldCheck,
    title: "No commitment",
    desc: "Free, transparent, and yours to keep. Decide next steps later.",
  },
];

export default function AuditPage() {
  return (
    <>
      <section className="relative py-10 md:py-16">
        <div className="growth-container">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex flex-col">
              <GrowthEyebrow>Free Growth Audit</GrowthEyebrow>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
                See exactly where your{" "}
                <span className="gradient-text-emerald">growth</span> is hiding.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                We analyze your current presence across social, content, paid
                media, and reputation — then deliver a tailored, prioritized
                growth plan. Free, no commitment.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {VALUE_POINTS.map((v) => (
                  <div key={v.title} className="glass-card rounded-2xl p-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/30">
                      <v.icon className="h-5 w-5 text-emerald-300" />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 hidden items-center gap-3 lg:flex">
                <GrowthPrimaryCTA href="/growth/services">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </GrowthPrimaryCTA>
              </div>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-[2rem] bg-emerald-500/10 blur-3xl sm:-inset-6" />
              <GrowthAuditForm />
            </div>
          </div>
        </div>
      </section>

      <GrowthFinalCTA />
    </>
  );
}
