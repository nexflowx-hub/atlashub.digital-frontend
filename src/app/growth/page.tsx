import { GrowthHero } from "@/components/growth/growth-hero";
import { GrowthServices } from "@/components/growth/growth-services";
import { GrowthPackages } from "@/components/growth/growth-packages";
import { GrowthImpact } from "@/components/growth/growth-impact";
import { GrowthProcess } from "@/components/growth/growth-process";
import { GrowthEcosystem } from "@/components/growth/growth-ecosystem";
import { GrowthFinalCTA } from "@/components/growth/growth-final-cta";

/**
 * /growth — AtlasHub Growth primary route.
 * Hero → Services → Pricing → Impact → Process → Ecosystem → Final CTA.
 * The corporate homepage at "/" is preserved.
 */
export default function GrowthPage() {
  return (
    <>
      <GrowthHero />
      <GrowthServices />
      <GrowthPackages />
      <GrowthImpact />
      <GrowthProcess />
      <GrowthEcosystem />
      <GrowthFinalCTA />
    </>
  );
}
