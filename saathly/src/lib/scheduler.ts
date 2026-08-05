import type { Language, LifeArea, Pulse, UserProfile } from "./types";
import { pickTemplatesForDay, renderTemplate } from "./templates";
import { todayKey, uid } from "./storage";

const DEFAULT_HOURS = [9, 11, 13, 15, 17, 21];
const SOFT_HOURS = [9, 13, 17, 21];

function labelHour(h: number) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}:00 ${ampm}`;
}

export function generateDayPulses(user: UserProfile, date = todayKey()): Pulse[] {
  const hours = user.softMode ? SOFT_HOURS : DEFAULT_HOURS;
  const templates = pickTemplatesForDay(user.areas as LifeArea[], user.softMode);

  return hours.map((hour, i) => {
    const tpl = templates[i % templates.length];
    const rendered = renderTemplate(tpl, user.name, user.language as Language);
    return {
      id: uid("pulse"),
      timeLabel: labelHour(hour),
      hour,
      area: rendered.area,
      text: rendered.text,
      microAction: rendered.microAction,
      read: false,
      actionDone: false,
      date,
    };
  });
}

export function ensureTodayPulses(user: UserProfile, existing: Pulse[]): Pulse[] {
  const today = todayKey();
  const todays = existing.filter((p) => p.date === today);
  if (todays.length) return existing;
  return [...generateDayPulses(user, today), ...existing].slice(0, 90);
}

export function updateStreak(user: UserProfile): UserProfile {
  const today = todayKey();
  if (user.lastActiveDate === today) return user;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
  const streak = user.lastActiveDate === yKey ? user.streak + 1 : 1;
  return {
    ...user,
    streak,
    bestStreak: Math.max(user.bestStreak, streak),
    lastActiveDate: today,
  };
}
