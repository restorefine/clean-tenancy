import Link from "next/link";
import { Scale, CreditCard, Wrench, RotateCcw, AlertTriangle, Star, FileText } from "lucide-react";
import TermsToc from "./TermsToc";
import TermsCTA from "./TermsCTA";

const sections = [
  {
    id: "general",
    number: "1",
    title: "General Terms",
    icon: FileText,
    subsections: [
      {
        id: "use-of-website",
        number: "1.1",
        title: "Use of Website",
        items: [
        "Use of our website is subject to these terms.",
        "You may not misuse our website or use it for fraudulent purposes.",
        ],
      },
      {
        id: "service-coverage",
        number: "1.2",
        title: "Service Coverage",
        items: [
        "Our services are available across most of the UK.",
        "Availability may vary by location.",
        ],
      },
      {
        id: "booking-quotations",
        number: "1.3",
        title: "Booking and Quotations",
        items: [
        "Bookings can be made via phone, email, live chat, or online.",
        "All quotations are based on standard completion times.",
        "Final pricing may be adjusted if the scope of work changes.",
        ],
      },
      {
        id: "force-majeure",
        number: "1.4",
        title: "Force Majeure",
        items: [
        "We are not liable for any failure or delay in performance due to events outside our reasonable control. This includes, but is not limited to, extreme weather, natural disasters, road closures, strikes, illness, pandemics, or accidents.",
        "In such cases, the service may be postponed or rescheduled at the earliest convenient time without liability.",
        ],
      },
      {
        id: "customer-conduct",
        number: "1.5",
        title: "Customer Conduct and Safety",
        items: [
        "We reserve the right to cancel or terminate a booking immediately if any operative feels unsafe or is subjected to harassment, aggressive behavior, or inappropriate conduct by the customer or any person on-site.",
        "In such instances, the service will be deemed forfeited and no refunds will be issued. The customer may also be restricted from making future bookings.",
        ],
      },
      {
        id: "pets-policy",
        number: "1.6",
        title: "Pets Policy",
        items: [
        "Customers must ensure all pets are secured during the service to avoid interference or accidents.",
        "The Company is not liable for any incidents, damages, or additional cleaning required due to pet behavior during or after the service.",
        ],
      },
      {
        id: "access-lockout",
        number: "1.7",
        title: "Access and Lockout Policy",
        items: [
        "It is the customer's responsibility to provide access to the property at the scheduled time.",
        "If our team is unable to access the property within 30 minutes of the scheduled arrival time, the job may be cancelled and a fee of up to 50% of the booking value may apply.",
        "Waiting time beyond the agreed arrival time may be charged at a rate of £15 per 15-minute interval.",
        ],
      },
      {
        id: "data-protection",
        number: "1.8",
        title: "Data Protection",
        items: [
        "We are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR) and relevant UK data protection laws.",
        "Any personal data collected during bookings or communications is used solely for service delivery, administration, and customer support.",
        "We do not share customer information with third parties unless legally required or with your explicit consent.",
        "You have the right to request access to, correction of, or deletion of your data at any time.",
        ],
      },
    ],
  },
  {
    id: "pricing",
    number: "2",
    title: "Pricing and Payments",
    icon: CreditCard,
    subsections: [
      {
        id: "pricing-detail",
        number: "2.1",
        title: "Pricing",
        items: [
        "Prices are based on average property sizes and conditions unless it was mentioned in the booking.",
        "Additional charges may apply for extended services or larger-than-average properties.",
        ],
      },
      {
        id: "additional-charges",
        number: "2.2",
        title: "Additional Charges",
        items: [
        "Parking, congestion charges, and tolls are the responsibility of the customer.",
        "Delicate item handling or specialist equipment may incur extra fees.",
        ],
      },
      {
        id: "payment-terms",
        number: "2.3",
        title: "Payment Terms",
        items: [
        "Full payment is due upon arrival of team to the property, prior to the start of the service, unless otherwise agreed.",
        "We reserve the right to cancel bookings if payment is not received or confirmed in advance.",
        ],
      },
    ],
  },
  {
    id: "service-terms",
    number: "3",
    title: "Service Terms",
    icon: Wrench,
    subsections: [
      {
        id: "service-performance",
        number: "3.1",
        title: "Service Performance",
        items: [
        "We strive to deliver services with reasonable care and skill, and to attend as scheduled, though arrival times are approximate.",
        "Service delays due to external factors do not warrant refunds.",
        ],
      },
      {
        id: "customer-responsibilities",
        number: "3.2",
        title: "Customer Responsibilities",
        items: [
        "Customers must provide access, electricity, and hot water.",
        "All personal belongings must be removed from the property before service for end of tenancy cleaning services; one off deep cleaning is excluded. The customer however agrees to empty cupboards and drawers prior to the service for these items to be cleaned internally.",
        "Properties must be free of occupants during end of tenancy cleaning.",
        ],
      },
      {
        id: "service-limitations",
        number: "3.3",
        title: "Service Limitations",
        items: [
        "We do not guarantee stain removal, mould treatment, or restoration of pre-existing damage.",
        "Services such as cleaning appliances, blinds, curtains, furniture, wall washing, and deep mould removal must be requested as separate items.",
        ],
      },
      {
        id: "after-builders",
        number: "3.4",
        title: "After Builders Cleaning",
        items: [
        "Customers must ensure that all major building work has been completed and the property is safe and accessible before our team arrives.",
        "The property must be free from any construction personnel, tools, or ongoing renovation work.",
        "Heavy waste removal is not included unless arranged in advance.",
        "Paint, plaster, cement, or adhesive splashes will be treated with care, but we cannot guarantee full removal if surfaces are sensitive or if the material has set deeply, unless ordered as a separate service.",
        "Specialist materials or delicate finishes must be declared during booking to allow for appropriate cleaning methods.",
        "Wall cleaning is ordered as a separate service.",
        "Customers must allow sufficient ventilation and ensure utilities are functional on the day of cleaning.",
        "For re-cleans to be considered, the property must remain unused and unaltered after the initial visit. Any further renovations or construction work will void the re-clean guarantee.",
        ],
      },
      {
        id: "carpet-upholstery",
        number: "3.5",
        title: "Carpet and Upholstery Cleaning",
        items: [
        "The Company shall not be liable for the shrinkage of carpets due to poor fitting.",
        "The Company is not liable for wear or discoloration of fabric that becomes more visible after dirt is removed.",
        "We are not responsible for damage caused by placing furniture on damp carpets.",
        "The Company cannot guarantee removal of pre-existing stains or discoloration.",
        "Customers must notify us at booking if carpets are of natural pile (e.g. wool or hessian).",
        "Customers are responsible for removing all furniture, goods, and breakables prior to cleaning. We are not liable for damage unless due to our negligence or lack of reasonable care.",
        "Unless agreed beforehand, stationary items (e.g. TVs, bookcases) will not be moved, and cleaning beneath or behind them will not be performed. The same applies to closets and cupboards.",
        "We aim to identify and treat all visible stains, but full removal is not guaranteed due to the nature of some substances (e.g. tannin, rust, DIY spotting agents).",
        "We cannot accept liability for colour run or dye migration due to manufacturer defects or non-colourfast materials.",
        "Carpets and upholstery are cleaned using powerful equipment. However, complete drying or odor elimination is not guaranteed. Adequate ventilation and heating for at least 24 hours post-cleaning are recommended, especially in colder or damp conditions.",
        "Pet treatment of carpets should be requested as pet treatment is not included in normal deep carpet cleaning.",
        ],
      },
      {
        id: "photos-qa",
        number: "3.6",
        title: "Photos for Quality Assurance",
        items: [
        "Our operatives may take time-stamped photos of work areas before and after service for quality assurance and dispute resolution purposes.",
        "These photos are stored securely and used only for internal review or where necessary to resolve a customer query or complaint.",
        ],
      },
    ],
  },
  {
    id: "cancellations",
    number: "4",
    title: "Cancellations and Refunds",
    icon: RotateCcw,
    subsections: [
      {
        id: "cancellation-policy",
        number: "4.1",
        title: "Cancellation Policy",
        items: [
        "Cancellations made more than 24 hours in advance incur no charges.",
        "Cancellations within 24 hours of the scheduled time will incur a fee equal to 30% of the booking total.",
        ],
      },
      {
        id: "rescheduling",
        number: "4.2",
        title: "Rescheduling",
        items: [
        "Bookings can be rescheduled free of charge if requested at least 24 hours in advance.",
        ],
      },
      {
        id: "refunds",
        number: "4.3",
        title: "Refunds",
        items: [
        "The customer agrees that the first remedy for any complaint is a free re-clean, which must be accepted if offered. If the customer refuses a re-clean for any reason, they agree to waive the right to any full or partial refund and instead become eligible for a maximum refund of 10% of the total booking value.",
        "A full refund will only be granted under the following circumstances: the service was cancelled by Clean Tenancy; the cleaning team failed to attend; the team attended but did not complete at least 75% of the agreed service (as listed on the invoice), supported by clear visual evidence. In all other cases, full refunds will not be offered.",
        "A partial refund will only be considered after a re-clean has been arranged and completed, and the customer remains dissatisfied with specific areas. The customer must provide visual evidence clearly demonstrating unresolved issues within the service scope. Any partial refund issued will be proportionate to the value of the missed areas as itemised on the original invoice.",
        "Re-cleans and refunds are subject to the following conditions: the complaint is raised in writing within 7 days of the original service for end of tenancy and 3 days for deep cleaning and after builders cleaning services; the property has not been re-occupied, altered, or cleaned by another provider prior to re-clean; the original booking has been paid in full and the service terms were adhered to by the customer (e.g. access provided, no disruption, utilities available).",
        "The company reserves the right to investigate all claims and will make a decision based on visual evidence, service logs, and technician feedback.",
        "Refunds, if approved, will be calculated based on the portion of work not completed to standard, not on the total booking value, unless stated otherwise above.",
        ],
      },
    ],
  },
  {
    id: "damage-liability",
    number: "5",
    title: "Damage and Liability",
    icon: AlertTriangle,
    subsections: [
      {
        id: "insurance",
        number: "5.1",
        title: "Insurance",
        items: ["We hold public liability insurance up to £1,000,000."],
      },
      {
        id: "damage-claims",
        number: "5.2",
        title: "Damage Claims",
        items: [
        "Damage must be reported within 48 hours of service.",
        "Claims made after this period may be denied.",
        "For valid claims, we may offer repair or compensation based on the item's current value.",
        ],
      },
      {
        id: "exclusions",
        number: "5.3",
        title: "Exclusions",
        items: [
        "We are not liable for damages caused by faulty equipment or materials supplied by the customer.",
        "We are not responsible for pre-existing damage, sentimental or irreplaceable items.",
        ],
      },
    ],
  },
  {
    id: "guarantee",
    number: "6",
    title: "Guarantee and Complaints",
    icon: Star,
    subsections: [
      {
        id: "satisfaction-guarantee",
        number: "6.1",
        title: "Satisfaction Guarantee",
        items: [
        "We offer a 7-day satisfaction guarantee on our end of tenancy cleaning services, and 3 days on our one-off deep cleaning and after builders cleaning services.",
        "Re-cleans are available once per booking, upon inspection and approval.",
        ],
      },
      {
        id: "complaint-procedure",
        number: "6.2",
        title: "Complaint Procedure",
        items: [
        "All complaints must be submitted in writing within 7 days of the end of tenancy cleaning service date and 3 days for deep cleaning and after builders cleaning services.",
        "Complaints must include photographic evidence and a clear written description of the issue.",
        "We do not handle complaints via phone or live chat.",
        "Once received, complaints will be reviewed by our customer service team, and a response will be issued within a reasonable timeframe.",
        ],
      },
    ],
  },
  {
    id: "final-notes",
    number: "7",
    title: "Final Notes",
    icon: Scale,
    subsections: [
      {
        id: "general-notes",
        number: "7",
        title: "Final Notes",
        items: [
        "Terms are subject to change without notice.",
        "The latest version will always be available on our website.",
        "Continued use of our services constitutes acceptance of any changes made.",
        "For questions regarding these Terms and Conditions, please contact us via the details on our website.",
        ],
      },
    ],
  },
];

