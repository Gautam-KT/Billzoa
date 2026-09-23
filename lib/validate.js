import { projectTypes, budgetRanges } from "@/data/contact";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Shared by the browser (instant feedback) and the API route (the actual gate).
export function validateInquiry(values) {
  const v = {
    name: String(values.name ?? "").trim(),
    company: String(values.company ?? "").trim(),
    email: String(values.email ?? "").trim(),
    projectType: String(values.projectType ?? ""),
    budget: String(values.budget ?? "unsure"),
    message: String(values.message ?? "").trim(),
  };
  const errors = {};
  if (v.name.length < 2) errors.name = "Enter your name.";
  if (v.name.length > 120) errors.name = "Keep your name under 120 characters.";
  if (v.company.length > 160) errors.company = "Keep the company name under 160 characters.";
  if (!v.email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(v.email)) errors.email = "Enter a valid email, like name@company.com.";
  if (!projectTypes.some((t) => t.value === v.projectType)) errors.projectType = "Choose a project type.";
  if (!budgetRanges.some((b) => b.value === v.budget)) errors.budget = "Choose a budget range.";
  if (v.message.length < 20) errors.message = "Describe the project in at least 20 characters.";
  else if (v.message.length > 4000) errors.message = "Keep the description under 4,000 characters.";
  return { values: v, errors, valid: Object.keys(errors).length === 0 };
}
