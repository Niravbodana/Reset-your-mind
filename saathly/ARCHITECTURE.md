# RIZN — Architecture, Legal & Million-Dollar Roadmap

> Working brand for this build: **RIZN** (Rise + Zen)  
> Previous name **Humsafar** kept in git history only — see legal section.

---

## 1. Name & logo legal check

### Humsafar — HIGH RISK ❌ (do not use as primary brand)

| Existing use | Sector | Risk |
|--------------|--------|------|
| **Humsafar India / Fuel Humsafar** | Diesel delivery app (Play Store / App Store) | Consumer confusion — same word + “app” |
| Humsafar Matrimonial Services | Class 42, registered | Adjacent “life services” |
| Raymond Consumer Care — Humsafar | Class 10 (medical) | Different class, still brand noise |
| Multiple TM filings | Classes 37, etc. | Crowded mark |

**Verdict:** Common Hindi word + existing apps = trademark fight + Play Store rejection risk + ads confusion.

### Logo (old SVG person mark)
- No known clone of *our* exact mark, but generic “person under arc” is weak.
- New RIZN mark: geometric R + laser slash — distinctive, easier to defend.

### Recommended brand: **RIZN**
- Short, modern, memorable, domain-friendly (`rizn.app` / `getrizn.com`)
- Meaning: **Rise** every day, stay **Zen**
- Tagline: *Your name. Your nudge. Your rise.*
- Action: File trademark in India **Class 9 + 42** (software / app services) ASAP via IP India / attorney (~₹10–25k)

**Backup names (if RIZN taken):** NOMI · AAROH · PULSR · UDAYO · MANNLIFT

---

## 2. What’s missing today (honest audit)

| Layer | Status | Missing for $1M path |
|-------|--------|----------------------|
| Marketing site | ✅ Partial | SEO, blog, trust, legal pages |
| Auth | ❌ | Email/OTP, Google, session |
| Database | ❌ | Users, goals, streaks, messages |
| Notification engine | ❌ | Scheduler, templates, web push, WhatsApp |
| Payments | ❌ | Razorpay, trials, renewals, invoices |
| Admin | ❌ | Content CMS, user support |
| Analytics | ❌ | Mixpanel/PostHog, funnels, cohort retention |
| Mobile apps | ❌ | React Native / Flutter (Phase later) |
| Legal | ❌ | Privacy, Terms, refund, mental-health disclaimer |
| Growth | ❌ | Referral codes, WhatsApp share cards |
| Infra | 🟡 Docker only | CI/CD, staging, monitoring, backups |

---

## 3. Target architecture

```
                    ┌─────────────┐
                    │  Web (Next) │  ← you are here
                    │  + later RN │
                    └──────┬──────┘
                           │ HTTPS
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │  Auth    │ │  API     │ │ Payments │
        │ Supabase │ │ Next/    │ │ Razorpay │
        │ or Clerk │ │ Edge     │ └────┬─────�/    │ │ Razorpay │
        │ or Clerk │ │ Edge     │ └────┬─────┘
        └────┬─────┘ └────┬─────┘      │
             │            │            │
             └────────────┼────────────┘
                          ▼
                   ┌─────────────┐
                   │  Postgres   │
                   │  users,     │
                   │  goals,     │
                   │  streaks,   │
                   │  messages   │
                   └──────┬──────┘
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
        ┌──────────┐ ┌─────────┐ ┌──────────┐
        │ Cron /   │ │ Web     │ │ WhatsApp │
        │ Queue    │ │ Push    │ │ Cloud API│
        │ (Inngest)│ │ (FCM)   │ │ (Meta)   │
        └──────────┘ └─────────┘ └──────────┘
```

**Stack (recommended)**
- Frontend: Next.js 16 + React 19 + Tailwind (this repo)
- Auth + DB: Supabase
- Jobs: Inngest or Trigger.dev
- Pay: Razorpay
- Push: Web Push → later FCM/APNs
- Host: Vercel (web) + Supabase
- Analytics: PostHog
- Error: Sentry

---

## 4. Product plans (final)

| Plan | Price | Who | Includes |
|------|-------|-----|----------|
| **RIZN Personal** | ₹99/mo | Individual | 6 msgs/day, all life areas, streak, mood, soft mode |
| **RIZN Parivaar** | ₹249/mo | Up to 4 | All Personal + family dashboard |
| **RIZN Annual** (later) | ₹999/yr | Individual | ~2 months free |
| **RIZN Work** (B2B later) | ₹99–149/seat/mo | Companies | Admin, SSO later |

Trial: **7 days free**, card optional at start (India conversion friendly).

---

## 5. A → Z phases (build order)

### Phase A — Brand & legal (now)
- [x] Rename away from Humsafar risk → RIZN
- [x] New logo mark
- [ ] Domain buy (`rizn.app` / `getrizn.in`)
- [ ] Trademark Class 9 + 42
- [ ] Privacy + Terms + refund policy pages

### Phase B — Million-feel marketing site (now → next)
- [x] Black laser dynamic UI
- [ ] Interactive name demo polish
- [ ] SEO (meta, sitemap, OG images)
- [ ] Trust / FAQ / helpline honesty
- [ ] Deploy production (Vercel)

### Phase C — Auth & profiles
- [ ] Signup / login (OTP + Google)
- [ ] Onboarding: name, areas, schedule, language
- [ ] Dashboard real data (not demo)

### Phase D — Message engine (core product)
- [ ] Template library (6 personas × moods × times)
- [ ] Scheduler (user timezone, 9–9 / custom)
- [ ] Web push notifications
- [ ] Micro-actions + streak logic
- [ ] Heavy-day soft mode

### Phase E — Payments
- [ ] Razorpay subscriptions
- [ ] Trial → paid conversion
- [ ] Family seats
- [ ] Invoice / cancel flow

### Phase F — Retention & growth
- [ ] Weekly progress email/WhatsApp
- [ ] Referral (1 month free both)
- [ ] Shareable win cards
- [ ] 21-day programs

### Phase G — WhatsApp layer (India unlock)
- [ ] Meta WhatsApp Business API
- [ ] Named daily messages (high open rate)
- [ ] Opt-in compliance

### Phase H — Mobile apps
- [ ] React Native (same API)
- [ ] FCM + APNs
- [ ] App Store / Play listing

### Phase I — Scale & B2B
- [ ] Corporate wellness packs
- [ ] Admin analytics
- [ ] Multi-language (Hinglish default)
- [ ] AI personalization from journal/mood

### Phase J — Ops for $1M ARR
- [ ] Support (chat / email)
- [ ] Content team / CMS
- [ ] Unit economics dashboard (CAC, LTV, churn)
- [ ] SOC2-lite security basics

**Rough $1M ARR math (India):**  
₹1,00,00,000 / year ≈ ₹8.3L / month  
@ ₹120 blended ARPU ≈ **~7,000 paying users** sustained.

---

## 6. Success metrics (watch weekly)

| Metric | Good early target |
|--------|-------------------|
| Landing → signup | > 12% |
| Trial → paid | > 18% |
| D7 retention (opened msg) | > 40% |
| Monthly churn | < 8% |
| Referral share | > 15% of new signups |

---

## 7. Immediate next steps (after this UI)

1. You confirm brand **RIZN** (or pick backup)
2. Buy domain + file TM
3. Deploy site live
4. Phase C auth (Supabase)
5. Phase D first real scheduled messages

Build order rule: **Feel → Pay → Scale.**  
Notifications that change mood beat features that look pretty.
