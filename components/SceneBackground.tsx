"use client";

import { useEffect, useState } from "react";

/* Cinematic changing backdrop — each journey scene gets its own palace hall,
   crossfading as that section reaches the viewport center. The section nearest
   center becomes active and its layer fades in (opacity only; the image URLs
   live in the per-key CSS classes so mobile can swap to lighter files).
   All real motion lives in the components; this is the calm stage behind them. */

/* Map each journey <section> (by its id) to a backdrop class defined in CSS. */
const SCENE_BG: Record<string, string> = {
  message: "scene-hero", // the Letter (home)
  details: "scene-details",
  location: "scene-location",
  countdown: "scene-countdown",
  rsvp: "scene-rsvp",
};

export function SceneBackground() {
  const [layers, setLayers] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>(".journey .scene-sec")
    );
    if (!secs.length) return;

    setLayers(secs.map((s) => SCENE_BG[s.id] ?? "scene-hero"));
    secs.forEach((s, i) => s.setAttribute("data-scene-index", String(i)));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(
              (e.target as HTMLElement).getAttribute("data-scene-index")
            );
            if (!Number.isNaN(idx)) setActive(idx);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div className="scene-bg" aria-hidden="true">
      {layers.map((cls, i) => (
        <div
          key={i}
          className={`scene-layer ${cls}`}
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
      <div className="scene-aurora" />
      <div className="scene-scrim" />
    </div>
  );
}
