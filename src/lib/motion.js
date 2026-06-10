import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Scroll-reveal a section: children tagged [data-reveal] fade-rise in,
 * staggered, the first time the section enters the viewport.
 */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const targets = ref.current.querySelectorAll("[data-reveal]");
    if (!targets.length) return;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

/**
 * Smooth figure-8 float for illustration panels.
 *
 * Combines Y and a small X drift so the card moves in a subtle organic
 * loop rather than a mechanical up-down bob — closer to the Exodus-style
 * deep-parallax feel without requiring a canvas.
 */
export function useFloat(amplitude = 10, duration = 4) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Phase 1 — drift up-right
    tl.to(ref.current, {
      y: -amplitude,
      x: amplitude * 0.3,
      duration,
      ease: "sine.inOut",
    })
      // Phase 2 — drift up-left
      .to(ref.current, {
        y: -amplitude * 0.5,
        x: -amplitude * 0.3,
        duration: duration * 0.75,
        ease: "sine.inOut",
      })
      // Phase 3 — return to origin
      .to(ref.current, {
        y: 0,
        x: 0,
        duration: duration * 0.6,
        ease: "sine.inOut",
      });

    return () => tl.kill();
  }, [amplitude, duration]);
  return ref;
}

/** Scroll-scrubbed parallax (element drifts as you scroll past it). */
export function useParallax(distance = 60) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [distance]);
  return ref;
}