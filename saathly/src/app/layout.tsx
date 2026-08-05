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
  title: "RIZN — Your name. Your nudge. Your rise.",
  description:
    "Personalized motivation every 2 hours — finance, health, love, career. Black-laser energy for busy minds. ₹99/month.",
  openGraph: {
    title: "RIZN — Rise every day",
    description: "Messages with your name that keep your mind stable and moving.",
    type: "website",
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
