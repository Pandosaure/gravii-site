"use client";

import { type FormEvent, useState } from "react";
import { CONTACT_EMAIL } from "./constants";

// The design-partner interest form (mission 2.1). Native-styled to the site's design
// system (gv- tokens), not a raw Google Form. Submits to /api/register, which drops
// spam and forwards to Tommy's Sheet + email. Honeypot + client validation + honest
// private-pilot success copy + a lightweight GDPR line.

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function RegisterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    if (!data.name?.trim() || !data.firm?.trim() || !data.role?.trim()) {
      setError("Please fill in your name, firm and role.");
      return;
    }
    if (!EMAIL_RE.test((data.email ?? "").trim())) {
      setError("Please enter a valid work email.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, source: "gravii.app/register" }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="gv-form-done" role="status">
        <div className="gv-eyebrow">
          <span className="rule" />
          Registered
        </div>
        <h2 className="gv-h2" style={{ marginTop: "var(--s4)", maxWidth: 520 }}>
          Thanks - we&apos;ll be in touch personally.
        </h2>
        <p className="gv-lead" style={{ marginTop: "var(--s4)", maxWidth: 520 }}>
          Gravii is in private pilot with a small number of design-partner firms. We onboard each
          one ourselves, so we&apos;ll read your note and reply in person - no automated sequence.
        </p>
      </div>
    );
  }

  return (
    <form className="gv-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot: hidden from people, catches bots. Off-screen + aria-hidden. */}
      <div className="gv-hp" aria-hidden="true">
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="gv-field-grid">
        <Field name="name" label="Your name" autoComplete="name" required />
        <Field name="email" label="Work email" type="email" autoComplete="email" required />
        <Field name="firm" label="Firm" autoComplete="organization" required />
        <Field name="role" label="Your role" autoComplete="organization-title" required />
      </div>

      <label className="gv-field">
        <span className="gv-form-label">
          What would you want your firm&apos;s brain to know?{" "}
          <span className="gv-optional">optional</span>
        </span>
        <textarea name="message" className="gv-input gv-textarea" rows={4} />
      </label>

      {error && (
        <p className="gv-form-error" role="alert">
          {error}
        </p>
      )}
      {status === "error" && (
        <p className="gv-form-error" role="alert">
          Something went wrong sending that. Please email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we&apos;ll pick it up.
        </p>
      )}

      <button type="submit" className="gv-cta" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Register interest"}
      </button>

      <p className="gv-form-gdpr">
        We store your details only to contact you about the pilot - no newsletters, no sharing. Ask
        us to delete them any time at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="gv-field">
      <span className="gv-form-label">
        {label}
        {required && (
          <span className="gv-req" aria-hidden="true">
            {" *"}
          </span>
        )}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="gv-input"
      />
    </label>
  );
}
