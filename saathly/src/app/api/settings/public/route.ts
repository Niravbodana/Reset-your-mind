import { NextResponse } from "next/server";
import { readSettings, readWaitlist } from "@/lib/site-settings-server";
import { toPublicConfig } from "@/lib/site-settings-types";
import { getEffectiveVapid } from "@/lib/push-server";

export async function GET() {
  const settings = await readSettings();
  const waitlist = await readWaitlist();
  const config = toPublicConfig(settings, waitlist.length);
  const vapid = getEffectiveVapid(settings);
  if (vapid.publicKey) {
    config.integrations.vapidPublicKey = vapid.publicKey;
  }
  return NextResponse.json(config);
}
