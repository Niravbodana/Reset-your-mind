import { NextResponse } from "next/server";
import { getEffectiveRazorpay, readSettings } from "@/lib/site-settings-server";
import { razorpayFetch } from "@/lib/razorpay";
import { upsertSubscription } from "@/lib/subscriptions-store";
import { trialEndDate } from "@/lib/plans";

async function ensurePlanId(
  rz: { keyId: string; keySecret: string; planPersonal: string; planParivaar: string },
  planId: string,
  amountRupees: number
): Promise<string> {
  const existing = planId === "parivaar" ? rz.planParivaar : rz.planPersonal;
  if (existing) return existing;

  // Auto-create monthly plan if admin hasn't set plan_id yet
  const res = await razorpayFetch("/plans", rz.keyId, rz.keySecret, {
    method: "POST",
    body: JSON.stringify({
      period: "monthly",
      interval: 1,
      item: {
        name: planId === "parivaar" ? "RIZN Parivaar" : "RIZN Personal",
        amount: amountRupees * 100,
        currency: "INR",
        description: `${planId === "parivaar" ? "Parivaar" : "Personal"} — monthly autopay after free trial`,
      },
      notes: { riznPlan: planId },
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Plan create failed: ${detail}`);
  }
  const plan = await res.json();
  return plan.id as string;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const settings = await readSettings();
  const rz = getEffectiveRazorpay(settings);
  const planId = String(body.planId || "personal");
  const email = String(body.email || "").trim().toLowerCase();
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").replace(/\D/g, "");
  const trialDays = settings.marketing.trialDays || 7;

  const amount =
    planId === "parivaar"
      ? settings.features.earlyBirdActive
        ? settings.marketing.earlyBirdPriceParivaar
        : settings.marketing.launchPriceParivaar
      : settings.features.earlyBirdActive
        ? settings.marketing.earlyBirdPricePersonal
        : settings.marketing.launchPricePersonal;

  const trialEndsAt = trialEndDate(trialDays);
  const startAt = Math.floor(new Date(trialEndsAt).getTime() / 1000);

  // Demo mode — local trial preview (no Razorpay keys / payments off)
  if (!settings.features.paymentsEnabled || !rz.keyId || !rz.keySecret) {
    return NextResponse.json({
      demo: true,
      message:
        "Payments demo mode: 7-day free trial locally start. Jab Razorpay live hoga, UPI/card se mandate set hoga — 7 din baad ₹99 auto-cut.",
      planId,
      amount,
      trialDays,
      trialEndsAt,
      autopay: true,
    });
  }

  try {
    const razorpayPlanId = await ensurePlanId(rz, planId, amount);

    // Auth window: complete mandate in 2 days. First charge = start_at (after trial).
    const expireBy = Math.floor(Date.now() / 1000) + 2 * 24 * 60 * 60;
    const payload: Record<string, unknown> = {
      plan_id: razorpayPlanId,
      total_count: 60,
      quantity: 1,
      customer_notify: 1,
      start_at: startAt,
      expire_by: expireBy,
      notes: {
        planId,
        email,
        name,
        trialDays: String(trialDays),
        amount: String(amount),
      },
    };
    if (email || phone) {
      payload.notify_info = {
        ...(email ? { notify_email: email } : {}),
        ...(phone ? { notify_phone: phone } : {}),
      };
    }

    // total_count: ~5 years of monthly cycles (cancel anytime)
    const res = await razorpayFetch("/subscriptions", rz.keyId, rz.keySecret, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        { error: "Razorpay subscription create failed", detail },
        { status: 502 }
      );
    }

    const sub = await res.json();

    await upsertSubscription({
      id: `sub_local_${Date.now().toString(36)}`,
      email,
      name,
      planId,
      razorpaySubscriptionId: sub.id,
      razorpayPlanId,
      amount,
      trialDays,
      trialEndsAt,
      status: "created",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      demo: false,
      keyId: rz.keyId,
      subscriptionId: sub.id,
      razorpayPlanId,
      amount,
      currency: "INR",
      planId,
      trialDays,
      trialEndsAt,
      startAt,
      name,
      email,
      autopay: true,
      description: `${trialDays}-day free trial, then ₹${amount}/month autopay`,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
