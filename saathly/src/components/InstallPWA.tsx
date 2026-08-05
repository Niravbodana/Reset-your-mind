"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { haptic } from "@/lib/haptic";
import { useLocale } from "@/context/LocaleContext";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPWA() {
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIos, setShowIos] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rizn_pwa_dismissed") === "1") return;
    setDismissed(false);

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onBip);

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua);
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (ios && !standalone) setShowIos(true);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    return () => window.removeEventListener("beforeinstallprompt", onBip);
  }, []);

  const dismiss = () => {
    localStorage.setItem("rizn_pwa_dismissed", "1");
    setDismissed(true);
    setDeferred(null);
    setShowIos(false);
  };

  const install = async () => {
    if (!deferred) return;
    haptic("medium");
    await deferred.prompt();
    await deferred.userChoice;
    dismiss();
  };

  if (dismissed) return null;
  if (!deferred && !showIos) return null;

  return (
    <div className="fixed bottom-[4.75rem] md:bottom-4 left-0 right-0 z-30 px-4 safe-area-px pointer-events-none">
      <div className="mx-auto max-w-md pointer-events-auto rounded-2xl border border-gold/25 bg-black/95 backdrop-blur-xl p-4 shadow-2xl flex gap-3 items-start">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Download size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            {isIN ? "Home screen pe add karo" : "Add to Home Screen"}
          </p>
          <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
            {deferred
              ? isIN
                ? "RIZN app jaisa open hoga — fast, offline-ready feel."
                : "Open RIZN like an app — fast and offline-ready."
              : isIN
                ? "Safari → Share → Add to Home Screen"
                : "Safari → Share → Add to Home Screen"}
          </p>
          {deferred && (
            <button
              type="button"
              onClick={install}
              className="btn-primary mt-3 px-4 py-2 rounded-lg text-xs font-bold min-h-[40px]"
            >
              Install RIZN
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="text-muted hover:text-white min-h-9 min-w-9 flex items-center justify-center"
          aria-label="Dismiss"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
