# 🎨 برومبتات الأصول — عبد العزيز و مزن (مركّز على المحتاج فعلاً)

ولّد بأي أداة (ChatGPT / Midjourney / Leonardo)، احفظ بالاسم المذكور داخل `public/images/`.
حطّهن بمجلد `victory` وأنا بضغطهن WebP وبركّبهن.

**القواعد:** الحروف لاتينية `M & A` (العربي بضيفه أنا كنص) · المشاهد **opaque** · الزخارف **شفافة**.

---

# ⭐ التحديث الأحدث (2026-07-03) — أصول التنقّل والعناصر التفاعلية

بنيتُ نظام **مشهد واحد + انتقالات سينمائية**. صار عندي شريط تنقّل مؤقت (نقاط) بدي أستبدله
بتصميمك، وعناصر النموذج بدها تتحوّل من "دخيلة" لـ "منتمية للثيم". هاي اللي محتاجها منك.

**لاحقة الستايل (الصقيها بآخر كل برومبت تحت):**
```
— luxurious Victorian royal-wedding aesthetic, deep wine-burgundy + antique gold with aged
silver accents, ornate Baroque filigree, soft candlelit sheen, highly detailed, a single
centered object, isolated on a solid chroma-key GREEN background (#00b140), even soft
lighting, no text, no letters, no scenery, PNG
```
(كلهن على **خلفية خضراء** مثل ما بتشتغلي — أنا بفصلها وبضغطها WebP.)

### ① طقم أيقونات التنقّل (الأهم) — 6 أيقونات **بنفس الطراز** · 512×512 · 1:1
كلهن **ميدالية دائرية موحّدة**: حلقة ذهبية رفيعة بفلغري باروكي بسيط + وسط عنابي غامق + رمز
ذهبي واحد رقيق بالنص. غيّري فقط الرمز:

| ملف | الرمز في النص |
|-----|----------------|
| `nav-home.png` | رسالة مطويّة / لفافة ورق `a folded letter` |
| `nav-countdown.png` | ساعة رملية نحيلة `a slim hourglass` |
| `nav-details.png` | لفافة مفتوحة مع ريشة `an open scroll with a quill` |
| `nav-location.png` | دبوس موقع `a map location pin` |
| `nav-rsvp.png` | ظرف مختوم `a sealed envelope` |
| `nav-gallery.png` | إطار صورة بيضاوي `an oval portrait frame` |

```
An ornate circular medallion emblem, a thin gilded ring with delicate Baroque filigree, a
deep wine-burgundy enamel center, a single refined gold [ضع الرمز هنا] symbol centered
inside, part of a matching set of royal-wedding navigation icons [+ لاحقة الستايل]
```
⚠️ ولّدي الستّة **بنفس الجملة** وغيّري الرمز فقط ليطلعوا متطابقين بالحجم والحلقة والإضاءة.

### ② سهما التنقّل (يسار/يمين) — 256×256 · 1:1
```
A single ornate gilded arrowhead chevron with delicate Baroque filigree and wine-burgundy
accents, pointing RIGHT, clean and symmetrical [+ لاحقة الستايل]
```
احفظي `arrow-next.png`، واعملي نسخة معكوسة لليسار `arrow-prev.png`.

### ③ زر الإرسال (RSVP) — لوحة فارغة أحطّ عليها النص · 1024×340 · عريض
```
An empty ornate horizontal cartouche banner, a gilded Baroque frame with corner filigree
around a deep wine-burgundy velvet panel, the center left COMPLETELY BLANK for text,
elegant and perfectly symmetrical [+ لاحقة الستايل]
```
احفظي `btn-send.png` — أنا بكتب "أرسل عبر واتساب" فوقها كنص حي (عربي/إنجليزي).

### ④ (اختياري) حاضنة شريط التنقّل — 1400×260 · عريض
```
An elongated horizontal tray / pill frame, a thin gilded Baroque border around a dark
translucent wine-burgundy body, hollow inside to hold small icons [+ لاحقة الستايل]
```
احفظي `nav-tray.png`. لو ما صمّمتيها بضل عندي خلفية CSS بسيطة.

> ستارة الانتقال بين المشاهد بستخدم `curtains-full.webp` الموجودة — مش محتاج جديد.

---

# ① خلفيات المشاهد (الأهم) — معماري سينمائي · opaque · 16:9
**فلسفة الخلفية:** خشبة هادئة يجلس عليها المحتوى — **مش صورة بطلة**. التفصيل المعماري
خفيف وعلى **الأطراف فقط**، الوسط **غامق وهادئ وشبه فاضي**، تباين منخفض، ألوان مكتومة.
(كل الحركة والتفاصيل بالكومبوننت، مش بالخلفية.)

الصق **لاحقة المشاهد** بآخر كل واحد:
```
— used strictly as a CALM, RECEDING BACKDROP for overlaid content (not a hero image):
deep wine-burgundy near-darkness fills most of the frame, any Baroque / antique-silver
architectural hint is soft, blurred, low-contrast and pushed to the EDGES only, the entire
center stays calm, dark and almost empty, muted and understated, subtle grain, 16:9,
no people, no text
```

