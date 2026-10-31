"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT, STATS, TESTIMONIALS } from "@/app/data";
import { trackEvent } from "@/lib/analytics";

/* Avatar tints alternate between the brand colours */
const AVATAR_TINTS = ["bg-accent text-white", "bg-lime text-primary", "bg-sky text-primary"];
const GLASS_CLEAR_TIME = 6;

/** Silent background video with copy anchored bottom left. */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isGlassClear, setIsGlassClear] = useState(false);

  function syncTextColour(event: SyntheticEvent<HTMLVideoElement>) {
    setIsGlassClear(event.currentTarget.currentTime >= GLASS_CLEAR_TIME);
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => {});
    };
    updatePlayback();
    preference.addEventListener("change", updatePlayback);
    return () => preference.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <section className="hp-hero relative" data-glass={isGlassClear ? "clear" : "dirty"}>
      <style>{`
        .hp-hero { --hp-ink: #003459; --hp-accent: #285c20; --hp-secondary: #003459; }
        .hp-hero[data-glass="clear"] { --hp-ink: #ffffff; --hp-accent: #dcf7a6; --hp-secondary: rgb(255 255 255 / 0.8); }
        .hp-text { color: var(--hp-ink); }
        .hp-accent { color: var(--hp-accent); }
        .hp-secondary { color: var(--hp-secondary); }
        .hp-text, .hp-accent, .hp-secondary { transition: color 600ms ease; }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hp-copy  { animation: heroFadeUp 0.7s cubic-bezier(.2,.7,.2,1) 0.1s both; }
        .hp-proof { animation: heroFadeUp 0.7s cubic-bezier(.2,.7,.2,1) 0.3s both; }
        @media (prefers-reduced-motion: reduce) {
          .hp-copy, .hp-proof { animation: none; }
          .hp-text, .hp-accent, .hp-secondary { transition: none; }
        }
      `}</style>

      <div>
        <div className="relative overflow-hidden min-h-[620px] sm:min-h-[680px] lg:h-[calc(100svh-72px)] lg:min-h-[600px] flex bg-primary-dark">
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            poster="/images/hero.png"
            muted
            loop
            playsInline
            preload="metadata"
            onTimeUpdate={syncTextColour}
            onSeeked={syncTextColour}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative mt-auto w-full mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8 pt-24 pb-10 lg:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-7 lg:gap-10">
            {/* Copy */}
            <div className="hp-copy max-w-xl">
              <h1 className="hp-text text-[2.4rem] leading-[0.98] sm:text-5xl lg:text-[3.6rem] font-semibold tracking-[-0.025em]">
                {HERO_CONTENT.headline} <span className="hp-accent">{HERO_CONTENT.headlineAccent}</span>
              </h1>
              <p className="hp-secondary mt-5 text-[0.95rem] sm:text-base leading-relaxed max-w-md">{HERO_CONTENT.subtitle}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href={HERO_CONTENT.ctaPrimary.href}
                  className="group inline-flex items-center gap-3 rounded-full bg-lime pl-7 pr-2 py-2 text-sm font-semibold text-primary transition-colors hover:bg-lime-dark active:scale-[0.98]"
                  onClick={() => trackEvent("quote_click", { link_location: "hero_video", label: HERO_CONTENT.ctaPrimary.label })}
                >
                  {HERO_CONTENT.ctaPrimary.label}
                  <span className="w-9 h-9 rounded-full bg-primary text-lime flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
                <a href="#services" className="hp-text text-sm font-semibold underline underline-offset-[6px] decoration-current">
                  See our services
                </a>
              </div>
            </div>

            {/* Social proof */}
            <div className="hp-proof flex items-start gap-3 sm:items-center sm:gap-4 lg:max-w-xs lg:mr-16">
              <div className="flex -space-x-3 shrink-0">
                {TESTIMONIALS.slice(0, 3).map((t, i) => (
                  <span key={t.name} className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ring-2 ring-primary-dark flex items-center justify-center text-xs font-semibold ${AVATAR_TINTS[i]}`}>
                    {t.initials}
                  </span>
                ))}
              </div>
              <p className="hp-secondary text-sm leading-snug">
                <span className="hp-text block font-semibold text-base">{STATS[0].value} {STATS[0].label.toLowerCase()}</span>
                Tenants, landlords and letting agents across Central Scotland.
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
