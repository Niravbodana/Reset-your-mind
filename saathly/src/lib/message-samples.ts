import type { LifeArea } from "./types";

export type MessageSample = {
  id: string;
  area: LifeArea | "daily";
  hinglish: string;
  hindi: string;
  english: string;
};

export const MESSAGE_SAMPLES: MessageSample[] = [
  {
    id: "1",
    area: "finance",
    hinglish: "{name}, EMI ya bills tension de rahe hain? Aaj sirf ₹50 side me rakho — consistency future banati hai.",
    hindi: "{name}, EMI या बिलों का तनाव? आज सिर्फ ₹50 अलग रखो।",
    english: "{name}, bills stressing you out? Put aside just ₹50 today — consistency builds your future.",
  },
  {
    id: "2",
    area: "career",
    hinglish: "{name}, office overload feel ho raha hai? Ek kaam finish karo, baaki kal. Tu machine nahi hai.",
    hindi: "{name}, ऑफिस का बोझ? एक काम पूरा करो, बाकी कल।",
    english: "{name}, work piling up? Finish one task today; leave the rest for tomorrow.",
  },
  {
    id: "3",
    area: "love",
    hinglish: "{name}, dil heavy hai? 5 minute saans lo. Tu akela process nahi kar raha.",
    hindi: "{name}, दिल भारी है? 5 मिनट साँस लो। तुम अकेले नहीं।",
    english: "{name}, heart feeling heavy? Breathe for five minutes. You are not alone in this.",
  },
  {
    id: "4",
    area: "health",
    hinglish: "{name}, body battery low? Paani piyo, 10 minute walk. Strong body = sharp mind.",
    hindi: "{name}, शरीर थका? पानी पियो, 10 मिनट चलो।",
    english: "{name}, body running low? Drink water, walk ten minutes. Strong body, sharp mind.",
  },
  {
    id: "5",
    area: "mind",
    hinglish: "{name}, raat ko overthink? Phone side rakho. Kal fresh start milega.",
    hindi: "{name}, रात को ज़्यादा सोच? फोन दूर रखो।",
    english: "{name}, overthinking at night? Put the phone aside. Tomorrow starts fresh.",
  },
  {
    id: "6",
    area: "daily",
    hinglish: "{name}, subah ka signal: aaj ek clear intention likho — din direction ke saath shuru hoga.",
    hindi: "{name}, सुबह का संकेत: आज एक साफ इरादा लिखो।",
    english: "{name}, morning signal: write one clear intention — your day starts with direction.",
  },
  {
    id: "7",
    area: "finance",
    hinglish: "{name}, salary delay ho rahi? Panic band. Aaj unnecessary spend mat karo.",
    hindi: "{name}, सैलरी देर से? घबराहट बंद। आज फालतू खर्च मत करो।",
    english: "{name}, salary delayed? Pause the panic. Skip unnecessary spending today.",
  },
  {
    id: "8",
    area: "career",
    hinglish: "{name}, lunch skip mat karo. Khali pet = weak decisions. 15 min break le.",
    hindi: "{name}, लंच मत छोड़ो। खाली पेट = कमज़ोर फैसले।",
    english: "{name}, do not skip lunch. Empty stomach, weak decisions. Take fifteen minutes.",
  },
  {
    id: "9",
    area: "family",
    hinglish: "{name}, sab ke liye time dete ho — aaj 5 minute sirf apne liye. Tu enough hai.",
    hindi: "{name}, सबके लिए समय — आज 5 मिनट सिर्फ अपने लिए।",
    english: "{name}, you give everyone time — take five minutes just for you today.",
  },
  {
    id: "10",
    area: "love",
    hinglish: "{name}, breakup ke baad normal hai slow feel karna. Aaj ek achhi cheez apne baare me likho.",
    hindi: "{name}, ब्रेकअप के बाद धीमा महसूस करना सामान्य है।",
    english: "{name}, feeling slow after a breakup is normal. Write one good thing about yourself today.",
  },
  {
    id: "11",
    area: "health",
    hinglish: "{name}, 3 din se walk nahi? Aaj sirf building tak chalo. Bas shuruat.",
    hindi: "{name}, कई दिन से वॉक नहीं? आज बिल्डिंग तक चलो।",
    english: "{name}, no walk in days? Walk to the end of your building today. Just start.",
  },
  {
    id: "12",
    area: "mind",
    hinglish: "{name}, Sunday dread? List me sirf 3 cheezein likho jo control me hain.",
    hindi: "{name}, रविवार की चिंता? सिर्फ 3 चीज़ें लिखो जो तुम्हारे नियंत्रण में हैं।",
    english: "{name}, Sunday anxiety? List only three things you can control this week.",
  },
  {
    id: "13",
    area: "finance",
    hinglish: "{name}, UPI pe impulse spend? Aaj ek unnecessary notification mute karo.",
    hindi: "{name}, बेवजह UPI खर्च? आज एक notification mute करो।",
    english: "{name}, impulse UPI spends? Mute one shopping notification today.",
  },
  {
    id: "14",
    area: "career",
    hinglish: "{name}, meeting overload? Ek meeting me 'not required' bolna seekho — boundary.",
    hindi: "{name}, मीटिंग ओवरलोड? एक में 'ज़रूरी नहीं' कहना सीखो।",
    english: "{name}, meeting overload? Practice saying 'not required' to one meeting — a boundary.",
  },
  {
    id: "15",
    area: "daily",
    hinglish: "{name}, dopamine scroll band. 20 minute phone-free — mind reset.",
    hindi: "{name}, स्क्रॉल बंद। 20 मिनट बिना फोन — मन रीसेट।",
    english: "{name}, stop the scroll. Twenty phone-free minutes — reset your mind.",
  },
  {
    id: "16",
    area: "health",
    hinglish: "{name}, neend kam hai? Aaj raat screen 30 min pehle band — non-negotiable.",
    hindi: "{name}, नींद कम? आज रात स्क्रीन 30 मिनट पहले बंद।",
    english: "{name}, low sleep? Screens off thirty minutes earlier tonight — non-negotiable.",
  },
  {
    id: "17",
    area: "love",
    hinglish: "{name}, kisi se baat nahi hui? Ek message bhejo — 'thinking of you'. Chhota step.",
    hindi: "{name}, बात नहीं हुई? एक मैसेज — 'याद आया'।",
    english: "{name}, lost touch with someone? Send one message — 'thinking of you'. Small step.",
  },
  {
    id: "18",
    area: "mind",
    hinglish: "{name}, comparison trap? Social media 1 hour band. Apna pace apna hai.",
    hindi: "{name}, तुलना का जाल? सोशल मीडिया 1 घंटे बंद।",
    english: "{name}, comparison trap? One hour off social media. Your pace is yours.",
  },
  {
    id: "19",
    area: "family",
    hinglish: "{name}, ghar pe tension? Ek calm conversation — shuruat sunne se karo.",
    hindi: "{name}, घर में तनाव? एक शांत बात — सुनने से शुरू करो।",
    english: "{name}, tension at home? One calm conversation — start by listening.",
  },
  {
    id: "20",
    area: "finance",
    hinglish: "{name}, month end tight? List karo sirf zaroori kharch — clarity panic kam karti hai.",
    hindi: "{name}, महीने का अंत tight? सिर्फ ज़रूरी खर्च लिखो।",
    english: "{name}, tight month end? List only essential expenses — clarity reduces panic.",
  },
  {
    id: "21",
    area: "daily",
    hinglish: "{name}, din khatam — aaj ke liye proud ho. Kal naya chance hai.",
    hindi: "{name}, दिन खत्म — आज पर गर्व करो।",
    english: "{name}, day done — be proud of today. Tomorrow is a new chance.",
  },
  {
    id: "22",
    area: "career",
    hinglish: "{name}, promotion anxiety? Aaj ek skill 20 min practice — long game.",
    hindi: "{name}, प्रमोशन की चिंता? आज 20 मिनट स्किल प्रैक्टिस।",
    english: "{name}, promotion anxiety? Practice one skill for twenty minutes — long game.",
  },
];

export function fillSample(template: string, name: string) {
  return template.replace(/\{name\}/g, name);
}
