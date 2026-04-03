import type { Metadata } from "next";
import { servicesData, storesData } from "@/data/services";

export const metadata: Metadata = {
	title: "Strona główna | Wodmix",
	description:
		"Poznaj firme Wodmix i obszary specjalizacji: instalacje sanitarne, pompy ciepla i prace ziemne.",
};

const serviceCount = servicesData.length;
const branchCount = storesData.length;
const specializationCount = new Set(
	servicesData.map(service => service.category),
).size;
const contactChannels = 4;

const stats = [
	{
		value: `${serviceCount}`,
		label: "ofert usługowych w stałej ofercie",
	},
	{
		value: `${branchCount}`,
		label: "oddziały obsługujące klientów",
	},
	{
		value: `${specializationCount}`,
		label: "główne obszary specjalizacji",
	},
	{
		value: `${contactChannels}`,
		label: "kanały szybkiego kontaktu",
	},
];

const highlights = [
	"Instalacje wodno-kanalizacyjne, grzewcze i sanitarne",
	"Prace koparko-ładowarką i roboty ziemne",
	"Obsługa Pacanowa i Łubnic",
];

export default function Home() {
	return (
		<main>
			<section className='relative min-h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden py-12 md:py-16'>
				<div className='container mx-auto px-4 md:px-8 text-center'>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-brand-blue-dark'>
						Wodmix
					</h1>
					<p className='text-lg md:text-xl font-medium text-brand-blue-dark/70 max-w-2xl mx-auto mb-10 [text-wrap:balance]'>
						Lokalna firma z wieloletnim doświadczeniem.
					</p>

					<div className='max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-left'>
						{stats.map(stat => (
							<div
								key={stat.label}
								className='rounded-2xl border border-brand-blue/12 bg-white/88 shadow-[0_12px_28px_rgba(0,63,115,0.08)] px-5 py-4'>
								<p className='text-3xl md:text-4xl font-extrabold text-brand-blue-dark'>
									{stat.value}
								</p>
								<p className='text-sm md:text-[15px] text-brand-blue-dark/70 mt-1 leading-snug'>
									{stat.label}
								</p>
							</div>
						))}
					</div>

					<div className='max-w-3xl mx-auto flex flex-wrap justify-center gap-3'>
						{highlights.map(item => (
							<span
								key={item}
								className='inline-flex items-center rounded-full border border-brand-blue/15 bg-white/60 px-4 py-2 text-sm md:text-[15px] font-medium text-brand-blue-dark shadow-[0_8px_20px_rgba(0,63,115,0.06)]'>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
