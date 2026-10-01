import React, { useRef } from "react";
import {
  Image as ImageIcon,
  Trash2,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import type {
  OnboardingApplicationForm,
  OnboardingConfiguration,
} from "../../types";
import {
  BUSINESS_TYPE_OPTIONS,
  ERROR_CLASS,
  Field,
  FieldDef,
  FieldName,
  PREFERRED_CHANNEL_OPTIONS,
  SectionHeading,
  describeMimeTypes,
  formatBytes,
  mimeTypesToAccept,
} from "./fields";
import { validateApplication, type FieldErrors } from "./validation";
import { useCountries } from "../../hooks/useCountries";

interface FieldGroup {
  title: string;
  description: string;
  fields: FieldDef[];
}

interface Props {
  form: OnboardingApplicationForm;
  errors: FieldErrors;
  logo: File | null;
  logoPreview: string | null;
  config: OnboardingConfiguration;
  consentVersion: string;
  honeypotRef: React.RefObject<HTMLInputElement | null>;
  submitting: boolean;
  onUpdate: (patch: Partial<OnboardingApplicationForm>) => void;
  onLogoChange: (file: File | null) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onSubmit: () => void;
}

export const ApplicationFormStep: React.FC<Props> = ({
  form,
  errors,
  logo,
  logoPreview,
  config,
  consentVersion,
  honeypotRef,
  submitting,
  onUpdate,
  onLogoChange,
  onOpenTerms,
  onOpenPrivacy,
  onSubmit,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    countries,
    loading: countriesLoading,
    error: countriesError,
  } = useCountries();

  const handleFieldChange = (name: FieldName, value: string) =>
    onUpdate({ [name]: value } as Partial<OnboardingApplicationForm>);

  const fieldGroups = React.useMemo<FieldGroup[]>(
    () => [
      {
        title: "Company Registration",
        description:
          "How your organisation is registered with the authorities.",
        fields: [
          {
            name: "omc_name",
            label: "Trading Name",
            type: "text",
            required: true,
            placeholder: "Acme Petroleum Ltd",
          },
          {
            name: "legal_name",
            label: "Legal Name",
            type: "text",
            required: true,
            placeholder: "Acme Petroleum Company Limited",
          },
          {
            name: "brand_name",
            label: "Brand Name",
            type: "text",
            required: true,
            placeholder: "Acme Fuel",
          },
          {
            name: "business_registration_number",
            label: "Business Registration Number",
            type: "text",
            required: true,
            placeholder: "CS123456789",
          },
          {
            name: "tax_identification_number",
            label: "Tax Identification Number",
            type: "text",
            placeholder: "C0000000000",
          },
          {
            name: "business_type",
            label: "Business Type",
            type: "select",
            required: true,
            options: BUSINESS_TYPE_OPTIONS,
          },
        ],
      },
      {
        title: "Registered Address",
        description:
          "Where your head office or principal place of business is located.",
        fields: [
          {
            name: "country",
            label: "Country",
            type: "select",
            required: true,
            options: countries,
            disabled: countriesLoading,
            hint: countriesLoading
              ? "Loading countries…"
              : countriesError
                ? `Error: ${countriesError}. Showing limited list.`
                : undefined,
          },
          {
            name: "region",
            label: "Region",
            type: "text",
            required: true,
            placeholder: "Greater Accra",
          },
          {
            name: "city",
            label: "City",
            type: "text",
            required: true,
            placeholder: "Accra",
          },
          {
            name: "street_address",
            label: "Street Address",
            type: "text",
            required: true,
            placeholder: "12 Independence Avenue",
          },
          {
            name: "digital_address",
            label: "Digital Address",
            type: "text",
            placeholder: "GA-123-4567",
            hint: "Optional — your Ghana Post GPS digital address.",
          },
          {
            name: "website",
            label: "Website",
            type: "url",
            placeholder: "https://acme.example",
          },
        ],
      },
      {
        title: "Operation Scale",
        description: "Helps us size the right deployment for you.",
        fields: [
          {
            name: "operating_stations",
            label: "Operating Stations",
            type: "number",
            required: true,
            min: 1,
            placeholder: "5",
          },
          {
            name: "expected_users",
            label: "Expected Users",
            type: "number",
            required: true,
            min: 1,
            placeholder: "80",
          },
        ],
      },
      {
        title: "Primary Contact",
        description: "The person we will reach out to during onboarding.",
        fields: [
          {
            name: "primary_contact_first_name",
            label: "First Name",
            type: "text",
            required: true,
            autoComplete: "given-name",
            placeholder: "Ama",
          },
          {
            name: "primary_contact_last_name",
            label: "Last Name",
            type: "text",
            required: true,
            autoComplete: "family-name",
            placeholder: "Mensah",
          },
          {
            name: "primary_contact_job_title",
            label: "Job Title",
            type: "text",
            required: true,
            autoComplete: "organization-title",
            placeholder: "Operations Director",
          },
          {
            name: "primary_contact_email",
            label: "Email Address",
            type: "email",
            required: true,
            autoComplete: "email",
            placeholder: "ama@acme.example",
            hint: "Your verification code is sent here.",
          },
          {
            name: "primary_contact_phone",
            label: "Phone Number",
            type: "tel",
            required: true,
            autoComplete: "tel",
            placeholder: "+233240000000",
          },
          {
            name: "primary_contact_preferred_channel",
            label: "Preferred Channel",
            type: "select",
            required: true,
            options: PREFERRED_CHANNEL_OPTIONS,
            hint: "You will be contacted via this channel.",
          },
        ],
      },
    ],
    [countries, countriesLoading],
  );

  const validationErrors = validateApplication(form, logo, config);
  const isFormValid = Object.keys(validationErrors).length === 0;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      noValidate
      className="space-y-8"
    >
      {fieldGroups.map((group) => (
        <fieldset key={group.title} className="space-y-4">
          <div>
            <SectionHeading>{group.title}</SectionHeading>
            <p className="text-sm text-gray-500 mt-1.5">{group.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {group.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={String(form[field.name] ?? "")}
                error={errors[field.name]}
                onChange={handleFieldChange}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {/* Brand Logo */}
      <fieldset className="space-y-4">
        <div>
          <SectionHeading>
            Brand Logo <span className="text-brand-orange ml-0.5">*</span>
          </SectionHeading>
          <p className="text-sm text-gray-500 mt-1.5">
            {describeMimeTypes(config.logo_mime_types)} up to{" "}
            {formatBytes(config.logo_max_bytes)}. Kept private until your
            application is approved.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={mimeTypesToAccept(config.logo_mime_types)}
          className="sr-only"
          onChange={(event) => onLogoChange(event.target.files?.[0] ?? null)}
        />

        {logo && logoPreview ? (
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-orange-100 bg-orange-50">
            <img
              src={logoPreview}
              alt="Uploaded logo preview"
              className="w-16 h-16 rounded-xl object-contain bg-white border border-orange-100 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {logo.name}
              </p>
              <p className="text-xs text-gray-500">
                {formatBytes(logo.size)} ·{" "}
                {logo.type.replace("image/", "").toUpperCase()}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="p-2 rounded-full text-gray-500 hover:bg-white hover:text-red-600 transition-colors shrink-0"
              aria-label="Remove logo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-gray-200 hover:border-brand-orange hover:bg-orange-50/40 transition-colors cursor-pointer"
          >
            <span className="w-11 h-11 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
              <ImageIcon className="w-5 h-5" />
            </span>
            <span className="text-left sm:text-center">
              <span className="block text-sm font-semibold text-gray-800">
                Upload your logo
              </span>
              <span className="block text-xs text-gray-500">
                or click to browse — max {formatBytes(config.logo_max_bytes)}
              </span>
            </span>
          </button>
        )}

        {errors.logo && <p className={ERROR_CLASS}>{errors.logo}</p>}
      </fieldset>

      {/* Notes */}
      <fieldset className="space-y-4">
        <div>
          <SectionHeading>Anything Else?</SectionHeading>
          <p className="text-sm text-gray-500 mt-1.5">
            Tell us about your fleet, integrations or timelines.
          </p>
        </div>
        <Field
          field={{
            name: "onboarding_notes",
            label: "Onboarding Notes",
            type: "textarea",
            placeholder: "We operate five stations in two regions.",
            full: true,
          }}
          value={form.onboarding_notes}
          onChange={handleFieldChange}
        />
      </fieldset>

      {/* Consent */}
      <fieldset className="space-y-3 p-5 rounded-2xl bg-brand-light border border-gray-100">
        <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.terms_accepted}
            onChange={(event) =>
              onUpdate({ terms_accepted: event.target.checked })
            }
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-orange shrink-0 cursor-pointer"
          />
          <span>
            <span className="text-brand-orange ml-0.5">*</span> I accept the{" "}
            <button
              type="button"
              onClick={onOpenTerms}
              className="font-semibold text-brand-orange hover:underline cursor-pointer"
            >
              Terms & Conditions
            </button>
            .
          </span>
        </label>
        {errors.terms_accepted && (
          <p className={`${ERROR_CLASS} ml-7`}>{errors.terms_accepted}</p>
        )}

        <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.privacy_accepted}
            onChange={(event) =>
              onUpdate({ privacy_accepted: event.target.checked })
            }
            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-orange shrink-0 cursor-pointer"
          />
          <span>
            <span className="text-brand-orange ml-0.5">*</span> I accept the{" "}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="font-semibold text-brand-orange hover:underline cursor-pointer"
            >
              Privacy Policy
            </button>
            .
          </span>
        </label>
        {errors.privacy_accepted && (
          <p className={`${ERROR_CLASS} ml-7`}>{errors.privacy_accepted}</p>
        )}

        <p className="flex items-start gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200/70">
          <ShieldCheck className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
          <span>
            Consent version {consentVersion}. Submitting an application does not
            create an account — a System Administrator reviews it first, and
            only then is your organisation activated.
          </span>
        </p>
      </fieldset>

      {/* Honeypot — must stay empty */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="signup-website-confirmation">Website</label>
        <input
          ref={honeypotRef}
          id="signup-website-confirmation"
          name="website_confirmation"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      <button
        type="submit"
        disabled={submitting || !isFormValid}
        className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 hover:translate-y-[-1px] cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting application…</span>
          </>
        ) : (
          <>
            <span>Submit Application</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
