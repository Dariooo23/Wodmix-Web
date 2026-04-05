import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Strona główna",
	description:
		"Wodmix - instalacje wodno-kanalizacyjne, C.O., gaz, pompy ciepła i prace ziemne. Obsługujemy Pacanów, Powiat Busko-Zdrój i województwo świętokrzyskie.",
	keywords: [
		"Wodmix",
		"instalacje wodno-kanalizacyjne",
		"instalacje C.O. i gaz",
		"pompy ciepła",
		"koparko-ładowarka",
		"Pacanów",
		"Łubnice",
		"Świętokrzyskie",
		"Powiat Busko-Zdrój",
		"hydraulik Pacanów",
		"instalator świętokrzyskie",
	],
};

const stats = [
	{
		value: "14+",
		label: "lat doświadczenia na rynku",
		note: "Firma działa od 2012 roku",
	},
	{
		value: "5+",
		label: "pionów instalacyjnych",
		note: "Wod-Kan, C.O., gaz, oczyszczalnie i prace ziemne pod inwestycje",
	},
	{
		value: "100%",
		label: "kompleksowej obsługi dotacji",
		note: "Czyste Powietrze, Moja Woda i formalności po stronie Wodmix",
	},
	{
		value: "500+",
		label: "zrealizowanych projektów",
		note: "Doświadczenie w domach jednorodzinnych i modernizacjach",
	},
];

const highlights = [
	"Instalacje wodno-kanalizacyjne, grzewcze i sanitarne",
	"Prace koparko-ładowarką, wykopy i niwelacja terenu",
	"Obsługa programu Czyste Powietrze i doradztwo dotacyjne",
	"Obsługa na terenie województwa Świętokrzyskiego",
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
						Firma, która kompleksowo zajmie się doradztwem i wykonaniem
						instalacji dla Twojego domu.
					</p>

					<div className='max-w-5xl mx-auto grid grid-cols-2 gap-4 mb-10 text-left'>
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
								<p className='text-xs md:text-sm text-brand-blue/60 mt-2 leading-snug'>
									{stat.note}
								</p>
							</div>
						))}
					</div>

					<div className='max-w-3xl mx-auto grid grid-cols-2 gap-3'>
						{highlights.map(item => (
							<span
								key={item}
								className='inline-flex w-full justify-center text-center items-center rounded-full border border-brand-blue/15 bg-white/60 px-4 py-2 text-sm md:text-[15px] font-medium text-brand-blue-dark shadow-[0_8px_20px_rgba(0,63,115,0.06)]'>
								{item}
							</span>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
