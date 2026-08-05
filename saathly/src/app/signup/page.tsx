"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AREA_LABELS } from "@/lib/templates";
import type { Language, LifeArea, PlanId } from "@/lib/types";
import { trialEndDate } from "@/lib/plans";
import { uid } from "@/lib/storage";
import { useSiteConfig } from "@/context/SiteConfigContext";

const areaIds = Object.keys(AREA_LABELS) as LifeArea[];

function QuickSignup() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login, trackEvent } = useApp();
  const config = useSiteConfig();
  const planParam = searchParams.get("plan");
  const initialPlan: PlanId =
    planParam === "family" || planParam === "parivaar" ? "parivaar" : "personal";

  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<LifeArea[]>(["finance", "mind"]);
  const [language, setLanguage] = useState<Language>("hinglish");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (id: LifeArea) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !email.includes("@") || selected.length < 1) return;
    setLoading(true);

    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), email: email.trim(), plan, areas: selected, language }),
    }).catch(() => null);

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
      trialEndsAt: trialEndDate(config.marketing.trialDays),
      subStatus: "trial" as const,
      referralCode: name.trim().toLowerCase().replace(/\s+/g, "").slice(0, 8) + Math.floor(Math.random() * 90 + 10),
      referredBy: searchParams.get("ref") || undefined,
      streak: 1,
      bestStreak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
    };
    login(user);
    trackEvent("waitlist_signup", plan);
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 800);
  };

  if (done) {
    return (
      <div className="soft-card rounded-2xl p-8 text-center max-w-md mx-auto">
        <Check size={32} className="text-success mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-2">Ho gaya, {name}!</h2>
        <p className="text-ink-soft text-sm">Tumhara pehla message dashboard pe…</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto soft-card rounded-2xl p-6 md:p-8 space-y-4">
      <div>
        <label className="text-xs text-muted block mb-1">Naam</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3"
          placeholder="Tumhara naam"
        />
      </div>
      <div>
        <label className="text-xs text-muted block mb-1">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3"
          placeholder="you@email.com"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPlan("personal")}
          className={`rounded-xl border p-3 text-left text-sm ${plan === "personal" ? "border-gold bg-accent-soft" : "border-white/10"}`}
        >
          Personal · ₹{config.marketing.earlyBirdPricePersonal}
        </button>
        <button
          type="button"
          onClick={() => setPlan("parivaar")}
          className={`rounded-xl border p-3 text-left text-sm ${plan === "parivaar" ? "border-gold bg-accent-soft" : "border-white/10"}`}
        >
          Parivaar · ₹{config.marketing.earlyBirdPriceParivaar}
        </button>
      </div>
      <div>
        <p className="text-xs text-muted mb-2">Focus (max 3)</p>
        <div className="flex flex-wrap gap-2">
          {areaIds.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => toggle(id)}
              className={`px-3 py-1.5 rounded-full text-xs ${selected.includes(id) ? "bg-gold text-black" : "bg-white/5 text-muted"}`}
            >
              {AREA_LABELS[id]}
            </button>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2">
        {loading ? "…" : "Start free preview"}
        <ArrowRight size={16} />
      </button>
      <p className="text-[11px] text-center text-muted">
        {config.marketing.trialDays} din preview · App launch pe notify · No payment now
      </p>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="pt-28 pb-24 px-4">
      <div className="text-center mb-8 max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">1 minute me shuru karo</h1>
        <p className="text-sm text-ink-soft">Naam, email, focus — bas. Turant dashboard pe pehla message.</p>
      </div>
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <QuickSignup />
      </Suspense>
      <p className="text-center text-xs text-muted mt-4">
        Account hai? <Link href="/login" className="text-gold-light">Sign in</Link>
      </p>
    </div>
  );
}
