import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Nie znaleziono strony",
	robots: { index: false, follow: true },
};

const links = [
	{ href: "/", label: "Strona główna" },
	{ href: "/oferta", label: "Oferta" },
	{ href: "/oddzialy", label: "Oddziały" },
];

export default function NotFound() {
	return (
		<main className='bg-white min-h-[calc(100svh-5rem)] flex items-center justify-center'>
			<section className='container mx-auto px-4 md:px-8 py-16 text-center'>
				<p className='text-brand-blue font-semibold tracking-widest uppercase text-xs mb-3'>
					Błąd 404
				</p>
				<h1 className='text-4xl md:text-5xl font-extrabold text-brand-blue-dark mb-4'>
					Nie znaleziono strony
				</h1>
				<p className='text-brand-blue-dark/70 max-w-xl mx-auto mb-8'>
					Strona, której szukasz, nie istnieje lub została przeniesiona.
				</p>
				<nav
					aria-label='Przydatne linki'
					className='flex flex-wrap justify-center gap-3'>
					{links.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className='rounded-full border border-brand-blue/30 bg-white px-5 py-2 font-semibold text-brand-blue transition-colors hover:bg-brand-blue/5'>
							{link.label}
						</Link>
					))}
				</nav>
			</section>
		</main>
	);
}
