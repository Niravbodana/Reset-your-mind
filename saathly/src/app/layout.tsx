import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saathly — Har ghante tumhare saath, tumhare naam ke saath",
  description:
    "Personalized motivation har 2 ghante — finance, health, love, career. Apne naam ke saath messages jo zindagi badal dein. Sirf ₹99/month.",
  keywords: [
    "motivation app india",
    "daily motivation hindi",
    "personalized notifications",
    "mental wellness",
    "life coach app",
  ],
  openGraph: {
    title: "Saathly — Zindagi badalne wali daily motivation",
    description: "Har ghante tumhare naam ke saath — finance, health, love, sab kuch.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col gradient-bg">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
