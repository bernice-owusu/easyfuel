import React, { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, MailCheck, X } from "lucide-react";
import type {
  OnboardingApplicationForm,
  OnboardingConfiguration,
  OnboardingStatus,
} from "../types";
import {
  OnboardingApiError,
  clearOnboardingSession,
  getConfiguration,
  newIdempotencyKey,
  submitApplication,
  verifyEmail,
} from "../lib/onboardingApi";
import { ApplicationFormStep } from "./signup/ApplicationFormStep";
import { VerificationStep } from "./signup/VerificationStep";
import { StatusStep } from "./signup/StatusStep";
import {
  DEFAULT_CONSENT_VERSION,
  EMPTY_FORM,
  formatBytes,
} from "./signup/fields";
import {
  FieldErrors,
  mapServerErrors,
  validateApplication,
} from "./signup/validation";
import { Footer } from "./Footer";

const FALLBACK_CONFIG: OnboardingConfiguration = {
  consent_version: DEFAULT_CONSENT_VERSION,
  logo_max_bytes: 1024 * 1024,
  logo_mime_types: ["image/jpeg", "image/png", "image/webp"],
  verification_expires_in_seconds: 600,
  resend_available_in_seconds: 60,
};

const readCampaign = (): string => {
  try {
    return (
      new URLSearchParams(window.location.search).get("utm_campaign") || ""
    );
  } catch {
    return "";
  }
};

type SignupStep = "form" | "verification" | "status";

export const SignupPage: React.FC = () => {
  const [step, setStep] = useState<SignupStep>("form");
  const [form, setForm] = useState<OnboardingApplicationForm>(() => ({
    ...EMPTY_FORM,
    campaign: readCampaign(),
  }));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [config, setConfig] =
    useState<OnboardingConfiguration>(FALLBACK_CONFIG);
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState<string | null>(null);
  const [verifiedStatus, setVerifiedStatus] = useState<OnboardingStatus | null>(
    null,
  );

  const idempotencyKeyRef = useRef(newIdempotencyKey());
  const bodyRef = useRef<HTMLDivElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const contactEmailRef = useRef(form.primary_contact_email);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const loadConfiguration = useCallback(async () => {
    try {
      const remote = await getConfiguration();
      if (remote) setConfig({ ...FALLBACK_CONFIG, ...remote });
    } catch {
      // Use fallback config silently
    }
  }, []);

  useEffect(() => {
    setStep("form");
    setErrors({});
    setSubmitError(null);
    setReference(null);
    setContactEmail(null);
    setVerifiedStatus(null);
    loadConfiguration();
  }, [loadConfiguration]);

  const updateForm = (patch: Partial<OnboardingApplicationForm>) => {
    setForm((current) => {
      const next = { ...current, ...patch };
      contactEmailRef.current = next.primary_contact_email;
      return next;
    });
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach(
        (key) => delete next[key as keyof FieldErrors],
      );
      return next;
    });
  };

  const handleLogoChange = (file: File | null) => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    const preview = file ? URL.createObjectURL(file) : null;
    previewUrlRef.current = preview;
    setLogo(file);
    setLogoPreview(preview);
    setErrors((current) => {
      const next = { ...current };
      delete next.logo;
      return next;
    });
  };

  const handleSubmit = async () => {
    const validationErrors = validateApplication(form, logo, config);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitError("Please correct the highlighted fields and try again.");
      bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitApplication(
        form,
        logo,
        config.consent_version,
        document.referrer,
        idempotencyKeyRef.current,
        honeypotRef.current?.value ?? "",
      );
      setReference(result.application_reference);
      setContactEmail(form.primary_contact_email);
      setStep("verification");
      bodyRef.current?.scrollTo({ top: 0 });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      if (caught instanceof OnboardingApiError) {
        setSubmitError(caught.message);
        if (Object.keys(caught.fieldErrors).length > 0) {
          setErrors(mapServerErrors(caught.fieldErrors));
        }
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartOver = () => {
    idempotencyKeyRef.current = newIdempotencyKey();
    clearOnboardingSession();
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setForm({ ...EMPTY_FORM, campaign: readCampaign() });
    contactEmailRef.current = "";
    setLogo(null);
    setLogoPreview(null);
    setReference(null);
    setContactEmail(null);
    setVerifiedStatus(null);
    setErrors({});
    setSubmitError(null);
    setStep("form");
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const handleVerified = useCallback((status: OnboardingStatus) => {
    setVerifiedStatus(status);
    setStep("status");
    bodyRef.current?.scrollTo({ top: 0 });
  }, []);

  const handleEditApplication = useCallback(() => {
    setStep("form");
    bodyRef.current?.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2">
              {["form", "verification", "status"].map((s, idx) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex items-center gap-1.5 ${idx > 0 ? "pl-4" : ""}`}
                  >
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                        step === s ||
                        (step === "verification" && s === "form") ||
                        (step === "status" && s !== "status")
                          ? "bg-brand-orange text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span
                      className={`hidden sm:inline-block text-xs font-medium capitalize transition-colors ${
                        step === s ||
                        (step === "verification" && s === "form") ||
                        (step === "status" && s !== "status")
                          ? "text-brand-orange"
                          : "text-gray-400"
                      }`}
                    >
                      {s === "form"
                        ? "Details"
                        : s === "verification"
                          ? "Verify"
                          : "Status"}
                    </span>
                  </div>
                  {idx < 2 && (
                    <div
                      className={`h-0.5 flex-1 max-w-20 sm:max-w-32 transition-colors ${
                        step === "verification" || step === "status"
                          ? "bg-brand-orange"
                          : "bg-gray-100"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 sm:px-8 pt-6 pb-5 border-b border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-heading">
                Register your organisation
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Account is subject to approval.
              </p>
            </div>

            <div ref={bodyRef} className="px-6 sm:px-8 py-6">
              {step === "form" && (
                <>
                  {submitError && (
                    <div className="flex items-start gap-2 mb-6 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <ApplicationFormStep
                    form={form}
                    errors={errors}
                    logo={logo}
                    logoPreview={logoPreview}
                    config={config}
                    consentVersion={config.consent_version}
                    honeypotRef={honeypotRef}
                    submitting={submitting}
                    onUpdate={updateForm}
                    onLogoChange={handleLogoChange}
                    onOpenTerms={() => {}}
                    onOpenPrivacy={() => {}}
                    onSubmit={handleSubmit}
                  />
                </>
              )}
              {step === "verification" && reference && contactEmail && (
                <VerificationStep
                  applicationReference={reference}
                  email={contactEmail}
                  verificationExpiresInSeconds={
                    config.verification_expires_in_seconds
                  }
                  resendAvailableInSeconds={config.resend_available_in_seconds}
                  onVerified={handleVerified}
                  onEditApplication={handleEditApplication}
                />
              )}
              {step === "status" && reference && verifiedStatus && (
                <StatusStep
                  applicationReference={reference}
                  onClose={handleStartOver}
                  onStartOver={handleStartOver}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer onOpenPrivacy={() => {}} onOpenTerms={() => {}} />
    </>
  );
};
