import { ShieldCheck } from "lucide-react";

export function NoSpamPromise({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 ${className}`}
    >
      <ShieldCheck size={18} className="text-gold-light shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-white">No spam promise</p>
        <p className="text-xs text-white/55 mt-1 leading-relaxed">
          Messages tumhare schedule pe — max aapke interval ke hisaab se. Kabhi bhi pause, soft mode,
          ya settings se control. Hum spam nahi bhejte.
        </p>
      </div>
    </div>
  );
}
