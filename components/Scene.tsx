"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/* A full-screen CHAPTER. Its palace backdrop lives INSIDE the scene and drifts
   with a parallax as you scroll (so content sits *in* the room, not floating on
   a separate layer). A darkness veil deepens at the scene's entry & exit, so
   moving between chapters feels like passing from one room into the next. The
   body's children (wrap each in <SceneItem>) rise in together with the scene. */

export function Scene({
  bg,
  position = "center",
  className = "",
  children,
}: {
  bg: string;
  position?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // backdrop parallax + slow breathing zoom
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.05, 1.16]);
  // darkness that deepens as the scene enters and leaves → the "between rooms" beat
  const veil = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [1, 0, 0, 1]);

  const body: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.08 },
    },
  };

  return (
    <section ref={ref} className={`scene ${className}`}>
      <motion.div
        className="scene-bgi"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: position,
          y: reduce ? 0 : bgY,
          scale: reduce ? 1 : bgScale,
        }}
      />
      <motion.div
        className="scene-shade"
        aria-hidden="true"
        style={{ opacity: reduce ? 0 : veil }}
      />
      <motion.div
        className="scene-body"
        variants={body}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* One element inside a Scene — rises + fades in as part of the scene's arrival. */
export function SceneItem({
  children,
  className = "",
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
