"use client";

import { useLang } from "@/lib/i18n";
import { useMusic } from "@/lib/music";

function NoteIcon({ playing }: { playing: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 18V6l10-2v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="16" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      {!playing && (
        <path d="M3 3 L21 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}

export function Controls() {
  const { t } = useLang();
  const music = useMusic();

  return (
    <div className="controls">
      {/* music toggle only — invitation is Arabic-only */}
      <button
        type="button"
        className="ctrl-btn"
        onClick={music.toggle}
        aria-label={music.playing ? t("musicOn") : t("musicOff")}
        aria-pressed={music.playing}
        title={music.playing ? t("musicOn") : t("musicOff")}
      >
        <NoteIcon playing={music.playing} />
      </button>
    </div>
  );
}
