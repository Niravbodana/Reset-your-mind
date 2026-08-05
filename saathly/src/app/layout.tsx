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
    default: "RIZN — aapki life change ka reason",
    template: "%s | RIZN",
  },
  description:
    "₹99/month — daily personalized messages + EMI reminder 1 day before. Aapki life change ka reason.",
  applicationName: "RIZN",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "RIZN",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "RIZN — aapki life change ka reason",
    description: "Daily motivation + EMI alerts. ₹99 limited offer. Start free today.",
    type: "website",
    images: ["/images/animatic-after-hope.jpg"],
  },
  keywords: [
    "daily motivation",
    "EMI reminder",
    "Hinglish motivation",
    "habit app India",
    "RIZN",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi-IN" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Providers>
          <LaserBackground />
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
