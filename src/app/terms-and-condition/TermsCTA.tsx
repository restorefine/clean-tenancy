"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

/** "Get a Free Quote" CTA on the Terms & Conditions page, client wrapper for onClick tracking. */
export default function TermsCTA() {
  return (
    <div style={{ position: "relative", zIndex: 1, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <Link
        href="/contact"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "12px",
          background: "#2563EB",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "0.9375rem",
          borderRadius: "9999px",
          padding: "14px 28px",
          textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 8px 24px rgba(37,99,235,0.30)",
          letterSpacing: "-0.01em",
          transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
        }}
        onClick={() => trackEvent("quote_click", { link_location: "terms_page", label: "Get a Free Quote" })}
      >
        Get a Free Quote
        <span style={{ width: "24px", height: "24px", borderRadius: "9999px", background: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: "12px", height: "12px" }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </Link>
      <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: 0 }}>
        Usually reply within 24 hours
      </p>
    </div>
  );
}
