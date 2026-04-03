import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { ServiceCatalog } from "@/components/ServiceCatalog";

export const metadata: Metadata = {
	title: "Oferta",
	description: "Poznaj ofertę Wodmix: instalacje, pompy ciepła i prace ziemne.",
};

export default function OfferPage() {
	return (
		<main className='min-h-[calc(100svh-5rem)]'>
			<section className='container mx-auto px-4 md:px-8 py-8 md:py-10'>
				<h1 className='text-4xl md:text-5xl font-extrabold text-center text-brand-blue mb-3'>
					Nasza oferta
				</h1>
				<p className='text-brand-blue-dark text-center max-w-2xl mx-auto mb-7'>
					Sprawdź obszary, w których wspieramy klientów:
					<br />
					instalacje, specjalistyczne prace ziemne i doradztwo dotacyjne
				</p>

				<ServiceCatalog initialServices={servicesData} />
			</section>
		</main>
	);
}
