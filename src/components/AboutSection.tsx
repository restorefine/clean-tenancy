"use client";

import Image from "next/image";
import Link from "next/link";
import { ABOUT_CONTENT } from "@/app/data";
import { ArrowRight, ClipboardCheck, UserCheck, Building2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-bg-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight">{ABOUT_CONTENT.headline}</h2>
            <p className="mt-5 text-muted text-base sm:text-lg leading-relaxed max-w-[60ch]">{ABOUT_CONTENT.description}</p>
          </div>
          <Link
            href={ABOUT_CONTENT.cta.href}
            className="inline-flex items-center gap-2 self-start lg:self-auto rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light active:scale-[0.98] shrink-0"
            onClick={() => trackEvent("quote_click", { link_location: "about_section", label: ABOUT_CONTENT.cta.label })}
          >
            {ABOUT_CONTENT.cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bento: 4 cells */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[minmax(240px,auto)_minmax(240px,auto)] gap-4">
          {/* Photo */}
          <div className="relative min-h-[320px] md:col-span-2 lg:row-span-2 rounded-[2rem] overflow-hidden">
            <Image src="/after/Kitchen Deep Clean.png" alt="A bright kitchen after a deep clean" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>

          {/* Agent checklist */}
          <div className="relative overflow-hidden md:col-span-2 rounded-[2rem] bg-primary p-8 sm:p-10 flex flex-col justify-between gap-10">
            <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-accent/40 blur-3xl" />
            <ClipboardCheck className="relative w-9 h-9 text-lime" strokeWidth={1.75} />
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">An agent-approved checklist</h3>
              <p className="mt-3 text-white/70 leading-relaxed max-w-md">Our tenancy checklist follows what inventory clerks inspect, so check-out reports come back clean.</p>
            </div>
          </div>

          {/* Sign-off */}
          <div className="rounded-[2rem] bg-white p-8 flex flex-col justify-between gap-8">
            <UserCheck className="w-8 h-8 text-accent" strokeWidth={1.75} />
            <div>
              <h3 className="text-xl font-bold text-primary">Team leader sign-off</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">Every job ends with a final walk-through before we leave.</p>
            </div>
          </div>

          {/* Landlords */}
          <div className="rounded-[2rem] bg-lime p-8 flex flex-col justify-between gap-8">
            <Building2 className="w-8 h-8 text-leaf" strokeWidth={1.75} />
            <div>
              <h3 className="text-xl font-bold text-primary">Landlords and agents</h3>
              <p className="mt-2 text-sm text-primary/75 leading-relaxed">Turnovers between tenancies, booked around your void dates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
