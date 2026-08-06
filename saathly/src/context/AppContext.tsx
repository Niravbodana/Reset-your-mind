"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AppState, FamilyMember, MoodCheckin, Pulse, UserProfile } from "@/lib/types";
import {
  addMood,
  clearPreviewData,
  emptyState,
  getStoredMessageBankVersion,
  loadState,
  peekState,
  saveState,
  setFamily,
  setPulses,
  setSessionLoggedOut,
  setStoredMessageBankVersion,
  softLogout,
  track,
  upsertUser,
} from "@/lib/storage";
import { MESSAGE_BANK_VERSION } from "@/lib/message-bank";
import {
  ensureTodayPulses,
  migrateUserSchedule,
  regenerateTodayPulses,
  updateStreak,
} from "@/lib/scheduler";

type Ctx = {
  ready: boolean;
  state: AppState;
  login: (user: UserProfile) => void;
  restoreSession: () => boolean;
  logout: () => void;
  clearAllData: () => void;
  refreshPulses: () => void;
  patchUser: (partial: Partial<UserProfile>) => void;
  markPulse: (id: string, patch: Partial<Pulse>) => void;
  checkinMood: (mood: MoodCheckin) => void;
  addFamilyMember: (m: FamilyMember) => void;
  removeFamilyMember: (id: string) => void;
  cancelSubscription: () => void;
  activatePaid: () => void;
  startTrialAutopay: (meta: {
    demo?: boolean;
    subscriptionId?: string;
    trialEndsAt?: string;
    trialDays?: number;
    amount?: number;
  }) => void;
  trackEvent: (name: string, meta?: string) => void;
};

const AppCtx = createContext<Ctx | null>(null);

function applyPulseGen(
  prev: AppState,
  user: UserProfile,
  gen: { pulses: Pulse[]; user: UserProfile }
): AppState {
  return setPulses(upsertUser(prev, gen.user), gen.pulses);
}

