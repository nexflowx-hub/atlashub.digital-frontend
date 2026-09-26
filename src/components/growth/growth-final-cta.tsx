import Link from "next/link";
import { ArrowRight, MessageCircle, Calendar, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { growthPricing } from "@/lib/growth/pricing";
import {
  GrowthSectionShell,
  GrowthEyebrow,
} from "@/components/growth/growth-section-shell";
import {
  GrowthPrimaryCTA,
  GrowthSecondaryCTA,
} from "@/components/growth/growth-cta";

/**
 * GrowthFinalCTA — closing conversion section.
 *
 * Server component: only GrowthSectionShell (client) + server CTA primitives.
 * Reads `growthPricing.whatsappHref` (env-driven) at module load — fine on the server.
 */
export function GrowthFinalCTA() {
  return (
    <GrowthSectionShell id="get-started">
      <div className="relative overflow-hidden rounded-3xl">
        {/* Glow behind */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.74 0.16 162 / 0.22) 0%, transparent 65%)",
            }}
          />
        </div>

        {/* Panel */}
        <div className="glass-panel luminous-border relative rounded-3xl px-6 py-14 text-center sm:px-10 md:px-16 md:py-20">
          <div className="flex justify-center">
            <GrowthEyebrow>Get started</GrowthEyebrow>
          </div>

          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
            Ready to <span className="gradient-text-emerald">grow?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Let&apos;s build your growth system.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GrowthPrimaryCTA href="/growth/audit">
              Get your free Growth Audit
              <ArrowRight className="h-4 w-4" />
            </GrowthPrimaryCTA>
            <GrowthSecondaryCTA href={growthPricing.whatsappHref} external>
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              Talk to our team
            </GrowthSecondaryCTA>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Communication options */}
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
            Or reach us via
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <a
              href={growthPricing.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 transition-colors hover:border-emerald-400/40"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              WhatsApp
            </a>

            <Link
              href="/growth/audit"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 transition-colors hover:border-emerald-400/40"
            >
              <Calendar className="h-4 w-4 text-teal-300" />
              Schedule a call
            </Link>

            <a
              href="mailto:hello@atlashub.digital"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 transition-colors hover:border-emerald-400/40"
            >
              <Mail className="h-4 w-4 text-cyan-300" />
              Email
            </a>
          </div>
        </div>
      </div>
    </GrowthSectionShell>
  );
}

export default GrowthFinalCTA;
