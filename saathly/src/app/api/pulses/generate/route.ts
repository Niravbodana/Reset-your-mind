import { NextResponse } from "next/server";
import { pickTemplatesForDay, renderTemplate } from "@/lib/templates";
import type { Language, LifeArea } from "@/lib/types";

/** Phase I/J — generate pulses for a user payload */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = body.name || "Friend";
  const areas = (body.areas || ["career", "health"]) as LifeArea[];
  const language = (body.language || "hinglish") as Language;
  const softMode = Boolean(body.softMode);
  const tpls = pickTemplatesForDay(areas, softMode);
  const pulses = tpls.map((t) => renderTemplate(t, name, language));
  return NextResponse.json({ pulses });
}
