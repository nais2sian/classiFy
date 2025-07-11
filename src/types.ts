export type AdType = 'AUTO' | 'REAL_ESTATE' | 'SERVICES';
export type FilterValue = 'all' | AdType;

export type BaseAd = {
  id: number;
  name: string;
  description?: string;
  location?: string;
  photo?: string, 
  type: AdType; // дискриминатор
  price?: number;
};

export type AutoAd = BaseAd & {
  type: 'AUTO';
  brand: string;
  model: string;
  year: number;
  mileage: number;
};

export type RealEstateAd = BaseAd & {
  type: 'REAL_ESTATE';
  propertyType: string;
  area: number;
  rooms: number;
};

export type ServicesAd = BaseAd & {
  type: 'SERVICES';
  serviceType: string;
  experience: number;
  workSchedule: string;
};

export type Ad = AutoAd | RealEstateAd | ServicesAd;
