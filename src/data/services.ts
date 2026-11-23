import { OpeningHours, Service, StoreLocation } from "@/types";

const defaultOpeningHours: OpeningHours[] = [
	{
		days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
		label: "Poniedziałek - Piątek",
		opens: "06:30",
		closes: "17:00",
	},
	{ days: ["Saturday"], label: "Sobota", opens: "07:00", closes: "13:00" },
];

export const storesData: StoreLocation[] = [
	{
		id: "PACANOW",
		city: "Pacanów",
		cityLocative: "Pacanowie",
		street: "Oleśnicka 1",
		postalCode: "28-133",
		region: "świętokrzyskie",
		phones: {
			primary: "+48 888 858 998",
		},
		email: "wodmix@wp.pl",
		googleMapsUrl:
			"https://www.google.com/maps/dir/?api=1&destination=Ole%C5%9Bnicka%201%2C%2028-133%20Pacan%C3%B3w",
		imageUrl: "/Pacanow-Picture.png",
		openingHours: defaultOpeningHours,
	},
	{
		id: "LUBNICE",
		city: "Łubnice",
		cityLocative: "Łubnicach",
		street: "Łubnice 73A",
		postalCode: "28-232",
		region: "świętokrzyskie",
		phones: {
			primary: "+48 888 858 449",
		},
		email: "wodmix@wp.pl",
		googleMapsUrl:
			"https://www.google.com/maps/dir/?api=1&destination=%C5%81ubnice%2073A%2C%2028-232%20%C5%81ubnice",
		imageUrl: "/Lubnice-Picture.png",
		openingHours: defaultOpeningHours,
	},
];

export const servicesData: Service[] = [
	{
		id: "service-installation-1",
		title: "Instalacje wodno-kanalizacyjne",
		description:
			"Kompleksowe wykonanie instalacji wodno-kanalizacyjnych: od demontażu starej instalacji, przez przygotowanie nowych punktów hydraulicznych, po biały montaż i odbiór.",
		imageUrl: "/services/service-wod-kan.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-heavy-1",
		title: "Usługi koparko-ładowarką",
		description:
			"Prace ziemne pod inwestycje i modernizacje: wykopy pod kanalizację, szamba, fundamenty i ogrodzenia, a także niwelacja, utwardzanie i odwodnienie terenu.",
		imageUrl: "/services/service-koparka.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "HEAVY_MACHINERY",
	},
	{
		id: "service-installation-2",
		title: "Instalacje C.O. i gaz",
		description:
			"Wykonujemy montaż kotłów na paliwo stałe i pellet, montaż pieców gazowych, modernizacje centralnego ogrzewania oraz próby szczelności instalacji.",
		imageUrl: "/services/service-co-gaz.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-installation-3",
		title: "Instalacje C.W.U.",
		description:
			"Projektujemy i montujemy systemy ciepłej wody użytkowej dopasowane do budynków nowych i modernizowanych, z naciskiem na oszczędność i trwałość.",
		imageUrl: "/services/service-cwu.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-installation-4",
		title: "Przyłącza wodne, kanalizacyjne i gazowe",
		description:
			"Realizujemy przyłącza i instalacje zewnętrzne dla domów oraz obiektów użytkowych, zapewniając poprawne wykonanie techniczne i wsparcie formalne.",
		imageUrl: "/services/service-przylacza.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-installation-5",
		title: "Przydomowe oczyszczalnie i zbiorniki na deszczówkę",
		description:
			"Wykonujemy montaż przydomowych oczyszczalni ścieków mechanicznych i biologicznych oraz systemów zagospodarowania deszczówki.",
		imageUrl: "/services/service-zbiorniki.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-installation-6",
		title: "Pompy ciepła",
		description:
			"Dobieramy i montujemy pompy ciepła jako nowoczesne, całoroczne źródło komfortu cieplnego. System ogrzewa zimą, chłodzi latem i obniża koszty eksploatacji.",
		imageUrl: "/services/service-pompa-ciepla.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "INSTALLATION",
		requiresValuation: true,
	},
	{
		id: "service-consulting-1",
		title: "Program Czyste Powietrze i doradztwo dotacyjne",
		description:
			"Prowadzimy klienta od audytu energetycznego i doboru urządzeń, przez przygotowanie wniosku, po rozliczenie projektu po otrzymaniu dotacji.",
		imageUrl: "/services/service-dotacje.jpg",
		availableAt: ["PACANOW", "LUBNICE"],
		category: "CONSULTING",
		fundingProgram: "Czyste Powietrze",
	},
];
