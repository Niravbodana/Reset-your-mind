# RIZN — Start → End Phases (A to Z)

Complete build roadmap from idea → million-dollar scale.  
Work **in order**. Do not skip core product (D–E) for shiny features.

**Rule:** Feel → Pay → Scale.

| Status key | Meaning |
|------------|---------|
| ✅ Done | Already in this repo |
| 🟡 Partial | Started / demo only |
| ⬜ Todo | Not started |

---

## Phase overview

| Phase | Name | Goal |
|-------|------|------|
| **A** | Idea & positioning | Clear promise for 1 lakh busy Indians |
| **B** | Brand & legal | Safe name, logo, trademark, domain |
| **C** | Design system | Black laser UI, components, motion |
| **D** | Marketing website | Convert visitors → trial signup |
| **E** | Infra foundation | Hosting, Docker, env, CI |
| **F** | Auth & accounts | Login, profiles, sessions |
| **G** | Onboarding | Name, problems, schedule, language |
| **H** | Database schema | Users, goals, streaks, messages |
| **I** | Message content engine | Templates, personalization |
| **J** | Scheduler / jobs | Send at right time every day |
| **K** | Web push notifications | Browser pulses live |
| **L** | Dashboard (real) | Streak, mood, history, actions |
| **M** | Payments & plans | Razorpay, trial, renew, cancel |
| **N** | Family plan | Multi-seat Parivaar |
| **O** | Retention loops | Weekly report, soft mode, programs |
| **P** | Growth / referral | Invite, share cards, viral loops |
| **Q** | WhatsApp delivery | High open-rate India channel |
| **R** | Email / SMS backup | Deliverability fallback |
| **S** | Admin & CMS | Content + support tools |
| **T** | Analytics & experiments | Funnels, A/B, cohorts |
| **U** | Legal & trust pages | Privacy, terms, refund, safety |
| **V** | SEO & content | Blog, landing variants, OG |
| **W** | Mobile apps (Android/iOS) | React Native + store listing |
| **X** | AI personalization | Smarter messages from mood/journal |
| **Y** | B2B / corporate | Company wellness revenue |
| **Z** | Scale to $1M ARR | Ops, support, unit economics |

---

## Phase A — Idea & positioning 🟡

**Goal:** One sentence anyone understands.

- [x] Core promise: naam ke saath personalized motivation every ~2 hours
- [x] Life areas: finance, health, love, career, mind, family
- [x] Price hypothesis: ₹99 Personal / ₹249 Parivaar
- [ ] Final one-liner freeze (EN + Hinglish)
- [ ] Competitor map one-pager (Wysa, quotes apps, Calm)
- [ ] ICP: 18–40 India, busy, phone-first, Hinglish

**Done when:** You can explain RIZN in 10 seconds without “motivation app” confusion.

---

## Phase B — Brand & legal 🟡

**Goal:** Name/logo that won’t get sued or confused.

- [x] Drop **Humsafar** (Fuel Humsafar + TMs — high risk)
- [x] Working brand **RIZN** + geometric logo
- [ ] Confirm RIZN or pick backup (NOMI / AAROH / PULSR)
- [ ] Buy domain (`rizn.app` / `getrizn.in` / `.com`)
- [ ] Trademark India **Class 9 + 42**
- [ ] Brand kit: logo SVG, colors, fonts, do/don’t
- [ ] Social handles lock (Instagram, X, YouTube)

**Done when:** Domain live + TM filed + handles secured.

---

## Phase C — Design system ✅ / 🟡

**Goal:** Million-feel UI language.

- [x] Black theme
- [x] Laser background animations
- [x] Fonts (Syne + Space Grotesk)
- [x] Buttons, cards, section labels
- [ ] Component library doc (Button, Card, Input, Toast)
- [ ] Motion guidelines (entrance, hover, page)
- [ ] Mobile-first spacing audit
- [ ] Accessibility pass (contrast, focus rings)

