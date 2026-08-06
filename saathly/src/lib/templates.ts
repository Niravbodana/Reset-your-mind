import type { Language, LifeArea } from "./types";
import { MESSAGE_BANK } from "./message-bank";
import type { MessageTemplate } from "./message-format";
import {
  formatCustomerName,
  slotForHour,
  type MessageSlot,
  type SentMessageRecord,
} from "./message-format";

export function renderMessage(
  tpl: MessageTemplate,
  name: string,
  language: Language
): { text: string; microAction: string; area: LifeArea | "daily"; templateId: string } {
  const display = formatCustomerName(name, language);
  const raw = tpl[language] || tpl.hinglish;
  return {
    text: raw.replaceAll("{name}", display),
    microAction: tpl.microAction,
    area: tpl.area,
    templateId: tpl.id,
  };
}

function matchesArea(tpl: MessageTemplate, areas: LifeArea[]): boolean {
  if (tpl.area === "daily") return true;
  return areas.includes(tpl.area as LifeArea);
}

function matchesSlot(tpl: MessageTemplate, slot: MessageSlot): boolean {
  return tpl.slot === "any" || tpl.slot === slot;
}

/** Never repeat until pool exhausted — then recycle oldest 25% of history. */
export function getUsedIds(history: SentMessageRecord[]): Set<string> {
  return new Set(history.map((h) => h.templateId));
}

export function pickUniqueTemplate(
  areas: LifeArea[],
  hour: number,
  usedIds: Set<string>,
  softMode: boolean,
  excludeIds: string[] = []
): MessageTemplate | null {
  const slot = slotForHour(hour);
  let pool = MESSAGE_BANK.filter(
    (t) =>
      matchesArea(t, areas) &&
      matchesSlot(t, slot) &&
      !excludeIds.includes(t.id)
  );

  if (pool.length < 3) {
    pool = MESSAGE_BANK.filter((t) => matchesArea(t, areas) && !excludeIds.includes(t.id));
  }

  let available = pool.filter((t) => !usedIds.has(t.id));

  if (available.length === 0 && usedIds.size > 0) {
    available = pool;
  }

  if (softMode) {
    const gentle = available.filter((t) => t.area === "mind" || t.area === "daily" || t.area === "love");
    if (gentle.length) available = gentle;
  }

  if (!available.length) return null;

  const idx = Math.floor(Math.random() * available.length);
  return available[idx];
}

export function pickTemplatesForSlots(
  areas: LifeArea[],
  hours: number[],
  history: SentMessageRecord[],
  softMode: boolean
): { templates: MessageTemplate[]; newHistory: SentMessageRecord[] } {
  const usedIds = getUsedIds(history);
  const picked: MessageTemplate[] = [];
  const sessionIds: string[] = [];
  const today = new Date().toISOString().slice(0, 10);

  for (const hour of hours) {
    const tpl = pickUniqueTemplate(areas, hour, usedIds, softMode, sessionIds);
    if (!tpl) continue;
    picked.push(tpl);
    sessionIds.push(tpl.id);
    usedIds.add(tpl.id);
  }

  const newRecords: SentMessageRecord[] = picked.map((t) => ({
    templateId: t.id,
    date: today,
  }));

  const newHistory = [...history, ...newRecords].slice(-400);

  return { templates: picked, newHistory };
}

/** Legacy export for samples page */
export { MESSAGE_BANK };
export const AREA_LABELS: Record<LifeArea, string> = {
  finance: "Money & savings",
  career: "Work & career",
  love: "Heart & relationships",
  health: "Health & body",
  mind: "Mind & calm",
  family: "Family & home",
};
