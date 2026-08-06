import { promises as fs } from "fs";
import path from "path";
import type { StoredPushSubscription } from "./push-server";
import type { SiteSettings, WaitlistEntry } from "./site-settings-types";
import { DEFAULT_SETTINGS } from "./site-settings-types";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");
const PUSH_FILE = path.join(DATA_DIR, "push-subscriptions.json");
const INTERESTS_FILE = path.join(DATA_DIR, "program-interests.json");

export type ProgramInterest = {
  email: string;
  programId: string;
  at: string;
};

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

function resolveAdminPassword(settings: SiteSettings): SiteSettings {
  const envPass = process.env.RIZN_ADMIN_PASSWORD?.trim();
  if (envPass) return { ...settings, adminPassword: envPass };
  return settings;
}

export async function readSettings(): Promise<SiteSettings> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(SETTINGS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<SiteSettings>;
    return resolveAdminPassword({
      ...DEFAULT_SETTINGS,
      ...parsed,
      integrations: { ...DEFAULT_SETTINGS.integrations, ...parsed.integrations },
      marketing: { ...DEFAULT_SETTINGS.marketing, ...parsed.marketing },
      features: { ...DEFAULT_SETTINGS.features, ...parsed.features },
    });
  } catch {
    return resolveAdminPassword({ ...DEFAULT_SETTINGS });
  }
}

export async function writeSettings(settings: SiteSettings): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), "utf-8");
}

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(WAITLIST_FILE, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

export async function appendWaitlist(entry: WaitlistEntry): Promise<{ list: WaitlistEntry[]; isNew: boolean }> {
  const list = await readWaitlist();
  if (list.some((e) => e.email.toLowerCase() === entry.email.toLowerCase())) {
    return { list, isNew: false };
  }
  const next = [entry, ...list];
  await ensureDataDir();
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(next, null, 2), "utf-8");
  return { list: next, isNew: true };
}

export async function readPushSubscriptions(): Promise<StoredPushSubscription[]> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(PUSH_FILE, "utf-8");
    return JSON.parse(raw) as StoredPushSubscription[];
  } catch {
    return [];
  }
}

export async function appendProgramInterest(email: string, programId: string): Promise<void> {
  const list = await readProgramInterests();
  const key = `${email.toLowerCase()}:${programId}`;
  if (list.some((i) => `${i.email}:${i.programId}` === key)) return;
  const next = [...list, { email: email.toLowerCase(), programId, at: new Date().toISOString() }];
  await ensureDataDir();
  await fs.writeFile(INTERESTS_FILE, JSON.stringify(next, null, 2), "utf-8");
}

export async function readProgramInterests(): Promise<ProgramInterest[]> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(INTERESTS_FILE, "utf-8");
    return JSON.parse(raw) as ProgramInterest[];
  } catch {
    return [];
  }
}

export async function upsertPushSubscription(sub: StoredPushSubscription): Promise<void> {
  const list = await readPushSubscriptions();
  const idx = list.findIndex((s) => s.endpoint === sub.endpoint);
  const next =
    idx >= 0
      ? list.map((s, i) => (i === idx ? { ...s, ...sub, at: new Date().toISOString() } : s))
      : [...list, { ...sub, at: new Date().toISOString() }];
  await ensureDataDir();
  await fs.writeFile(PUSH_FILE, JSON.stringify(next, null, 2), "utf-8");
}

export async function appendPushSubscription(sub: StoredPushSubscription): Promise<void> {
  await upsertPushSubscription(sub);
}

export function getEffectiveRazorpay(settings: SiteSettings) {
  return {
    keyId: settings.integrations.razorpayKeyId || process.env.RAZORPAY_KEY_ID || "",
    keySecret: settings.integrations.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "",
    webhookSecret: settings.integrations.razorpayWebhookSecret || process.env.RAZORPAY_WEBHOOK_SECRET || "",
    planPersonal: settings.integrations.razorpayPlanPersonal || process.env.NEXT_PUBLIC_RAZORPAY_PLAN_PERSONAL || "",
    planParivaar: settings.integrations.razorpayPlanParivaar || process.env.NEXT_PUBLIC_RAZORPAY_PLAN_PARIVAAR || "",
  };
}

export function getEffectiveWhatsApp(settings: SiteSettings) {
  return {
    token: settings.integrations.whatsappToken || process.env.WHATSAPP_TOKEN || "",
    phoneNumberId: settings.integrations.whatsappPhoneNumberId || process.env.PHONE_NUMBER_ID || "",
  };
}

export function verifyAdminPassword(settings: SiteSettings, password: string): boolean {
  const envPass = process.env.RIZN_ADMIN_PASSWORD?.trim();
  if (envPass && password === envPass) return true;
  if (settings.adminPassword && password === settings.adminPassword) return true;
  return false;
}
