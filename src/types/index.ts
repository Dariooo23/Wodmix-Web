export type StoreLocationId = "PACANOW" | "LUBNICE";
export type ServiceCategory = "INSTALLATION" | "HEAVY_MACHINERY" | "CONSULTING";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface OpeningHours {
  days: DayOfWeek[];
  /** Etykieta do wyświetlenia, np. "Poniedziałek - Piątek". */
  label: string;
  /** Format HH:MM, np. "06:30". */
  opens: string;
  closes: string;
}

export interface StoreLocation {
  id: StoreLocationId;
  city: string;
  /** Miejscownik nazwy miejscowości, np. "Pacanowie" (do tekstów „w …”). */
  cityLocative: string;
  street: string;
  postalCode: string;
  /** Województwo, np. "świętokrzyskie". */
  region: string;
  phones: {
    primary: string;
    secondary?: string;
  };
  email: string;
  googleMapsUrl: string;
  imageUrl: string;
  /**
   * Godziny otwarcia — wyświetlane na stronie i w danych strukturalnych.
   * Muszą być identyczne z Profilem Firmy w Google.
   */
  openingHours: OpeningHours[];
}

export interface BaseService {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  availableAt: StoreLocationId[]; // Relacja z encją StoreLocation
}

export interface InstallationService extends BaseService {
  category: "INSTALLATION";
  requiresValuation: boolean;
}

export interface HeavyMachineryService extends BaseService {
  category: "HEAVY_MACHINERY";
  pricePerHour?: number;
}

export interface ConsultingService extends BaseService {
  category: "CONSULTING";
  fundingProgram: string;
}

export type Service =
  | InstallationService
  | HeavyMachineryService
  | ConsultingService;
