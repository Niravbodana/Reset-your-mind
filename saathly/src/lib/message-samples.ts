import type { LifeArea } from "./types";

export type MessageSample = {
  id: string;
  area: LifeArea | "daily";
  hinglish: string;
  hindi: string;
  english: string;
};

/** Marketing samples — same respectful tone as MESSAGE_BANK (ji, gentle, no guilt). */
export const MESSAGE_SAMPLES: MessageSample[] = [
  {
    id: "1",
    area: "finance",
    hinglish: "{name} ji, EMI ya bills ki tension feel ho rahi hai? Aaj ₹50 side rakhne ki sochiye — consistency future banati hai.",
    hindi: "{name} ji, EMI या बिलों का तनाव? आज ₹50 अलग रखने की सोचिए।",
    english: "{name}, feeling stress about bills? Consider setting aside ₹50 today — consistency builds your future.",
  },
  {
    id: "2",
    area: "career",
    hinglish: "{name} ji, office overload feel ho raha hai? Ek kaam finish kar sakte hain, baaki kal. Aap insaan hain — rest bhi zaroori hai.",
    hindi: "{name} ji, ऑफिस का बोझ? एक काम पूरा करिए, बाकी कल।",
    english: "{name}, work feeling heavy? Finish one task today; the rest can wait. You are human — rest matters too.",
  },
  {
    id: "3",
    area: "love",
    hinglish: "{name} ji, dil bhari feel ho raha hai? 5 minute saans lijiye. Aap akela process nahi kar rahe — hum saath hain.",
    hindi: "{name} ji, दिल भारी है? 5 मिनट साँस लीजिए। आप अकेले नहीं।",
    english: "{name}, heart feeling heavy? Breathe for five minutes. You are not processing this alone.",
  },
  {
    id: "4",
    area: "health",
    hinglish: "{name} ji, body thaki feel ho rahi hai? Paani pijiye, 10 minute walk try kar sakte hain. Strong body, sharp mind.",
    hindi: "{name} ji, शरीर थका? पानी पीजिए, 10 मिनट चलिए।",
    english: "{name}, body feeling tired? Drink water, try a ten-minute walk. Strong body, sharp mind.",
  },
  {
    id: "5",
    area: "mind",
    hinglish: "{name} ji, raat ko overthink ho raha hai? Phone side rakh sakte hain. Kal fresh start milega.",
    hindi: "{name} ji, रात को ज़्यादा सोच? फोन दूर रखिए।",
    english: "{name}, overthinking at night? You can put the phone aside. Tomorrow starts fresh.",
  },
  {
    id: "6",
    area: "daily",
    hinglish: "{name} ji, subah ka caring step: aaj ek clear intention likhiye — din direction ke saath shuru hoga.",
    hindi: "{name} ji, सुबह का कदम: आज एक साफ इरादा लिखिए।",
    english: "{name}, morning caring step: write one clear intention — your day starts with direction.",
  },
  {
    id: "7",
    area: "finance",
    hinglish: "{name} ji, salary delay ho rahi hai? Tension normal hai. Aaj unnecessary spend postpone kar sakte hain.",
    hindi: "{name} ji, सैलरी देर? तनाव सामान्य है। आज फालतू खर्च टाल सकते हैं।",
    english: "{name}, salary delayed? Stress is normal. You can postpone unnecessary spending today.",
  },
  {
    id: "8",
    area: "career",
    hinglish: "{name} ji, lunch lena important hai — khali pet se weak decisions aate hain. 15 min break lijiye.",
    hindi: "{name} ji, लंच ज़रूरी है। 15 मिनट विराम लीजिए।",
    english: "{name}, lunch matters — an empty stomach leads to weak decisions. Take fifteen minutes.",
  },
  {
    id: "9",
    area: "family",
    hinglish: "{name} ji, sab ke liye time dete hain — aaj 5 minute sirf apne liye. Aap enough hain.",
    hindi: "{name} ji, सबके लिए समय — आज 5 मिनट अपने लिए।",
    english: "{name}, you give everyone time — take five minutes just for you today. You are enough.",
  },
  {
    id: "10",
    area: "love",
    hinglish: "{name} ji, breakup ke baad slow feel karna normal hai. Aaj ek achhi cheez apne baare me likhiye.",
    hindi: "{name} ji, ब्रेकअप के बाद धीमा महसूस करना सामान्य है।",
    english: "{name}, feeling slow after a breakup is normal. Write one good thing about yourself today.",
  },
  {
    id: "11",
    area: "health",
    hinglish: "{name} ji, kai din se walk nahi hui? Aaj building tak chal sakte hain — bas shuruat.",
    hindi: "{name} ji, वॉक नहीं हुई? आज बिल्डिंग तक चलिए।",
    english: "{name}, no walk in a while? Walk to the end of your building today. Just a start.",
  },
  {
    id: "12",
    area: "mind",
    hinglish: "{name} ji, Sunday anxiety feel ho rahi hai? Sirf 3 cheezein likhiye jo aapke control me hain.",
    hindi: "{name} ji, रविवार की चिंता? 3 चीज़ें लिखिए जो नियंत्रण में हैं।",
    english: "{name}, Sunday anxiety? List only three things you can control this week.",
  },
  {
    id: "13",
    area: "finance",
    hinglish: "{name} ji, UPI impulse spend? Aaj ek shopping notification mute kar sakte hain — clarity ke liye.",
    hindi: "{name} ji, UPI खर्च? एक notification mute करिए।",
    english: "{name}, impulse UPI spends? Mute one shopping notification today for clarity.",
  },
  {
    id: "14",
    area: "career",
    hinglish: "{name} ji, meeting overload? Ek meeting politely decline kar sakte hain — boundary self-respect hai.",
    hindi: "{name} ji, मीटिंग ओवरलोड? एक मीटिंग विनम्रता से मना करिए।",
    english: "{name}, meeting overload? You can politely decline one meeting — boundaries are self-respect.",
  },
  {
    id: "15",
    area: "daily",
    hinglish: "{name} ji, 20 minute phone-free try kar sakte hain — mind ko reset milega.",
    hindi: "{name} ji, 20 मिनट बिना फोन — मन रीसेट।",
    english: "{name}, try twenty phone-free minutes — your mind will reset.",
  },
  {
    id: "16",
    area: "health",
    hinglish: "{name} ji, neend kam hai? Aaj raat screen 30 min pehle band kar sakte hain — body thank karegi.",
    hindi: "{name} ji, नींद कम? रात स्क्रीन 30 मिनट पहले बंद करिए।",
    english: "{name}, low sleep? Screens off thirty minutes earlier tonight — your body will thank you.",
  },
  {
    id: "17",
    area: "love",
    hinglish: "{name} ji, kisi se baat nahi hui? Ek message bhej sakte hain — 'thinking of you'. Chhota step.",
    hindi: "{name} ji, एक संदेश — 'याद आया'।",
    english: "{name}, lost touch with someone? Send one message — 'thinking of you'. A small step.",
  },
  {
    id: "18",
    area: "mind",
    hinglish: "{name} ji, comparison feel ho rahi hai? Social media 1 hour break lijiye. Apna pace apna hai.",
    hindi: "{name} ji, तुलना? सोशल मीडिया 1 घंटे ब्रेक।",
    english: "{name}, feeling comparison? Take one hour off social media. Your pace is yours.",
  },
  {
    id: "19",
    area: "family",
    hinglish: "{name} ji, ghar pe tension hai? Ek calm conversation — shuruat sunne se kar sakte hain.",
    hindi: "{name} ji, घर में तनाव? शांत बात — सुनने से शुरू करिए।",
    english: "{name}, tension at home? One calm conversation — you can start by listening.",
  },
  {
    id: "20",
    area: "finance",
    hinglish: "{name} ji, month end tight hai? Sirf zaroori kharch list kijiye — clarity se tension kam hoti hai.",
    hindi: "{name} ji, महीना tight? ज़रूरी खर्च लिखिए।",
    english: "{name}, tight month end? List only essential expenses — clarity eases tension.",
  },
  {
    id: "21",
    area: "daily",
    hinglish: "{name} ji, din khatam — aaj ke liye proud feel kijiye. Kal naya chance hai.",
    hindi: "{name} ji, दिन खत्म — आज पर गर्व करिए।",
    english: "{name}, day done — feel proud of today. Tomorrow is a new chance.",
  },
  {
    id: "22",
    area: "career",
    hinglish: "{name} ji, promotion anxiety feel ho rahi hai? Aaj 20 min skill practice — long game hai.",
    hindi: "{name} ji, प्रमोशन चिंता? 20 मिनट अभ्यास।",
    english: "{name}, promotion anxiety? Twenty minutes of skill practice today — it is a long game.",
  },
];

export function fillSample(template: string, name: string) {
  return template.replace(/\{name\}/g, name);
}
