"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import {
  getNotifiedPulseIds,
  isInDnd,
  isPlanPaused,
  isPulseDue,
  markPulseNotified,
  notificationsEnabledLocally,
  showLocalNotification,
} from "@/lib/pulse-notifications";

/** Delivers scheduled pulse alerts in-browser when notifications are enabled */
export function PulseNotificationScheduler() {
  const { state } = useApp();
  const user = state.user;

  useEffect(() => {
    if (!user) return;
    if (typeof window === "undefined") return;
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    if (!notificationsEnabledLocally()) return;

    const today = new Date().toISOString().slice(0, 10);

    const tick = async () => {
      if (isInDnd(user)) return;
      const paused = isPlanPaused(user);
      const notified = getNotifiedPulseIds();
      const due = state.pulses.filter((p) => {
        if (p.date !== today) return false;
        if (notified.has(p.id)) return false;
        if (!isPulseDue(p)) return false;
        if (paused && !p.templateId?.startsWith("emi-")) return false;
        return true;
      });

      for (const pulse of due) {
        const title = pulse.templateId?.startsWith("emi-")
          ? "RIZN — bill reminder"
          : "RIZN";
        await showLocalNotification(title, pulse.text, "/dashboard");
        markPulseNotified(pulse.id);
      }
    };

    void tick();
    const id = window.setInterval(() => void tick(), 60_000);
    return () => window.clearInterval(id);
  }, [state.pulses, user]);

  return null;
}
