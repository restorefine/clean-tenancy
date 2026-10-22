"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

const SECTION_LINKS = [
  { label: "Services", id: "services" },
  { label: "Coverage", id: "coverage" },
  { label: "About", id: "about" },
  { label: "Process", id: "how-it-works" },
  { label: "FAQ", id: "faq" },
  { label: "Reviews", id: "testimonials" },
];

const PAGE_LINKS = [{ label: "Blog", href: "/blog" }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  function scrollToSection(id: string) {
    setOpen(false);
    if (pathname !== "/") {
      // Navigate to homepage first, then scroll after mount
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const linkClass = "text-sm font-medium text-white/75 transition-colors hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-[72px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center shrink-0" aria-label="Clean Tenancy home">
          <Image src="/brand/logo-white.svg" alt="Clean Tenancy" width={150} height={43} className="h-10 w-auto" priority unoptimized />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7">
          {SECTION_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button onClick={() => scrollToSection(id)} className={linkClass}>
                {label}
              </button>
            </li>
          ))}
          {PAGE_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className={linkClass}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: phone + CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            onClick={() => trackEvent("phone_click", { link_location: "navbar_desktop" })}
          >
            <Phone className="w-4 h-4 text-lime" />
            {SITE.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-lime-dark active:scale-[0.98]"
            onClick={() => trackEvent("quote_click", { link_location: "navbar_desktop", label: "Get a Free Quote" })}
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden text-white p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-primary px-4 py-5 flex flex-col gap-4">
          {SECTION_LINKS.map(({ label, id }) => (
            <button key={id} onClick={() => scrollToSection(id)} className="text-left text-white/85 font-medium hover:text-white transition-colors">
              {label}
            </button>
          ))}
          {PAGE_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} className="text-left text-white/85 font-medium hover:text-white transition-colors">
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <a
              href={SITE.phoneHref}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => trackEvent("phone_click", { link_location: "navbar_mobile" })}
            >
              <Phone className="w-4 h-4 text-lime" />
              Call Us
            </a>
            <Link
              href="/contact"
              onClick={() => {
                setOpen(false);
                trackEvent("quote_click", { link_location: "navbar_mobile", label: "Get a Free Quote" });
              }}
              className="flex-1 inline-flex items-center justify-center rounded-full bg-lime px-4 py-3 text-sm font-semibold text-primary"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
