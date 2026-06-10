export function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    ghost: "bg-white text-brand border border-brand/30 hover:border-brand",
    gold: "bg-ink text-white hover:bg-brand-dark ring-1 ring-gold/60",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-teal focus:ring-1 focus:ring-teal";

export function SectionHeading({ eyebrow, title, lead }) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {lead && <p className="mt-4 text-base leading-relaxed text-slate-600">{lead}</p>}
    </header>
  );
}

export function Notice({ kind = "success", children }) {
  const cls = kind === "success" ? "bg-teal-soft text-teal border-teal/30" : "bg-red-50 text-red-700 border-red-200";
  return <div role="status" className={`mt-4 rounded-lg border px-4 py-3 text-sm ${cls}`}>{children}</div>;
}
