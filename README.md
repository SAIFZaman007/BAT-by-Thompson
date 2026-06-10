# Bahamas AI Trading — Public Website (React + Vite + GSAP)

The client-facing site: hero with scroll-reactive canvas, crypto marquee,
GSAP scroll reveals, onboarding form, secure KYC upload, USDT funding
instructions, risk disclaimer, FAQ and contact.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173 — proxies /api to localhost:8000
```

## Build & deploy standalone
```bash
npm run build      # outputs dist/
```
Serve `dist/` from any static host or the included Dockerfile (nginx).
The app calls `/api/*` on the SAME origin — route that path to the backend
at your proxy/CDN layer (see deploy/Caddyfile in the repo root for the pattern).

## Animation system
- `src/lib/motion.js` — useReveal (scroll-triggered), useFloat, useParallax (GSAP ScrollTrigger)
- `src/components/ScrollCanvas.jsx` — scroll-reactive particle canvas (hero)
- `src/components/CryptoMarquee.jsx` — infinite icon marquee (CSS, GPU-friendly)
- All motion is disabled under `prefers-reduced-motion`.
- `IllustrationPanel.jsx` holds placeholder product mocks — swap the inner
  markup for the client's real images when they arrive (same outer frame keeps
  the float/parallax behaviour).
