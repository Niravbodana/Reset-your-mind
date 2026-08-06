import { NextResponse } from "next/server";
import { getEffectiveRazorpay, readSettings } from "@/lib/site-settings-server";
import { verifyPaymentSignature, verifySubscriptionSignature } from "@/lib/razorpay";
import { patchSubscriptionByRazorpayId } from "@/lib/subscriptions-store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const paymentId = String(body.razorpay_payment_id || body.paymentId || "");
  const signature = String(body.razorpay_signature || body.signature || "");
  const subscriptionId = String(body.razorpay_subscription_id || body.subscriptionId || "");
  const orderId = String(body.razorpay_order_id || body.orderId || "");

  const settings = await readSettings();
  const rz = getEffectiveRazorpay(settings);

  if (!rz.keySecret) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  // Subscription mandate auth (trial → autopay)
  if (subscriptionId) {
    const valid = verifySubscriptionSignature(paymentId, subscriptionId, signature, rz.keySecret);
    if (!valid) {
      return NextResponse.json({ error: "Invalid subscription signature" }, { status: 400 });
    }
    await patchSubscriptionByRazorpayId(subscriptionId, {
      status: "authenticated",
      lastPaymentId: paymentId,
    });
    return NextResponse.json({
      ok: true,
      type: "subscription",
      subscriptionId,
      paymentId,
      trialDays: settings.marketing.trialDays,
    });
  }

  // Legacy one-time order (fallback)
  if (orderId) {
    const valid = verifyPaymentSignature(orderId, paymentId, signature, rz.keySecret);
    if (!valid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, type: "order", orderId, paymentId });
  }

  return NextResponse.json({ error: "Missing subscription or order id" }, { status: 400 });
}
