/* ============================================================
   Victorian SVG ornaments — silver filigree, dividers, monogram,
   themed burgundy roses, and a wax seal. Pure, dependency-free.
   ============================================================ */

type SvgProps = React.SVGProps<SVGSVGElement>;

/* Shared gradient stops, inlined per-component with unique ids so
   multiple instances never collide. */
function SilverStops({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#f5f7fa" />
      <stop offset="45%" stopColor="#d7dbe0" />
      <stop offset="55%" stopColor="#9aa0a8" />
      <stop offset="100%" stopColor="#edeff2" />
    </linearGradient>
  );
}

/* ---------- Corner filigree (top-left origin; flip via CSS) ---------- */
export function CornerFiligree({ className, ...props }: SvgProps) {
  const g = "cf-" + Math.abs(hash(className ?? "cf"));
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <SilverStops id={g} />
      </defs>
      <g
        stroke={`url(#${g})`}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M8 8 H70" />
        <path d="M8 8 V70" />
        <path d="M8 20 C40 22 60 40 62 74 C63 92 52 104 40 104 C28 104 22 94 26 84 C30 74 44 74 46 86" />
        <path d="M20 8 C22 40 40 60 74 62 C92 63 104 52 104 40 C104 28 94 22 84 26 C74 30 74 44 86 46" />
        <path d="M8 8 C34 12 48 26 52 52 C26 48 12 34 8 8 Z" fill={`url(#${g})`} opacity="0.9" stroke="none" />
      </g>
      <circle cx="62" cy="74" r="3" fill="#b01030" />
      <circle cx="74" cy="62" r="3" fill="#b01030" />
      <circle cx="8" cy="8" r="3.4" fill={`url(#${g})`} />
    </svg>
  );
}

/* ---------- Horizontal divider flourish with center ruby ---------- */
export function Divider({ className, ...props }: SvgProps) {
  const g = "dv-" + Math.abs(hash(className ?? "dv"));
  return (
    <svg
      viewBox="0 0 480 40"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <defs>
        <SilverStops id={g} />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1.5" fill="none" strokeLinecap="round">
        {/* left wing */}
        <path d="M20 20 H196" />
        <path d="M196 20 C176 20 164 10 150 10 C132 10 128 24 142 26 C152 27 154 18 146 16" />
        <path d="M196 20 C176 20 164 30 150 30 C132 30 128 16 142 14" opacity="0.7" />
        {/* right wing (mirror) */}
        <path d="M460 20 H284" />
        <path d="M284 20 C304 20 316 10 330 10 C348 10 352 24 338 26 C328 27 326 18 334 16" />
        <path d="M284 20 C304 20 316 30 330 30 C348 30 352 16 338 14" opacity="0.7" />
      </g>
      {/* center diamond + ruby */}
      <g transform="translate(240 20)">
        <path d="M0 -13 L11 0 L0 13 L-11 0 Z" fill="none" stroke={`url(#${g})`} strokeWidth="1.5" />
        <circle r="4.5" fill="#b01030" />
        <circle r="4.5" fill="none" stroke={`url(#${g})`} strokeWidth="1" />
      </g>
      <circle cx="20" cy="20" r="3" fill={`url(#${g})`} />
      <circle cx="460" cy="20" r="3" fill={`url(#${g})`} />
    </svg>
  );
}

/* ---------- Small flourish (section top accent) ---------- */
export function Flourish({ className, ...props }: SvgProps) {
  const g = "fl-" + Math.abs(hash(className ?? "fl"));
  return (
    <svg viewBox="0 0 120 30" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <SilverStops id={g} />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M10 15 C30 15 34 6 46 6 C58 6 58 18 48 18 C42 18 42 11 48 11" />
        <path d="M110 15 C90 15 86 6 74 6 C62 6 62 18 72 18 C78 18 78 11 72 11" />
        <path d="M46 15 H74" />
      </g>
      <circle cx="60" cy="15" r="3.2" fill="#b01030" />
    </svg>
  );
}

/* ---------- Monogram frame — oval cartouche with initials ---------- */
export function MonogramFrame({
  initials,
  className,
  ...props
}: SvgProps & { initials: string }) {
  const g = "mg-" + Math.abs(hash(initials + (className ?? "")));
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <SilverStops id={g} />
      </defs>
      {/* twin oval rings */}
      <ellipse cx="100" cy="100" rx="72" ry="86" fill="none" stroke={`url(#${g})`} strokeWidth="1.6" />
      <ellipse cx="100" cy="100" rx="63" ry="77" fill="none" stroke={`url(#${g})`} strokeWidth="1" opacity="0.7" />
      {/* top & bottom crest leaves */}
      <g stroke={`url(#${g})`} strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M100 14 C88 22 88 30 100 30 C112 30 112 22 100 14" />
        <path d="M100 186 C88 178 88 170 100 170 C112 170 112 178 100 186" />
        <path d="M78 20 C86 28 92 26 92 26 M122 20 C114 28 108 26 108 26" />
      </g>
      <circle cx="100" cy="30" r="2.6" fill="#b01030" />
      <circle cx="100" cy="170" r="2.6" fill="#b01030" />
      {/* initials */}
      <text
        x="100"
        y="100"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-ar-display, serif)"
        fontSize="58"
        fill={`url(#${g})`}
        style={{ letterSpacing: "-2px" }}
      >
        {initials}
      </text>
    </svg>
  );
}

