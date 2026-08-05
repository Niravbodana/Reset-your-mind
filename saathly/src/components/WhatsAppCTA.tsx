"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";
import { haptic } from "@/lib/haptic";

export function WhatsAppCTA({
  variant = "button",
  className = "",
}: {
  variant?: "button" | "bar" | "inline";
  className?: string;
}) {
  const config = useSiteConfig();
  const { region, currency, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const priceLabel = regionPersonalPriceLabel(config, region);
  const joinText = isIN
    ? `Hi RIZN! Main ${priceLabel} plan join karna chahta/chahti hoon. Daily messages + EMI reminder chahiye.`
    : `Hi RIZN! I'd like to join the ${priceLabel} plan. Daily messages + bill reminders please.`;

  const digits = (config.marketing.whatsappJoinNumber || "").replace(/\D/g, "");
  const href = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(joinText)}`
    : `/signup?from=whatsapp`;

  const external = Boolean(digits);

  const base =
    variant === "bar"
      ? "flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-black min-h-[48px] hover:brightness-110 transition"
      : variant === "inline"
        ? "inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:underline"
        : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-bold text-black min-h-[48px] w-full sm:w-auto hover:brightness-110 transition shadow-lg shadow-[#25D366]/20";

  const label = isIN
    ? digits
      ? "WhatsApp pe join karo"
      : "WhatsApp style — signup shuru karo"
    : digits
      ? "Join on WhatsApp"
      : "Continue with signup";

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
