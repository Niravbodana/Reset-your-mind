import { NextResponse } from "next/server";
import { getEffectiveRazorpay, readSettings } from "@/lib/site-settings-server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import { patchSubscriptionByRazorpayId } from "@/lib/subscriptions-store";

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
    const eventName = String(event.event || "");
    const subEntity = event.payload?.subscription?.entity;
    const paymentEntity = event.payload?.payment?.entity;
    const subId = subEntity?.id || paymentEntity?.subscription_id;

    console.log("billing webhook", eventName, subId || paymentEntity?.id);

    if (subId) {
      if (
        eventName === "subscription.authenticated" ||
        eventName === "subscription.activated"
      ) {
        await patchSubscriptionByRazorpayId(subId, {
          status: eventName === "subscription.activated" ? "active" : "authenticated",
        });
      } else if (eventName === "subscription.charged") {
        await patchSubscriptionByRazorpayId(subId, {
          status: "active",
          lastPaymentId: paymentEntity?.id,
        });
      } else if (
        eventName === "subscription.halted" ||
        eventName === "subscription.pending"
      ) {
        await patchSubscriptionByRazorpayId(subId, { status: "halted" });
      } else if (eventName === "subscription.cancelled" || eventName === "subscription.completed") {
        await patchSubscriptionByRazorpayId(subId, {
          status: eventName === "subscription.cancelled" ? "cancelled" : "completed",
        });
      }
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
