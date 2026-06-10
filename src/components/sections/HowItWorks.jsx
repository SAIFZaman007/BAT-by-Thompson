import { SectionHeading } from "../ui/Primitives.jsx";
import { useReveal } from "../../lib/motion.js";

const steps = [
  ["Complete the onboarding form", "Tell us who you are: name, email, phone, and your USDT wallet address.", "#onboarding"],
  ["Upload your KYC documents", "Submit a government-issued ID securely. KYC must be completed before approval.", "#kyc"],
  ["Receive funding instructions", "Once verified, follow the USDT funding instructions to fund your account.", "#funding"],
  ["Trade with ongoing support", "Payouts are handled bi-weekly, and support is one email away.", "#contact"],
];

export default function HowItWorks() {
  const revealRef = useReveal();
  return (
    <section id="how-it-works" ref={revealRef} className="section-pad bg-surface">
      <div className="container-content">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps from application to active account"
          lead="The order matters: identity verification always comes before approval and funding."
        />
        <ol className="grid gap-6 lg:grid-cols-4">
          {steps.map(([title, body, href], i) => (
            <li key={title} data-reveal className="relative rounded-xl border border-slate-200 bg-white p-6">
              <span className="font-display text-sm font-bold text-gold">Step {i + 1}</span>
              <h3 className="mt-2 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              <a href={href} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">Go to this step →</a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
