"use client";

import { useEffect, useRef, useState } from "react";
import { Droplets, Footprints, Moon, Plus, Minus } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import {
  DEFAULT_HABIT_GOALS,
  STEP_GOAL_OPTIONS,
  getHabitDay,
  getHabitGoals,
  habitPct,
  todayKey,
  upsertHabitDay,
} from "@/lib/habits";
import { haptic } from "@/lib/haptic";

export function HabitsPanel() {
  const { state, patchUser, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const goals = getHabitGoals(user);
  const day = getHabitDay(user);
  const [tracking, setTracking] = useState(false);
  const lastPeak = useRef(0);
  const stepBuf = useRef(day.steps);

  useEffect(() => {
    stepBuf.current = day.steps;
  }, [day.steps]);

  // Live-ish step tracking via device motion (when user starts a walk)
  useEffect(() => {
    if (!tracking) return;

    const onMotion = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a || a.x == null || a.y == null || a.z == null) return;
      const mag = Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z);
      const now = Date.now();
      if (mag > 12 && now - lastPeak.current > 350) {
        lastPeak.current = now;
        stepBuf.current += 1;
        if (stepBuf.current % 5 === 0) {
          const next = upsertHabitDay(user, { steps: stepBuf.current });
          patchUser({ habitDays: next.habitDays });
        }
      }
    };

    const start = async () => {
      const DM = DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof DM.requestPermission === "function") {
        try {
          const res = await DM.requestPermission();
          if (res !== "granted") {
            setTracking(false);
            return;
          }
        } catch {
          setTracking(false);
          return;
        }
      }
      window.addEventListener("devicemotion", onMotion);
    };

    void start();
    return () => {
      window.removeEventListener("devicemotion", onMotion);
      const next = upsertHabitDay(user, { steps: stepBuf.current });
      patchUser({ habitDays: next.habitDays });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracking]);

  const setSteps = (steps: number) => {
    haptic("light");
    const next = upsertHabitDay(user, { steps });
    patchUser({ habitDays: next.habitDays });
    trackEvent("habit_steps", String(steps));
  };

  const setWater = (water: number) => {
    haptic("light");
    const next = upsertHabitDay(user, { water: Math.min(goals.waterGoal + 4, water) });
    patchUser({ habitDays: next.habitDays });
    trackEvent("habit_water", String(water));
  };

  const setSleep = (sleepDone: boolean) => {
    haptic("success");
    const next = upsertHabitDay(user, { sleepDone });
    patchUser({ habitDays: next.habitDays });
    trackEvent("habit_sleep", sleepDone ? "done" : "undo");
  };

  const setStepGoal = (stepGoal: number) => {
    haptic("medium");
    patchUser({
      habitGoals: {
        ...(user.habitGoals ?? DEFAULT_HABIT_GOALS),
        stepGoal,
        waterGoal: goals.waterGoal,
        sleepWindDownHour: goals.sleepWindDownHour,
      },
    });
  };

  const stepP = habitPct(day.steps, goals.stepGoal);
  const waterP = habitPct(day.water, goals.waterGoal);
  const hour = new Date().getHours();
  const sleepDue = hour >= goals.sleepWindDownHour;

  return (
    <div className="space-y-4 mb-6">
      {/* Steps */}
      <div className="premium-card rounded-2xl p-4 sm:p-5 border border-gold/25">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Footprints size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {isIN ? "Steps goal" : "Steps goal"}
              </p>
              <p className="text-xs text-ink-soft">
                {day.steps.toLocaleString()} / {goals.stepGoal.toLocaleString()} · {stepP}%
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setTracking((t) => !t);
              haptic("medium");
              trackEvent("walk_track", tracking ? "stop" : "start");
            }}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold min-h-[32px] ${
              tracking ? "bg-gold text-black" : "bg-white/10 text-white"
            }`}
          >
            {tracking
              ? isIN
                ? "Walk ON"
                : "Walk ON"
              : isIN
                ? "Live walk"
                : "Live walk"}
          </button>
        </div>

        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-dark to-gold-light transition-all duration-500"
            style={{ width: `${stepP}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {STEP_GOAL_OPTIONS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setStepGoal(g)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-semibold min-h-[32px] ${
                goals.stepGoal === g
                  ? "bg-gold text-black"
                  : "border border-white/10 text-white/70"
              }`}
            >
              {(g / 1000).toFixed(0)}k
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSteps(Math.max(0, day.steps - 500))}
            className="btn-secondary rounded-xl px-3 py-2.5 min-h-[44px]"
            aria-label="Minus 500"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={() => setSteps(day.steps + 500)}
            className="btn-secondary rounded-xl px-3 py-2.5 text-xs font-semibold min-h-[44px] inline-flex items-center gap-1"
          >
            <Plus size={14} /> 500
          </button>
          <button
            type="button"
            onClick={() => setSteps(day.steps + 1000)}
            className="btn-primary rounded-xl px-3 py-2.5 text-xs font-bold min-h-[44px]"
          >
            +1,000 walk
          </button>
        </div>
        {tracking && (
          <p className="text-[11px] text-gold-light mt-2">
            {isIN
              ? "Phone pocket me rakho — steps live count ho rahe hain."
              : "Keep the phone in your pocket — steps are counting live."}
          </p>
        )}
      </div>

      {/* Water */}
      <div className="soft-card rounded-2xl p-4 border border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-300">
            <Droplets size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              {isIN ? "Paani / Water" : "Water goal"}
            </p>
            <p className="text-xs text-ink-soft">
              {day.water}/{goals.waterGoal} {isIN ? "glasses" : "glasses"} · {waterP}%
            </p>
          </div>
        </div>
        <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
          <div
            className="h-full rounded-full bg-sky-400 transition-all duration-500"
            style={{ width: `${waterP}%` }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: goals.waterGoal }).map((_, i) => {
            const filled = i < day.water;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setWater(filled ? i : i + 1)}
                className={`h-9 w-9 rounded-lg border text-sm min-h-[36px] ${
                  filled
                    ? "bg-sky-400/30 border-sky-300/50 text-sky-100"
                    : "border-white/10 text-white/30"
                }`}
                aria-label={`Glass ${i + 1}`}
              >
                💧
              </button>
            );
          })}
        </div>
      </div>

      {/* Sleep wind-down */}
      <div
        className={`soft-card rounded-2xl p-4 border ${
          sleepDue && !day.sleepDone ? "border-violet-400/35 bg-violet-500/5" : "border-white/10"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
            <Moon size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">
              {isIN ? "Sleep wind-down" : "Sleep wind-down"}
            </p>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              {day.sleepDone
                ? isIN
                  ? "Done — kal ke liye clear mind. Proud."
                  : "Done — clear mind for tomorrow. Proud of you."
                : isIN
                  ? `${goals.sleepWindDownHour}:00 ke baad screen soft + ek deep breath.`
                  : `After ${goals.sleepWindDownHour}:00 — soft screen + one deep breath.`}
            </p>
            <button
              type="button"
              onClick={() => setSleep(!day.sleepDone)}
              className={`mt-3 rounded-xl px-4 py-2.5 text-xs font-bold min-h-[44px] ${
                day.sleepDone ? "btn-secondary" : "btn-primary"
              }`}
            >
              {day.sleepDone
                ? isIN
                  ? "Undo"
                  : "Undo"
                : isIN
                  ? "Wind-down complete"
                  : "Mark wind-down done"}
            </button>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-muted text-center">{todayKey()}</p>
    </div>
  );
}
