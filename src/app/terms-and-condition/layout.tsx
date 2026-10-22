import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the full Terms and Conditions for Clean Tenancy's services including booking policies, cancellations, refunds, damage liability, and satisfaction guarantee for cleaning services across Glasgow, Edinburgh, Stirling and Falkirk.",
  alternates: {
    canonical: "/terms-and-condition",
  },
  openGraph: {
    title: "Terms & Conditions | Clean Tenancy Glasgow",
    description:
      "Full Terms and Conditions for Clean Tenancy. Covering service terms, pricing, cancellations, refunds and liability for professional cleaning services in Glasgow & Central Scotland.",
    url: "/terms-and-condition",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Terms & Conditions", path: "/terms-and-condition" }])} />
      {children}
    </>
  );
}
