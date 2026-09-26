import type { Metadata } from "next";
import { GrowthBackground } from "@/components/growth/growth-background";
import { GrowthNavbar } from "@/components/growth/growth-navbar";
import { GrowthFooter } from "@/components/growth/growth-footer";

export const metadata: Metadata = {
  title: "AtlasHub Growth — More Reach. Real Results.",
  description:
    "Social Media. Content. Paid Media. Leads. Reputation. AI Automation. All in one growth ecosystem.",
};

/**
 * Growth route layout.
 * Self-contained shell (background + navbar + footer) so the Growth experience
 * is visually independent from the corporate homepage, which is preserved at "/".
 */
export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <GrowthBackground />
      <GrowthNavbar />
      <main className="relative flex-1 pt-24">{children}</main>
      <GrowthFooter />
    </div>
  );
}
