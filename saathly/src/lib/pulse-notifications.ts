import type { Pulse, UserProfile } from "./types";

const NOTIFIED_KEY = "rizn_notified_pulses_v1";
export const NOTIFICATIONS_ENABLED_KEY = "rizn_notifications_enabled";

export function notificationsEnabledLocally(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(NOTIFICATIONS_ENABLED_KEY) === "1";
}

export function setNotificationsEnabledLocally(enabled: boolean) {
  localStorage.setItem(NOTIFICATIONS_ENABLED_KEY, enabled ? "1" : "0");
}

export function getNotifiedPulseIds(): Set<string> {
  try {
    const raw = localStorage.getItem(NOTIFIED_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function markPulseNotified(id: string) {
  const set = getNotifiedPulseIds();
  set.add(id);
  localStorage.setItem(NOTIFIED_KEY, JSON.stringify([...set].slice(-200)));
}

export function parseTimeLabel(label: string): number {
  const [h, m] = label.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function isPulseDue(pulse: Pulse, now = new Date()): boolean {
  const nowMin = now.getHours() * 60 + now.getMinutes();
  return nowMin >= parseTimeLabel(pulse.timeLabel);
}

export function isPlanPaused(user: UserProfile, now = new Date()): boolean {
  if (!user.planPausedUntil) return false;
  return new Date(user.planPausedUntil).getTime() > now.getTime();
}

export function isInDnd(user: UserProfile, now = new Date()): boolean {
  if (!user.dndEnabled) return false;
  const hour = now.getHours();
  const sleep = user.sleepHour ?? 21;
  const wake = user.wakeHour ?? 9;
  if (sleep > wake) return hour >= sleep || hour < wake;
  return hour >= sleep && hour < wake;
}

export async function showLocalNotification(
  title: string,
  body: string,
  url = "/dashboard"
): Promise<void> {
  if (typeof window === "undefined") return;
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await reg.showNotification(title, {
      body,
      icon: "/logo.png",
      badge: "/logo.svg",
      data: { url },
      tag: `rizn-${Date.now()}`,
    });
    return;
  }

  new Notification(title, { body, icon: "/logo.png" });
}

export function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export async function subscribeToWebPush(vapidPublicKey: string, email?: string, userId?: string) {
  const perm = await Notification.requestPermission();
  if (perm !== "granted") throw new Error("permission_denied");

  const reg = await navigator.serviceWorker.register("/sw.js");
  await reg.update();

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
  });

  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subscription: sub.toJSON(),
      email,
      userId,
    }),
  });

  if (!res.ok) throw new Error("subscribe_failed");
  setNotificationsEnabledLocally(true);
  return sub;
}
