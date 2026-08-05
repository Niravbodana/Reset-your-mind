export type SiteSettings = {
  adminPassword: string;
  integrations: {
    razorpayKeyId: string;
    razorpayKeySecret: string;
    razorpayWebhookSecret: string;
    razorpayPlanPersonal: string;
    razorpayPlanParivaar: string;
    whatsappToken: string;
    whatsappPhoneNumberId: string;
    whatsappBusinessUrl: string;
    resendApiKey: string;
    resendFromEmail: string;
    supabaseUrl: string;
    supabaseAnonKey: string;
    vapidPublicKey: string;
    vapidPrivateKey: string;
    vapidSubject: string;
  };
  marketing: {
    heroVideoUrl: string;
    earlyBirdPricePersonal: number;
    launchPricePersonal: number;
    earlyBirdPriceParivaar: number;
    launchPriceParivaar: number;
    trialDays: number;
    siteUrl: string;
    supportEmail: string;
    crisisHelpline: string;
    instagramUrl: string;
    playStoreUrl: string;
    appStoreUrl: string;
  };
  features: {
    paymentsEnabled: boolean;
    whatsappEnabled: boolean;
    webPushEnabled: boolean;
    emailWaitlistEnabled: boolean;
    earlyBirdActive: boolean;
  };
};

export type PublicSiteConfig = {
  marketing: SiteSettings["marketing"];
  features: SiteSettings["features"];
  integrations: {
    razorpayKeyId: string;
    vapidPublicKey: string;
    whatsappBusinessUrl: string;
  };
  waitlistCount: number;
};

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  plan: string;
  areas: string[];
  language: string;
  createdAt: string;
  pushSubscribed?: boolean;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  adminPassword: "rizn-admin-2026",
  integrations: {
    razorpayKeyId: "",
    razorpayKeySecret: "",
    razorpayWebhookSecret: "",
    razorpayPlanPersonal: "",
    razorpayPlanParivaar: "",
    whatsappToken: "",
    whatsappPhoneNumberId: "",
    whatsappBusinessUrl: "https://business.facebook.com/wa/manage/home/",
    resendApiKey: "",
    resendFromEmail: "hello@rizn.app",
    supabaseUrl: "",
    supabaseAnonKey: "",
    vapidPublicKey: "",
    vapidPrivateKey: "",
    vapidSubject: "mailto:hello@rizn.app",
  },
  marketing: {
    heroVideoUrl: "",
    earlyBirdPricePersonal: 99,
    launchPricePersonal: 149,
    earlyBirdPriceParivaar: 249,
    launchPriceParivaar: 349,
    trialDays: 7,
    siteUrl: "http://localhost:3000",
    supportEmail: "hello@rizn.app",
    crisisHelpline: "9152987821",
    instagramUrl: "",
    playStoreUrl: "",
    appStoreUrl: "",
  },
  features: {
    paymentsEnabled: false,
    whatsappEnabled: false,
    webPushEnabled: true,
    emailWaitlistEnabled: true,
    earlyBirdActive: true,
  },
};

export function toPublicConfig(settings: SiteSettings, waitlistCount: number): PublicSiteConfig {
  return {
    marketing: settings.marketing,
    features: settings.features,
    integrations: {
      razorpayKeyId: settings.integrations.razorpayKeyId,
      vapidPublicKey: settings.integrations.vapidPublicKey,
      whatsappBusinessUrl: settings.integrations.whatsappBusinessUrl,
    },
    waitlistCount,
  };
}
