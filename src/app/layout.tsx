import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FloatingContactFab } from "@/components/FloatingContactFab";
import { Header } from "@/components/Header";
import { RouteBodyClass } from "@/components/RouteBodyClass";
import { WaterBackground } from "@/components/WaterBackground";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
		<html lang='pl'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<WaterBackground />
				<div className='relative z-10'>
					<RouteBodyClass />
					<Header />
					{children}
					<FloatingContactFab />
					<Footer />
					<Analytics />
				</div>
			</body>
		</html>
	);
}
