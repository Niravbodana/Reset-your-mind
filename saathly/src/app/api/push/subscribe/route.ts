import { NextResponse } from "next/server";
import { upsertPushSubscription, readSettings } from "@/lib/site-settings-server";
import type { StoredPushSubscription } from "@/lib/push-server";

export async function POST(req: Request) {
  const settings = await readSettings();
  if (!settings.features.webPushEnabled) {
    return NextResponse.json({ error: "Web push disabled in admin" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const subscription = body?.subscription ?? body;
  if (!subscription?.endpoint) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  const entry: StoredPushSubscription = {
    endpoint: subscription.endpoint,
    keys: subscription.keys,
    expirationTime: subscription.expirationTime ?? null,
    email: typeof body?.email === "string" ? body.email.toLowerCase() : undefined,
    userId: typeof body?.userId === "string" ? body.userId : undefined,
    at: new Date().toISOString(),
  };

  await upsertPushSubscription(entry);
  return NextResponse.json({ ok: true });
}
