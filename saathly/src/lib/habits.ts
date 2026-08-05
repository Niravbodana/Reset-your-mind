import type { Language, UserProfile } from "./types";
import { formatCustomerName } from "./message-format";

export const STEP_GOAL_OPTIONS = [3000, 5000, 8000, 10000] as const;

export const DEFAULT_HABIT_GOALS = {
  stepGoal: 8000,
  waterGoal: 8,
  sleepWindDownHour: 21,
};

export type HabitDay = {
  steps: number;
  water: number;
  sleepDone: boolean;
};

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function getHabitGoals(user: UserProfile) {
  return {
    stepGoal: user.habitGoals?.stepGoal ?? DEFAULT_HABIT_GOALS.stepGoal,
    waterGoal: user.habitGoals?.waterGoal ?? DEFAULT_HABIT_GOALS.waterGoal,
    sleepWindDownHour:
      user.habitGoals?.sleepWindDownHour ?? DEFAULT_HABIT_GOALS.sleepWindDownHour,
  };
}

export function getHabitDay(user: UserProfile, date = todayKey()): HabitDay {
  return user.habitDays?.[date] ?? { steps: 0, water: 0, sleepDone: false };
}

export function upsertHabitDay(
  user: UserProfile,
  patch: Partial<HabitDay>,
  date = todayKey()
): UserProfile {
  const prev = getHabitDay(user, date);
  const next: HabitDay = {
    steps: Math.max(0, patch.steps ?? prev.steps),
    water: Math.max(0, patch.water ?? prev.water),
    sleepDone: patch.sleepDone ?? prev.sleepDone,
  };
  return {
    ...user,
    habitDays: { ...(user.habitDays ?? {}), [date]: next },
  };
}

export function habitPct(current: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(100, Math.round((current / goal) * 100));
}

/** 0–100 weekly-ish score from today's habits + streak/mood/bills signals */
export function computeHealthScore(input: {
  steps: number;
  stepGoal: number;
  water: number;
  waterGoal: number;
  sleepDone: boolean;
  moodScore?: number; // 1–5
  billsPaidRatio?: number; // 0–1
  streak: number;
}): number {
  const stepP = habitPct(input.steps, input.stepGoal);
  const waterP = habitPct(input.water, input.waterGoal);
  const sleepP = input.sleepDone ? 100 : 0;
  const moodP = input.moodScore ? Math.round((input.moodScore / 5) * 100) : 50;
  const billP = Math.round((input.billsPaidRatio ?? 0.5) * 100);
  const streakP = Math.min(100, input.streak * 10);
  const raw =
    stepP * 0.3 + waterP * 0.2 + sleepP * 0.15 + moodP * 0.15 + billP * 0.1 + streakP * 0.1;
  return Math.round(raw);
}

export function stepNudge(
  name: string,
  steps: number,
  goal: number,
  language: Language,
  soft: boolean
): string {
  const n = formatCustomerName(name, language);
  const left = Math.max(0, goal - steps);
  if (language === "english") {
    if (soft) {
      return `${n}, ${steps.toLocaleString()} / ${goal.toLocaleString()} steps. Even a short walk counts — be kind to yourself.`;
    }
    return `${n}, ${steps.toLocaleString()} / ${goal.toLocaleString()} steps. About ${left.toLocaleString()} left — a 10-min walk is a real win. We're with you.`;
  }
  if (language === "hindi") {
    return soft
      ? `${n}, आज ${steps.toLocaleString("en-IN")} / ${goal.toLocaleString("en-IN")} कदम। छोटा टहलना भी काउंट होता है।`
      : `${n}, आज ${steps.toLocaleString("en-IN")} / ${goal.toLocaleString("en-IN")} कदम। लगभग ${left.toLocaleString("en-IN")} बाकी — 10 मिनट वॉक = जीत। हम साथ हैं।`;
  }
  return soft
    ? `${n}, aaj ${steps.toLocaleString("en-IN")} / ${goal.toLocaleString("en-IN")} steps. Chhota walk bhi count — soft raho.`
    : `${n}, aaj ${steps.toLocaleString("en-IN")} / ${goal.toLocaleString("en-IN")} steps. ~${left.toLocaleString("en-IN")} baaki — 10 min walk = win. Hum saath hain.`;
}

export function waterNudge(name: string, water: number, goal: number, language: Language): string {
  const n = formatCustomerName(name, language);
  const left = Math.max(0, goal - water);
  if (language === "english") {
    return `${n}, water ${water}/${goal} glasses. ${left} more keeps energy steady — one glass now.`;
  }
  if (language === "hindi") {
    return `${n}, पानी ${water}/${goal} गिलास। अभी एक गिलास — एनर्जी स्थिर रहेगी।`;
  }
  return `${n}, paani ${water}/${goal} glasses. Abhi ek glass — energy steady rahegi.`;
}

export function sleepNudge(name: string, language: Language): string {
  const n = formatCustomerName(name, language);
  if (language === "english") {
    return `${n}, wind-down time. Dim the screen, one deep breath — tomorrow needs a clear mind.`;
  }
  if (language === "hindi") {
    return `${n}, अब आराम का समय। स्क्रीन कम करें, एक गहरी साँस — कल साफ़ मन चाहिए।`;
  }
  return `${n}, wind-down time. Screen soft, ek deep breath — kal clear mind chahiye.`;
}

export function scoreLabel(score: number, language: Language): string {
  if (language === "english") {
    if (score >= 80) return "Strong day";
    if (score >= 55) return "Good progress";
    if (score >= 35) return "Building";
    return "Gentle start";
  }
  if (score >= 80) return "Strong day";
  if (score >= 55) return "Achha progress";
  if (score >= 35) return "Ban raha hai";
  return "Soft start";
}
