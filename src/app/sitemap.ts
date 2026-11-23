import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

type ChangeFrequency = NonNullable<
	MetadataRoute.Sitemap[number]["changeFrequency"]
>;

interface SitemapRoute {
	path: string;
	changeFrequency: ChangeFrequency;
	priority: number;
}

/** Pomijamy /kontakt — to tylko przekierowanie na /oddzialy. */
const routes: SitemapRoute[] = [
	{ path: "/", changeFrequency: "monthly", priority: 1 },
	{ path: "/oferta", changeFrequency: "monthly", priority: 0.9 },
	{ path: "/oddzialy", changeFrequency: "yearly", priority: 0.9 },
	{ path: "/o-nas", changeFrequency: "yearly", priority: 0.6 },
	{ path: "/socials", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date();

	return routes.map(({ path, changeFrequency, priority }) => ({
		url: absoluteUrl(path),
		lastModified,
		changeFrequency,
		priority,
	}));
}
