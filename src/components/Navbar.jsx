import { useEffect, useState } from "react";

const links = [
  ["About", "#about"],
  ["How it works", "#how-it-works"],
  ["Onboarding", "#onboarding"],
  ["KYC", "#kyc"],
  ["Funding", "#funding"],
  ["FAQ", "#faq"],
  ["Contact", "#contact"],
];

/**
 * Exodus-style navbar: fully transparent over the dark hero,
 * fades to a solid surface with dark text once you scroll.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  const linkCls = solid ? "text-slate-600 hover:text-brand" : "text-slate-300 hover:text-white";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-content flex h-16 items-center justify-between">
        <a href="#home" className={`font-display text-lg font-bold ${solid ? "text-ink" : "text-white"}`}>
          Bahamas <span className={solid ? "text-brand" : "text-teal"}>AI</span> Trading
          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-gold align-middle" aria-hidden="true" />
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={`text-sm font-medium transition-colors ${linkCls}`}>{label}</a>
          ))}
          <a
            href="#onboarding"
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              solid ? "bg-brand text-white hover:bg-brand-dark" : "bg-white text-ink hover:bg-slate-100"
            }`}
          >
            Start onboarding
          </a>
        </div>
        <button
          className={`rounded-md p-2 lg:hidden ${solid ? "text-ink" : "text-white"}`}
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-slate-700">
              {label}
            </a>
          ))}
          <a href="#onboarding" onClick={() => setOpen(false)} className="mt-2 block rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white">
            Start onboarding
          </a>
        </div>
      )}
    </nav>
  );
}
