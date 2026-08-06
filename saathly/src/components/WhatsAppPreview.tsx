"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { DEMO_NAME } from "@/lib/constants";

const chat = [
  { from: "rizn", text: `${DEMO_NAME}, subah ka signal: aaj ek clear intention likho — din direction ke saath shuru.` },
  { from: "rizn", text: `${DEMO_NAME}, paani piya? 10 min walk — body on, mind sharp.` },
  { from: "user", text: "Done ✓" },
  { from: "rizn", text: `${DEMO_NAME}, proud. Chhote steps, bada change.` },
];

export function WhatsAppPreview() {
  return (
    <section className="py-16 md:py-24 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3">WhatsApp (Parivaar — planned)</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Aise messages WhatsApp pe bhi — jab launch ho
            </h2>
            <p className="text-ink-soft leading-relaxed mb-4">
              Abhi web dashboard pe padho. Parivaar plan ke liye optional WhatsApp delivery plan
              kiya hai — same personalized content, tumhara channel choose karoge.
            </p>
            <p className="text-xs text-muted">
              Join Parivaar waitlist to get notified when WhatsApp delivery opens.
            </p>
            <Link href="/signup?plan=parivaar" className="btn-secondary inline-flex mt-4 px-5 py-2.5 rounded-xl text-xs">
              Parivaar waitlist
            </Link>
          </div>

          <div className="max-w-sm mx-auto w-full">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0b141a]">
              <div className="bg-[#1f2c34] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">RIZN</p>
                  <p className="text-[10px] text-[#8696a0]">preview mockup</p>
                </div>
                <MessageCircle className="ml-auto text-[#8696a0]" size={18} />
              </div>
              <div className="p-3 space-y-2 min-h-[280px] bg-[#0b141a] bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h60v60H0z%22 fill=%22%230b141a%22/%3E%3Cpath d=%22M0 30h60M30 0v60%22 stroke=%22%23182229%22 stroke-width=%221%22/%3E%3C/svg%3E')]">
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
                        m.from === "user"
                          ? "bg-[#005c4b] text-white"
                          : "bg-[#1f2c34] text-[#e9edef]"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
