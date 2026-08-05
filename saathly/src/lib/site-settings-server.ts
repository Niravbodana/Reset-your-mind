import { promises as fs } from "fs";
import path from "path";
import type { SiteSettings, WaitlistEntry } from "./site-settings-types";
import { DEFAULT_SETTINGS } from "./site-settings-types";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");
const WAITLIST_FILE = path.join(DATA_DIR, "waitlist.json");
const PUSH_FILE = path.join(DATA_DIR, "push-subscriptions.json");

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
    return resolveAdminPassword({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
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

export async function appendWaitlist(entry: WaitlistEntry): Promise<WaitlistEntry[]> {
  const list = await readWaitlist();
  if (list.some((e) => e.email.toLowerCase() === entry.email.toLowerCase())) {
    return list;
  }
  const next = [entry, ...list];
  await ensureDataDir();
  await fs.writeFile(WAITLIST_FILE, JSON.stringify(next, null, 2), "utf-8");
  return next;
}

export async function readPushSubscriptions(): Promise<unknown[]> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(PUSH_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function appendPushSubscription(sub: unknown): Promise<void> {
  const list = await readPushSubscriptions();
  const next = [...list, sub];
  await ensureDataDir();
  await fs.writeFile(PUSH_FILE, JSON.stringify(next, null, 2), "utf-8");
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
