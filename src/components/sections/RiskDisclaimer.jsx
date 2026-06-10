export default function RiskDisclaimer() {
  return (
    <section id="risk" className="section-pad bg-ink text-slate-300">
      <div className="container-content max-w-3xl">
        <p className="eyebrow !text-gold">Risk disclaimer</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Please read before onboarding</h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed">
          <p>
            Trading involves significant risk, and <strong className="text-white">profits are not guaranteed</strong>.
            The value of your account can go down as well as up, and you may lose some or all of the funds you deposit.
            Past performance is not an indicator of future results.
          </p>
          <p>
            AI-assisted strategies do not eliminate risk. Market conditions, volatility, and external events can
            produce losses regardless of the tools used. Only commit funds you can afford to lose.
          </p>
          <p>
            By onboarding you acknowledge the operational terms published on this site: KYC verification is required
            before approval, payouts are processed bi-weekly, and full withdrawal or account closure requires
            30 days written notice.
          </p>
          <p>
            Nothing on this website constitutes financial, investment, legal, or tax advice. Consider seeking
            independent professional advice before participating.
          </p>
        </div>
      </div>
    </section>
  );
}
