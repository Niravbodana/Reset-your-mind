import { NextResponse } from "next/server";
import { getEffectiveRazorpay, readSettings } from "@/lib/site-settings-server";
import { verifyPaymentSignature } from "@/lib/razorpay";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const orderId = String(body.razorpay_order_id || body.orderId || "");
  const paymentId = String(body.razorpay_payment_id || body.paymentId || "");
  const signature = String(body.razorpay_signature || body.signature || "");

  const settings = await readSettings();
  const rz = getEffectiveRazorpay(settings);

  if (!rz.keySecret) {
    return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  }

  const valid = verifyPaymentSignature(orderId, paymentId, signature, rz.keySecret);
  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, orderId, paymentId });
}
