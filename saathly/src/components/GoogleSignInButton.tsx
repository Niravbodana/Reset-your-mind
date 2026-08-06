"use client";

import { useEffect, useRef, useState } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: Record<string, unknown>) => void;
          prompt: (cb?: (n: { isNotDisplayed: () => boolean }) => void) => void;
          renderButton: (el: HTMLElement, cfg: Record<string, unknown>) => void;
        };
      };
    };
  }
}

type GoogleUser = { name: string; email: string; sub: string };

function decodeJwtPayload(token: string): Record<string, string> {
  const part = token.split(".")[1];
  const json = atob(part.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json) as Record<string, string>;
}

function loadGsi(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }
    const existing = document.querySelector('script[src*="accounts.google.com/gsi"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google script failed"));
    document.head.appendChild(s);
  });
}

export function GoogleSignInButton({
  onSuccess,
  className = "",
}: {
  onSuccess: (user: GoogleUser) => void;
  className?: string;
}) {
  const config = useSiteConfig();
  const { t, preferEnglish } = useLocale();
  const clientId = config.integrations.googleClientId || "";
  const enabled = config.features.googleAuthEnabled && Boolean(clientId);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const onSuccessRef = useRef(onSuccess);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    void loadGsi()
      .then(() => {
        if (cancelled || !window.google) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (resp: { credential: string }) => {
            try {
              const payload = decodeJwtPayload(resp.credential);
              haptic("success");
              onSuccessRef.current({
                name: payload.name || payload.email?.split("@")[0] || "Friend",
                email: (payload.email || "").toLowerCase(),
                sub: payload.sub || "",
              });
            } catch {
              setError("Google sign-in failed. Try email below.");
            }
          },
        });
        setReady(true);
      })
      .catch(() => setError("Google unavailable. Use email below."));
    return () => {
      cancelled = true;
    };
  }, [enabled, clientId]);

  const demoGoogle = () => {
    haptic("medium");
    const email = window.prompt(
      preferEnglish
        ? "Demo login — enter any email (not real Google):"
        : "Demo login — koi bhi email likho (real Google nahi):",
      "you@email.com"
    );
    if (!email || !email.includes("@")) return;
    const name = email.split("@")[0].replace(/[._]/g, " ");
    onSuccess({
      name: name.replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.trim().toLowerCase(),
      sub: `demo_${Date.now()}`,
    });
  };

  if (!enabled) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={demoGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-dashed border-gold/40 bg-white/[0.06] px-4 py-3.5 text-sm font-bold text-white min-h-[52px] hover:bg-white/[0.1]"
        >
          <span className="rounded-md bg-gold/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-light">
            Demo
          </span>
          {preferEnglish ? "Continue with email (Demo)" : "Email se continue (Demo)"}
        </button>
        <p className="mt-2 text-[11px] text-center text-white/45">{t("signup.googleHint")}</p>
        {error && <p className="mt-1 text-xs text-rose-300 text-center">{error}</p>}
      </div>
    );
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          if (!ready || !window.google) {
            demoGoogle();
            return;
          }
          haptic("medium");
          window.google.accounts.id.prompt();
        }}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white px-4 py-3.5 text-sm font-bold text-black min-h-[52px]"
      >
        <GoogleIcon />
        {t("signup.google")}
      </button>
      <p className="mt-2 text-[11px] text-center text-white/45">{t("signup.googleHint")}</p>
      {error && <p className="mt-1 text-xs text-rose-300 text-center">{error}</p>}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.9 26.8 37 24 37c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2C39.5 36.2 44 30.7 44 24c0-1.2-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
