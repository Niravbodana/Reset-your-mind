"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AREA_LABELS } from "@/lib/templates";
import type { Language, LifeArea, PlanId } from "@/lib/types";
import { trialEndDate } from "@/lib/plans";
import { uid } from "@/lib/storage";

const areaIds = Object.keys(AREA_LABELS) as LifeArea[];

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, trackEvent } = useApp();
  const planParam = searchParams.get("plan");
  const initialPlan: PlanId =
    planParam === "family" || planParam === "parivaar" ? "parivaar" : "personal";

  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<LifeArea[]>([]);
  const [language, setLanguage] = useState<Language>("hinglish");
  const [done, setDone] = useState(false);

  const toggle = (id: LifeArea) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const finish = () => {
    const ref = searchParams.get("ref") || undefined;
    const user = {
      id: uid("user"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      plan,
      areas: selected,
      language,
      wakeHour: 9,
      sleepHour: 21,
      softMode: false,
      createdAt: new Date().toISOString(),
      trialEndsAt: trialEndDate(7),
      subStatus: "trial" as const,
      referralCode: name.trim().toLowerCase().replace(/\s+/g, "").slice(0, 8) + Math.floor(Math.random() * 90 + 10),
      referredBy: ref,
      streak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
    };
    login(user);
    trackEvent("waitlist_signup", plan);
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 900);
  };

  if (done) {
    return (
      <div className="soft-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-success" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">You are on the list, {name}</h2>
        <p className="text-ink-soft text-sm">Opening your web preview dashboard…</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-gold" : "bg-white/10"}`} />
        ))}
      </div>
      <div className="soft-card rounded-2xl p-6 md:p-8">
        {step === 1 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Your details</h2>
            <p className="text-sm text-ink-soft mb-6">We will use your name in every message.</p>
            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-gold"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-gold"
              />
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan("personal")}
                  className={`rounded-xl border p-4 text-left ${plan === "personal" ? "border-gold bg-accent-soft" : "border-white/10"}`}
                >
                  <p className="font-semibold text-sm">Personal</p>
                  <p className="text-xs text-muted">₹99/mo at launch</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPlan("parivaar")}
                  className={`rounded-xl border p-4 text-left ${plan === "parivaar" ? "border-gold bg-accent-soft" : "border-white/10"}`}
                >
                  <p className="font-semibold text-sm">Parivaar</p>
                  <p className="text-xs text-muted">₹249/mo at launch</p>
                </button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Focus areas</h2>
            <p className="text-sm text-ink-soft mb-6">Select up to three.</p>
            <div className="grid gap-2">
              {areaIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggle(id)}
                  className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium ${selected.includes(id) ? "border-gold bg-accent-soft" : "border-white/10"}`}
                >
                  {AREA_LABELS[id]}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted mb-2">Language</p>
              <div className="grid grid-cols-3 gap-2">
                {(["hinglish", "hindi", "english"] as Language[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`py-2 rounded-xl border text-xs font-semibold capitalize ${language === l ? "border-gold text-gold-light" : "border-white/10 text-muted"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Confirm</h2>
            <p className="text-sm text-ink-soft mb-6">
              Free web preview. We will email you when the mobile app and paid plans go live.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted">Name</span>
                <span>{name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted">Plan interest</span>
                <span className="capitalize">{plan}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Focus</span>
                <span className="text-right max-w-[60%]">{selected.map((a) => AREA_LABELS[a]).join(", ")}</span>
              </div>
            </div>
          </>
        )}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-ink-soft">
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button
              type="button"
              disabled={(step === 1 && (name.trim().length < 2 || !email.includes("@"))) || (step === 2 && selected.length < 1)}
              onClick={() => setStep(step + 1)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm disabled:opacity-40"
            >
              Continue
            </button>
          ) : (
            <button type="button" onClick={finish} className="btn-primary px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
              Open preview <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted mt-4">
        Already joined? <Link href="/login" className="text-gold-light">Sign in</Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="text-center mb-8 max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Join early access</h1>
        <p className="text-sm text-ink-soft">
          Preview RIZN on the web today. Get notified when the mobile app and subscriptions launch.
        </p>
      </div>
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
