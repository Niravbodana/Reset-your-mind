import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "subscriptions.json");

export type StoredSubscription = {
  id: string;
  email: string;
  name: string;
  planId: string;
  razorpaySubscriptionId: string;
  razorpayPlanId: string;
  amount: number;
  trialDays: number;
  trialEndsAt: string;
  status: "created" | "authenticated" | "active" | "halted" | "cancelled" | "completed" | "pending";
  createdAt: string;
  updatedAt: string;
  lastPaymentId?: string;
};

async function ensure() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readSubscriptions(): Promise<StoredSubscription[]> {
  try {
    await ensure();
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw) as StoredSubscription[];
  } catch {
    return [];
  }
}

export async function upsertSubscription(entry: StoredSubscription): Promise<void> {
  const list = await readSubscriptions();
  const idx = list.findIndex(
    (s) =>
      s.razorpaySubscriptionId === entry.razorpaySubscriptionId ||
      (s.email === entry.email && s.planId === entry.planId && s.status !== "cancelled")
  );
  const next = [...list];
  if (idx >= 0) next[idx] = { ...next[idx], ...entry, updatedAt: new Date().toISOString() };
  else next.unshift(entry);
  await ensure();
  await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf-8");
}

export async function findSubscriptionByRazorpayId(id: string) {
  const list = await readSubscriptions();
  return list.find((s) => s.razorpaySubscriptionId === id);
}

export async function patchSubscriptionByRazorpayId(
  id: string,
  patch: Partial<StoredSubscription>
) {
  const list = await readSubscriptions();
  const idx = list.findIndex((s) => s.razorpaySubscriptionId === id);
  if (idx < 0) return null;
  list[idx] = { ...list[idx], ...patch, updatedAt: new Date().toISOString() };
  await ensure();
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
  return list[idx];
}
