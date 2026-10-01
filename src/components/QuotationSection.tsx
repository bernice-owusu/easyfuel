import React, { useState } from "react";
import {
  Send,
  PhoneCall,
  CheckCircle,
  CalendarCheck,
  Loader2,
} from "lucide-react";
import {
  newIdempotencyKey,
  submitDemoRequest,
  OnboardingApiError,
} from "../lib/onboardingApi";
import type { DemoRequestPayload, DemoInterest } from "../types";

const INTERESTS_OPTIONS: { value: DemoInterest; label: string }[] = [
  { value: "sales", label: "Sales & POS" },
  { value: "inventory", label: "Inventory & Stock" },
  { value: "reconciliation", label: "Reconciliation" },
  { value: "reporting", label: "Reporting & Analytics" },
  { value: "analytics", label: "Advanced Analytics" },
  { value: "payments", label: "Payments & Billing" },
  { value: "integrations", label: "Integrations" },
  { value: "security", label: "Security & Compliance" },
];

export const QuotationSection: React.FC = () => {
  const [formData, setFormData] = useState<Partial<DemoRequestPayload>>({
    company_name: "",
    contact: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      job_title: "",
    },
    station_count: 1,
    current_system: "",
    interests: [],
    preferred_demo_at: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    message: "",
    privacy_accepted: false,
    consent_version: "2026-09",
    source: "public_landing_page",
    campaign: null,
    referrer_url: document.referrer,
    website_confirmation: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [demoReference, setDemoReference] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (name.startsWith("contact.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact!, [field]: value },
      }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else if (type === "checkbox" && name === "interests") {
      const checked = (e.target as HTMLInputElement).checked;
      const interestValue = value as DemoInterest;
      setFormData((prev) => ({
        ...prev,
        interests: prev.interests?.includes(interestValue)
          ? prev.interests!.filter((i) => i !== interestValue)
          : [...(prev.interests || []), interestValue],
      }));
    } else if (name === "privacy_accepted") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const contact = formData.contact!;
    if (
      !contact.first_name ||
      !contact.last_name ||
      !contact.email ||
      !contact.phone ||
      !formData.company_name ||
      !formData.current_system ||
      !formData.interests?.length ||
      !formData.preferred_demo_at ||
      !formData.message ||
      !formData.privacy_accepted
    ) {
      setSubmitError(
        "Please fill in all required fields and accept the privacy policy.",
      );
      return;
    }

    setSubmitting(true);
    const idempotencyKey = newIdempotencyKey();

    try {
      const response = await submitDemoRequest(
        formData as DemoRequestPayload,
        idempotencyKey,
      );
      setDemoReference(response.data.request_reference);
      setSubmitted(true);
    } catch (caught) {
      if (caught instanceof OnboardingApiError) {
        setSubmitError(
          caught.message || "Something went wrong. Please try again.",
        );
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmitError(null);
    setDemoReference(null);
    setFormData({
      company_name: "",
      contact: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        job_title: "",
      },
      station_count: 1,
      current_system: "",
      interests: [],
      preferred_demo_at: "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: "",
      privacy_accepted: false,
      consent_version: "2026-09",
      source: "public_landing_page",
      campaign: null,
      referrer_url: document.referrer,
      website_confirmation: "",
    });
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-gray-800 bg-white";

  return (
    <section id="quotation" className="py-20 lg:py-28 bg-brand-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand-orange font-semibold text-sm tracking-wider uppercase bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-100 inline-block mb-3">
            Demo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-heading leading-tight">
            Request a Free <b className="text-brand-orange">Demo</b> of <br />
            the <b className="text-brand-navy">Easy Fuel</b> Platform
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-xl mx-auto">
            Tell us about your operation and schedule a live walkthrough with
            our team.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-orange-100 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Demo Request Received!
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Thank you,{" "}
                <span className="font-semibold text-gray-900">
                  {formData.contact?.first_name} {formData.contact?.last_name}
                </span>{" "}
                from{" "}
                <span className="font-semibold text-gray-900">
                  {formData.company_name || "your company"}
                </span>
                . Our team will reach out shortly to confirm your demo for{" "}
                <span className="font-semibold text-orange-600">
                  {formData.preferred_demo_at
                    ? new Date(formData.preferred_demo_at).toLocaleDateString(
                        undefined,
                        {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "a time that works for you"}
                </span>
                .
              </p>
              <div className="p-4 rounded-xl bg-gray-50 max-w-sm mx-auto mb-8 text-left text-sm text-gray-600 space-y-1">
                <div>
                  <span className="font-semibold">Reference:</span>{" "}
                  <span className="font-mono text-brand-orange">
                    {demoReference}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Industry:</span>{" "}
                  {formData.current_system}
                </div>
                <div>
                  <span className="font-semibold">Fuel Stations:</span>{" "}
                  {formData.station_count}
                </div>
                <div>
                  <span className="font-semibold">Interests:</span>{" "}
                  {formData.interests?.join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Contact:</span>{" "}
                  {formData.contact?.phone} | {formData.contact?.email}
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-full transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Row 1: Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="demo-first-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="demo-first-name"
                    name="contact.first_name"
                    required
                    value={formData.contact?.first_name || ""}
                    onChange={handleInputChange}
                    placeholder="Ama"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-last-name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="demo-last-name"
                    name="contact.last_name"
                    required
                    value={formData.contact?.last_name || ""}
                    onChange={handleInputChange}
                    placeholder="Mensah"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-job-title"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="demo-job-title"
                    name="contact.job_title"
                    required
                    value={formData.contact?.job_title || ""}
                    onChange={handleInputChange}
                    placeholder="Operations Director"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="demo-company"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="demo-company"
                    name="company_name"
                    required
                    value={formData.company_name || ""}
                    onChange={handleInputChange}
                    placeholder="Acme Petroleum Ltd"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="demo-email"
                    name="contact.email"
                    required
                    value={formData.contact?.email || ""}
                    onChange={handleInputChange}
                    placeholder="ama@acme.example"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone No.
                  </label>
                  <input
                    type="tel"
                    id="demo-phone"
                    name="contact.phone"
                    required
                    value={formData.contact?.phone || ""}
                    onChange={handleInputChange}
                    placeholder="0540000000"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Row 2: Company Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="demo-industry"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Current System
                  </label>
                  <select
                    id="demo-industry"
                    name="current_system"
                    required
                    value={formData.current_system || ""}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      Select Current System
                    </option>
                    <option value="Spreadsheets">
                      Spreadsheets (Excel/Google Sheets)
                    </option>
                    <option value="Paper Records">Paper Records</option>
                    <option value="Legacy POS">Legacy POS System</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Other System">Other System</option>
                    <option value="No System (New Business)">
                      No System (New Business)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="demo-stations"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Number of Fuel Stations
                  </label>
                  <input
                    type="number"
                    id="demo-stations"
                    name="station_count"
                    required
                    min="1"
                    value={formData.station_count || ""}
                    onChange={handleInputChange}
                    placeholder="e.g. 5"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="demo-timezone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Timezone
                  </label>
                  <select
                    id="demo-timezone"
                    name="timezone"
                    value={formData.timezone || ""}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="Africa/Accra">Africa/Accra (GMT)</option>
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="Africa/Abidjan">Africa/Abidjan (GMT)</option>
                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">
                      Europe/London (GMT/BST)
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Interests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Areas of Interest{" "}
                  <span className="text-brand-orange ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {INTERESTS_OPTIONS.map((interest) => (
                    <label
                      key={interest.value}
                      className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-gray-200 hover:border-brand-orange hover:bg-orange-50/40 transition-colors"
                    >
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest.value}
                        checked={
                          formData.interests?.includes(interest.value) || false
                        }
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-gray-300 accent-brand-orange cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        {interest.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 4: Preferred Demo Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                <div>
                  <label
                    htmlFor="demo-date"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Preferred Demo Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="demo-date"
                    name="preferred_demo_at"
                    required
                    value={formData.preferred_demo_at || ""}
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <CalendarCheck className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>We'll confirm a convenient time with your team.</span>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label
                  htmlFor="demo-message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message <span className="text-brand-orange ml-1">*</span>
                </label>
                <textarea
                  id="demo-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message || ""}
                  onChange={handleInputChange}
                  placeholder="Tell us about your operation, challenges, or what you'd like to see in the demo."
                  className={inputClass}
                />
              </div>

              {/* Privacy */}
              <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="privacy_accepted"
                  checked={formData.privacy_accepted || false}
                  onChange={handleInputChange}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-orange shrink-0 cursor-pointer"
                />
                <span>
                  I accept the{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-orange hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {/* Honeypot */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="demo-website-confirmation">Website</label>
                <input
                  id="demo-website-confirmation"
                  name="website_confirmation"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                id="request-demo-btn"
                disabled={submitting}
                className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-base rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 hover:-translate-y-px cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting…</span>
                  </>
                ) : (
                  <>
                    <span>Request a Demo</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Business Hours Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-3 text-sm text-gray-500 text-center">
            <PhoneCall className="w-4 h-4 text-brand-orange shrink-0" />
            <span>
              Questions? Call us{" "}
              <a
                href="tel:+233302254340"
                className="text-gray-900 font-semibold hover:text-brand-orange-hover transition-colors"
              >
                +233302254340
              </a>{" "}
              during regular business hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
