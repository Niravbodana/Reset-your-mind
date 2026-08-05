# Admin panel — keys & settings

Open: **http://localhost:3000/admin**

Default password: `rizn-admin-2026` (change in Features tab after login)

## Tabs

### Integrations
| Field | Where to get it |
|-------|-----------------|
| Razorpay Key ID / Secret | https://dashboard.razorpay.com/app/keys |
| Razorpay Plan IDs | Razorpay → Subscriptions → Plans |
| WhatsApp Token | Meta Developer → WhatsApp → API Setup |
| Phone Number ID | Same WhatsApp API setup page |
| Resend API Key | https://resend.com/api-keys |
| VAPID keys | `npx web-push generate-vapid-keys` |
| Supabase | Project settings (optional) |

### Marketing
- Hero video URL (direct `.mp4` link)
- Early bird / launch prices
- Trial days
- Play Store / App Store / Instagram links

### Features (toggles)
- Enable Razorpay payments
- Enable WhatsApp API
- Web push prompts
- Resend email on waitlist signup
- Early bird pricing display

### Waitlist
All signups from `/signup` saved to `data/waitlist.json` on server.

## Webhook URLs
- Razorpay: `{siteUrl}/api/billing/webhook`
- WhatsApp send test: POST `/api/whatsapp/send`

## After saving
Refresh homepage — prices and features update automatically via `/api/settings/public`.
