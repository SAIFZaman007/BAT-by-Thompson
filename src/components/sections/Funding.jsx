import { SectionHeading } from "../ui/Primitives.jsx";
import { useReveal } from "../../lib/motion.js";

const steps = [
  "Complete onboarding and KYC verification first — funding instructions apply only to approved clients.",
  "After approval, you will receive your personal USDT deposit details by email from our support team.",
  "Send USDT on the agreed network only. Double-check the address and network before sending — crypto transfers can't be reversed.",
  "Email the transaction hash (TXID) to support so your deposit can be confirmed and credited.",
];

export default function Funding() {
  const revealRef = useReveal();
  return (
    <section id="funding" ref={revealRef} className="section-pad bg-white">
      <div className="container-content">
        <SectionHeading
          eyebrow="USDT funding instructions"
          title="How account funding works"
          lead="Funding is by USDT transfer. Instructions are issued individually after KYC approval — never send funds to an address that didn't come from our verified support email."
        />
        <ol className="grid gap-6 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={i} data-reveal className="flex items-start gap-4 rounded-xl border border-slate-200 bg-surface p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-soft font-display text-sm font-bold text-teal">{i + 1}</span>
              <p className="text-sm leading-relaxed text-slate-700">{s}</p>
            </li>
          ))}
        </ol>
        <p data-reveal className="mt-6 rounded-xl border border-gold/40 bg-gold-soft p-4 text-sm text-slate-700">
          <strong className="text-ink">Payout schedule:</strong> payouts are handled bi-weekly. Full withdrawal
          or account closure requires 30 days written notice to support.
        </p>
      </div>
    </section>
  );
}