/* ---------- Themed rose sprig — burgundy/ruby bloom, silver leaves ---------- */
export function RoseSprig({ className, ...props }: SvgProps) {
  const s = "rs-" + Math.abs(hash("s" + (className ?? "")));
  const p = "rp-" + Math.abs(hash("p" + (className ?? "")));
  return (
    <svg viewBox="0 0 120 160" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <SilverStops id={s} />
        <radialGradient id={p} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#d21f42" />
          <stop offset="55%" stopColor="#b01030" />
          <stop offset="100%" stopColor="#5c0e23" />
        </radialGradient>
      </defs>
      {/* stem */}
      <path d="M60 150 C60 120 58 100 60 84" stroke="#7a8a5a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      {/* leaves */}
      <g fill="none" stroke={`url(#${s})`} strokeWidth="1.3">
        <path d="M60 128 C40 122 30 108 34 96 C50 98 62 110 60 128 Z" fill="#8a9a6a" fillOpacity="0.35" />
        <path d="M60 112 C80 106 90 92 86 80 C70 82 58 94 60 112 Z" fill="#8a9a6a" fillOpacity="0.35" />
      </g>
      {/* rose bloom — layered petals */}
      <g stroke="#3d0a17" strokeWidth="0.8">
        <circle cx="60" cy="56" r="30" fill={`url(#${p})`} />
        <path d="M60 30 C74 34 82 46 80 58 C68 56 60 46 60 30 Z" fill="#c41839" opacity="0.9" />
        <path d="M90 56 C86 70 74 78 62 76 C64 64 74 56 90 56 Z" fill="#a30f2c" opacity="0.9" />
        <path d="M60 82 C46 78 38 66 40 54 C52 56 60 66 60 82 Z" fill="#c41839" opacity="0.85" />
        <path d="M30 56 C34 42 46 34 58 36 C56 48 46 56 30 56 Z" fill="#a30f2c" opacity="0.9" />
        {/* inner spiral */}
        <path d="M60 44 C68 46 70 54 64 60 C58 64 50 60 52 52 C53 47 60 47 60 52" fill="none" stroke="#faf6ef" strokeOpacity="0.55" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/* ---------- Wax seal (intro) ---------- */
export function WaxSeal({
  initials,
  className,
  ...props
}: SvgProps & { initials: string }) {
  const g = "ws-" + Math.abs(hash(initials));
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} {...props}>
      <defs>
        <radialGradient id={g} cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#d21f42" />
          <stop offset="45%" stopColor="#b01030" />
          <stop offset="100%" stopColor="#5c0e23" />
        </radialGradient>
        <radialGradient id={g + "h"} cx="36%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* irregular wax blob */}
      <path
        d="M100 12 C132 10 150 24 160 44 C176 52 190 74 184 100 C196 124 182 156 156 164 C142 186 110 194 88 182 C60 190 30 172 26 146 C6 132 6 96 24 82 C22 54 46 26 78 22 C84 14 92 12 100 12 Z"
        fill={`url(#${g})`}
      />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#faf6ef" strokeOpacity="0.35" strokeWidth="2" />
      <circle cx="100" cy="100" r="60" fill="none" stroke="#2b0710" strokeOpacity="0.4" strokeWidth="1" />
      <text
        x="100"
        y="102"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-ar-display, serif)"
        fontSize="60"
        fill="#faf6ef"
        fillOpacity="0.92"
        style={{ letterSpacing: "-3px" }}
      >
        {initials}
      </text>
      <path
        d="M100 12 C132 10 150 24 160 44 C176 52 190 74 184 100 C170 96 150 70 150 44 C130 40 112 30 100 12 Z"
        fill={`url(#${g}h)`}
      />
    </svg>
  );
}

/* tiny deterministic hash so gradient ids stay stable across SSR/CSR */
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h || 1;
}

/* ============================================================
   Image-based ornaments (the generated theme photos).
   ============================================================ */

/** Silver + ruby flourish used as a section-top accent. */
export function SectionFlourish({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/divider-orn.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`orn mask-divider flourish-img ${className}`}
    />
  );
}

/** Wider silver + ruby divider. */
export function OrnDivider({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/divider-orn.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`orn mask-divider divider-img ${className}`}
    />
  );
}

/** Burgundy roses bouquet with silver foliage. */
export function RosesImg({ className = "" }: { className?: string }) {
  return (
    <img
      src="/images/roses.webp"
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`orn mask-radial ${className}`}
    />
  );
}