function syncMessageBankIfNeeded(s: AppState): AppState {
  if (!s.user) return s;
  const stored = getStoredMessageBankVersion();
  if (stored === MESSAGE_BANK_VERSION) return s;
  const user = migrateUserSchedule(s.user);
  const gen = regenerateTodayPulses(user, s.pulses);
  setStoredMessageBankVersion(MESSAGE_BANK_VERSION);
  return applyPulseGen(s, user, gen);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AppState>(emptyState());

  useEffect(() => {
    let s = loadState();
    if (s.user) {
      const migrated = migrateUserSchedule(s.user);
      const user = updateStreak(migrated);
      let gen = ensureTodayPulses(user, s.pulses);
      s = applyPulseGen(s, user, gen);
      s = syncMessageBankIfNeeded(s);
    }
    setState(s);
    setReady(true);
  }, []);

  const login = useCallback((user: UserProfile) => {
    setSessionLoggedOut(false);
    setStoredMessageBankVersion(MESSAGE_BANK_VERSION);
    const migrated = migrateUserSchedule(user);
    const gen = ensureTodayPulses(migrated, []);
    const next = applyPulseGen({ ...emptyState(), pulses: [] }, migrated, gen);
    saveState(next);
    setState(next);
  }, []);

  const restoreSession = useCallback(() => {
    setSessionLoggedOut(false);
    const parsed = peekState();
    if (!parsed.user) return false;
    const migrated = migrateUserSchedule(parsed.user);
    const user = updateStreak(migrated);
    const gen = ensureTodayPulses(user, parsed.pulses);
    const next = applyPulseGen(parsed, user, gen);
    saveState(next);
    setState(next);
    return true;
  }, []);

  const logout = useCallback(() => {
    softLogout();
    setState(emptyState());
  }, []);

  const clearAllData = useCallback(() => {
    clearPreviewData();
    setState(emptyState());
  }, []);

  const refreshPulses = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      const user = migrateUserSchedule(prev.user);
      const gen = regenerateTodayPulses(user, prev.pulses);
      setStoredMessageBankVersion(MESSAGE_BANK_VERSION);
      return applyPulseGen(prev, user, gen);
    });
  }, []);

  const patchUser = useCallback((partial: Partial<UserProfile>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const user = migrateUserSchedule({ ...prev.user, ...partial });
      let next = upsertUser(prev, user);
      if (
        partial.softMode !== undefined ||
        partial.areas !== undefined ||
        partial.language !== undefined ||
        partial.wakeHour !== undefined ||
        partial.sleepHour !== undefined ||
        partial.wakeTime !== undefined ||
        partial.sleepTime !== undefined ||
        partial.pulseIntervalMinutes !== undefined ||
        partial.scheduleAnchors !== undefined ||
        partial.emiReminders !== undefined
      ) {
        const gen = regenerateTodayPulses(user, prev.pulses);
        next = applyPulseGen(next, user, gen);
      }
      return next;
    });
  }, []);

  const markPulse = useCallback((id: string, patch: Partial<Pulse>) => {
    setState((prev) => {
      const pulses = prev.pulses.map((p) => (p.id === id ? { ...p, ...patch } : p));
      let next = setPulses(prev, pulses);
      if (prev.user && (patch.read || patch.actionDone)) {
        next = upsertUser(next, updateStreak(prev.user));
      }
      return track(next, "pulse_update", id);
    });
  }, []);

  const checkinMood = useCallback((mood: MoodCheckin) => {
    setState((prev) => addMood(prev, mood));
  }, []);

  const addFamilyMember = useCallback((m: FamilyMember) => {
    setState((prev) => setFamily(prev, [...prev.family, m].slice(0, 4)));
  }, []);

  const removeFamilyMember = useCallback((id: string) => {
    setState((prev) => setFamily(prev, prev.family.filter((m) => m.id !== id)));
  }, []);

  const cancelSubscription = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      return upsertUser(prev, {
        ...prev.user,
        subStatus: "cancelled",
        autopayEnabled: false,
        razorpaySubscriptionId: undefined,
        nextBillingAt: undefined,
        planPausedUntil: undefined,
      });
    });
  }, []);

  const activatePaid = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      return upsertUser(prev, { ...prev.user, subStatus: "active", autopayEnabled: true });
    });
  }, []);

  const startTrialAutopay = useCallback(
    (meta: {
      demo?: boolean;
      subscriptionId?: string;
      trialEndsAt?: string;
      trialDays?: number;
      amount?: number;
    }) => {
      setState((prev) => {
        if (!prev.user) return prev;
        const trialEndsAt = meta.trialEndsAt || prev.user.trialEndsAt;
        return upsertUser(prev, {
          ...prev.user,
          subStatus: "trial",
          trialEndsAt,
          razorpaySubscriptionId: meta.subscriptionId || prev.user.razorpaySubscriptionId,
          autopayAmount: meta.amount ?? prev.user.autopayAmount ?? 99,
          nextBillingAt: trialEndsAt,
          autopayEnabled: true,
        });
      });
    },
    []
  );

  const trackEvent = useCallback((name: string, meta?: string) => {
    setState((prev) => track(prev, name, meta));
  }, []);

  const value = useMemo(
    () => ({
      ready,
      state,
      login,
      restoreSession,
      logout,
      clearAllData,
      refreshPulses,
      patchUser,
      markPulse,
      checkinMood,
      addFamilyMember,
      removeFamilyMember,
      cancelSubscription,
      activatePaid,
      startTrialAutopay,
      trackEvent,
    }),
    [
      ready,
      state,
      login,
      restoreSession,
      logout,
      clearAllData,
      refreshPulses,
      patchUser,
      markPulse,
      checkinMood,
      addFamilyMember,
      removeFamilyMember,
      cancelSubscription,
      activatePaid,
      startTrialAutopay,
      trackEvent,
    ]
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
