import { Service, StoreLocation } from "@/types";

export const storesData: StoreLocation[] = [
  {
    id: "PACANOW",
    city: "Pacanów",
    street: "Oleśnicka 1",
    postalCode: "28-133",
    phones: {
      primary: "+48 888 858 998",
      secondary: "+48 888 977 877",
    },
    email: "wodmix@wp.pl",
    googleMapsUrl: "https://maps.google.com/?q=Olesnicka+1,+28-133+Pacanow",
    imageUrl: "/Pacanow-Picture.png",
  },
  {
    id: "LUBNICE",
    city: "Łubnice",
    street: "ŁUBNICE 73A",
    postalCode: "28-232",
    phones: {
      primary: "+48 888 858 998",
      secondary: "+48 888 977 877",
    },
    email: "wodmix@wp.pl",
    googleMapsUrl: "https://maps.google.com/?q=Lubnice+73A,+28-232+Lubnice",
    imageUrl: "/Lubnice-Picture.png",
  },
];

export const servicesData: Service[] = [
  {
    id: "service-installation-1",
    title: "Instalacje wodno-kanalizacyjne",
    description:
      "Projektowanie i wykonanie instalacji wodno-kanalizacyjnych dla domów i obiektów użytkowych.",
    imageUrl: "/UslugiWodnoKanalizacyjne1.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-heavy-1",
    title: "Usługi koparką i koparkoładowarką",
    description:
      "Realizacja wykopów, niwelacji terenu i prac przygotowawczych pod inwestycje.",
    imageUrl: "/UslugiKoparkoLadowarka1.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "HEAVY_MACHINERY",
    pricePerHour: 150,
  },
  {
    id: "service-installation-2",
    title: "Instalacje C.O., C.W.U., Gaz",
    description:
      "Kompleksowy montaż i modernizacja instalacji centralnego ogrzewania, ciepłej wody oraz gazu.",
    imageUrl: "/Instalacje1.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-installation-3",
    title: "Instalacje zewnętrzne",
    description:
      "Wykonanie instalacji zewnętrznych dla budynków mieszkalnych i przemysłowych.",
    imageUrl: "/Instalacje2.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-installation-4",
    title: "Przyłącza wodne/kanalizacyjne/gazowe",
    description:
      "Budowa i uruchomienie przyłączy wodnych, kanalizacyjnych oraz gazowych.",
    imageUrl: "/Instalacje3.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-installation-5",
    title: "Przydomowe oczyszczalnie ścieków mechaniczne i biologiczne",
    description:
      "Dobór, montaż i serwis przydomowych oczyszczalni ścieków w technologii mechanicznej i biologicznej.",
    imageUrl: "/UslugiWodnoKanalizacyjne2.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-installation-6",
    title: "Pompy Ciepła",
    description:
      "Montaż pomp ciepła wraz z doborem urządzenia i konfiguracją całego systemu.",
    imageUrl: "/PompaCiepla1.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "INSTALLATION",
    requiresValuation: true,
  },
  {
    id: "service-consulting-1",
    title: 'Kompleksowa obsługa programu "Czyste Powietrze"',
    description:
      "Wsparcie od przygotowania wniosku po rozliczenie programu Czyste Powietrze.",
    imageUrl: "/ProgramCzystePowietrze.png",
    availableAt: ["PACANOW", "LUBNICE"],
    category: "CONSULTING",
    fundingProgram: "Czyste Powietrze",
  },
];
