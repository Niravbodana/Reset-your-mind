"use client";

import { ShieldCheck } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { crisisResources } from "@/lib/locale";

export function NoSpamPromise({ className = "" }: { className?: string }) {
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const crisis = crisisResources(region);

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 ${className}`}
    >
      <ShieldCheck size={18} className="text-gold-light shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-white">
          {isIN ? "No spam promise" : "No spam — promise"}
        </p>
        <p className="text-xs text-white/55 mt-1 leading-relaxed">
          {isIN
            ? "Messages tumhare schedule pe — max aapke interval ke hisaab se. Kabhi bhi pause, soft mode, ya settings se control. Hum spam nahi bhejte."
            : "Messages follow your schedule only. Pause, soft mode, or settings anytime. We never spam."}
        </p>
        <p className="text-[11px] text-white/40 mt-2 leading-relaxed">
          {isIN ? "Crisis help: " : "Crisis resources: "}
          {crisis.map((c, i) => (
            <span key={c.href}>
              {i > 0 ? " · " : ""}
              <a href={c.href} className="text-gold-light/80 underline underline-offset-2" target="_blank" rel="noreferrer">
                {c.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
