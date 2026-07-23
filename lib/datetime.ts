import { config } from "./config";
import type { Lang } from "./config";

/** The event moment, parsed from config (local time). */
export const target = new Date(config.dateISO);

/* Arabic month/day names but Latin digits (25 · 2026), matching the design. */
const locale = (lang: Lang) => (lang === "ar" ? "ar-SY-u-nu-latn" : "en-US");

/** e.g. "الأحد، 15 أيلول 2026" / "Sunday, September 15, 2026" */
export function formatDate(lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(target);
}

/** e.g. "7:00 م" / "7:00 PM" */
export function formatTime(lang: Lang): string {
  return new Intl.DateTimeFormat(locale(lang), {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(target);
}
