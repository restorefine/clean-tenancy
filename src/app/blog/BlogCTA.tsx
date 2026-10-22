"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/** Bottom CTA block on the blog listing page, client component for onClick tracking. */
export default function BlogCTA() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Link
        href="/contact"
        className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-4 text-base font-bold text-accent shadow-2xl shadow-accent/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:bg-slate-50 active:translate-y-0"
        onClick={() => trackEvent("quote_click", { link_location: "blog_listing_cta", label: "Get a Free Quote" })}
      >
        Get a Free Quote
        <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
      <a
        href="https://wa.me/447000000000?text=Hi%20Clean%20Tenancy%2C%20I%27d%20like%20to%20get%20a%20free%20quote%20for%20cleaning%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm px-10 py-4 text-base font-bold text-white transition-all hover:bg-white/20 hover:-translate-y-1"
        onClick={() => trackEvent("whatsapp_click", { link_location: "blog_listing_cta" })}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04.917-1.04 2.23 0 1.313 1.065 2.586 1.214 2.766.149.18 2.094 3.201 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.01-4.88 5.217-4.88 8.905 0 1.232.125 2.449.37 3.633L2 22l3.585-.952c1.15.622 2.44.954 3.783.96 5.231 0 9.449-4.211 9.449-9.409 0-2.524-.979-4.897-2.764-6.683-1.784-1.784-4.16-2.766-6.683-2.766" />
        </svg>
        WhatsApp Us
      </a>
    </div>
  );
}
