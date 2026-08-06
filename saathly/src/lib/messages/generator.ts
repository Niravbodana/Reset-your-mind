import type { MessageTemplate } from "../message-format";
import type { LifeArea } from "../types";
import { RESPECTFUL_BODIES, OPENERS, CLOSINGS } from "./respectful-parts";

const AREAS: (LifeArea | "daily")[] = [
  "finance",
  "career",
  "health",
  "mind",
  "love",
  "family",
  "daily",
];
const SLOTS = ["morning", "midday", "afternoon", "evening", "night", "any"] as const;
const PER_SLOT = 250;

/** Compositional generator — 10,500 unique respectful messages (7 areas × 6 slots × 250). */
function buildGeneratedBank(): MessageTemplate[] {
  const bank: MessageTemplate[] = [];
  let seq = 1;

  for (const area of AREAS) {
    const bodies = RESPECTFUL_BODIES[area];
    for (const slot of SLOTS) {
      for (let i = 0; i < PER_SLOT; i++) {
        const body = bodies[i % bodies.length];
        const opener = OPENERS[i % OPENERS.length];
        const closing = CLOSINGS[(i + seq) % CLOSINGS.length];
        bank.push({
          id: `g${String(seq).padStart(5, "0")}`,
          area,
          slot,
          microAction: body.microAction,
          hinglish: `${opener.hinglish} ${body.hinglish} ${closing.hinglish}`,
          hindi: `${opener.hindi} ${body.hindi} ${closing.hindi}`,
          english: `${opener.english} ${body.english} ${closing.english}`,
        });
        seq++;
      }
    }
  }
  return bank;
}

let _cache: MessageTemplate[] | null = null;

export function getGeneratedMessageBank(): MessageTemplate[] {
  if (!_cache) _cache = buildGeneratedBank();
  return _cache;
}

export const MESSAGE_BANK_GENERATED = getGeneratedMessageBank();
