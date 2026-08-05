import { NextResponse } from "next/server";
import { appendPushSubscription, readSettings } from "@/lib/site-settings-server";

export async function POST(req: Request) {
  const settings = await readSettings();
  if (!settings.features.webPushEnabled) {
    return NextResponse.json({ error: "Web push disabled in admin" }, { status: 403 });
  }

  const subscription = await req.json().catch(() => null);
  if (!subscription?.endpoint) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }

  await appendPushSubscription({ ...subscription, at: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
