import type { Language, LifeArea } from "./types";

type Tpl = {
  area: LifeArea | "daily";
  microAction: string;
  hinglish: string;
  hindi: string;
  english: string;
};

const T: Tpl[] = [
  {
    area: "daily",
    microAction: "Ek clear intention likho",
    hinglish: "{name}, naya din. Aaj ek intention choose karo — rise yahi se start.",
    hindi: "{name}, नया दिन है। आज एक इरादा चुनो — यहीं से आगे बढ़ो।",
    english: "{name}, new day. Pick one intention — rise starts here.",
  },
  {
    area: "career",
    microAction: "25 min focus block",
    hinglish: "{name}, focus pulse. Ek important kaam 25 min — baaki noise mute.",
    hindi: "{name}, फोकस करो। एक ज़रूरी काम 25 मिनट — बाकी शोर बंद।",
    english: "{name}, focus pulse. One important task for 25 min — mute the noise.",
  },
  {
    area: "health",
    microAction: "Khana / paani check",
    hinglish: "{name}, body battery check. Khana khaya? Paani piya? Recharge pehle.",
    hindi: "{name}, शरीर चेक। खाना खाया? पानी पिया? पहले रिचार्ज।",
    english: "{name}, body check. Food? Water? Recharge first.",
  },
  {
    area: "finance",
    microAction: "₹50 side me rakh",
    hinglish: "{name}, money noise normal hai. Aaj ₹50 side — chhota step, bada future.",
    hindi: "{name}, पैसे की चिंता सामान्य है। आज ₹50 बचाओ — छोटा कदम।",
    english: "{name}, money stress is normal. Save ₹50 today — small step, big future.",
  },
  {
    area: "mind",
    microAction: "2 min deep breath",
    hinglish: "{name}, dip shield on. Thakaan aayi to theek. 2 min breath, phir wapas.",
    hindi: "{name}, थकान आना ठीक है। 2 मिनट साँस लो, फिर लौटो।",
    english: "{name}, energy dip is normal. Two minutes of breath, then return.",
  },
  {
    area: "love",
    microAction: "1 kind message / self note",
    hinglish: "{name}, dil heavy ho to soft raho. Tu akela nahi. Ek kind step aaj.",
    hindi: "{name}, दिल भारी हो तो नरम रहो। तुम अकेले नहीं। आज एक अच्छा कदम।",
    english: "{name}, if the heart is heavy, go soft. You are not alone. One kind step today.",
  },
  {
    area: "family",
    microAction: "5 min sirf apne liye",
    hinglish: "{name}, sab sambhalte ho. Aaj 5 min sirf apne liye — tu enough hai.",
    hindi: "{name}, सब संभालते हो। आज 5 मिनट सिर्फ अपने लिए।",
    english: "{name}, you hold so much. Take 5 minutes just for you — you are enough.",
  },
  {
    area: "career",
    microAction: "Shutdown: laptop band",
    hinglish: "{name}, shutdown calm. Din wrap. Proud feel. Phone side, rest.",
    hindi: "{name}, दिन समेटो। गर्व करो। फ़ोन दूर, आराम।",
    english: "{name}, shutdown calm. Close the day proud. Phone aside, rest.",
  },
  {
    area: "finance",
    microAction: "1 bill / expense note",
    hinglish: "{name}, EMI soch se panic mat. Ek chhoti list bana — control wapas.",
    hindi: "{name}, घबराहट नहीं। छोटी लिस्ट बनाओ — नियंत्रण वापस।",
    english: "{name}, don't panic about bills. Make a tiny list — take control back.",
  },
  {
    area: "health",
    microAction: "10 min walk",
    hinglish: "{name}, 10 min walk = mind clear. Body online rakh.",
    hindi: "{name}, 10 मिनट वॉक = दिमाग साफ़।",
    english: "{name}, a 10-minute walk clears the mind. Keep the body online.",
  },
  {
    area: "mind",
    microAction: "Heavy-day soft mode",
    hinglish: "{name}, aaj heavy hai to soft mode. Kam pressure, zyada care.",
    hindi: "{name}, आज भारी है तो नरम मोड। कम दबाव, ज़्यादा देखभाल।",
    english: "{name}, heavy day? Soft mode. Less pressure, more care.",
  },
  {
    area: "love",
    microAction: "Journal 3 lines",
    hinglish: "{name}, feeling likho 3 line. Release = rise.",
    hindi: "{name}, तीन पंक्तियाँ लिखो। निकलना = आगे बढ़ना।",
    english: "{name}, write three lines. Release is how you rise.",
  },
];

export function renderTemplate(
  tpl: Tpl,
  name: string,
  language: Language
): { text: string; microAction: string; area: LifeArea | "daily" } {
  const raw = tpl[language] || tpl.hinglish;
  return {
    text: raw.replaceAll("{name}", name),
    microAction: tpl.microAction,
    area: tpl.area,
  };
}

export function pickTemplatesForDay(areas: LifeArea[], softMode: boolean): Tpl[] {
  const daily = T.filter((t) => t.area === "daily");
  const areaSet = new Set(areas.length ? areas : (["career", "health", "finance"] as LifeArea[]));
  const matched = T.filter((t) => t.area !== "daily" && areaSet.has(t.area as LifeArea));
  const pool = [...daily, ...matched, ...T];
  const count = softMode ? 4 : 6;
  const out: Tpl[] = [];
  for (let i = 0; i < count; i++) out.push(pool[i % pool.length]);
  return out;
}

export const AREA_LABELS: Record<LifeArea, string> = {
  finance: "Paisa / EMI",
  career: "Burnout / Work",
  love: "Love / Loneliness",
  health: "Health",
  mind: "Overthinking",
  family: "Family load",
};
