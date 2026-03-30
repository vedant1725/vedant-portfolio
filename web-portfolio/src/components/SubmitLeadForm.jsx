"use client";

import { useState, useRef } from "react";
import { LEAD_CONSTANTS } from "../data/leadConstants";

// ── helpers ──────────────────────────────────────────────────────────────────

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx,.png,.jpg,.jpeg";

function validate(values) {
  const errs = {};
  if (!values.service) errs.service = "Service type is required";
  if (!values.country) errs.country = "Target country is required";
  if (!values.budget_range) errs.budget_range = "Budget range is required";
  if (!values.timeline) errs.timeline = "Project timeline is required";
  if (!values.project_description.trim())
    errs.project_description = "Project description is required";
  return errs;
}

// ── sub-components ────────────────────────────────────────────────────────────

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`toast toast--${toast.type}`} role="alert">
      <span className="toast__icon">
        {toast.type === "success" ? "✓" : "✕"}
      </span>
      {toast.message}
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 500;
          font-size: 0.95rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
          animation: slideIn 0.3s ease-out;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .toast--success {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #86efac;
        }
        .toast--error {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
        }
        .toast__icon {
          font-weight: 700;
          font-size: 1rem;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function StepBadge({ step }) {
  return (
    <>
      <span className="step-badge">{step}</span>
      <style jsx>{`
        .step-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
}

function FormSection({ step, title, subtitle, children }) {
  return (
    <section className="form-section">
      <div className="form-section__header">
        <StepBadge step={step} />
        <div>
          <h3 className="form-section__title">{title}</h3>
          {subtitle && (
            <p className="form-section__subtitle">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="form-section__body">{children}</div>
      <style jsx>{`
        .form-section {
          margin-bottom: 2.5rem;
        }
        .form-section__header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }
        .form-section__title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        .form-section__subtitle {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .form-section__body {
          padding-left: 3rem;
        }
      `}</style>
    </section>
  );
}

function FieldGroup({ label, required, error, children }) {
  return (
    <div className="field-group">
      <label className="field-label">
        {label}
        {required && <span className="required-star">*</span>}
      </label>
      {children}
      {error && <p className="field-error">{error}</p>}
      <style jsx>{`
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .field-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .required-star {
          color: #f87171;
          margin-left: 3px;
        }
        .field-error {
          font-size: 0.8rem;
          color: #f87171;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
}

function SelectField({ value, onChange, options, placeholder, hasError }) {
  return (
    <>
      <select
        className={`form-select${hasError ? " form-select--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <style jsx>{`
        .form-select {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: inherit;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          transition: var(--transition);
        }
        .form-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .form-select--error {
          border-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
        }
        .form-select option {
          background: #1a1a1e;
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}

function TextareaField({ value, onChange, placeholder, rows, hasError }) {
  return (
    <>
      <textarea
        className={`form-textarea${hasError ? " form-textarea--error" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows || 5}
      />
      <style jsx>{`
        .form-textarea {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.95rem;
          font-family: inherit;
          resize: vertical;
          transition: var(--transition);
        }
        .form-textarea::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .form-textarea--error {
          border-color: #f87171;
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.1);
        }
      `}</style>
    </>
  );
}

// ── main component ────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  service: "",
  country: "",
  budget_range: "",
  timeline: "",
  project_description: "",
  attachment: null,
};

export default function SubmitLeadForm() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  // ── toast helper ─────────────────────────────────────────────────────────

  function showToast(type, message) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  // ── field helpers ─────────────────────────────────────────────────────────

  function setField(name, value) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // ── file upload ───────────────────────────────────────────────────────────

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      showToast("error", "File size should not exceed 5 MB");
      return;
    }
    setField("attachment", file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      showToast("error", "File size should not exceed 5 MB");
      return;
    }
    setField("attachment", file);
  }

  function removeFile() {
    setField("attachment", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── submit ────────────────────────────────────────────────────────────────

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulated submit — replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("success", "Lead submitted successfully!");
      setValues(DEFAULT_VALUES);
      setErrors({});
    } catch {
      showToast("error", "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div className="lead-page">
      {/* ── page header ── */}
      <header className="lead-header">
        <div className="container lead-header__inner">
          <h1 className="lead-header__title">
            Post a <span className="text-gradient">Project Request</span>
          </h1>
          <p className="lead-header__sub">
            Describe your project goals and get matched with top verified
            agencies.
          </p>
        </div>
      </header>

      {/* ── form area ── */}
      <main className="container lead-content">
        <form noValidate onSubmit={handleSubmit}>
          {/* ── Section 1: Project Details ── */}
          <FormSection
            step={1}
            title="Project Details"
            subtitle="Tell us about what you need for your project"
          >
            <div className="fields-grid">
              {/* Service */}
              <FieldGroup
                label="Service Type"
                required
                error={errors.service}
              >
                <SelectField
                  value={values.service}
                  onChange={(v) => setField("service", v)}
                  options={LEAD_CONSTANTS.SERVICES}
                  placeholder="Select service"
                  hasError={!!errors.service}
                />
              </FieldGroup>

              {/* Country */}
              <FieldGroup
                label="Target Country"
                required
                error={errors.country}
              >
                <SelectField
                  value={values.country}
                  onChange={(v) => setField("country", v)}
                  options={LEAD_CONSTANTS.COUNTRIES}
                  placeholder="Select country"
                  hasError={!!errors.country}
                />
              </FieldGroup>

              {/* Budget */}
              <FieldGroup
                label="Estimated Budget"
                required
                error={errors.budget_range}
              >
                <SelectField
                  value={values.budget_range}
                  onChange={(v) => setField("budget_range", v)}
                  options={LEAD_CONSTANTS.BUDGET_RANGES}
                  placeholder="Select budget"
                  hasError={!!errors.budget_range}
                />
              </FieldGroup>

              {/* Timeline */}
              <FieldGroup
                label="Project Timeline"
                required
                error={errors.timeline}
              >
                <SelectField
                  value={values.timeline}
                  onChange={(v) => setField("timeline", v)}
                  options={LEAD_CONSTANTS.TIMELINES}
                  placeholder="Select timeline"
                  hasError={!!errors.timeline}
                />
              </FieldGroup>

              {/* Description */}
              <div className="fields-grid__full">
                <FieldGroup
                  label="Project Description"
                  required
                  error={errors.project_description}
                >
                  <TextareaField
                    value={values.project_description}
                    onChange={(v) => setField("project_description", v)}
                    placeholder="Describe your project goals, scope, and specific requirements…"
                    rows={5}
                    hasError={!!errors.project_description}
                  />
                </FieldGroup>
              </div>
            </div>
          </FormSection>

          {/* ── divider ── */}
          <div className="section-divider" />

          {/* ── Section 2: Attachments ── */}
          <FormSection
            step={2}
            title="Attachments"
            subtitle="Upload files like PRDs, mockups, or requirement documents (optional)"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept={ACCEPTED_EXTENSIONS}
              style={{ display: "none" }}
            />

            {!values.attachment ? (
              <button
                type="button"
                className={`dropzone${isDragging ? " dropzone--active" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                aria-label="Upload file"
              >
                <span className="dropzone__icon">📎</span>
                <span className="dropzone__title">
                  Click or drag file to upload
                </span>
                <span className="dropzone__hint">
                  PDF, DOCX, PNG or JPG &nbsp;·&nbsp; max 5 MB
                </span>
              </button>
            ) : (
              <div className="file-preview">
                <span className="file-preview__icon">📄</span>
                <div className="file-preview__info">
                  <span className="file-preview__name">
                    {values.attachment.name}
                  </span>
                  <span className="file-preview__size">
                    {(values.attachment.size / 1024).toFixed(1)} KB
                  </span>
                </div>
                <button
                  type="button"
                  className="file-preview__remove"
                  onClick={removeFile}
                  aria-label="Remove file"
                >
                  ✕
                </button>
              </div>
            )}
          </FormSection>

          {/* ── submit ── */}
          <div className="submit-row">
            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  <span aria-hidden="true">🚀</span>
                  Submit Project Request
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Toast toast={toast} />

      <style jsx>{`
        /* ── page layout ── */
        .lead-page {
          min-height: 100vh;
          background-color: var(--bg-color);
          background-image: var(--bg-gradient);
          padding-top: 80px;
        }

        /* ── header ── */
        .lead-header {
          border-bottom: 1px solid var(--card-border);
          padding: 3.5rem 0;
        }
        .lead-header__inner {
          max-width: 800px;
        }
        .lead-header__title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 0.75rem;
          line-height: 1.15;
        }
        .lead-header__sub {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 520px;
        }

        /* ── content area ── */
        .lead-content {
          max-width: 800px;
          padding-top: 3rem;
          padding-bottom: 5rem;
        }

        /* ── fields grid ── */
        .fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .fields-grid__full {
          grid-column: 1 / -1;
        }

        /* ── divider ── */
        .section-divider {
          height: 1px;
          background: var(--card-border);
          margin: 0.5rem 0 2.5rem;
        }

        /* ── drop-zone ── */
        .dropzone {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 3rem 2rem;
          background: rgba(0, 0, 0, 0.2);
          border: 2px dashed var(--card-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-secondary);
          font-family: inherit;
        }
        .dropzone:hover,
        .dropzone--active {
          border-color: var(--primary-color);
          background: rgba(99, 102, 241, 0.06);
          color: var(--text-primary);
        }
        .dropzone__icon {
          font-size: 2.5rem;
          opacity: 0.7;
        }
        .dropzone__title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .dropzone__hint {
          font-size: 0.82rem;
        }

        /* ── file preview ── */
        .file-preview {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--card-border);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .file-preview__icon {
          font-size: 1.75rem;
          flex-shrink: 0;
        }
        .file-preview__info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }
        .file-preview__name {
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .file-preview__size {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .file-preview__remove {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.9rem;
          flex-shrink: 0;
          transition: var(--transition);
          font-family: inherit;
        }
        .file-preview__remove:hover {
          background: rgba(239, 68, 68, 0.3);
        }

        /* ── submit row ── */
        .submit-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        .submit-btn {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;
          gap: 0.6rem;
          min-width: 220px;
        }
        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none !important;
        }

        /* ── spinner ── */
        .spinner {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ── responsive ── */
        @media (max-width: 640px) {
          .fields-grid {
            grid-template-columns: 1fr;
          }
          .submit-btn {
            width: 100%;
          }
          .submit-row {
            justify-content: stretch;
          }
        }
      `}</style>
    </div>
  );
}
