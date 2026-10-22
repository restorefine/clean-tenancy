"use client";

import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS, STATS } from "@/app/data";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/* Avatar tints alternate between the two brand colours */
const AVATAR_TINTS = ["bg-accent text-white", "bg-lime text-primary", "bg-primary text-lime", "bg-sky text-primary"];

/* Counts up from 0 to the numeric part of `value` the first time it scrolls into view */
function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNumeric) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, isNumeric]);

  return (
    <span ref={ref}>
      {isNumeric ? n : ""}
      {suffix}
    </span>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 16), behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight max-w-xl">What our customers tell us</h2>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Previous review" className="w-12 h-12 rounded-full ring-1 ring-slate-200 text-primary flex items-center justify-center hover:bg-bg-soft transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next review" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={trackRef}
          className="mt-12 -mx-4 px-4 sm:-mx-6 sm:px-6 py-1 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              data-card
              className={`snap-start shrink-0 w-[85%] sm:w-[420px] rounded-[2rem] p-8 flex flex-col justify-between gap-10 ${i % 2 === 0 ? "bg-bg-soft" : "bg-white ring-1 ring-slate-200"}`}
            >
              <div>
                <div className="flex gap-1 text-leaf-light" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg sm:text-xl text-primary leading-snug font-medium">&ldquo;{t.quote}&rdquo;</blockquote>
              </div>
              <figcaption className="flex items-center gap-3">
                <span className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold ${AVATAR_TINTS[i % AVATAR_TINTS.length]}`}>{t.initials}</span>
                <span>
                  <span className="block font-semibold text-primary">{t.name}</span>
                  <span className="block text-sm text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10 border-t border-slate-200 pt-12 text-center">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-4xl sm:text-5xl font-bold text-primary tracking-tight tabular-nums">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-2 text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
