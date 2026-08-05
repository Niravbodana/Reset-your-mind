import type { Language } from "./types";
import { formatCustomerName } from "./message-format";

export type EmiReminder = {
  id: string;
  label: string;
  amount: number;
  /** Day of month (1–28) when EMI is due */
  dueDay: number;
  bankName: string;
  enabled: boolean;
};

export function emptyEmiReminder(): Omit<EmiReminder, "id"> {
  return { label: "", amount: 0, dueDay: 5, bankName: "", enabled: true };
}

export const DEMO_EMI: EmiReminder = {
  id: "demo",
  label: "Home Loan",
  amount: 12500,
  dueDay: 5,
  bankName: "HDFC Bank",
  enabled: true,
};

/** Re-export respectful EMI notification formatter. */
export { formatEmiNotification, getEmiRemindersDueTomorrow } from "./emi-messages";
