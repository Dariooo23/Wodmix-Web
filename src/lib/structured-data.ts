import { servicesData, storesData } from "@/data/services";
import { BUSINESS, SITE_URL, absoluteUrl } from "@/lib/site";
import type { StoreLocation } from "@/types";

export type JsonLdValue =
	| string
	| number
	| boolean
	| null
	| JsonLdValue[]
	| { [key: string]: JsonLdValue | undefined };

export type JsonLdObject = { [key: string]: JsonLdValue | undefined };

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const storeId = (store: StoreLocation): string =>
	`${SITE_URL}/oddzialy#${store.id.toLowerCase()}`;

const areaServedNode = (): JsonLdObject[] =>
	BUSINESS.areaServed.map(name => ({ "@type": "AdministrativeArea", name }));

const organizationNode = (): JsonLdObject => ({
	"@type": "Organization",
	"@id": ORGANIZATION_ID,
	name: BUSINESS.name,
	url: SITE_URL,
	logo: absoluteUrl(BUSINESS.logoPath),
	email: BUSINESS.email,
	telephone: BUSINESS.phones[0],
	description: BUSINESS.description,
	foundingDate: BUSINESS.foundingYear,
	sameAs: [...BUSINESS.socialProfiles],
	areaServed: areaServedNode(),
	location: storesData.map(store => ({ "@id": storeId(store) })),
});

const websiteNode = (): JsonLdObject => ({
	"@type": "WebSite",
	"@id": WEBSITE_ID,
	// `name` + `alternateName` sterują nazwą witryny wyświetlaną nad wynikiem w Google.
	name: BUSINESS.name,
	alternateName: ["Wodmix Pacanów", "Wodmix Łubnice"],
	url: SITE_URL,
	inLanguage: "pl-PL",
	publisher: { "@id": ORGANIZATION_ID },
});

const storeNode = (store: StoreLocation): JsonLdObject => ({
	// Punkt sprzedaży + usługi instalacyjne.
	"@type": ["HardwareStore", "Plumber"],
	"@id": storeId(store),
	name: `${BUSINESS.name} ${store.city}`,
	url: absoluteUrl("/oddzialy"),
	image: absoluteUrl(store.imageUrl),
	logo: absoluteUrl(BUSINESS.logoPath),
	telephone: store.phones.primary,
	email: store.email,
	address: {
		"@type": "PostalAddress",
		streetAddress: store.street,
		postalCode: store.postalCode,
		addressLocality: store.city,
		addressRegion: store.region,
		addressCountry: "PL",
	},
	hasMap: store.googleMapsUrl,
	areaServed: areaServedNode(),
	parentOrganization: { "@id": ORGANIZATION_ID },
	openingHoursSpecification: store.openingHours.map(hours => ({
		"@type": "OpeningHoursSpecification",
		dayOfWeek: hours.days,
		opens: hours.opens,
		closes: hours.closes,
	})),
});

/** Pełny graf firmy: organizacja, witryna i oba punkty (strona główna). */
export const businessGraph = (): JsonLdObject => ({
	"@context": "https://schema.org",
	"@graph": [organizationNode(), websiteNode(), ...storesData.map(storeNode)],
});

/** Graf punktów z odwołaniem do organizacji (strona oddziałów). */
export const storesGraph = (): JsonLdObject => ({
	"@context": "https://schema.org",
	"@graph": [organizationNode(), ...storesData.map(storeNode)],
});

/** Katalog usług (strona oferty). */
export const servicesGraph = (): JsonLdObject => ({
	"@context": "https://schema.org",
	"@type": "OfferCatalog",
	name: "Oferta Wodmix",
	url: absoluteUrl("/oferta"),
	itemListElement: servicesData.map(service => ({
		"@type": "Offer",
		itemOffered: {
			"@type": "Service",
			name: service.title,
			description: service.description,
			image: absoluteUrl(service.imageUrl),
			provider: { "@id": ORGANIZATION_ID },
			areaServed: areaServedNode(),
		},
	})),
});

/** Okruszki — Google pokazuje je zamiast surowego URL-a w wynikach. */
export const breadcrumbGraph = (name: string, path: string): JsonLdObject => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Strona główna",
			item: absoluteUrl("/"),
		},
		{ "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
	],
});
