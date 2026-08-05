import type { Language } from "./types";
import type { EmiReminder } from "./emi-reminder";
import { formatCustomerName } from "./message-format";

/** Respectful EMI notification templates — supportive, never guilt or fear. */
export type EmiMessageTemplate = {
  id: string;
  hinglish: string;
  hindi: string;
  english: string;
};

export const EMI_MESSAGE_TEMPLATES: EmiMessageTemplate[] = [
  {
    id: "emi01",
    hinglish:
      "{name}, kal ₹{amt} ki EMI due hai ({label}) — {bank}. Tension mat lijiye, aap powerful hain — balance check kar lena, sab set ho jayega. Hum saath hain.",
    hindi:
      "{name}, कल ₹{amt} की EMI due है ({label}) — {bank}। तनाव मत लीजिए, आप सक्षम हैं — बैलेंस देख लीजिए, सब ठीक हो जाएगा। हम साथ हैं।",
    english:
      "{name}, tomorrow ₹{amt} EMI is due ({label}) — {bank}. Please do not stress — you are capable. A balance check today will help. We are with you.",
  },
  {
    id: "emi02",
    hinglish:
      "{name}, gentle reminder — kal ₹{amt} EMI ({label}), {bank}. Aap yeh handle kar sakte hain. Aaj balance dekh lijiye, prepared feel karenge.",
    hindi:
      "{name}, कोमल याद — कल ₹{amt} EMI ({label}), {bank}। आप यह संभाल सकते हैं। आज बैलेंस देख लीजिए।",
    english:
      "{name}, gentle reminder — tomorrow ₹{amt} EMI ({label}), {bank}. You can handle this. Check balance today to feel prepared.",
  },
  {
    id: "emi03",
    hinglish:
      "{name}, kal ₹{amt} ki EMI hai — {label}, {bank}. Koi panic nahi — chhota reminder, aap capable hain. Balance ready rakh lijiye, aaram se.",
    hindi:
      "{name}, कल ₹{amt} EMI — {label}, {bank}। घबराहट नहीं — छोटा संदेश, आप सक्षम हैं। बैलेंस तैयार रखिए।",
    english:
      "{name}, tomorrow ₹{amt} EMI — {label}, {bank}. No panic — just a small reminder. You are capable. Keep balance ready, calmly.",
  },
  {
    id: "emi04",
    hinglish:
      "{name}, EMI reminder with care — kal ₹{amt} ({label}), {bank}. Aap responsible hain aur strong bhi. Aaj balance check = kal peace.",
    hindi:
      "{name}, देखभाल भरा EMI संदेश — कल ₹{amt} ({label}), {bank}। आप ज़िम्मेदार और मजबूत हैं। आज बैलेंस = कल शांति।",
    english:
      "{name}, EMI reminder with care — tomorrow ₹{amt} ({label}), {bank}. You are responsible and strong. Balance check today means peace tomorrow.",
  },
  {
    id: "emi05",
    hinglish:
      "{name}, kal ₹{amt} EMI due — {label} ({bank}). Tension normal hai, par aap isse manage kar lenge. Hum believe karte hain aap me.",
    hindi:
      "{name}, कल ₹{amt} EMI — {label} ({bank})। तनाव सामान्य है, पर आप संभाल लेंगे। हम आप पर भरोसा करते हैं।",
    english:
      "{name}, tomorrow ₹{amt} EMI due — {label} ({bank}). Stress is normal, but you will manage. We believe in you.",
  },
  {
    id: "emi06",
    hinglish:
      "{name}, 1 din pehle reminder — kal ₹{amt} EMI ({label}), {bank}. Aapne pehle bhi manage kiya hai. Aaj balance dekh lijiye, confidence badhega.",
    hindi:
      "{name}, 1 दिन पहले — कल ₹{amt} EMI ({label}), {bank}। आपने पहले भी संभाला है। आज बैलेंस देखिए।",
    english:
      "{name}, one-day reminder — tomorrow ₹{amt} EMI ({label}), {bank}. You have managed before. Check balance today for confidence.",
  },
  {
    id: "emi07",
    hinglish:
      "{name}, kal ₹{amt} ki EMI — {label}, {bank}. Chinta chhodiye — aaj plan bana lijiye. Aap powerful hain, sab set kar lenge.",
    hindi:
      "{name}, कल ₹{amt} EMI — {label}, {bank}। चिंता छोड़िए — आज योजना बनाइए। आप सक्षम हैं।",
    english:
      "{name}, tomorrow ₹{amt} EMI — {label}, {bank}. Leave worry behind — plan today. You are powerful and will handle it.",
  },
  {
    id: "emi08",
    hinglish:
      "{name}, caring EMI alert — kal ₹{amt} ({label}), {bank}. Aap deserve karte hain stress-free life. Balance check = self-care.",
    hindi:
      "{name}, देखभाल EMI अलर्ट — कल ₹{amt} ({label}), {bank}। आप तनाव-मुक्त जीवन के हकदार हैं। बैलेंस जाँच = आत्म-देखभाल।",
    english:
      "{name}, caring EMI alert — tomorrow ₹{amt} ({label}), {bank}. You deserve a stress-free life. Balance check is self-care.",
  },
  {
    id: "emi09",
    hinglish:
      "{name}, kal ₹{amt} EMI hai ({label}) — {bank}. Yaad dilana humari responsibility hai, manage karna aapki strength. Aaj balance ready rakh lijiye.",
    hindi:
      "{name}, कल ₹{amt} EMI ({label}) — {bank}। याद दिलाना हमारा काम, संभालना आपकी शक्ति। आज बैलेंस तैयार रखिए।",
    english:
      "{name}, tomorrow ₹{amt} EMI ({label}) — {bank}. Reminding is our job, managing is your strength. Keep balance ready today.",
  },
  {
    id: "emi10",
    hinglish:
      "{name}, kal ₹{amt} due — {label}, {bank}. Breathe. Aap capable hain. Chhota step aaj: balance check. Kal smooth jayega.",
    hindi:
      "{name}, कल ₹{amt} due — {label}, {bank}। साँस लीजिए। आप सक्षम हैं। छोटा कदम: बैलेंस जाँच। कल सुचारू होगा।",
    english:
      "{name}, tomorrow ₹{amt} due — {label}, {bank}. Breathe. You are capable. Small step today: balance check. Tomorrow will go smoothly.",
  },
  {
    id: "emi11",
    hinglish:
      "{name}, EMI reminder — kal ₹{amt} ({label}), {bank}. Paisa manage karna skill hai — aap seekh rahe hain. Proud feel kijiye, balance check kijiye.",
    hindi:
      "{name}, EMI संदेश — कल ₹{amt} ({label}), {bank}। पैसा संभालना कौशल है — आप सीख रहे हैं। गर्व करिए, बैलेंस देखिए।",
    english:
      "{name}, EMI reminder — tomorrow ₹{amt} ({label}), {bank}. Managing money is a skill — you are learning. Feel proud, check balance.",
  },
  {
    id: "emi12",
    hinglish:
      "{name}, kal ₹{amt} EMI ({label}) — {bank}. Aap akela nahi — RIZN saath hai. Balance dekh lijiye, tension kam, control zyada.",
    hindi:
      "{name}, कल ₹{amt} EMI ({label}) — {bank}। आप अकेले नहीं — RIZN साथ है। बैलेंस देखिए, नियंत्रण बढ़ेगा।",
    english:
      "{name}, tomorrow ₹{amt} EMI ({label}) — {bank}. You are not alone — RIZN is with you. Check balance, less stress, more control.",
  },
];

