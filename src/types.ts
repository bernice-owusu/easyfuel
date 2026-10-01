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

export type BusinessType =
  | "limited_liability_company"
  | "sole_proprietorship"
  | "partnership"
  | "public_limited_company"
  | "non_profitable"
  | "government_institution"
  | "other";

export type PreferredChannel = "email" | "phone" | "whatsapp";

export type OnboardingStatus =
  | "pending_verification"
  | "submitted"
  | "under_review"
  | "information_requested"
  | "approved"
  | "rejected"
  | "converted"
  | "withdrawn"
  | "expired";

export interface OnboardingApplicationForm {
  omc_name: string;
  legal_name: string;
  brand_name: string;
  business_registration_number: string;
  tax_identification_number: string;
  business_type: BusinessType | "";
  country: string;
  region: string;
  city: string;
  street_address: string;
  digital_address: string;
  website: string;
  operating_stations: string;
  expected_users: string;
  primary_contact_first_name: string;
  primary_contact_last_name: string;
  primary_contact_job_title: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  primary_contact_preferred_channel: PreferredChannel | "";
  onboarding_notes: string;
  terms_accepted: boolean;
  privacy_accepted: boolean;
  campaign: string;
}

export interface OnboardingConfiguration {
  consent_version: string;
  logo_max_bytes: number;
  logo_mime_types: string[];
  verification_expires_in_seconds: number;
  resend_available_in_seconds: number;
}

export interface OnboardingSubmission {
  application_reference: string;
  status: OnboardingStatus;
  status_token: string;
  verification_expires_in_seconds: number;
  resend_available_in_seconds: number;
}

export interface OnboardingStatusResponse {
  application_reference: string;
  omc_name: string;
  status: OnboardingStatus;
  email_verified: boolean;
  submitted_at: string | null;
  information_request: string | null;
  rejection_reason: string | null;
  updated_at: string | null;
}
