import { NextResponse } from "next/server";
import { getEffectiveRazorpay, readSettings } from "@/lib/site-settings-server";
import { verifyWebhookSignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";
  const settings = await readSettings();
  const rz = getEffectiveRazorpay(settings);

  if (!rz.webhookSecret) {
    console.warn("billing webhook: RAZORPAY_WEBHOOK_SECRET not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 503 });
  }

  if (!verifyWebhookSignature(raw, signature, rz.webhookSecret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(raw);
    console.log("billing webhook verified", event.event, event.payload?.payment?.entity?.id);
    // Future: persist payment status server-side when user accounts exist
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
