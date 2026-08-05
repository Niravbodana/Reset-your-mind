"use client";

import { BellRing } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import {
  getHabitDay,
  getHabitGoals,
  sleepNudge,
  stepNudge,
  waterNudge,
} from "@/lib/habits";

/** Caring nudges when goals incomplete — with customer's name */
export function GoalNudgeCard() {
  const { state, patchUser } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const goals = getHabitGoals(user);
  const day = getHabitDay(user);
  const hour = new Date().getHours();
  const soft = user.softMode;
  const lang = user.language;

  const nudges: string[] = [];

  // Evening step nudge if incomplete
  if (hour >= 17 && day.steps < goals.stepGoal) {
    nudges.push(stepNudge(user.name, day.steps, goals.stepGoal, lang, soft));
  }
  // Afternoon+ water nudge
  if (hour >= 14 && day.water < goals.waterGoal) {
    nudges.push(waterNudge(user.name, day.water, goals.waterGoal, lang));
  }
  // Sleep wind-down after target hour
  if (hour >= goals.sleepWindDownHour && !day.sleepDone) {
    nudges.push(sleepNudge(user.name, lang));
  }

  if (nudges.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl border border-gold/30 bg-gold/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <BellRing size={16} className="text-gold-light" />
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
          {isIN ? "Naam ke saath nudge" : "Nudge with your name"}
        </p>
      </div>
      <ul className="space-y-3">
        {nudges.map((n) => (
          <li
            key={n.slice(0, 40)}
            className="rounded-xl bg-black/40 border border-white/10 p-3 text-sm text-white/95 leading-relaxed"
          >
            {n}
          </li>
        ))}
      </ul>
      {day.steps < goals.stepGoal && (
        <button
          type="button"
          onClick={() => {
            const days = {
              ...(user.habitDays ?? {}),
              [new Date().toISOString().slice(0, 10)]: {
                ...day,
                steps: day.steps + 1000,
              },
            };
            patchUser({ habitDays: days });
          }}
          className="btn-primary mt-3 w-full rounded-xl py-3 text-xs font-bold min-h-[44px]"
        >
          {isIN ? "+1,000 steps log karo" : "Log +1,000 steps"}
        </button>
      )}
    </div>
  );
}
