"use client";

import { useEffect, useState, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail, User, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AREA_LABELS } from "@/lib/templates";
import type { Language, LifeArea } from "@/lib/types";
import { trialEndDate } from "@/lib/plans";
import { uid } from "@/lib/storage";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";
import { DEFAULT_INTERVAL, DEFAULT_SLEEP, DEFAULT_WAKE, defaultAnchors } from "@/lib/schedule-config";
import { OfferPrice } from "@/components/OfferPrice";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthButton, AuthField, StepIndicator } from "@/components/auth/AuthField";
import { NoSpamPromise } from "@/components/NoSpamPromise";
import { useLocale } from "@/context/LocaleContext";
import { LanguageSelect } from "@/components/LanguageSelect";
import { GoogleSignInButton } from "@/components/GoogleSignInButton";
import { crisisResources } from "@/lib/locale";

const areaIds = Object.keys(AREA_LABELS) as LifeArea[];

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, trackEvent } = useApp();
  const config = useSiteConfig();
  const { region, t, preferEnglish, setLanguage: setLocaleMsgLang, setRegionLocked } =
    useLocale();
  const priceLabel = regionPersonalPriceLabel(config, region);
  const isIN = region === "IN" && !preferEnglish;
  const crisis = crisisResources(region);

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<LifeArea[]>(["finance", "mind"]);
  const [language, setLanguage] = useState<Language>(preferEnglish ? "english" : "hinglish");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [authProvider, setAuthProvider] = useState<"google" | "email">("email");

  useEffect(() => {
    // India → Hinglish · Worldwide → English
    const next: Language = region === "IN" ? (preferEnglish ? "english" : "hinglish") : "english";
    setLanguage(next);
    setLocaleMsgLang(next);
  }, [preferEnglish, region, setLocaleMsgLang]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rizn_google_prefill");
      if (!raw) return;
      const g = JSON.parse(raw) as { name?: string; email?: string };
      if (g.name) setName(g.name);
      if (g.email) setEmail(g.email);
      setAuthProvider("google");
      sessionStorage.removeItem("rizn_google_prefill");
      if (searchParams.get("google") === "1") setStep(2);
    } catch {
      /* ignore */
    }
  }, [searchParams]);

  const toggle = (id: LifeArea) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const canProceedStep1 = name.trim().length >= 2 && email.includes("@");

  const finishSignup = useCallback(
    async (opts: { name: string; email: string; provider: "google" | "email" }) => {
      setLoading(true);
      setError("");
      const referredBy = searchParams.get("ref") || undefined;

      const wl = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: opts.name.trim(),
          email: opts.email.trim(),
          plan: "personal",
          areas: selected,
          language,
          referredBy,
          authProvider: opts.provider,
        }),
      });

      if (!wl.ok) {
        setLoading(false);
        const data = await wl.json().catch(() => ({}));
        setError(data.error || "Connection issue — please try again.");
        return;
      }

      const user = {
        id: uid("user"),
        name: opts.name.trim(),
        email: opts.email.trim().toLowerCase(),
        plan: "personal" as const,
        areas: selected,
        language,
        wakeHour: 9,
        sleepHour: 21,
        wakeTime: DEFAULT_WAKE,
        sleepTime: DEFAULT_SLEEP,
        pulseIntervalMinutes: DEFAULT_INTERVAL,
        scheduleAnchors: defaultAnchors(),
        softMode: false,
        createdAt: new Date().toISOString(),
        trialEndsAt: trialEndDate(config.marketing.trialDays),
        subStatus: "trial" as const,
        referralCode:
          opts.name.trim().toLowerCase().replace(/\s+/g, "").slice(0, 8) +
          Math.floor(Math.random() * 90 + 10),
        referredBy,
        streak: 1,
        bestStreak: 1,
        lastActiveDate: new Date().toISOString().slice(0, 10),
        sentHistory: [],
        emiReminders: [],
        habitGoals: { stepGoal: 8000, waterGoal: 8, sleepWindDownHour: 21 },
        habitDays: {},
      };

      login(user);
      setRegionLocked(true);
      trackEvent("waitlist_signup", opts.provider);
      localStorage.removeItem("rizn_onboarding_done");
      setDone(true);
    },
    [
      selected,
      language,
      config.marketing.trialDays,
      login,
      trackEvent,
      searchParams,
      setRegionLocked,
    ]
  );

  // Reliable redirect after success (setTimeout-only was getting stuck on mobile)
  useEffect(() => {
    if (!done) return;
    const soft = window.setTimeout(() => {
      router.replace("/billing?trial=1&welcome=1");
    }, 600);
    const hard = window.setTimeout(() => {
      if (window.location.pathname.startsWith("/signup")) {
        window.location.assign("/billing?trial=1&welcome=1");
      }
    }, 2000);
    return () => {
      window.clearTimeout(soft);
      window.clearTimeout(hard);
    };
  }, [done, router]);

  const onGoogle = useCallback((g: { name: string; email: string }) => {
    setName(g.name);
    setEmail(g.email);
    setAuthProvider("google");
    setStep(2);
  }, []);

  const submit = async () => {
    if (!consent || selected.length < 1) return;
    await finishSignup({ name, email, provider: authProvider });
  };

  const msgLanguages: { id: Language; label: string; sub: string }[] = [
    { id: "hinglish", label: "Hinglish", sub: "India default" },
    { id: "hindi", label: "Hindi", sub: "Shuddh Hindi" },
    { id: "english", label: "English", sub: "Optional" },
  ];

  if (done) {
    return (
      <AuthShell title="" subtitle="">
        <div className="py-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/10 ring-1 ring-gold/30">
            <Check className="h-10 w-10 text-gold" strokeWidth={2.5} />
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {t("signup.welcome")}, {name.split(" ")[0]}!
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            {t("signup.ready")}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/40">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            {t("signup.settingUp")}
          </div>
          <Link
            href="/billing?trial=1&welcome=1"
            className="btn-primary mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold min-h-[48px] w-full max-w-xs"
          >
            {preferEnglish ? "Continue" : "Aage badho"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={step === 1 ? t("signup.title") : t("signup.personalize")}
      subtitle={step === 1 ? t("signup.subtitle") : t("signup.personalizeSub")}
      footer={
        <p className="text-center text-xs text-white/45">
          {t("signup.already")}{" "}
          <Link href="/login" className="font-medium text-gold hover:text-gold-light">
            {t("nav.signin")}
          </Link>
        </p>
      }
    >
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        <LanguageSelect compact />
      </div>
      <StepIndicator step={step} total={2} />

      {searchParams.get("ref") && (
        <div className="mb-5 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-xs text-gold-light">
          {t("signup.invite")}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <GoogleSignInButton onSuccess={onGoogle} />

          <div className="relative flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-muted">
              {t("signup.orEmail")}
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <AuthField
            label={t("signup.name")}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("signup.namePh")}
            hint={t("signup.nameHint")}
            icon={<User size={18} />}
            autoComplete="name"
            required
          />
          <AuthField
            label={t("signup.email")}
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setAuthProvider("email");
            }}
            placeholder={t("signup.emailPh")}
            hint={t("signup.emailHint")}
            icon={<Mail size={18} />}
            autoComplete="email"
            required
          />

          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                <Sparkles size={18} className="text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  RIZN Personal — {priceLabel}
                </p>
                <p className="text-xs text-white/55">
                  {config.marketing.trialDays}-day free trial · {priceLabel} · Cancel anytime
                </p>
              </div>
            </div>
          </div>

          <NoSpamPromise />

          <AuthButton type="button" disabled={!canProceedStep1} onClick={() => setStep(2)}>
            {t("signup.continue")}
            <ArrowRight size={16} />
          </AuthButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {(name || email) && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs text-ink-soft">
              <span className="text-white font-medium">{name}</span>
              {email ? ` · ${email}` : ""}
              {authProvider === "google" ? " · Google" : ""}
            </div>
          )}

          <div>
            <p className="mb-3 text-sm font-medium text-white/90">
              {preferEnglish ? "Message language" : "Message language"}
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {msgLanguages.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.id);
                    setLocaleMsgLang(lang.id);
                  }}
                  className={`min-h-[52px] rounded-xl border px-4 py-3 text-left transition-all ${
                    language === lang.id
                      ? "border-gold/50 bg-gold/10 ring-1 ring-gold/30"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${language === lang.id ? "text-gold" : "text-white"}`}
                  >
                    {lang.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/45">{lang.sub}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 text-sm font-medium text-white/90">Focus areas</p>
            <p className="mb-3 text-xs text-white/45">
              {preferEnglish
                ? "Pick up to 3 — messages will match these topics"
                : "Max 3 select karo — messages in topics pe aayenge"}
            </p>
            <div className="flex flex-wrap gap-2">
              {areaIds.map((id) => {
                const active = selected.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggle(id)}
                    className={`min-h-[44px] rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                      active
                        ? "bg-gold text-black shadow-md shadow-gold/20"
                        : "border border-white/10 bg-white/[0.04] text-white/70 hover:border-white/20"
                    }`}
                  >
                    {AREA_LABELS[id]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm text-white/70">Monthly plan</span>
              <OfferPrice plan="personal" />
            </div>
            <p className="mt-2 text-xs text-white/45">
              Includes daily messages + {region === "IN" ? "EMI/bill" : "bill"} reminders ·{" "}
              {priceLabel} after trial
            </p>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/15 min-h-[56px]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/20 bg-transparent accent-gold"
              required
            />
            <span className="text-sm leading-relaxed text-white/65">
              I agree to the{" "}
              <Link href="/privacy" className="text-gold underline-offset-2 hover:underline" target="_blank">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-gold underline-offset-2 hover:underline" target="_blank">
                Terms of Service
              </Link>
              .
            </span>
          </label>

          <p className="text-xs text-white/40 leading-relaxed">
            Crisis help:{" "}
            {crisis.map((c, i) => (
              <span key={c.href}>
                {i > 0 ? " · " : ""}
                <a href={c.href} className="text-gold-light underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
                  {c.label}
                </a>
              </span>
            ))}
            . RIZN is habit support, not therapy.
          </p>

          {error && (
            <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <AuthButton
              type="button"
              variant="secondary"
              className="sm:flex-1 sm:max-w-[140px]"
              onClick={() => setStep(1)}
            >
              <ArrowLeft size={16} />
              Back
            </AuthButton>
            <AuthButton
              type="button"
              loading={loading}
              disabled={!consent || selected.length < 1 || !canProceedStep1}
              className="sm:flex-1"
              onClick={() => void submit()}
            >
              Start free trial
              <ArrowRight size={16} />
            </AuthButton>
          </div>
        </div>
      )}
    </AuthShell>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
