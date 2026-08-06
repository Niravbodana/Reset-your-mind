#!/usr/bin/env python3
"""Generate respectful-parts.ts with 30 bodies per life area."""

from pathlib import Path

def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')

def body(micro, hi, hn, en):
    return f'  {{ microAction: "{esc(micro)}", hinglish: "{esc(hi)}", hindi: "{esc(hn)}", english: "{esc(en)}" }}'

OPENERS_TS = """export const OPENERS = [
  { hinglish: "{name}, aapke liye ek caring reminder —", hindi: "{name}, आपके लिए एक देखभाल भरा संदेश —", english: "{name}, a caring reminder for you —" },
  { hinglish: "{name}, dil se keh rahe hain —", hindi: "{name}, दिल से कह रहे हैं —", english: "{name}, from the heart —" },
  { hinglish: "{name}, aaj aapke liye ek gentle nudge —", hindi: "{name}, आज आपके लिए एक कोमल प्रेरणा —", english: "{name}, a gentle nudge for you today —" },
  { hinglish: "{name}, hum aapke saath hain —", hindi: "{name}, हम आपके साथ हैं —", english: "{name}, we are with you —" },
  { hinglish: "{name}, aap important hain —", hindi: "{name}, आप महत्वपूर्ण हैं —", english: "{name}, you matter —" },
  { hinglish: "{name}, ek chhota sa step aaj —", hindi: "{name}, आज एक छोटा कदम —", english: "{name}, one small step today —" },
  { hinglish: "{name}, aapki wellbeing matter karti hai —", hindi: "{name}, आपकी भलाई मायने रखती है —", english: "{name}, your wellbeing matters —" },
  { hinglish: "{name}, respectfully yaad dilana chahte hain —", hindi: "{name}, सम्मानपूर्वक याद दिलाना चाहते हैं —", english: "{name}, we respectfully remind you —" },
  { hinglish: "{name}, aap capable hain —", hindi: "{name}, आप सक्षम हैं —", english: "{name}, you are capable —" },
  { hinglish: "{name}, aapke pace pe, aapke liye —", hindi: "{name}, आपकी गति पर, आपके लिए —", english: "{name}, at your pace, for you —" },
] as const;

export const CLOSINGS = [
  { hinglish: "Hum saath hain.", hindi: "हम साथ हैं।", english: "We are with you." },
  { hinglish: "Aap yeh kar sakte hain.", hindi: "आप यह कर सकते हैं।", english: "You can do this." },
  { hinglish: "Tension mat lijiye — aap strong hain.", hindi: "तनाव मत लीजिए — आप मजबूत हैं।", english: "Please do not stress — you are strong." },
  { hinglish: "Chhota step, bada confidence.", hindi: "छोटा कदम, बड़ा आत्मविश्वास।", english: "Small step, big confidence." },
  { hinglish: "Aap deserve karte hain peace.", hindi: "आप शांति के हकदार हैं।", english: "You deserve peace." },
  { hinglish: "Kal bhi hum yahan honge.", hindi: "कल भी हम यहाँ होंगे।", english: "We will be here tomorrow too." },
  { hinglish: "Aap akela nahi hain.", hindi: "आप अकेले नहीं हैं।", english: "You are not alone." },
  { hinglish: "Dheere dheere, pakka growth.", hindi: "धीरे-धीरे, पक्की प्रगति।", english: "Slowly, surely, growth." },
  { hinglish: "Aapki mehnat matter karti hai.", hindi: "आपकी मेहनत मायने रखती है।", english: "Your effort matters." },
  { hinglish: "Khud pe bharosa rakhiye.", hindi: "खुद पर भरोसा रखिए।", english: "Trust yourself." },
  { hinglish: "Ek din ek step — yahi kaafi hai.", hindi: "एक दिन एक कदम — यही काफी है।", english: "One day, one step — that is enough." },
  { hinglish: "Aap already enough hain.", hindi: "आप पहले से पर्याप्त हैं।", english: "You are already enough." },
] as const;
"""

