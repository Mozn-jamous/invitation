"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Lang } from "./config";

/* ---------- UI strings (everything the interface says) ---------- */
export const strings = {
  openInvitation: { ar: "افتح الدعوة", en: "Open Invitation" },
  weInvite: { ar: "بكل فرح وسرور ندعوكم لحضور حفل خطوبة", en: "With joy, we invite you to celebrate the engagement of" },
  and: { ar: "&", en: "&" },
  saveTheDate: { ar: "احفظوا الموعد", en: "Save the Date" },
  overtureTagline: { ar: "يسرّنا دعوتكم لمشاركة أجمل لحظاتنا", en: "We'd be honored by your presence to share our most beautiful moments" },
  countdownTitle: { ar: "باقٍ على الفرح", en: "Counting Down to the Celebration" },
  days: { ar: "يوم", en: "Days" },
  hours: { ar: "ساعة", en: "Hours" },
  minutes: { ar: "دقيقة", en: "Minutes" },
  seconds: { ar: "ثانية", en: "Seconds" },
  theBigDay: { ar: "حلّ اليوم الموعود ✦ بانتظاركم", en: "The day has arrived ✦ We await you" },
  detailsTitle: { ar: "تفاصيل الحفل", en: "Event Details" },
  dateLabel: { ar: "التاريخ", en: "Date" },
  timeLabel: { ar: "الوقت", en: "Time" },
  venueLabel: { ar: "المكان", en: "Venue" },
  locationTitle: { ar: "الموقع", en: "Location" },
  openMap: { ar: "افتح الخريطة", en: "Open in Maps" },
  rsvpTitle: { ar: "تأكيد الحضور", en: "Kindly RSVP" },
  rsvpNote: {
    ar: "يشرّفنا حضوركم. فضلاً أكّدوا لنا عبر واتساب.",
    en: "Your presence would honor us. Please confirm via WhatsApp.",
  },
  nameLabel: { ar: "الاسم", en: "Full Name" },
  namePlaceholder: { ar: "اكتب اسمك الكريم", en: "Your name" },
  guestsLabel: { ar: "عدد الأشخاص", en: "Number of Guests" },
  attendanceLabel: { ar: "الحضور", en: "Attendance" },
  willAttend: { ar: "سأحضر بإذن الله", en: "Joyfully accepts" },
  wontAttend: { ar: "أعتذر عن الحضور", en: "Regretfully declines" },
  messageLabel: { ar: "كلمة للعروسين (اختياري)", en: "A note to the couple (optional)" },
  messagePlaceholder: { ar: "مبارك... تمنياتي لكم", en: "Best wishes..." },
  sendWhatsapp: { ar: "أرسل عبر واتساب", en: "Send via WhatsApp" },
  nameRequired: { ar: "فضلاً اكتب اسمك", en: "Please enter your name" },
  footerBlessing: { ar: "بارك الله لهما وبارك عليهما وجمع بينهما في خير", en: "May God bless them and unite them in goodness" },
  awaitYou: { ar: "ننتظركم بكل شوق لمشاركتنا فرحتنا", en: "We eagerly await you to share in our joy" },
  withLove: { ar: "بمحبّة", en: "With love" },
  navCountdown: { ar: "العدّاد", en: "Countdown" },
  navDetails: { ar: "التفاصيل", en: "Details" },
  navLocation: { ar: "الموقع", en: "Location" },
  navRsvp: { ar: "الحضور", en: "RSVP" },
  navGallery: { ar: "الصور", en: "Gallery" },
  galleryTitle: { ar: "الصور", en: "Gallery" },
  back: { ar: "رجوع", en: "Back" },
  gallerySoon: { ar: "أجمل اللحظات ستُضاف هنا قريباً بإذن الله", en: "Our cherished moments will appear here soon" },
  langName: { ar: "العربية", en: "English" },
  musicOn: { ar: "إيقاف الموسيقى", en: "Pause music" },
  musicOff: { ar: "تشغيل الموسيقى", en: "Play music" },
} as const;

export type StringKey = keyof typeof strings;

/* ---------- Context ---------- */
type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** translate a UI string key */
  t: (key: StringKey) => string;
  /** pick from a {ar,en} pair */
  pick: (pair: { ar: string; en: string }) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggle: () => setLang((l) => (l === "ar" ? "en" : "ar")),
      t: (key) => strings[key][lang],
      pick: (pair) => pair[lang],
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
