export interface NavItem {
  name: string;
  href: string;
  subItems?: { name: string; href: string }[];
}

export interface SlideItem {
  id: number;
  subtitle: string;
  titlePrimary: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  bgImage: string;
  btnText: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string;
  iconName: 'fuel' | 'flame' | 'zap' | 'gauge';
  image: string;
  specs: string[];
}

export interface EasyFuelService {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ExtraServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface QuoteRequest {
  fullName: string;
  email: string;
  phone: string;
  fuelType: string;
  location: string;
  vehicleType: string;
  quantity: number;
  notes?: string;
}
