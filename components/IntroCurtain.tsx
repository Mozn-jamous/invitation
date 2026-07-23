"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useMusic } from "@/lib/music";
import { config } from "@/lib/config";
import { lockScroll, unlockScroll } from "./SmoothScroll";
import { Curtains } from "./Curtains";

/* THE OVERTURE — Chapter 0.
   loader (crest settles) → sealed invitation → break the seal →
   light gathers → the velvet curtains part onto the Hall. */

type Phase = "loading" | "ready" | "opening";

export function IntroCurtain() {
  const { t, pick, lang } = useLang();
  const music = useMusic();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [gone, setGone] = useState(false);

  // Lock scrolling while the overture is on stage.
  useEffect(() => {
    if (gone) return;
    lockScroll();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  // Loader → ready.
  useEffect(() => {
    const wait = reduce ? 250 : 1350;
    const id = window.setTimeout(() => setPhase((p) => (p === "loading" ? "ready" : p)), wait);
    return () => window.clearTimeout(id);
  }, [reduce]);

  if (gone) return null;

  const opening = phase === "opening";

  const enter = () => {
    music.play();
    setPhase("opening");
    unlockScroll();
    window.setTimeout(() => setGone(true), reduce ? 60 : 1750);
  };

  return (
    <motion.div
      className="overture"
      aria-hidden={opening}
      animate={{ opacity: opening ? 0 : 1 }}
      transition={{ duration: reduce ? 0 : 0.45, delay: opening && !reduce ? 1.3 : 0 }}
    >
      {/* velvet curtains that part onto the Hall */}
      <Curtains open={opening} reduce={reduce} />

      {/* soft veil so the sealed-state text stays legible over the velvet */}
      <div className="overture-veil" aria-hidden="true" />

      {/* gathering light — the مُزن motif — blooms as the seal breaks */}
      <motion.div
        className="light-bloom"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          opening && !reduce
            ? { opacity: [0, 0.95, 0], scale: [0.6, 1.7, 1.9] }
            : { opacity: phase === "ready" ? 0.5 : 0, scale: 1 }
        }
        transition={opening ? { duration: 1.3, ease: "easeOut" } : { duration: 1.2 }}
      />

      {/* center: the sealed invitation */}
      <motion.div
        className="overture-center"
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.08 : 1 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 12 }}
          animate={{ opacity: phase === "loading" ? 0 : 1, scale: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.img
            src="/images/wax-seal.webp"
            alt=""
            aria-hidden="true"
            className="orn mask-seal overture-seal"
            animate={reduce || opening ? {} : { y: [0, -9, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <p className="eyebrow overture-kicker">
            {pick({ ar: "دعوة خطوبة", en: "Engagement Invitation" })}
          </p>

          <h1 className="script metallic overture-title">
            {config.groom[lang]} {t("and")} {config.bride[lang]}
          </h1>

          <img
            src="/images/divider-orn.webp"
            alt=""
            aria-hidden="true"
            className="orn mask-divider overture-rule"
          />

          <button className="btn btn-gold" onClick={enter} autoFocus>
            <span aria-hidden>✦</span>
            {t("openInvitation")}
          </button>
        </motion.div>
      </motion.div>

      {/* loader — the crest settling while fonts/art arrive */}
      <motion.div
        className="overture-loader"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "loading" ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.5 }}
      >
        <span className="loader-ring" aria-label={pick({ ar: "جارٍ التحميل", en: "Loading" })} />
      </motion.div>
    </motion.div>
  );
}
