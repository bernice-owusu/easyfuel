import type { OnboardingApplicationForm, OnboardingConfiguration } from "../../types";
import { FieldName, describeMimeTypes, formatBytes } from "./fields";

export type FieldErrorKey = FieldName | "logo";

export type FieldErrors = Partial<Record<FieldErrorKey, string>>;

const REQUIRED_FIELDS: { name: FieldName; label: string }[] = [
  { name: "omc_name", label: "Trading name" },
  { name: "legal_name", label: "Legal name" },
  { name: "brand_name", label: "Brand name" },
  { name: "business_registration_number", label: "Business registration number" },
  { name: "business_type", label: "Business type" },
  { name: "country", label: "Country" },
  { name: "region", label: "Region" },
  { name: "city", label: "City" },
  { name: "street_address", label: "Street address" },
  { name: "operating_stations", label: "Operating stations" },
  { name: "expected_users", label: "Expected users" },
  { name: "primary_contact_first_name", label: "Contact first name" },
  { name: "primary_contact_last_name", label: "Contact last name" },
  { name: "primary_contact_job_title", label: "Contact job title" },
  { name: "primary_contact_email", label: "Contact email" },
  { name: "primary_contact_phone", label: "Contact phone" },
  { name: "primary_contact_preferred_channel", label: "Preferred channel" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\d][\d\s()+-]{6,}$/;

export const validateLogo = (
  logo: File | null,
  config: OnboardingConfiguration,
): string | null => {
  if (!logo) return "Logo is required.";
  const allowed = config.logo_mime_types || [];
  if (allowed.length > 0 && !allowed.includes(logo.type)) {
    return `Logo must be a ${describeMimeTypes(allowed)} image.`;
  }
  if (logo.size > config.logo_max_bytes) {
    return `Logo must be ${formatBytes(config.logo_max_bytes)} or smaller.`;
  }
  return null;
};

export const validateApplication = (
  form: OnboardingApplicationForm,
  logo: File | null,
  config: OnboardingConfiguration,
): FieldErrors => {
  const errors: FieldErrors = {};

  for (const { name, label } of REQUIRED_FIELDS) {
    const value = String(form[name] ?? "").trim();
    if (!value) errors[name] = `${label} is required.`;
  }

  const email = form.primary_contact_email.trim();
  if (email && !EMAIL_PATTERN.test(email)) {
    errors.primary_contact_email = "Enter a valid email address.";
  }

  const phone = form.primary_contact_phone.trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.primary_contact_phone = "Enter a valid phone number.";
  }

  const website = form.website.trim();
  if (website && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(website)) {
    errors.website = "Enter a full website URL, e.g. https://acme.example";
  }

  if (
    form.operating_stations &&
    (!/^\d+$/.test(form.operating_stations.trim()) ||
      Number(form.operating_stations) < 1)
  ) {
    errors.operating_stations = "Enter a whole number of 1 or more.";
  }

  if (
    form.expected_users &&
    (!/^\d+$/.test(form.expected_users.trim()) ||
      Number(form.expected_users) < 1)
  ) {
    errors.expected_users = "Enter a whole number of 1 or more.";
  }

  const logoError = validateLogo(logo, config);
  if (logoError) errors.logo = logoError;

  if (!form.terms_accepted) {
    errors.terms_accepted = "You must accept the Terms & Conditions.";
  }
  if (!form.privacy_accepted) {
    errors.privacy_accepted = "You must accept the Privacy Policy.";
  }

  return errors;
};

const SERVER_KEY_MAP: Record<string, FieldErrorKey> = {
  "primary_contact.first_name": "primary_contact_first_name",
  "primary_contact.last_name": "primary_contact_last_name",
  "primary_contact.job_title": "primary_contact_job_title",
  "primary_contact.email": "primary_contact_email",
  "primary_contact.phone": "primary_contact_phone",
  "primary_contact.preferred_channel": "primary_contact_preferred_channel",
  logo: "logo",
};

/** Normalises Laravel validation keys (e.g. `primary_contact.email`) to form field names. */
export const mapServerErrors = (
  serverErrors: Record<string, string>,
): FieldErrors => {
  const result: FieldErrors = {};
  for (const [key, message] of Object.entries(serverErrors)) {
    const name = (SERVER_KEY_MAP[key] || key) as FieldErrorKey;
    if (!result[name]) result[name] = message;
  }
  return result;
};
