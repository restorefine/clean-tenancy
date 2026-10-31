// ─────────────────────────────────────────────────────────────
// Contact Page Data
// All text content for the contact page lives here.
// SVG icons are defined in the page component and merged at render time.
// ─────────────────────────────────────────────────────────────

import { SITE } from "@/lib/site";

// ── Hero ──────────────────────────────────────────────────────
export const CONTACT_HERO = {
  eyebrow: "Get In Touch",
  headlineMain: "Contact",
  headlineAccent: "Us",
  subtitle:
    "Ready to book or just have a question? Our team is available seven days a week and typically responds within a few hours.",
};

// ── Contact Info Panel ────────────────────────────────────────
export const CONTACT_PANEL = {
  label: "Clean Tenancy",
  title: "We are here to help.",
  subtitle:
    "Reach out by phone, email, or use the form, we will get back to you quickly.",
  servicesLabel: "Services We Offer",
};

export const CONTACT_INFO: {
  label: string;
  value: string;
  sub: string;
  href: string | null;
}[] = [
  {
    label: "Call Us",
    value: "07000 000000",
    sub: "Mon to Sun, 08:30 to 20:00",
    href: "tel:07000000000",
  },
  {
    label: "Email Us",
    value: SITE.email,
    sub: "We reply within a few hours",
    href: `mailto:${SITE.email}`,
  },
  {
    label: "Our Office",
    value: "Glasgow, Scotland",
    sub: "United Kingdom",
    href: "https://maps.google.com",
  },
  {
    label: "Working Hours",
    value: "Mon to Sun: 08:30 to 20:00",
    sub: "Seven days a week",
    href: null,
  },
];

// ── Service Options ───────────────────────────────────────────
export const CONTACT_SERVICES: string[] = [
  "End of Tenancy Cleaning",
  "One-Off Deep Cleaning",
  "After Builders Cleaning",
  "Oven & Appliances",
  "Carpet & Rug Cleaning",
  "Pressure Washing",
  "Other",
];

// ── Quote Form ────────────────────────────────────────────────
export const CONTACT_FORM = {
  title: "Request a Free Quote",
  subtitle: "Fill in the form below and we will be in touch shortly.",
  submitLabel: "Send Request",
  disclaimer: "We typically respond within a few hours. No spam, ever.",
  fields: {
    name: { label: "Full Name", placeholder: "Your full name" },
    phone: { label: "Phone Number", placeholder: "07xxx xxxxxx" },
    email: { label: "Email Address", placeholder: "your@email.com" },
    service: { label: "Service Required" },
    area: { label: "Your Area / Town", placeholder: "e.g. Paisley, Falkirk" },
    message: {
      label: "Message",
      placeholder:
        "Tell us about your property, preferred date, or any special requirements...",
    },
  },
  success: {
    title: "Request Sent",
    message:
      "Thank you for reaching out. A member of our team will be in touch within a few hours to confirm your booking.",
    resetLabel: "Send Another Request",
  },
};
