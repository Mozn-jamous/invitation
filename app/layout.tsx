import type { Metadata } from "next";
import { Cormorant_Garamond, Amiri } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { config } from "@/lib/config";

/* Latin display — Roundhand English script, for Latin names & headings */
const roundhand = localFont({
  src: [
    { path: "./fonts/Roundhand-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Roundhand-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-latin-display",
  display: "swap",
});

/* Latin serif — elegant body */
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/* Arabic display — ArabType, for names & headings */
const arDisplay = localFont({
  src: "./fonts/ArabType.ttf",
  variable: "--font-ar-face",
  display: "swap",
});

/* Arabic body — refined Naskh */
const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  variable: "--font-ar-body-face",
  display: "swap",
});

const title = `${config.groom.ar} & ${config.bride.ar} — دعوة خطوبة`;

export const metadata: Metadata = {
  title,
  description:
    "بكل فرح وسرور ندعوكم لحضور حفل خطوبة عبد العزيز و مزن — An engagement celebration.",
  openGraph: {
    title,
    description: "بكل فرح وسرور ندعوكم لمشاركتنا فرحتنا",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVars = `${roundhand.variable} ${cormorant.variable} ${arDisplay.variable} ${amiri.variable}`;
  return (
    <html lang="ar" dir="rtl" className={fontVars}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
