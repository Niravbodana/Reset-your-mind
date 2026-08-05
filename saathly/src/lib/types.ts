import type { PulseIntervalMinutes, ScheduleAnchors, TimeString } from "./schedule-config";
import type { SentMessageRecord } from "./message-format";

export type { PulseIntervalMinutes, ScheduleAnchors, TimeString, SentMessageRecord };
export type LifeArea = "finance" | "career" | "love" | "health" | "mind" | "family";
export type Language = "hinglish" | "hindi" | "english";
export type PlanId = "personal" | "parivaar" | "annual" | "work";
export type SubStatus = "trial" | "active" | "cancelled" | "expired";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  /** Optional — India mobile for WhatsApp / SMS alerts */
  phone?: string;
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
  /** Tracks sent message template ids — no repeat until pool cycles */
  sentHistory?: SentMessageRecord[];
  /** EMI reminders — alert 1 day before due date */
  emiReminders?: import("./emi-reminder").EmiReminder[];
  createdAt: string;
  trialEndsAt: string;
  subStatus: SubStatus;
  /** Razorpay subscription id — mandate for autopay after trial */
  razorpaySubscriptionId?: string;
  /** Monthly amount that will auto-debit after trial (INR) */
  autopayAmount?: number;
  /** When first / next autopay charge is expected */
  nextBillingAt?: string;
  /** True once UPI/card mandate authorized (live or demo) */
  autopayEnabled?: boolean;
  /** Soft pause — fewer/no pressure; resume after this ISO date */
  planPausedUntil?: string;
  referralCode: string;
  referredBy?: string;
  familyOwnerId?: string;
  streak: number;
  bestStreak: number;
  lastActiveDate?: string;
  /** YYYY-MM when streak freeze was used (1 free miss / month) */
  streakFreezeUsedMonth?: string;
  /** Accountability buddy for gentle check-ins */
  buddy?: {
    name: string;
    phone?: string;
    lastNudgeAt?: string;
  };
  /** Trial value report dismissed */
  trialReportDismissed?: boolean;
};

export type Pulse = {
  id: string;
  templateId?: string;
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
