"use client";

import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload, X, FileText, Loader2 } from "lucide-react";
import { Box, Typography, Paper, Grid, Divider, IconButton } from "@mui/material";

import CommonButton from "@/CommonClasses/CommonButton";
import CommonTextField from "@/CommonClasses/CommonTextField";
import CommonSelectBox from "@/CommonClasses/CommonSelectBox";
import { LEAD_CONSTANTS } from "@/config/leadConstants";
import toastUtils from "@/utils/ToastUtils";

// Local helper components for consistent layout
const FormSection = ({ title, subtitle, step, children }) => (
  <Box sx={{ mb: 6 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "primary.main",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {step}
      </Box>
      <Box>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>
    {children}
  </Box>
);

const FieldLabel = ({ children, required }) => (
  <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 0.5, display: "block" }}>
    {children} {required && <Box component="span" sx={{ color: "error.main" }}>*</Box>}
  </Typography>
);

// Fallback constants if they are missing from leadConstants.js
const SERVICES = LEAD_CONSTANTS.SERVICES || [
  { value: "web_development", label: "Web Development" },
  { value: "mobile_app", label: "Mobile App Development" },
  { value: "digital_marketing", label: "Digital Marketing" },
  { value: "ui_ux_design", label: "UI/UX Design" },
  { value: "seo", label: "SEO Services" },
  { value: "branding", label: "Branding & Identity" },
];

const COUNTRIES = LEAD_CONSTANTS.COUNTRIES || [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "in", label: "India" },
  { value: "ae", label: "United Arab Emirates" },
];

const SubmitLeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: "",
      country: "",
      budget_range: "",
      timeline: "",
      project_description: "",
      attachment: null,
    },
  });

  const attachment = watch("attachment");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastUtils.error("File size should not exceed 5MB");
        return;
      }
      setValue("attachment", file, { shouldValidate: true });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastUtils.error("File size should not exceed 5MB");
        return;
      }
      setValue("attachment", file, { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setValue("attachment", null, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulated submit — replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toastUtils.success("Lead submitted successfully!");
    } catch {
      toastUtils.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper", py: 6 }}>
        <Box sx={{ maxWidth: "800px", mx: "auto", px: 3 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Post a Project Request
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Describe your project goals and get matched with top verified agencies.
          </Typography>
        </Box>
      </Box>

      {/* Form Area */}
      <Box sx={{ maxWidth: "800px", mx: "auto", px: 3, py: 6 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Section 1: Project Details */}
          <FormSection
            title="Project Details"
            step={1}
            subtitle="Tell us about what you need for your project"
          >
            <Grid container spacing={3}>
              {/* Service */}
              <Grid item xs={12} sm={6}>
                <FieldLabel required>Service Type</FieldLabel>
                <Controller
                  name="service"
                  control={control}
                  rules={{ required: "Service is required" }}
                  render={({ field }) => (
                    <CommonSelectBox
                      {...field}
                      placeholder="Select service"
                      options={SERVICES.map(s => s.label)}
                      error={!!errors.service}
                      helperText={errors.service?.message}
                    />
                  )}
                />
              </Grid>

              {/* Country */}
              <Grid item xs={12} sm={6}>
                <FieldLabel required>Target Country</FieldLabel>
                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => (
                    <CommonSelectBox
                      {...field}
                      placeholder="Select country"
                      options={COUNTRIES.map(c => c.label)}
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </Grid>

              {/* Budget */}
              <Grid item xs={12} sm={6}>
                <FieldLabel required>Estimated Budget</FieldLabel>
                <Controller
                  name="budget_range"
                  control={control}
                  rules={{ required: "Budget is required" }}
                  render={({ field }) => (
                    <CommonSelectBox
                      {...field}
                      placeholder="Select budget"
                      options={LEAD_CONSTANTS.BUDGET_RANGES.map(b => b.label)}
                      error={!!errors.budget_range}
                      helperText={errors.budget_range?.message}
                    />
                  )}
                />
              </Grid>

              {/* Timeline */}
              <Grid item xs={12} sm={6}>
                <FieldLabel required>Project Timeline</FieldLabel>
                <Controller
                  name="timeline"
                  control={control}
                  rules={{ required: "Timeline is required" }}
                  render={({ field }) => (
                    <CommonSelectBox
                      {...field}
                      placeholder="Select timeline"
                      options={LEAD_CONSTANTS.TIMELINES.map(t => t.label)}
                      error={!!errors.timeline}
                      helperText={errors.timeline?.message}
                    />
                  )}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <FieldLabel required>Project Description</FieldLabel>
                <Controller
                  name="project_description"
                  control={control}
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <CommonTextField
                      {...field}
                      multiline
                      rows={5}
                      placeholder="Describe your project goals, scope, and specific requirements..."
                      error={!!errors.project_description}
                      helperText={errors.project_description?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </FormSection>

          <Divider sx={{ mb: 6 }} />

          {/* Section 2: Attachments */}
          <FormSection
            title="Attachments"
            step={2}
            subtitle="Upload files like PRDs, mockups, or requirement documents (optional)"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              style={{ display: "none" }}
            />

            {!attachment ? (
              <Paper
                variant="outlined"
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 6,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderStyle: "dashed",
                  borderWidth: 2,
                  borderColor: isDragging ? "primary.main" : "divider",
                  bgcolor: isDragging ? "action.hover" : "background.paper",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "action.hover",
                  },
                }}
              >
                <Upload size={32} style={{ marginBottom: 16, opacity: 0.6 }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Click or drag file to upload
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  PDF, DOCX, PNG or JPG (max 5MB)
                </Typography>
              </Paper>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "action.hover",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <FileText size={24} />
                  <Box>
                    <Typography variant="body2" fontWeight="600">
                      {attachment.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {(attachment.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={removeFile} size="small">
                  <X size={20} />
                </IconButton>
              </Paper>
            )}
          </FormSection>

          {/* Submit */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <CommonButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              startIcon={isSubmitting ? <Loader2 className="animate-spin" /> : null}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </CommonButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SubmitLeadForm;
