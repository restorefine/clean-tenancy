"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, STATS, TESTIMONIALS } from "@/app/data";
import { trackEvent } from "@/lib/analytics";

/* Avatar tints alternate between the brand colours */
const AVATAR_TINTS = ["bg-accent text-white", "bg-lime text-primary", "bg-sky text-primary"];

/** Full-bleed photo hero with copy anchored bottom left. */
export default function Hero() {
  return (
    <section className="relative">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hp-copy  { animation: heroFadeUp 0.7s cubic-bezier(.2,.7,.2,1) 0.1s both; }
        .hp-proof { animation: heroFadeUp 0.7s cubic-bezier(.2,.7,.2,1) 0.3s both; }
        @media (prefers-reduced-motion: reduce) { .hp-copy, .hp-proof { animation: none; } }
      `}</style>

      <div>
        <div className="relative overflow-hidden h-[calc(100svh-72px)] min-h-[600px] flex">
          <Image src="/images/hero.png" alt="A freshly cleaned, bright open-plan living room" fill priority sizes="100vw" quality={80} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/45 to-primary-dark/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/60 via-transparent to-transparent" />

          <div className="relative mt-auto w-full mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            {/* Copy */}
            <div className="hp-copy max-w-xl">
              <h1 className="text-[2.4rem] leading-[0.98] sm:text-5xl lg:text-[3.6rem] font-semibold tracking-[-0.025em] text-white">
                {HERO_CONTENT.headline} <span className="text-lime">{HERO_CONTENT.headlineAccent}</span>
              </h1>
              <p className="mt-5 text-white/80 text-[0.95rem] sm:text-base leading-relaxed max-w-md">{HERO_CONTENT.subtitle}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href={HERO_CONTENT.ctaPrimary.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-lime pl-7 pr-2 py-2 text-sm font-semibold text-primary transition-colors hover:bg-lime-dark active:scale-[0.98]"
                  onClick={() => trackEvent("quote_click", { link_location: "hero_photo", label: HERO_CONTENT.ctaPrimary.label })}
                >
                  {HERO_CONTENT.ctaPrimary.label}
                  <span className="w-9 h-9 rounded-full bg-primary text-lime flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <a href="#services" className="text-sm font-semibold text-white underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-colors">
                  See our services
                </a>
              </div>
            </div>

            {/* Social proof */}
            <div className="hp-proof flex items-center gap-4 lg:max-w-xs lg:mr-16">
              <div className="flex -space-x-3 shrink-0">
                {TESTIMONIALS.slice(0, 3).map((t, i) => (
                  <span key={t.name} className={`w-11 h-11 rounded-full ring-2 ring-primary-dark flex items-center justify-center text-xs font-semibold ${AVATAR_TINTS[i]}`}>
                    {t.initials}
                  </span>
                ))}
              </div>
              <p className="text-sm text-white/80 leading-snug">
                <span className="block text-white font-semibold text-base">{STATS[0].value} {STATS[0].label.toLowerCase()}</span>
                Tenants, landlords and letting agents across Central Scotland.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
