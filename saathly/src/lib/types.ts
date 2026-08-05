import type { PulseIntervalMinutes, ScheduleAnchors, TimeString } from "./schedule-config";

export type LifeArea = "finance" | "career" | "love" | "health" | "mind" | "family";
export type Language = "hinglish" | "hindi" | "english";
export type PlanId = "personal" | "parivaar" | "annual" | "work";
export type SubStatus = "trial" | "active" | "cancelled" | "expired";

export type { PulseIntervalMinutes, ScheduleAnchors, TimeString };

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  plan: PlanId;
  areas: LifeArea[];
  language: Language;
  wakeHour: number;
  sleepHour: number;
  wakeTime?: TimeString;
  sleepTime?: TimeString;
  pulseIntervalMinutes?: PulseIntervalMinutes;
  scheduleAnchors?: ScheduleAnchors;
  softMode: boolean;
  weekendMode?: boolean;
  dndEnabled?: boolean;
  createdAt: string;
  trialEndsAt: string;
  subStatus: SubStatus;
  referralCode: string;
  referredBy?: string;
  familyOwnerId?: string;
  streak: number;
  bestStreak: number;
  lastActiveDate?: string;
};

export type Pulse = {
  id: string;
  timeLabel: string;
  hour: number;
  area: LifeArea | "daily";
  text: string;
  microAction: string;
  read: boolean;
  actionDone: boolean;
  date: string;
};

export type MoodCheckin = {
  id: string;
  score: number;
  emoji: string;
  at: string;
};

export type FamilyMember = {
  id: string;
  name: string;
  email: string;
  areas: LifeArea[];
};

export type AppState = {
  user: UserProfile | null;
  pulses: Pulse[];
  moods: MoodCheckin[];
  family: FamilyMember[];
  analytics: { events: { name: string; at: string; meta?: string }[] };
};