# 30 bodies per area - (micro, hinglish_body_only, hindi, english)
BODIES = {
"finance": [
("EMI balance check", "kal ki EMI ke liye aaj balance dekh lijiye — prepared feel karenge", "कल की EMI के लिए आज बैलेंस देख लीजिए", "check balance today for tomorrow's EMI — you will feel prepared"),
("Small save", "aaj chhoti bachat ki sochiye — har rupee matter karta hai", "आज छोटी बचत की सोचिए", "consider a small saving today — every rupee matters"),
("UPI review", "2 minute UPI review se clarity milti hai", "2 मिनट UPI समीक्षा से स्पष्टता", "a two-minute UPI review brings clarity"),
("Bill calendar", "due dates calendar me dekh lijiye — planning helpful hai", "देय तिथियाँ कैलेंडर में देखिए", "checking due dates on calendar is helpful"),
("Impulse pause", "ek impulse purchase postpone kar sakte hain — guilt nahi", "एक आवेग खरीद टाल सकते हैं", "you can postpone one impulse purchase — no guilt"),
("Emergency fund", "emergency fund me chhota step sochiye", "आपात कोष में छोटा कदम सोचिए", "consider a small emergency fund step"),
("Salary plan", "salary me bachat ki planning achhi aadat hai", "सैलरी में बचत की योजना अच्छी आदत", "planning savings from salary is a good habit"),
("Subscription check", "subscriptions review kar lijiye", "सब्सक्रिप्शन समीक्षा करिए", "review subscriptions for clarity"),
("Money gratitude", "jo hai uske liye gratitude feel kijiye", "जो है उसके लिए आभार", "feel gratitude for what you have"),
("Spend awareness", "kharch pe guilt nahi — awareness se better decisions", "खर्च पर अपराधबोध नहीं", "no guilt on spending — awareness helps"),
("EMI calm", "EMI tension normal hai — plan se sab manageable hota hai", "EMI तनाव सामान्य — योजना से संभव", "EMI tension is normal — plans make it manageable"),
("SIP thought", "SIP ki chhoti shuruaat powerful ho sakti hai", "SIP की छोटी शुरुआत शक्तिशाली", "a small SIP start can be powerful"),
("Cash buffer", "chhota cash buffer helpful hota hai", "छोटा नकद बफर सहायक", "a small cash buffer helps"),
("Family money talk", "ghar pe money ki open baat — shame nahi", "घर पर पैसों की खुली बात", "open money talk at home — no shame"),
("Debt kindness", "loan pe khud ko judge mat kijiye — step by step", "ऋण पर खुद को न आंकिए", "do not judge yourself for loans — step by step"),
("Weekend budget", "weekend ke liye soft budget set kar sakte hain", "सप्ताहांत नरम बजट", "you can set a soft weekend budget"),
("Pay yourself", "pehle khud ko pay karna self-respect hai", "पहले खुद को भुगतान", "paying yourself first is self-respect"),
("Financial goal", "ek financial goal likhna direction deta hai", "एक वित्तीय लक्ष्य दिशा देता है", "writing one financial goal gives direction"),
("No money compare", "dusron se money compare mat — journey unique hai", "दूसरों से तुलना न करिए", "do not compare money — your journey is unique"),
("Bank check", "bank app me balance dekhna awareness deta hai", "बैंक बैलेंस जागरूकता देता है", "checking bank balance builds awareness"),
("Credit care", "credit score ki care long-term gift hai", "क्रेडिट स्कोर देखभाल उपहार", "caring for credit score is a long-term gift"),
("Home loan pride", "home loan zimmedari aur achievement dono hai", "होम लोन ज़िम्मेदारी और उपलब्धि", "home loan is responsibility and achievement"),
("EMI self-care", "EMI yaad dilana self-care hai — future protect", "EMI याद दिलाना आत्म-देखभाल", "EMI reminder is self-care — protecting your future"),
("Money peace", "raat ko money worry ho to kal plan — aaj rest", "रात चिंता हो तो कल योजना", "money worry at night? Plan tomorrow — rest now"),
("Generosity", "apni capacity ke andar generosity beautiful hai", "सामर्थ्य के भीतर उदारता सुंदर", "generosity within your means is beautiful"),
("Money learn", "10 min money article padhna investment hai", "10 मिनट वित्त लेख निवेश", "ten minutes on money is an investment"),
("Rupee respect", "har rupee respect deserve karta hai", "हर रुपया सम्मान का हकदार", "every rupee deserves respect"),
("Future plan", "future ke liye aaj plan — proud feel kijiye", "भविष्य के लिए आज योजना", "planning today for future — feel proud"),
("Money mental", "money stress aur mental health linked — gentle raho", "पैसा और मानसिक स्वास्थ्य जुड़े", "money stress and mental health are linked — be gentle"),
("EMI celebrate", "EMI pay hone par khud ko appreciate kijiye", "EMI भुगतान पर सराहना", "when EMI is paid appreciate yourself"),
],
"career": [
("One priority", "aaj ek priority task choose kar sakte hain", "आज एक प्राथमिकता चुन सकते हैं", "you can choose one priority task today"),
("Deep work", "25 minute focused work try kar sakte hain", "25 मिनट केंद्रित कार्य", "try twenty-five minutes of focused work"),
("Ask help", "help maangna strength hai — allowed hai", "मदद माँगना साहस है", "asking for help is strength — allowed"),
("Skill learn", "15 minute skill learning gift hai", "15 मिनट कौशल उपहार", "fifteen minutes of skill learning is a gift"),
("Work rest", "kaam ke baad rest lena healthy boundary hai", "काम के बाद विश्राम सीमा", "rest after work is a healthy boundary"),
("Work win", "chhoti work win appreciate kijiye", "छोटी जीत सराहिए", "appreciate a small work win"),
("Visibility", "10 min professional visibility — presence hai", "10 मिनट उपस्थिति", "ten minutes professional visibility — presence"),
("Meeting value", "meeting me aapka input valuable hai", "मीटिंग में योगदान मूल्यवान", "your input in meetings is valuable"),
("Resume update", "resume me ek line update confidence deta hai", "रिज़्यूमे एक पंक्ति", "one resume line update builds confidence"),
("Burnout care", "burnout feel ho to rest allowed hai", "थकान पर विश्राम अनुमत", "rest is allowed if burnout feels near"),
("Mentor thanks", "mentor ko thank you — relationships matter", "मेंटर को धन्यवाद", "thank a mentor — relationships matter"),
("Career patience", "career growth time leti hai — on track hain", "करियर समय लेती है", "career growth takes time — you are on track"),
("Inbox care", "inbox overwhelm normal — 15 min gentle triage", "इनबॉक्स सौम्य ट्राइएज", "inbox overwhelm is normal — gentle triage"),
("Side creativity", "side project sochna creativity hai — no pressure", "साइड प्रोजेक्ट रचनात्मकता", "thinking about side projects is creativity — no pressure"),
("Presentation care", "presentation se pehle self-compassion", "प्रस्तुति से पहले आत्म-करुणा", "self-compassion before presentation"),
("Team kindness", "team ko kind word — culture improve", "टीम को दयालु शब्द", "a kind word to team improves culture"),
("Learn grow", "mistake se seekhna growth hai — maaf kijiye", "गलती से सीखना वृद्धि", "learning from mistakes is growth — forgive yourself"),
("WFH break", "WFH me breaks important hain", "WFH विराम महत्वपूर्ण", "breaks in WFH are important"),
("Career vision", "6 month vision likhna direction deta hai", "6 महीने दृष्टिकोण", "six-month vision gives direction"),
("No compare work", "colleagues se compare mat — path unique", "सहकर्मियों से तुलना न करिए", "do not compare with colleagues"),
("Email pause", "email se pehle pause — clarity aati hai", "ईमेल से पहले विराम", "pause before email brings clarity"),
("Week reflect", "week reflection 5 min — growth notice kijiye", "सप्ताह प्रतिबिंब", "five-minute week reflection — notice growth"),
("Skill joy", "nayi skill me curiosity aur joy rakho", "नए कौशल में आनंद", "keep curiosity and joy in new skills"),
("Work worth", "aap job se zyada hain — yaad rakhiye", "आप नौकरी से अधिक", "you are more than your job"),
("Quiet lead", "quiet leadership bhi leadership hai", "शांत नेतृत्व भी नेतृत्व", "quiet leadership is still leadership"),
("Coffee deserved", "coffee break deserve karte hain", "कॉफी ब्रेक के हकदार", "you deserve a coffee break"),
("Ready today", "aaj ready rehna enough hai", "आज तैयार रहना पर्याप्त", "being ready today is enough"),
("Say no work", "work me na bolna self-respect hai", "कार्य में ना आत्म-सम्मान", "saying no at work is self-respect"),
("Celebrate learn", "naya seekha to celebrate kijiye", "नया सीखा तो जश्न", "celebrate if you learned something new"),
("Career gentle", "career me khud ko harsh mat kijiye", "करियर में खुद को कठोर न करिए", "do not be harsh on yourself in career"),
],
}

