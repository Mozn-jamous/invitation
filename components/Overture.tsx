"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useMusic } from "@/lib/music";
import { config } from "@/lib/config";

/* THE OVERTURE — the sealed Victorian invitation on a painted backdrop.
   The artwork (curtain · frame · hanging seal · candles · roses) is an
   aspect-locked stage; the names, tagline and button are LIVE HTML overlaid
   in its empty center, so fonts stay tunable and the AR/EN toggle works.
   Tap → light blooms from the seal, doves take flight, and the overture
   lifts away to reveal the keepsake board. */

type Phase = "sealed" | "breaking" | "gone";

export function Overture({ onOpen }: { onOpen?: () => void }) {
  const { t, lang, pick } = useLang();
  const music = useMusic();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("sealed");

  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  const breaking = phase === "breaking";
  if (phase === "gone") return null;

  const open = () => {
    if (phase !== "sealed") return;
    music.play();
    setPhase("breaking");
    // hand off to the letter as the overture lifts, then unmount
    window.setTimeout(() => onOpen?.(), reduce ? 80 : 2000);
    window.setTimeout(() => setPhase("gone"), reduce ? 120 : 2600);
  };

  // staggered fade-up entrance for each copy line
  const line = (delay: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  return (
    <motion.div
      className="ovt2"
      aria-hidden={breaking}
      animate={{ opacity: breaking ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.7, delay: breaking && !reduce ? 1.9 : 0 }}
    >
      <motion.div
        className="ovt2-stage"
        animate={breaking && !reduce ? { scale: 1.06 } : { scale: 1 }}
        transition={{ duration: 2.4, ease: "easeOut" }}
      >
        <img src="/images/overture-bg.webp" alt="" className="ovt2-bg" draggable={false} />

        {/* subtle living light — a drifting shaft, flickering candles, a seal glow */}
        <div className="ovt2-shaft" aria-hidden="true" />
        <div className="ovt2-candle l" aria-hidden="true" />
        <div className="ovt2-candle r" aria-hidden="true" />
        <div className="ovt2-sealglow" aria-hidden="true" />

        {/* the break: light bloom from the seal + doves in flight */}
        <motion.div
          className="ovt2-bloom"
          aria-hidden="true"
          initial={false}
          animate={
            breaking && !reduce
              ? { opacity: [0, 1, 0], scale: [0.6, 2.4, 3] }
              : { opacity: 0 }
          }
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* live copy — sits over the empty center of the artwork */}
        <motion.div
          className="ovt2-copy"
          animate={{ opacity: breaking ? 0 : 1, y: breaking ? -8 : 0 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: breaking ? 0.4 : 0 }}
        >
          <motion.p className="ovt2-kicker" {...line(0.2)}>
            {pick({ ar: "دعوة خطوبة", en: "Engagement Invitation" })}
          </motion.p>

          <motion.h1 className="ovt2-names" {...line(0.36)}>
            <span className="ovt2-name">{config.groom[lang]}</span>
            <span className="ovt2-amp-row" aria-hidden="true">
              <img src="/images/divider-orn.webp" alt="" className="ovt2-amp-orn" />
              <span className="ovt2-amp">{t("and")}</span>
              <img src="/images/divider-orn.webp" alt="" className="ovt2-amp-orn flip" />
            </span>
            <span className="ovt2-name">{config.bride[lang]}</span>
          </motion.h1>

          <motion.p className="ovt2-tagline" {...line(0.52)}>
            {t("overtureTagline")}
          </motion.p>

          <motion.button
            type="button"
            className="ovt2-btn"
            onClick={open}
            {...line(0.68)}
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
          >
            <span aria-hidden="true">✦</span>
            {pick({ ar: "اكسر الختم", en: "Break the Seal" })}
            <span aria-hidden="true">✦</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
