import { NextResponse } from "next/server";

/** Phase Q — WhatsApp send stub */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) {
    return NextResponse.json({
      demo: true,
      message: "WhatsApp token missing. Set WHATSAPP_TOKEN + PHONE_NUMBER_ID for Meta Cloud API.",
      to: body.to,
      text: body.text,
    });
  }
  return NextResponse.json({ demo: false, queued: true });
}
