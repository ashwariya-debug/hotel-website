# Hotel Indra Lok — Next.js Frontend MVP

A dreamy, nostalgic, image-led hotel website for **Hotel Indra Lok, Pipalkoti**.

## Stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Supabase (optional persistence)
- Vercel (deployment)

## Features
- Poetic, visual homepage with hero, rooms, seasonal gallery, and testimonials.
- Prominent booking CTA and booking panel.
- Booking flow with:
  - check-in / check-out date selection,
  - occupied/blocked dates visibility,
  - conflict detection,
  - instant confirmation message.
- Chatbot widget for FAQs and booking assistance.
- Uses mock data and localStorage by default.
- Auto-syncs booking inserts to Supabase if environment variables are provided.

---

## Local development
```bash
npm install
npm run dev
```

Create `.env.local` (optional for local Supabase testing):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

---

## Supabase setup

### 1) Create project
1. Go to Supabase dashboard.
2. Create a new project.
3. Save your **Project URL** and **anon key** from `Project Settings → API`.

### 2) Create `bookings` table
Run this SQL in `SQL Editor`:

```sql
create table if not exists public.bookings (
  id text primary key,
  room_id text not null,
  guest_name text not null,
  check_in date not null,
  check_out date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

Or use the included schema file:

```bash
supabase/schema.sql
```

### 3) Enable Row Level Security + policy
Because the app writes using the **anon key** from the browser, add a policy for inserts.

```sql
alter table public.bookings enable row level security;

create policy "Allow public insert bookings"
on public.bookings
for insert
to anon
with check (true);
```

Optional read policy (if you later query bookings client-side):

```sql
create policy "Allow public read bookings"
on public.bookings
for select
to anon
using (true);
```

> For production, tighten policies (for example, only allow inserts via server actions/API route + validation).

---

## Connect Supabase to Vercel

### 1) Import repo in Vercel
1. Push repo to GitHub.
2. In Vercel, click **Add New → Project**.
3. Import this repository.

### 2) Add environment variables
In Vercel project settings, open **Settings → Environment Variables** and add:

- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon public key

Set them for:
- Production
- Preview
- Development (optional, useful for Vercel dev workflows)

### 3) Redeploy
After env vars are added, trigger a redeploy:
- **Deployments → Redeploy** (or push a new commit).

### 4) Verify in production
1. Open deployed site.
2. Submit a booking in the booking panel.
3. Check Supabase table `public.bookings` for the inserted row.

If booking confirms in UI but row is not inserted:
- verify env vars are set exactly (no typos),
- verify RLS + insert policy exists,
- check Vercel function/browser console logs for Supabase errors.

---

## Deploy to Vercel (quick checklist)
- [ ] Repo imported to Vercel
- [ ] Supabase table created
- [ ] RLS enabled + insert policy created
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in Vercel
- [ ] Redeployed and booking insert verified

---

## Notes
- In this MVP, Supabase is optional. If env vars are missing, bookings are still stored in browser localStorage.
- If you want stronger production security, move booking inserts to a server-side API route and use service role credentials only on the server.


## Vercel error fix: `No Output Directory named "public" found`

If Vercel shows:

`Error: No Output Directory named "public" found after the Build completed`

it means your project dashboard is configured like a static site with **Output Directory = `public`**.
This repo is a **Next.js app**, so the output should be Next-managed (or `.next` if explicitly configured).

### Fix in Vercel dashboard
1. Go to **Project Settings → Build & Output Settings**.
2. Set **Framework Preset** to `Next.js`.
3. Clear Output Directory if it is `public` (or set it to `.next`).
4. Save and **Redeploy**.

### Repo-level safeguard
This repository includes `vercel.json` with:
- `framework: nextjs`
- `outputDirectory: .next`

So Vercel does not look for a static `public` output folder.

