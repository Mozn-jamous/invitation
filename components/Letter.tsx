"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";

/* THE LETTER (home) — the parchment message, written line by line onto a
   living sheet that unfurls after the seal is broken.  The silver icon bar
   navigates to the full-screen scenes. */

export function Letter({ revealed }: { revealed: boolean }) {
  const { lang, t } = useLang();
  const reduce = useReducedMotion();

  const line: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] } },
  };
  const msgGroup: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.16, delayChildren: reduce ? 0 : 0.15 } },
  };

  const body = config.letter.body[lang];
  const closing = config.letter.closing[lang];

  return (
    <section className="lt2 scene-sec" id="message">
      <div className="lt2-stage">

        <div className="lt2-candle l" aria-hidden="true" />
        <div className="lt2-candle r" aria-hidden="true" />

        <motion.div
          className="lt2-parchment"
          initial={reduce ? false : { opacity: 0, y: -10, scaleY: 0.9, transformOrigin: "top center" }}
          animate={revealed ? { opacity: 1, y: 0, scaleY: 1 } : {}}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/images/parchment.webp" alt="" className="lt2-parchment-bg" aria-hidden="true" />

          <motion.div
            className="lt2-msg"
            variants={msgGroup}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
          >
            <motion.p className="lt2-bism" variants={line}>
              {config.letter.bism[lang]}
            </motion.p>
            <motion.img src="/images/divider-orn.webp" alt="" className="lt2-div" variants={line} aria-hidden="true" />

            {body.map((ln, i) => (
              <motion.p className="lt2-line" variants={line} key={i}>
                {ln}
              </motion.p>
            ))}

            <motion.img src="/images/divider-orn.webp" alt="" className="lt2-div" variants={line} aria-hidden="true" />
            <motion.h1 className="lt2-names" variants={line}>
              <span>{config.groom[lang]}</span>
              <span className="lt2-amp">{t("and")}</span>
              <span>{config.bride[lang]}</span>
            </motion.h1>
            <motion.img src="/images/divider-orn.webp" alt="" className="lt2-div" variants={line} aria-hidden="true" />

            {closing.map((ln, i) => (
              <motion.p className="lt2-closing" variants={line} key={i}>
                {ln}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
