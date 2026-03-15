import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RouteBodyClass } from "@/components/RouteBodyClass";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Strona główna | Wodmix",
    template: "%s | Wodmix",
  },
  description:
    "Kompleksowe instalacje sanitarne, pompy ciepła i usługi koparko-ładowarką. Skontaktuj się z firmą Wodmix.",
  icons: {
    icon: "/logo-icon.png?v=2",
    shortcut: "/logo-icon.png?v=2",
    apple: "/logo-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RouteBodyClass />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
