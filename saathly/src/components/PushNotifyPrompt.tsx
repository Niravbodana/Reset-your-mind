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
  const [status, setStatus] = useState<"idle" | "done" | "denied" | "unsupported">("idle");

  useEffect(() => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      setStatus("unsupported");
    }
  }, []);

  if (!config.features.webPushEnabled || status === "unsupported" || status === "done") return null;

  const subscribe = async () => {
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus("denied");
        return;
      }
      const reg = await navigator.serviceWorker.register("/sw.js");
      await reg.update();
      const vapid = config.integrations.vapidPublicKey;
      if (!vapid) {
        setStatus("done");
        return;
      }
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapid),
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
        <p className="text-sm font-semibold text-white">Push notifications</p>
        <p className="text-xs text-ink-soft mt-1">
          Browser pe notifications allow karo — app aane se pehle alerts test kar sakte ho.
        </p>
      </div>
      <button type="button" onClick={subscribe} className="btn-primary px-3 py-2 rounded-lg text-xs shrink-0">
        Allow
      </button>
    </div>
  );
}
