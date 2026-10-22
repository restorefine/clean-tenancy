"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Link from "next/link";
import { HOW_IT_WORKS_HEADER, STEPS } from "@/app/data";
import { ArrowRight, CalendarDays, SprayCan, KeyRound } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/* ── Step icons, indexed to match STEPS in data.ts ── */
const STEP_ICONS = [CalendarDays, SprayCan, KeyRound];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrolled = window.innerHeight * 0.6 - rect.top;
    setProgress(Math.max(0, Math.min(1, scrolled / (rect.height * 0.6))));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 bottom-0 w-[480px] h-[480px] rounded-full bg-accent/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-[1.08] tracking-tight">{HOW_IT_WORKS_HEADER.headline}</h2>
            <p className="mt-4 text-white/65 text-base sm:text-lg">{HOW_IT_WORKS_HEADER.subtitle}</p>
          </div>
          <Link
            href={HOW_IT_WORKS_HEADER.cta.href}
            className="inline-flex items-center gap-2 self-start lg:self-auto rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-lime-dark active:scale-[0.98] shrink-0"
            onClick={() => trackEvent("quote_click", { link_location: "how_it_works", label: HOW_IT_WORKS_HEADER.cta.label })}
          >
            {HOW_IT_WORKS_HEADER.cta.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Progress rail */}
        <div className="relative mt-16 hidden md:block h-px bg-white/15">
          <div className="absolute inset-y-0 left-0 bg-lime transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
        </div>

        <ol className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {STEPS.map((step, i) => {
            const Icon = STEP_ICONS[i];
            const reached = progress >= i / STEPS.length + 0.05;
            return (
              <li key={step.num} className="relative md:pt-10">
                <span
                  className={`hidden md:block absolute -top-[7px] left-0 w-3.5 h-3.5 rounded-full ring-4 ring-primary transition-colors duration-300 ${reached ? "bg-lime" : "bg-white/30"}`}
                />
                <div className="flex items-center gap-4">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${reached ? "bg-lime text-primary" : "bg-white/10 text-white"}`}>
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className={`text-5xl font-bold tabular-nums transition-colors duration-300 ${reached ? "text-white" : "text-white/15"}`}>{String(step.num).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-white/65 leading-relaxed max-w-[34ch]">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
