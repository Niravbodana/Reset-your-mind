/**
 * UI language codes — site-wide. Missing keys fall back to English.
 *
 * RULE for future features:
 * - Never hardcode Hinglish when Worldwide is selected.
 * - Use `t(key)` for UI strings, and `preferEnglish` / `region === "IN" && !preferEnglish`
 *   for any India vs world marketing copy.
 * - Selecting Worldwide resets UI to English; LanguageSelect can then override.
 */
export type UiLang =
  | "en"
  | "hinglish"
  | "hi"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "ar"
  | "zh"
  | "ja"
  | "ko"
  | "id"
  | "tr"
  | "ru"
  | "it"
  | "nl"
  | "pl"
  | "th"
  | "vi"
  | "bn"
  | "ta"
  | "mr"
  | "te"
  | "ur"
  | "ms"
  | "uk"
  | "sv"
  | "fil";

export type UiLangOption = { code: UiLang; label: string; native: string };

export const UI_LANGUAGES: UiLangOption[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hinglish", label: "Hinglish", native: "Hinglish" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "th", label: "Thai", native: "ไทย" },
  { code: "vi", label: "Vietnamese", native: "Tiếng Việt" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "ms", label: "Malay", native: "Bahasa Melayu" },
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "sv", label: "Swedish", native: "Svenska" },
  { code: "fil", label: "Filipino", native: "Filipino" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.home": "Home",
  "nav.features": "Features",
  "nav.bills": "Bills",
  "nav.messages": "Messages",
  "nav.pricing": "Plan",
  "nav.faq": "FAQ",
  "nav.signin": "Sign in",
  "nav.join": "Join",
  "nav.dashboard": "Dashboard",
  "nav.settings": "Settings",
  "nav.language": "Language",
  "signup.title": "Create your account",
  "signup.subtitle": "Demo signup — no phone OTP. Live Google later from Admin.",
  "signup.name": "Full name",
  "signup.nameHint": "This name appears in your daily messages",
  "signup.namePh": "e.g. Alex Rivera",
  "signup.email": "Email address",
  "signup.emailHint": "For account recovery and updates",
  "signup.emailPh": "you@email.com",
  "signup.google": "Continue with Google",
  "signup.googleHint": "Live Google when Admin enables it. Demo uses email preview.",
  "signup.orEmail": "Or continue with email",
  "signup.continue": "Continue",
  "signup.personalize": "Personalize your experience",
  "signup.personalizeSub": "Choose message language and focus areas. Change anytime in Settings.",
  "signup.welcome": "Welcome",
  "signup.ready": "Account ready. Next: bills, schedule, first message.",
  "signup.settingUp": "Setting up…",
  "signup.already": "Already have an account?",
  "signup.invite": "Invite code applied — free trial with your friend!",
  "login.title": "Welcome back",
  "login.subtitle": "Demo login — email on this device. Live Google later from Admin.",
  "login.error": "No account found for this email on this device. Sign up first.",
  "cta.freeTrial": "Start free trial",
};

/** Hinglish — Roman script (India default). NOT Devanagari. */
const hinglish: Dict = {
  "nav.home": "Home",
  "nav.features": "Features",
  "nav.bills": "EMI / Bills",
  "nav.messages": "Messages",
  "nav.pricing": "Plan",
  "nav.faq": "FAQ",
  "nav.signin": "Sign in",
  "nav.join": "Join karo",
  "nav.dashboard": "Dashboard",
  "nav.settings": "Settings",
  "nav.language": "Language",
  "signup.title": "Apna account banao",
  "signup.subtitle": "Demo signup — mobile OTP nahi. Live Google baad me Admin se.",
  "signup.name": "Poora naam",
  "signup.nameHint": "Yeh naam aapke daily messages me aayega",
  "signup.namePh": "e.g. Priya Sharma",
  "signup.email": "Email address",
  "signup.emailHint": "Account recovery aur updates ke liye",
  "signup.emailPh": "you@email.com",
  "signup.google": "Google se continue",
  "signup.googleHint": "Admin enable kare tab live Google. Demo me email preview.",
  "signup.orEmail": "Ya email se continue karo",
  "signup.continue": "Aage badho",
  "signup.personalize": "Apna experience choose karo",
  "signup.personalizeSub": "Language aur focus areas choose karo. Baad me Settings se change.",
  "signup.welcome": "Welcome",
  "signup.ready": "Account ready. Next: bills, schedule, pehla message.",
  "signup.settingUp": "Setup ho raha hai…",
  "signup.already": "Pehle se account hai?",
  "signup.invite": "Invite code laga — dost ke saath free trial!",
  "login.title": "Welcome back",
  "login.subtitle": "Demo login — is device ki email. Live Google baad me Admin se.",
  "login.error": "Is email se account nahi mila. Pehle signup karo.",
  "cta.freeTrial": "Start free trial",
  "billing.continue": "Aage badho",
  "billing.title": "Free trial + Autopay",
};

