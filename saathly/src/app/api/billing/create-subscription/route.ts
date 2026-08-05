import { NextResponse } from "next/server";
import {
  getEffectiveRazorpay,
  readSettings,
} from "@/lib/site-settings-server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const settings = await readSettings();
  const rz = getEffectiveRazorpay(settings);
  const planId = String(body.planId || "personal");
  const email = String(body.email || "");
  const name = String(body.name || "");

  const amount =
    planId === "parivaar"
      ? settings.features.earlyBirdActive
        ? settings.marketing.earlyBirdPriceParivaar
        : settings.marketing.launchPriceParivaar
      : settings.features.earlyBirdActive
        ? settings.marketing.earlyBirdPricePersonal
        : settings.marketing.launchPricePersonal;

  if (!settings.features.paymentsEnabled || !rz.keyId || !rz.keySecret) {
    return NextResponse.json({
      demo: true,
      message: "Payments not configured. Add Razorpay keys in Admin → Integrations.",
      planId,
      amount,
      trialDays: settings.marketing.trialDays,
    });
  }

  const auth = Buffer.from(`${rz.keyId}:${rz.keySecret}`).toString("base64");
  const receipt = `rizn_${planId}_${Date.now()}`;

  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt,
        notes: { planId, email, name, trialDays: String(settings.marketing.trialDays) },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "Razorpay order failed", detail: err }, { status: 502 });
    }

    const order = await res.json();
    return NextResponse.json({
      demo: false,
      keyId: rz.keyId,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planId,
      trialDays: settings.marketing.trialDays,
      name,
      email,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
