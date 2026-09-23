"use client";
import { useRef, useState } from "react";
import { projectTypes, budgetRanges, contactPage } from "@/data/contact";
import { validateInquiry } from "@/lib/validate";
import { site } from "@/data/site";

const FIELD_ORDER = ["name", "company", "email", "projectType", "budget", "message"];

export default function ContactForm({ defaultType = "" }) {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const read = () => Object.fromEntries(new FormData(formRef.current).entries());

  const checkField = (name) => {
    const { errors: e } = validateInquiry(read());
    setErrors((prev) => ({ ...prev, [name]: e[name] }));
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    const data = read();
    const { errors: e, valid, values } = validateInquiry(data);
    setErrors(e);
    if (!valid) {
      const first = FIELD_ORDER.find((k) => e[k]);
      formRef.current.elements[first]?.focus();
      return;
    }
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: data.website || "" }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
      } else {
        if (json.errors) setErrors(json.errors);
        setServerError(json.error || "Something went wrong while sending.");
        setStatus("error");
      }
    } catch {
      setServerError("The connection failed before your inquiry was sent.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <h2 className="form-success__title">Inquiry sent.</h2>
        <p>Thanks — we’ve got it. Expect a reply from {site.contact.email} with questions about the problem, usually within two working days.</p>
        <button type="button" className="btn btn--ghost" onClick={() => { setStatus("idle"); setErrors({}); }}>Send another inquiry</button>
      </div>
    );
  }

  const field = (name) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
    onBlur: () => checkField(name),
  });
  const Err = ({ name }) => (errors[name] ? <p id={`${name}-err`} className="field__err">{errors[name]}</p> : null);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="form" aria-describedby={status === "error" ? "form-error" : undefined}>
      {status === "error" && (
        <div id="form-error" role="alert" className="form-error">
          <strong>Your inquiry wasn’t sent.</strong> {serverError}{" "}
          <a href={`mailto:${site.contact.email}`}>Email {site.contact.email}</a> instead, or try again.
        </div>
      )}

      <div className="field"><label htmlFor="name">Name</label><input {...field("name")} type="text" autoComplete="name" required /><Err name="name" /></div>
      <div className="field"><label htmlFor="company">Company <span className="opt">(optional)</span></label><input {...field("company")} type="text" autoComplete="organization" /><Err name="company" /></div>
      <div className="field field--full"><label htmlFor="email">Email</label><input {...field("email")} type="email" autoComplete="email" required /><Err name="email" /></div>

      <div className="field">
        <label htmlFor="projectType">Project type</label>
        <select {...field("projectType")} defaultValue={projectTypes.some((t) => t.value === defaultType) ? defaultType : ""} required>
          <option value="" disabled>Choose one</option>
          {projectTypes.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <Err name="projectType" />
      </div>
      <div className="field">
        <label htmlFor="budget">Budget range</label>
        <select {...field("budget")} defaultValue="unsure">
          {budgetRanges.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
        <Err name="budget" />
      </div>

      <div className="field field--full">
        <label htmlFor="message">Project description</label>
        <textarea {...field("message")} rows={6} required placeholder="What needs to work better? Who is it for?" />
        <Err name="message" />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>

      <div className="field--full">
        <button type="submit" className="btn btn--primary btn--xl" disabled={status === "sending"} data-cursor="open">
          {status === "sending" ? "Sending…" : <>{contactPage.submitLabel} <span aria-hidden="true">→</span></>}
        </button>
      </div>
    </form>
  );
}
