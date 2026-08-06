import { NextResponse } from "next/server";
import { readSettings, writeSettings, verifyAdminPassword } from "@/lib/site-settings-server";
import type { SiteSettings } from "@/lib/site-settings-types";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(req: Request) {
  const password = req.headers.get("x-admin-password") || "";
  const settings = await readSettings();
  if (!verifyAdminPassword(settings, password)) return unauthorized();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const password = req.headers.get("x-admin-password") || "";
  const current = await readSettings();
  if (!verifyAdminPassword(current, password)) return unauthorized();

  const body = (await req.json()) as Partial<SiteSettings>;
  const next: SiteSettings = {
    ...current,
    ...body,
    integrations: { ...current.integrations, ...body.integrations },
    marketing: { ...current.marketing, ...body.marketing },
    features: { ...current.features, ...body.features },
  };
  await writeSettings(next);
  return NextResponse.json({ ok: true, settings: next });
}
