# إعداد باك-إند تأكيد الحضور (Supabase)

خطوات مرّة واحدة فقط:

## 1) أنشئي مشروع Supabase مجاني
- ادخلي https://supabase.com → New project.

## 2) أنشئي جدول المعازيم
افتحي **SQL Editor** في Supabase والصقي هذا ثم Run:

```sql
create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  attending boolean not null default true,
  guests int not null default 1,
  message text default ''
);

-- الوصول فقط عبر الخادم (service role) — نُقفل باقي الوصول
alter table rsvps enable row level security;
```

## 3) انسخي المفاتيح
من **Settings → API**:
- `Project URL`
- `service_role` (المفتاح السرّي — للخادم فقط)

## 4) أنشئي ملف `.env.local`
انسخي `.env.local.example` إلى `.env.local` واملئي:

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...            # service_role
ADMIN_PASSWORD=اختاري-كلمة-مرور
```

ثم أعيدي تشغيل الخادم (`npm run dev`).

## الاستخدام
- **المعازيم**: يملؤون نموذج "تأكيد الحضور" في الموقع → يُحفظ تلقائياً.
- **أنتِ**: افتحي `/admin` (مثلاً http://localhost:3000/admin)، أدخلي كلمة المرور → ترين كل الردود والإحصائيات.
- كما يمكنك رؤية الجدول مباشرة في Supabase → Table editor → `rsvps`.

> مفاتيح Supabase تبقى في الخادم فقط ولا تصل المتصفح أبداً.
