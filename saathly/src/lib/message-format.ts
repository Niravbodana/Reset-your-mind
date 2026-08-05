import type { Language } from "./types";

/** Respectful Indian address — Hinglish/Hindi use "ji". */
export function formatCustomerName(name: string, language: Language): string {
  const first = name.trim().split(/\s+/)[0] || name;
  if (language === "english") return first;
  const cap = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  return `${cap} ji`;
}

export function greetForHour(hour: number, language: Language, name: string): string {
  const n = formatCustomerName(name, language);
  if (language === "english") {
    if (hour < 12) return `Good morning, ${n}`;
    if (hour < 17) return `Good afternoon, ${n}`;
    if (hour < 21) return `Good evening, ${n}`;
    return `Good night, ${n}`;
  }
  if (hour < 12) return `सुप्रभात ${n}`;
  if (hour < 17) return `नमस्ते ${n}`;
  if (hour < 21) return `शुभ संध्या ${n}`;
  return `शुभ रात्रि ${n}`;
}

export type MessageSlot = "morning" | "midday" | "afternoon" | "evening" | "night" | "any";

export type MessageTemplate = {
  id: string;
  area: import("./types").LifeArea | "daily";
  slot: MessageSlot;
  microAction: string;
  hinglish: string;
  hindi: string;
  english: string;
};

export type SentMessageRecord = {
  templateId: string;
  date: string;
};

export function slotForHour(hour: number): MessageSlot {
  if (hour < 11) return "morning";
  if (hour < 14) return "midday";
  if (hour < 17) return "afternoon";
  if (hour < 21) return "evening";
  return "night";
}
