import Image from "next/image";
import Link from "next/link";
import {
	FiArrowUpRight,
	FiMail,
	FiMapPin,
	FiPhone,
	FiShare2,
} from "react-icons/fi";

const footerLinks = [
	{ href: "/", label: "Strona główna" },
	{ href: "/o-nas", label: "O nas" },
	{ href: "/oferta", label: "Oferta" },
	{ href: "/oddzialy", label: "Oddziały" },
	{ href: "/socials", label: "Socials" },
];

export const Footer = () => {
	return (
		<footer className='border-t border-brand-blue-dark/10 bg-brand-blue-dark text-white'>
			<div className='container mx-auto px-4 py-12 md:px-8 md:py-14'>
				<div className='grid gap-10 md:grid-cols-[1.3fr_0.9fr_1fr] md:gap-8 lg:gap-12'>
					<div>
						<Link
							href='/'
							aria-label='Przejdz do strony glownej'
							className='group inline-flex items-center rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'>
							<div className='rounded-full border border-white/30 bg-white/10 px-4 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.18)] transform-gpu transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:bg-white/18 group-hover:border-white/45 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] group-active:translate-y-0 group-active:scale-100 group-active:bg-white/16'>
								<Image
									src='/logo-full.png'
									alt='Wodmix'
									width={168}
									height={44}
									className='h-9 w-auto'
								/>
							</div>
						</Link>
						<p className='mt-5 max-w-md text-sm leading-7 text-white/72 md:text-[15px]'>
							Wodmix to lokalna firma realizująca instalacje sanitarne, systemy
							grzewcze i prace ziemne dla klientów z regionu.
						</p>
					</div>

					<div>
						<h2 className='text-sm font-extrabold uppercase tracking-[0.22em] text-white/65'>
							Linki
						</h2>
						<nav aria-label='Stopka' className='mt-4 flex flex-col gap-2.5'>
							{footerLinks.map(link => (
								<Link
									key={link.href}
									href={link.href}
									className='inline-flex items-center gap-2 text-sm font-medium text-white/78 transition-colors duration-200 hover:text-white'>
									<FiArrowUpRight
										className='h-4 w-4 shrink-0'
										aria-hidden='true'
									/>
									<span>{link.label}</span>
								</Link>
							))}
						</nav>
					</div>

					<div>
						<h2 className='text-sm font-extrabold uppercase tracking-[0.22em] text-white/65'>
							Kontakt
						</h2>
						<div className='mt-4 flex flex-col gap-3 text-sm text-white/78'>
							<a
								href='tel:+48888858998'
								className='inline-flex items-center gap-2 transition-colors duration-200 hover:text-white'>
								<FiPhone className='h-4 w-4 shrink-0' aria-hidden='true' />
								<span>+48 888 858 998</span>
							</a>
							<a
								href='tel:+48888858449'
								className='inline-flex items-center gap-2 transition-colors duration-200 hover:text-white'>
								<FiPhone className='h-4 w-4 shrink-0' aria-hidden='true' />
								<span>+48 888 858 449</span>
							</a>
							<a
								href='mailto:wodmix@wp.pl'
								className='inline-flex items-center gap-2 transition-colors duration-200 hover:text-white'>
								<FiMail className='h-4 w-4 shrink-0' aria-hidden='true' />
								<span>wodmix@wp.pl</span>
							</a>
							<Link
								href='/oddzialy'
								className='inline-flex items-center gap-2 transition-colors duration-200 hover:text-white'>
								<FiMapPin className='h-4 w-4 shrink-0' aria-hidden='true' />
								<span>Zobacz nasze oddziały</span>
							</Link>
							<Link
								href='/socials'
								className='inline-flex items-center gap-2 transition-colors duration-200 hover:text-white'>
								<FiShare2 className='h-4 w-4 shrink-0' aria-hidden='true' />
								<span>Znajdź nas w social mediach</span>
							</Link>
						</div>
					</div>
				</div>

				<div className='mt-10 border-t border-white/12 pt-5 text-xs text-white/52 md:text-sm'>
					<p>© 2026 Wodmix. Wszelkie prawa zastrzeżone.</p>
				</div>
			</div>
		</footer>
	);
};
