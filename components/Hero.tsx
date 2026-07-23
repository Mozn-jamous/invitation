"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import { Tilt } from "./Tilt";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";
import { formatDate } from "@/lib/datetime";

/* Chapter 1 — The Hall. A calm, uncluttered reveal: the crest, the names,
   the date. No scattered ornaments; the room itself is the decoration. */

export function Hero() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // cinematic fade as you scroll past
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.18, delayChildren: reduce ? 0 : 0.1 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 26 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] } },
  };
  const nameItem: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 30, scale: reduce ? 1 : 0.96, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { duration: reduce ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="section hero" ref={sectionRef}>
      {/* مُزن light-motif — a soft bloom of candlelight behind the names */}
      <div className="light-bloom hall-bloom" aria-hidden="true" />

      <motion.div
        className="container hero-inner"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <motion.div variants={item}>
          <Tilt max={12} className="hero-frame-tilt">
            <img
              src="/images/monogram-frame.webp"
              alt=""
              aria-hidden="true"
              className="orn mask-frame hero-frame-img"
            />
          </Tilt>
        </motion.div>

        <motion.p variants={item} className="eyebrow">
          {t("weInvite")}
        </motion.p>

        <div className="names">
          <motion.h1 variants={nameItem} className="name script metallic shimmer">
            {config.groom[lang]}
          </motion.h1>

          <motion.div variants={item} className="amp" aria-hidden="true">
            <span className="amp-line" />
            <span className="amp-word script">{t("and")}</span>
            <span className="amp-line" />
          </motion.div>

          <motion.h1 variants={nameItem} className="name script metallic shimmer">
            {config.bride[lang]}
          </motion.h1>
        </div>

        <motion.img
          variants={item}
          src="/images/divider-orn.webp"
          alt=""
          aria-hidden="true"
          className="orn mask-divider flourish-img"
          style={{ marginBottom: "0.6rem" }}
        />

        <motion.p variants={item} className="hero-date tnum">
          {formatDate(lang)}
        </motion.p>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        className="scroll-cue"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: reduce ? 1 : [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: 1.6 }}
      >
        <span>{lang === "ar" ? "مرّر للأسفل" : "Scroll"}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