function hashEmiId(emiId: string): number {
  let h = 0;
  for (let i = 0; i < emiId.length; i++) h = (h + emiId.charCodeAt(i) * (i + 1)) % 997;
  return h;
}

function fillEmiTemplate(
  tpl: EmiMessageTemplate,
  name: string,
  emi: EmiReminder,
  language: Language
): string {
  const n = formatCustomerName(name, language);
  const amt = emi.amount.toLocaleString("en-IN");
  const raw = tpl[language] || tpl.hinglish;
  return raw
    .replaceAll("{name}", n)
    .replaceAll("{amt}", amt)
    .replaceAll("{label}", emi.label)
    .replaceAll("{bank}", emi.bankName);
}

/** Respectful EMI notification — supportive tone, never guilt or fear. */
export function formatEmiNotification(
  name: string,
  emi: EmiReminder,
  language: Language = "hinglish",
  dayOffset = 0
): string {
  const month = new Date().getMonth();
  const idx = (hashEmiId(emi.id) + month + dayOffset) % EMI_MESSAGE_TEMPLATES.length;
  return fillEmiTemplate(EMI_MESSAGE_TEMPLATES[idx], name, emi, language);
}

export function getEmiRemindersDueTomorrow(
  reminders: EmiReminder[] | undefined,
  fromDate = new Date()
): EmiReminder[] {
  const tomorrow = new Date(fromDate);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dueDay = tomorrow.getDate();
  return (reminders ?? []).filter(
    (e) => e.enabled && e.dueDay === dueDay && e.amount > 0 && e.label.trim().length > 0
  );
}
