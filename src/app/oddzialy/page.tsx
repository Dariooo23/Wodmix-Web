import type { Metadata } from "next";
import { storesData } from "@/data/services";
import { JsonLd } from "@/components/JsonLd";
import { StoreLocator } from "@/components/StoreLocator";
import { pageMetadata } from "@/lib/site";
import { breadcrumbGraph, storesGraph } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
	title: "Oddziały w Pacanowie i Łubnicach – adres, telefon, godziny",
	description:
		"Wodmix: Pacanów, ul. Oleśnicka 1 i Łubnice 73A. Otwarte pon.–pt. 6:30–17:00, sob. 7:00–13:00. Sprawdź telefon i wyznacz trasę na mapie.",
	path: "/oddzialy",
});

export default function BranchesPage() {
	return (
		<main className='min-h-[calc(100svh-5rem)]'>
			<JsonLd data={storesGraph()} />
			<JsonLd data={breadcrumbGraph("Oddziały", "/oddzialy")} />
			<section
				id='oddzialy'
				className='container mx-auto px-4 md:px-8 pt-4 pb-20 md:pt-6 md:pb-28'>
				<div className='text-center mb-3 md:mb-4'>
					<h1 className='text-4xl md:text-5xl font-extrabold text-brand-blue'>
						Nasze oddziały
					</h1>
					<p className='text-brand-blue-dark mt-2 max-w-2xl mx-auto'>
						Oddziały Wodmix w Pacanowie i Łubnicach — znajdź najbliższy i
						skontaktuj się z nami.
					</p>
				</div>

				<StoreLocator stores={storesData} />
			</section>
		</main>
	);
}
