# RIZN — Architecture, Legal & Roadmap Index

> Brand: **RIZN** (Rise + Zen) · Tagline: *Your name. Your nudge. Your rise.*

**Full start→end checklist:** see [`PHASES.md`](./PHASES.md) (Phases **A → Z**).

---

## 1. Name & logo legal check

### Humsafar — HIGH RISK ❌

| Existing use | Sector | Risk |
|--------------|--------|------|
| **Humsafar India / Fuel Humsafar** | Diesel delivery app | Same word + “app” confusion |
| Humsafar Matrimonial | Class 42 registered | Adjacent services |
| Raymond — Humsafar | Class 10 | Brand noise |
| Other TM filings | Various | Crowded mark |

### RIZN — working brand ✅
- File TM India **Class 9 + 42**
- Domains: `rizn.app` / `getrizn.in`
- Backups: NOMI · AAROH · PULSR · UDAYO

---

## 2. What’s built vs missing

| Layer | Status |
|-------|--------|
| Marketing site (laser UI) | 🟡 Partial |
| Auth / DB / real notifications | ⬜ Missing |
| Payments | ⬜ Missing |
| WhatsApp / Apps / B2B | ⬜ Missing |

Details + checkboxes: **PHASES.md**

---

## 3. Target architecture

```
                 ┌──────────────────┐
                 │  Web (Next.js)   │
                 │  + later RN apps │
                 └────────┬─────────┘
                          │ HTTPS
           ┌──────────────┼──────────────┐
           ▼              ▼              ▼
     ┌──────────┐   ┌──────────┐   ┌──────────┐
     │   Auth   │   │   API    │   │ Payments │
     │ Supabase │   │  Next    │   │ Razorpay │
     └────┬─────┘   └────┬─────┘   └────┬─────┘
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  ┌─────────────┐
                  │  Postgres   │
                  │  users,     │
                  │  goals,     │
                  │  messages,  │
                  │  subs       │
                  └──────┬──────┘
                         │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
     ┌──────────┐  ┌──────────┐  ┌──────────┐
     │  Jobs    │  │ Web Push │  │ WhatsApp │
     │ Inngest  │  │  / FCM   │  │   API    │
     └──────────┘  └──────────┘  └──────────┘
```

**Stack:** Next.js · Supabase · Inngest · Razorpay · PostHog · Sentry · Vercel

---

## 4. Product plans

| Plan | Price | Includes |
|------|-------|----------|
| Personal | ₹99/mo | 6 pulses/day, all areas, streak, mood, soft mode |
| Parivaar | ₹249/mo | Up to 4 members |
| Annual | ₹999/yr | Later |
| Work (B2B) | ₹99–149/seat | Later |

Trial: **7 days free**.

---

## 5. Phases A→Z (summary)

| | Phase | | Phase |
|---|-------|---|-------|
| **A** | Idea & positioning | **N** | Family plan |
| **B** | Brand & legal | **O** | Retention loops |
| **C** | Design system | **P** | Growth / referral |
| **D** | Marketing website | **Q** | WhatsApp delivery |
| **E** | Infra foundation | **R** | Email / SMS backup |
| **F** | Auth & accounts | **S** | Admin & CMS |
| **G** | Onboarding | **T** | Analytics & experiments |
| **H** | Database schema | **U** | Legal & trust pages |
| **I** | Message content engine | **V** | SEO & content |
| **J** | Scheduler / jobs | **W** | Mobile apps |
| **K** | Web push | **X** | AI personalization |
| **L** | Dashboard (real) | **Y** | B2B / corporate |
| **M** | Payments & plans | **Z** | Scale to $1M ARR |

👉 **Every task checkbox lives in [`PHASES.md`](./PHASES.md).**

---

## 6. Success metrics

| Metric | Early target |
|--------|----------------|
| Land → signup | > 12% |
| Trial → paid | > 18% |
| D7 pulse open | > 40% |
| Monthly churn | < 8% |
| Referral share | > 15% |

**$1M ARR:** ~₹8.3L MRR ≈ ~7,000 paying @ ~₹120 ARPU (or less with B2B).

---

## 7. You are here

**Done-ish:** C (design), D (site shell)  
**Next:** B (domain/TM) → E (deploy) → F (auth) → … through Z

Build order: **Feel → Pay → Scale.**
