/* ============================================================
   ⚙️  إعدادات الدعوة — عدّل القيم من هون فقط
   EDIT EVERYTHING HERE. No need to touch other files.
   ============================================================ */

export const config = {
  /* --- أسماء العروسين --- */
  groom: { ar: "عبد العزيز", en: "Abdul Aziz" },
  bride: { ar: "مزن", en: "Muzn" },

  /* --- 📅 التاريخ والوقت (ISO 8601, 24h) ---
     ⬅️ عدّل هذا السطر: السنة-الشهر-اليوماليوم T الساعة:الدقيقة:00
     مثال: 15 أيلول 2026، 7:00 مساءً = "2026-09-15T19:00:00" */
  dateISO: "2026-07-28T18:00:00",

  /* --- 📍 المكان --- */
  venue: {
    name: { ar: "استراحة الفخم", en: "Al-Fakhem Estate" },
    address: {
      ar: "التل – طريق السكر – الطلعة التي قبل حاجز منين",
      en: "Al-Tal – Sukkar Road – the ascent before Manin checkpoint",
    },
    // ⬅️ الصق رابط جوجل مابس الحقيقي هنا (أو اتركه للبحث بالاسم)
    mapUrl: "https://goo.gl/maps/mrA8mbMkgz4jfr397?g_st=aw",
  },

  /* --- 📱 واتساب لتأكيد الحضور ---
     بصيغة دولية بدون + أو مسافات، مثال: 963991234567 */
  whatsappNumber: "963900000000",

  /* --- 📝 رابط استقبال تأكيدات الحضور (Google Apps Script Web App) ---
     الصق رابط النشر هنا، وستُحفظ كل الردود في Google Sheet تراه أنت. */
  rsvpEndpoint: "",

  /* --- 💌 نص الرسالة (صفحة الرق) — عدّل السطور كما تريد --- */
  letter: {
    bism: {
      ar: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      en: "In the Name of God, the Most Gracious, the Most Merciful",
    },
    body: {
      ar: [
        "في ليلةٍ مضيئةٍ بالفرح يُجمّلها حضوركم،",
        "ضمّوا فؤادهم بجميل دعائكم،",
        "وسَلوا لهم الرحمن عمراً هانياً",
      ],
      en: [
        "On a night aglow with joy, made lovelier by your presence,",
        "embrace their hearts with your kind prayers,",
        "and ask the Most Merciful to grant them a life of bliss",
      ],
    },
    closing: {
      ar: ["وبحضوركم تكتمل فرحتنا", "ونصنع ذكريات لا تُنسى"],
      en: ["Your presence completes our joy", "and weaves memories never to fade"],
    },
  },

  /* --- 🖼️ صور المعرض — اتركها فارغة لحد ما تجهز الصور --- */
  gallery: [] as { src: string; alt?: string }[],

  /* --- ✨ العبارة / الآية --- */
  quote: {
    ar: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    en: "And among His signs is that He created for you mates that you may find tranquility in them; and He placed between you affection and mercy.",
  },
  quoteRef: { ar: "﴿ الروم ٢١ ﴾", en: "— Ar-Rum 21" },
} as const;

/* ---------- Derived helpers ---------- */

export type Lang = "ar" | "en";

/** A Google Maps link — uses the pasted URL, or falls back to a name search. */
export function mapHref(): string {
  if (config.venue.mapUrl) return config.venue.mapUrl;
  const q = encodeURIComponent(
    `${config.venue.name.en} ${config.venue.address.en}`
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