**Done when:** Any new page looks “obviously RIZN” without redesign.

---

## Phase D — Marketing website 🟡

**Goal:** Stranger → “7 din free” click.

- [x] Hero + live name demo
- [x] Problems, day timeline, pricing, CTA
- [x] Signup / pricing / dashboard demo pages
- [ ] FAQ section
- [ ] Before/after / trust strip polish
- [ ] OG image + favicon set for RIZN
- [ ] `/sitemap.xml` + `robots.txt`
- [ ] Performance: Lighthouse mobile > 90

**Done when:** Cold traffic can understand + start trial in < 60s.

---

## Phase E — Infra foundation 🟡

**Goal:** Ship safely every day.

- [x] Next.js app + Docker + compose
- [ ] Vercel production deploy
- [ ] Staging environment
- [ ] GitHub Actions CI (lint + build)
- [ ] Env secrets management
- [ ] Error monitoring (Sentry)
- [ ] Uptime check (Better Stack / similar)
- [ ] Backups policy (DB daily)

**Done when:** `main` → auto deploy staging; prod one-click/promote.

---

## Phase F — Auth & accounts ⬜

**Goal:** Real users, not demo names.

- [ ] Supabase Auth (or Clerk)
- [ ] Email magic link / OTP
- [ ] Google Sign-In
- [ ] Session + protected routes
- [ ] Account settings (name, language, delete account)
- [ ] Password reset / logout everywhere

**Done when:** User can signup → refresh → still logged in.

---

## Phase G — Onboarding 🟡

**Goal:** Collect only what personalization needs.

- [x] Demo multi-step signup UI
- [ ] Persist: name, email, plan intent
- [ ] Select up to 3 life areas
- [ ] Wake/sleep + pulse frequency (6/day default)
- [ ] Language: Hinglish / Hindi / English
- [ ] Notification permission ask (web push)
- [ ] “Heavy day” preference default off

**Done when:** Onboarding writes DB row + schedules first pulse.

---

## Phase H — Database schema ⬜

**Goal:** Source of truth.

Tables (minimum):

- `users` — id, name, email, language, timezone
- `profiles` — areas[], wake, sleep, plan, trial_ends
- `family_members` — parent user, seat role
- `message_templates` — area, mood, time_bucket, locale, body
- `scheduled_messages` — user_id, send_at, status, payload
- `message_events` — delivered, opened, action_done
- `mood_checkins` — score, note, ts
- `streaks` — current, best, last_active_date
- `subscriptions` — provider_id, status, plan, renew_at
- `referrals` — code, inviter, invitee, reward_status

- [ ] Migrations in Supabase
- [ ] RLS policies
- [ ] Seed 200+ templates

**Done when:** Schema migrated + RLS tested + seed loaded.

---

## Phase I — Message content engine ⬜

**Goal:** Not generic quotes.

- [ ] Template variables: `{name}`, `{area}`, `{micro_action}`
- [ ] Buckets: morning / focus / health / dip / goals / night
- [ ] Tone packs: soft / power / money / healing
- [ ] Avoid spammy / medical claim language
- [ ] Manual QA checklist for 50 messages
- [ ] Content calendar for festivals / Monday blues / salary week

**Done when:** 6 areas × 5 moods × 6 slots have enough variety for 30 days.

---

## Phase J — Scheduler / jobs ⬜

**Goal:** Right message, right second.

- [ ] Job runner (Inngest / Trigger.dev / cron worker)
- [ ] Per-user timezone scheduling
- [ ] Idempotent sends (no double pulse)
- [ ] Retry + dead-letter queue
- [ ] Pause on cancel / soft mode / DND
- [ ] Admin “send test pulse to me”

**Done when:** Test account receives 6 pulses for 3 days reliably.

---

## Phase K — Web push notifications ⬜

**Goal:** Browser/app wake-up.

