import Link from "next/link";
import {
  ArrowRight,
  Check,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { GrowthEyebrow } from "@/components/growth/growth-section-shell";
import {
  formatSmmPrice,
  getPublicSmmCatalog,
  type PublicSmmOffer,
} from "@/lib/growth/smm-api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "SMM Panel — AtlasHub Growth",
  description:
    "AtlasHub SMM services with centralized catalog, transparent Atlas pricing and managed fulfillment.",
};

function OfferCard({ offer }: { offer: PublicSmmOffer }) {
  const price = formatSmmPrice(offer);
  const pricingSuffix =
    offer.pricingModel === "per_unit_size" ? ` / ${offer.unitSize.toLocaleString("pt-BR")}` : "";

  const params = new URLSearchParams({
    offerId: offer.id,
    offerName: offer.publicName,
  });

  return (
    <article className="glass-card glass-card-hover flex min-h-[310px] flex-col rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300/75">
            {offer.service.platform}
          </p>
          <p className="mt-1 text-xs text-white/35">{offer.service.category}</p>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-200/80">
          Live catalog
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">
        {offer.publicName}
      </h2>
      {offer.description ? (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {offer.description}
        </p>
      ) : null}

      <div className="mt-5 space-y-2 text-xs text-white/55">
        {offer.service.minQuantity ? (
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-300" />
            Minimum: {offer.service.minQuantity.toLocaleString("pt-BR")}
          </div>
        ) : null}
        {offer.service.maxQuantity ? (
          <div className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 text-emerald-300" />
            Maximum: {offer.service.maxQuantity.toLocaleString("pt-BR")}
          </div>
        ) : null}
        {offer.service.refillSupported ? (
          <div className="flex items-center gap-2">
            <RefreshCw className="h-3.5 w-3.5 text-emerald-300" />
            Refill supported
          </div>
        ) : null}
      </div>

      <div className="mt-auto border-t border-white/8 pt-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/35">
              Atlas price
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {price}
              <span className="text-xs font-normal text-white/40">{pricingSuffix}</span>
            </p>
          </div>
          <Link
            href={`/growth/order?${params.toString()}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-400 px-4 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
          >
            Request
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function GrowthSmmPage() {
  const catalog = await getPublicSmmCatalog("atlashub");
  const offers = catalog?.offers ?? [];

  return (
    <section className="relative py-10 md:py-16">
      <div className="growth-container">
        <div className="mx-auto max-w-4xl text-center">
          <GrowthEyebrow>Atlas SMM Panel</GrowthEyebrow>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Social growth services.
            <br />
            <span className="gradient-text-emerald">One Atlas catalog.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Browse Atlas-managed social media services from our centralized
            provider engine. Availability and pricing are controlled by AtlasHub,
            while fulfillment providers remain internal.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3 text-xs text-white/45">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            Centralized fulfillment
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-2">
            <ShoppingCart className="h-3.5 w-3.5 text-emerald-300" />
            Atlas pricing
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.025] px-3 py-2">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Expanding catalog
          </span>
        </div>

        {offers.length ? (
          <>
            <div className="mt-12 flex items-center justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-sm font-medium text-white">
                  {offers.length} active {offers.length === 1 ? "service" : "services"}
                </p>
                <p className="mt-1 text-xs text-white/35">
                  Catalog loaded from Atlas Platform.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </>
        ) : (
          <div className="glass-panel luminous-border mx-auto mt-12 max-w-3xl rounded-3xl p-8 text-center sm:p-10">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.08]">
              <RefreshCw className="h-5 w-5 text-emerald-300" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">
              Live catalog is being activated
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              The Atlas provider engine is ready. Services will appear here
              automatically as soon as the first provider catalog is synchronized
              and Atlas offers are published.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/growth/services"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 px-5 text-sm font-medium text-white/80 transition hover:border-emerald-400/35 hover:text-white"
              >
                Explore Growth services
              </Link>
              <Link
                href="/growth/order?service=SMM%20Commerce"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
              >
                Talk to AtlasHub
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-white/30">
          Service descriptions and delivery conditions reflect the selected
          Atlas offer. AtlasHub does not represent third-party distribution as
          organic audience interest unless explicitly stated and verified.
        </p>
      </div>
    </section>
  );
}
