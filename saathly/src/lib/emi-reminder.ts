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

export function formatEmiNotification(
  name: string,
  emi: EmiReminder,
  language: Language = "hinglish"
): string {
  const n = formatCustomerName(name, language);
  const amt = emi.amount.toLocaleString("en-IN");
  if (language === "english") {
    return `${n}, tomorrow ₹${amt} EMI is due (${emi.label}) — ${emi.bankName}. Keep balance ready.`;
  }
  if (language === "hindi") {
    return `${n}, कल ₹${amt} की EMI due है (${emi.label}) — ${emi.bankName}। बैलेंस तैयार रखिए।`;
  }
  return `${n}, kal ₹${amt} ki EMI due hai (${emi.label}) — ${emi.bankName}. Balance ready rakho, late fee se bacho.`;
}

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
