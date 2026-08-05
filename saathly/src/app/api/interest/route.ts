import { NextResponse } from "next/server";
import { appendProgramInterest } from "@/lib/site-settings-server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const programId = String(body.programId || "").trim();

  if (!EMAIL_RE.test(email) || !programId) {
    return NextResponse.json({ error: "Valid email and programId required" }, { status: 400 });
  }

  await appendProgramInterest(email, programId);
  return NextResponse.json({ ok: true });
}
