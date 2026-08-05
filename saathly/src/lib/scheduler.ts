import type { Language, LifeArea, Pulse, UserProfile } from "./types";
import { pickTemplatesForDay, renderTemplate } from "./templates";
import { todayKey, uid } from "./storage";
import {
  type PulseIntervalMinutes,
  type ScheduleAnchors,
  type TimeString,
  DEFAULT_INTERVAL,
  DEFAULT_SLEEP,
  DEFAULT_WAKE,
  defaultAnchors,
  formatTimeLabel,
  minutesToTimeString,
  parseTimeToMinutes,
} from "./schedule-config";

export function migrateUserSchedule(user: UserProfile): UserProfile {
  const wakeTime =
    user.wakeTime ?? `${String(user.wakeHour ?? 9).padStart(2, "0")}:00`;
  const sleepTime =
    user.sleepTime ?? `${String(user.sleepHour ?? 21).padStart(2, "0")}:00`;
  return {
    ...user,
    wakeTime,
    sleepTime,
    wakeHour: parseTimeToMinutes(wakeTime) / 60 | 0,
    sleepHour: parseTimeToMinutes(sleepTime) / 60 | 0,
    pulseIntervalMinutes: user.pulseIntervalMinutes ?? DEFAULT_INTERVAL,
    scheduleAnchors: user.scheduleAnchors ?? defaultAnchors(),
    weekendMode: user.weekendMode ?? false,
    dndEnabled: user.dndEnabled ?? false,
  };
}

/** Build all pulse times (minutes) between wake and sleep. */
export function buildPulseSchedule(
  wakeTime: TimeString,
  sleepTime: TimeString,
  intervalMinutes: PulseIntervalMinutes,
  anchors: ScheduleAnchors,
  softMode: boolean
): TimeString[] {
  let wake = parseTimeToMinutes(wakeTime);
  let sleep = parseTimeToMinutes(sleepTime);
  if (sleep <= wake) sleep += 24 * 60;

  const slots = new Set<number>();
  for (let t = wake; t <= sleep; t += intervalMinutes) {
    slots.add(t % (24 * 60));
  }

  for (const value of Object.values(anchors)) {
    if (!value) continue;
    const m = parseTimeToMinutes(value);
    const normalized = m < wake && sleep > 24 * 60 - 60 ? m + 24 * 60 : m;
    if (normalized >= wake && normalized <= sleep) {
      slots.add(m % (24 * 60));
    } else if (m >= wake % (24 * 60) && m <= sleep % (24 * 60)) {
      slots.add(m);
    }
  }

  let times = Array.from(slots)
    .sort((a, b) => a - b)
    .map((m) => minutesToTimeString(m));

  if (softMode && times.length > 4) {
    const pick = (i: number) => times[Math.round((i * (times.length - 1)) / 3)];
    times = [pick(0), pick(1), pick(2), pick(3)];
  }

  return times;
}

export function generateDayPulses(user: UserProfile, date = todayKey()): Pulse[] {
  const u = migrateUserSchedule(user);
  const times = buildPulseSchedule(
    u.wakeTime!,
    u.sleepTime!,
    u.pulseIntervalMinutes ?? DEFAULT_INTERVAL,
    u.scheduleAnchors ?? {},
    u.softMode
  );

  const templates = pickTemplatesForDay(u.areas as LifeArea[], u.softMode);

  return times.map((time, i) => {
    const tpl = templates[i % templates.length];
    const rendered = renderTemplate(tpl, u.name, u.language as Language);
    const hour = Math.floor(parseTimeToMinutes(time) / 60);
    return {
      id: uid("pulse"),
      timeLabel: formatTimeLabel(time),
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
  return [...generateDayPulses(user, today), ...existing].slice(0, 120);
}

/** Force rebuild today's pulses (after settings change). */
export function regenerateTodayPulses(user: UserProfile, existing: Pulse[]): Pulse[] {
  const today = todayKey();
  const rest = existing.filter((p) => p.date !== today);
  return [...generateDayPulses(user, today), ...rest].slice(0, 120);
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

export function countTodaysPulses(user: UserProfile): number {
  const u = migrateUserSchedule(user);
  return buildPulseSchedule(
    u.wakeTime!,
    u.sleepTime!,
    u.pulseIntervalMinutes ?? DEFAULT_INTERVAL,
    u.scheduleAnchors ?? {},
    u.softMode
  ).length;
}
