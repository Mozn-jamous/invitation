"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { config, mapHref } from "@/lib/config";
import { target, formatDate, formatTime } from "@/lib/datetime";

/* THE KEEPSAKE — composed scrapbook cluster + full content
   (live countdown, and tappable tabs that open Story / Details /
   Location / RSVP cards).  Design polish comes later. */

const pad = (n: number) => String(n).padStart(2, "0");

type TL = { d: number; h: number; m: number; s: number; done: boolean };
function useCountdown(): TL | null {
  const [tl, setTl] = useState<TL | null>(null);
  useEffect(() => {
    const calc = (): TL => {
      const diff = target.getTime() - Date.now();
      if (Number.isNaN(diff) || diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
      const tot = Math.floor(diff / 1000);
      return {
        d: Math.floor(tot / 86400),
        h: Math.floor((tot % 86400) / 3600),
        m: Math.floor((tot % 3600) / 60),
        s: tot % 60,
        done: false,
      };
    };
    setTl(calc());
    const id = setInterval(() => setTl(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return tl;
}

type CardKey = "story" | "details" | "location" | "rsvp" | null;

export function Keepsake() {
  const { lang, t, pick } = useLang();
  const reduce = useReducedMotion();
  const tl = useCountdown();
  const [open, setOpen] = useState<CardKey>(null);

  const rise = (delay: number, rot: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 26, rotate: rot * 0.5, scale: 0.93 },
      animate: { opacity: 1, y: 0, rotate: rot, scale: 1 },
      transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
    }) as const;

  const tabs: { key: Exclude<CardKey, null>; label: { ar: string; en: string } }[] = [
    { key: "story", label: { ar: "قصّتنا", en: "Our Story" } },
    { key: "details", label: { ar: "التفاصيل", en: "Details" } },
    { key: "location", label: { ar: "الموقع", en: "Location" } },
    { key: "rsvp", label: { ar: "تأكيد الحضور", en: "RSVP" } },
  ];

  return (
    <section className="kp">
      <div className="kp-wall" aria-hidden="true" />
      <div className="kp-spot" aria-hidden="true" />
      <div className="kp-vignette" aria-hidden="true" />

      <span className="kp-corner tl" aria-hidden="true" />
      <span className="kp-corner tr" aria-hidden="true" />
      <span className="kp-corner bl" aria-hidden="true" />
      <span className="kp-corner br" aria-hidden="true" />

      <div className="kp-inner">
        <div className="kp-cluster">
          <motion.img src="/images/floral-corner.webp" alt="" className="kp-swag" aria-hidden="true" {...rise(0.05, 0)} />
          <motion.img src="/images/bouquet2.webp" alt="" className="kp-bq" aria-hidden="true" {...rise(0.14, -6)} />

          <motion.div className="kp-card" {...rise(0.1, -2)}>
            <img src="/images/invite-card.webp" alt="" className="kp-card-bg" aria-hidden="true" />
            <div className="kp-card-in">
              <p className="kp-kicker">{t("weInvite")}</p>
              <h2 className="kp-names">
                {config.groom[lang]}
                <span className="kp-amp"> {t("and")} </span>
                {config.bride[lang]}
              </h2>
              <img src="/images/divider-orn.webp" alt="" className="kp-divider" aria-hidden="true" />
              <p className="kp-quote">{config.quote[lang]}</p>
              <p className="kp-quote-ref">{config.quoteRef[lang]}</p>
            </div>
          </motion.div>

          <motion.div className="kp-cameo" {...rise(0.28, 6)}>
            <div className="kp-cameo-photo" aria-hidden="true" />
            <img src="/images/cameo-frame.webp" alt="" className="kp-cameo-fr" />
          </motion.div>

          {/* pocket watch — the live countdown lives on its dial */}
          <motion.div className="kp-watch" {...rise(0.36, -10)}>
            <img src="/images/pocketwatch.webp" alt="" className="kp-watch-img" aria-hidden="true" />
            <span className="kp-watch-dial">
              {tl?.done ? (
                <b className="kp-watch-done">{pick({ ar: "اليوم!", en: "Today!" })}</b>
              ) : (
                <>
                  <b>{tl ? tl.d : "—"}</b>
                  <i>{t("days")}</i>
                </>
              )}
            </span>
          </motion.div>

          <motion.img src="/images/seal.webp" alt="" className="kp-seal" aria-hidden="true" {...rise(0.44, -8)} />
          <motion.img src="/images/dove.webp" alt="" className="kp-perch" aria-hidden="true" {...rise(0.32, 3)} />
        </div>

        <div className="kp-foot">
          <motion.div
            className="kp-tabs"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {tabs.map((tab) => (
              <button key={tab.key} type="button" className="kp-tab" onClick={() => setOpen(tab.key)}>
                {pick(tab.label)}
              </button>
            ))}
          </motion.div>

          {/* the signature closing moment — the most-neglected page, done properly */}
          <motion.div
            className="kp-finale"
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/images/divider-orn.webp" alt="" className="kp-finale-orn" aria-hidden="true" />
            <p className="kp-finale-bless">{t("footerBlessing")}</p>
            <img src="/images/monogram.webp" alt="" className="kp-finale-mono" aria-hidden="true" />
            <p className="kp-finale-await">{t("awaitYou")}</p>
          </motion.div>
        </div>
      </div>

      <Overlay openKey={open} onClose={() => setOpen(null)} tl={tl} />
    </section>
  );
}

/* ------------------------------ Overlay ------------------------------ */

function Overlay({
  openKey,
  onClose,
  tl,
}: {
  openKey: CardKey;
  onClose: () => void;
  tl: TL | null;
}) {
  const { t, pick, lang } = useLang();

  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openKey, onClose]);

  const titles: Record<Exclude<CardKey, null>, { ar: string; en: string }> = {
    story: { ar: "قصّتنا", en: "Our Story" },
    details: { ar: "تفاصيل الحفل", en: "Event Details" },
    location: { ar: "الموقع", en: "Location" },
    rsvp: { ar: "تأكيد الحضور", en: "RSVP" },
  };

  return (
    <AnimatePresence>
      {openKey && (
        <motion.div
          className="sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
          <motion.div
            className="sheet"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="sheet-close" onClick={onClose} aria-label="Close">
              ✕
            </button>
            <img src="/images/divider-orn.webp" alt="" className="sheet-orn" aria-hidden="true" />
            <h3 className="sheet-title">{pick(titles[openKey])}</h3>

            {openKey === "story" && (
              <div className="sheet-body">
                <p className="sheet-quote">{config.quote[lang]}</p>
                <p className="sheet-quote-ref">{config.quoteRef[lang]}</p>
              </div>
            )}

            {openKey === "details" && (
              <div className="sheet-body">
                {!tl?.done && tl && (
                  <div className="cd" aria-label={t("countdownTitle")}>
                    {[
                      { v: tl.d, l: t("days") },
                      { v: pad(tl.h), l: t("hours") },
                      { v: pad(tl.m), l: t("minutes") },
                      { v: pad(tl.s), l: t("seconds") },
                    ].map((c, i) => (
                      <div className="cd-cell" key={i}>
                        <b className="cd-num">{c.v}</b>
                        <i className="cd-label">{c.l}</i>
                      </div>
                    ))}
                  </div>
                )}
                <div className="sheet-row">
                  <span className="sheet-row-l">{t("dateLabel")}</span>
                  <span className="sheet-row-v">{formatDate(lang)}</span>
                </div>
                <div className="sheet-row">
                  <span className="sheet-row-l">{t("timeLabel")}</span>
                  <span className="sheet-row-v">{formatTime(lang)}</span>
                </div>
                <div className="sheet-row">
                  <span className="sheet-row-l">{t("venueLabel")}</span>
                  <span className="sheet-row-v">{pick(config.venue.name)}</span>
                  <span className="sheet-row-sub">{pick(config.venue.address)}</span>
                </div>
              </div>
            )}

            {openKey === "location" && (
              <div className="sheet-body">
                <p className="sheet-venue">{pick(config.venue.name)}</p>
                <p className="sheet-venue-sub">{pick(config.venue.address)}</p>
                <a className="sheet-btn" href={mapHref()} target="_blank" rel="noopener noreferrer">
                  {t("openMap")}
                </a>
              </div>
            )}

            {openKey === "rsvp" && <RsvpForm />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------ RSVP form ------------------------------ */

function RsvpForm() {
  const { t, pick } = useLang();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState(true);
  const [note, setNote] = useState("");
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr(true);
      return;
    }
    const lines = [
      attending ? t("willAttend") : t("wontAttend"),
      `${t("nameLabel")}: ${name}`,
      attending ? `${t("guestsLabel")}: ${guests}` : "",
      note ? `${t("messageLabel")}: ${note}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="rsvpf" onSubmit={submit}>
      <p className="rsvpf-note">{t("rsvpNote")}</p>

      <label className="rsvpf-field">
        <span>{t("nameLabel")}</span>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErr(false);
          }}
          placeholder={t("namePlaceholder")}
        />
      </label>
      {err && <span className="rsvpf-err">{t("nameRequired")}</span>}

      <div className="rsvpf-radios">
        <button
          type="button"
          className={`rsvpf-radio ${attending ? "on" : ""}`}
          onClick={() => setAttending(true)}
        >
          {t("willAttend")}
        </button>
        <button
          type="button"
          className={`rsvpf-radio ${!attending ? "on" : ""}`}
          onClick={() => setAttending(false)}
        >
          {t("wontAttend")}
        </button>
      </div>

      {attending && (
        <label className="rsvpf-field">
          <span>{t("guestsLabel")}</span>
          <input
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </label>
      )}

      <label className="rsvpf-field">
        <span>{t("messageLabel")}</span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("messagePlaceholder")}
        />
      </label>

      <button type="submit" className="sheet-btn whatsapp">
        {t("sendWhatsapp")}
      </button>
    </form>
  );
}
