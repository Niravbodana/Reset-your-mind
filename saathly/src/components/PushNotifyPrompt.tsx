"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, Check, Send } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/lib/haptic";
import { formatCustomerName } from "@/lib/message-format";
import {
  notificationsEnabledLocally,
  setNotificationsEnabledLocally,
  showLocalNotification,
  subscribeToWebPush,
} from "@/lib/pulse-notifications";

type Props = {
  compact?: boolean;
};

export function NotificationSettingsCard({ compact = false }: Props) {
  const config = useSiteConfig();
  const { state, patchUser, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  const isIN = region === "IN" && !preferEnglish;
  const vapidReady = Boolean(config.integrations.vapidPublicKey?.trim());
  const webPushOn = config.features.webPushEnabled;

  const [supported, setSupported] = useState(true);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [enabled, setEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [testMsg, setTestMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ok = "Notification" in window && "serviceWorker" in navigator;
    setSupported(ok);
    if (ok) {
      setPermission(Notification.permission);
      setEnabled(Notification.permission === "granted" && notificationsEnabledLocally());
    }
  }, []);

  if (!user || !webPushOn) return null;

  const displayName = formatCustomerName(user.name, user.language);

  const enable = async () => {
    setBusy(true);
    setTestMsg("");
    try {
      haptic("medium");
      if (vapidReady) {
        await subscribeToWebPush(config.integrations.vapidPublicKey, user.email, user.id);
      } else {
        const perm = await Notification.requestPermission();
        if (perm !== "granted") throw new Error("denied");
        setNotificationsEnabledLocally(true);
        await showLocalNotification(
          "RIZN",
          isIN
            ? `${displayName}, web alerts on ho gayi — schedule ke hisaab se messages aayenge.`
            : `${displayName}, web alerts are on — messages arrive on your schedule.`
        );
      }
      setPermission("granted");
      setEnabled(true);
      trackEvent("web_push_enabled");
    } catch {
      setPermission(Notification.permission);
      setTestMsg(isIN ? "Permission denied ya setup incomplete." : "Permission denied or setup incomplete.");
    } finally {
      setBusy(false);
    }
  };

  const sendTest = async () => {
    setBusy(true);
    setTestMsg("");
    try {
      haptic("light");
      if (vapidReady) {
        const res = await fetch("/api/push/send-test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, name: displayName }),
        });
        if (!res.ok) throw new Error("push_failed");
      } else {
        await showLocalNotification(
          "RIZN — test",
          isIN
            ? `${displayName}, yeh test alert hai. Aaj ke messages schedule pe aayenge.`
            : `${displayName}, this is a test alert. Today's messages arrive on schedule.`
        );
      }
      setTestMsg(isIN ? "Test alert bhej di!" : "Test alert sent!");
      trackEvent("web_push_test");
    } catch {
      setTestMsg(isIN ? "Test fail — pehle Allow dabao." : "Test failed — enable alerts first.");
    } finally {
      setBusy(false);
    }
  };

  const toggleDnd = () => {
    haptic("light");
    patchUser({ dndEnabled: !user.dndEnabled });
    trackEvent("dnd_toggle", user.dndEnabled ? "off" : "on");
  };

  if (!supported) {
    return (
      <div className="soft-card rounded-2xl p-5 mb-6 border border-white/10">
        <p className="text-sm text-ink-soft">
          {isIN
            ? "Is browser me web notifications support nahi hai. Chrome / Edge try karo."
            : "This browser doesn't support web notifications. Try Chrome or Edge."}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`soft-card rounded-2xl border border-gold/20 mb-6 ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          {enabled ? <Bell size={18} /> : <BellOff size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm">
            {isIN ? "Web notifications" : "Web notifications"}
          </p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            {enabled
              ? isIN
                ? "Daily messages + bill reminders is device pe schedule ke hisaab se aayenge."
                : "Daily messages and bill reminders arrive on this device on your schedule."
              : isIN
                ? "Allow karo — naam ke saath personalized alerts, EMI 1 din pehle."
                : "Allow alerts — personalized messages with your name, bills 1 day early."}
          </p>

          {!enabled && permission !== "denied" && (
            <button
              type="button"
              onClick={enable}
              disabled={busy}
              className="btn-primary mt-3 px-4 py-2.5 rounded-xl text-sm font-semibold min-h-[44px] disabled:opacity-60"
            >
              {busy ? (isIN ? "Setting up…" : "Setting up…") : isIN ? "Allow notifications" : "Allow notifications"}
            </button>
          )}

          {permission === "denied" && (
            <p className="text-xs text-red-300 mt-3">
              {isIN
                ? "Browser settings me RIZN ke liye notifications allow karo."
                : "Enable notifications for RIZN in your browser settings."}
            </p>
          )}

          {enabled && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={sendTest}
                disabled={busy}
                className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold min-h-[44px]"
              >
                <Send size={14} />
                {isIN ? "Test alert" : "Test alert"}
              </button>
              <button
                type="button"
                onClick={toggleDnd}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold min-h-[44px] border ${
                  user.dndEnabled
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/5 text-white/80"
                }`}
              >
                {user.dndEnabled
                  ? isIN
                    ? "DND on"
                    : "DND on"
                  : isIN
                    ? "Sleep DND"
                    : "Sleep DND"}
              </button>
            </div>
          )}

          {testMsg && (
            <p className="text-xs text-gold-light mt-2 flex items-center gap-1">
              <Check size={12} /> {testMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/** Compact first-time prompt on dashboard */
export function PushNotifyPrompt() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rizn_push_prompt_dismissed") === "1") return;
    if (Notification.permission === "granted" && notificationsEnabledLocally()) return;
    setDismissed(false);
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative mb-6">
      <NotificationSettingsCard compact />
      <button
        type="button"
        onClick={() => {
          localStorage.setItem("rizn_push_prompt_dismissed", "1");
          setDismissed(true);
        }}
        className="absolute top-3 right-3 text-xs text-muted hover:text-white min-h-8 min-w-8"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
