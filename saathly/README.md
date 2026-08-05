# RIZN — Website preview

Next.js app for RIZN early access: marketing site, web dashboard preview, waitlist, admin panel.

## Quick start

**If you are already inside the `saathly` folder** (your terminal shows `saathly %`):

```bash
git fetch origin && git reset --hard origin/cursor/saathly-website-9e8a
rm -rf node_modules .next && npm install && npm run dev
```

**If you are at the repo root** (`Reset-your-mind`):

```bash
git fetch origin && git reset --hard origin/cursor/saathly-website-9e8a
cd saathly && rm -rf node_modules .next && npm install && npm run dev
```

Open http://localhost:3000 — confirm `rizn@0.1.0` in npm output.

## Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Important for production:

- `RIZN_ADMIN_PASSWORD` — admin panel at `/admin` (not linked in footer)
- `RAZORPAY_*` — when billing goes live
- `NEXT_PUBLIC_SITE_URL` — sitemap, robots, OG URLs

See `ADMIN.md` for integrations (Razorpay, WhatsApp, Resend, VAPID).

## Docker (repo root)

```bash
RIZN_ADMIN_PASSWORD=your-secret docker compose up --build
```

Data persists in Docker volume `rizn-data`.

## Docs

- `UPDATE.md` — fix stale Humsafar / git pull issues
- `ADMIN.md` — keys and settings
