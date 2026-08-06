import webpush from "web-push";
import type { SiteSettings } from "./site-settings-types";

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
};

export type StoredPushSubscription = {
  endpoint: string;
  keys?: { p256dh?: string; auth?: string };
  expirationTime?: number | null;
  email?: string;
  userId?: string;
  at: string;
};

export function getEffectiveVapid(settings: SiteSettings) {
  return {
    publicKey:
      settings.integrations.vapidPublicKey.trim() ||
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() ||
      "",
    privateKey:
      settings.integrations.vapidPrivateKey.trim() ||
      process.env.VAPID_PRIVATE_KEY?.trim() ||
      "",
    subject:
      settings.integrations.vapidSubject.trim() ||
      process.env.VAPID_SUBJECT?.trim() ||
      "mailto:hello@rizn.app",
  };
}

export function configureWebPush(settings: SiteSettings): boolean {
  const vapid = getEffectiveVapid(settings);
  if (!vapid.publicKey || !vapid.privateKey) return false;
  webpush.setVapidDetails(vapid.subject, vapid.publicKey, vapid.privateKey);
  return true;
}

export async function sendWebPush(
  subscription: StoredPushSubscription,
  payload: PushPayload,
  settings: SiteSettings
): Promise<void> {
  if (!configureWebPush(settings)) {
    throw new Error("VAPID keys not configured");
  }
  if (!subscription.keys?.p256dh || !subscription.keys?.auth) {
    throw new Error("Invalid subscription keys");
  }
  await webpush.sendNotification(
    {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      expirationTime: subscription.expirationTime ?? undefined,
    },
    JSON.stringify(payload)
  );
}
