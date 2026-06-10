import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../lib/motion.js";

/**
 * Canvas particle constellation behind the hero.
 * - Particles drift slowly and connect with faint lines.
 * - Scrolling adds velocity + a parallax shift, so the field visibly
 *   responds to scroll (the "canvas scrolling animation" requirement).
 * - Skipped entirely under prefers-reduced-motion (static gradient remains).
 */
export default function ScrollCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;
    const ctx = canvas.getContext("2d");
    let raf, particles = [], w = 0, h = 0;
    let lastScroll = window.scrollY, scrollKick = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.6,
        hue: Math.random() > 0.7 ? "200,162,75" : "20,184,166", // gold / teal
      }));
    };

    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      scrollKick = Math.max(-1.4, Math.min(1.4, scrollKick + dy * 0.012));
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      scrollKick *= 0.92; // decay
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy + scrollKick;
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},0.55)`;
        ctx.fill();
      }
      // connective lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) {
            ctx.strokeStyle = `rgba(14,158,143,${0.16 * (1 - d2 / (110 * 110))})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true" />;
}
