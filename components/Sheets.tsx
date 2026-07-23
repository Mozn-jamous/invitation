"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { target } from "@/lib/datetime";
import { config } from "@/lib/config";

/* Shared bits reused by the scene views. */

export type TL = { d: number; h: number; m: number; s: number; done: boolean };

export function useCountdown(): TL | null {
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

/** RSVP form styled for the parchment (dark ink). Saves to our backend. */
export function RsvpForm() {
  const { t, pick } = useLang();
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [note, setNote] = useState("");
  const [err, setErr] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErr(true);
      return;
    }
    setStatus("sending");
    try {
      if (!config.rsvpEndpoint) throw new Error("no endpoint");
      // Google Apps Script Web App: fire-and-forget (no-cors) form post.
      const data = new URLSearchParams({
        name: name.trim(),
        attending: attending ? "نعم" : "لا",
        message: note,
      });
      await fetch(config.rsvpEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: data.toString(),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="pf-done">
        <p className="pf-done-t">
          {attending
            ? pick({ ar: "سُجّل حضورك، شكراً لك 🤍", en: "Your RSVP is saved — thank you 🤍" })
            : pick({ ar: "شكراً لإعلامنا 🤍", en: "Thank you for letting us know 🤍" })}
        </p>
      </div>
    );
  }

  return (
    <form className="pf" onSubmit={submit}>
      <label className="pf-field">
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
      {err && <span className="pf-err">{t("nameRequired")}</span>}

      <div className="pf-radios">
        <button
          type="button"
          className={`pf-radio ${attending ? "on" : ""}`}
          onClick={() => setAttending(true)}
        >
          {t("willAttend")}
        </button>
        <button
          type="button"
          className={`pf-radio ${!attending ? "on" : ""}`}
          onClick={() => setAttending(false)}
        >
          {t("wontAttend")}
        </button>
      </div>

      <label className="pf-field">
        <span>{t("messageLabel")}</span>
        <textarea
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t("messagePlaceholder")}
        />
      </label>

      <button type="submit" className="pf-send" disabled={status === "sending"}>
        {status === "sending"
          ? pick({ ar: "جارٍ الإرسال…", en: "Sending…" })
          : pick({ ar: "تأكيد الحضور", en: "Confirm RSVP" })}
      </button>
      {status === "error" && (
        <span className="pf-err">
          {pick({ ar: "تعذّر الإرسال، حاول مرة أخرى", en: "Couldn't send — please try again" })}
        </span>
      )}
    </form>
  );
}
