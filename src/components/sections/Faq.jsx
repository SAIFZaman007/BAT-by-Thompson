import { SectionHeading } from "../ui/Primitives.jsx";
import { useReveal } from "../../lib/motion.js";

const faqs = [
  ["Do I have to complete KYC?", "Yes. Every client must complete KYC verification before their application can be approved. Upload a government-issued ID in the Secure KYC section."],
  ["How do I fund my account?", "Funding is by USDT transfer. After your KYC is approved, support emails you personal deposit instructions. Never use an address from any other source."],
  ["When are payouts made?", "Payouts are handled bi-weekly."],
  ["How do I withdraw fully or close my account?", "Full withdrawal or account closure requires 30 days written notice. Email support to start the process."],
  ["Is profit guaranteed?", "No. Trading involves risk and profits are not guaranteed. Read the risk disclaimer above before onboarding."],
  ["How do I contact support?", "By email, at the address in the Contact section below. You'll get a response from the team, usually within one business day."],
];

export default function Faq() {
  const revealRef = useReveal();
  return (
    <section id="faq" ref={revealRef} className="section-pad bg-surface">
      <div className="container-content max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faqs.map(([q, a]) => (
            <details key={q} data-reveal className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
                {q}
                <span className="ml-4 text-teal transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
