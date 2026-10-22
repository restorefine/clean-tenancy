import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Clean Tenancy",
    short_name: "Clean Tenancy",
    description: "End of tenancy and deep cleaning across Glasgow, Edinburgh, Stirling and Falkirk.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#003459",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