**S1 · افتتاحية** → `scene-1.png`
```
A faint, blurred suggestion of an ornate dark hall along the edges, one very soft dim light
low in a corner, the whole center deep calm shadow [+ لاحقة المشاهد]
```
**S2 · العروسان (الأسماء)** → `scene-2.png`
```
A soft symmetrical hint of a silver archway framing the top corners only, fading into deep
darkness, the entire center a calm empty dark space for names [+ لاحقة المشاهد]
```
**S3 · الآية** → `scene-3.png`
```
Faint blurred baroque columns barely visible down the far left and right edges, deep wine
gloom filling the middle, quiet and reverent [+ لاحقة المشاهد]
```
**S4 · العدّ للفرح** → `scene-4.png`
```
A soft strip of blurred antique-silver relief along the very top edge catching dim light,
everything below dissolving into calm deep shadow [+ لاحقة المشاهد]
```
**S5 · التفاصيل** → `scene-5.png`
```
A faint suggestion of a candlelit corridor receding far in the background, very soft and
out of focus, dark calm foreground, muted warm wine tone [+ لاحقة المشاهد]
```
**S6 · المكان** → `scene-6.png`
```
A soft dim arched window glow off to one side in the distance, delicate silver tracery
blurred, the rest of the frame deep calm night shadow [+ لاحقة المشاهد]
```
**S7 · الحضور** → `scene-7.png`
```
A faint warm glow low and distant as if beyond an archway, framing edges dark, center calm
and open, inviting but understated [+ لاحقة المشاهد]
```
**S8 · الختام** → `scene-8.png`
```
A very soft blurred hint of a domed ceiling ornament along the top edge fading to darkness,
a faint gentle central glow, calm and serene [+ لاحقة المشاهد]
```

> 📱 **نسخ موبايل (مهم):** ولّد نسخة عمودية 9:16 لكل مشهد باسم `scene-N-portrait.png`
> (نفس البرومبت + `vertical 9:16 composition`) — لأن الشاشات العمودية تقصّ الـ16:9.
> إذا ما بتقدر، منكتفي بالأفقية.

---

# ② الزخارف المستخدمة فعلاً (استبدال بنسخ **شفافة** — دمج أنظف)
> عندك نسخ منهن بخلفية رمادية؛ لو أعدت توليدهن **شفافة** بشيل أقنعة CSS ويصير أنظف.
> الصق: `— ornate Victorian, antique silver + ruby, symmetrical, transparent PNG, no text`

| العنصر | الملف · النسبة | البرومبت المختصر |
|--------|----------------|-------------------|
| الختم الشمعي | `wax-seal.png` · 1:1 | deep ruby wax seal, embossed silver "M & A" monogram, beaded ring, glossy drips, top-down |
| إطار المونوغرام | `monogram-frame.png` · 4:5 | ornate silver oval cartouche, small crown, roses + laurel, empty velvet center, "M & A" |
| زخرفة الزاوية | `corner-orn.png` · 1:1 | single ornate silver corner filigree, acanthus scrollwork, from a TOP-LEFT corner |
| الفاصل | `divider-orn.png` · 5:1 | horizontal silver flourish tapering to two ends, small ruby gem centered |
| باقة الورد | `roses.png` · 1:1 | bouquet of deep burgundy roses + silver-sage foliage, realistic petals |
| المخمل (أساس) | `bg-velvet.png` · opaque 3:2 | seamless dark wine velvet with subtle silver damask, soft folds, 4k |

---

# ③ إضافات نحتاجها فعلاً

**صورة العروسين (اختياري لكن قيّم)** → `couple-photo.jpg` + `photo-frame.png`
- إذا بدك صورتكم بالموقع، ابعتها وبضيف **قسم/مشهد** خاص فيها.
- الإطار حولها: `photo-frame.png` · شفاف · 4:5
```
An ornate Victorian silver portrait frame, baroque scrollwork with roses at the top,
empty transparent center for a photo, symmetrical [+ الزخارف الشفافة]
```

**صورة معاينة الرابط (تظهر عند إرسال الدعوة بواتساب)** → `app/opengraph-image.png` · opaque · 1200×630
```
An elegant dark Baroque palace scene with a soft volumetric shaft of light and an ornate
silver archway, deep wine-burgundy, generous empty center for names to be overlaid, 4k,
no text
```

**أيقونة التبويب (favicon)** → `app/icon.png` · opaque · 512×512
```
A minimal circular emblem: intertwined silver "M & A" monogram on a deep-burgundy circle
with a thin silver ring, legible at tiny size
```

---

# ④ ما لا نحتاج توليده (يتكفّل فيه الكود — vector أنظف)
لا تُضيّع وقت على صور لهالأشياء، كلها مبنية داخل الموقع:
- **الأيقونات** (تاريخ · وقت · مكان · موسيقى · لغة · واتساب) → SVG حادّ بأي حجم
- **الأزرار** (افتح الدعوة · أرسل · الخريطة) → CSS بتوهّج وحركة
- **البطاقات والإطارات** (التفاصيل · العدّاد · الحقول) → CSS مؤطّر
- **الفواصل الصغيرة · رابط الاسمين · سهم التمرير** → SVG/CSS
- **بتلات الورد المتساقطة** → Canvas حيّ بالكود
- **قلوب · حمام · دبل · تاج · مؤشّر** → غير ضرورية (زينة زائدة)

> الأولوية: **المشاهد الـ8 (①)** ثم نسخ الموبايل ثم صورة المعاينة/التبويب. الباقي جاهز.
