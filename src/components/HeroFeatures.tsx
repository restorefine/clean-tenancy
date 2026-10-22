import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Clock, Sparkles, UserCheck, ArrowRight } from "lucide-react";
import { HERO_FEATURES } from "@/app/data";

/* ── Feature icons, indexed to match HERO_FEATURES in data.ts ── */
const FEATURE_ICONS = [ShieldCheck, Sparkles, Clock, UserCheck];

/* ── "Included as standard" section directly below the hero ── */
export default function HeroFeatures() {
  const [lead, ...rest] = HERO_FEATURES;
  const LeadIcon = FEATURE_ICONS[0];

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Photo with the lead promise */}
        <div className="relative min-h-[440px] lg:min-h-[600px] rounded-[2rem] overflow-hidden">
          <Image src="/images/footer_bg.png" alt="A cleaner in gloves spraying and wiping a worktop" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/10 to-transparent" />

          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6 rounded-[1.5rem] bg-white/10 backdrop-blur-xl ring-1 ring-white/20 p-6 sm:p-7 flex items-start gap-5">
            <span className="w-12 h-12 shrink-0 rounded-2xl bg-lime text-primary flex items-center justify-center">
              <LeadIcon className="w-6 h-6" strokeWidth={1.75} />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{lead.title}</h3>
              <p className="mt-1.5 text-white/80 leading-relaxed">{lead.desc}</p>
            </div>
          </div>
        </div>

        {/* Heading + supporting promises */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-primary leading-[1.05] tracking-tight">Included in every booking</h2>
          <p className="mt-5 text-muted text-base sm:text-lg leading-relaxed max-w-md">Whichever service you choose, these come as standard on every visit.</p>

          <ul className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
            {rest.map((f, i) => {
              const Icon = FEATURE_ICONS[i + 1];
              return (
                <li key={f.title} className="flex items-start gap-5 py-6">
                  <span className="w-12 h-12 shrink-0 rounded-2xl bg-bg-soft text-accent flex items-center justify-center">
                    <Icon className="w-6 h-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-primary leading-tight">{f.title}</h3>
                    <p className="mt-1.5 text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light active:scale-[0.98]"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
