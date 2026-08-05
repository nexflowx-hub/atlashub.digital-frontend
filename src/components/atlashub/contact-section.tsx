'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Globe,
  Mail,
  Send,
  Phone,
  MessageCircle,
  MapPin,
  Loader2,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

/* ------------------------------------------------------------------ */
/*  Form schema                                                        */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Contact info items                                                 */
/* ------------------------------------------------------------------ */

interface ContactInfoItem {
  id: string;
  labelKey: string;
  value: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CONTACT_INFO: ContactInfoItem[] = [
  {
    id: 'website',
    labelKey: 'contact.info.website',
    value: 'https://atlashub.digital',
    href: 'https://atlashub.digital',
    icon: Globe,
  },
  {
    id: 'email',
    labelKey: 'contact.info.email',
    value: 'support@atlashub.digital',
    href: 'mailto:support@atlashub.digital',
    icon: Mail,
  },
  {
    id: 'telegram',
    labelKey: 'contact.info.telegram',
    value: '@AtlasHubDigital',
    icon: Send,
  },
  {
    id: 'phone',
    labelKey: 'contact.info.phone',
    value: '+44 7451 245014',
    href: 'tel:+447451245014',
    icon: Phone,
  },
  {
    id: 'whatsapp',
    labelKey: 'contact.info.whatsapp',
    value: '+44 7451 245014',
    href: 'https://wa.me/447451245014',
    icon: MessageCircle,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  const locale = useAppStore((s) => s.locale);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');

      toast.success(t('contact.form.success', locale));
      reset();
    } catch {
      toast.error(t('contact.form.error', locale));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(900px, 90vw)',
            height: 'min(600px, 50vh)',
            background:
              'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 4%) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ---- Section Header ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            <span className="gradient-text">{t('contact.title', locale)}</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('contact.subtitle', locale)}
          </motion.p>
        </motion.div>

        {/* ---- Two-column layout ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-12 lg:grid-cols-2"
        >
          {/* ---- Left column: Info ---- */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Contact info items */}
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? 'a' : 'div';
              return (
                <Wrapper
                  key={item.id}
                  {...(item.href ? { href: item.href, target: item.href.startsWith('http') ? '_blank' : undefined, rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined } : {})}
                  className="group flex items-center gap-4 rounded-lg p-3 transition-colors duration-200 hover:bg-muted/50"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-200 group-hover:bg-primary/15">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {t(item.labelKey, locale)}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}

            {/* Google Maps placeholder */}
            <div className="mt-2 flex flex-col items-center justify-center rounded-xl border border-border bg-muted/30 p-10">
              <MapPin className="mb-3 size-8 text-muted-foreground/60" />
              <p className="text-sm font-medium text-muted-foreground">
                London, United Kingdom
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                71–75 Shelton Street, Covent Garden, WC2H 9JQ
              </p>
            </div>
          </motion.div>

          {/* ---- Right column: Form ---- */}
          <motion.div variants={fadeUp}>
            <Card className="glass p-6 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">
                    {t('contact.form.name', locale)}
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder={t('contact.form.name', locale)}
                    {...register('name')}
                    className="bg-background/50"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-email">
                    {t('contact.form.email', locale)}
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder={t('contact.form.email', locale)}
                    {...register('email')}
                    className="bg-background/50"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-subject">
                    {t('contact.form.subject', locale)}
                  </Label>
                  <Input
                    id="contact-subject"
                    placeholder={t('contact.form.subject', locale)}
                    {...register('subject')}
                    className="bg-background/50"
                  />
                  {errors.subject && (
                    <p className="text-xs text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message">
                    {t('contact.form.message', locale)}
                  </Label>
                  <Textarea
                    id="contact-message"
                    rows={4}
                    placeholder={t('contact.form.message', locale)}
                    {...register('message')}
                    className="bg-background/50 resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 w-full"
                  size="lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      {t('contact.form.sending', locale)}
                    </>
                  ) : (
                    t('contact.form.submit', locale)
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
