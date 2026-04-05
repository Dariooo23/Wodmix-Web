import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { FloatingContactFab } from "@/components/FloatingContactFab";
import { Header } from "@/components/Header";
import { PageFogReveal } from "@/components/PageFogReveal";
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
		default: "Strona główna",
		template: "%s | Wodmix",
	},
	description:
		"Wodmix: instalacje wodno-kanalizacyjne, C.O. i gaz, pompy ciepła, prace ziemne oraz wsparcie w programie Czyste Powietrze. Pacanów, Powiat Busko-Zdrój i województwo świętokrzyskie.",
	metadataBase: new URL("https://wodmix.pl"),
	openGraph: {
		title: "Wodmix | Instalacje, Pompy Ciepła, Prace Ziemne",
		description:
			"Kompleksowe usługi instalacyjne i ziemne dla klientów z Pacanowa, Powiatu Busko-Zdrój i województwa świętokrzyskiego.",
		url: "https://wodmix.pl",
		siteName: "Wodmix",
		locale: "pl_PL",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Wodmix | Instalacje, Pompy Ciepła, Prace Ziemne",
		description:
			"Instalacje sanitarne, pompy ciepła, prace koparko-ładowarką i doradztwo dotacyjne - Pacanów, Powiat Busko-Zdrój, Świętokrzyskie.",
	},
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
					<PageFogReveal>{children}</PageFogReveal>
					<FloatingContactFab />
					<Footer />
					<Analytics />
				</div>
			</body>
		</html>
	);
}
