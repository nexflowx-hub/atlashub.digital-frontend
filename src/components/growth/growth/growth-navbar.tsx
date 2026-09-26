"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GrowthPrimaryCTA } from "@/components/growth/growth-cta";

/**
 * AtlasHub navbar — premium, glass, sticky.
 * Nav: Home, Growth, Services, Pricing, Platform, About
 * Primary CTA: Get Started
 */

const NAV_LINKS = [
  { label: "Home", href: "/growth" },
  { label: "Growth", href: "/growth" },
  { label: "Services", href: "/growth/services" },
  { label: "Pricing", href: "/growth#pricing" },
  { label: "Platform", href: "/growth#ecosystem" },
  { label: "About", href: "/growth#process" },
];

export function GrowthNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="growth-container">
          <nav
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5",
              scrolled
                ? "glass-panel luminous-border"
                : "border border-transparent bg-transparent",
            )}
          >
            {/* Logo */}
            <Link
              href="/growth"
              className="group flex items-center gap-2.5"
              aria-label="AtlasHub Growth home"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-[0_0_24px_-6px_rgba(16,185,129,0.6)]">
                <Sparkles className="h-4.5 w-4.5 text-emerald-950" />
                <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
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

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href === "/growth" && pathname === "/growth");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "text-white"
                        : "text-muted-foreground hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <GrowthPrimaryCTA href="/growth/audit" className="h-10 px-5">
                Get Started
                <ChevronRight className="h-4 w-4" />
              </GrowthPrimaryCTA>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl glass-card text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="lg:hidden" onClick={() => setOpen(false)}>
          <div className="growth-container pb-4">
            <div className="glass-panel luminous-border rounded-2xl p-3">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/5"
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 text-emerald-300/70" />
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-white/10 pt-3">
                <GrowthPrimaryCTA href="/growth/audit" className="h-12 w-full">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </GrowthPrimaryCTA>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default GrowthNavbar;
