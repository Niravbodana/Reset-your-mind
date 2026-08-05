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
  const initialPlan: PlanId =
    searchParams.get("plan") === "family" || searchParams.get("plan") === "parivaar"
      ? "parivaar"
      : "personal";

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
    trackEvent("signup_complete", plan);
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 900);
  };

  if (done) {
    return (
      <div className="soft-card rounded-3xl p-8 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-success" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-2">Welcome, {name}</h2>
        <p className="text-ink-soft">Trial live. Dashboard khol rahe hain…</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-laser" : "bg-white/10"}`} />
        ))}
      </div>
      <div className="soft-card rounded-3xl p-6 md:p-8">
        {step === 1 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Pehle naam</h2>
            <p className="text-sm text-ink-soft mb-6">Har pulse isi naam se aayega.</p>
            <div className="space-y-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Naam" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-laser" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-laser" />
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setPlan("personal")} className={`rounded-xl border p-4 text-left ${plan === "personal" ? "border-laser bg-accent-soft" : "border-white/10"}`}>
                  <p className="font-semibold text-sm">Personal</p>
                  <p className="text-xs text-muted">₹99/mo</p>
                </button>
                <button type="button" onClick={() => setPlan("parivaar")} className={`rounded-xl border p-4 text-left ${plan === "parivaar" ? "border-laser bg-accent-soft" : "border-white/10"}`}>
                  <p className="font-semibold text-sm">Parivaar</p>
                  <p className="text-xs text-muted">₹249/mo</p>
                </button>
              </div>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Kya heavy hai?</h2>
            <p className="text-sm text-ink-soft mb-6">Max 3 areas.</p>
            <div className="grid gap-2">
              {areaIds.map((id) => (
                <button key={id} type="button" onClick={() => toggle(id)} className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium ${selected.includes(id) ? "border-laser bg-accent-soft" : "border-white/10"}`}>
                  {AREA_LABELS[id]}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted mb-2">Language</p>
              <div className="grid grid-cols-3 gap-2">
                {(["hinglish", "hindi", "english"] as Language[]).map((l) => (
                  <button key={l} type="button" onClick={() => setLanguage(l)} className={`py-2 rounded-xl border text-xs font-semibold capitalize ${language === l ? "border-laser text-laser" : "border-white/10 text-muted"}`}>
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
            <p className="text-sm text-ink-soft mb-6">7 din free · local demo mode (no card)</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10"><span className="text-muted">Naam</span><span>{name}</span></div>
              <div className="flex justify-between py-2 border-b border-white/10"><span className="text-muted">Plan</span><span>{plan}</span></div>
              <div className="flex justify-between py-2"><span className="text-muted">Focus</span><span className="text-right max-w-[60%]">{selected.map((a) => AREA_LABELS[a]).join(", ")}</span></div>
            </div>
          </>
        )}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="flex items-center gap-1 text-sm text-ink-soft"><ArrowLeft size={16} /> Back</button>
          ) : <span />}
          {step < 3 ? (
            <button
              type="button"
              disabled={(step === 1 && (name.trim().length < 2 || !email.includes("@"))) || (step === 2 && selected.length < 1)}
              onClick={() => setStep(step + 1)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button type="button" onClick={finish} className="btn-primary px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
              Start free <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted mt-4">
        Already have account? <Link href="/login" className="text-laser-2">Login</Link>
      </p>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Start your RIZN</h1>
        <p className="text-sm text-ink-soft">Phases F–G · Auth + Onboarding</p>
      </div>
      <Suspense fallback={<p className="text-center text-muted">Loading...</p>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
