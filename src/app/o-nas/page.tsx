import type { Metadata } from "next";
import { HomeScrollJump } from "@/components/HomeScrollJump";

export const metadata: Metadata = {
	title: "O nas",
	description:
		"Poznaj historię Wodmix z Pacanowa. Od 2012 roku realizujemy instalacje i prace ziemne na terenie Powiatu Busko-Zdrój oraz województwa świętokrzyskiego.",
	keywords: [
		"Wodmix",
		"o nas",
		"historia firmy",
		"instalacje sanitarne",
		"pompy ciepła",
		"Pacanów",
		"Łubnice",
		"Powiat Busko-Zdrój",
		"Świętokrzyskie",
	],
};

const historyMilestones = [
	{
		year: "2012",
		title: "Start działalności Wodmix",
		description:
			"Firma Wodmix Dariusz Dziekan rozpoczyna działalność w Pacanowie, stawiając na solidność, terminowość i kompleksową obsługę inwestycji instalacyjnych.",
		placeholderLabel: "Zdjęcie: otwarcie oddziału Pacanów",
	},
	{
		year: "2014",
		title: "Rozwój instalacji wewnętrznych",
		description:
			"Rozszerzamy realizacje o instalacje wodno-kanalizacyjne, C.O. i gazowe w domach jednorodzinnych oraz budynkach modernizowanych.",
		placeholderLabel: "Zdjęcie: instalacje CO/CWU",
	},
	{
		year: "2016",
		title: "Wejście w prace ziemne",
		description:
			"Do oferty dołączają usługi koparko-ładowarką: wykopy pod kanalizację, szamba, fundamenty i przygotowanie terenu pod inwestycje.",
		placeholderLabel: "Zdjęcie: koparkoładowarka w akcji",
	},
	{
		year: "2021",
		title: "Mocny nacisk na pompy ciepła",
		description:
			"Rozwijamy kompetencje w zakresie nowoczesnych źródeł ciepła i wdrażamy kolejne instalacje pomp ciepła dla klientów prywatnych.",
		placeholderLabel: "Zdjęcie: montaż pompy ciepła",
	},
	{
		year: "2023",
		title: "Kompleksowa obsługa programu Czyste Powietrze",
		description:
			"Wspieramy klientów w całym procesie dotacyjnym: od audytu energetycznego i doboru urządzeń po przygotowanie i rozliczenie wniosków.",
		placeholderLabel: "Zdjęcie: Program Czyste Powietrze",
	},
	{
		year: "2025",
		title: "Rozszerzenie działalności o Łubnice",
		description:
			"Uruchamiamy kolejny punkt, zwiększając dostępność usług i obsługę klientów z okolicznych miejscowości.",
		placeholderLabel: "Zdjęcie: otwarcie oddziału Łubnice",
	},
	{
		year: "2026",
		title: "Wodmix dziś",
		description:
			"Realizujemy instalacje i prace ziemne kompleksowo: od doradztwa i wyceny po wykonanie i wsparcie pozakupowe, działając lokalnie i terminowo.",
		placeholderLabel: "Zdjęcie: obecna działalność",
	},
];

export default function AboutPage() {
	return (
		<main>
			<HomeScrollJump
				targetIds={historyMilestones.map(
					milestone => `historia-${milestone.year}`,
				)}
				offset={256}
			/>

			<section className='relative h-[calc(100svh-5rem)] flex items-center justify-center overflow-hidden'>
				<div className='container mx-auto px-4 md:px-8 text-center'>
					<p className='text-brand-blue font-semibold tracking-widest uppercase text-xs mb-4'>
						Lokalna firma od 2012 roku
					</p>
					<h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-brand-blue-dark'>
						Wodmix
					</h1>
					<p className='text-lg md:text-xl font-medium text-brand-blue-dark/70 max-w-2xl mx-auto mb-10 [text-wrap:balance]'>
						Wykonujemy instalacje sanitarne, pompy ciepła i prace ziemne, łącząc
						doświadczenie z nowoczesnymi rozwiązaniami.
					</p>
				</div>

				<div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none select-none'>
					<div className='flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/82 px-4 py-2 shadow-[0_10px_24px_rgba(0,63,115,0.12)] backdrop-blur-sm text-brand-blue-dark'>
						<span className='text-[10px] tracking-[0.28em] uppercase font-semibold'>
							Przewiń w dół
						</span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5 text-brand-blue'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2.5}>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</div>
				</div>
			</section>

			<section
				id='historia-firmy'
				className='container mx-auto px-4 md:px-8 py-20'>
				<div className='max-w-4xl mx-auto text-center mb-12'>
					<p className='text-brand-blue-dark/75 leading-relaxed'>
						Jesteśmy firmą instalacyjną z regionu świętokrzyskiego. Od początku
						działalności stawiamy na jakość wykonania, rzetelne doradztwo i
						sprawną realizację zleceń.
					</p>
				</div>

				<div className='text-center mb-16'>
					<p className='text-brand-blue font-semibold tracking-widest uppercase text-xs mb-3'>
						Skąd jesteśmy
					</p>
					<h2 className='text-4xl md:text-5xl font-extrabold text-brand-blue-dark'>
						Nasza historia
					</h2>
				</div>

				<div className='relative max-w-5xl mx-auto pb-10'>
					<div className='absolute left-4 top-0 bottom-0 w-1 bg-brand-blue/20 rounded-full md:left-1/2 md:-translate-x-px' />

					<div className='flex flex-col gap-0'>
						{historyMilestones.map((milestone, index) => {
							const isEven = index % 2 === 0;
							return (
								<div
									key={milestone.year}
									id={`historia-${milestone.year}`}
									className='relative'>
									<div className='absolute left-4 -translate-x-1/2 top-0 z-10 md:left-1/2'>
										<div className='bg-brand-blue text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap'>
											{milestone.year}
										</div>
									</div>

									<div
										className={`grid grid-cols-1 pt-10 pb-14 gap-6 pl-12 md:pl-0 md:grid-cols-2 md:gap-0 md:items-center`}>
										<div
											className={`${isEven ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"}`}>
											<div className='rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-brand-blue/6 border-2 border-dashed border-brand-blue/20 flex flex-col items-center justify-center gap-2 text-brand-blue/40'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													className='h-10 w-10'
													fill='none'
													viewBox='0 0 24 24'
													stroke='currentColor'
													strokeWidth={1.5}>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18'
													/>
												</svg>
												<span className='text-xs font-medium text-center px-4'>
													{milestone.placeholderLabel}
												</span>
											</div>
										</div>

										<div
											className={`${isEven ? "md:order-2 md:pl-16" : "md:order-1 md:pr-16"}`}>
											<h3 className='text-2xl font-extrabold text-brand-blue-dark mb-3'>
												{milestone.title}
											</h3>
											<p className='text-brand-blue-dark/70 leading-relaxed'>
												{milestone.description}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className='absolute bottom-0 left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-blue/30 border-4 border-white shadow md:left-1/2' />
				</div>
			</section>
		</main>
	);
}
