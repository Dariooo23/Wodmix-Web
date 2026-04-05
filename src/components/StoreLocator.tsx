import { StoreLocation } from "@/types";

interface StoreLocatorProps {
	stores: StoreLocation[];
}

export const StoreLocator = ({ stores }: StoreLocatorProps) => {
	const glassButtonOnImageClass =
		"inline-flex w-fit border border-white/45 bg-white/12 text-white px-4 py-2 rounded-full font-semibold backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.18),0_6px_18px_rgba(0,0,0,0.25)] transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:bg-white/20 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.65),inset_0_-1px_0_rgba(255,255,255,0.25),0_10px_24px_rgba(0,0,0,0.3)] active:translate-y-0 active:scale-100";
	const openingHours = {
		weekday: "Poniedziałek - Piątek: 6:30 - 17:00",
		saturday: "Sobota: 7:00 - 13:00",
	};

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
			{stores.map(store => {
				const address = `${store.street}, ${store.postalCode} ${store.city}`;
				const embedMapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
					address,
				)}&output=embed`;
				const primaryPhoneHref = `tel:${store.phones.primary.replace(/\s+/g, "")}`;
				const secondaryPhoneHref = store.phones.secondary
					? `tel:${store.phones.secondary.replace(/\s+/g, "")}`
					: null;

				return (
					<div key={store.id} className='space-y-2'>
						<div className='rounded-2xl border border-white/45 bg-white/12 px-4 py-3 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-1px_0_rgba(255,255,255,0.18),0_6px_18px_rgba(0,0,0,0.12)]'>
							<p className='text-brand-blue font-semibold text-lg'>
								Godziny otwarcia:
							</p>
							<p className='text-brand-blue-dark text-base md:text-lg whitespace-nowrap overflow-x-auto'>
								{openingHours.weekday} | {openingHours.saturday}
							</p>
						</div>

						<article
							className='relative overflow-hidden rounded-2xl shadow-lg min-h-[18rem] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl'
							style={{
								backgroundImage: `url(${store.imageUrl})`,
								backgroundSize: "cover",
								backgroundPosition: "center",
							}}>
							<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/30' />
							<div className='relative z-10 p-6 md:p-8 h-full flex flex-col justify-end'>
								<h2 className='text-3xl font-extrabold text-white mb-2'>
									{store.city}
								</h2>
								<p className='text-white/90 mb-4'>{address}</p>
								<div className='space-y-1 mb-4'>
									<a
										href={primaryPhoneHref}
										className='font-bold text-white block'>
										{store.phones.primary}
									</a>
									{store.phones.secondary && (
										<a
											href={secondaryPhoneHref ?? undefined}
											className='font-bold text-white/95 block'>
											{store.phones.secondary}
										</a>
									)}
									<a
										href={`mailto:${store.email}`}
										className='font-bold text-white/90 block'>
										{store.email}
									</a>
								</div>
								<a
									href={store.googleMapsUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={glassButtonOnImageClass}>
									Wyznacz trase
								</a>
							</div>
						</article>

						<div className='overflow-hidden rounded-2xl shadow-md border border-brand-blue/10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:shadow-xl'>
							<iframe
								title={`Mapa Google oddziału ${store.city}`}
								src={embedMapUrl}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
								className='w-full h-52 md:h-56'
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
