'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { t, localeNames, availableLocales } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

interface NavItem {
  labelKey: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.solutions', href: '#solutions' },
  { labelKey: 'nav.products', href: '#products' },
  { labelKey: 'nav.pricing', href: '#pricing' },
  { labelKey: 'nav.company', href: '#company' },
  { labelKey: 'nav.contact', href: '#contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const locale = useAppStore((s) => s.locale);
  const setLocale = useAppStore((s) => s.setLocale);
  const setActiveSection = useAppStore((s) => s.setActiveSection);
  const activeSection = useAppStore((s) => s.activeSection);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* ---------- scroll listener (glass background) ---------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---------- IntersectionObserver for active section ---------- */
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.2, 0.5], rootMargin: '-80px 0px -40% 0px' },
    );

    const ids = ['hero', ...SECTION_IDS];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [setActiveSection]);

  /* ---------- smooth scroll helper ---------- */
  const scrollTo = useCallback(
    (href: string) => {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    },
    [],
  );

  /* ---------- locale switch handler ---------- */
  const handleLocaleChange = useCallback(
    (loc: string) => {
      setLocale(loc as Locale);
    },
    [setLocale],
  );

  /* ---------- helpers ---------- */
  const isActive = (href: string) =>
    activeSection === href.replace('#', '');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/10' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        {/* ---- Logo ---- */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="flex items-baseline gap-1 select-none"
        >
          <span className="text-lg font-bold tracking-tight text-foreground">
            AtlasHub
          </span>
          <span className="text-lg font-light text-primary">Digital</span>
        </a>

        {/* ---- Desktop links ---- */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollTo(item.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(item.labelKey, locale)}
                {/* Active indicator bar */}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ---- Right-hand controls ---- */}
        <div className="flex items-center gap-2">
          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Globe className="size-4" />
                <span className="hidden sm:inline">
                  {localeNames[locale]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLocales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={locale === loc ? 'text-primary font-medium' : ''}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop CTA */}
          <Button
            size="sm"
            className="hidden md:inline-flex"
            onClick={() => scrollTo('#contact')}
          >
            {t('nav.getStarted', locale)}
          </Button>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              asChild
            >
              <SheetTrigger asChild>
                <button aria-label="Open navigation menu">
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
            </Button>

            <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle className="flex items-baseline gap-1">
                  <span className="font-bold text-foreground">AtlasHub</span>
                  <span className="font-light text-primary">Digital</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <SheetClose asChild key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className={`rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      {t(item.labelKey, locale)}
                    </button>
                  </SheetClose>
                ))}

                <div className="mt-4 border-t border-border pt-4">
                  <SheetClose asChild>
                    <Button className="w-full" size="lg">
                      {t('nav.getStarted', locale)}
                    </Button>
                  </SheetClose>
                </div>

                {/* Language selector inside mobile menu */}
                <div className="mt-4 border-t border-border pt-4">
                  <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Language
                  </p>
                  <div className="flex flex-col gap-1">
                    {availableLocales.map((loc) => (
                      <SheetClose asChild key={loc}>
                        <button
                          onClick={() => handleLocaleChange(loc)}
                          className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                            locale === loc
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                          }`}
                        >
                          {localeNames[loc]}
                        </button>
                      </SheetClose>
                    ))}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
