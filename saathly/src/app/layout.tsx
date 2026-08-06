import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { LaserBackground } from "@/components/LaserBackground";
import { Providers } from "@/components/Providers";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#050508",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://rizn.app"),
  title: {
    default: "RIZN — Daily life improvement with your name",
    template: "%s | RIZN",
  },
  description:
    "Personalized daily notifications for motivation, bill reminders, water, sleep, and steps. 7-day free trial, then ₹99/month. Cancel anytime.",
  applicationName: "RIZN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RIZN",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "RIZN — aapki life change hone ka reason",
    description:
      "Daily personalized messages + bill reminders. 7-day free trial. Made for life in India.",
    type: "website",
    images: ["/images/animatic-after-hope.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "RIZN — Daily life improvement",
    description: "Personalized notifications for motivation, habits, and bills. Start free.",
    images: ["/images/animatic-after-hope.jpg"],
  },
  keywords: [
    "daily motivation app India",
    "bill reminder app",
    "EMI reminder",
    "habit tracker",
    "personalized notifications",
    "RIZN",
    "water reminder",
    "sleep reminder",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Providers>
          <LaserBackground />
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
