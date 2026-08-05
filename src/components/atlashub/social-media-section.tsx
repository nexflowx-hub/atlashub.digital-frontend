'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FileText, Users, Megaphone, BarChart3, UserCheck, Palette, type LucideIcon } from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SocialService {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

const SERVICES: SocialService[] = [
  { titleKey: 'social.s1.title', descKey: 'social.s1.desc', icon: FileText },
  { titleKey: 'social.s2.title', descKey: 'social.s2.desc', icon: Users },
  { titleKey: 'social.s3.title', descKey: 'social.s3.desc', icon: Megaphone },
  { titleKey: 'social.s4.title', descKey: 'social.s4.desc', icon: BarChart3 },
  { titleKey: 'social.s5.title', descKey: 'social.s5.desc', icon: UserCheck },
  { titleKey: 'social.s6.title', descKey: 'social.s6.desc', icon: Palette },
];

/* ------------------------------------------------------------------ */
/*  Animation                                                          */
/* ------------------------------------------------------------------ */

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smoothEase } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: smoothEase },
  }),
};

/* ------------------------------------------------------------------ */
/*  Social platform icons (clean SVGs)                                 */
/* ------------------------------------------------------------------ */

function PlatformIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* Instagram */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-pink-400" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
      {/* X / Twitter */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-white" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      {/* LinkedIn */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-blue-400" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
      {/* Facebook */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-blue-500" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
      {/* YouTube */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-red-500" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      {/* TikTok */}
      <svg viewBox="0 0 24 24" className="size-6 text-white/70 transition-colors hover:text-teal-400" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SocialMediaSection() {
  const locale = useAppStore((s) => s.locale);

  return (
    <section id="social-media" className="relative overflow-hidden px-4 py-24 md:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(900px, 85vw)',
            height: 'min(500px, 40vh)',
            background: 'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 3%) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-12 text-center"
        >
          <motion.p
            variants={headerFadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t('social.title', locale)}
          </motion.p>
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight md:text-5xl"
          >
            Social Media{' '}
            <span className="gradient-text">Agency</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('social.subtitle', locale)}
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Image + platform icons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smoothEase }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/50">
              <Image
                src="/social-media-marketing.png"
                alt="Social media marketing"
                width={1344}
                height={768}
                className="w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Platform icons overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <PlatformIcons />
                <p className="mt-3 text-sm font-medium text-white/60">@atlashubdigital</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Service cards grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.titleKey}
                  custom={i}
                  variants={cardVariant}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="group rounded-xl glass gradient-border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t(service.titleKey, locale)}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                    {t(service.descKey, locale)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
