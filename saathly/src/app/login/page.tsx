"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { peekState } from "@/lib/storage";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthButton, AuthField } from "@/components/auth/AuthField";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { LanguageSelect } from "@/components/LanguageSelect";
import { useLocale } from "@/context/LocaleContext";

export default function LoginPage() {
  const router = useRouter();
  const { restoreSession, trackEvent } = useApp();
  const { t, preferEnglish } = useLocale();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goDashboard = () => {
    trackEvent("login", "ok");
    router.push("/dashboard");
  };

  const onGoogle = useCallback(
    (g: { name: string; email: string }) => {
      const stored = peekState();
      if (stored.user?.email === g.email.toLowerCase() && restoreSession()) {
        goDashboard();
        return;
      }
      // New Google user → send to signup with prefilled feel via sessionStorage
      sessionStorage.setItem(
        "rizn_google_prefill",
        JSON.stringify({ name: g.name, email: g.email })
      );
      router.push("/signup?google=1");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [restoreSession, router]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    const normalized = email.trim().toLowerCase();
    const stored = peekState();

    if (stored.user?.email === normalized && restoreSession()) {
      goDashboard();
      return;
    }

    setLoading(false);
    setError(t("login.error"));
  };

  return (
    <AuthShell
      title={t("login.title")}
      subtitle={t("login.subtitle")}
      footer={
        <p className="text-center text-xs text-white/45">
          {preferEnglish ? "New here?" : "Naye ho?"}{" "}
          <Link href="/signup" className="font-medium text-gold hover:text-gold-light">
            {t("nav.join")} — free trial
          </Link>
        </p>
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <LanguageSelect compact />
      </div>

      <div className="space-y-5">
        <GoogleSignInButton onSuccess={onGoogle} />

        <div className="relative flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[11px] uppercase tracking-wider text-muted">
            {t("signup.orEmail")}
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={submit} className="space-y-5">
          <AuthField
            label={t("signup.email")}
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder={t("signup.emailPh")}
            icon={<Mail size={18} />}
            error={error || undefined}
            autoComplete="email"
            autoFocus
          />

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <Shield size={18} className="mt-0.5 shrink-0 text-gold/80" />
            <p className="text-xs leading-relaxed text-white/55">
              {preferEnglish
                ? "Demo mode: email preview on this device. Live Google later from Admin. No mobile OTP."
                : "Demo mode: is device pe email preview. Live Google baad me Admin se. Mobile OTP nahi."}
            </p>
          </div>

          <AuthButton loading={loading}>
            {t("nav.signin")}
            <ArrowRight size={16} />
          </AuthButton>
        </form>
      </div>
    </AuthShell>
  );
}
