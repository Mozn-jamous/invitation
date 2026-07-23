"use client";

import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43l-.48-.01c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2.01 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.57.18 1.1.16 1.51.1.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function Rsvp() {
  const { t, pick, lang } = useLang();
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const nameRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(true);
      nameRef.current?.focus();
      return;
    }
    setError(false);

    const attendText =
      attending === "yes" ? t("willAttend") : t("wontAttend");
    const brideGroom = `${config.groom[lang]} ${t("and")} ${config.bride[lang]}`;

    const lines =
      lang === "ar"
        ? [
            `تأكيد حضور حفل خطوبة ${brideGroom} 🌿`,
            `الاسم: ${name.trim()}`,
            `الحالة: ${attendText}`,
            attending === "yes" ? `عدد الأشخاص: ${guests}` : "",
            message.trim() ? `رسالة: ${message.trim()}` : "",
          ]
        : [
            `RSVP — Engagement of ${brideGroom} 🌿`,
            `Name: ${name.trim()}`,
            `Status: ${attendText}`,
            attending === "yes" ? `Guests: ${guests}` : "",
            message.trim() ? `Message: ${message.trim()}` : "",
          ];

    const text = encodeURIComponent(lines.filter(Boolean).join("\n"));
    const url = `https://wa.me/${config.whatsappNumber}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="section rsvp-section">
      <div className="container">
        <Reveal>
          <h2 className="section-title">{t("rsvpTitle")}</h2>
          <p className="rsvp-note">{t("rsvpNote")}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="rsvp-form panel frame" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="rsvp-name">
                {t("nameLabel")} <span className="req">*</span>
              </label>
              <input
                id="rsvp-name"
                ref={nameRef}
                className="input"
                type="text"
                value={name}
                autoComplete="name"
                placeholder={t("namePlaceholder")}
                aria-required="true"
                aria-invalid={error}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error && e.target.value.trim()) setError(false);
                }}
              />
              {error && (
                <span role="alert" className="field-error">
                  {t("nameRequired")}
                </span>
              )}
            </div>

            <div className="field">
              <span className="field-legend">{t("attendanceLabel")}</span>
              <div className="radio-row">
                <label className={`radio-chip ${attending === "yes" ? "on" : ""}`}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === "yes"}
                    onChange={() => setAttending("yes")}
                  />
                  {t("willAttend")}
                </label>
                <label className={`radio-chip ${attending === "no" ? "on" : ""}`}>
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === "no"}
                    onChange={() => setAttending("no")}
                  />
                  {t("wontAttend")}
                </label>
              </div>
            </div>

            {attending === "yes" && (
              <div className="field">
                <label htmlFor="rsvp-guests">{t("guestsLabel")}</label>
                <select
                  id="rsvp-guests"
                  className="select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                  <option value="+10">+10</option>
                </select>
              </div>
            )}

            <div className="field">
              <label htmlFor="rsvp-msg">{t("messageLabel")}</label>
              <textarea
                id="rsvp-msg"
                className="input"
                rows={3}
                value={message}
                placeholder={t("messagePlaceholder")}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary rsvp-submit">
              <WhatsappIcon />
              {t("sendWhatsapp")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
