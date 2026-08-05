import { NextResponse } from "next/server";
import { readWaitlist, readSettings, verifyAdminPassword } from "@/lib/site-settings-server";

export async function GET(req: Request) {
  const password = req.headers.get("x-admin-password") || "";
  const settings = await readSettings();
  if (!verifyAdminPassword(settings, password)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const list = await readWaitlist();
  return NextResponse.json({ count: list.length, entries: list });
}
