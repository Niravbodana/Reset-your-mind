import type { EmiReminder } from "./emi-reminder";

export type UpcomingBill = EmiReminder & {
  dueDate: Date;
  daysUntil: number;
  paidThisCycle: boolean;
};

function monthKey(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

/** Next calendar occurrence of dueDay (1–28) from `from`. */
export function nextDueDate(dueDay: number, from = new Date()): Date {
  const day = Math.min(Math.max(dueDay, 1), 28);
  const d = new Date(from);
  d.setHours(12, 0, 0, 0);
  const candidate = new Date(d.getFullYear(), d.getMonth(), day, 12, 0, 0, 0);
  if (candidate < d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, day, 12, 0, 0, 0);
  }
  return candidate;
}

export function isPaidThisCycle(emi: EmiReminder, from = new Date()): boolean {
  if (!emi.lastPaidMonth) return false;
  const due = nextDueDate(emi.dueDay, from);
  return emi.lastPaidMonth === monthKey(due);
}

export function markPaidMonth(emi: EmiReminder, from = new Date()): EmiReminder {
  const due = nextDueDate(emi.dueDay, from);
  return {
    ...emi,
    lastPaidMonth: monthKey(due),
    lastPaidAt: new Date().toISOString(),
  };
}

export function getUpcomingBills(
  reminders: EmiReminder[] | undefined,
  withinDays = 10,
  from = new Date()
): UpcomingBill[] {
  const list = (reminders ?? []).filter((r) => r.enabled);
  return list
    .map((r) => {
      const dueDate = nextDueDate(r.dueDay, from);
      const daysUntil = Math.ceil((dueDate.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
      return {
        ...r,
        dueDate,
        daysUntil: Math.max(0, daysUntil),
        paidThisCycle: isPaidThisCycle(r, from),
      };
    })
    .filter((r) => r.daysUntil <= withinDays)
    .sort((a, b) => a.daysUntil - b.daysUntil || a.dueDay - b.dueDay);
}

export function formatDueLabel(daysUntil: number, language: "hinglish" | "hindi" | "english"): string {
  if (language === "english") {
    if (daysUntil === 0) return "Due today";
    if (daysUntil === 1) return "Due tomorrow";
    return `Due in ${daysUntil} days`;
  }
  if (daysUntil === 0) return "Aaj due";
  if (daysUntil === 1) return "Kal due";
  return `${daysUntil} din me due`;
}
