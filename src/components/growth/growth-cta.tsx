import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * GrowthCTA — premium, conversion-focused call-to-action links.
 * Primary = emerald glow pill. Secondary = glass outline pill.
 * Touch targets kept >= 44px (h-11).
 */

type CTAProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
};

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export function GrowthPrimaryCTA({
  href,
  children,
  className,
  external,
}: CTAProps) {
  const content = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </span>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          base,
          "btn-glow bg-gradient-to-b from-emerald-400 to-emerald-500 text-emerald-950 hover:from-emerald-300 hover:to-emerald-400",
          className,
        )}
      >
        {content}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        base,
        "btn-glow bg-gradient-to-b from-emerald-400 to-emerald-500 text-emerald-950 hover:from-emerald-300 hover:to-emerald-400",
        className,
      )}
    >
      {content}
    </Link>
  );
}

export function GrowthSecondaryCTA({
  href,
  children,
  className,
  external,
}: CTAProps) {
  const cls = cn(
    base,
    "glass-card text-white/90 hover:text-white hover:border-emerald-400/40",
    className,
  );
  const content = (
    <span className="inline-flex items-center gap-2">{children}</span>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export default GrowthPrimaryCTA;
