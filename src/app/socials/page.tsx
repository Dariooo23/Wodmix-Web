import type { Metadata } from "next";
import { FaFacebookF } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
	title: "Wodmix na Facebooku",
	description:
		"Oficjalny profil Facebook firmy Wodmix – realizacje, aktualności i kontakt online dla klientów z Pacanowa, Łubnic i województwa świętokrzyskiego.",
	path: "/socials",
});

type Platform = {
	id: string;
	name: string;
	icon: IconType;
	bgColor: string;
	handle: string;
	description: string;
	href: string;
	ctaLabel: string;
};

const platforms: Platform[] = [
	{
		id: "facebook",
		name: "Facebook",
		icon: FaFacebookF,
		bgColor: "#1877F2",
		handle: "facebook.com/profile.php?id=100088445852904",
		description:
			"Aktualności firmy, realizacje instalacji i ważne informacje o usługach Wodmix.",
		href: "https://www.facebook.com/profile.php?id=100088445852904",
		ctaLabel: "Obserwuj",
	},
];

const ctaClass =
	"border border-brand-blue/30 bg-white/65 text-brand-blue rounded-full font-semibold text-sm backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_4px_12px_rgba(0,63,115,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white/80 active:translate-y-0 active:scale-100 px-4 py-1.5";

export default function SocialsPage() {
	return (
		<main className='min-h-[calc(100svh-5rem)]'>
			<section className='container mx-auto px-4 md:px-8 py-8 md:py-10'>
				<div className='max-w-4xl mx-auto text-center mb-8'>
					<h1 className='text-4xl md:text-5xl font-extrabold text-brand-blue mb-3'>
						Znajdź nas na Facebooku
					</h1>
					<p className='text-brand-blue-dark text-lg'>
						Śledź realizacje, nowości ofertowe i aktualności firmy Wodmix.
					</p>
				</div>

				<div className='max-w-xl mx-auto grid grid-cols-1 gap-4'>
					{platforms.map(platform => {
						const Icon = platform.icon;

						return (
							<article
								key={platform.id}
								className='rounded-2xl border border-brand-blue/12 bg-white p-5 shadow-sm flex flex-col gap-3'>
								{/* Icon + name */}
								<div className='flex items-center gap-3'>
									<div
										className='w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm'
										style={{ backgroundColor: platform.bgColor }}>
										<Icon className='h-5 w-5' aria-hidden='true' />
									</div>
									<div className='min-w-0'>
										<p className='font-extrabold text-brand-blue-dark leading-tight'>
											{platform.name}
										</p>
										<p className='text-xs text-brand-blue/60 truncate'>
											{platform.handle}
										</p>
									</div>
								</div>

								{/* Description */}
								<p className='text-sm text-brand-blue-dark/65 leading-relaxed flex-1'>
									{platform.description}
								</p>

								{/* CTA */}
								<a
									href={platform.href}
									target={
										platform.href.startsWith("http") ? "_blank" : undefined
									}
									rel='noopener noreferrer'
									className={ctaClass}>
									{platform.ctaLabel}
								</a>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
}
