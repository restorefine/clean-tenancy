import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";
import { SITE } from "@/lib/site";
import { BASE_URL, OG_IMAGE, SITE_DESCRIPTION, siteGraph } from "@/lib/seo";
import { SERVICES } from "@/app/data";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const GOOGLE_ANALYTICS_ID = SITE.googleAnalyticsId;
const GOOGLE_ADS_ID = SITE.googleAdsId;

const TITLE = "Clean Tenancy | End of Tenancy & Deep Cleaning in Glasgow";

export const viewport: Viewport = {
  themeColor: "#003459",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: TITLE,
    template: "%s | Clean Tenancy",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "end of tenancy cleaning Glasgow",
    "end of tenancy cleaning Edinburgh",
    "move out cleaning Scotland",
    "deposit back cleaning",
    "deep cleaning Glasgow",
    "after builders cleaning Glasgow",
    "carpet cleaning Glasgow",
    "oven cleaning Glasgow",
    "cleaning company Stirling",
    "cleaning services Falkirk",
    "landlord cleaning services",
    "letting agent cleaners",
  ],
  authors: [{ name: SITE.name, url: BASE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Home services",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: false },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: SITE.name,
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Clean Tenancy: end of tenancy cleaning that gets your deposit back" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "GB-SCT",
    "geo.placename": "Glasgow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <head>
        <JsonLd data={siteGraph(SERVICES)} />
      </head>
      <body>
        <Navbar />
        <main className="layout-content pb-16 lg:pb-0">{children}</main>
        <Footer />
        <StickyContactBar />
      </body>
      {(GOOGLE_ADS_ID || GOOGLE_ANALYTICS_ID) && (
        <>
          <Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID || GOOGLE_ANALYTICS_ID}`} />
          <Script
            id="google-tag-init"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                ${GOOGLE_ANALYTICS_ID ? `gtag('config', '${GOOGLE_ANALYTICS_ID}');` : ""}
                ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
              `,
            }}
          />
        </>
      )}
    </html>
  );
}