- [ ] Web Push keys (VAPID)
- [ ] Permission UX that doesn’t annoy
- [ ] Service worker
- [ ] Deep link → dashboard message
- [ ] Fallback in-app inbox if push denied

**Done when:** Push arrives on desktop + Android Chrome with name.

---

## Phase L — Dashboard (real product) 🟡

**Goal:** Home base after signup.

- [x] Demo dashboard UI
- [ ] Live today’s pulses list
- [ ] Mark read / complete micro-action
- [ ] Mood check-in write to DB
- [ ] Streak calculation truth
- [ ] Weekly chart
- [ ] Soft mode toggle
- [ ] Settings shortcuts

**Done when:** Demo data removed; everything from API/DB.

---

## Phase M — Payments & plans ⬜

**Goal:** Money in.

| Plan | Price | Seats |
|------|-------|-------|
| Personal | ₹99/mo | 1 |
| Parivaar | ₹249/mo | 4 |
| Annual Personal (later) | ₹999/yr | 1 |

- [ ] Razorpay subscriptions
- [ ] 7-day trial logic
- [ ] Webhook: paid / failed / cancelled
- [ ] Paywall after trial
- [ ] Customer portal: cancel / resume
- [ ] GST invoice basics
- [ ] Failed payment dunning (D+1, D+3)

**Done when:** Real ₹1 test sub → active entitlement → cancel works.

---

## Phase N — Family plan ⬜

**Goal:** Viral inside home.

- [ ] Invite family by link/OTP
- [ ] Seat limits (4)
- [ ] Per-member areas & schedule
- [ ] Family streak summary
- [ ] Owner billing only

**Done when:** 1 payer + 3 members each get own pulses.

---

## Phase O — Retention loops ⬜

**Goal:** People stay past month 1.

- [ ] Weekly rise report (WhatsApp/email)
- [ ] Heavy-day soft mode (fewer/softer)
- [ ] 7-day & 21-day programs (money reset, heart heal, anti-burnout)
- [ ] Win celebrations (streak 7/21/30)
- [ ] Win-back flow if inactive 3 days
- [ ] Churn survey on cancel

**Done when:** D30 retention tracked and > baseline target.

---

## Phase P — Growth / referral 🟡

**Goal:** Users bring users.

- [x] Referral UI stub
- [ ] Unique referral codes
- [ ] Reward: both get 1 month free (capped)
- [ ] WhatsApp/Instagram share cards (name + win)
- [ ] UTM tracking
- [ ] Influencer / creator kit

**Done when:** ≥15% new trials from referral in a cohort.

---

## Phase Q — WhatsApp delivery ⬜

**Goal:** India open-rate unlock.

- [ ] Meta Business verification
- [ ] Template message approvals
- [ ] Opt-in checkbox + STOP flow
- [ ] Named daily pulses on WhatsApp
- [ ] Cost controls (cap msgs/user)
- [ ] Sync delivery status to DB

**Done when:** Opted-in users get WA pulse with >50% read rate.

---

## Phase R — Email / SMS backup ⬜

**Goal:** Never silent.

- [ ] Transactional email (Resend / SES): welcome, receipt, weekly
- [ ] SMS OTP (msg91 / Twilio) if needed
- [ ] Preference center: push / WA / email

**Done when:** User can choose channels; critical mails always send.

---

## Phase S — Admin & CMS ⬜

**Goal:** Run without code deploys for content.

- [ ] Admin login (role: admin)
- [ ] Template CRUD
- [ ] User lookup + pause account
- [ ] Manual grant trial / refund flag
- [ ] Broadcast (rare, careful)
- [ ] Support notes on user

**Done when:** Non-engineer can publish new messages safely.

---

## Phase T — Analytics & experiments ⬜

**Goal:** Know what prints money.

- [ ] PostHog (or Mixpanel)
- [ ] Funnels: land → signup → trial → paid
- [ ] Cohorts: retention by area
- [ ] A/B: headline, price annual vs monthly
- [ ] Pulse open → action completion rate
- [ ] Alert if send failure > 2%

