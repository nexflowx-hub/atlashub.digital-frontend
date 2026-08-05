'use client';

import { useMemo } from 'react';

const ROW_1 = ['GitHub', 'Vercel', 'AWS', 'Stripe', 'OpenAI', 'Gemini', 'Blockchain', 'Ethereum', 'Docker', 'Kubernetes'];
const ROW_2 = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Prisma', 'PostgreSQL', 'Redis', 'Cloudflare', 'Node.js'];

function TechItem({ name }: { name: string }) {
  return (
    <span className="font-semibold tracking-wider text-lg text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors duration-300 select-none whitespace-nowrap">
      {name}
    </span>
  );
}

function Separator() {
  return (
    <span className="text-primary/20 text-lg select-none" aria-hidden="true">
      ◆
    </span>
  );
}

function ScrollRow({ items, direction }: { items: string[]; direction: 'left' | 'right' }) {
  const doubled = useMemo(() => [...items, ...items], [items]);
  const animClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <div className="overflow-hidden" role="marquee" aria-label="Scrolling technology names">
      <div className={`flex shrink-0 gap-x-12 ${animClass}`}>
        {doubled.map((item, i) => (
          <span key={`${direction}-${i}`} className="flex items-center gap-x-12">
            <TechItem name={item} />
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}

export function TechBanner() {
  return (
    <section className="py-16 md:py-20 relative w-full" aria-label="Technology partners">
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.7 0.18 160 / 15%), transparent)',
        }}
      />

      {/* Section label */}
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/50 text-center mb-8">
        Powered by
      </p>

      {/* Scrolling rows */}
      <div className="space-y-4">
        <ScrollRow items={ROW_1} direction="left" />
        <ScrollRow items={ROW_2} direction="right" />
      </div>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, oklch(0.7 0.18 160 / 15%), transparent)',
        }}
      />
    </section>
  );
}
