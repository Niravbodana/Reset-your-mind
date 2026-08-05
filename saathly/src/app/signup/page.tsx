"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

const areas = [
  { id: "finance", label: "Paisa / EMI stress" },
  { id: "career", label: "Office burnout" },
  { id: "love", label: "Love / loneliness" },
  { id: "health", label: "Health ignore" },
  { id: "mind", label: "Overthinking / low mood" },
  { id: "family", label: "Family load" },
];

function SignupForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") === "family" ? "family" : "individual";
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<"individual" | "family">(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  if (done) {
    return (
      <div className="soft-card rounded-3xl p-8 md:p-10 text-center max-w-md mx-auto">
        <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-success" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-2">Welcome, {name}</h2>
        <p className="text-ink-soft mb-6">7 din free trial live. Pehla pulse morning window me.</p>
        <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl">
          Open dashboard <ArrowRight size={16} />
        </Link>
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
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tumhara naam"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-laser"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-laser"
              />
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlan("individual")}
                  className={`rounded-xl border p-4 text-left ${
                    plan === "individual" ? "border-laser bg-accent-soft" : "border-white/10"
                  }`}
                >
                  <p className="font-semibold text-sm">Personal</p>
                  <p className="text-xs text-muted">₹99/mo</p>
                </button>
                <button
                  type="button"
                  onClick={() => setPlan("family")}
                  className={`rounded-xl border p-4 text-left ${
                    plan === "family" ? "border-laser bg-accent-soft" : "border-white/10"
                  }`}
                >
                  <p className="font-semibold text-sm">Parivaar</p>
                  <p className="text-xs text-muted">₹249/mo</p>
                </button>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Kya heavy hai, {name || "dost"}?</h2>
            <p className="text-sm text-ink-soft mb-6">Max 3.</p>
            <div className="grid gap-2">
              {areas.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggle(a.id)}
                  className={`rounded-xl border px-4 py-3.5 text-left text-sm font-medium ${
                    selected.includes(a.id) ? "border-laser bg-accent-soft" : "border-white/10"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display text-2xl font-bold mb-1">Confirm</h2>
            <p className="text-sm text-ink-soft mb-6">7 din free. Card optional.</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted">Naam</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span className="text-muted">Plan</span>
                <span className="font-medium">
                  {plan === "individual" ? "Personal · ₹99" : "Parivaar · ₹249"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Focus</span>
                <span className="font-medium text-right max-w-[60%]">
                  {selected.map((id) => areas.find((a) => a.id === id)?.label).join(", ")}
                </span>
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
              disabled={
                (step === 1 && (name.trim().length < 2 || !email.includes("@"))) ||
                (step === 2 && selected.length < 1)
              }
              onClick={() => setStep(step + 1)}
              className="btn-primary px-5 py-2.5 rounded-xl text-sm disabled:opacity-40"
            >
              Next
            </button>
          ) : (
            <button type="button" onClick={() => setDone(true)} className="btn-primary px-5 py-2.5 rounded-xl text-sm">
              Start free
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="text-center mb-8">
        <h1 className="font-display text-3xl font-bold mb-2">Start your RIZN</h1>
        <p className="text-sm text-ink-soft">2 minute · 7 din free</p>
      </div>
      <Suspense fallback={<p className="text-center text-muted">Loading...</p>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
