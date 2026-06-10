import { SectionHeading } from "../ui/Primitives.jsx";
import IllustrationPanel from "../IllustrationPanel.jsx";
import { useReveal } from "../../lib/motion.js";

const values = [
  ["Professional", "A clear, documented onboarding process — no surprises, no jargon."],
  ["Transparent", "Key terms like payout timing and notice periods are published up front."],
  ["Supported", "Every client can reach our support team directly by email."],
];

export default function About() {
  const ref = useReveal();
  return (
    <section id="about" ref={ref} className="section-pad overflow-hidden bg-white">
      <div className="container-content grid items-center gap-14 lg:grid-cols-2">
        <div>
          <div data-reveal>
            <SectionHeading
              eyebrow="About us"
              title="Modern trading support, kept simple"
              lead="Bahamas AI Trading helps clients access AI-powered trading support in a simple and professional way. Apply, verify your identity, fund your account, and stay in contact with a real support team."
            />
          </div>
          <div className="space-y-4">
            {values.map(([title, body]) => (
              <div key={title} data-reveal className="flex gap-4 rounded-xl border border-slate-200 bg-surface p-5">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <div>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal>
          <IllustrationPanel variant="dashboard" />
        </div>
      </div>
    </section>
  );
}
