"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { smmCategories, smmOffers, type SmmOfferCategory } from "@/lib/growth/smm-catalog";
import {
  GrowthSectionHeading,
  GrowthSectionShell,
} from "@/components/growth/growth-section-shell";

type Filter = "all" | SmmOfferCategory;

export function GrowthSmmMarketplace() {
  const [filter, setFilter] = useState<Filter>("all");

  const offers = useMemo(
    () => (filter === "all" ? smmOffers : smmOffers.filter((offer) => offer.category === filter)),
    [filter],
  );

  return (
    <GrowthSectionShell id="smm-catalog">
      <GrowthSectionHeading
        eyebrow="SMM Commerce"
        title={
          <>
            Start with a service.{" "}
            <span className="gradient-text-emerald">Scale into a system.</span>
          </>
        }
        description="Choose a focused growth service or combine multiple capabilities into a managed AtlasHub operation."
      />

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {smmCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            className={cn(
              "min-h-11 rounded-full border px-4 py-2 text-sm transition-all",
              filter === category.id
                ? "border-emerald-400/45 bg-emerald-400/10 text-emerald-200"
                : "border-white/10 bg-white/[0.025] text-muted-foreground hover:border-white/20 hover:text-white",
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {offers.map((offer) => (
          <article
            key={offer.id}
            className="glass-card glass-card-hover relative flex min-h-[290px] flex-col rounded-2xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/[0.08]">
                <offer.icon className="h-5 w-5 text-emerald-300" />
              </span>
              {offer.badge ? (
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                  {offer.badge}
                </span>
              ) : null}
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-white">
              {offer.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {offer.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {offer.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-white/8 bg-white/[0.025] px-2.5 py-1 text-xs text-white/55"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                {offer.delivery}
              </span>
              <Link
                href={`/growth/order?service=${encodeURIComponent(offer.id)}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-400/30 px-4 text-sm font-medium text-emerald-200 transition-colors hover:border-emerald-300/55 hover:bg-emerald-400/[0.07]"
              >
                Request service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/growth/smm"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-400 px-5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
        >
          Open live SMM Panel
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-white/35">
        Delivery scope is confirmed before activation. Paid media spend, third-party platform costs,
        and custom integrations are quoted separately where applicable.
      </p>
    </GrowthSectionShell>
  );
}

export default GrowthSmmMarketplace;