# Generate health, mind, love, family, daily from respectful templates
def gen_area(name, topics):
    return [(t[0], t[1], t[2], t[3]) for t in topics]

health = gen_area("health", [
("Water now", "ek glass paani abhi — body thank karegi", "एक गिलास पानी अभी", "one glass of water now — body will thank you"),
("Gentle stretch", "5 minute gentle stretch try kar sakte hain", "5 मिनट कोमल स्ट्रेच", "try five minutes of gentle stretch"),
("Walk 10", "10 minute walk mind aur body ke liye achhi hai", "10 मिनट टहलना", "ten-minute walk is good for mind and body"),
("Sleep care", "neend priority hai — thoda early rest sochiye", "नींद प्राथमिकता", "sleep is priority — consider resting earlier"),
("Nutritious meal", "ek nutritious meal khud ke liye care hai", "पौष्टिक भोजन देखभाल", "a nutritious meal is care for yourself"),
("Medicine time", "medicine ya vitamin — health investment", "दवा स्वास्थ्य निवेश", "medicine or vitamins — health investment"),
("Screen break", "screen se break eyes ke liye achha hai", "स्क्रीन विराम आँखों के लिए", "break from screen is good for eyes"),
("Deep breath", "3 deep breath — calm feel hota hai", "3 गहरी साँस शांति", "three deep breaths — calm feels good"),
("Body thanks", "body ko thank you — it works for you", "शरीर को धन्यवाद", "thank your body — it works for you"),
("Gentle move", "gentle movement bhi movement hai — no pressure", "कोमल गति भी गति", "gentle movement counts — no pressure"),
("Fruit snack", "fruit snack energy de sakta hai", "फल ऊर्जा दे सकता है", "fruit snack can give energy"),
("Posture care", "posture adjust karna back ko gift hai", "मुद्रा पीठ को उपहार", "adjusting posture is a gift to your back"),
("Hydration", "paani peena habit ban sakti hai", "पानी की आदत", "drinking water can become a habit"),
("Rest ok", "rest lena lazy nahi — recovery zaroori hai", "विश्राम आवश्यक", "rest is not lazy — recovery is necessary"),
("Sunlight", "thodi dhoop mood improve kar sakti hai", "धूप मनोदशा सुधार", "a little sunlight can improve mood"),
("Home food", "ghar ka khana self-care hai", "घर का खाना देखभाल", "home food is self-care"),
("Gentle yoga", "10 min gentle yoga — breath aur stretch", "10 मिनट कोमल योग", "ten minutes gentle yoga"),
("No body shame", "body ko judge mat — care kijiye", "शरीर को न आंकिए", "do not judge body — care for it"),
("Phone away bed", "phone bed se door — neend better", "फोन बिस्तर से दूर", "phone away from bed — better sleep"),
("Checkup care", "annual checkup self-respect hai", "वार्षिक जाँच सम्मान", "annual checkup is self-respect"),
("Stairs pace", "stairs apni speed pe — heart ke liye achha", "सीढ़ियाँ अपनी गति से", "stairs at your pace — good for heart"),
("Sugar mindful", "sugar mindful rakhna choice hai", "चीनी सचेत रखना", "keeping sugar mindful is a choice"),
("Protein meal", "protein ek meal me add kar sakte hain", "प्रोटीन एक भोजन में", "you can add protein in one meal"),
("Evening walk", "shaam ki walk peace deti hai", "शाम की सैर शांति", "evening walk gives peace"),
("Cold splash", "thanda paani splash refresh deta hai", "ठंडा पानी ताज़गी", "cold water splash refreshes"),
("Mindful meal", "bina phone khana mindful hai", "बिना फोन भोजन सचेत", "eating without phone is mindful"),
("Health gentle", "health streak gentle rakho — miss ho to kal", "स्वास्थ्य कोमल लकीर", "keep health streak gentle — tomorrow again"),
("Listen body", "body jo keh rahi hai suniye", "शरीर सुनिए", "listen to what your body says"),
("Immunity", "haldi citrus — gentle immunity support", "हल्दी सिट्रस प्रतिरक्षा", "turmeric citrus — gentle immunity support"),
("Body win", "body ki chhoti win celebrate kijiye", "शरीर की जीत जश्न", "celebrate body's small win"),
])

