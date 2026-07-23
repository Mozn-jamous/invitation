"use client";

import { Scene, SceneItem } from "./Scene";
import { OrnDivider } from "./Ornaments";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";

export function Footer() {
  const { t, lang } = useLang();
  return (
    <Scene bg="/images/scene-footer.webp" position="center top" className="footer-scene">
      <SceneItem>
        <p className="footer-blessing display">{t("footerBlessing")}</p>
        <OrnDivider className="footer-divider" />
        <p className="footer-names script metallic">
          {config.groom[lang]} &amp; {config.bride[lang]}
        </p>
        <p className="footer-love">
          {t("withLove")} <span aria-hidden>♥</span>
        </p>
      </SceneItem>
    </Scene>
  );
}
