"use client";

import { useState } from "react";
import { HeartHandshake, MessageCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

/** One accountability buddy — gentle WhatsApp nudge */
export function BuddyCheckin() {
  const { state, patchUser, trackEvent } = useApp();
  const { region } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN";
  const [name, setName] = useState(user.buddy?.name ?? "");
  const [phone, setPhone] = useState(user.buddy?.phone ?? "");
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (!name.trim()) return;
    haptic("success");
    const digits = phone.replace(/\D/g, "");
    patchUser({
      buddy: {
        name: name.trim(),
        phone: digits || undefined,
        lastNudgeAt: user.buddy?.lastNudgeAt,
      },
    });
    trackEvent("buddy_saved");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const nudge = () => {
    if (!user.buddy?.name) return;
    haptic("medium");
    const text = isIN
      ? `Hey ${user.buddy.name}! Main RIZN pe apni daily habit chala raha/rahi hoon (${user.streak} din streak). Tum bhi ek chhota step le lo aaj — hum saath hain 💛`
      : `Hey ${user.buddy.name}! I'm on a RIZN daily habit (${user.streak}-day streak). Take one small step today too — we've got this.`;
    const digits = (user.buddy.phone || "").replace(/\D/g, "");
    const url = digits
      ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;
    patchUser({
      buddy: { ...user.buddy, lastNudgeAt: new Date().toISOString() },
    });
    trackEvent("buddy_nudge");
    window.open(url, "_blank");
  };

  return (
    <div className="soft-card rounded-2xl p-5 mb-6 border border-white/10">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <HeartHandshake size={18} />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">
            {isIN ? "Buddy check-in" : "Buddy check-in"}
          </p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            {isIN
              ? "Ek dost — gentle nudge. Pressure nahi, saath."
              : "One friend — a gentle nudge. No pressure, just support."}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs text-muted">
          {isIN ? "Buddy ka naam" : "Buddy's name"}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isIN ? "e.g. Rahul" : "e.g. Alex"}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white min-h-[48px] focus:outline-none focus:border-gold/50"
          />
        </label>
        <label className="block text-xs text-muted">
          {isIN ? "WhatsApp (optional, country code)" : "WhatsApp (optional, with country code)"}
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={isIN ? "9198XXXXXXXX" : "14155552671"}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white min-h-[48px] focus:outline-none focus:border-gold/50"
          />
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={save}
            className="btn-secondary flex-1 rounded-xl py-3 text-sm font-semibold min-h-[44px]"
          >
            {saved ? (isIN ? "Saved ✓" : "Saved ✓") : isIN ? "Buddy save karo" : "Save buddy"}
          </button>
          {user.buddy?.name && (
            <button
              type="button"
              onClick={nudge}
              className="flex-1 rounded-xl py-3 text-sm font-semibold min-h-[44px] bg-[#25D366] text-black inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              {isIN ? "Nudge bhejo" : "Send nudge"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
