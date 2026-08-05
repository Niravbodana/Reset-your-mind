import { NextResponse } from "next/server";

/** Phase M — Razorpay webhooks */
export async function POST(req: Request) {
  const raw = await req.text();
  // Verify signature with RAZORPAY_WEBHOOK_SECRET in production
  console.log("billing webhook", raw.slice(0, 200));
  return NextResponse.json({ ok: true });
}