**Done when:** Weekly metrics review takes < 15 minutes from dashboard.

---

## Phase U — Legal & trust ⬜

**Goal:** Stay safe + trustworthy.

- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Refund / cancellation policy
- [ ] Mental health disclaimer (not therapy)
- [ ] Crisis helpline footer everywhere
- [ ] Cookie / consent if required
- [ ] Data delete request flow (account delete)

**Done when:** All linked in footer + signup; counsel-reviewed if possible.

---

## Phase V — SEO & content ⬜

**Goal:** Free acquisition.

- [ ] Landing SEO titles/descriptions per page
- [ ] Blog: stress, EMI anxiety, burnout (helpful, not spam)
- [ ] Program landing pages (heartbreak 21-day etc.)
- [ ] Schema markup
- [ ] Hindi/Hinglish content experiments

**Done when:** Organic signup channel appears in analytics.

---

## Phase W — Mobile apps ⬜

**Goal:** Android first, then iOS.

- [ ] React Native (Expo) shared API
- [ ] Auth + dashboard parity
- [ ] FCM (Android) + APNs (iOS)
- [ ] Store listing assets / screenshots
- [ ] Play Store launch
- [ ] App Store launch
- [ ] Force-update / version gate

**Done when:** Paying web user can login on Android and receive pulses.

---

## Phase X — AI personalization ⬜

**Goal:** Feels written for *them*.

- [ ] Mood + journal → tone adjust
- [ ] Avoid repeating same template too soon
- [ ] Safety filter (self-harm → helpline flow)
- [ ] Human review queue for edge outputs
- [ ] Cost cap per user on AI calls

**Done when:** Blind test: users prefer AI-personalized vs static templates.

---

## Phase Y — B2B / corporate ⬜

**Goal:** Stable revenue beyond B2C.

- [ ] RIZN Work pitch deck
- [ ] Company admin dashboard
- [ ] Seats billing (₹99–149/employee/mo)
- [ ] Anonymous wellness insights for HR
- [ ] Invoice + GST for companies
- [ ] 1 pilot company (50–200 seats)

**Done when:** First paid company contract live.

---

## Phase Z — Scale to $1M ARR ⬜

**Goal:** Business machine.

**Math:** ₹1 Cr / year ≈ ₹8.3L / month ≈ **~7,000 paying users** @ ~₹120 ARPU  
(or fewer seats if B2B ARPU higher).

- [ ] Support system (email/chat SLA)
- [ ] Content ops calendar
- [ ] CAC / LTV / churn dashboard
- [ ] Paid acquisition playbooks (Meta/Google) only after retention works
- [ ] Security basics (2FA admin, secrets, backups restore test)
- [ ] Hiring plan: content + support + eng
- [ ] Quarterly roadmap review

**Done when:** 3 months sustained ≥ ₹8L MRR **or** clear path with B2B mix.

---

## Dependency map (don’t break order)

```
A → B → C → D → E
              ↓
         F → G → H → I → J → K → L
                              ↓
                         M → N → O → P
                              ↓
                         Q → R → S → T → U → V
                              ↓
                         W → X → Y → Z
```

---

## Suggested build batches (practical)

| Batch | Phases | Outcome |
|-------|--------|---------|
| **Batch 1** | A–E | Live brand site people can open |
| **Batch 2** | F–L | Real product: account + pulses |
| **Batch 3** | M–P | Money + retention + growth |
| **Batch 4** | Q–V | India distribution + trust + SEO |
| **Batch 5** | W–Z | Apps + AI + B2B + scale |

---

## Current position

**You are here:** Phase **C/D** mostly done (UI + marketing shell).  
**Next recommended:** Phase **B** finish (domain/TM) + Phase **E** deploy + Phase **F** auth.

Track checkboxes in this file as you complete them.
