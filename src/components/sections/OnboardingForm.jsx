import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api.js";
import { Button, Field, Notice, SectionHeading, inputCls } from "../ui/Primitives.jsx";
import { useReveal } from "../../lib/motion.js";

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full legal name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(5, "Enter a phone number we can reach you on."),
  wallet_address: z.string().trim().min(10, "Enter your USDT wallet address."),
  details: z.string().trim().max(2000).optional().or(z.literal("")),
});

export default function OnboardingForm() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await api.submitOnboarding({ ...data, details: data.details || "" });
      setResult(res);
      reset();
    } catch (e) {
      setError(e.message);
    }
  };

  const revealRef = useReveal();
  return (
    <section id="onboarding" ref={revealRef} className="section-pad bg-white">
      <div className="container-content grid gap-12 lg:grid-cols-5">
        <div data-reveal className="lg:col-span-2 md:mt-6">
          <SectionHeading
            eyebrow="Client onboarding"
            title="Start your application"
            lead="Fill in your details below. You'll get a reference code immediately — keep it, you'll need it to upload your KYC documents in the next step."
          />
          <div className="rounded-xl border border-gold/40 bg-gold-soft p-5 md:p-6 text-sm md:text-base leading-relaxed text-slate-700">
            <strong className="text-ink">Before you apply:</strong> you must complete KYC before approval,
            payouts are handled bi-weekly, and full withdrawal or account closure requires 30 days written notice.
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate data-reveal className="space-y-4 rounded-2xl border border-slate-200 bg-surface p-4 md:p-6 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.full_name?.message}>
              <input className={inputCls} autoComplete="name" {...register("full_name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className={inputCls} type="email" autoComplete="email" {...register("email")} />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <input className={inputCls} type="tel" autoComplete="tel" placeholder="+1 242 ..." {...register("phone")} />
            </Field>
            <Field label="USDT wallet address" error={errors.wallet_address?.message}>
              <input className={inputCls} spellCheck="false" {...register("wallet_address")} />
            </Field>
          </div>
          <Field label="Anything else we should know? (optional)" error={errors.details?.message}>
            <textarea className={`${inputCls} min-h-[96px]`} {...register("details")} />
          </Field>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Submitting…" : "Submit application"}
          </Button>
          {result && (
            <Notice>
              Application received. Your reference code is{" "}
              <strong className="font-mono">{result.reference_code}</strong> — use it in the KYC upload below.
            </Notice>
          )}
          {error && <Notice kind="error">{error}</Notice>}
        </form>
      </div>
    </section>
  );
}