/** Hindi Devanagari — only when user explicitly picks Hindi */
const hi: Dict = {
  "nav.home": "होम",
  "nav.features": "फीचर्स",
  "nav.bills": "बिल",
  "nav.messages": "संदेश",
  "nav.pricing": "प्लान",
  "nav.faq": "FAQ",
  "nav.signin": "साइन इन",
  "nav.join": "जॉइन",
  "nav.dashboard": "डैशबोर्ड",
  "nav.settings": "सेटिंग्स",
  "nav.language": "भाषा",
  "signup.title": "अपना अकाउंट बनाएँ",
  "signup.subtitle": "Demo signup — मोबाइल OTP नहीं। Live Google बाद में Admin से।",
  "signup.name": "पूरा नाम",
  "signup.nameHint": "यह नाम आपके रोज़ के संदेशों में आएगा",
  "signup.namePh": "जैसे प्रिया शर्मा",
  "signup.email": "ईमेल",
  "signup.emailHint": "अकाउंट रिकवरी और अपडेट के लिए",
  "signup.google": "Google से जारी रखें",
  "signup.googleHint": "Admin enable करे तब live Google। Demo में email preview।",
  "signup.orEmail": "या ईमेल से जारी रखें",
  "signup.continue": "आगे बढ़ें",
  "signup.personalize": "अपना अनुभव चुनें",
  "signup.personalizeSub": "भाषा और फोकस चुनें। बाद में सेटिंग्स से बदल सकते हैं।",
  "signup.welcome": "स्वागत है",
  "signup.ready": "अकाउंट तैयार। अगला: बिल, शेड्यूल, पहला संदेश।",
  "signup.settingUp": "सेटअप हो रहा है…",
  "signup.already": "पहले से अकाउंट है?",
  "signup.invite": "इनवाइट कोड लगा — दोस्त के साथ फ्री ट्रायल!",
  "login.title": "वापस स्वागत है",
  "login.subtitle": "Google या इस डिवाइस की ईमेल से साइन इन करें।",
  "login.error": "इस ईमेल से अकाउंट नहीं मिला। पहले साइन अप करें।",
  "cta.freeTrial": "फ्री ट्रायल शुरू करें",
};

const es: Dict = {
  "nav.home": "Inicio",
  "nav.features": "Funciones",
  "nav.bills": "Facturas",
  "nav.messages": "Mensajes",
  "nav.pricing": "Plan",
  "nav.faq": "FAQ",
  "nav.signin": "Entrar",
  "nav.join": "Unirse",
  "nav.dashboard": "Panel",
  "nav.settings": "Ajustes",
  "nav.language": "Idioma",
  "signup.title": "Crea tu cuenta",
  "signup.subtitle": "Continúa con Google — sin OTP de móvil.",
  "signup.name": "Nombre completo",
  "signup.nameHint": "Este nombre aparece en tus mensajes diarios",
  "signup.namePh": "p. ej. Alex Rivera",
  "signup.email": "Correo",
  "signup.emailHint": "Para recuperación y actualizaciones",
  "signup.google": "Continuar con Google",
  "signup.googleHint": "Un toque — Gmail verificado. Sin OTP.",
  "signup.orEmail": "O continuar con correo",
  "signup.continue": "Continuar",
  "signup.personalize": "Personaliza tu experiencia",
  "signup.personalizeSub": "Elige idioma y áreas. Cámbialo cuando quieras.",
  "signup.welcome": "Bienvenido",
  "signup.ready": "Cuenta lista. Siguiente: facturas, horario, primer mensaje.",
  "signup.settingUp": "Configurando…",
  "signup.already": "¿Ya tienes cuenta?",
  "login.title": "Bienvenido de nuevo",
  "login.subtitle": "Entra con Google o el correo de este dispositivo.",
  "login.error": "No hay cuenta con este correo en este dispositivo.",
  "cta.freeTrial": "Prueba gratis — empezar",
};

const fr: Dict = {
  "nav.home": "Accueil",
  "nav.features": "Fonctionnalités",
  "nav.bills": "Factures",
  "nav.messages": "Messages",
  "nav.pricing": "Offre",
  "nav.faq": "FAQ",
  "nav.signin": "Connexion",
  "nav.join": "Rejoindre",
  "nav.dashboard": "Tableau",
  "nav.settings": "Réglages",
  "nav.language": "Langue",
  "signup.title": "Créez votre compte",
  "signup.subtitle": "Continuez avec Google — pas d'OTP mobile.",
  "signup.name": "Nom complet",
  "signup.nameHint": "Ce nom apparaît dans vos messages quotidiens",
  "signup.email": "E-mail",
  "signup.emailHint": "Pour la récupération et les mises à jour",
  "signup.google": "Continuer avec Google",
  "signup.continue": "Continuer",
  "signup.orEmail": "Ou continuer par e-mail",
  "login.title": "Bon retour",
  "cta.freeTrial": "Essai gratuit — commencer",
};

