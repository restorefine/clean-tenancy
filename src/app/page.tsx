import { Suspense } from "react";
import ServicesSection from "@/components/ServicesSection";
import Hero from "@/components/Hero";
import HeroFeatures from "@/components/HeroFeatures";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import GallerySection from "@/components/GallerySectionDynamic";
import CoverageSection from "@/components/CoverageSectionDynamic";
import HomepageCTAs from "@/components/HomepageCTAs";
import JsonLd from "@/components/JsonLd";
import { faqPage } from "@/lib/seo";
import { FAQS } from "@/app/data";

export default function Home() {
  return (
    <>
      <JsonLd data={faqPage(FAQS)} />

      {/* ── Hero ── */}
      <Hero />
      <HeroFeatures />

      {/* ── Services ── */}
      <div id="services" className="scroll-mt-16">
        <Suspense>
          <ServicesSection />
        </Suspense>
      </div>

      {/* ── About ── */}
      <section id="about" className="scroll-mt-16">
        <AboutSection />
      </section>

      {/* ── Coverage ── */}
      <section id="coverage" className="scroll-mt-16">
        <CoverageSection />
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="scroll-mt-16">
        <HowItWorks />
      </section>

      {/* ── Gallery ── */}
      <section id="gallery" className="scroll-mt-16">
        <GallerySection />
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="scroll-mt-16">
        <Testimonials />
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="scroll-mt-16">
        <FAQSection />
      </section>

      <HomepageCTAs />
    </>
  );
}
