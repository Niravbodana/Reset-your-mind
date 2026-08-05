"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Mail, Phone, User, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AREA_LABELS } from "@/lib/templates";
import type { Language, LifeArea } from "@/lib/types";
import { trialEndDate } from "@/lib/plans";
import { uid } from "@/lib/storage";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice } from "@/lib/pricing";
import { DEFAULT_INTERVAL, DEFAULT_SLEEP, DEFAULT_WAKE, defaultAnchors } from "@/lib/schedule-config";
import { detectPreferredLanguage } from "@/lib/detect-language";
import { OfferPrice } from "@/components/OfferPrice";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthButton, AuthField, StepIndicator } from "@/components/auth/AuthField";
import { NoSpamPromise } from "@/components/NoSpamPromise";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";

const areaIds = Object.keys(AREA_LABELS) as LifeArea[];

const languages: { id: Language; label: string; sub: string }[] = [
  { id: "hinglish", label: "Hinglish", sub: "Most popular" },
  { id: "hindi", label: "Hindi", sub: "Pure Hindi" },
  { id: "english", label: "English", sub: "Professional" },
];

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, trackEvent } = useApp();
  const config = useSiteConfig();
  const crisis = config.marketing.crisisHelpline || "9152987821";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selected, setSelected] = useState<LifeArea[]>(["finance", "mind"]);
  const [language, setLanguage] = useState<Language>("hinglish");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLanguage(detectPreferredLanguage());
  }, []);

  const toggle = (id: LifeArea) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneOk = !phoneDigits || /^[6-9]\d{9}$/.test(phoneDigits);
  const canProceedStep1 = name.trim().length >= 2 && email.includes("@") && phoneOk;

  const submit = async () => {
    if (!consent || selected.length < 1) return;
    setLoading(true);
    setError("");

    const referredBy = searchParams.get("ref") || undefined;

    const wl = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phoneDigits || undefined,
        plan: "personal",
        areas: selected,
        language,
        referredBy,
      }),
    });

    if (!wl.ok) {
      setLoading(false);
      const data = await wl.json().catch(() => ({}));
      setError(data.error || "Connection issue — please check internet and try again.");
      return;
    }

    const user = {
      id: uid("user"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits || undefined,
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
        name.trim().toLowerCase().replace(/\s+/g, "").slice(0, 8) +
        Math.floor(Math.random() * 90 + 10),
      referredBy,
      streak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
      sentHistory: [],
      emiReminders: [],
    };

    login(user);
    trackEvent("waitlist_signup", "personal");
    localStorage.removeItem("rizn_onboarding_done");
    setDone(true);
    setTimeout(() => router.push("/emi-reminders?welcome=1&onboard=1"), 1400);
  };

  if (done) {
    return (
      <AuthShell title="" subtitle="">
        <div className="py-8 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/30 to-gold/10 ring-1 ring-gold/30">
            <Check className="h-10 w-10 text-gold" strokeWidth={2.5} />
          </div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Welcome, {name.split(" ")[0]}!
          </h2>
          <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
            Account ready. Ab 3 chhote steps — EMI, schedule, pehla message.
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
            Setup shuru ho raha hai...
          </div>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={step === 1 ? "Create your account" : "Personalize your experience"}
      subtitle={
        step === 1
          ? "Naam, email, phone — notifications isi pe aayenge. Phone optional."
          : "Language aur focus choose karo. Bad me dashboard se change kar sakte ho."
      }
      footer={
        <div className="space-y-4">
          <WhatsAppCTA variant="bar" />
          <p className="text-center text-xs text-white/45">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-gold hover:text-gold-light">
              Sign in
            </Link>
          </p>
        </div>
      }
    >
      <StepIndicator step={step} total={2} />

      {searchParams.get("ref") && (
        <div className="mb-5 rounded-xl border border-gold/25 bg-gold/10 px-4 py-3 text-xs text-gold-light">
          Invite code applied — dost ke saath free trial start!
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <AuthField
            label="Full name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Priya Sharma"
            hint="Yeh naam aapke daily messages me aayega"
            icon={<User size={18} />}
            autoComplete="name"
            required
          />
          <AuthField
            label="Email address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            hint="Account recovery aur updates ke liye"
            icon={<Mail size={18} />}
            autoComplete="email"
            required
          />
          <AuthField
            label="Phone (optional)"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="98XXXXXXXX"
            hint="WhatsApp / SMS alerts ke liye — 10 digit India mobile"
            icon={<Phone size={18} />}
            autoComplete="tel"
            error={phoneDigits && !phoneOk ? "Valid 10-digit mobile daalo" : undefined}
          />

          <div className="rounded-xl border border-gold/20 bg-gold/5 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15">
                <Sparkles size={18} className="text-gold" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">RIZN Personal — ₹99/month</p>
                <p className="text-xs text-white/55">
                  {config.marketing.trialDays}-day free trial · Cancel anytime
                </p>
              </div>
            </div>
          </div>

          <NoSpamPromise />

          <AuthButton type="button" disabled={!canProceedStep1} onClick={() => setStep(2)}>
            Continue
            <ArrowRight size={16} />
          </AuthButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-medium text-white/90">Message language</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => setLanguage(lang.id)}
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
            <p className="mb-3 text-xs text-white/45">Max 3 select karo — messages in topics pe aayenge</p>
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
              Includes daily messages + EMI reminders · ₹{personalMonthlyPrice(config)}/month after trial
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
            Tough day? Free support: iCall{" "}
            <a href={`tel:${crisis}`} className="text-gold-light underline-offset-2 hover:underline">
              {crisis}
            </a>
            . RIZN therapy nahi hai — daily habit support hai.
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
              disabled={!consent || selected.length < 1}
              className="sm:flex-1"
              onClick={submit}
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