const TABLES: Partial<Record<UiLang, Dict>> = {
  en,
  hinglish,
  hi,
  es,
  fr,
  de: {
    "nav.home": "Start",
    "nav.features": "Funktionen",
    "nav.bills": "Rechnungen",
    "nav.messages": "Nachrichten",
    "nav.pricing": "Plan",
    "nav.faq": "FAQ",
    "nav.signin": "Anmelden",
    "nav.join": "Beitreten",
    "nav.language": "Sprache",
    "signup.title": "Konto erstellen",
    "signup.subtitle": "Mit Google fortfahren — kein Handy-OTP.",
    "signup.name": "Vollständiger Name",
    "signup.nameHint": "Dieser Name erscheint in deinen täglichen Nachrichten",
    "signup.email": "E-Mail",
    "signup.google": "Mit Google fortfahren",
    "signup.continue": "Weiter",
    "cta.freeTrial": "Kostenlos testen — starten",
  },
  pt: {
    "nav.home": "Início",
    "nav.features": "Recursos",
    "nav.bills": "Contas",
    "nav.language": "Idioma",
    "signup.title": "Crie sua conta",
    "signup.subtitle": "Continue com o Google — sem OTP no celular.",
    "signup.name": "Nome completo",
    "signup.nameHint": "Este nome aparece nas suas mensagens diárias",
    "signup.email": "E-mail",
    "signup.google": "Continuar com Google",
    "signup.continue": "Continuar",
    "cta.freeTrial": "Teste grátis — começar",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.features": "الميزات",
    "nav.language": "اللغة",
    "signup.title": "إنشاء حسابك",
    "signup.subtitle": "تابع مع Google — بدون OTP للجوال.",
    "signup.name": "الاسم الكامل",
    "signup.nameHint": "سيظهر هذا الاسم في رسائلك اليومية",
    "signup.email": "البريد الإلكتروني",
    "signup.google": "المتابعة مع Google",
    "signup.continue": "متابعة",
    "cta.freeTrial": "تجربة مجانية — ابدأ",
  },
  zh: {
    "nav.home": "首页",
    "nav.features": "功能",
    "nav.language": "语言",
    "signup.title": "创建账户",
    "signup.subtitle": "使用 Google 继续 — 无需手机验证码。",
    "signup.name": "全名",
    "signup.nameHint": "此名字会出现在每日消息中",
    "signup.email": "邮箱",
    "signup.google": "使用 Google 继续",
    "signup.continue": "继续",
    "cta.freeTrial": "免费试用 — 开始",
  },
  ja: {
    "nav.home": "ホーム",
    "nav.features": "機能",
    "nav.language": "言語",
    "signup.title": "アカウント作成",
    "signup.subtitle": "Googleで続ける — 携帯OTP不要。",
    "signup.name": "氏名",
    "signup.nameHint": "この名前が毎日のメッセージに表示されます",
    "signup.email": "メール",
    "signup.google": "Googleで続ける",
    "signup.continue": "続ける",
    "cta.freeTrial": "無料トライアル — 開始",
  },
  ko: {
    "nav.home": "홈",
    "nav.features": "기능",
    "nav.language": "언어",
    "signup.title": "계정 만들기",
    "signup.subtitle": "Google로 계속 — 휴대폰 OTP 없음.",
    "signup.name": "이름",
    "signup.nameHint": "이 이름이 매일 메시지에 표시됩니다",
    "signup.email": "이메일",
    "signup.google": "Google로 계속",
    "signup.continue": "계속",
    "cta.freeTrial": "무료 체험 — 시작",
  },
  id: {
    "nav.home": "Beranda",
    "nav.features": "Fitur",
    "nav.language": "Bahasa",
    "signup.title": "Buat akun Anda",
    "signup.subtitle": "Lanjut dengan Google — tanpa OTP HP.",
    "signup.name": "Nama lengkap",
    "signup.nameHint": "Nama ini muncul di pesan harian Anda",
    "signup.google": "Lanjut dengan Google",
    "signup.continue": "Lanjut",
    "cta.freeTrial": "Uji coba gratis — mulai",
  },
};

export function t(lang: UiLang, key: string): string {
  return TABLES[lang]?.[key] || en[key] || key;
}

export function isRtl(lang: UiLang): boolean {
  return lang === "ar" || lang === "ur";
}

/**
 * Message bank language from UI lang + region.
 * Defaults: India → English · Worldwide → English
 */
export function messageLanguageFor(
  region: "IN" | "GLOBAL",
  uiLang: UiLang
): "english" | "hindi" | "hinglish" {
  if (uiLang === "hinglish") return "hinglish";
  if (region === "GLOBAL") {
    if (uiLang === "hi") return "hindi";
    return "english";
  }
  // India
  if (uiLang === "en") return "english";
  if (uiLang === "hi") return "hindi";
  return "hinglish";
}

/** Region defaults when user taps India / Worldwide */
export function defaultsForRegion(region: "IN" | "GLOBAL"): {
  uiLang: UiLang;
  language: "english" | "hindi" | "hinglish";
} {
  if (region === "IN") {
    return { uiLang: "en", language: "english" };
  }
  return { uiLang: "en", language: "english" };
}
