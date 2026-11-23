import type { MetadataRoute } from "next";
import { BUSINESS, DEFAULT_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${BUSINESS.name} – Pacanów i Łubnice`,
		short_name: BUSINESS.name,
		description: DEFAULT_DESCRIPTION,
		lang: "pl",
		start_url: "/",
		display: "browser",
		background_color: "#ffffff",
		theme_color: "#003f73",
		icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
	};
}
