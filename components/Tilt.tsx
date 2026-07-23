"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Wraps children in a subtle 3D tilt that follows the cursor. */
export function Tilt({
  children,
  className,
  max = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rx = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { stiffness: 160, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { stiffness: 160, damping: 14 });
  const gx = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]: string[]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)`
  );

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
        position: "relative",
      }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            background: glareBg,
          }}
        />
      )}
    </motion.div>
  );
}
