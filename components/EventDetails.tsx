"use client";

import { Scene, SceneItem } from "./Scene";
import { Tilt } from "./Tilt";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";
import { formatDate, formatTime } from "@/lib/datetime";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="30" height="30" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="30" height="30" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="30" height="30" aria-hidden="true">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function EventDetails() {
  const { t, pick, lang } = useLang();

  const items = [
    { icon: <CalendarIcon />, label: t("dateLabel"), value: formatDate(lang) },
    { icon: <ClockIcon />, label: t("timeLabel"), value: formatTime(lang) },
    {
      icon: <PinIcon />,
      label: t("venueLabel"),
      value: pick(config.venue.name),
      sub: pick(config.venue.address),
    },
  ];

  return (
    <Scene bg="/images/scene-details.webp" className="details-scene">
      <SceneItem>
        <h2 className="section-title">{t("detailsTitle")}</h2>
      </SceneItem>

      <SceneItem>
        <div className="details-grid">
          {items.map((it) => (
            <Tilt key={it.label} className="detail-card panel frame" max={10}>
              <span className="detail-icon metallic-stroke">{it.icon}</span>
              <span className="detail-label">{it.label}</span>
              <span className="detail-value display">{it.value}</span>
              {"sub" in it && it.sub ? <span className="detail-sub">{it.sub}</span> : null}
            </Tilt>
          ))}
        </div>
      </SceneItem>
    </Scene>
  );
}
