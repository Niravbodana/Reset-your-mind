import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuroraBackground } from "@/components/AuroraBackground";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NaamSaath — Tumhare naam ke saath, har pal tumhare saath",
  description:
    "Premium personalized motivation har 2 ghante — finance, health, love, career. Apne naam ke saath messages jo zindagi badal dein. Sirf ₹99/month.",
  keywords: [
    "motivation app india",
    "daily motivation hindi",
    "personalized notifications",
    "mental wellness",
    "life coach app",
    "naamsaath",
  ],
  openGraph: {
    title: "NaamSaath — Zindagi badalne wali daily motivation",
    description: "Har ghante tumhare naam ke saath — finance, health, love, sab kuch.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi" className={`${dmSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col gradient-bg">
        <AuroraBackground />
        <div className="grain-overlay" aria-hidden />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
