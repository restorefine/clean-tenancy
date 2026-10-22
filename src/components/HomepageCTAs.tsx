"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { SITE } from "@/lib/site";

/** CTA banner + desktop WhatsApp FAB, extracted as a client component so
 *  onClick tracking handlers work without making the entire homepage a client component. */
export default function HomepageCTAs() {
  return (
    <>
      {/* ── CTA card ── */}
      <section className="px-4 sm:px-6 pb-24 lg:pb-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary via-primary-light to-accent">
          <Image
            src="/brand/mark-color.svg"
            alt=""
            aria-hidden
            width={520}
            height={470}
            className="pointer-events-none absolute -right-20 -bottom-24 w-[520px] max-w-none opacity-15 select-none"
            unoptimized
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 sm:p-14 lg:p-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.08] tracking-tight max-w-[14ch]">Moving out soon? Let&apos;s get it sorted.</h2>
              <p className="mt-5 text-white/75 text-base sm:text-lg leading-relaxed max-w-md">Tell us about the property and we will send back a clear, fixed quote.</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-lime pl-7 pr-2 py-2 text-sm font-semibold text-primary transition-colors hover:bg-lime-dark active:scale-[0.98]"
                  onClick={() => trackEvent("quote_click", { link_location: "homepage_cta_banner", label: "Get a Free Quote" })}
                >
                  Get a Free Quote
                  <span className="w-9 h-9 rounded-full bg-primary text-lime flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-[0.95rem] text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  onClick={() => trackEvent("phone_click", { link_location: "homepage_cta_banner" })}
                >
                  <Phone className="w-4 h-4 text-lime" />
                  {SITE.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block h-full min-h-[440px]">
              <Image src="/services/builders.png" alt="A spotless open-plan home with natural light" fill sizes="50vw" className="object-cover [mask-image:linear-gradient(to_right,transparent,black_30%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WhatsApp floating button (desktop) ── */}
      <a
        href={SITE.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="hidden lg:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-leaf items-center justify-center shadow-lg shadow-leaf/30 hover:bg-leaf-light hover:scale-105 transition-all duration-200"
        onClick={() => trackEvent("whatsapp_click", { link_location: "homepage_fab" })}
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
