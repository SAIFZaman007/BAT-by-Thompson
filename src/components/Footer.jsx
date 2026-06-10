import { SUPPORT_EMAIL } from "../lib/api.js";

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300">
      <div className="container-content grid gap-8 py-14 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-white">Bahamas AI Trading</p>
          <p className="mt-2 text-sm text-slate-400">Bridging your finances with AI clarity.</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Key terms</p>
          <ul className="mt-3 space-y-2 text-slate-400">
            <li>KYC verification required before approval</li>
            <li>Payouts processed bi-weekly</li>
            <li>Withdrawal / closure: 30 days written notice</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Customer support</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-3 inline-block text-teal hover:underline">{SUPPORT_EMAIL}</a>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Trading involves risk and profits are not guaranteed. Read the full risk disclaimer before onboarding.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Bahamas AI Trading. All rights reserved.
      </div>
    </footer>
  );
}
