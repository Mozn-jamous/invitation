"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { config, mapHref } from "@/lib/config";
import { formatDate, formatTime, target } from "@/lib/datetime";

/* THE COLLAGE BOARD — an interactive keepsake, not a scroll site.
   Physical objects (tilted photos, ornate cards, wax seal, roses) sit on a
   wine-velvet surface with real shadows. Tapping a card opens it. */

type CardKey = "story" | "details" | "location" | "rsvp" | null;

/* ---------- live countdown ---------- */
function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, done: false });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (Number.isNaN(diff) || diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0, done: true });
      const tot = Math.floor(diff / 1000);
      setT({
        d: Math.floor(tot / 86400),
        h: Math.floor((tot % 86400) / 3600),
        m: Math.floor((tot % 3600) / 60),
        s: tot % 60,
        done: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Collage() {
  const { t, pick, lang } = useLang();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<CardKey>(null);
  const cd = useCountdown();

  // piece entrance: rise + settle with a slight rotation
  const piece = (rot: number, delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 40, rotate: rot * 1.6 },
    whileInView: { opacity: 1, y: 0, rotate: rot },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="board">
      <div className="board-grain" aria-hidden="true" />

      {/* ── the invitation card ── */}
      <motion.div className="piece invite" {...piece(-1.5)}>
        <img src="/images/wax-seal.webp" alt="" aria-hidden="true" className="orn mask-seal invite-seal" />
        <p className="invite-kicker">{pick({ ar: "دعوة خطوبة", en: "Engagement" })}</p>
        <h1 className="invite-names script metallic">
          {config.groom[lang]} <span className="amp-word">{t("and")}</span> {config.bride[lang]}
        </h1>
        <div className="invite-rule"><span /><span className="gem" /><span /></div>
        <p className="invite-date tnum">{formatDate(lang)}</p>
        <p className="invite-sub">{t("weInvite")}</p>
      </motion.div>

      {/* ── couple photo (placeholder until a real photo is dropped in) ── */}
      <motion.figure className="piece polaroid" {...piece(2.2, 0.05)}>
        <div className="polaroid-photo" role="img" aria-label={pick({ ar: "صورة العروسين", en: "The couple" })}>
          <span className="polaroid-hint">{pick({ ar: "صورتكم هنا", en: "your photo" })}</span>
        </div>
        <figcaption className="polaroid-cap script">{config.groom[lang]} &amp; {config.bride[lang]}</figcaption>
      </motion.figure>

      {/* ── live countdown, pinned like a little card ── */}
      <motion.div className="piece cd-card" {...piece(-2, 0.1)}>
        <p className="cd-title">{t("countdownTitle")}</p>
        {cd.done ? (
          <p className="cd-done">{t("theBigDay")}</p>
        ) : (
          <div className="cd-row tnum">
            <b>{cd.d}</b><span>{t("days")}</span>
            <i />
            <b>{pad(cd.h)}</b><span>{t("hours")}</span>
            <i />
            <b>{pad(cd.m)}</b><span>{t("minutes")}</span>
            <i />
            <b>{pad(cd.s)}</b><span>{t("seconds")}</span>
          </div>
        )}
      </motion.div>

      {/* ── the clickable tags ── */}
      <div className="tags">
        {([
          { k: "story" as const, label: pick({ ar: "قصّتنا", en: "Our Story" }), rot: -2.5 },
          { k: "details" as const, label: pick({ ar: "التفاصيل", en: "Details" }), rot: 2 },
          { k: "location" as const, label: pick({ ar: "الموقع", en: "Location" }), rot: -1.5 },
          { k: "rsvp" as const, label: pick({ ar: "تأكيد الحضور", en: "RSVP" }), rot: 2.5 },
        ]).map((tag, i) => (
          <motion.button
            key={tag.k}
            className="piece tag"
            style={{ rotate: `${tag.rot}deg` }}
            onClick={() => setOpen(tag.k)}
            {...piece(tag.rot, 0.05 * i)}
          >
            <span className="tag-corner tl" /><span className="tag-corner tr" />
            <span className="tag-corner bl" /><span className="tag-corner br" />
            <span className="tag-label script">{tag.label}</span>
            <span className="tag-open">{pick({ ar: "اضغط للفتح ↖", en: "tap to open" })}</span>
          </motion.button>
        ))}
      </div>

      <motion.img
        src="/images/roses.webp"
        alt=""
        aria-hidden="true"
        className="piece board-roses orn mask-radial"
        {...piece(4, 0.1)}
      />

      <p className="board-foot script metallic">{config.groom[lang]} &amp; {config.bride[lang]}</p>

      {/* ── the opened card ── */}
      <Overlay openKey={open} onClose={() => setOpen(null)} />
    </div>
  );
}

/* ============================ opened card ============================ */
function Overlay({ openKey, onClose }: { openKey: CardKey; onClose: () => void }) {
  const { t, pick, lang } = useLang();
  const reduce = useReducedMotion();

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

  const titles: Record<Exclude<CardKey, null>, string> = {
    story: pick({ ar: "قصّتنا", en: "Our Story" }),
    details: pick({ ar: "التفاصيل", en: "Details" }),
    location: pick({ ar: "الموقع", en: "Location" }),
    rsvp: pick({ ar: "تأكيد الحضور", en: "RSVP" }),
  };

  return (
    <AnimatePresence>
      {openKey && (
        <motion.div
          className="ov-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="ov-card panel frame"
            role="dialog"
            aria-modal="true"
            aria-label={titles[openKey]}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="ov-close" onClick={onClose} aria-label={pick({ ar: "إغلاق", en: "Close" })}>
              ✕
            </button>
            <h2 className="ov-title">{titles[openKey]}</h2>

            {openKey === "story" && (
              <div className="ov-body">
                <p className="quote-text display">{pick(config.quote)}</p>
                <p className="quote-ref">{pick(config.quoteRef)}</p>
              </div>
            )}

            {openKey === "details" && (
              <div className="ov-body ov-details">
                <Row label={t("dateLabel")} value={formatDate(lang)} />
                <Row label={t("timeLabel")} value={formatTime(lang)} />
                <Row label={t("venueLabel")} value={pick(config.venue.name)} sub={pick(config.venue.address)} />
              </div>
            )}

            {openKey === "location" && (
              <div className="ov-body">
                <p className="map-name display">{pick(config.venue.name)}</p>
                <p className="map-address">{pick(config.venue.address)}</p>
                <a className="btn btn-gold" href={mapHref()} target="_blank" rel="noopener noreferrer">
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

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="ov-row">
      <span className="ov-row-label">{label}</span>
      <span className="ov-row-value display">{value}</span>
      {sub ? <span className="ov-row-sub">{sub}</span> : null}
    </div>
  );
}

function RsvpForm() {
  const { t, lang } = useLang();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState("1");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setErr(true); ref.current?.focus(); return; }
    const bg = `${config.groom[lang]} ${t("and")} ${config.bride[lang]}`;
    const status = attending === "yes" ? t("willAttend") : t("wontAttend");
    const lines = lang === "ar"
      ? [`تأكيد حضور حفل خطوبة ${bg} 🌿`, `الاسم: ${name.trim()}`, `الحالة: ${status}`, attending === "yes" ? `عدد الأشخاص: ${guests}` : "", msg.trim() ? `رسالة: ${msg.trim()}` : ""]
      : [`RSVP — Engagement of ${bg} 🌿`, `Name: ${name.trim()}`, `Status: ${status}`, attending === "yes" ? `Guests: ${guests}` : "", msg.trim() ? `Message: ${msg.trim()}` : ""];
    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="ov-body rsvp-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="ov-name">{t("nameLabel")} <span className="req">*</span></label>
        <input id="ov-name" ref={ref} className="input" value={name} autoComplete="name"
          placeholder={t("namePlaceholder")} aria-invalid={err}
          onChange={(e) => { setName(e.target.value); if (err && e.target.value.trim()) setErr(false); }} />
        {err && <span role="alert" className="field-error">{t("nameRequired")}</span>}
      </div>
      <div className="field">
        <span className="field-legend">{t("attendanceLabel")}</span>
        <div className="radio-row">
          <label className={`radio-chip ${attending === "yes" ? "on" : ""}`}>
            <input type="radio" name="att" checked={attending === "yes"} onChange={() => setAttending("yes")} />
            {t("willAttend")}
          </label>
          <label className={`radio-chip ${attending === "no" ? "on" : ""}`}>
            <input type="radio" name="att" checked={attending === "no"} onChange={() => setAttending("no")} />
            {t("wontAttend")}
          </label>
        </div>
      </div>
      {attending === "yes" && (
        <div className="field">
          <label htmlFor="ov-guests">{t("guestsLabel")}</label>
          <select id="ov-guests" className="select" value={guests} onChange={(e) => setGuests(e.target.value)}>
            {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => <option key={n} value={n}>{n}</option>)}
            <option value="+10">+10</option>
          </select>
        </div>
      )}
      <div className="field">
        <label htmlFor="ov-msg">{t("messageLabel")}</label>
        <textarea id="ov-msg" className="input" rows={3} value={msg} placeholder={t("messagePlaceholder")} onChange={(e) => setMsg(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-gold">{t("sendWhatsapp")}</button>
    </form>
  );
}
