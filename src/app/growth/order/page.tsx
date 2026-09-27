import { GrowthOrderForm } from "@/components/growth/growth-order-form";
import { GrowthEyebrow } from "@/components/growth/growth-section-shell";

export const metadata = {
  title: "Start a Growth Order — AtlasHub Growth",
  description:
    "Choose an AtlasHub Growth plan or service and continue directly with our commercial team.",
};

export default async function GrowthOrderPage({
  searchParams,
}: {
  searchParams: Promise<{
    service?: string | string[];
    plan?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const service = Array.isArray(params.service) ? params.service[0] : params.service;
  const plan = Array.isArray(params.plan) ? params.plan[0] : params.plan;

  return (
    <section className="relative py-10 md:py-16">
      <div className="growth-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <GrowthEyebrow>Start now</GrowthEyebrow>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-5xl">
              Turn the next growth action into an{" "}
              <span className="gradient-text-emerald">active project.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Select a plan or focused service, give us the minimum context we
              need and continue directly with the AtlasHub commercial team on
              WhatsApp.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "No long onboarding before the first conversation",
                "Scope confirmed before activation",
                "Human commercial handoff at launch",
                "Ready for future XPAYMENTS checkout and automated fulfillment",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/65"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <GrowthOrderForm initialService={service} initialPlan={plan} />
        </div>
      </div>
    </section>
  );
}
