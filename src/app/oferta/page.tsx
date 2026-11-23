import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCatalog } from "@/components/ServiceCatalog";
import { pageMetadata } from "@/lib/site";
import { breadcrumbGraph, servicesGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
	title: "Oferta – instalacje wod-kan, C.O., gaz, pompy ciepła, koparka",
	description:
		"Instalacje wodno-kanalizacyjne, C.O. i gaz, C.W.U., przyłącza, oczyszczalnie, pompy ciepła, koparko-ładowarka i Czyste Powietrze. Pacanów, Łubnice i okolice.",
	path: "/oferta",
});

export default function OfferPage() {
	return (
		<main className='min-h-[calc(100svh-5rem)]'>
			<JsonLd data={servicesGraph()} />
			<JsonLd data={breadcrumbGraph("Oferta", "/oferta")} />
			<section className='container mx-auto px-4 md:px-8 py-8 md:py-10'>
				<h1 className='text-4xl md:text-5xl font-extrabold text-center text-brand-blue mb-3'>
					Nasza oferta
				</h1>
				<p className='text-brand-blue-dark text-center max-w-2xl mx-auto mb-7'>
					Realizujemy usługi instalacyjne i ziemne kompleksowo: od doradztwa,
					przez wycenę, po wykonanie i wsparcie formalne przy dotacjach na
					terenie województwa świętokrzyskiego.
				</p>

				<ServiceCatalog initialServices={servicesData} />
			</section>
		</main>
	);
}
