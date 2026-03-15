export type StoreLocationId = "PACANOW" | "LUBNICE";
export type ServiceCategory = "INSTALLATION" | "HEAVY_MACHINERY" | "CONSULTING";

export interface StoreLocation {
  id: StoreLocationId;
  city: string;
  street: string;
  postalCode: string;
  phones: {
    primary: string;
    secondary?: string;
  };
  email: string;
  googleMapsUrl: string;
  imageUrl: string;
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
