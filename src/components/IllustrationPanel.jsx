import { useFloat, useParallax } from "../lib/motion.js";

/**
 * Illustration panels used across the landing page.
 *
 * variant="dashboard"  → About section  (right column)
 * variant="shield"     → KYC section    (left column, desktop only)
 *
 * Both variants fill their column completely — no empty white space.
 */
export default function IllustrationPanel({ variant = "dashboard" }) {
  const float = useFloat(8, 5);
  const parallax = useParallax(40);

  return (
    <div ref={parallax} className="relative mx-auto w-full max-w-md">
      {/* Soft glow behind the card */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 translate-y-6 rounded-full bg-brand/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        ref={float}
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#11254A] to-ink p-6 shadow-2xl shadow-brand/20 md:mt-10"
      >
        {variant === "dashboard" ? <TrustVisual /> : <SecurityFeatureList />}
      </div>
    </div>
  );
}

/* ── About section visual ─────────────────────────────────────────────────
 * Stats grid + sparkline chart + process steps.
 * Fills the right column completely — no empty white space.
 */
function TrustVisual() {
  const stats = [
    { label: "Clients onboarded", value: "1,200+",   accent: "#0E9E8F" },
    { label: "Assets monitored",  value: "40+",      accent: "#C9A24B" },
    { label: "Avg. KYC approval", value: "< 48 h",   accent: "#60A5FA" },
    { label: "Payout cycle",      value: "Bi-weekly", accent: "#9AE6B4" },
  ];

  const bars = [30, 45, 38, 60, 52, 78, 65, 90, 74, 100, 88, 95];

  const steps = [
    "Apply online",
    "KYC verification",
    "Fund via USDT",
    "Bi-weekly payouts",
  ];

  return (
    <div aria-hidden="true" className="space-y-6 md:space-y-8 lg:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal">
          Platform at a glance
        </span>
        <span className="rounded-full bg-teal/15 px-2.5 py-1 text-[10px] font-bold text-teal">
          LIVE
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map(({ label, value, accent }) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] text-slate-400">{label}</p>
            <p className="mt-1 text-xl font-bold" style={{ color: accent }}>
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* Sparkline bar chart */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-[10px] text-slate-400">Funding volume (illustrative)</p>
        <div className="flex h-16 items-end gap-1">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: "linear-gradient(to top,#0E9E8F,#60A5FA)",
                opacity: 0.45 + i * 0.045,
              }}
            />
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gold">
          How it works
        </p>
        <ol className="space-y-2.5">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-xs text-slate-300">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-[10px] font-bold text-teal">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── KYC section visual ───────────────────────────────────────────────────
 * Security commitment list — professional, no animation gimmicks.
 * Fills the left column completely alongside the upload form.
 */
function SecurityFeatureList() {
  const items = [
    {
      icon: "/LockKey.png",
      title: "AES-256 encryption at rest",
      body: "Documents are encrypted with a Fernet key before they ever touch disk storage.",
    },
    {
      icon: "/ShieldCheck.png",
      title: "HTTPS-only transfer",
      body: "All uploads transit over TLS 1.3. Plain-HTTP submissions are rejected.",
    },
    {
      icon: "/Eye.png",
      title: "Verification team access only",
      body: "KYC files are accessible solely to authorised reviewers — never shared or indexed.",
    },
    {
      icon: "/Trash.png",
      title: "Purged after approval",
      body: "Documents are deleted once KYC status is confirmed to minimise data exposure.",
    },
    {
      icon: "/Note.png",
      title: "Accepted formats",
      body: "PDF, JPG, PNG — up to 10 MB. File type is verified by magic bytes, not extension.",
    },
  ];

  return (
    <div aria-hidden="true" className="space-y-1">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-teal">
        Security commitments
      </p>
      <ul className="space-y-4">
        {items.map(({ icon, title, body }) => (
          <li key={title} className="flex gap-3">
<img src={icon} alt="" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}