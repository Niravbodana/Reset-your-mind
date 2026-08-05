"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/lib/haptic";

const JOIN_TEXT =
  "Hi RIZN! Main ₹99 plan join karna chahta/chahti hoon. Daily messages + EMI reminder chahiye.";

export function WhatsAppCTA({
  variant = "button",
  className = "",
}: {
  variant?: "button" | "bar" | "inline";
  className?: string;
}) {
  const config = useSiteConfig();
  const digits = (config.marketing.whatsappJoinNumber || "").replace(/\D/g, "");
  const href = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(JOIN_TEXT)}`
    : `/signup?from=whatsapp`;

  const external = Boolean(digits);

  const base =
    variant === "bar"
      ? "flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-black min-h-[48px] hover:brightness-110 transition"
      : variant === "inline"
        ? "inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline"
        : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-black min-h-[48px] w-full sm:w-auto hover:brightness-110 transition shadow-lg shadow-[#25D366]/20";

  const label = digits ? "WhatsApp pe join karo" : "WhatsApp style — signup shuru karo";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => haptic("medium")}
        className={`${base} ${className}`}
      >
        <MessageCircle size={18} className="shrink-0" />
        {label}
      </a>
    );
  }

  return (
    <Link href={href} onClick={() => haptic("medium")} className={`${base} ${className}`}>
      <MessageCircle size={18} className="shrink-0" />
      {label}
    </Link>
  );
}
