"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Phone, MapPin, Clock } from "lucide-react";
import InquiryWizard, { InquiryAnswers } from "@/components/InquiryWizard";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";
import { FOOTER_SERVICES } from "@/app/data";

const INQUIRY_LABELS: Partial<Record<keyof InquiryAnswers, string>> = {
  serviceType: "Service",
  bedrooms: "Property Size",
  bathrooms: "Bathrooms",
  livingAreas: "Living Rooms",
  kitchen: "Kitchens",
  cupboardTops: "Kitchen Cupboard Tops",
  carpetCleaning: "Carpet Cleaning",
  carpetAreas: "Carpet Areas",
  windowCleaning: "External Windows",
  applianceCleaning: "Appliances",
  appliances: "Appliance List",
  additionalAreas: "Extra Areas",
  furnished: "Furnished",
  pressureWashingNeeded: "Pressure Washing",
  pressureWashSurfaces: "Surfaces",
  otherServices: "Other Services",
  propertyCondition: "Condition",
  carpetedAreas: "Carpeted Areas",
  rugCount: "Rugs",
  upholsteryItems: "Upholstery / Sofas",
  stairsHallways: "Stairs / Hallways",
  carpetItems: "Items",
  area: "Area Size",
  areaSize: "Area Size",
  additionalInfo: "Additional Info",
  premisesType: "Premises",
  preferredDate: "When",
};

