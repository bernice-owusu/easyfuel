import React from "react";
import type { OnboardingApplicationForm } from "../../types";

export const DEFAULT_CONSENT_VERSION = "2026-09";

export const BUSINESS_TYPE_OPTIONS = [
  { value: "limited_liability_company", label: "Limited Liability Company" },
  { value: "sole_proprietorship", label: "Sole Proprietorship" },
  { value: "partnership", label: "Partnership" },
  { value: "public_limited_company", label: "Public Limited Company" },
  { value: "non_profitable", label: "Non-Profit Organisation" },
  { value: "government_institution", label: "Government Institution" },
  { value: "other", label: "Other" },
];

export const PREFERRED_CHANNEL_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone Call" },
  { value: "whatsapp", label: "WhatsApp" },
];

export const COUNTRY_OPTIONS = [
  "Ghana",
  "Nigeria",
  "Ivory Coast",
  "Senegal",
  "Togo",
  "Benin",
  "Burkina Faso",
  "Gambia",
  "Guinea",
  "Sierra Leone",
  "Liberia",
  "Cameroon",
  "South Africa",
  "Kenya",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
].map((country) => ({ value: country, label: country }));

export const EMPTY_FORM: OnboardingApplicationForm = {
  omc_name: "",
  legal_name: "",
  brand_name: "",
  business_registration_number: "",
  tax_identification_number: "",
  business_type: "",
  country: "Ghana",
  region: "",
  city: "",
  street_address: "",
  digital_address: "",
  website: "",
  operating_stations: "",
  expected_users: "",
  primary_contact_first_name: "",
  primary_contact_last_name: "",
  primary_contact_job_title: "",
  primary_contact_email: "",
  primary_contact_phone: "",
  primary_contact_preferred_channel: "email",
  onboarding_notes: "",
  terms_accepted: false,
  privacy_accepted: false,
  campaign: "",
};

export type FieldName = keyof OnboardingApplicationForm;

export interface FieldDef {
  name: FieldName;
  label: string;
  type: "text" | "email" | "tel" | "url" | "number" | "select" | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  autoComplete?: string;
  min?: number;
  hint?: string;
  full?: boolean;
  disabled?: boolean;
}

export const controlClass = (hasError: boolean): string =>
  [
    "w-full px-4 py-3.5 rounded-xl border bg-white text-gray-800 outline-none transition-all",
    "focus:ring-2 placeholder-gray-400",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20",
  ].join(" ");

export const LABEL_CLASS = "block text-sm font-semibold text-gray-700 mb-2";
export const ERROR_CLASS = "mt-1.5 text-xs text-red-600";

export const formatBytes = (bytes: number): string =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const MIME_LABELS: Record<string, string> = {
  "image/jpeg": "JPEG",
  "image/png": "PNG",
  "image/webp": "WebP",
  "image/gif": "GIF",
  "image/svg+xml": "SVG",
};

const listMimeTypes = (mimeTypes: string[]): string =>
  mimeTypes
    .map((mimeType) => MIME_LABELS[mimeType] || mimeType)
    .join(", ");

export const describeMimeTypes = (mimeTypes: string[]): string =>
  mimeTypes.length > 0 ? listMimeTypes(mimeTypes) : "the listed formats";

export const mimeTypesToAccept = (mimeTypes: string[]): string =>
  mimeTypes.join(",");

interface FieldProps {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (name: FieldName, value: string) => void;
}

export const Field: React.FC<FieldProps> = ({ field, value, error, onChange }) => {
  const { name, label, type, placeholder, options, required, autoComplete, min, hint, disabled } =
    field;
  const id = `signup-${name}`;

  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className={LABEL_CLASS}>
        {label}
        {required && <span className="text-brand-orange ml-0.5">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={id}
          name={name}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(event) => onChange(name, event.target.value)}
          className={controlClass(Boolean(error))}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onChange(name, event.target.value)}
          className={`${controlClass(Boolean(error))} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          min={min}
          value={value}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(name, event.target.value)}
          className={controlClass(Boolean(error))}
        />
      )}

      {error ? (
        <p className={ERROR_CLASS}>{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-gray-400">{hint}</p>
      ) : null}
    </div>
  );
};

export const SectionHeading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-orange flex items-center gap-2">
    <span className="w-1 h-4 rounded-full bg-brand-orange inline-block" />
    {children}
  </h4>
);
