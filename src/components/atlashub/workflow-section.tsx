'use client';

import { motion } from 'framer-motion';
import {
  User,
  Globe,
  CreditCard,
  Cog,
  FileText,
  Mail,
  Users,
  BarChart3,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { t } from '@/lib/i18n';
import { useAppStore } from '@/stores/app-store';
import { smoothEase } from '@/lib/motion';
import type { Locale } from '@/types';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WorkflowNodeData {
  id: string;
  labelKey: string;
  icon: LucideIcon;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const WORKFLOW_NODES: WorkflowNodeData[] = [
  { id: 'customer', labelKey: 'workflow.step.customer', icon: User },
  { id: 'website', labelKey: 'workflow.step.website', icon: Globe },
  { id: 'stripe', labelKey: 'workflow.step.stripe', icon: CreditCard },
  { id: 'automation', labelKey: 'workflow.step.automation', icon: Cog },
  { id: 'invoice', labelKey: 'workflow.step.invoice', icon: FileText },
  { id: 'email', labelKey: 'workflow.step.email', icon: Mail },
  { id: 'crm', labelKey: 'workflow.step.crm', icon: Users },
  { id: 'analytics', labelKey: 'workflow.step.analytics', icon: BarChart3 },
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerFadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const nodeReveal = {
  hidden: { opacity: 0, scale: 0.8, y: 16 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: smoothEase },
  },
};

const connectorGrow = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.4, ease: smoothEase },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Single workflow node with icon, label, and pulse ring */
function WorkflowNode({
  node,
  locale,
  isActive,
}: {
  node: WorkflowNodeData;
  locale: Locale;
  isActive: boolean;
}) {
  const Icon = node.icon;

  return (
    <motion.div variants={nodeReveal} className="group relative flex flex-col items-center">
      {/* Pulse ring behind icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="block rounded-full border-2 border-primary/20"
          animate={isActive ? { scale: [1, 1.6], opacity: [0.4, 0] } : { scale: 1, opacity: 0 }}
          transition={
            isActive
              ? { duration: 2, repeat: Infinity, ease: 'easeOut' }
              : { duration: 0.3 }
          }
          style={{ width: 56, height: 56 }}
        />
      </div>

      {/* Icon circle */}
      <div
        className={`relative z-10 flex size-14 items-center justify-center rounded-full border transition-all duration-300 ${
          isActive
            ? 'border-primary/40 bg-primary/15 shadow-lg shadow-primary/10'
            : 'border-border bg-card hover:border-primary/30 hover:bg-primary/10'
        }`}
      >
        <Icon
          className={`size-6 transition-colors duration-300 ${
            isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
          }`}
        />
      </div>

      {/* Label */}
      <span
        className={`mt-3 whitespace-nowrap text-xs font-medium transition-colors duration-300 sm:text-sm ${
          isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
        }`}
      >
        {t(node.labelKey, locale)}
      </span>
    </motion.div>
  );
}

/** Animated connector arrow between two nodes */
function Connector({ index }: { index: number }) {
  return (
    <motion.div
      variants={connectorGrow}
      className="hidden flex-shrink-0 items-center self-center py-0 sm:flex"
      style={{ width: 40, originX: 0 }}
    >
      {/* Animated line */}
      <div className="relative h-px flex-1 bg-gradient-to-r from-primary/30 to-primary/10">
        <motion.div
          className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-primary/60 to-transparent"
          animate={{ x: [0, 32, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
        />
      </div>
      <ArrowRight className="size-3.5 shrink-0 text-primary/40" />
    </motion.div>
  );
}

/** Vertical connector for mobile */
function MobileConnector({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="flex flex-shrink-0 items-center px-8 py-2 sm:hidden"
      style={{ height: 32, originY: 0 }}
    >
      <div className="relative flex flex-col items-center">
        <div className="h-4 w-px bg-gradient-to-b from-primary/30 to-primary/10">
          <motion.div
            className="absolute top-0 h-2 w-full bg-gradient-to-b from-primary/60 to-transparent"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}
          />
        </div>
        <ArrowRight className="size-3.5 rotate-90 text-primary/40" />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Component                                                  */
/* ------------------------------------------------------------------ */

export function WorkflowSection() {
  const locale = useAppStore((s) => s.locale);

  return (
    <section
      id="workflow"
      className="relative overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />

      {/* Background glow */}
      <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden="true">
        <div
          style={{
            width: 'min(600px, 60vw)',
            height: 'min(500px, 40vh)',
            background:
              'radial-gradient(ellipse at center, oklch(0.7 0.18 160 / 3%) 0%, transparent 70%)',
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
          <motion.p
            variants={headerFadeUp}
            className="mb-3 text-sm font-medium uppercase tracking-widest text-primary"
          >
            {t('workflow.title', locale)}
          </motion.p>
          <motion.h2
            variants={headerFadeUp}
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Seamless{' '}
            <span className="gradient-text">Business Automation</span>
          </motion.h2>
          <motion.p
            variants={headerFadeUp}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            {t('workflow.subtitle', locale)}
          </motion.p>
        </motion.div>

        {/* ---- Desktop Workflow Pipeline ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="hidden items-start sm:flex"
        >
          {WORKFLOW_NODES.map((node, index) => (
            <div key={node.id} className="flex items-start">
              <WorkflowNode node={node} locale={locale} isActive={index === 3} />
              {index < WORKFLOW_NODES.length - 1 && <Connector index={index} />}
            </div>
          ))}
        </motion.div>

        {/* ---- Mobile Workflow Pipeline (vertical) ---- */}
        <div className="flex flex-col items-center sm:hidden">
          {WORKFLOW_NODES.map((node, index) => (
            <div key={`mobile-${node.id}`} className="flex flex-col items-center">
              <motion.div
                variants={nodeReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <WorkflowNode node={node} locale={locale} isActive={index === 3} />
              </motion.div>
              {index < WORKFLOW_NODES.length - 1 && <MobileConnector index={index} />}
            </div>
          ))}
        </div>

        {/* ---- Bottom description cards ---- */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            {
              title: 'End-to-End',
              desc: 'From customer acquisition to analytics, every touchpoint is connected.',
            },
            {
              title: 'Real-Time',
              desc: 'Instant data flow between systems with zero manual intervention.',
            },
            {
              title: 'AI-Powered',
              desc: 'Intelligent automation that learns and adapts to your business patterns.',
            },
            {
              title: 'Scalable',
              desc: 'Infrastructure that grows with your business, from startup to enterprise.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={nodeReveal}
              className="rounded-lg border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-primary/20"
            >
              <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
