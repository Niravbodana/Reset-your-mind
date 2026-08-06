import type { Language, LifeArea, Pulse, UserProfile } from "./types";
import { renderMessage, pickTemplatesForSlots } from "./templates";
import { todayKey, uid } from "./storage";
import { formatEmiNotification, getEmiRemindersDueTomorrow } from "./emi-messages";
import {
  type PulseIntervalMinutes,
  type ScheduleAnchors,
  type TimeString,
  DEFAULT_INTERVAL,
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
    sentHistory: user.sentHistory ?? [],
    emiReminders: user.emiReminders ?? [],
  };
}

export function buildPulseSchedule(
  wakeTime: TimeString,
  sleepTime: TimeString,
  intervalMinutes: PulseIntervalMinutes,
  anchors: ScheduleAnchors,
  softMode: boolean
): TimeString[] {
  const wake = parseTimeToMinutes(wakeTime);
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

function buildEmiPulses(
  user: UserProfile,
  date: string,
  timeLabel: string,
  hour: number
): Pulse[] {
  const emiDue = getEmiRemindersDueTomorrow(user.emiReminders);
  const lang = (user.language ?? "hinglish") as Language;
  return emiDue.map((emi) => ({
    id: uid("emi"),
    templateId: `emi-${emi.id}`,
    timeLabel,
    hour,
    area: "finance" as const,
    text: formatEmiNotification(user.name, emi, lang),
    microAction: "EMI balance check — aaram se",
    read: false,
    actionDone: false,
    date,
  }));
}

function mergeEmiPulses(user: UserProfile, pulses: Pulse[], date: string): Pulse[] {
  const timeLabel = pulses[0]?.timeLabel ?? formatTimeLabel(user.wakeTime ?? "09:00");
  const hour = pulses[0]?.hour ?? 9;
  const existing = new Set(
    pulses.filter((p) => p.templateId?.startsWith("emi-")).map((p) => p.templateId)
  );
  const fresh = buildEmiPulses(user, date, timeLabel, hour).filter(
    (p) => !existing.has(p.templateId)
  );
  if (!fresh.length) return pulses;
  return [...fresh, ...pulses];
}

export function generateDayPulses(
  user: UserProfile,
  date = todayKey()
): { pulses: Pulse[]; user: UserProfile } {
  const u = migrateUserSchedule(user);
  const times = buildPulseSchedule(
    u.wakeTime!,
    u.sleepTime!,
    u.pulseIntervalMinutes ?? DEFAULT_INTERVAL,
    u.scheduleAnchors ?? {},
    u.softMode
  );

  const hours = times.map((t) => Math.floor(parseTimeToMinutes(t) / 60));
  const areas = (u.areas?.length ? u.areas : ["mind", "health", "finance"]) as LifeArea[];

  const { templates, newHistory } = pickTemplatesForSlots(
    areas,
    hours,
    u.sentHistory ?? [],
    u.softMode
  );

  const pulses: Pulse[] = times.map((time, i) => {
    const tpl = templates[i] ?? templates[i % templates.length];
    const hour = hours[i];
    if (!tpl) {
      return {
        id: uid("pulse"),
        timeLabel: formatTimeLabel(time),
        hour,
        area: "daily",
        text: `${u.name}, aaj ek chhota step — hum saath hain.`,
        microAction: "Ek deep breath",
        read: false,
        actionDone: false,
        date,
      };
    }
    const rendered = renderMessage(tpl, u.name, u.language as Language);
    return {
      id: uid("pulse"),
      templateId: rendered.templateId,
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

  // EMI reminders due tomorrow — respectful morning notification (1 day before)
  const emiPulses = buildEmiPulses(
    u,
    date,
    formatTimeLabel(times[0] ?? u.wakeTime ?? "09:00"),
    hours[0] ?? 9
  );
  for (const emiPulse of emiPulses) {
    pulses.unshift(emiPulse);
  }

  return {
    pulses,
    user: { ...u, sentHistory: newHistory },
  };
}

export function ensureTodayPulses(user: UserProfile, existing: Pulse[]): { pulses: Pulse[]; user: UserProfile } {
  const today = todayKey();
  const u = migrateUserSchedule(user);
  const todays = existing.filter((p) => p.date === today);

  if (!todays.length) {
    const { pulses: newPulses, user: updated } = generateDayPulses(u, today);
    return { pulses: [...newPulses, ...existing].slice(0, 120), user: updated };
  }

  const withEmi = mergeEmiPulses(u, existing, today);
  if (withEmi.length !== existing.length) {
    return { pulses: withEmi.slice(0, 120), user: u };
  }

  return { pulses: existing, user: u };
}

export function regenerateTodayPulses(
  user: UserProfile,
  existing: Pulse[]
): { pulses: Pulse[]; user: UserProfile } {
  const today = todayKey();
  const rest = existing.filter((p) => p.date !== today);
  const { pulses: newPulses, user: updated } = generateDayPulses(user, today);
  return { pulses: [...newPulses, ...rest].slice(0, 120), user: updated };
}

export function updateStreak(user: UserProfile): UserProfile {
  const today = todayKey();
  if (user.lastActiveDate === today) return user;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);

  const dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 2);
  const dBeforeKey = dayBefore.toISOString().slice(0, 10);

  const month = today.slice(0, 7);
  let streakFreezeUsedMonth = user.streakFreezeUsedMonth;
  let usedFreeze = false;
  let streak = 1;

  if (user.lastActiveDate === yKey) {
    streak = user.streak + 1;
  } else if (user.lastActiveDate === dBeforeKey && user.streak > 0) {
    // Missed exactly 1 day — 1 freeze per calendar month
    if (streakFreezeUsedMonth !== month) {
      streak = user.streak + 1;
      streakFreezeUsedMonth = month;
      usedFreeze = true;
    } else {
      streak = 1;
    }
  }

  return {
    ...user,
    streak,
    bestStreak: Math.max(user.bestStreak, streak),
    lastActiveDate: today,
    streakFreezeUsedMonth,
    // stash a flag in analytics via optional field consumers can read
    ...(usedFreeze ? {} : {}),
  };
}

/** True if user still has this month's streak freeze */
export function hasStreakFreeze(user: UserProfile): boolean {
  const month = todayKey().slice(0, 7);
  return user.streakFreezeUsedMonth !== month;
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
