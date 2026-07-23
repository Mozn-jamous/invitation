# Asset Manifest — Victorian Engagement Keepsake

Full rebuild from scratch. Vision = the 6-movement living keepsake (sealed invitation → break the
seal → curtains part → doves fly → living collage board → touchable memories). Aesthetic = an
authentic **touch of the Victorian era** layered over the wine/gold romantic keepsake.

**Designer-mode workflow:** Mozn generates each asset from the prompt; Claude chroma-keys the green,
composites, masks, and animates. Do NOT fake luxury with CSS gradients — real PNG assets only.

## Design DNA (locked)
- **Palette:** oxblood/burgundy `#4A0F1C` · antique gold `#C6A15B` · parchment/ivory `#EFE3C8` ·
  pewter silver · dusty blush (petals)
- **Type:** Cinzel Decorative (engraved caps) · Great Vibes / Pinyon Script (names) ·
  IM Fell English / Cormorant Garamond (antique body) · **Arabic:** Aref Ruqaa + Amiri
- **Texture:** aged parchment, velvet, damask, gilt/engraving linework, light foxing/patina

## Prompt formulas (append to each subject)
**Cutout objects (green-screen):**
```
…, Victorian era style, ornate and romantic, antique gold & deep burgundy tones, photorealistic,
highly detailed, centered, on a FLAT PURE GREEN #00FF00 background, no shadow, no reflection,
isolated cutout, 4K PNG
```
**Backdrops (full-bleed, NO green):**
```
…, Victorian, full-frame seamless texture, deep burgundy & gold, richly detailed, even soft
lighting, nothing in the foreground — background use, 4K
```

Priority: ⭐ essential · ➕ enriches · ✧ optional

## A — Backdrops & surfaces
- [ ] ⭐ Damask wallpaper — `ornate Victorian damask wallpaper, burgundy with gold scroll motif, seamless`
- [ ] ⭐ Aged parchment sheet — `antique aged parchment sheet, warm ivory, worn edges, flat top-down`
- [ ] ✧ Carved wood / marble tabletop — `dark carved Victorian wood tabletop, top-down`

## B — Overture curtains
- [ ] ⭐ Closed theatre curtains — `grand Victorian theatre curtains fully closed, heavy burgundy velvet, gold fringe & tassels, ornate gold valance on top, symmetrical, front view, fills frame` (one image → split in halves)

## C — Seal & monogram
- [ ] ⭐ Wax seal w/ monogram — `round burgundy wax seal stamped with an ornate intertwined monogram of Arabic letters ع & م, gold-flecked wax`
- [ ] ➕ Broken wax seal — same, `cracked in two halves`
- [ ] ➕ Monogram cipher — `Victorian monogram cipher, intertwined initials, laurel & filigree, gold engraving`

## D — Birds (motion)
- [ ] ⭐⭐ Dove pair, TWO poses — `a pair of white doves in flight, side profile, one image WINGS UP and one image WINGS DOWN`
- [ ] ➕ Perched dove — `a single white dove perched, folded wings, side profile`
- [ ] ✧ Butterflies — `Victorian specimen butterfly, ornate jewel-tone wings`

## E — Florals & petals
- [ ] ⭐ Loose petals ×4 — `single loose rose petals — burgundy, blush, ivory, deep red — top-down, velvet texture`
- [ ] ⭐ Rose sprig / small bouquet — `small Victorian bouquet of garden roses with ferns & baby's breath, red & blush`
- [ ] ➕ Corner floral garland — `ornate corner floral garland of roses & foliage, arcing`
- [ ] ➕ Pressed dried rose — `a pressed dried rose, botanical-specimen look`

## F — Keepsake objects
- [ ] ⭐ Oval gilt cameo frame (empty center) — `ornate oval gilded Victorian picture frame, EMPTY green center, filigree & rose motifs`
- [ ] ⭐ Ornate invitation card — `Victorian invitation card, gilded engraved border, aged ivory, blank center`
- [ ] ⭐ Open pocket watch — `antique Victorian gold pocket watch, open, ornate engraved case, PLAIN blank dial` (live countdown overlaid on the dial)
- [ ] ➕ Brass skeleton key — `ornate antique brass skeleton key, filigree bow`
- [ ] ➕ Wedding bands — `two intertwined gold wedding bands, ornate`
- [ ] ➕ Envelope w/ wax seal — `aged Victorian ivory envelope, flap slightly open, burgundy wax seal`
- [ ] ➕ Silk ribbon — `length of burgundy silk ribbon with gold edge, gently curved`
- [ ] ✧ Candlestick w/ candle — `ornate Victorian brass candlestick, lit ivory candle, warm flame`

## G — Ornaments & UI chrome
- [ ] ⭐ Filigree corner — `ornate Victorian gold filigree corner flourish` (one → mirrored to 4 corners)
- [ ] ⭐ Horizontal divider — `ornate Victorian horizontal divider flourish, gold, symmetrical, small central motif`
- [ ] ➕ Cartouche/label plaque — `small ornate Victorian cartouche/label plaque, gold frame, blank center` (for the 4 tabs)

---

## Generate FIRST (signature moment)
1. ⭐ Closed theatre curtains (B)
2. ⭐ Wax seal w/ monogram (C)
3. ⭐⭐ Dove pair, two poses (D)

→ enough to build the full opening (seal cracks → light → curtains part → doves fly) as the quality benchmark.

## Content still needed (into lib/config.ts)
- Venue name + address + Google Maps URL
- WhatsApp number
- Family names ("بدعوة من عائلة … و عائلة …")
- Couple photo (for the oval cameo frame)
- Music file → public/music/background.mp3

---

## STATUS — assets received & processed (2026-07-03)
All 26 delivered PNGs chroma-keyed (feathered green-removal + despill + trim) and imported to
`public/images/*.webp`: `damask-bg` `parchment` `theatre-stage` `seal` `seal-broken` `monogram`
`doves-fly` `dove` `butterflies` `petals-row` `bouquet` `bouquet2` `floral-corner` `rose`
`cameo-frame` (transparent oval center) `invite-card` `pocketwatch` (blank dial) `key` `rings`
`envelope` `envelope2` `ribbon` `candlestick` `corner-orn` `divider-orn` `cartouche`.

**Two notes:**
- `theatre-stage` curtains are **open** (a proscenium), not closed → use it as the Victorian FRAME
  and reveal via seal-break + doves, UNLESS a "closed curtains" asset is generated for literal parting.
- `ribbon` has faint dark residue → composite with `mix-blend-mode: screen/lighten`, or regenerate on green.
