"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  Wallet,
  Heart,
  Activity,
  Briefcase,
  Brain,
  Home,
  Check,
} from "lucide-react";

const lifeAreas = [
  { id: "finance", label: "Financial Stress", icon: Wallet },
  { id: "love", label: "Love & Relationships", icon: Heart },
  { id: "health", label: "Health & Body", icon: Activity },
  { id: "career", label: "Work & Career", icon: Briefcase },
  { id: "mind", label: "Mind & Mood", icon: Brain },
  { id: "family", label: "Family Life", icon: Home },
];

const times = [
  { id: "9-21", label: "9 AM — 9 PM (Recommended)", desc: "6 messages/day" },
  { id: "8-22", label: "8 AM — 10 PM", desc: "7 messages/day" },
  { id: "10-20", label: "10 AM — 8 PM", desc: "5 messages/day" },
];

function SignupForm() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") === "family" ? "family" : "individual";

  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<"individual" | "family">(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState("9-21");
  const [language, setLanguage] = useState("hinglish");
  const [done, setDone] = useState(false);

  const toggleArea = (id: string) => {
    setSelectedAreas((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const canProceed = () => {
    if (step === 1) return name.trim().length >= 2 && email.includes("@");
    if (step === 2) return selectedAreas.length >= 1;
    if (step === 3) return true;
    return true;
  };

  const handleSubmit = () => {
    setDone(true);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-gold rounded-3xl p-10 md:p-14 text-center max-w-lg mx-auto glow-gold"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-emerald-400" />
        </div>
        <h2 className="font-display text-3xl font-bold mb-3">
          Welcome, <span className="gradient-gold">{name}</span>! 🎉
        </h2>
        <p className="text-muted mb-2">
          Tumhara 7 din ka free trial shuru ho gaya hai.
        </p>
        <p className="text-sm text-gold-light mb-8">
          Pehla message kal subah 9 baje aayega — ready rehna!
        </p>
        <Link href="/dashboard" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full">
          Dashboard Dekho
          <ArrowRight size={18} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                s <= step ? "bg-gold text-background" : "bg-surface-elevated text-muted"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div className={`flex-1 h-0.5 mx-1 ${s < step ? "bg-gold" : "bg-surface-elevated"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-gold rounded-2xl p-6 md:p-8"
        >
          {step === 1 && (
            <>
              <h2 className="font-display text-2xl font-bold mb-2">Pehle tumhe jaanein</h2>
              <p className="text-sm text-muted mb-6">Taki har message tumhare naam ke saath aaye.</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Tumhara naam</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nirav"
                    className="w-full bg-surface border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tum@email.com"
                    className="w-full bg-surface border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted mb-1.5 block">Phone (optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-surface border border-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted mb-2 block">Plan choose karo</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPlan("individual")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        plan === "individual"
                          ? "border-gold bg-gold/10"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <User size={18} className="text-gold-light mb-2" />
                      <p className="text-sm font-semibold">Prerna Plan</p>
                      <p className="text-xs text-muted">₹99/month</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan("family")}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        plan === "family"
                          ? "border-gold bg-gold/10"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <Users size={18} className="text-gold-light mb-2" />
                      <p className="text-sm font-semibold">Parivaar Plan</p>
                      <p className="text-xs text-muted">₹249/month</p>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="font-display text-2xl font-bold mb-2">
                Kahan help chahiye, {name || "dost"}?
              </h2>
              <p className="text-sm text-muted mb-6">Max 3 areas choose karo — sabse important.</p>

              <div className="grid grid-cols-2 gap-3">
                {lifeAreas.map((area) => {
                  const selected = selectedAreas.includes(area.id);
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleArea(area.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected
                          ? "border-gold bg-gold/10"
                          : "border-gold/10 hover:border-gold/30"
                      }`}
                    >
                      <area.icon size={18} className="text-gold-light mb-2" />
                      <p className="text-xs font-medium">{area.label}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="font-display text-2xl font-bold mb-2">Kab messages aayein?</h2>
              <p className="text-sm text-muted mb-6">Apna schedule set karo.</p>

              <div className="space-y-3 mb-6">
                {times.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTime(t.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      selectedTime === t.id
                        ? "border-gold bg-gold/10"
                        : "border-gold/10 hover:border-gold/30"
                    }`}
                  >
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-muted">{t.desc}</p>
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs text-muted mb-2 block">Language</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "hinglish", label: "Hinglish" },
                    { id: "hindi", label: "Hindi" },
                    { id: "english", label: "English" },
                  ].map((lang) => (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => setLanguage(lang.id)}
                      className={`py-2.5 rounded-xl border text-xs font-medium transition-all ${
                        language === lang.id
                          ? "border-gold bg-gold/10 text-gold-light"
                          : "border-gold/10 text-muted hover:border-gold/30"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="font-display text-2xl font-bold mb-2">Sab ready hai!</h2>
              <p className="text-sm text-muted mb-6">Confirm karo aur apna free trial shuru karo.</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm py-2 border-b border-gold/10">
                  <span className="text-muted">Naam</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gold/10">
                  <span className="text-muted">Plan</span>
                  <span className="font-medium">
                    {plan === "individual" ? "Prerna Plan — ₹99/mo" : "Parivaar Plan — ₹249/mo"}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gold/10">
                  <span className="text-muted">Focus areas</span>
                  <span className="font-medium text-right text-xs">
                    {selectedAreas.map((a) => lifeAreas.find((la) => la.id === a)?.label).join(", ")}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-gold/10">
                  <span className="text-muted">Schedule</span>
                  <span className="font-medium text-xs">
                    {times.find((t) => t.id === selectedTime)?.label}
                  </span>
                </div>
                <div className="flex justify-between text-sm py-2">
                  <span className="text-muted">Trial</span>
                  <span className="font-medium text-emerald-400">7 din FREE</span>
                </div>
              </div>

              <p className="text-[10px] text-muted leading-relaxed">
                7 din ke baad {plan === "individual" ? "₹99" : "₹249"}/month charge hoga. Kabhi bhi
                cancel kar sakte ho. Card abhi nahi maangte — trial free hai.
              </p>
            </>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => canProceed() && setStep(step + 1)}
                disabled={!canProceed()}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full text-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Aage badho <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-full text-sm"
              >
                Free Trial Shuru Karo <ArrowRight size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
          Apni journey <span className="gradient-gold">shuru karo</span>
        </h1>
        <p className="text-muted text-sm">2 minute me setup — 7 din free</p>
      </div>
      <Suspense fallback={<div className="text-center text-muted">Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