mind = gen_area("mind", [
("Gratitude 3", "3 cheezein grateful — mind shift hota hai", "3 चीज़ें आभारी", "three grateful things shift the mind"),
("Worry write", "worries likh ke release kar sakte hain", "चिंताएँ लिखकर मुक्त", "you can release worries by writing"),
("Soft mode", "aaj heavy feel ho to soft mode OK hai", "नरम मोड ठीक", "soft mode is OK if today feels heavy"),
("Meditation 3", "3 min meditation — chhoti shuruaat kaafi", "3 मिनट ध्यान", "three-minute meditation — small start is enough"),
("Nature air", "5 min bahar hawa — grounding feel", "5 मिनट बाहर हवा", "five minutes outside air — grounding"),
("Self talk kind", "khud se baat dost jaisi — gentle rakhiye", "खुद से दयालु बात", "talk to yourself like a friend"),
("Limit news", "negative news limit mind ko protect karta hai", "खबरें सीमित रक्षा", "limiting negative news protects mind"),
("Music mood", "favourite music mood lift kar sakta hai", "संगीत मनोदशा", "favourite music can lift mood"),
("Forgive self", "khud ko maaf karna healing hai", "खुद को माफ़ उपचार", "forgiving yourself is healing"),
("Anxiety ok", "anxiety feel hona normal hai — alone nahi", "चिंता सामान्य", "feeling anxiety is normal — not alone"),
("Box breath", "4-4-4-4 breathing calm deta hai", "4-4-4-4 शांति", "box breathing gives calm"),
("Journal 3", "3 feelings likhna release hai", "3 भावनाएँ लिखना", "writing three feelings is release"),
("Digital rest", "phone 1 hour rest — mind ko space", "फोन विश्राम", "one hour phone rest — space for mind"),
("Therapy ok", "therapy sochna courage hai", "थेरेपी साहस", "thinking about therapy is courage"),
("No compare", "social media break comparison kam karta hai", "तुलना कम", "social media break reduces comparison"),
("Present now", "abhi is pal me — kal ki chinta kal", "अभी इस पल में", "in this moment — tomorrow's worry is for tomorrow"),
("Affirmation", "main capable hoon — gently repeat", "मैं सक्षम धीरे दोहराएँ", "I am capable — repeat gently"),
("Silence ok", "khamoshi bhi theek hai — recharge hai", "खामोशी ठीक", "silence is OK — it is recharge"),
("Mind body", "mind aur body connected — dono pe care", "मन शरीर जुड़े", "mind and body connected — care for both"),
("Notice calm", "thoda calm feel hua to notice kijiye", "शांति ध्यान दें", "notice if you felt a bit calm"),
("Worry box", "kal ki chinta kal — aaj rest", "कल की चिंता कल", "tomorrow's worry for tomorrow — rest today"),
("Prayer thanks", "2 min prayer ya gratitude", "2 मिनट प्रार्थना", "two minutes prayer or gratitude"),
("Mindful chai", "chai slowly — present moment", "चाय धीरे सचेत", "chai slowly — present moment"),
("Progress ok", "perfect nahi — progress enough hai", "प्रगति पर्याप्त", "not perfect — progress is enough"),
("Kind voice", "inner voice kind banaiye", "भीतरी आवाज़ दयालु", "make inner voice kind"),
("Small joy", "chhoti khushi notice kijiye", "छोटी खुशी", "notice small joy"),
("Mental priority", "mental health priority — guilt nahi", "मानसिक स्वास्थ्य प्राथमिकता", "mental health is priority — no guilt"),
("Let go", "ek cheez chhod dena freedom hai", "एक चीज़ छोड़ना", "letting go one thing is freedom"),
("Motivation gentle", "motivation gentle rakho — kal better ho sakta hai", "कोमल प्रेरणा", "keep motivation gentle — tomorrow can be better"),
("You matter", "aap matter karte hain — feelings valid hain", "आप महत्वपूर्ण", "you matter — feelings are valid"),
])

