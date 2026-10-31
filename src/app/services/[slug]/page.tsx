import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { BASE_URL, SERVICE_AREAS, breadcrumbs } from "@/lib/seo";
import { SERVICE_PAGES, getService } from "../data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) notFound();
  const title = `${service.heading} | Clean Tenancy`;
  return {
    title: service.heading,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title,
      description: service.description,
      type: "website",
      url: `/services/${service.slug}`,
      images: [{ url: service.image, alt: service.heading }],
    },
    twitter: { card: "summary_large_image", title, description: service.description, images: [service.image] },
  };
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  return (
    <>
      <JsonLd data={[
        breadcrumbs([{ name: "Cleaning Services", path: "/services" }, { name: service.heading, path }]),
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": `${BASE_URL}${path}#service`,
          name: service.heading,
          serviceType: service.heading,
          description: service.description,
          url: `${BASE_URL}${path}`,
          image: `${BASE_URL}${service.image}`,
          provider: { "@id": `${BASE_URL}/#business` },
          areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
          mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}${path}` },
        },
      ]} />
      <section className="bg-bg-soft py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-x-2 gap-y-1 text-sm text-muted">
            <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span>
            <Link href="/services" className="hover:underline">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{service.heading}</span>
          </nav>
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-accent">Glasgow &amp; Central Scotland</p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-primary">{service.heading}</h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">{service.intro}</p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-light">Get a Free Quote<ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white"><Image src={service.image} alt={service.heading} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority /></div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
          <div className="space-y-10">
            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-relaxed text-muted">{paragraph}</p>)}
              </section>
            ))}
            <Link href={`/blog/${service.guide.slug}`} className="inline-flex items-center gap-2 font-semibold text-accent hover:underline">{service.guide.label}<ArrowRight className="h-4 w-4 shrink-0" /></Link>
          </div>
          <aside className="self-start rounded-2xl bg-bg-soft p-6 sm:p-8">
            <h2 className="text-xl font-bold text-primary">Service at a glance</h2>
            <ul className="mt-5 space-y-4">{service.includes.map((item) => <li key={item} className="flex items-start gap-3 text-primary"><Check className="mt-1 h-4 w-4 shrink-0 text-leaf" /><span>{item}</span></li>)}</ul>
            <p className="mt-7 text-sm leading-relaxed text-muted">Serving {SERVICE_AREAS.join(", ")}. Share your postcode to confirm availability for your property.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-accent hover:underline">Discuss your cleaning needs<ArrowRight className="h-4 w-4" /></Link>
          </aside>
        </div>
        <section className="mt-16 border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-bold text-primary">{service.heading} checklist</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">Use this checklist to plan your booking. Tell us which areas or items you need cleaned; your quote will confirm the agreed scope and any extras.</p>
          <div className="mt-8 columns-1 gap-10 md:columns-2 lg:columns-3">
            {service.checklist.map((category) => (
              <div key={category.category} className="mb-8 break-inside-avoid">
                <h3 className="text-lg font-semibold text-primary">{category.category}</h3>
                <ul className="mt-4 space-y-3">{category.items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /><span>{item}</span></li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-10 border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-bold text-primary">Questions about {service.heading.toLowerCase()}</h2>
          <div className="mt-6 max-w-3xl divide-y divide-slate-200">{service.questions.map((question) => (
            <details key={question.q} className="py-5"><summary className="cursor-pointer text-lg font-semibold text-primary">{question.q}</summary><p className="mt-3 leading-relaxed text-muted">{question.a}</p></details>
          ))}</div>
        </section>
        <section className="mt-12 border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-bold text-primary">Explore our other services</h2>
          <ul className="mt-6 flex flex-wrap gap-3">{SERVICE_PAGES.filter((other) => other.slug !== service.slug).map((other) => <li key={other.slug}><Link href={`/services/${other.slug}`} className="inline-block rounded-full border border-primary/20 px-5 py-3 text-sm font-medium text-primary hover:bg-bg-soft">{other.heading}</Link></li>)}</ul>
        </section>
      </div>
      <section className="bg-primary px-4 py-14 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-white">Ready to plan your clean?</h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">Tell us about your property, priorities and preferred date. We will confirm the scope and provide a quote for the work you need.</p>
        <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 font-semibold text-primary hover:bg-lime-dark">Get a Free Quote<ArrowRight className="h-4 w-4" /></Link>
      </section>
    </>
  );
}
