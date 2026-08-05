import { NextResponse } from "next/server";
import { pickTemplatesForSlots, renderMessage } from "@/lib/templates";
import type { Language, LifeArea } from "@/lib/types";

/** Generate sample pulses — respects no-repeat when history is sent. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = body.name || "Friend";
  const areas = (body.areas || ["career", "health"]) as LifeArea[];
  const language = (body.language || "hinglish") as Language;
  const softMode = Boolean(body.softMode);
  const history = Array.isArray(body.sentHistory) ? body.sentHistory : [];
  const hours = [8, 11, 14, 17, 20, 21];

  const { templates } = pickTemplatesForSlots(areas, hours, history, softMode);
  const pulses = templates.map((t) => {
    const r = renderMessage(t, name, language);
    return { text: r.text, microAction: r.microAction, area: r.area, templateId: r.templateId };
  });

  return NextResponse.json({ pulses });
}
