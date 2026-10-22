"use client";

import { useEffect, useState } from "react";

interface TocSection {
  id: string;
  number: string;
  title: string;
}

export default function TermsToc({ sections }: { sections: TocSection[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const allIds = sections.map((s) => s.id);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Table of contents" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <p
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "#94a3b8",
          textTransform: "uppercase",
          margin: "0 0 16px",
        }}
      >
        Contents
      </p>

      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 12px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? "#2563EB" : "#64748b",
              background: isActive ? "#EFF6FF" : "transparent",
              borderLeft: isActive ? "3px solid #2563EB" : "3px solid transparent",
              transition: "all 0.2s ease",
            }}
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById(s.id);
              if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                setActiveId(s.id);
              }
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                flexShrink: 0,
                fontSize: "0.6875rem",
                fontWeight: 700,
                background: isActive ? "#2563EB" : "#f1f5f9",
                color: isActive ? "#ffffff" : "#64748b",
                transition: "all 0.2s ease",
              }}
            >
              {s.number}
            </span>
            <span style={{ lineHeight: 1.3 }}>{s.title}</span>
          </a>
        );
      })}
    </nav>
  );
}
