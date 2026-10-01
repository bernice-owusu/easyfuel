import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, MailCheck, RefreshCw, ShieldCheck } from "lucide-react";
import type { OnboardingStatus } from "../../types";
import {
  OnboardingApiError,
  resendVerification,
  verifyEmail,
} from "../../lib/onboardingApi";

const CODE_LENGTH = 6;
const MAX_ATTEMPTS = 5;

const useCountdown = (deadline: number | null): number => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (deadline === null) {
      setRemaining(0);
      return;
    }
    const tick = () =>
      setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline]);

  return remaining;
};

const formatCountdown = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${String(seconds % 60).padStart(2, "0")}`;
};

interface CodeInputProps {
  digits: string[];
  onDigitsChange: (digits: string[]) => void;
  disabled: boolean;
  hasError: boolean;
}

const CodeInput: React.FC<CodeInputProps> = ({
  digits,
  onDigitsChange,
  disabled,
  hasError,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const first = inputsRef.current[0];
    if (first) first.focus();
  }, []);

  const focusIndex = (index: number) => {
    const input = inputsRef.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleChange = (index: number, raw: string) => {
    const cleaned = raw.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...digits];
      next[index] = "";
      onDigitsChange(next);
      return;
    }
    const next = [...digits];
    let cursor = index;
    for (const character of cleaned) {
      if (cursor > CODE_LENGTH - 1) break;
      next[cursor] = character;
      cursor += 1;
    }
    onDigitsChange(next);
    if (cursor <= CODE_LENGTH - 1) focusIndex(cursor);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      const next = [...digits];
      next[index - 1] = "";
      onDigitsChange(next);
      focusIndex(index - 1);
    }
    if (event.key === "ArrowLeft" && index > 0) focusIndex(index - 1);
    if (event.key === "ArrowRight" && index < CODE_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = (event.clipboardData.getData("text") || "")
      .replace(/\D/g, "")
      .slice(0, CODE_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i];
    onDigitsChange(next);
    const nextIndex = Math.min(pasted.length, CODE_LENGTH - 1);
    focusIndex(nextIndex);
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputsRef.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={CODE_LENGTH}
          value={digit}
          disabled={disabled}
          aria-label={`Verification digit ${index + 1}`}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.currentTarget.select()}
          className={`w-11 h-13 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border bg-white text-gray-900 outline-none transition-all focus:ring-2 ${
            hasError
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-gray-200 focus:border-brand-orange focus:ring-brand-orange/20"
          } disabled:bg-gray-50 disabled:text-gray-400`}
        />
      ))}
    </div>
  );
};

interface Props {
  applicationReference: string;
  email: string;
  verificationExpiresInSeconds: number;
  resendAvailableInSeconds: number;
  onVerified: (status: OnboardingStatus) => void;
  onEditApplication: () => void;
}

export const VerificationStep: React.FC<Props> = ({
  applicationReference,
  email,
  verificationExpiresInSeconds,
  resendAvailableInSeconds,
  onVerified,
  onEditApplication,
}) => {
  const [digits, setDigits] = useState<string[]>(() =>
    Array(CODE_LENGTH).fill(""),
  );
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [expiryDeadline, setExpiryDeadline] = useState<number | null>(
    Date.now() + verificationExpiresInSeconds * 1000,
  );
  const [resendDeadline, setResendDeadline] = useState<number | null>(
    Date.now() + resendAvailableInSeconds * 1000,
  );

  const expiryRemaining = useCountdown(expiryDeadline);
  const resendRemaining = useCountdown(resendDeadline);

  const code = digits.join("");

  const handleVerify = useCallback(async () => {
    if (code.length !== CODE_LENGTH || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const status = await verifyEmail(applicationReference, code);
      onVerified(status);
    } catch (caught) {
      if (caught instanceof OnboardingApiError) {
        setError(caught.message);
        setDigits(Array(CODE_LENGTH).fill(""));
        if (caught.status === 422 || caught.status === 429) {
          setAttemptsLeft((current) => Math.max(0, current - 1));
        }
      } else {
        setError("We could not verify that code. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }, [applicationReference, code, onVerified, submitting]);

  const handleResend = useCallback(async () => {
    if (resending) return;
    setResending(true);
    setError(null);
    try {
      const cooldown = await resendVerification(applicationReference);
      setDigits(Array(CODE_LENGTH).fill(""));
      setAttemptsLeft(MAX_ATTEMPTS);
      setResendDeadline(Date.now() + cooldown * 1000);
      setExpiryDeadline(Date.now() + verificationExpiresInSeconds * 1000);
    } catch (caught) {
      setError(
        caught instanceof OnboardingApiError
          ? caught.message
          : "We could not send a new code. Please try again.",
      );
    } finally {
      setResending(false);
    }
  }, [applicationReference, resending, verificationExpiresInSeconds]);

  const expired = expiryRemaining === 0;
  const locked = attemptsLeft === 0;

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 text-brand-orange flex items-center justify-center">
        <MailCheck className="w-8 h-8" />
      </div>

      <div>
        <h3 className="text-2xl font-bold text-brand-heading">Verify your email</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          We sent a six-digit verification code to{" "}
          <span className="font-semibold text-gray-900">{email}</span>. Enter it
          below to submit your application for review.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-brand-light border border-gray-100 text-xs text-gray-500">
        Application reference{" "}
        <span className="font-semibold text-gray-900">{applicationReference}</span>
      </div>

      <CodeInput
        digits={digits}
        onDigitsChange={setDigits}
        disabled={submitting || expired}
        hasError={Boolean(error)}
      />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {expired && !error && (
        <p className="text-sm text-orange-700 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3">
          This code has expired. Request a new one to continue.
        </p>
      )}

      {locked && !expired && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          You have used all {MAX_ATTEMPTS} attempts. Request a new code to keep
          going.
        </p>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleVerify}
          disabled={code.length !== CODE_LENGTH || submitting || expired}
          className="w-full sm:w-auto px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying…</span>
            </>
          ) : (
            <span>Verify &amp; Submit</span>
          )}
        </button>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending || resendRemaining > 0}
          className="w-full sm:w-auto px-6 py-3.5 border-2 border-brand-orange text-brand-orange hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          {resending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>
            {resendRemaining > 0
              ? `Resend in ${formatCountdown(resendRemaining)}`
              : "Resend code"}
          </span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange" />
          {attemptsLeft} of {MAX_ATTEMPTS} attempts remaining
        </span>
        <span>
          Code expires in{" "}
          <span className="font-semibold text-gray-900">
            {formatCountdown(expiryRemaining)}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={onEditApplication}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-orange transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to application
      </button>
    </div>
  );
};
