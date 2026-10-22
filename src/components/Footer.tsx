"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { FOOTER_CONTENT, FOOTER_SERVICES, FOOTER_QUICK_LINKS } from "@/app/data";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  function scrollTo(section: string) {
    if (pathname !== "/") {
      router.push(`/#${section}`);
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const linkClass = "text-sm text-white/65 hover:text-white transition-colors text-left";

  return (
    <footer className="relative overflow-hidden w-full bg-primary-dark text-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-flex" aria-label="Clean Tenancy home">
              <Image src="/brand/logo-white.svg" alt="Clean Tenancy" width={190} height={55} className="h-12 w-auto" unoptimized />
            </Link>
            <p className="mt-6 text-white/65 text-sm leading-relaxed max-w-xs">{FOOTER_CONTENT.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {FOOTER_SERVICES.map(({ label, href, serviceIndex }) => (
                <li key={label}>
                  <Link href={serviceIndex !== undefined ? `/?service=${serviceIndex}` : href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-white">Company</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {FOOTER_QUICK_LINKS.map(({ label, href, section }) => (
                <li key={label}>
                  {section ? (
                    <button onClick={() => scrollTo(section)} className={linkClass}>
                      {label}
                    </button>
                  ) : (
                    <Link href={href!} className={linkClass}>
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-lime" />
                <a href={SITE.phoneHref} className="text-white/80 hover:text-white transition-colors font-medium" onClick={() => trackEvent("phone_click", { link_location: "footer" })}>
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-lime" />
                <a href={`mailto:${SITE.email}`} className="text-white/80 hover:text-white transition-colors break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-lime" />
                <address className="text-white/80 not-italic leading-snug">
                  {FOOTER_CONTENT.addressLine1}
                  <br />
                  {FOOTER_CONTENT.addressLine2}
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 shrink-0 text-lime" />
                <span className="text-white/80 leading-relaxed">
                  Monday to Friday, 08:00 to 20:00
                  <br />
                  Saturday, 09:00 to 17:00
                  <br />
                  <span className="text-white/50">Sunday, closed</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} {FOOTER_CONTENT.brandName}. All rights reserved. Designed by{" "}
            <a href="https://restorefine.co.uk" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/80 hover:text-white">
              Restorefine Studios
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/terms-and-condition" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
