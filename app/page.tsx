"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { MusicProvider } from "@/lib/music";
import { Controls } from "@/components/Controls";
import { useLang } from "@/lib/i18n";
import { config, mapHref } from "@/lib/config";
import { formatDate, formatTime } from "@/lib/datetime";
import { useCountdown, RsvpForm } from "@/components/Sheets";

const pad = (n: number) => String(n).padStart(2, "0");

/* drifting silver light-motes — deterministic values (stable across renders) */
const EMBERS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 61) % 100,
  size: 2 + (i % 3),
  dur: 9 + (i % 5) * 2.2,
  delay: (i % 8) * 1.7,
}));

/* rises + fades in as it enters the viewport */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Names({ className = "" }: { className?: string }) {
  const { lang, t } = useLang();
  return (
    <h1 className={`v-names ${className}`}>
      <span>{config.groom[lang]}</span>
      <span className="v-amp">{t("and")}</span>
      <span>{config.bride[lang]}</span>
    </h1>
  );
}

function Invitation() {
  const { t, pick, lang } = useLang();
  const tl = useCountdown();

  const body = config.letter.body[lang];
  const closing = config.letter.closing[lang];

  return (
    <>
      <div className="v-bg" aria-hidden="true" />
      <Controls />

      {/* drifting silver light-motes over the whole invitation */}
      <div className="v-embers" aria-hidden="true">
        {EMBERS.map((e, i) => (
          <i
            key={i}
            style={{
              left: `${e.left}%`,
              width: e.size,
              height: e.size,
              animationDuration: `${e.dur}s`,
              animationDelay: `${e.delay}s`,
            }}
          />
        ))}
      </div>

      <main className="v-main">
        {/* ---------- COVER ---------- */}
        <section className="v-sec v-cover">
          {/* the bg-layer replicates `cover` sizing as a real element, so
              everything inside it lives in IMAGE coordinates — the couple
              portrait always sits exactly in the oval on every device */}
          <div className="v-bg-layer" aria-hidden="true">
            <span className="v-candle" style={{ left: "10%", top: "70%" }} />
            <span className="v-candle" style={{ left: "90%", top: "70%" }} />
            <div className="v-cover-photo">
              <img src="/invitation/images/roy/couple.png" alt="" />
            </div>
          </div>

          {/* silver monogram crest fills the space below the frame */}
          <img className="v-cover-crest" src="/invitation/images/roy/monogram.png" alt="" aria-hidden="true" />

          {/* no text on the cover — just art + a wordless falling-light cue */}
          <div className="v-scroll" aria-hidden="true">
            <span className="v-drop" />
            <span className="v-drop" />
          </div>
        </section>

        {/* ---------- VERSE ---------- */}
        <section className="v-sec v-verse">
          <div className="v-bg-layer" aria-hidden="true" />
          <Reveal delay={0.1}>
            <div className="v-verse-wrap">
              <p className="v-verse-bism">{pick(config.letter.bism)}</p>
              <p className="v-verse-text">{pick(config.quote)}</p>
              <p className="v-verse-ref">{pick(config.quoteRef)}</p>
            </div>
          </Reveal>
        </section>

        {/* ---------- LETTER ---------- */}
        <section className="v-sec v-letter">
          <div className="v-bg-layer" aria-hidden="true">
            <span className="v-candle" style={{ left: "82%", top: "9%", width: 120, height: 95 }} />
          </div>
          <Reveal>
            <img className="v-monogram" src="/invitation/images/roy/monogram.png" alt="" aria-hidden="true" />
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="v-letter-title">{pick({ ar: "دعوة خطوبة", en: "Engagement Invitation" })}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="v-divider" aria-hidden="true"><i /></span>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="v-body v-letter-body">
              {body.map((ln, i) => (
                <span key={i}>
                  {ln}
                  {i < body.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <span className="v-divider" aria-hidden="true"><i /></span>
          </Reveal>
          <Reveal delay={0.3}>
            <Names className="v-letter-names" />
          </Reveal>
          <Reveal delay={0.38}>
            <p className="v-body v-muted v-letter-close">
              {closing.map((ln, i) => (
                <span key={i}>
                  {ln}
                  {i < closing.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </Reveal>
        </section>

        {/* ---------- DETAILS + LOCATION + COUNTDOWN (merged) ---------- */}
        <section className="v-sec v-details">
          <div className="v-bg-layer" aria-hidden="true" />
          <Reveal>
            <h2 className="v-title">{t("detailsTitle")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="v-glass v-rows">
              <div className="v-row">
                <span className="v-row-l">{t("dateLabel")}</span>
                <span className="v-row-v">{formatDate(lang)}</span>
              </div>
              <div className="v-row">
                <span className="v-row-l">{t("timeLabel")}</span>
                <span className="v-row-v">{formatTime(lang)}</span>
              </div>
              <div className="v-row">
                <span className="v-row-l">{t("venueLabel")}</span>
                <span className="v-row-v">{pick(config.venue.name)}</span>
                <span className="v-row-sub">{pick(config.venue.address)}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.18}>
            <a className="v-btn" href={mapHref()} target="_blank" rel="noopener noreferrer">
              {t("openMap")}
            </a>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="v-cd-block">
              <h3 className="v-cd-title">{t("countdownTitle")}</h3>
              {tl?.done ? (
                <p className="v-row-v">{t("theBigDay")}</p>
              ) : (
                <div className="v-cd">
                  {[
                    { v: tl ? String(tl.d) : "—", l: t("days") },
                    { v: tl ? pad(tl.h) : "—", l: t("hours") },
                    { v: tl ? pad(tl.m) : "—", l: t("minutes") },
                    { v: tl ? pad(tl.s) : "—", l: t("seconds") },
                  ].map((c) => (
                    <div className="v-cd-cell" key={c.l}>
                      <b>{c.v}</b>
                      <i>{c.l}</i>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </section>

        {/* ---------- RSVP ---------- */}
        <section className="v-sec v-rsvp">
          <div className="v-bg-layer" aria-hidden="true" />
          <Reveal>
            <h2 className="v-title">{t("rsvpTitle")}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <span className="v-divider" aria-hidden="true"><i /></span>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="v-glass">
              <RsvpForm />
            </div>
          </Reveal>
        </section>

      </main>
    </>
  );
}

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ minHeight: "100dvh", background: "#1c060d" }} />;

  return (
    <MusicProvider>
      <Invitation />
    </MusicProvider>
  );
}
