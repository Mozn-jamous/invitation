"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { config, mapHref } from "@/lib/config";
import { formatDate, formatTime } from "@/lib/datetime";
import { useCountdown, RsvpForm } from "./Sheets";
import { Tilt } from "./Tilt";

export type SceneKey = "countdown" | "details" | "location" | "rsvp" | "gallery";

const pad = (n: number) => String(n).padStart(2, "0");

const TITLES: Record<SceneKey, { ar: string; en: string }> = {
  countdown: { ar: "باقٍ على الفرح", en: "Counting Down" },
  details: { ar: "تفاصيل الحفل", en: "Event Details" },
  location: { ar: "الموقع", en: "Location" },
  rsvp: { ar: "تأكيد الحضور", en: "RSVP" },
  gallery: { ar: "الصور", en: "Gallery" },
};

/* ---- inline icons for the detail medallions ---- */
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SceneSection({ view }: { view: SceneKey }) {
  const { t, pick, lang } = useLang();
  const reduce = useReducedMotion();
  const tl = useCountdown();

  /* ----- RSVP + gallery keep the aged-parchment sheet (the site's paper voice) ----- */
  if (view === "rsvp" || view === "gallery") {
    return (
      <section className="scene-sec" id={view}>
        <div className="sv-stage">
          <div className={`sv-parchment ${view}`}>
            <img src="/images/parchment.webp" alt="" className="sv-parchment-bg" aria-hidden="true" />
            <motion.div
              className={`sv-content live ${view}`}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduce ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="sv-title">{pick(TITLES[view])}</h2>
              <img src="/images/divider-orn.webp" alt="" className="sv-div" aria-hidden="true" />
              {view === "rsvp" && (
                <>
                  <p className="sv-note">{t("rsvpNote")}</p>
                  <RsvpForm />
                </>
              )}
              {view === "gallery" &&
                (config.gallery.length > 0 ? (
                  <div className="gal">
                    {config.gallery.map((g, i) => (
                      <figure className="gal-item" key={i}>
                        <img src={g.src} alt={g.alt ?? ""} loading="lazy" />
                      </figure>
                    ))}
                  </div>
                ) : (
                  <p className="sv-note soon">{t("gallerySoon")}</p>
                ))}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  /* ----- details · location · countdown: professional silver-framed cards ----- */
  const details = [
    { icon: <CalendarIcon />, label: t("dateLabel"), value: formatDate(lang) },
    { icon: <ClockIcon />, label: t("timeLabel"), value: formatTime(lang) },
    {
      icon: <PinIcon />,
      label: t("venueLabel"),
      value: pick(config.venue.name),
      sub: pick(config.venue.address),
    },
  ];

  const cdCells = [
    { v: tl ? String(tl.d) : "—", l: t("days") },
    { v: tl ? pad(tl.h) : "—", l: t("hours") },
    { v: tl ? pad(tl.m) : "—", l: t("minutes") },
    { v: tl ? pad(tl.s) : "—", l: t("seconds") },
  ];

  return (
    <section className="scene-sec" id={view}>
      <motion.div
        className={`scene-card container ${view}`}
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: reduce ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title">{pick(TITLES[view])}</h2>

        {view === "details" && (
          <div className="details-grid">
            {details.map((it) => (
              <Tilt key={it.label} className="detail-card panel frame" max={10}>
                <span className="detail-icon metallic-stroke">{it.icon}</span>
                <span className="detail-text">
                  <span className="detail-label">{it.label}</span>
                  <span className="detail-value">{it.value}</span>
                  {"sub" in it && it.sub ? <span className="detail-sub">{it.sub}</span> : null}
                </span>
              </Tilt>
            ))}
          </div>
        )}

        {view === "location" && (
          <Tilt className="map-card panel frame" max={7}>
            <span className="map-pin">
              <svg viewBox="0 0 24 24" fill="none" width="48" height="48" aria-hidden="true">
                <path d="M12 22s7.5-6.6 7.5-12A7.5 7.5 0 1 0 4.5 10c0 5.4 7.5 12 7.5 12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <p className="map-name">{pick(config.venue.name)}</p>
            <p className="map-address">{pick(config.venue.address)}</p>
            <a
              className="btn btn-ghost"
              href={mapHref()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M9 3v16M15 5v16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {t("openMap")}
            </a>
          </Tilt>
        )}

        {view === "countdown" && (
          <>
            {tl?.done ? (
              <p className="countdown-done display">{t("theBigDay")}</p>
            ) : (
              <div className="countdown-grid">
                {cdCells.map((c) => (
                  <div className="count-cell panel frame" key={c.l}>
                    <span className="count-num-wrap">
                      <motion.span
                        key={`${c.l}-${c.v}`}
                        className="count-num metallic"
                        initial={reduce ? false : { opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {c.v}
                      </motion.span>
                    </span>
                    <span className="count-label">{c.l}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="cd-date">{formatDate(lang)}</p>
          </>
        )}
      </motion.div>
    </section>
  );
}
