"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, SERVICES_HEADER } from "@/app/data";
import { Home, Sparkles, Wrench, UtensilsCrossed, LayoutGrid, Droplets, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/* ── Icons, indexed to match SERVICES in data.ts ── */
const SERVICE_ICONS = [Home, Sparkles, Wrench, LayoutGrid, UtensilsCrossed, Droplets];

export default function ServicesSection() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    const raw = searchParams.get("service");
    if (raw === null) return;
    const idx = parseInt(raw, 10);
    if (isNaN(idx) || idx < 0 || idx >= SERVICES.length) return;
    setActive(idx);
    requestAnimationFrame(() => {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [searchParams]);

  const service = SERVICES[active];
  const totalItems = service.checklist.reduce((s, c) => s + c.items.length, 0);
  const go = (dir: number) => setActive((i) => (i + dir + SERVICES.length) % SERVICES.length);

  return (
    <section className="py-24 lg:py-32">
      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .panel-in { animation: panelIn 0.35s cubic-bezier(.2,.7,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .panel-in { animation: none; } }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight">{SERVICES_HEADER.headline}</h2>
          <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">{SERVICES_HEADER.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mt-10 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Services" className="flex gap-2 w-max">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[i];
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? "bg-primary text-white" : "bg-bg-soft text-primary hover:bg-slate-200/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-lime" : "text-accent"}`} />
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature panel */}
        <div key={active} className="panel-in mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="relative lg:col-span-7 aspect-[4/3] lg:aspect-auto lg:min-h-[460px] rounded-[2rem] overflow-hidden bg-bg-soft">
            <Image src={service.image} alt={service.title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button onClick={() => go(-1)} aria-label="Previous service" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => go(1)} aria-label="Next service" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-[2rem] bg-bg-soft p-7 sm:p-9 flex flex-col">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{service.title}</h3>
            <p className="mt-3 text-muted leading-relaxed">{service.desc}</p>

            <ul className="mt-7 flex flex-col gap-3.5">
              {service.includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-leaf text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-primary font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {active === 0 && (
              <p className="mt-7 rounded-2xl bg-white px-5 py-4 text-sm text-primary leading-relaxed">
                <span className="font-semibold">Deposit-back guarantee.</span> If your agent flags anything on our checklist, we return and put it right at no cost.
              </p>
            )}

            <div className="mt-auto pt-8 flex flex-wrap items-center gap-3">
              <Link
                href={SERVICES_HEADER.cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light active:scale-[0.98]"
                onClick={() => trackEvent("quote_click", { link_location: "services_panel", label: SERVICES_HEADER.cta.label, service: service.title })}
              >
                {SERVICES_HEADER.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setShowChecklist((v) => !v)}
                aria-expanded={showChecklist}
                className="inline-flex items-center gap-2 rounded-full border border-primary/15 px-5 py-3.5 text-sm font-semibold text-primary hover:border-primary/40 transition-colors"
              >
                Full checklist ({totalItems})
                <ChevronDown className={`w-4 h-4 transition-transform ${showChecklist ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${showChecklist ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div key={active} className="mt-4 rounded-[2rem] border border-slate-200 p-6 sm:p-9 columns-1 md:columns-2 lg:columns-3 gap-10">
              {service.checklist.map((section) => (
                <div key={section.category} className="break-inside-avoid mb-8">
                  <h4 className="font-semibold text-primary">{section.category}</h4>
                  <ul className="mt-3 flex flex-col gap-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted leading-snug">
                        <Check className="w-4 h-4 mt-px shrink-0 text-leaf" strokeWidth={2.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