love = gen_area("love", [
("Self note", "apne liye kind note likh sakte hain", "दयालु नोट", "you can write a kind note for yourself"),
("Thank someone", "kisi ko thank you — connection badhta hai", "धन्यवाद संबंध", "thank someone — connection grows"),
("Old friend", "purane dost ko message kar sakte hain", "पुराने मित्र संदेश", "you can message an old friend"),
("Boundary", "na bolna dil ki protection — gently OK", "ना सीमा रक्षा", "saying no protects heart — gently OK"),
("Partner thanks", "partner ko appreciation — love grow", "साथी सराहना", "appreciation to partner — love grows"),
("Comfortable hug", "comfortable ho to hug — connection achha", "आलिंगन संबंध", "if comfortable hug — connection feels good"),
("Heart ok", "dil bhari feel hona OK hai", "दिल भारी ठीक", "heart feeling heavy is OK"),
("Self love first", "pehle khud se pyaar — healthy relationships", "पहले खुद से प्रेम", "love yourself first — healthy relationships"),
("Listen only", "sunna bina fix — gift hai", "सुनना उपहार", "listening without fixing is a gift"),
("Single whole", "single ho to bhi aap complete hain", "अकेले भी पूर्ण", "even single you are complete"),
("Small romance", "chhota romantic gesture — love active", "छोटा इशारा", "small romantic gesture — love stays active"),
("Forgive peace", "maafi peace ke liye — force nahi", "माफ़ी शांति", "forgiveness for peace — not forced"),
("Vulnerability", "feelings share karna courage hai", "भावना साझा साहस", "sharing feelings is courage"),
("No rel compare", "couples se compare mat — story unique", "जोड़ों से तुलना नहीं", "do not compare couples — story is unique"),
("Quality time", "30 min quality time plan kar sakte hain", "30 मिनट समय", "you can plan thirty minutes quality time"),
("Compliment", "genuine compliment — kindness ripple", "सच्ची तारीफ", "genuine compliment — kindness ripple"),
("Self chai", "apne liye chai time — self love", "अपने लिए चाय", "chai time for yourself — self love"),
("Family love", "ghar walon ko pyaar express karna beautiful", "परिवार प्रेम सुंदर", "expressing love to family is beautiful"),
("Heal pace", "heal apni speed pe — rush nahi", "अपनी गति उपचार", "heal at your pace — no rush"),
("Love note", "chhota love note likh sakte hain", "प्रेम पत्र", "you can write a small love note"),
("Conflict respect", "conflict me respect — tone matter", "संघर्ष में सम्मान", "respect in conflict — tone matters"),
("Miss message", "miss karte ho to message bhej sakte hain", "याद संदेश", "if you miss someone you can message"),
("Receive love", "pyaar receive karna bhi skill hai", "प्रेम ग्रहण कौशल", "receiving love is also a skill"),
("Heart time", "dil ko time chahiye — patient rakhiye", "दिल को समय", "heart needs time — be patient"),
("Connection effort", "chhota effort connection ke liye — worth", "संबंध प्रयास", "small effort for connection is worth it"),
("Unfollow peace", "toxic unfollow peace deta hai", "विषाक्त अनफॉलो शांति", "unfollow toxic gives peace"),
("Love language", "love language samajhna care hai", "प्रेम भाषा देखभाल", "understanding love language is care"),
("Sorry care", "sorry bolna care hai — rishta bada", "माफ़ी देखभाल", "sorry is care — relationship matters"),
("Lovable", "aap lovable hain — yaad rakhiye", "आप प्रेम योग्य", "you are lovable — remember"),
("Gentle heart", "dil ke saath gentle raho", "दिल कोमल", "be gentle with your heart"),
])

