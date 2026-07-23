"use client";

import { motion, type Transition } from "framer-motion";

/* Theatre curtains for the Overture — one cohesive rendered image split down
   the middle. Each half shows its side of the full picture (via a 100vw inner
   layer pinned to that side) and slides outward to reveal the Hall. */

export function Curtains({
  open,
  reduce,
}: {
  open: boolean;
  reduce: boolean | null;
}) {
  const tx: Transition = {
    duration: reduce ? 0 : 1.6,
    delay: reduce ? 0 : 0.35,
    ease: [0.76, 0, 0.24, 1],
  };

  return (
    <div className="curtains" aria-hidden="true">
      {/* dark stage with a warm spotlight, revealed as the halves part */}
      <div className="curtain-stage" />

      <motion.div
        className="cv-half l"
        animate={{ x: open ? "-100%" : "0%" }}
        transition={tx}
      >
        <div className="cv-img" />
      </motion.div>

      <motion.div
        className="cv-half r"
        animate={{ x: open ? "100%" : "0%" }}
        transition={tx}
      >
        <div className="cv-img" />
      </motion.div>
    </div>
  );
}
