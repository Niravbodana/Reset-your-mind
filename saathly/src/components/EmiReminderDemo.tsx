"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2, Calendar, IndianRupee, User } from "lucide-react";
import Link from "next/link";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { icon: User, label: "Naam", value: "Rahul" },
  { icon: IndianRupee, label: "Amount", value: "₹12,500" },
  { icon: Calendar, label: "EMI date", value: "5 har mahine" },
  { icon: Building2, label: "Bank / NBFC", value: "HDFC Bank" },
];

export function EmiReminderDemo() {
  const [step, setStep] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setShowNotif(true);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!showNotif) return;
    const t = setInterval(() => {
      setShowNotif(false);
      setStep(0);
      setTimeout(() => setShowNotif(true), 800);
    }, 5000);
    return () => clearInterval(t);
  }, [showNotif]);

  const notifText = formatEmiNotification("Rahul", DEMO_EMI, "hinglish");

  return (
    <section id="emi-reminder" className="py-20 md:py-28 border-y border-white/5 bg-bg-elevated/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="section-label mb-3">EMI Reminder — included in ₹99 plan</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            EMI bhool gaye? <span className="text-gold-light">1 din pehle alert.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            Naam, amount, date, bank/NBFC — 30 second me set. Kal EMI hai to aaj hi notification —
            late fee se bacho, tension kam karo.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal delay={0.1}>
            <div className="soft-card rounded-2xl p-6 border border-gold/20">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-4">
                Easy setup — 4 fields
              </p>
              <div className="space-y-3">
                {STEPS.map((s, i) => (
                  <motion.div
                    key={s.label}
                    animate={{
                      opacity: i <= step ? 1 : 0.35,
                      scale: i === step ? 1.02 : 1,
                      borderColor: i <= step ? "rgba(201,162,39,0.4)" : "rgba(255,255,255,0.08)",
                    }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3"
                  >
                    <s.icon size={18} className="text-gold-light shrink-0" />
                    <div className="flex-1">
                      <p className="text-[10px] text-muted uppercase">{s.label}</p>
                      <p className="text-sm text-white font-medium">{s.value}</p>
                    </div>
                    {i <= step && (
                      <span className="text-success text-xs font-bold">✓</span>
                    )}
                  </motion.div>
                ))}
              </div>
              <Link
                href="/signup"
                className="btn-primary mt-6 w-full py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                ₹99 plan join karo — EMI reminder free
                <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative max-w-sm mx-auto">
              <p className="text-center text-xs text-muted mb-3">1 din pehle aisa notification</p>
              <AnimatePresence mode="wait">
                {showNotif ? (
                  <motion.div
                    key="notif"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl"
                  >
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black font-bold text-sm shrink-0">
                        R
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white mb-1">RIZN · EMI Reminder</p>
                        <p className="text-sm text-white/95 leading-relaxed">{notifText}</p>
                        <p className="text-[10px] text-gold-light mt-2">Kal due · Balance ready rakho</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wait"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-24 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-muted text-sm"
                  >
                    Form fill ho raha hai…
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="soft-card rounded-xl p-3">
                  <p className="text-red-300/90 font-medium">Pehle</p>
                  <p className="text-muted mt-1">Date miss, late fee, stress</p>
                </div>
                <div className="soft-card rounded-xl p-3 border border-gold/20">
                  <p className="text-success font-medium">Ab RIZN ke saath</p>
                  <p className="text-muted mt-1">1 din pehle alert, control me</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
