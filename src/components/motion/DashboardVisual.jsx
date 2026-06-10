import { useFloat } from "../../hooks/useReveal.js";

/** Stylized product visual — an abstract trading console. Pure SVG, no images needed. */
export default function DashboardVisual() {
  const ref = useFloat();
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md" data-reveal>
      <div className="absolute -inset-8 rounded-[2.5rem] bg-teal/15 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 420 300" className="relative w-full drop-shadow-2xl" role="img"
        aria-label="Illustration of the trading support console">
        <rect x="0" y="0" width="420" height="300" rx="18" fill="#0B1B33" stroke="#1E3A5F" />
        <rect x="0" y="0" width="420" height="36" rx="18" fill="#10306F" opacity="0.5" />
        <circle cx="22" cy="18" r="4" fill="#C9A24B" />
        <circle cx="38" cy="18" r="4" fill="#0E9E8F" />
        <circle cx="54" cy="18" r="4" fill="#60A5FA" />
        <text x="210" y="23" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="Sora">AI clarity console</text>
        <polyline points="28,210 70,180 112,196 154,150 196,168 238,120 280,140 322,96 364,116 396,84"
          fill="none" stroke="#0E9E8F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="28,230 70,224 112,232 154,210 196,220 238,196 280,206 322,180 364,190 396,168"
          fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <g fontFamily="Inter, sans-serif">
          <rect x="28" y="54" width="110" height="52" rx="10" fill="#13294B" />
          <text x="40" y="74" fill="#94A3B8" fontSize="10">Onboarding</text>
          <text x="40" y="94" fill="#FFFFFF" fontSize="16" fontWeight="600">Verified ✓</text>
          <rect x="150" y="54" width="110" height="52" rx="10" fill="#13294B" />
          <text x="162" y="74" fill="#94A3B8" fontSize="10">Payouts</text>
          <text x="162" y="94" fill="#FFFFFF" fontSize="16" fontWeight="600">Bi-weekly</text>
          <rect x="272" y="54" width="120" height="52" rx="10" fill="#13294B" stroke="#C9A24B" strokeOpacity="0.5" />
          <text x="284" y="74" fill="#94A3B8" fontSize="10">Support</text>
          <text x="284" y="94" fill="#C9A24B" fontSize="14" fontWeight="600">1 email away</text>
        </g>
        <rect x="28" y="252" width="364" height="26" rx="8" fill="#13294B" />
        <text x="40" y="269" fill="#64748B" fontSize="10" fontFamily="Inter">KYC required before approval · 30-day notice for full withdrawal</text>
      </svg>
    </div>
  );
}
