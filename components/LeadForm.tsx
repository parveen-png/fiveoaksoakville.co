"use client";

import {
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { track, trackGenerateLead } from "@/components/analytics-client";
import {
  CONSENT_TEXT_VERSION,
  copy,
  FORM_VERSION,
  LANDING_PAGE_VERSION,
  productInterestOptions,
  project,
  userMessages,
} from "@/lib/project-data";
import { siteConfig } from "@/lib/site-config";
import { flattenLeadErrors, leadInputSchema } from "@/lib/validation";

interface LeadFormProps {
  idPrefix: string;
  compact?: boolean;
}

type FormErrors = Record<string, string>;

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  productInterest: "",
  buyerTiming: "",
  marketingConsent: false,
  companyWebsite: "",
};

function readQuery(name: string): string {
  if (typeof window === "undefined") {
    return "";
  }
  return new URLSearchParams(window.location.search).get(name) ?? "";
}

export function LeadForm({ idPrefix, compact = false }: LeadFormProps) {
  const headingId = `${idPrefix}-form-heading`;
  const summaryId = `${idPrefix}-error-summary`;
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [started, setStarted] = useState(false);
  const idempotencyKeyRef = useRef("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  function nextIdempotencyKey() {
    idempotencyKeyRef.current = crypto.randomUUID();
    return idempotencyKeyRef.current;
  }

  function currentIdempotencyKey() {
    if (!idempotencyKeyRef.current) {
      return nextIdempotencyKey();
    }
    return idempotencyKeyRef.current;
  }

  function update<K extends keyof typeof INITIAL>(key: K, value: (typeof INITIAL)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    if (!started) {
      setStarted(true);
      track("form_start", { placement: idPrefix });
    }
  }

  function fieldError(name: string) {
    return errors[name];
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") {
      return;
    }

    track("form_submit_attempt", { placement: idPrefix });

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      productInterest: values.productInterest,
      buyerTiming: values.buyerTiming || undefined,
      marketingConsent: values.marketingConsent,
      companyWebsite: values.companyWebsite,
      idempotencyKey: currentIdempotencyKey(),
      attribution: {
        landingPageUrl: window.location.href.split("#")[0],
        landingPageVersion: LANDING_PAGE_VERSION,
        referrer: document.referrer,
        utmSource: readQuery("utm_source"),
        utmMedium: readQuery("utm_medium"),
        utmCampaign: readQuery("utm_campaign"),
        utmTerm: readQuery("utm_term"),
        utmContent: readQuery("utm_content"),
        gclid: readQuery("gclid"),
        gbraid: readQuery("gbraid"),
        wbraid: readQuery("wbraid"),
        fbclid: siteConfig.allowFbclid ? readQuery("fbclid") : "",
        formVersion: FORM_VERSION,
        consentTextVersion: CONSENT_TEXT_VERSION,
        browserTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        landingPageVariant: siteConfig.landingPageVariant,
      },
    };

    const parsed = leadInputSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of flattenLeadErrors(parsed.error)) {
        nextErrors[issue.field] = issue.message;
        track("form_field_error", { field: issue.field });
      }
      setErrors(nextErrors);
      setStatus("idle");
      window.requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as {
        ok: boolean;
        captured?: boolean;
        alreadyRecorded?: boolean;
        submissionId?: string;
        message?: string;
        errors?: Array<{ field: string; message: string }>;
      };

      if (!response.ok || !data.ok) {
        const nextErrors: FormErrors = {};
        for (const issue of data.errors ?? []) {
          nextErrors[issue.field] = issue.message;
          track("form_field_error", { field: issue.field });
        }
        if (Object.keys(nextErrors).length > 0) {
          setErrors(nextErrors);
        } else {
          setErrors({ form: data.message || userMessages.failure });
        }
        setStatus("error");
        nextIdempotencyKey();
        window.requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }

      if (data.captured && data.submissionId) {
        trackGenerateLead(data.submissionId);
      }

      setStatus("success");
      window.requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setErrors({ form: userMessages.failure });
      setStatus("error");
      nextIdempotencyKey();
      window.requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorList = Object.entries(errors);
  const showSummary = errorList.length > 0 && status !== "submitting";

  if (status === "success") {
    return (
      <div
        id={idPrefix === "hero" ? "register" : `${idPrefix}-register`}
        className="folio relative overflow-hidden p-5 md:p-6"
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-bronze" />
        <div
          ref={successRef}
          tabIndex={-1}
          className="outline-none"
          role="status"
        >
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-bronze uppercase">
            Request received
          </p>
          <h2 className="mt-3 font-display text-2xl text-ink">
            You&apos;re on the Five Oaks update list
          </h2>
          <p className="mt-4 text-base leading-7 text-ink">{userMessages.success}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={idPrefix === "hero" ? "register" : `${idPrefix}-register`}
      className={`folio relative overflow-hidden ${compact ? "p-4 md:p-5" : "p-5 md:p-6"}`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-bronze" />
      <h2
        id={headingId}
        className={`font-display tracking-tight text-ink ${compact ? "text-xl" : "mt-0 text-2xl"}`}
      >
        {compact ? project.primaryCta : "Get Five Oaks project updates"}
      </h2>
      {compact ? null : (
        <p className="mt-3 text-sm leading-6 text-ink-muted">{copy.formSupport}</p>
      )}

      {showSummary ? (
        <div
          ref={summaryRef}
          id={summaryId}
          tabIndex={-1}
          role="alert"
          className="mt-5 border border-error/30 bg-error-soft p-4 text-sm text-error outline-none"
        >
          <p className="font-semibold">{userMessages.validationSummary}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errorList.map(([field, message]) => (
              <li key={field}>
                {field === "form" ? (
                  message
                ) : (
                  <a className="underline" href={`#${idPrefix}-${field}`}>
                    {message}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <form
        className="mt-5 space-y-4"
        onSubmit={onSubmit}
        noValidate
        aria-labelledby={headingId}
        aria-describedby={showSummary ? summaryId : undefined}
      >
        <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor={`${idPrefix}-companyWebsite`}>Company website</label>
          <input
            id={`${idPrefix}-companyWebsite`}
            name="companyWebsite"
            value={values.companyWebsite}
            tabIndex={-1}
            autoComplete="off"
            onChange={(event) => update("companyWebsite", event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            id={`${idPrefix}-firstName`}
            label="First name"
            required
            error={fieldError("firstName")}
          >
            <input
              id={`${idPrefix}-firstName`}
              name="firstName"
              autoComplete="given-name"
              value={values.firstName}
              required
              onChange={(event) => update("firstName", event.target.value)}
              aria-invalid={fieldError("firstName") ? true : undefined}
              aria-describedby={
                fieldError("firstName") ? `${idPrefix}-firstName-error` : undefined
              }
              className={inputClass(Boolean(fieldError("firstName")))}
            />
          </Field>
          <Field
            id={`${idPrefix}-lastName`}
            label="Last name"
            required
            error={fieldError("lastName")}
          >
            <input
              id={`${idPrefix}-lastName`}
              name="lastName"
              autoComplete="family-name"
              value={values.lastName}
              required
              onChange={(event) => update("lastName", event.target.value)}
              aria-invalid={fieldError("lastName") ? true : undefined}
              aria-describedby={
                fieldError("lastName") ? `${idPrefix}-lastName-error` : undefined
              }
              className={inputClass(Boolean(fieldError("lastName")))}
            />
          </Field>
        </div>

        <Field
          id={`${idPrefix}-email`}
          label="Email"
          required
          error={fieldError("email")}
        >
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            required
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={fieldError("email") ? true : undefined}
            aria-describedby={fieldError("email") ? `${idPrefix}-email-error` : undefined}
            className={inputClass(Boolean(fieldError("email")))}
          />
        </Field>

        <Field
          id={`${idPrefix}-phone`}
          label="Phone"
          hint="Optional"
          error={fieldError("phone")}
        >
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={fieldError("phone") ? true : undefined}
            aria-describedby={
              fieldError("phone")
                ? `${idPrefix}-phone-error`
                : `${idPrefix}-phone-hint`
            }
            className={inputClass(Boolean(fieldError("phone")))}
          />
        </Field>

        <Field
          id={`${idPrefix}-productInterest`}
          label="I'm interested in"
          required
          error={fieldError("productInterest")}
        >
          <select
            id={`${idPrefix}-productInterest`}
            name="productInterest"
            value={values.productInterest}
            required
            onChange={(event) => update("productInterest", event.target.value)}
            aria-invalid={fieldError("productInterest") ? true : undefined}
            aria-describedby={
              fieldError("productInterest") ? `${idPrefix}-productInterest-error` : undefined
            }
            className={inputClass(Boolean(fieldError("productInterest")))}
          >
            <option value="">Select an option</option>
            {productInterestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        {fieldError("form") ? (
          <p className="text-sm text-error" role="alert">
            {fieldError("form")}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className="btn-primary w-full text-sm"
        >
          {status === "submitting" ? userMessages.loading : project.primaryCta}
        </button>
        <p className="text-center text-xs leading-5 text-ink-muted">
          {compact
            ? "No prices until official details exist."
            : "Takes less than a minute. No prices are sent until official details exist."}
        </p>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-error">
              {" "}
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
        {hint ? (
          <span id={`${id}-hint`} className="ml-2 font-normal text-ink-muted">
            {hint}
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return `min-h-11 w-full border bg-paper-elevated px-3 text-base text-ink outline-none transition-colors focus-visible:ring-2 focus-visible:ring-bronze ${
    invalid ? "border-error" : "border-stone"
  }`;
}
