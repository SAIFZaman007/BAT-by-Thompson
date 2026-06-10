import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollCanvas from "../ScrollCanvas.jsx";
import CryptoMarquee from "../CryptoMarquee.jsx";
import { prefersReducedMotion } from "../../lib/motion.js";

const steps = [
  "Apply with the onboarding form",
  "Upload KYC documents securely",
  "Receive USDT funding instructions",
  "Get support whenever you need it",
];

export default function Hero() {
  const root = useRef(null);
  const card = useRef(null);

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
      });
    }, root);
    return () => ctx.revert();
  }, []);
  useEffect(() => {
    if (!card.current || prefersReducedMotion()) return;
    const tween = gsap.to(card.current, {
      y: -10,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => tween.kill();
  }, []);
  return (
    <section
      id="home"
      ref={root}
      className="relative overflow-hidden bg-ink pt-16 text-white"
    >
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-teal/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 left-1/4 h-[28rem] w-[28rem] rounded-full bg-brand/40 blur-3xl"
        aria-hidden="true"
      />
      <ScrollCanvas />
      <div className="container-content relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <p data-hero className="eyebrow !text-teal">
            Bahamas AI Trading
          </p>
          <h1
            data-hero
            className="mt-5 text-4xl font-bold leading-tight text-white sm:text-5xl"
          >
            Bridging your finances with{" "}
            <span className="text-teal">AI clarity</span>.
          </h1>
          <p
            data-hero
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-300"
          >
            Access modern AI-powered trading support in a simple, professional
            way. Onboard through the website, complete KYC verification, receive
            funding instructions, and reach our support team by email.
          </p>
          <div data-hero className="mt-8 flex flex-wrap gap-3">
            <a
              href="#onboarding"
              className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Start onboarding
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:border-white/60"
            >
              See how it works
            </a>
          </div>
          <p data-hero className="mt-6 text-xs text-slate-400">
            Trading involves risk and profits are not guaranteed.{" "}
            <a
              href="#risk"
              className="underline decoration-gold underline-offset-2 hover:text-white"
            >
              Read the risk disclaimer
            </a>
          </p>
        </div>
        <div
          data-hero
          ref={card}
          className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            Your path to onboarding
          </p>
          <ol className="mt-5 space-y-4">
            {steps.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-3 text-sm text-slate-200"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-xs font-bold text-teal">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-content flex flex-wrap items-center gap-x-8 gap-y-2 py-4 text-xs text-slate-400">
          <span>
            <strong className="text-slate-200">KYC required</strong> before
            approval
          </span>
          <span>
            <strong className="text-slate-200">Bi-weekly</strong> payouts
          </span>
          <span>
            <strong className="text-slate-200">30-day notice</strong> for full
            withdrawal
          </span>
          <span>
            <strong className="text-slate-200">Email support</strong> for every
            client
          </span>
        </div>
      </div>
      <CryptoMarquee />
    </section>
  );
}
