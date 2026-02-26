# Hotel Indra Lok — Next.js Frontend MVP

A dreamy, nostalgic, image-led hotel website for **Hotel Indra Lok, Pipalkoti**.

## Stack
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Supabase (optional persistence)

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

## Local development
```bash
npm install
npm run dev
```

## Supabase setup (for deploy)
Create a `bookings` table:

```sql
create table if not exists bookings (
  id text primary key,
  room_id text not null,
  guest_name text not null,
  check_in date not null,
  check_out date not null
);
```

Then set Vercel env vars:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> In this MVP, Supabase is optional. Without env vars, bookings are still stored in browser localStorage.

## Deploy to Vercel
1. Push this repo to GitHub.
2. Import project in Vercel.
3. Set environment variables.
4. Deploy.

