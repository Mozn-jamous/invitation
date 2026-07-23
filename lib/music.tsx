"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* Background music controller.
   Drop an audio file at:  public/music/background.mp3
   (site works fine without it — the button just stays idle). */

type MusicCtx = {
  playing: boolean;
  available: boolean;
  toggle: () => void;
  play: () => void;
  pause: () => void;
};

const Ctx = createContext<MusicCtx | null>(null);

const SRC = "/invitation/music/background.mp3";

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.55;
    audio.preload = "auto";
    const onErr = () => setAvailable(false);
    audio.addEventListener("error", onErr);
    audioRef.current = audio;
    return () => {
      audio.removeEventListener("error", onErr);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, play, pause]);

  const value = useMemo(
    () => ({ playing, available, toggle, play, pause }),
    [playing, available, toggle, play, pause]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useMusic(): MusicCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useMusic must be used within MusicProvider");
  return ctx;
}
