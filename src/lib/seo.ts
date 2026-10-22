// ─────────────────────────────────────────────────────────────
// Structured data (JSON-LD) builders.
// Every page pulls from these so business details stay in one place (SITE).
// ─────────────────────────────────────────────────────────────

import { SITE } from "@/lib/site";

export const BASE_URL = SITE.url;
export const OG_IMAGE = "/og-image.jpg";
export const SITE_DESCRIPTION =
  "End of tenancy, deep, after builders, carpet and oven cleaning across Glasgow, Edinburgh, Stirling and Falkirk. Fully insured cleaners with a deposit-back guarantee.";

const abs = (path: string) => (path.startsWith("http") ? path : `${BASE_URL}${path}`);

const ORG_ID = `${BASE_URL}/#organization`;
const BUSINESS_ID = `${BASE_URL}/#business`;
const WEBSITE_ID = `${BASE_URL}/#website`;

export const SERVICE_AREAS = ["Glasgow", "Edinburgh", "Stirling", "Falkirk", "Paisley", "Livingston", "Hamilton", "East Kilbride"];

/* ── Site-wide graph: organisation, local business, website, main navigation ── */
export function siteGraph(services: { title: string; desc: string }[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE.name,
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: abs("/brand/logo-color.svg") },
        email: SITE.email,
        telephone: SITE.phoneHref.replace("tel:", ""),
      },
      {
        "@type": ["LocalBusiness", "HouseCleaningService"],
        "@id": BUSINESS_ID,
        name: SITE.name,
        description: SITE_DESCRIPTION,
        url: BASE_URL,
        image: abs(OG_IMAGE),
        logo: abs("/brand/logo-color.svg"),
        telephone: SITE.phoneHref.replace("tel:", ""),
        email: SITE.email,
        priceRange: "££",
        parentOrganization: { "@id": ORG_ID },
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.addressLine1,
          addressRegion: "Scotland",
          addressCountry: "GB",
        },
        areaServed: SERVICE_AREAS.map((name) => ({ "@type": "City", name })),
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00" },
          { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Cleaning services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.desc, areaServed: "Central Scotland" },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE.name,
        url: BASE_URL,
        inLanguage: "en-GB",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "ItemList",
        "@id": `${BASE_URL}/#navigation`,
        name: "Main navigation",
        itemListElement: [
          { name: "Home", url: "/" },
          { name: "Get a Free Quote", url: "/contact" },
          { name: "Cleaning Guides", url: "/blog" },
          { name: "Terms & Conditions", url: "/terms-and-condition" },
        ].map((item, i) => ({ "@type": "SiteNavigationElement", position: i + 1, name: item.name, url: abs(item.url) })),
      },
    ],
  };
}

/* ── Breadcrumbs for inner pages ── */
export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

/* ── FAQ rich results ── */
export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/* ── Blog listing ── */
export function blogIndex(posts: { slug: string; title: string; excerpt: string; image: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} Cleaning Guides`,
    url: abs("/blog"),
    publisher: { "@id": ORG_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      url: abs(`/blog/${p.slug}`),
      image: abs(p.image),
    })),
  };
}

/* ── Single article ── */
export function blogPosting(post: { slug: string; title: string; metaDescription: string; image: string; category: string; published: string; readTime: number }) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [abs(post.image)],
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    datePublished: post.published,
    dateModified: post.published,
    timeRequired: `PT${post.readTime}M`,
    inLanguage: "en-GB",
    author: { "@type": "Organization", "@id": ORG_ID, name: SITE.name, url: BASE_URL },
    publisher: { "@type": "Organization", "@id": ORG_ID, name: SITE.name, logo: { "@type": "ImageObject", url: abs("/brand/logo-color.svg") } },
  };
}

/* ── Contact page ── */
export function contactPage() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${SITE.name}`,
    url: abs("/contact"),
    about: { "@id": BUSINESS_ID },
  };
}
