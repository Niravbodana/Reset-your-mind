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
  loadState,
  peekState,
  saveState,
  setFamily,
  setPulses,
  setSessionLoggedOut,
  softLogout,
  track,
  upsertUser,
} from "@/lib/storage";
import { ensureTodayPulses, updateStreak } from "@/lib/scheduler";

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
  activatePaid: () => void;
  trackEvent: (name: string, meta?: string) => void;
};

const AppCtx = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<AppState>(emptyState());

  useEffect(() => {
    let s = loadState();
    if (s.user) {
      const user = updateStreak(s.user);
      const pulses = ensureTodayPulses(user, s.pulses);
      s = { ...s, user, pulses };
      saveState(s);
    }
    setState(s);
    setReady(true);
  }, []);

  const login = useCallback((user: UserProfile) => {
    setSessionLoggedOut(false);
    const pulses = ensureTodayPulses(user, []);
    setState(upsertUser({ ...emptyState(), pulses }, user));
  }, []);

  const restoreSession = useCallback(() => {
    setSessionLoggedOut(false);
    const parsed = peekState();
    if (!parsed.user) return false;
    const user = updateStreak(parsed.user);
    const pulses = ensureTodayPulses(user, parsed.pulses);
    const next = { ...parsed, user, pulses };
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
      const pulses = ensureTodayPulses(
        prev.user,
        prev.pulses.filter((p) => p.date !== new Date().toISOString().slice(0, 10))
      );
      return setPulses(prev, pulses);
    });
  }, []);

  const patchUser = useCallback((partial: Partial<UserProfile>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const user = { ...prev.user, ...partial };
      let next = upsertUser(prev, user);
      if (
        partial.softMode !== undefined ||
        partial.areas !== undefined ||
        partial.language !== undefined ||
        partial.wakeHour !== undefined ||
        partial.sleepHour !== undefined
      ) {
        const today = new Date().toISOString().slice(0, 10);
        const pulses = ensureTodayPulses(
          user,
          prev.pulses.filter((p) => p.date !== today)
        );
        next = setPulses(next, pulses);
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

  const activatePaid = useCallback(() => {
    setState((prev) => {
      if (!prev.user) return prev;
      return upsertUser(prev, { ...prev.user, subStatus: "active" });
    });
  }, []);

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
      activatePaid,
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
      activatePaid,
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
