"use client";

import { Scene, SceneItem } from "./Scene";
import { useLang } from "@/lib/i18n";
import { config, mapHref } from "@/lib/config";

export function LocationMap() {
  const { t, pick } = useLang();

  return (
    <Scene bg="/images/scene-location.webp" className="location-scene">
      <SceneItem>
        <h2 className="section-title">{t("locationTitle")}</h2>
      </SceneItem>

      <SceneItem>
        <div className="map-card panel frame">
          <div className="map-pin" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" width="56" height="56">
              <path d="M12 22s7.5-6.6 7.5-12A7.5 7.5 0 1 0 4.5 10c0 5.4 7.5 12 7.5 12Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
          <p className="map-name display">{pick(config.venue.name)}</p>
          <p className="map-address">{pick(config.venue.address)}</p>
          <a
            className="btn btn-ghost"
            href={mapHref()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M9 3v16M15 5v16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
            {t("openMap")}
          </a>
        </div>
      </SceneItem>
    </Scene>
  );
}
