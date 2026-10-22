import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, contactPage, OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Get a Free Cleaning Quote",
  description:
    "Get a free, fixed cleaning quote from Clean Tenancy. End of tenancy, deep, after builders and carpet cleaning across Glasgow, Edinburgh, Stirling and Falkirk.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Get a Free Cleaning Quote | Clean Tenancy Glasgow",
    description:
      "Answer a few quick questions about your property and get a fixed quote. Deposit-back guarantee on every tenancy clean.",
    url: "/contact",
    images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[contactPage(), breadcrumbs([{ name: "Get a Free Quote", path: "/contact" }])]} />
      {children}
    </>
  );
}
