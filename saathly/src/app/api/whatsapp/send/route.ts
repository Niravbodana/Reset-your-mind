import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getEffectiveWhatsApp, readSettings } from "@/lib/site-settings-server";

export async function POST(req: Request) {
  const settings = await readSettings();
  const auth = requireAdmin(req, settings);
  if (!auth.ok) {
    return NextResponse.json({ error: auth.message }, { status: auth.status });
  }

  const body = await req.json().catch(() => ({}));
  const wa = getEffectiveWhatsApp(settings);
  const to = String(body.to || "");
  const text = String(body.text || "");

  if (!settings.features.whatsappEnabled || !wa.token || !wa.phoneNumberId) {
    return NextResponse.json({
      demo: true,
      message: "WhatsApp not configured. Add token + Phone Number ID in Admin → Integrations.",
      setupUrl: settings.integrations.whatsappBusinessUrl,
    });
  }

  if (!to || !text) {
    return NextResponse.json({ error: "to and text required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${wa.phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${wa.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/\D/g, ""),
        type: "text",
        text: { body: text },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: "WhatsApp API error", detail: data }, { status: 502 });
    }
    return NextResponse.json({ demo: false, sent: true, data });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
