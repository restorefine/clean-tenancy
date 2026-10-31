import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/app/data";
import JsonLd from "@/components/JsonLd";
import { BASE_URL, OG_IMAGE, SERVICE_AREAS, breadcrumbs } from "@/lib/seo";

const description = "Explore end of tenancy, deep, after builders, carpet, oven and pressure washing services across Glasgow and Central Scotland. Find your clean and get a quote.";

export const metadata: Metadata = {
  title: "Cleaning Services in Glasgow & Central Scotland",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Cleaning Services | Clean Tenancy",
    description,
    url: "/services",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Cleaning Services | Clean Tenancy", description, images: [OG_IMAGE] },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[
        breadcrumbs([{ name: "Cleaning Services", path: "/services" }]),
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Cleaning Services",
          url: `${BASE_URL}/services`,
          description,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: SERVICES.map((service, index) => ({
              "@type": "ListItem", position: index + 1, name: service.title, url: `${BASE_URL}/services/${service.slug}`,
            })),
          },
        },
      ]} />
      <section className="bg-bg-soft py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Services</span></nav>
          <p className="text-sm font-semibold text-accent">Glasgow &amp; Central Scotland</p>
          <h1 className="mt-3 max-w-3xl text-4xl sm:text-6xl font-bold tracking-tight text-primary">Cleaning for every stage of your home</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">Moving out, refreshing a lived-in home or clearing up after renovation? Explore our six cleaning services, see what each covers and choose the right starting point for your property.</p>
        </div>
      </section>
      <section aria-label="Our cleaning services" className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article key={service.slug}>
              <Link href={`/services/${service.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg-soft"><Image src={service.image} alt={service.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" /></div>
                <h2 className="mt-5 text-2xl font-bold text-primary group-hover:underline">{service.title}</h2>
              </Link>
              <p className="mt-3 text-muted leading-relaxed">{service.desc}</p>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Explore {service.title.toLowerCase()}<ArrowRight className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-bg-soft py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold text-primary">Which clean do you need?</h2>
            <p className="mt-5 leading-relaxed text-muted">Choose end of tenancy cleaning for a property handover, deep cleaning for a more detailed refresh of an occupied home, or after builders cleaning once renovation work is complete. The room checklists on each page explain the differences and help you describe the work you want quoted.</p>
            <p className="mt-4 leading-relaxed text-muted">Carpet and rug cleaning, appliance cleaning and pressure washing address particular materials or areas. You can ask about combining services in one enquiry. List the rooms, appliances or outdoor areas you need covered so we can confirm the scope, access requirements and availability before you book.</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary">Tell us about your property</h2>
            <p className="mt-5 leading-relaxed text-muted">We cover {SERVICE_AREAS.join(", ")}. Include your postcode, property size, current condition and preferred date when requesting a quote. Photos are useful for renovation residue, stains, heavily used appliances or outdoor areas where access needs planning.</p>
            <p className="mt-4 leading-relaxed text-muted">If you have a checkout deadline or instructions from your agent, share them with your enquiry. If you are unsure which service fits, describe the result you need and we can discuss the suitable options. The quote will confirm what is included and any preparation required.</p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-light">Get a Free Quote<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
