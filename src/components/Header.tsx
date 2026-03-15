import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiMenu, FiPackage, FiPhone, FiShare2 } from "react-icons/fi";

export const Header = () => {
  const glassButtonClass =
    "rounded-full border border-white/30 bg-white/10 text-white font-bold text-sm md:text-base shadow-[0_6px_18px_rgba(0,0,0,0.18)] transform-gpu transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white/18 hover:border-white/45 hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-100 active:bg-white/16";
  const buttonContentClass = "inline-flex items-center gap-2";
  const mobileMenuItemClass =
    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-blue-dark/10 bg-brand-blue-dark shadow-sm font-sans">
      <div className="relative z-10 container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Sekcja Logo */}
        <Link
          href="/"
          aria-label="Przejdz do strony glownej"
          className="group inline-flex items-center rounded-xl px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          <div className="rounded-full border border-white/30 bg-white/10 px-4 py-2 shadow-[0_6px_18px_rgba(0,0,0,0.18)] transform-gpu transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-[1.03] group-hover:bg-white/18 group-hover:border-white/45 group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.22)] group-active:translate-y-0 group-active:scale-100 group-active:bg-white/16">
            <Image
              src="/logo-full.png"
              alt="Wodmix"
              width={168}
              height={44}
              className="h-9 w-auto md:h-10"
              priority
            />
          </div>
        </Link>

        {/* Nawigacja i CTA */}
        <div className="flex items-center justify-end gap-2">
          <nav
            aria-label="Nawigacja główna"
            className="hidden lg:flex items-center gap-2"
          >
            <Link
              href="/oferta"
              className={`${glassButtonClass} px-3 md:px-6 py-2 md:py-2.5`}
            >
              <span className={buttonContentClass}>
                <FiPackage className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Oferta</span>
              </span>
            </Link>
            <Link
              href="/oddzialy"
              className={`${glassButtonClass} px-3 md:px-6 py-2 md:py-2.5`}
            >
              <span className={buttonContentClass}>
                <FiMapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Oddziały</span>
              </span>
            </Link>
            <Link
              href="/socials"
              className={`${glassButtonClass} px-3 md:px-6 py-2 md:py-2.5`}
            >
              <span className={buttonContentClass}>
                <FiShare2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Socials</span>
              </span>
            </Link>
          </nav>

          <a
            href="tel:+48888858998"
            className={`${glassButtonClass} px-3 md:px-6 py-2 md:py-2.5`}
          >
            <span className={buttonContentClass}>
              <FiPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Zadzwoń</span>
            </span>
          </a>

          <details className="relative lg:hidden group">
            <summary
              className={`${glassButtonClass} ${buttonContentClass} list-none cursor-pointer px-4 py-2.5 [&::-webkit-details-marker]:hidden`}
            >
              <FiMenu className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Menu</span>
            </summary>

            <nav
              aria-label="Menu mobilne"
              className="absolute right-0 top-full mt-3 w-64 rounded-3xl border border-white/20 bg-brand-blue-dark/95 p-2 backdrop-blur-xl shadow-[0_18px_48px_rgba(0,0,0,0.28)]"
            >
              <Link href="/oferta" className={mobileMenuItemClass}>
                <FiPackage className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Oferta</span>
              </Link>
              <Link href="/oddzialy" className={mobileMenuItemClass}>
                <FiMapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Oddziały</span>
              </Link>
              <Link href="/socials" className={mobileMenuItemClass}>
                <FiShare2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Socials</span>
              </Link>
              <a href="tel:+48888858998" className={mobileMenuItemClass}>
                <FiPhone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Zadzwoń</span>
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
};
