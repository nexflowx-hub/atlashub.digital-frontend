"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GrowthPrimaryCTA } from "@/components/growth/growth-cta";
import { growthPricing } from "@/lib/growth/pricing";

/**
 * GrowthAuditForm — Phase 1 front-end form for the free Growth Audit.
 *
 * No backend integration yet. On submit we simulate a request and show a
 * success state. Interfaces are prepared for future Atendimento.Center /
 * XPAYMENTS integration (see `onSubmit`).
 */

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Até R$ 1.000 / mês" },
  { value: "1k-3k", label: "R$ 1.000 – R$ 3.000 / mês" },
  { value: "3k-10k", label: "R$ 3.000 – R$ 10.000 / mês" },
  { value: "10k-plus", label: "R$ 10.000+ / mês" },
];

const GOAL_OPTIONS = [
  { value: "reach", label: "Mais alcance" },
  { value: "leads", label: "Mais leads" },
  { value: "reputation", label: "Reputação" },
  { value: "automation", label: "Automação com IA" },
  { value: "full", label: "Sistema de crescimento completo" },
];

type FormState = "idle" | "submitting" | "success";

export function GrowthAuditForm() {
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    // Phase 1: no backend. Simulate async for UX.
    // TODO(Phase 2): POST to /api/growth/audit → Atendimento.Center lead intake.
    await new Promise((r) => setTimeout(r, 1100));
    setState("success");
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel luminous-border relative overflow-hidden rounded-3xl p-8 text-center md:p-12"
      >
        <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/30">
          <CheckCircle2 className="h-8 w-8 text-emerald-300" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">
          Audit request received
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Obrigado! Nossa equipe entrará em contato em até 1 dia útil com seu
          Growth Audit personalizado.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <GrowthPrimaryCTA href={growthPricing.whatsappHref} external>
            <MessageCircle className="h-4 w-4" />
            Talk on WhatsApp
          </GrowthPrimaryCTA>
          <Button
            variant="ghost"
            onClick={() => setState("idle")}
            className="h-11 rounded-full px-6 text-white/80 hover:text-white"
          >
            Submit another
          </Button>
        </div>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          Demo interface — no data is stored in Phase 1
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel luminous-border relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10"
    >
      <div className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/30">
          <ShieldCheck className="h-4 w-4 text-emerald-300" />
        </span>
        <div className="flex flex-col leading-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Free
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            Growth Audit
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/20"
            />
          </Field>
          <Field label="Work email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@brand.com"
              className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/20"
            />
          </Field>
          <Field label="Company / brand" htmlFor="company">
            <Input
              id="company"
              name="company"
              required
              placeholder="Your brand"
              className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/20"
            />
          </Field>
          <Field label="Website or main social" htmlFor="website">
            <Input
              id="website"
              name="website"
              placeholder="https:// or @handle"
              className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/20"
            />
          </Field>
          <Field label="Monthly budget" htmlFor="budget">
            <Select name="budget">
              <SelectTrigger
                id="budget"
                className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white data-[placeholder]:text-white/30 focus:border-emerald-400/50 focus:ring-emerald-400/20"
              >
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[oklch(0.16_0.005_180)] text-white">
                {BUDGET_OPTIONS.map((o) => (
                  <SelectItem
                    key={o.value}
                    value={o.value}
                    className="focus:bg-emerald-400/10 focus:text-emerald-200"
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Primary goal" htmlFor="goal">
            <Select name="goal">
              <SelectTrigger
                id="goal"
                className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-white data-[placeholder]:text-white/30 focus:border-emerald-400/50 focus:ring-emerald-400/20"
              >
                <SelectValue placeholder="Select a goal" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[oklch(0.16_0.005_180)] text-white">
                {GOAL_OPTIONS.map((o) => (
                  <SelectItem
                    key={o.value}
                    value={o.value}
                    className="focus:bg-emerald-400/10 focus:text-emerald-200"
                  >
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Anything else? (optional)" htmlFor="message">
          <Textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell us about your goals, challenges, or timeline."
            className="rounded-xl border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus-visible:border-emerald-400/50 focus-visible:ring-emerald-400/20"
          />
        </Field>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            No commitment · Reply within 1 business day
          </p>
          <Button
            type="submit"
            disabled={state === "submitting"}
            className={cn(
              "btn-glow h-11 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500 px-6 text-sm font-medium text-emerald-950 hover:from-emerald-300 hover:to-emerald-400",
            )}
          >
            {state === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Get my free audit
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor={htmlFor}
        className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

export default GrowthAuditForm;
