import React, { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  RefreshCw,
} from "lucide-react";
import type { OnboardingStatus, OnboardingStatusResponse } from "../../types";
import {
  OnboardingApiError,
  getApplicationStatus,
} from "../../lib/onboardingApi";

const STATUS_META: Record<
  OnboardingStatus,
  { label: string; description: string; tone: string }
> = {
  pending_verification: {
    label: "Awaiting email verification",
    description: "Confirm your email address to enter the review queue.",
    tone: "bg-orange-50 text-orange-700 border-orange-100",
  },
  submitted: {
    label: "Submitted",
    description: "Your application is in the System Administrator review queue.",
    tone: "bg-blue-50 text-blue-700 border-blue-100",
  },
  under_review: {
    label: "Under review",
    description: "A System Administrator is reviewing your application.",
    tone: "bg-blue-50 text-blue-700 border-blue-100",
  },
  information_requested: {
    label: "Information requested",
    description: "We need a little more information before we can approve.",
    tone: "bg-amber-50 text-amber-700 border-amber-100",
  },
  approved: {
    label: "Approved",
    description: "Approved. Your activation details are on their way by email.",
    tone: "bg-green-50 text-green-700 border-green-100",
  },
  converted: {
    label: "Account created",
    description:
      "Your organisation and first administrator are live. Check your email for the one-time password activation link.",
    tone: "bg-green-50 text-green-700 border-green-100",
  },
  rejected: {
    label: "Not approved",
    description: "This application was not approved at this time.",
    tone: "bg-red-50 text-red-700 border-red-100",
  },
  withdrawn: {
    label: "Withdrawn",
    description: "This application was withdrawn.",
    tone: "bg-gray-100 text-gray-600 border-gray-200",
  },
  expired: {
    label: "Expired",
    description: "This application expired before it was verified.",
    tone: "bg-gray-100 text-gray-600 border-gray-200",
  },
};

const formatDateTime = (value: string | null): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const DetailRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0">
    <span className="text-sm text-gray-500 shrink-0">{label}</span>
    <span className="text-sm font-semibold text-gray-900 text-right break-words">
      {value}
    </span>
  </div>
);

interface Props {
  applicationReference: string;
  onClose: () => void;
  onStartOver: () => void;
}

export const StatusStep: React.FC<Props> = ({
  applicationReference,
  onClose,
  onStartOver,
}) => {
  const [status, setStatus] = useState<OnboardingStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setStatus(await getApplicationStatus(applicationReference));
    } catch (caught) {
      setError(
        caught instanceof OnboardingApiError
          ? caught.message
          : "We could not load your application status.",
      );
    } finally {
      setLoading(false);
    }
  }, [applicationReference]);

  useEffect(() => {
    load();
  }, [load]);

  const meta = status ? STATUS_META[status.status] : null;
  const isTerminal =
    status?.status === "converted" ||
    status?.status === "rejected" ||
    status?.status === "withdrawn" ||
    status?.status === "expired";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-brand-heading">
          Application submitted
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Your email is verified and your application is now with our System
          Administrator. We will activate your organisation once it is approved.
        </p>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-500">
          <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
          Loading application status…
        </div>
      )}

      {error && !loading && (
        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {status && meta && (
        <>
          <div className={`p-5 rounded-2xl border ${meta.tone}`}>
            <div className="flex items-center gap-2 mb-1.5">
              {isTerminal ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <Clock className="w-4 h-4 shrink-0" />
              )}
              <span className="font-bold text-sm uppercase tracking-wider">
                {meta.label}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{meta.description}</p>
          </div>

          {status.information_request && (
            <div className="flex items-start gap-2 text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{status.information_request}</span>
            </div>
          )}

          {status.rejection_reason && (
            <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{status.rejection_reason}</span>
            </div>
          )}

          <div className="p-5 rounded-2xl border border-gray-100 bg-white">
            <DetailRow
              label="Reference"
              value={status.application_reference}
            />
            <DetailRow label="Organisation" value={status.omc_name} />
            <DetailRow
              label="Email verified"
              value={status.email_verified ? "Yes" : "No"}
            />
            <DetailRow label="Submitted" value={formatDateTime(status.submitted_at)} />
          </div>
        </>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="w-full sm:w-auto px-6 py-3.5 border-2 border-brand-orange text-brand-orange hover:bg-orange-50 disabled:opacity-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh status</span>
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold rounded-xl transition-colors shadow-lg shadow-orange-600/25 cursor-pointer"
        >
          Close
        </button>
      </div>

      <button
        type="button"
        onClick={onStartOver}
        className="block mx-auto text-sm font-semibold text-gray-400 hover:text-brand-orange transition-colors cursor-pointer"
      >
        Submit another organisation
      </button>
    </div>
  );
};