family = gen_area("family", [
("Parents call", "maa papa ko call — 2 min matter karta hai", "माता-पिता कॉल", "call parents — two minutes matter"),
("Kids time", "bachon ke saath 15 min — precious", "बच्चों 15 मिनट", "fifteen minutes with kids — precious"),
("Family dinner", "saath khana — connection badhta hai", "साथ खाना", "eating together grows connection"),
("Sibling msg", "bhai behen ko message — bond matter", "भाई बहन संदेश", "message sibling — bond matters"),
("Home chore", "ek ghar ka kaam — team family", "घर का काम", "one home chore — team family"),
("Grandparents", "dada dadi ki baat — wisdom milti hai", "दादा दादी ज्ञान", "talking to grandparents brings wisdom"),
("Budget talk", "15 min budget talk — transparency achhi", "बजट बात", "fifteen-minute budget talk — transparency is good"),
("Boundaries ok", "family me boundaries OK — respect", "परिवार सीमाएँ", "boundaries in family are OK — respect"),
("Bedtime story", "bachon ko kahani — beautiful ritual", "कहानी परंपरा", "story for kids — beautiful ritual"),
("Partner ask", "partner se poocho kaise hain — sunna love", "साथी पूछना", "ask partner how they are — listening is love"),
("Old photo", "purani photo — family gratitude", "पुरानी तस्वीर आभार", "old photo — family gratitude"),
("Cook together", "milke khana banana bonding hai", "मिलकर खाना", "cooking together is bonding"),
("Family forgive", "purani baat maaf — peace ghar me", "माफ़ी शांति", "forgive old matter — peace at home"),
("Teach UPI", "maa baap ko UPI sikhana seva hai", "UPI सिखाना सेवा", "teaching parents UPI is service"),
("Family walk", "saath walk — baat aur health", "साथ टहलना", "walk together — talk and health"),
("Festival plan", "festival chhota plan — stress kam", "त्योहार योजना", "small festival plan — less stress"),
("Thank parent", "parent ko thank you — mehnat matter", "माता-पिता धन्यवाद", "thank parent — effort matters"),
("Family meeting", "10 min family check in", "पारिवारिक बैठक", "ten-minute family check-in"),
("Me time ok", "apna time lena selfish nahi — zaroori", "अपना समय ज़रूरी", "me-time is not selfish — necessary"),
("Good news share", "ghar pe achhi khabar share kijiye", "अच्छी खबर साझा", "share good news at home"),
("Elder help", "buzurg ki chhoti madad — seva", "बुज़ुर्ग मदद", "small help to elder — service"),
("Home kindness", "ghar me kindness — culture strong", "घर दया", "kindness at home strengthens culture"),
("No phone dinner", "dinner pe phone nahi — presence gift", "खाने पर उपस्थिति", "no phone at dinner — presence is gift"),
("Sibling forgive", "bhai behen se maafi — valuable", "भाई बहन माफ़ी", "forgive sibling — valuable"),
("Night gratitude", "raat ko family gratitude — shanti", "रात आभार", "night family gratitude — peace"),
("Listen kids", "bachon ki baat sunna — valued feel", "बच्चों सुनना", "listening to kids — they feel valued"),
("Support partner", "partner ko support — team ho", "साथी सहारा", "support partner — you are a team"),
("Home peace", "ghar ki shanti priority hai", "घर शांति प्राथमिकता", "home peace is priority"),
("Good example", "bachon ko achha example aaj", "अच्छा उदाहरण", "one good example for kids today"),
("Love express", "ghar pe love express karna beautiful", "घर प्रेम सुंदर", "expressing love at home is beautiful"),
])

