import type {
  OnboardingApplicationForm,
  OnboardingConfiguration,
  OnboardingStatus,
  OnboardingStatusResponse,
  OnboardingSubmission,
} from "../types";

const DEFAULT_BASE_URL = "https://easyfuel.app/api/v1";

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL
).replace(/\/+$/, "");

const STATUS_TOKEN_PREFIX = "easyfuel:onboarding:status-token:";
const ACTIVE_REFERENCE_KEY = "easyfuel:onboarding:active-reference";

export class OnboardingApiError extends Error {
  status: number;
  fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    fieldErrors: Record<string, string> = {},
  ) {
    super(message);
    this.name = "OnboardingApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface ApiEnvelope<T> {
  message?: string;
  data?: T;
  errors?: Record<string, string[] | string>;
}

const readFieldErrors = (
  errors: ApiEnvelope<unknown>["errors"],
): Record<string, string> => {
  if (!errors) return {};
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(errors)) {
    result[key] = Array.isArray(value) ? value[0] : value;
  }
  return result;
};

const request = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<{ message: string; data: T }> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        Accept: "application/json",
        ...(init.headers || {}),
      },
    });
  } catch {
    throw new OnboardingApiError(
      "We could not reach the Easy Fuel server. Check your connection and try again.",
      0,
    );
  }

  const isJson = (response.headers.get("content-type") || "").includes(
    "application/json",
  );
  const body = isJson ? ((await response.json()) as ApiEnvelope<T>) : null;

  if (!response.ok) {
    throw new OnboardingApiError(
      body?.message ||
        "Something went wrong. Please try again in a moment.",
      response.status,
      readFieldErrors(body?.errors),
    );
  }

  return { message: body?.message || "", data: (body?.data ?? null) as T };
};

export const getConfiguration = async (): Promise<OnboardingConfiguration> => {
  const { data } = await request<OnboardingConfiguration>(
    "/public/onboarding/configuration",
  );
  return data;
};

const booleanField = (value: boolean) => (value ? "true" : "false");

export const buildApplicationPayload = (
  form: OnboardingApplicationForm,
  logo: File | null,
  consentVersion: string,
  referrerUrl: string,
  honeypotValue: string,
): FormData => {
  const payload = new FormData();
  payload.append("omc_name", form.omc_name.trim());
  payload.append("legal_name", form.legal_name.trim());
  payload.append("brand_name", form.brand_name.trim());
  payload.append("business_registration_number", form.business_registration_number.trim());
  payload.append("tax_identification_number", form.tax_identification_number.trim());
  payload.append("business_type", form.business_type);
  payload.append("country", form.country.trim());
  payload.append("region", form.region.trim());
  payload.append("city", form.city.trim());
  payload.append("street_address", form.street_address.trim());
  payload.append("digital_address", form.digital_address.trim());
  payload.append("website", form.website.trim());
  payload.append("operating_stations", form.operating_stations.trim());
  payload.append("expected_users", form.expected_users.trim());
  payload.append("primary_contact[first_name]", form.primary_contact_first_name.trim());
  payload.append("primary_contact[last_name]", form.primary_contact_last_name.trim());
  payload.append("primary_contact[job_title]", form.primary_contact_job_title.trim());
  payload.append("primary_contact[email]", form.primary_contact_email.trim());
  payload.append("primary_contact[phone]", form.primary_contact_phone.trim());
  payload.append(
    "primary_contact[preferred_channel]",
    form.primary_contact_preferred_channel,
  );
  payload.append("onboarding_notes", form.onboarding_notes.trim());
  payload.append("terms_accepted", booleanField(form.terms_accepted));
  payload.append("privacy_accepted", booleanField(form.privacy_accepted));
  payload.append("consent_version", consentVersion);
  payload.append("source", "public_landing_page");
  payload.append("campaign", form.campaign.trim());
  payload.append("referrer_url", referrerUrl);
  payload.append("website_confirmation", honeypotValue.trim());
  if (logo) payload.append("logo", logo);
  return payload;
};

export const newIdempotencyKey = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const random = Math.random().toString(36).slice(2);
  return `${Date.now().toString(36)}-${random}-${random}`.slice(0, 100);
};

export const submitApplication = async (
  form: OnboardingApplicationForm,
  logo: File | null,
  consentVersion: string,
  referrerUrl: string,
  idempotencyKey: string,
  honeypotValue: string,
): Promise<OnboardingSubmission> => {
  const { data } = await request<OnboardingSubmission>(
    "/public/onboarding/applications",
    {
      method: "POST",
      headers: {
        "Idempotency-Key": idempotencyKey,
      },
      body: buildApplicationPayload(
        form,
        logo,
        consentVersion,
        referrerUrl,
        honeypotValue,
      ),
    },
  );
  saveStatusToken(data.application_reference, data.status_token);
  saveActiveReference(data.application_reference);
  return data;
};

export const verifyEmail = async (
  applicationReference: string,
  verificationCode: string,
): Promise<OnboardingStatus> => {
  const { data } = await request<{
    application_reference: string;
    status: OnboardingStatus;
  }>("/public/onboarding/applications/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      application_reference: applicationReference,
      verification_code: verificationCode,
    }),
  });
  return data.status;
};

export const resendVerification = async (
  applicationReference: string,
): Promise<number> => {
  const { data } = await request<{ resend_available_in_seconds: number }>(
    "/public/onboarding/applications/resend-verification",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ application_reference: applicationReference }),
    },
  );
  return data.resend_available_in_seconds;
};

export const getApplicationStatus = async (
  applicationReference: string,
): Promise<OnboardingStatusResponse> => {
  const statusToken = readStatusToken(applicationReference);
  if (!statusToken) {
    throw new OnboardingApiError(
      "This browser session is no longer linked to that application. Please submit the form again.",
      401,
    );
  }
  const { data } = await request<OnboardingStatusResponse>(
    `/public/onboarding/applications/${encodeURIComponent(
      applicationReference,
    )}/status`,
    { headers: { "X-Onboarding-Status-Token": statusToken } },
  );
  return data;
};

export const saveStatusToken = (
  applicationReference: string,
  statusToken: string,
): void => {
  try {
    sessionStorage.setItem(
      `${STATUS_TOKEN_PREFIX}${applicationReference}`,
      statusToken,
    );
  } catch {
    // Session storage unavailable — status lookups will ask the user to resubmit.
  }
};

export const readStatusToken = (
  applicationReference: string,
): string | null => {
  try {
    return sessionStorage.getItem(
      `${STATUS_TOKEN_PREFIX}${applicationReference}`,
    );
  } catch {
    return null;
  }
};

export const saveActiveReference = (applicationReference: string): void => {
  try {
    sessionStorage.setItem(ACTIVE_REFERENCE_KEY, applicationReference);
  } catch {
    // Ignore — resume is a convenience only.
  }
};

export const readActiveReference = (): string | null => {
  try {
    return sessionStorage.getItem(ACTIVE_REFERENCE_KEY);
  } catch {
    return null;
  }
};

export const clearOnboardingSession = (): void => {
  try {
    const reference = sessionStorage.getItem(ACTIVE_REFERENCE_KEY);
    if (reference) {
      sessionStorage.removeItem(`${STATUS_TOKEN_PREFIX}${reference}`);
    }
    sessionStorage.removeItem(ACTIVE_REFERENCE_KEY);
  } catch {
    // Ignore.
  }
};
