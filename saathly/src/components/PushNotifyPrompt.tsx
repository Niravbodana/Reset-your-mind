"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export function PushNotifyPrompt() {
  const config = useSiteConfig();
  const vapidReady = Boolean(config.integrations.vapidPublicKey?.trim());
  const [status, setStatus] = useState<"idle" | "done" | "denied" | "unsupported">("idle");

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setStatus("unsupported");
    }
  }, []);

  if (
    !config.features.webPushEnabled ||
    !vapidReady ||
    status === "unsupported" ||
    status === "done"
  ) {
    return null;
  }

  const subscribe = async () => {
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus("denied");
        return;
      }
      const reg = await navigator.serviceWorker.register("/sw.js");
      await reg.update();
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(config.integrations.vapidPublicKey),
      });
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });
      setStatus("done");
    } catch {
      setStatus("denied");
    }
  };

  if (status === "denied") return null;

  return (
    <div className="soft-card rounded-xl p-4 flex gap-3 items-start mb-6 border border-gold/20">
      <Bell size={18} className="text-gold-light shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Browser push (beta)</p>
        <p className="text-xs text-ink-soft mt-1">
          Optional test alerts on this device. Main notifications ship with the mobile app.
        </p>
      </div>
      <button type="button" onClick={subscribe} className="btn-primary px-3 py-2 rounded-lg text-xs shrink-0">
        Allow
      </button>
    </div>
  );
}
