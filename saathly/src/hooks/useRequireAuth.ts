"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export function useRequireAuth(redirectTo = "/signup") {
  const router = useRouter();
  const { ready, state } = useApp();

  useEffect(() => {
    if (ready && !state.user) router.replace(redirectTo);
  }, [ready, state.user, router, redirectTo]);

  return { ready, user: state.user };
}
