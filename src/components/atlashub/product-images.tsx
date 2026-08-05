'use client';

import Image from 'next/image';

/* ------------------------------------------------------------------ */
/*  Product visual headers – AI-generated photorealistic images        */
/* ------------------------------------------------------------------ */

const IMAGE_MAP: Record<string, string> = {
  ecommerce: '/products/ecommerce.png',
  dashboard: '/products/dashboard.png',
  marketplace: '/products/marketplace.png',
  ai: '/products/ai.png',
  workflow: '/products/workflow.png',
  api: '/products/api.png',
  bi: '/products/bi.png',
  crm: '/products/crm.png',
};

export function ProductImage({ type, alt }: { type: string; alt: string }) {
  const src = IMAGE_MAP[type] ?? IMAGE_MAP.ecommerce;

  return (
    <div className="relative h-40 w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    </div>
  );
}
