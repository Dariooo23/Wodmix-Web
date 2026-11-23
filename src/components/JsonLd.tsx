import type { JsonLdObject } from "@/lib/structured-data";

interface JsonLdProps {
	data: JsonLdObject;
}

/**
 * Wstrzykuje dane strukturalne schema.org. `<` jest escapowane, więc żaden
 * tekst w danych nie zamknie tagu `<script>` (ochrona przed XSS).
 */
export const JsonLd = ({ data }: JsonLdProps) => (
	<script
		type='application/ld+json'
		dangerouslySetInnerHTML={{
			__html: JSON.stringify(data).replace(/</g, "\\u003c"),
		}}
	/>
);
