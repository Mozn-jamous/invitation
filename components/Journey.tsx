"use client";

import { Letter } from "./Letter";
import { SceneSection } from "./SceneSection";

/* One long page — every scene stacked full-height and scrolled through
   continuously, top to bottom.  No black gaps (each scene fills the screen). */
export function Journey({ revealed }: { revealed: boolean }) {
  return (
    <main className="journey">
      <Letter revealed={revealed} />
      <SceneSection view="details" />
      <SceneSection view="location" />
      <SceneSection view="countdown" />
      <SceneSection view="rsvp" />
    </main>
  );
}
