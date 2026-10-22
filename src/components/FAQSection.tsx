"use client";

import { useState } from "react";
import Image from "next/image";
import { FAQ_HEADER, FAQS } from "@/app/data";
import { Plus } from "lucide-react";
import { SITE } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left */}
        <div className="lg:col-span-5">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight">{FAQ_HEADER.headline}</h2>
          <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">
            {FAQ_HEADER.subtitle}{" "}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline underline-offset-4 decoration-accent/30 hover:decoration-accent"
              onClick={() => trackEvent("whatsapp_click", { link_location: "faq" })}
            >
              Open WhatsApp
            </a>
          </p>
          <div className="relative mt-10 hidden lg:block aspect-[4/3.4] rounded-[2rem] overflow-hidden">
            <Image src="/services/deep.png" alt="A bright living room after a deep clean" fill sizes="40vw" className="object-cover" />
          </div>
        </div>

        {/* Accordion */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className={`rounded-[1.5rem] transition-colors ${isOpen ? "bg-bg-soft" : "bg-white ring-1 ring-slate-200"}`}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="w-full flex items-center justify-between gap-6 px-6 sm:px-7 py-5 text-left"
                  >
                    <span className="font-semibold text-primary text-base sm:text-lg leading-snug">{faq.q}</span>
                    <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-primary text-lime rotate-45" : "bg-bg-soft text-primary"}`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 sm:px-7 pb-6 text-muted leading-relaxed max-w-[62ch]">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
