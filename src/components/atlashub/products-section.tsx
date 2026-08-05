'use client';

import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import {
  ShoppingBag,
  LayoutDashboard,
  Store,
  Bot,
  Workflow,
  Globe,
  BarChart3,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import type { Locale } from '@/types';
import { formatPrice } from '@/lib/currency';
import { Button } from '@/components/ui/button';
import { ProductImage } from './product-images';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductCardData {
  id: string;
  titleKey: string;
  descriptionKey: string;
  priceGBP: number;
  category: string;
  icon: LucideIcon;
  imageType: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const PRODUCTS: ProductCardData[] = [
  {
    id: 'p1', titleKey: 'products.p1.name', descriptionKey: 'products.p1.desc',
    priceGBP: 49, category: 'templates', icon: ShoppingBag, imageType: 'ecommerce',
  },
  {
    id: 'p2', titleKey: 'products.p2.name', descriptionKey: 'products.p2.desc',
    priceGBP: 79, category: 'templates', icon: LayoutDashboard, imageType: 'dashboard',
  },
  {
    id: 'p3', titleKey: 'products.p3.name', descriptionKey: 'products.p3.desc',
    priceGBP: 99, category: 'automation', icon: Store, imageType: 'marketplace',
  },
  {
    id: 'p4', titleKey: 'products.p4.name', descriptionKey: 'products.p4.desc',
    priceGBP: 129, category: 'ai', icon: Bot, imageType: 'ai',
  },
  {
    id: 'p5', titleKey: 'products.p5.name', descriptionKey: 'products.p5.desc',
    priceGBP: 89, category: 'automation', icon: Workflow, imageType: 'workflow',
  },
  {
    id: 'p6', titleKey: 'products.p6.name', descriptionKey: 'products.p6.desc',
    priceGBP: 149, category: 'api', icon: Globe, imageType: 'api',
  },
  {
    id: 'p7', titleKey: 'products.p7.name', descriptionKey: 'products.p7.desc',
    priceGBP: 119, category: 'tools', icon: BarChart3, imageType: 'bi',
  },
  {
    id: 'p8', titleKey: 'products.p8.name', descriptionKey: 'products.p8.desc',
    priceGBP: 69, category: 'tools', icon: Users, imageType: 'crm',
  },
];

const CATEGORIES = [
  { key: 'all', labelKey: 'All' },
  { key: 'templates', labelKey: 'products.cat.templates' },
  { key: 'digital', labelKey: 'products.cat.digital' },
  { key: 'automation', labelKey: 'products.cat.automation' },
  { key: 'api', labelKey: 'products.cat.api' },
  { key: 'ai', labelKey: 'products.cat.ai' },
  { key: 'tools', labelKey: 'products.cat.tools' },
  { key: 'workflow', labelKey: 'products.cat.workflow' },
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const cardFadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: smoothEase },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.96,
    transition: { duration: 0.25, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-component: ProductCard                                         */
/* ------------------------------------------------------------------ */

function ProductCard({ product, locale, currency }: { product: ProductCardData; locale: Locale; currency: 'GBP' | 'EUR' | 'USD' | 'BRL' }) {
  const Icon = product.icon;

  return (
    <motion.div
      layout
      variants={cardFadeUp}
      className="group relative flex flex-col overflow-hidden rounded-xl glass gradient-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Visual header image */}
      <div className="relative overflow-hidden">
        <ProductImage type={product.imageType} alt={t(product.titleKey, locale)} />
        {/* Icon overlay badge */}
        <div className="absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm border border-white/10">
          <Icon className="size-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-foreground">
          {t(product.titleKey, locale)}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t(product.descriptionKey, locale)}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <span className="text-xl font-bold text-foreground">
            {formatPrice(product.priceGBP, currency)}
          </span>
          <Button variant="default" size="sm">
            {t('products.buy', locale)}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function ProductsSection() {
  const locale = useAppStore((s) => s.locale);
  const currency = useAppStore((s) => s.currency);
  const productFilter = useAppStore((s) => s.productFilter);
  const setProductFilter = useAppStore((s) => s.setProductFilter);

  const filteredProducts =
    productFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === productFilter);

  return (
    <section
      id="products"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(800px, 80vw)',
            height: 'min(600px, 50vh)',
            background: 'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 4%) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-10 text-center"
        >
          <motion.p
            variants={headerFadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t('products.title', locale)}
          </motion.p>
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Products &{' '}
            <span className="gradient-text">Resources</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('products.subtitle', locale)}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-10"
        >
          <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:justify-center md:px-0">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.key}
                variant={productFilter === cat.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setProductFilter(cat.key)}
                className="shrink-0"
              >
                {cat.labelKey === 'All' ? 'All' : t(cat.labelKey, locale)}
              </Button>
            ))}
          </div>
        </motion.div>

        <LayoutGroup>
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  currency={currency}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
