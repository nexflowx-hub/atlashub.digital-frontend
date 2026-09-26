import Link from "next/link";
import { Sparkles, Mail, Calendar, MessageCircle } from "lucide-react";
import { growthPricing } from "@/lib/growth/pricing";

/**
 * AtlasHub footer — sticky to bottom, premium glass, minimal.
 * Preserves space for legal/trust/status (Phase 1 placeholders).
 */

const FOOTER_LINKS = [
  {
    title: "Growth",
    links: [
      { label: "Overview", href: "/growth" },
      { label: "Services", href: "/growth/services" },
      { label: "Free Growth Audit", href: "/growth/audit" },
      { label: "Pricing", href: "/growth#pricing" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Atendimento.Center", href: "/growth#ecosystem" },
      { label: "Typebot", href: "/growth#ecosystem" },
      { label: "AI Agents", href: "/growth#ecosystem" },
      { label: "Growth Panel", href: "/growth#ecosystem" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/growth#process" },
      { label: "About", href: "/growth#process" },
      { label: "Trust Center", href: "/growth" },
      { label: "Status", href: "/growth" },
    ],
  },
];

export function GrowthFooter() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-background/60 backdrop-blur-xl">
      {/* top contact strip */}
      <div className="growth-container border-b border-white/5 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-300/80">
              Talk to us
            </p>
            <p className="mt-1 text-lg font-semibold text-white">
              Ready to build your growth system?
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={growthPricing.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 hover:border-emerald-400/40"
            >
              <MessageCircle className="h-4 w-4 text-emerald-300" />
              WhatsApp
            </a>
            <Link
              href="/growth/audit"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 hover:border-emerald-400/40"
            >
              <Calendar className="h-4 w-4 text-teal-300" />
              Schedule a call
            </Link>
            <a
              href="mailto:hello@atlashub.digital"
              className="inline-flex h-11 items-center gap-2 rounded-full glass-card px-5 text-sm font-medium text-white/90 hover:border-emerald-400/40"
            >
              <Mail className="h-4 w-4 text-cyan-300" />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* main footer */}
      <div className="growth-container grid grid-cols-2 gap-8 py-12 md:grid-cols-5">
        <div className="col-span-2">
          <Link href="/growth" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500">
              <Sparkles className="h-4.5 w-4.5 text-emerald-950" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-300/80">
                AtlasHub
              </span>
              <span className="text-sm font-semibold tracking-tight text-white">
                Growth
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Social Media. Content. Paid Media. Leads. Reputation. AI
            Automation. All in one growth ecosystem.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/50">
            Demo interface — illustrative data
          </p>
        </div>

        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/50">
              {col.title}
            </h4>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="inline-block py-1 text-sm text-muted-foreground transition-colors hover:text-emerald-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/5">
        <div className="growth-container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} AtlasHub. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/growth" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/growth" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/growth" className="transition-colors hover:text-white">
              Trust Center
            </Link>
            <Link href="/growth" className="transition-colors hover:text-white">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default GrowthFooter;
