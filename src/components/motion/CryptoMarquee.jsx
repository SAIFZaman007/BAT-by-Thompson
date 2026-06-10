const COINS = [
  ["BTC", "#F7931A"], ["ETH", "#8C8CA1"], ["USDT", "#26A17B"], ["SOL", "#9945FF"],
  ["BNB", "#F0B90B"], ["XRP", "#23292F"], ["ADA", "#2A6AB3"], ["TRX", "#C23631"],
  ["DOT", "#E6007A"], ["AVAX", "#E84142"], ["LINK", "#2A5ADA"], ["MATIC", "#7B3FE4"],
];

function CoinBadge({ ticker, color }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-7" aria-hidden="true">
      <svg width="44" height="48" viewBox="0 0 44 48">
        <polygon points="22,2 41,13 41,35 22,46 3,35 3,13" fill={color} opacity="0.16" />
        <polygon points="22,2 41,13 41,35 22,46 3,35 3,13" fill="none" stroke={color} strokeWidth="1.6" />
        <text x="22" y="29" textAnchor="middle" fontFamily="Sora, sans-serif" fontSize="10.5"
          fontWeight="700" fill={color}>{ticker}</text>
      </svg>
      <span className="text-sm font-semibold text-slate-400">{ticker}</span>
    </li>
  );
}

export default function CryptoMarquee() {
  // List duplicated once: when the first copy has scrolled fully out, the
  // animation loops seamlessly from -50%.
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-ink py-6">
      <p className="container-content mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
        Funding settled in USDT · markets monitored across major assets
      </p>
      <div className="marquee-mask">
        <ul className="marquee flex w-max items-center">
          {[...COINS, ...COINS].map(([t, c], i) => <CoinBadge key={`${t}-${i}`} ticker={t} color={c} />)}
        </ul>
      </div>
    </div>
  );
}
