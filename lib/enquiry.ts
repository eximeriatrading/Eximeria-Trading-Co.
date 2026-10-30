// Shared by the contact form (client) and /api/contact (server) so validation rules never drift.

export type Enquiry = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  category: string;
  service: string;
  message: string;
  website: string; // honeypot: real users never see or fill this
};

export const EMPTY_ENQUIRY: Enquiry = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  category: "",
  service: "",
  message: "",
  website: "",
};

export const LIMITS = { fullName: 100, email: 160, phone: 30, company: 140, message: 4000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{6,30}$/;

export function validateEnquiry(e: Enquiry): Partial<Record<keyof Enquiry, string>> {
  const errors: Partial<Record<keyof Enquiry, string>> = {};
  if (!e.fullName.trim()) errors.fullName = "Please enter your full name.";
  else if (e.fullName.length > LIMITS.fullName) errors.fullName = "Name is too long.";

  if (!e.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(e.email.trim()) || e.email.length > LIMITS.email) errors.email = "Please enter a valid email address.";

  if (e.phone.trim() && !PHONE_RE.test(e.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (e.company.length > LIMITS.company) errors.company = "Company name is too long.";

  if (!e.role) errors.role = "Please tell us who you are.";

  if (e.message.trim().length < 10) errors.message = "Please describe your requirement (at least 10 characters).";
  else if (e.message.length > LIMITS.message) errors.message = `Please keep it under ${LIMITS.message} characters.`;

  return errors;
}
