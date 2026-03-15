import type { Metadata } from "next";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export const metadata: Metadata = {
  title: "Socials",
  description:
    "Znajdź Wodmix w mediach społecznościowych i skontaktuj się z nami online.",
};

// TODO: Uzupełnij prawdziwymi linkami i nazwami profili
const platforms = [
  {
    id: "facebook",
    name: "Facebook",
    icon: FaFacebookF,
    bgColor: "#1877F2",
    handle: "@WodmixPacanow", // TODO: uzupełnij
    description: "Aktualności, realizacje i ogłoszenia firmowe.",
    href: "#", // TODO: wstaw link do profilu
    ctaLabel: "Obserwuj",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: FaInstagram,
    bgColor: "#E1306C",
    handle: "@wodmix", // TODO: uzupełnij
    description: "Zdjęcia z realizacji i kulisy pracy zespołu.",
    href: "#", // TODO: wstaw link do profilu
    ctaLabel: "Obserwuj",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    bgColor: "#FF0000",
    handle: "Kanał Wodmix", // TODO: uzupełnij
    description: "Filmy z montaży, poradniki i prezentacje realizacji.",
    href: "#", // TODO: wstaw link do kanału
    ctaLabel: "Subskrybuj",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: FaTiktok,
    bgColor: "#010101",
    handle: "@wodmix", // TODO: uzupełnij
    description: "Krótkie filmiki z codziennej pracy i ciekawostki.",
    href: "#", // TODO: wstaw link do profilu
    ctaLabel: "Obserwuj",
  },
  {
    id: "x",
    name: "X (Twitter)",
    icon: FaXTwitter,
    bgColor: "#14171A",
    handle: "@wodmix", // TODO: uzupełnij
    description: "Szybkie informacje i komentarze branżowe.",
    href: "#", // TODO: wstaw link do profilu
    ctaLabel: "Obserwuj",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: FaLinkedinIn,
    bgColor: "#0A66C2",
    handle: "Wodmix", // TODO: uzupełnij
    description: "Profil firmowy i aktualności ze świata instalacji.",
    href: "#", // TODO: wstaw link do profilu
    ctaLabel: "Obserwuj",
  },
];

const ctaClass =
  "border border-brand-blue/30 bg-white/65 text-brand-blue rounded-full font-semibold text-sm backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_4px_12px_rgba(0,63,115,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-white/80 active:translate-y-0 active:scale-100 px-4 py-1.5";

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

export default function SocialsPage() {
  return (
    <main className="bg-white min-h-[calc(100svh-5rem)]">
      <section className="container mx-auto px-4 md:px-8 py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-3">
            Znajdź nas online
          </h1>
          <p className="text-brand-blue-dark text-lg">
            Śledź nasze profile, oglądaj realizacje i bądź na bieżąco.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(platforms as Platform[]).map((platform) => {
            const Icon = platform.icon;

            return (
              <article
                key={platform.id}
                className="rounded-2xl border border-brand-blue/12 bg-white p-5 shadow-sm flex flex-col gap-3"
              >
                {/* Icon + name */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: platform.bgColor }}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-brand-blue-dark leading-tight">
                      {platform.name}
                    </p>
                    <p className="text-xs text-brand-blue/60 truncate">
                      {platform.handle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-brand-blue-dark/65 leading-relaxed flex-1">
                  {platform.description}
                </p>

                {/* CTA */}
                <a
                  href={platform.href}
                  target={platform.href !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={ctaClass}
                >
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
