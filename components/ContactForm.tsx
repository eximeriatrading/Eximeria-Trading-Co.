"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Icon from "./Icon";
import { CATEGORIES, ROLES, SERVICES } from "@/lib/content";
import { EMPTY_ENQUIRY, LIMITS, validateEnquiry, type Enquiry } from "@/lib/enquiry";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const params = useSearchParams();
  const [data, setData] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [errors, setErrors] = useState<Partial<Record<keyof Enquiry, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  // Pre-fill from the button that brought the visitor here:
  // ?role=buyer|seller, ?category=<category slug>, ?service=<service slug>
  useEffect(() => {
    const role = params.get("role");
    const category = params.get("category");
    const service = params.get("service");
    setData((d) => ({
      ...d,
      role: role === "buyer" ? ROLES[0] : role === "seller" ? ROLES[1] : d.role,
      category: CATEGORIES.find((c) => c.slug === category)?.title ?? d.category,
      service: SERVICES.find((s) => s.slug === service)?.title ?? d.service,
    }));
  }, [params]);

  const update = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((d) => ({ ...d, [name]: value }));
    if (errors[name as keyof Enquiry]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "sent") {
    return (
      <div className="success-box" role="status">
        <span className="icon-tile icon-tile--solid">
          <Icon name="check" />
        </span>
        <h3>Thanks, {data.fullName.split(" ")[0]}. Your enquiry is in.</h3>
        <p>
          A trade specialist will reply to <strong>{data.email}</strong> within 24 hours. We&apos;ve also sent you a
          confirmation email.
        </p>
        <button
          className="btn btn--primary"
          style={{ marginTop: 22 }}
          onClick={() => {
            setData(EMPTY_ENQUIRY);
            setStatus("idle");
          }}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const field = (name: keyof Enquiry) => ({
    id: `f-${name}`,
    name,
    value: data[name],
    onChange: update,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `e-${name}` : undefined,
  });
  const err = (name: keyof Enquiry) =>
    errors[name] ? (
      <p className="field-error" id={`e-${name}`}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Honeypot for bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input {...field("website")} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="f-fullName">
            Full Name<span className="req">*</span>
          </label>
          <input {...field("fullName")} className="input" placeholder="Your full name" autoComplete="name" maxLength={LIMITS.fullName} />
          {err("fullName")}
        </div>
        <div className="field">
          <label htmlFor="f-email">
            Email Address<span className="req">*</span>
          </label>
          <input {...field("email")} type="email" className="input" placeholder="you@company.com" autoComplete="email" maxLength={LIMITS.email} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone Number</label>
          <input {...field("phone")} type="tel" className="input" placeholder="+91 98765 43210" autoComplete="tel" maxLength={LIMITS.phone} />
          {err("phone")}
        </div>
        <div className="field">
          <label htmlFor="f-company">Company Name</label>
          <input {...field("company")} className="input" placeholder="Your company" autoComplete="organization" maxLength={LIMITS.company} />
          {err("company")}
        </div>
        <div className="field">
          <label htmlFor="f-role">
            I am a<span className="req">*</span>
          </label>
          <select {...field("role")} className="input">
            <option value="">Select one...</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          {err("role")}
        </div>
        <div className="field">
          <label htmlFor="f-category">Product Category</label>
          <select {...field("category")} className="input">
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.title}>{c.title}</option>
            ))}
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
          {err("category")}
        </div>
        {data.service && (
          <div className="field field--full">
            <label htmlFor="f-service">Service of interest</label>
            <select {...field("service")} className="input">
              <option value="">None</option>
              {SERVICES.map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
        )}
        <div className="field field--full">
          <label htmlFor="f-message">
            Enquiry Details<span className="req">*</span>
          </label>
          <textarea
            {...field("message")}
            className="input"
            rows={5}
            maxLength={LIMITS.message}
            placeholder="Describe your trade requirement — product, quantity, destination, timeline, or any other details..."
          />
          {err("message")}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending...
            </>
          ) : (
            "Send Enquiry"
          )}
        </button>
        <span className={`form-status${status === "error" ? " form-status--error" : ""}`} role="alert" aria-live="polite">
          {status === "error" ? serverError : ""}
        </span>
      </div>
    </form>
  );
}
