import { NextResponse } from "next/server";
import { appendWaitlist, readSettings } from "@/lib/site-settings-server";
import type { WaitlistEntry } from "@/lib/site-settings-types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const plan = String(body.plan || "personal");
  const areas = Array.isArray(body.areas) ? body.areas.map(String) : [];
  const language = String(body.language || "hinglish");

  if (!name || name.length < 2 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Valid name and email required" }, { status: 400 });
  }

  const settings = await readSettings();
  const entry: WaitlistEntry = {
    id: `wl_${Date.now().toString(36)}`,
    name,
    email,
    plan,
    areas,
    language,
    createdAt: new Date().toISOString(),
  };

  const { list, isNew } = await appendWaitlist(entry);

  if (isNew && settings.features.emailWaitlistEnabled && settings.integrations.resendApiKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${settings.integrations.resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: settings.integrations.resendFromEmail,
          to: email,
          subject: "RIZN — You're on the early access list",
          html: `<p>Hi ${name},</p><p>Thanks for joining RIZN early access. We'll notify you when the app and subscriptions go live.</p><p>— Team RIZN</p>`,
        }),
      });
    } catch {
      /* email optional */
    }
  }

  return NextResponse.json({ ok: true, isNew, waitlistCount: list.length, entry });
}
