import { NextResponse } from "next/server";

/** Phase M — Razorpay subscription create (demo fallback if keys missing) */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const key = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key || !secret) {
    return NextResponse.json({
      demo: true,
      message:
        "Razorpay keys missing — demo activate OK. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET in .env.local for live pay.",
      planId: body.planId,
    });
  }

  // Live path placeholder — wire Razorpay Subscriptions API here
  return NextResponse.json({
    demo: false,
    message: "Keys present — implement Razorpay subscription create next.",
    planId: body.planId,
  });
}
