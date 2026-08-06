import { NextResponse } from "next/server";
import { readPushSubscriptions, readSettings } from "@/lib/site-settings-server";
import { getEffectiveVapid, sendWebPush } from "@/lib/push-server";

export async function POST(req: Request) {
  const settings = await readSettings();
  if (!settings.features.webPushEnabled) {
    return NextResponse.json({ error: "Web push disabled" }, { status: 403 });
  }

  const vapid = getEffectiveVapid(settings);
  if (!vapid.publicKey || !vapid.privateKey) {
    return NextResponse.json({ error: "VAPID keys not configured" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const subs = await readPushSubscriptions();
  const matches = subs.filter((s) => s.email?.toLowerCase() === email);
  if (!matches.length) {
    return NextResponse.json({ error: "No push subscription for this device" }, { status: 404 });
  }

  const name = typeof body.name === "string" ? body.name : "there";
  const payload = {
    title: "RIZN — test alert",
    body: `${name}, your web notifications are on. Daily pulses will arrive on schedule.`,
    url: "/dashboard",
  };

  const results = await Promise.allSettled(
    matches.map((sub) => sendWebPush(sub, payload, settings))
  );
  const sent = results.filter((r) => r.status === "fulfilled").length;

  if (!sent) {
    return NextResponse.json({ error: "Failed to send test notification" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, sent });
}
