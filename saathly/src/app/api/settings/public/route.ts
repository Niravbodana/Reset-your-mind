import { NextResponse } from "next/server";
import { readSettings, readWaitlist } from "@/lib/site-settings-server";
import { toPublicConfig } from "@/lib/site-settings-types";

export async function GET() {
  const settings = await readSettings();
  const waitlist = await readWaitlist();
  return NextResponse.json(toPublicConfig(settings, waitlist.length));
}
