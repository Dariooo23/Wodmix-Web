import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/Footer";
import { FloatingContactFab } from "@/components/FloatingContactFab";
import { Header } from "@/components/Header";
import { PageFogReveal } from "@/components/PageFogReveal";
import { WaterBackground } from "@/components/WaterBackground";
import { Analytics } from "@vercel/analytics/next";
import {
	BUSINESS,
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	SITE_URL,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: DEFAULT_TITLE,
		template: "%s | Wodmix",
	},
	description: DEFAULT_DESCRIPTION,
	applicationName: BUSINESS.name,
	creator: BUSINESS.name,
	publisher: BUSINESS.name,
	openGraph: {
		type: "website",
		locale: "pl_PL",
		siteName: BUSINESS.name,
		title: DEFAULT_TITLE,
		description: DEFAULT_DESCRIPTION,
	},
	twitter: {
		card: "summary_large_image",
		title: DEFAULT_TITLE,
		description: DEFAULT_DESCRIPTION,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	// Kod weryfikacyjny Google Search Console (metoda „tag HTML”) — ustaw w env.
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
};

export const viewport: Viewport = {
	themeColor: "#003f73",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pl'>
			<body>
				<WaterBackground />
				<div className='relative z-10'>
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
