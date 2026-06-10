import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fade-and-rise children marked [data-reveal] when the container scrolls into view. */
export function useReveal() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current || reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

/** Gentle perpetual float for hero/about visuals. */
export function useFloat() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current || reducedMotion()) return;
    const tween = gsap.to(ref.current, {
      y: -14, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1,
    });
    return () => tween.kill();
  }, []);
  return ref;
}
