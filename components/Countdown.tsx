"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Scene, SceneItem } from "./Scene";
import { Tilt } from "./Tilt";
import { useLang } from "@/lib/i18n";
import { target } from "@/lib/datetime";

type TL = { d: number; h: number; m: number; s: number; done: boolean };

function compute(): TL {
  const diff = target.getTime() - Date.now();
  if (Number.isNaN(diff) || diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const total = Math.floor(diff / 1000);
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
    done: false,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [tl, setTl] = useState<TL | null>(null);

  useEffect(() => {
    const tick = () => setTl(compute());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const v = tl ?? { d: 0, h: 0, m: 0, s: 0, done: false };

  const cells: { value: string; label: string }[] = [
    { value: String(v.d), label: t("days") },
    { value: pad(v.h), label: t("hours") },
    { value: pad(v.m), label: t("minutes") },
    { value: pad(v.s), label: t("seconds") },
  ];

  return (
    <Scene bg="/images/scene-countdown.webp" position="center top" className="countdown-scene">
      <SceneItem>
        <h2 className="section-title">{t("countdownTitle")}</h2>
      </SceneItem>

      <SceneItem>
        {v.done ? (
          <p className="countdown-done display">{t("theBigDay")}</p>
        ) : (
          <div className="countdown-grid">
            {cells.map((c) => (
              <Tilt key={c.label} className="count-cell panel frame" max={9}>
                <span className="count-num-wrap">
                  <motion.span
                    key={`${c.label}-${c.value}`}
                    className="count-num tnum metallic"
                    initial={reduce ? false : { opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {c.value}
                  </motion.span>
                </span>
                <span className="count-label">{c.label}</span>
              </Tilt>
            ))}
          </div>
        )}
      </SceneItem>
    </Scene>
  );
}
