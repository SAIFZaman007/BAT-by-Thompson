import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api, SUPPORT_EMAIL } from "../../lib/api.js";
import { Button, Field, Notice, SectionHeading, inputCls } from "../ui/Primitives.jsx";
import { useReveal } from "../../lib/motion.js";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(5, "Tell us how we can help."),
});

export default function Contact() {
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setError(""); setDone("");
    try {
      const res = await api.sendContact(data);
      setDone(res.message);
      reset();
    } catch (e) {
      setError(e.message);
    }
  };

  const revealRef = useReveal();
  return (
    <section id="contact" ref={revealRef} className="section-pad bg-white">
      <div className="container-content grid gap-12 lg:grid-cols-5">
        <div data-reveal className="lg:col-span-2">
          <SectionHeading
            eyebrow="Contact & customer support"
            title="Talk to a real person"
            lead="Questions about onboarding, KYC, funding, payouts, or withdrawals — send a message here or email support directly."
          />
          <div className="rounded-xl border border-slate-200 bg-surface p-5">
            <p className="text-sm font-semibold text-ink">Customer support email</p>
            <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-1 inline-block break-all text-base font-semibold text-brand hover:underline">
              {SUPPORT_EMAIL}
            </a>
            <p className="mt-3 text-xs text-slate-500">
              Withdrawal and account-closure notices must be sent in writing to this address.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate data-reveal className="space-y-5 rounded-2xl border border-slate-200 bg-surface p-6 sm:p-6 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" error={errors.name?.message}>
              <input className={inputCls} autoComplete="name" {...register("name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input className={inputCls} type="email" autoComplete="email" {...register("email")} />
            </Field>
          </div>
          <Field label="Message" error={errors.message?.message}>
            <textarea className={`${inputCls} min-h-[120px]`} {...register("message")} />
          </Field>
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send message"}</Button>
          {done && <Notice>{done}</Notice>}
          {error && <Notice kind="error">{error}</Notice>}
        </form>
      </div>
    </section>
  );
}