export default function Contact() {
  const [inquiry, setInquiry] = useState<InquiryAnswers | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  function handleInquiryComplete(answers: InquiryAnswers) {
    setInquiry(answers);
    // Small delay so the transition feels intentional
    setTimeout(() => setFormVisible(true), 80);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      ...inquiry,
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      address1: fd.get("address1"),
      address2: fd.get("address2"),
      city: fd.get("city"),
      postcode: fd.get("postcode"),
      message: fd.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[contact form] submit failed:", res.status, err);
    }

    setLoading(false);
    trackEvent("form_submit", { form_name: "quote_request" });
    setSubmitted(true);
  }

  return (
    <div className="bg-slate-50 min-h-screen relative font-sans">
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-[700px] z-[0] opacity-[0.05] bg-cover bg-center bg-no-repeat pointer-events-none" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop")' }} />
      <div className="absolute top-0 inset-x-0 h-[700px] z-[0] bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 pointer-events-none" />

      {/* Header */}
      <section className="relative z-10 pt-24 lg:pt-32 pb-12">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Contact <span className="text-accent">Us</span>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">Tell us about your property and we&apos;ll put together the perfect cleaning plan for you.</p>
        </div>
      </section>

      {/* Main grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* Left column */}
          <div className="bg-white rounded-[2rem] p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 min-h-[520px]">
            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center text-center py-16 h-full animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received</h3>
                <p className="text-slate-500 leading-relaxed max-w-sm">We&apos;ll be in touch shortly to align our services with your requirements.</p>
                <button
                  onClick={() => { setSubmitted(false); setInquiry(null); setFormVisible(false); }}
                  className="mt-8 rounded-full border border-slate-200 px-8 py-3 text-sm font-semibold text-slate-600 hover:border-accent hover:text-accent transition-colors"
                >
                  Submit Another Request
                </button>
              </div>

            ) : !inquiry ? (
              /* ── Inquiry wizard ── */
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell Us About Your Property</h2>
                <div className="w-10 h-1 bg-accent mt-3 mb-8 rounded-full" />
                <InquiryWizard onComplete={handleInquiryComplete} />
              </div>

            ) : (
              /* ── Contact form ── */
              <div
                className={`transition-all duration-500 ease-out ${
                  formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Inquiry summary strip */}
                <div className="mb-8 p-4 rounded-2xl bg-accent/5 border border-accent/10">
                  <div className="flex items-center justify-between mb-3">
                    <button
                      onClick={() => { setInquiry(null); setFormVisible(false); }}
                      className="text-xs text-slate-400 hover:text-accent transition-colors underline underline-offset-2"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(INQUIRY_LABELS) as (keyof InquiryAnswers)[])
                      .filter((key) => inquiry[key])
                      .map((key) => (
                      <span key={key} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700">
                        <span className="text-slate-400">{INQUIRY_LABELS[key]}:</span>
                        <span className="font-semibold text-slate-900">{inquiry[key]}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900">Your Contact Details</h2>
                <div className="w-10 h-1 bg-accent mt-3 mb-8 rounded-full" />

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-primary pl-1">Full Name</label>
                      <input id="name" name="name" type="text" required placeholder="Enter your full name"
                        className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-primary pl-1">Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="Your contact number"
                        className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-primary pl-1">Email</label>
                    <input id="email" name="email" type="email" required placeholder="email@address.com"
                      className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address1" className="text-sm font-medium text-primary pl-1">Address Line 1</label>
                    <input id="address1" name="address1" type="text" required placeholder="House number and street name"
                      className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address2" className="text-sm font-medium text-primary pl-1">Address Line 2 <span className="normal-case font-normal">(optional)</span></label>
                    <input id="address2" name="address2" type="text" placeholder="Flat, apartment, building, etc."
                      className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="city" className="text-sm font-medium text-primary pl-1">City / Town</label>
                      <input id="city" name="city" type="text" required placeholder="e.g. Glasgow"
                        className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="postcode" className="text-sm font-medium text-primary pl-1">Postcode</label>
                      <input id="postcode" name="postcode" type="text" required placeholder="e.g. G3 7QL"
                        className="bg-[#F3F4F6] rounded-xl px-5 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-primary pl-1">Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Any additional details..."
                      className="bg-[#F3F4F6] rounded-xl px-5 py-4 text-sm text-slate-800 placeholder-slate-400 outline-none border border-transparent focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all w-full resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-white font-bold text-sm py-4 rounded-xl mt-2 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Submit Request"}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right column, info boxes */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-[1.5rem] p-6 flex gap-4">
              <div className="w-10 h-10 bg-bg-soft rounded-full text-accent flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1.5">Speak With Us</p>
                <a href={SITE.phoneHref} className="text-slate-900 font-bold text-base hover:text-accent">{SITE.phoneDisplay}</a>
                <a href={`mailto:${SITE.email}`} className="block text-slate-500 text-sm mt-0.5 hover:text-accent">{SITE.email}</a>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-6 flex gap-4">
              <div className="w-10 h-10 bg-bg-soft rounded-full text-accent flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary mb-1.5">Our Office</p>
                <p className="text-slate-900 font-medium text-sm leading-snug">{SITE.addressLine1}<br />{SITE.addressLine2}</p>
              </div>
            </div>

            <div className="bg-white rounded-[1.5rem] p-6 flex gap-4">
              <div className="w-10 h-10 bg-bg-soft rounded-full text-accent flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div className="w-full">
                <p className="text-sm font-medium text-primary mb-2.5">Working Hours</p>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Monday to Friday</span><span>08:00 to 20:00</span></div>
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1"><span>Saturday</span><span>09:00 to 17:00</span></div>
                <div className="flex justify-between text-sm font-medium text-slate-400 mt-2"><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>

            <div className="bg-accent rounded-[1.5rem] p-8 mt-2 h-full">
              <p className="text-white font-bold text-base mb-4">Services We Offer</p>
              <ul className="text-white/90 text-sm space-y-3">
                {FOOTER_SERVICES.map(({ label, href }) => (
                  <li key={label} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <Link href={href} className="hover:text-white transition-colors underline-offset-2 hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16 sm:mt-24 h-[420px] w-full rounded-[2rem] overflow-hidden relative shadow-md border border-slate-200">
          <iframe
            src="https://maps.google.com/maps?q=Glasgow%2C%20UK&z=11&output=embed"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Clean Tenancy service area map"
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 bg-white rounded-2xl px-5 py-4 max-w-[280px] shadow-xl border border-slate-100 z-10">
            <p className="text-sm font-medium text-primary mb-1">Our Office</p>
            <p className="text-sm font-bold text-slate-800 leading-snug">{SITE.addressLine1}</p>
            <p className="text-xs text-slate-500 mt-0.5">{SITE.addressLine2}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
