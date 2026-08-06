import type { PlanId } from "./types";

export const PLANS = {
  personal: {
    id: "personal" as PlanId,
    name: "Personal",
    price: 99,
    seats: 1,
    razorpayPlanEnv: "NEXT_PUBLIC_RAZORPAY_PLAN_PERSONAL",
  },
  parivaar: {
    id: "parivaar" as PlanId,
    name: "Parivaar",
    price: 249,
    seats: 4,
    razorpayPlanEnv: "NEXT_PUBLIC_RAZORPAY_PLAN_PARIVAAR",
  },
  annual: {
    id: "annual" as PlanId,
    name: "Annual",
    price: 999,
    seats: 1,
    razorpayPlanEnv: "NEXT_PUBLIC_RAZORPAY_PLAN_ANNUAL",
  },
  work: {
    id: "work" as PlanId,
    name: "Work",
    price: 129,
    seats: 50,
    razorpayPlanEnv: "NEXT_PUBLIC_RAZORPAY_PLAN_WORK",
  },
};

export function trialEndDate(days = 7) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export function isTrialActive(trialEndsAt: string) {
  return new Date(trialEndsAt).getTime() > Date.now();
}