// Shape passed to the client ToC (no icon, just id/number/title)
const tocItems = sections.map(({ id, number, title }) => ({ id, number, title }));

export default function TermsPage() {
  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* ── Hero Banner ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D3B66 0%, #1A548E 50%, #2563EB 100%)",
          padding: "72px 24px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-40px", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 16px", marginBottom: "20px" }}>
            <Scale style={{ width: "14px", height: "14px", color: "#93C5FD" }} />
            <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", color: "#93C5FD", textTransform: "uppercase" }}>Legal</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#ffffff", margin: "0 0 14px", lineHeight: 1.15 }}>
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.75)", maxWidth: "580px", lineHeight: 1.7, margin: "0 0 20px" }}>
            Please read these terms carefully before using our services. By booking with Clean Tenancy you agree to be bound by the following terms and conditions.
          </p>
          <p style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Effective date: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>9 August 2026</span>
          </p>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          gap: "40px",
          alignItems: "start",
        }}
        className="terms-layout"
      >
        {/* ── Left: Sticky ToC ── */}
        <aside
          style={{
            position: "sticky",
            top: "88px",
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "16px",
            padding: "24px 20px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <TermsToc sections={tocItems} />
        </aside>

        {/* ── Right: Sections ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", minWidth: 0 }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                id={section.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  scrollMarginTop: "100px",
                }}
              >
                {/* Section header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "22px 28px",
                    background: "linear-gradient(to right, #EFF6FF, #F8FAFC)",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "#2563EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ width: "17px", height: "17px", color: "#ffffff" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", color: "#2563EB", textTransform: "uppercase", margin: "0 0 2px" }}>
                      Section {section.number}
                    </p>
                    <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#0D3B66", margin: 0 }}>
                      {section.title}
                    </h2>
                  </div>
                </div>

                {/* Subsections */}
                <div style={{ padding: "4px 0" }}>
                  {section.subsections.map((sub, subIdx) => (
                    <div
                      key={sub.id}
                      id={sub.id}
                      style={{
                        padding: "22px 28px",
                        borderTop: subIdx > 0 ? "1px solid #f1f5f9" : undefined,
                        scrollMarginTop: "100px",
                      }}
                    >
                      {sub.number !== section.number && (
                        <h3
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 700,
                            color: "#1e293b",
                            margin: "0 0 12px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              padding: "2px 8px",
                              background: "#EFF6FF",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              color: "#2563EB",
                            }}
                          >
                            {sub.number}
                          </span>
                          {sub.title}
                        </h3>
                      )}

                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                        {sub.items.map((item, i) => (
                          <li
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              fontSize: "0.9375rem",
                              color: "#475569",
                              lineHeight: 1.7,
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#2563EB",
                                flexShrink: 0,
                                marginTop: "10px",
                              }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {/* ── Footer CTA ── */}
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              padding: "48px 52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              flexWrap: "wrap",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            {/* Dot-grid decoration, same as AboutSection */}
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                right: "-8px",
                width: "140px",
                height: "140px",
                pointerEvents: "none",
                opacity: 0.18,
                backgroundImage: "radial-gradient(#0D3B66 1.2px, transparent 1.2px)",
                backgroundSize: "10px 10px",
              }}
            />
            {/* Accent glow top-left */}
            <div style={{ position: "absolute", top: "-30px", left: "60px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(37,99,235,0.07)", filter: "blur(40px)", pointerEvents: "none" }} />

            {/* Left: text */}
            <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
              {/* Eyebrow, matches site pattern exactly */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
                <span style={{ width: "32px", height: "3px", borderRadius: "9999px", background: "#2563EB", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.16em", color: "#2563EB", textTransform: "uppercase" }}>
                  Need Help?
                </span>
              </div>
              <h3 style={{ fontSize: "clamp(1.375rem, 3vw, 1.75rem)", fontWeight: 800, color: "#0D3B66", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                Questions About Our Terms?
              </h3>
              <p style={{ fontSize: "0.9375rem", color: "#64748b", margin: 0, lineHeight: 1.7 }}>
                If you have any questions or concerns about these Terms &amp; Conditions, our team is here to help. Reach out and we&apos;ll get back to you promptly.
              </p>
            </div>

            <TermsCTA />
          </div>
        </div>
      </div>

      {/* Responsive: collapse to single column on mobile */}
      <style>{`
        @media (max-width: 768px) {
          .terms-layout {
            grid-template-columns: 1fr !important;
          }
          .terms-layout > aside {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
