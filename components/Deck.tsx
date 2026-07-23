"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Letter } from "./Letter";
import { SceneSection } from "./SceneSection";
import { useLang } from "@/lib/i18n";

/* THE STORYBOOK — one full-screen leaf at a time, each with its own palace
   backdrop, turned like the pages of a book. Forward/back by the ornate arrows,
   the icon tray, arrow keys, wheel, or swipe. Every page's content rises in on
   arrival, so the invitation reads as a story unfolding chapter by chapter. */

type PageDef = {
  key: string;
  bg: string; // backdrop class (see .scene-* in globals.css)
  icon: string; // nav tray icon
  render: (revealed: boolean) => React.ReactNode;
};

const PAGES: PageDef[] = [
  { key: "message", bg: "scene-hero", icon: "/images/nav-home.webp", render: (r) => <Letter revealed={r} /> },
  { key: "details", bg: "scene-details", icon: "/images/nav-details.webp", render: () => <SceneSection view="details" /> },
  { key: "location", bg: "scene-location", icon: "/images/nav-location.webp", render: () => <SceneSection view="location" /> },
  { key: "countdown", bg: "scene-countdown", icon: "/images/nav-countdown.webp", render: () => <SceneSection view="countdown" /> },
  { key: "rsvp", bg: "scene-rsvp", icon: "/images/nav-rsvp.webp", render: () => <SceneSection view="rsvp" /> },
];

const LABELS: Record<string, { ar: string; en: string }> = {
  message: { ar: "الرسالة", en: "Letter" },
  details: { ar: "التفاصيل", en: "Details" },
  location: { ar: "الموقع", en: "Location" },
  countdown: { ar: "العدّاد", en: "Countdown" },
  rsvp: { ar: "الحضور", en: "RSVP" },
};

export function Deck({ revealed }: { revealed: boolean }) {
  const { pick } = useLang();
  const reduce = useReducedMotion();
  const [[page, dir], setState] = useState<[number, number]>([0, 0]);
  const lock = useRef(false);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number, forceDir?: number) => {
      if (next < 0 || next >= PAGES.length || next === page) return;
      if (lock.current) return;
      lock.current = true;
      setState([next, forceDir ?? (next > page ? 1 : -1)]);
      window.setTimeout(() => (lock.current = false), reduce ? 60 : 720);
    },
    [page, reduce]
  );

  const go = useCallback((delta: number) => goTo(page + delta, delta), [goTo, page]);

  // lock the body — the book is paged, not scrolled
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // keyboard: in RTL, ArrowLeft advances the story, ArrowRight goes back
  useEffect(() => {
    if (!revealed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "PageDown") go(1);
      else if (e.key === "ArrowRight" || e.key === "PageUp") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, go]);

  // wheel turns pages (debounced by the lock)
  const onWheel = (e: React.WheelEvent) => {
    if (!revealed) return;
    const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (Math.abs(d) < 12) return;
    go(d > 0 ? 1 : -1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    // RTL: swipe left (dx<0) = forward
    go(dx < 0 ? 1 : -1);
  };

  // The turning leaf swings past 90° and its (hidden) backface reveals the leaf
  // beneath — a real page turn. Only the leaf being turned rotates; the other
  // rests flat at the spine.
  const EASE = [0.76, 0, 0.24, 1] as const;
  const flip = {
    enter: (d: number) =>
      reduce
        ? { opacity: 0 }
        : { rotateY: d < 0 ? 156 : 0, zIndex: d < 0 ? 3 : 1 },
    center: {
      rotateY: 0,
      zIndex: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE },
    },
    exit: (d: number) =>
      reduce
        ? { opacity: 0, transition: { duration: 0 } }
        : {
            rotateY: d > 0 ? 156 : 0,
            zIndex: d > 0 ? 3 : 1,
            transition: { duration: 0.9, ease: EASE },
          },
  };

  const current = PAGES[page];

  return (
    <div
      className="deck"
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="deck-book">
        <AnimatePresence custom={dir} initial={false}>
          <motion.div
            key={current.key}
            className="deck-page"
            custom={dir}
            variants={flip}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ transformOrigin: "right center" }}
          >
            <div className={`deck-bg scene-layer ${current.bg}`} aria-hidden="true" />
            <div className="scene-scrim" aria-hidden="true" />
            <div className="deck-sheen" aria-hidden="true" />
            <div className="deck-page-inner">{current.render(revealed)}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="deck-vignette" aria-hidden="true" />

      {revealed && (
        <div
          className="deck-dots"
          role="tablist"
          aria-label={pick({ ar: "صفحات الدعوة", en: "Invitation pages" })}
        >
          {PAGES.map((p, i) => (
            <button
              key={p.key}
              className={`deck-dot ${i === page ? "on" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === page}
              aria-label={pick(LABELS[p.key])}
            />
          ))}
        </div>
      )}
    </div>
  );
}
