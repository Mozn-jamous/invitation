"use client";

import { useEffect, useRef } from "react";

/* Ambient falling rose petals + silver sparkles on a single canvas.
   Continuous, DPR-aware, pauses when the tab is hidden, and disables
   itself when the user prefers reduced motion. */

type Petal = {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  angle: number;
  spin: number;
  hue: string;
  sparkle: boolean;
  tw: number;
};

const WINES = ["#b01030", "#d21f42", "#7a0f28", "#8a1230"];

export function Petals() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let petals: Petal[] = [];
    let raf = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const makePetal = (top: boolean): Petal => {
      const sparkle = Math.random() < 0.28;
      return {
        x: rand(0, w),
        y: top ? rand(-h * 0.2, 0) : rand(0, h),
        size: sparkle ? rand(1.5, 3) : rand(7, 15),
        speed: rand(0.25, 0.9),
        drift: rand(-0.4, 0.4),
        angle: rand(0, Math.PI * 2),
        spin: rand(-0.015, 0.015),
        hue: sparkle ? "#e8ebef" : WINES[(Math.random() * WINES.length) | 0],
        sparkle,
        tw: rand(0, Math.PI * 2),
      };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(30, Math.max(14, w / 55)));
      petals = Array.from({ length: count }, () => makePetal(false));
    };

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      if (p.sparkle) {
        const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = a * 0.6;
        ctx.fillRect(-p.size * 2.4, -0.4, p.size * 4.8, 0.8);
        ctx.fillRect(-0.4, -p.size * 2.4, 0.8, p.size * 4.8);
      } else {
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        // teardrop petal
        ctx.moveTo(0, -p.size);
        ctx.quadraticCurveTo(p.size, -p.size * 0.2, 0, p.size);
        ctx.quadraticCurveTo(-p.size, -p.size * 0.2, 0, -p.size);
        ctx.fill();
        ctx.globalAlpha = 0.25;
        ctx.strokeStyle = "#faf6ef";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of petals) {
        p.y += p.speed;
        p.x += p.drift + Math.sin(p.y * 0.01) * 0.3;
        p.angle += p.spin;
        p.tw += 0.05;
        if (p.y - p.size > h) {
          Object.assign(p, makePetal(true));
        }
        drawPetal(p);
      }
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="petals-canvas" aria-hidden="true" />;
}
