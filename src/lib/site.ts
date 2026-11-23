import type { Metadata } from "next";

/**
 * Publiczny adres strony (bez końcowego ukośnika).
 *
 * Domyślnie docelowa domena wodmix.pl; `NEXT_PUBLIC_SITE_URL` pozwala to
 * nadpisać (np. na środowisku testowym).
 */
const resolveSiteUrl = (): string => {
	const explicit = process.env.NEXT_PUBLIC_SITE_URL;
	if (explicit) {
		return explicit.replace(/\/+$/, "");
	}

	return "https://wodmix.pl";
};

export const SITE_URL = resolveSiteUrl();

/** Tytuł strony głównej i domyślny tytuł w wynikach wyszukiwania (~60 znaków). */
export const DEFAULT_TITLE =
	"Wodmix Pacanów i Łubnice – instalacje, C.O., pompy ciepła";

/** Meta description strony głównej (≤160 znaków, z wezwaniem do działania). */
export const DEFAULT_DESCRIPTION =
	"Instalacje wod-kan, C.O. i gaz, pompy ciepła, koparko-ładowarka i Czyste Powietrze. Wodmix – Pacanów i Łubnice, od 2012 r. Zadzwoń: 888 858 998.";

export const BUSINESS = {
	name: "Wodmix",
	/** Dłuższy opis używany w danych strukturalnych. */
	description:
		"Wodmix – firma instalacyjna z Pacanowa i Łubnic działająca od 2012 roku: instalacje wodno-kanalizacyjne, C.O. i gazowe, pompy ciepła, przyłącza, przydomowe oczyszczalnie, prace ziemne koparko-ładowarką oraz obsługa programu Czyste Powietrze na terenie powiatu buskiego i województwa świętokrzyskiego.",
	foundingYear: "2012",
	email: "wodmix@wp.pl",
	phones: ["+48 888 858 998", "+48 888 858 449"],
	logoPath: "/logo-full.png",
	/** Profile w social mediach (pełne URL-e) — trafiają do `sameAs`. */
	socialProfiles: ["https://www.facebook.com/profile.php?id=100088445852904"],
	/** Obszar działania (dane strukturalne). */
	areaServed: [
		"Pacanów",
		"Łubnice",
		"powiat buski",
		"powiat staszowski",
		"województwo świętokrzyskie",
	],
} as const;

export const toTelHref = (phone: string): string =>
	`tel:${phone.replace(/\s+/g, "")}`;

export const absoluteUrl = (path: string): string =>
	`${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

interface PageMetadataInput {
	/** Tytuł podstrony (szablon z layoutu doda „| Wodmix”). */
	title: string;
	description: string;
	/** Ścieżka kanoniczna, np. "/oferta". */
	path: string;
	/** Ustaw `false`, żeby wykluczyć podstronę z indeksu. */
	index?: boolean;
}

/**
 * Wspólne metadane podstrony. Next.js scala `openGraph` płytko, więc każda
 * podstrona musi podać komplet pól — inaczej zgubiłaby siteName/locale.
 */
export const pageMetadata = ({
	title,
	description,
	path,
	index = true,
}: PageMetadataInput): Metadata => ({
	title,
	description,
	alternates: { canonical: path },
	openGraph: {
		type: "website",
		locale: "pl_PL",
		siteName: BUSINESS.name,
		url: path,
		title: `${title} | ${BUSINESS.name}`,
		description,
	},
	twitter: {
		card: "summary_large_image",
		title: `${title} | ${BUSINESS.name}`,
		description,
	},
	...(index ? {} : { robots: { index: false, follow: true } }),
});
