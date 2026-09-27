"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { growthPricing } from "@/lib/growth/pricing";
import { smmOffers } from "@/lib/growth/smm-catalog";

function buildWhatsAppHref(message: string) {
  try {
    const url = new URL(growthPricing.whatsappHref);
    url.searchParams.set("text", message);
    return url.toString();
  } catch {
    return growthPricing.whatsappHref;
  }
}

export function GrowthOrderForm({
  initialService,
  initialPlan,
}: {
  initialService?: string;
  initialPlan?: string;
}) {
  const initialSelection = initialPlan
    ? `plan:${initialPlan}`
    : initialService
      ? `service:${initialService}`
      : "";

  const [submitting, setSubmitting] = useState(false);
  const [selection, setSelection] = useState(initialSelection);

  const options = useMemo(
    () => [
      ...growthPricing.packages.map((plan) => ({
        value: `plan:${plan.id}`,
        label: `${plan.name} — ${plan.priceLabel}${plan.cadence}`,
      })),
      ...smmOffers.map((offer) => ({
        value: `service:${offer.id}`,
        label: offer.title,
      })),
    ],
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const social = String(form.get("social") ?? "").trim();
    const goal = String(form.get("goal") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const selectedLabel =
      options.find((option) => option.value === selection)?.label ?? selection;

    const message = [
      "Olá, quero avançar com AtlasHub Growth.",
      "",
      `Nome: ${name}`,
      `Empresa/Marca: ${company}`,
      `Email: ${email}`,
      `Interesse: ${selectedLabel || "Quero orientação"}`,
      social ? `Site/Perfil: ${social}` : "",
      goal ? `Objetivo: ${goal}` : "",
      notes ? `Notas: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Best-effort server-side intake. The commercial handoff remains WhatsApp
    // until Atendimento.Center CRM is connected in Phase 2B.
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: `AtlasHub Growth — ${selectedLabel || "Commercial request"}`,
          message,
        }),
      });
    } catch {
      // WhatsApp remains the reliable launch path even if the intake endpoint
      // is temporarily unavailable.
    }

    window.location.assign(buildWhatsAppHref(message));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel luminous-border rounded-3xl p-6 sm:p-8"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-400/10">
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
        </span>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300/75">
            Commercial intake
          </p>
          <h2 className="text-lg font-semibold text-white">
            Tell us what you want to activate
          </h2>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name">
          <input
            name="name"
            required
            minLength={2}
            className="growth-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Work email">
          <input
            name="email"
            required
            type="email"
            className="growth-input"
            placeholder="you@company.com"
          />
        </Field>
        <Field label="Company / brand">
          <input
            name="company"
            required
            minLength={2}
            className="growth-input"
            placeholder="Your brand"
          />
        </Field>
        <Field label="Website / social profile">
          <input
            name="social"
            className="growth-input"
            placeholder="https:// or @handle"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Service or plan">
          <select
            required
            value={selection}
            onChange={(event) => setSelection(event.target.value)}
            className="growth-input"
          >
            <option value="" disabled>
              Select an offer
            </option>
            <optgroup label="Growth Packages">
              {options
                .filter((option) => option.value.startsWith("plan:"))
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </optgroup>
            <optgroup label="SMM / Growth Services">
              {options
                .filter((option) => option.value.startsWith("service:"))
                .map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </optgroup>
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Primary objective">
          <input
            name="goal"
            className="growth-input"
            placeholder="Leads, sales, authority, content, automation..."
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Anything we should know?">
          <textarea
            name="notes"
            rows={4}
            className="growth-input resize-y"
            placeholder="Brief context, target market, channels, timing..."
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-white/40">
          The request is prepared for our commercial team. Final scope, delivery
          conditions and third-party costs are confirmed before activation.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500 px-6 text-sm font-semibold text-emerald-950 transition hover:from-emerald-300 hover:to-emerald-400 disabled:cursor-wait disabled:opacity-70"
        >
          <MessageCircle className="h-4 w-4" />
          {submitting ? "Preparing..." : "Continue on WhatsApp"}
          {!submitting ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </span>
      {children}
    </label>
  );
}

export default GrowthOrderForm;
