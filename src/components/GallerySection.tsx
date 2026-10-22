"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { GALLERY_HEADER, GALLERY_ITEMS } from "@/app/data";
import { ChevronLeft, ChevronRight, Hand, RotateCcw } from "lucide-react";

const BRUSH = 44; // brush radius in CSS px
const DONE_AT = 0.7; // auto-finish once this share of the grime is wiped

/** Scratch-to-clean reveal: the "before" photo is painted on a canvas over the
 *  "after" photo, and the pointer wipes it away like a sponge. */
function ScratchReveal({ before, after, room }: { before: string; after: string; room: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const lastCheck = useRef(0);
  const [cleaned, setCleaned] = useState(0);
  const [done, setDone] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [hint, setHint] = useState(false);
  const [seed, setSeed] = useState(0); // bump to reset
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  /* Paint the "before" image over the canvas, cover-fit */
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const img = new window.Image();
    img.src = encodeURI(before);

    const paint = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx || !img.complete || !img.naturalWidth) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (width - w) / 2, (height - h) / 2, w, h);
      setCleaned(0);
      setDone(false);
    };

    img.onload = paint;
    const ro = new ResizeObserver(paint);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [before, seed]);

  /* Show the hint for 2s when the card scrolls into view */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let timer: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setHint(true);
        timer = setTimeout(() => setHint(false), 2000);
      },
      { threshold: 0.5 }
    );
    io.observe(wrap);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [before]);

  const measure = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if (data[i] < 40) clear++;
    }
    const ratio = total ? clear / total : 0;
    setCleaned(ratio);
    if (ratio >= DONE_AT) setDone(true);
  }, []);

  const wipe = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || done) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const from = lastPoint.current ?? { x, y };

      ctx.globalCompositeOperation = "destination-out";
      // Stamp soft circles along the path so fast moves leave no gaps
      const dist = Math.hypot(x - from.x, y - from.y);
      const steps = Math.max(1, Math.ceil(dist / (BRUSH / 4)));
      for (let i = 1; i <= steps; i++) {
        const px = from.x + ((x - from.x) * i) / steps;
        const py = from.y + ((y - from.y) * i) / steps;
        const g = ctx.createRadialGradient(px, py, 0, px, py, BRUSH);
        g.addColorStop(0, "rgba(0,0,0,1)");
        g.addColorStop(0.6, "rgba(0,0,0,0.85)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, BRUSH, 0, Math.PI * 2);
        ctx.fill();
      }
      lastPoint.current = { x, y };

      const now = performance.now();
      if (now - lastCheck.current > 250) {
        lastCheck.current = now;
        measure();
      }
    },
    [done, measure]
  );

  const percent = done ? 100 : Math.round((cleaned / DONE_AT) * 100);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full h-full overflow-hidden select-none touch-pan-y ${done ? "cursor-default" : "cursor-none"}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setHint(false);
        wipe(e.clientX, e.clientY);
      }}
      onPointerDown={(e) => {
        lastPoint.current = null;
        wipe(e.clientX, e.clientY);
      }}
      onPointerLeave={() => {
        lastPoint.current = null;
        setCursor(null);
        measure();
      }}
    >
      {/* After, underneath */}
      <Image src={after} alt={`${room}, after cleaning`} fill draggable={false} className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" />

      {/* Before, wiped away */}
      <canvas
        ref={canvasRef}
        aria-label={`${room}, before cleaning`}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${done ? "opacity-0" : "opacity-100"}`}
      />

      {/* Sponge cursor */}
      {cursor && !done && (
        <span
          className="pointer-events-none absolute z-20 rounded-full border-2 border-white/90 bg-white/10 shadow-[0_0_0_1px_rgba(0,52,89,0.25)]"
          style={{ width: BRUSH * 2, height: BRUSH * 2, left: cursor.x - BRUSH, top: cursor.y - BRUSH }}
        />
      )}

      {/* Hint */}
      <div className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ${hint && !done ? "opacity-100" : "opacity-0"}`}>
        <div className="flex items-center gap-3 rounded-full bg-primary/85 backdrop-blur px-6 py-3.5 text-white shadow-xl">
          <Hand className="w-5 h-5 text-lime animate-[wave_1s_ease-in-out_infinite]" />
          <span className="font-semibold">{isTouch ? "Swipe across the photo to clean it" : "Move your mouse to clean the room"}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur pl-2 pr-4 py-1.5 text-sm font-semibold text-primary">
        <span className="relative w-6 h-6">
          <svg viewBox="0 0 36 36" className="w-6 h-6 -rotate-90" aria-hidden>
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.12" strokeWidth="5" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-leaf)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(percent / 100) * 94.25} 94.25`} className="transition-[stroke-dasharray] duration-300" />
          </svg>
        </span>
        <span className="tabular-nums">{done ? "Spotless" : `${percent}% clean`}</span>
      </div>

      {done && (
        <button
          onClick={() => setSeed((n) => n + 1)}
          className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-primary/85 backdrop-blur px-4 py-2 text-sm font-semibold text-white hover:bg-primary transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Make it dirty again
        </button>
      )}
    </div>
  );
}

export default function GallerySection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setVisible(true);
    }, 180);
  }, []);

  const prev = () => goTo(activeIdx === 0 ? GALLERY_ITEMS.length - 1 : activeIdx - 1);
  const next = () => goTo(activeIdx === GALLERY_ITEMS.length - 1 ? 0 : activeIdx + 1);

  const item = GALLERY_ITEMS[activeIdx];

  return (
    <section className="py-24 lg:py-32 bg-bg-soft">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.08] tracking-tight">{GALLERY_HEADER.headline}</h2>
          <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed">{GALLERY_HEADER.subtitle}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Job list */}
          <div className="order-2 lg:order-1 lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 lg:mx-0 lg:px-0">
            {GALLERY_ITEMS.map((g, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={g.id}
                  onClick={() => goTo(i)}
                  aria-pressed={isActive}
                  className={`group shrink-0 flex items-center gap-4 rounded-[1.5rem] p-2.5 pr-5 text-left transition-colors ${isActive ? "bg-primary" : "bg-white hover:bg-white/70"}`}
                >
                  <span className="relative w-16 h-16 lg:w-20 lg:h-16 shrink-0 rounded-2xl overflow-hidden">
                    <Image src={g.after} alt="" fill className="object-cover" sizes="80px" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-semibold leading-tight whitespace-nowrap ${isActive ? "text-white" : "text-primary"}`}>{g.room}</span>
                    <span className={`block mt-1 text-sm ${isActive ? "text-lime" : "text-muted"}`}>{g.tag}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slider */}
          <div className="order-1 lg:order-2 lg:col-span-8 relative">
            <div
              className="rounded-[2rem] overflow-hidden bg-slate-200 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px] transition-opacity duration-200"
              style={{ opacity: visible ? 1 : 0 }}
            >
              <ScratchReveal key={activeIdx} before={item.before} after={item.after} room={item.room} />
            </div>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <button onClick={prev} aria-label="Previous job" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center hover:bg-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={next} aria-label="Next job" className="w-11 h-11 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center hover:bg-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