daily = gen_area("daily", [
("Make bed", "bed make karna pehli win ho sakti hai", "बिस्तर पहली जीत", "making bed can be first win"),
("3 priorities", "3 priorities likhna — noise kam", "3 प्राथमिकताएँ", "writing three priorities reduces noise"),
("Morning thanks", "subah gratitude — positive start", "सुबह आभार", "morning gratitude — positive start"),
("Kind act", "ek kind act — duniya better", "दयालु कार्य", "one kind act — world gets better"),
("Smile try", "smile try mood shift kar sakta hai", "मुस्कान मनोदशा", "trying smile can shift mood"),
("Read 10", "10 page padhna knowledge gift", "10 पृष्ठ ज्ञान", "ten pages reading is knowledge gift"),
("Walk think", "walk pe sochna clarity deta hai", "टहलते सोच", "thinking on walk gives clarity"),
("Declutter 5", "5 min declutter — mind clear", "5 मिनट सफ़ाई", "five-minute declutter — mind clear"),
("Plan tomorrow", "kal ke 3 task — subah clarity", "कल की योजना", "tomorrow's three tasks — morning clarity"),
("No complaint", "1 hour bina complaint — energy better", "बिना शिकायत", "one hour without complaint — better energy"),
("Notice good", "aaj kuch achha notice kijiye", "अच्छा ध्यान", "notice something good today"),
("Self praise", "khud ko compliment — try kar rahe hain", "खुद प्रशंसा", "compliment yourself — you are trying"),
("Energy cut", "ek drain gently cut kar sakte hain", "एक थकान कम", "you can gently cut one energy drain"),
("Vision motivation", "dream life ki ek image — motivation ke liye", "सपने की तस्वीर", "one dream image — for motivation"),
("Say no", "ek baar na bolna time respect", "एक बार ना", "saying no once respects your time"),
("Podcast walk", "15 min podcast walk — gentle growth", "पॉडकास्ट टहलना", "fifteen-minute podcast walk — gentle growth"),
("Win journal", "aaj ki win likhna momentum hai", "जीत लिखना", "writing today's win is momentum"),
("Early rest", "thoda early rest try kar sakte hain", "जल्दी विश्राम", "you can try resting a bit earlier"),
("Thank stranger", "thank you bolna humanity hai", "धन्यवाद मानवता", "saying thank you is humanity"),
("Organize desk", "desk organize — focus better", "डेस्क व्यवस्थित", "organize desk — better focus"),
("Learn fact", "ek nayi fact — curiosity beautiful", "नई बात", "one new fact — curiosity is beautiful"),
("Carry motivation", "motivation carry karna strength hai", "प्रेरणा साहस", "carrying motivation is strength"),
("Gentle discipline", "discipline gentle ho sakti hai", "कोमल अनुशासन", "discipline can be gentle"),
("Present breath", "ek breath present moment me", "एक साँस वर्तमान", "one breath in present moment"),
("Enough today", "aaj ke liye enough ho — yaad rakhiye", "आज पर्याप्त", "you are enough for today"),
("Small step proud", "chhote step pe proud feel kijiye", "छोटे कदम गर्व", "feel proud of small steps"),
("RIZN saath", "RIZN aapke saath hai — kal bhi message", "RIZN साथ", "RIZN is with you — message tomorrow too"),
("Kind self daily", "aaj khud ke saath kind raho", "आज दयालु", "be kind to yourself today"),
("Progress write", "progress likhna — growth visible", "प्रगति लिखना", "writing progress makes growth visible"),
("Tomorrow motivation", "kal naya din — motivation rakho", "कल नया दिन", "tomorrow is new day — keep motivation"),
])

BODIES["health"] = health
BODIES["mind"] = mind
BODIES["love"] = love
BODIES["family"] = family
BODIES["daily"] = daily

lines = [
    'import type { LifeArea } from "../types";',
    '',
    'export type RespectfulBody = {',
    '  microAction: string;',
    '  hinglish: string;',
    '  hindi: string;',
    '  english: string;',
    '};',
    '',
    OPENERS_TS,
    '',
    'export const RESPECTFUL_BODIES: Record<LifeArea | "daily", RespectfulBody[]> = {',
]

for area, items in BODIES.items():
    lines.append(f'  {area}: [')
    for item in items:
        lines.append(body(*item) + ',')
    lines.append('  ],')

lines.append('};')

out = Path('src/lib/messages/respectful-parts.ts')
out.write_text('\n'.join(lines))
print(f'Wrote {out} — areas: {list(BODIES.keys())}, bodies per area: {[len(v) for v in BODIES.values()]}')
