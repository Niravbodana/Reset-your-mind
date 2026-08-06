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
  title: {
    default: "RIZN — aapki life change hone ka reason",
    template: "%s | RIZN",
  },
  description:
    "RIZN — aapki life change hone ka reason. Daily personalized messages + EMI/bill reminders. 7-day free trial, phir ₹99/month. Made in India.",
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
      "RIZN — aapki life change hone ka reason. Daily motivation + bill reminders. 7-day free trial.",
    type: "website",
    images: ["/images/animatic-after-hope.jpg"],
  },
  keywords: [
    "daily motivation",
    "bill reminder",
    "EMI reminder",
    "habit app",
    "personalized messages",
    "RIZN",
    "wellness worldwide",
  ],
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
