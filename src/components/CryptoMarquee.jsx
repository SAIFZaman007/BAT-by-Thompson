/**
 * Infinite, gap-free horizontal marquee.
 *
 * Three copies of the coin list are rendered. The animation translates by
 * exactly -33.333% (= one copy width), then loops. Because there are always
 * two full copies visible on either side, the seam is never exposed — even on
 * ultra-wide screens where a single-copy approach creates empty gaps.
 *
 * Pure CSS transform → GPU composited. Pauses on hover. Off under reduced-motion.
 */
const COINS = [
  ["₿", "#F7931A", "BTC"],
  ["Ξ", "#8C8CA1", "ETH"],
  ["₮", "#26A17B", "USDT"],
  ["◎", "#9945FF", "SOL"],
  ["✕", "#23B6E4", "XRP"],
  ["Ł", "#BFBBBB", "LTC"],
  ["∞", "#C9A24B", "BNB"],
  ["Đ", "#C2A633", "DOGE"],
  ["Ⓐ", "#0E9E8F", "ADA"],
  ["⬡", "#7C8DF0", "DOT"],
  ["⌬", "#E84142", "AVAX"],
  ["◈", "#2A5ADA", "LINK"],
];

export default function CryptoMarquee() {
  // Three copies guarantee no gap at any viewport width.
  const track = [...COINS, ...COINS, ...COINS];

  return (
    <div className="relative overflow-hidden border-t border-white/10 bg-ink py-6">
      <p className="container-content mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Funding settled in USDT · familiar with the assets you already hold
      </p>

      {/* Scrolling track */}
      <div className="marquee-outer" aria-hidden="true">
        <ul className="marquee-track flex w-max items-center">
          {track.map(([glyph, color, label], i) => (
            <li
              key={i}
              className="mx-4 flex shrink-0 flex-col items-center gap-1.5"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center text-lg font-bold"
                style={{
                  background: `linear-gradient(160deg, ${color}22, #0B1B3388 70%)`,
                  border: `1.5px solid ${color}55`,
                  clipPath:
                    "polygon(25% 0%,75% 0%,100% 50%,75% 100%,25% 100%,0% 50%)",
                  color,
                }}
              >
                {glyph}
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-500">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Fade edges — absolute so they are always full-width */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}