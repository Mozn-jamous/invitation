"use client";

import { Scene, SceneItem } from "./Scene";
import { useLang } from "@/lib/i18n";
import { config } from "@/lib/config";

export function QuoteSection() {
  const { pick } = useLang();
  return (
    <Scene bg="/images/scene-quote.webp" className="quote-scene">
      <SceneItem>
        <div className="quote-card panel frame">
          <p className="quote-text display">{pick(config.quote)}</p>
          <p className="quote-ref">{pick(config.quoteRef)}</p>
        </div>
      </SceneItem>
    </Scene>
  );
}
