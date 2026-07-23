"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

/* Lenis smooth-scroll — the "gliding through the palace" feel.
   Kept off for reduced-motion and driven by a single RAF loop. */

let instance: Lenis | null = null;

/** Pause scrolling (used while the Overture is up). */
export function lockScroll() {
  instance?.stop();
}
/** Resume scrolling (once the curtains have parted). */
export function unlockScroll() {
  instance?.start();
}

/** Smoothly scroll a section into view by id (used by the nav bar). */
export function scrollToSection(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { duration: 1.3 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.95,
    });
    instance = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      instance = null;
    };
  }, [reduce]);

  return null;
}
