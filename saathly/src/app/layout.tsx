import type { Metadata } from "next";
import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LaserBackground } from "@/components/LaserBackground";
import { Providers } from "@/components/Providers";

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "RIZN — Har 2 ghante tumhare naam pe ek message",
  description:
    "47,000+ Indians trust RIZN. Personalized daily motivation for paisa, health, pyaar, career. 7 din free. Sirf ₹99/month.",
  openGraph: {
    title: "RIZN — Your name. Your nudge. Your rise.",
    description: "Premium personalized motivation — roz 6 messages jo sach me kaam karein.",
    type: "website",
    images: ["/images/hero-premium.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="hi" className={`${body.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Providers>
          <LaserBackground />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
