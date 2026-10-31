import { SITE } from "@/lib/site";

// ─────────────────────────────────────────────────────────────
// Home Page Data
// All text content for home page components lives here.
// SVG icons are defined inside each component and merged at render time.
// ─────────────────────────────────────────────────────────────

// ── Hero ──────────────────────────────────────────────────────
export const HERO_CONTENT = {
  headline: "End of tenancy cleaning that gets your",
  headlineAccent: "deposit back",
  subtitle: "Fully insured cleaners across Glasgow, Edinburgh, Stirling and Falkirk, with a deposit-back guarantee on every tenancy clean.",
  ctaPrimary: { label: "Get a Free Quote", href: "/contact" },
  ctaWhatsapp: { label: "WhatsApp Us", href: SITE.whatsappHref },
  ctaPhone: { label: SITE.phoneDisplay, href: SITE.phoneHref },
};

export const HERO_FEATURES = [
  { title: "Deposit-back guarantee", desc: "Anything your agent flags, we come back and fix free." },
  { title: "Supplies included", desc: "Professional equipment and products on every job." },
  { title: "Same-day slots", desc: "Urgent move-out? Same-day bookings, subject to availability." },
  { title: "Vetted, insured team", desc: "DBS-checked cleaners, fully insured on every visit." },
];

// ── Services Section ──────────────────────────────────────────
export const SERVICES_HEADER = {
  headline: "Cleaning for every stage of a tenancy",
  subtitle: "Pick a service to see exactly what our team covers, room by room.",
  cta: { label: "Get a Free Quote", href: "/contact" },
};

export const SERVICES: { slug: string; title: string; desc: string; image: string; includes: string[]; checklist: { category: string; items: string[] }[] }[] = [
  {
    slug: "end-of-tenancy-cleaning",
    title: "End of Tenancy Cleaning",
    desc: "Certified deep cleaning for moving in or out, securing full deposits and meeting agent-approved standards.",
    image: "/services/tenancy.png",
    includes: ["Full kitchen & oven clean", "Bathroom limescale removal", "Inside all cupboards", "Carpets & skirting boards"],
    checklist: [
      {
        category: "Bedrooms",
        items: [
          "Remove cobwebs from ceilings and corners",
          "Dust reachable surfaces including wardrobes, shelving and cupboards",
          "Wipe accumulated dust and dirt from top of doors",
          "Wipe accumulated dust from top of picture frames",
          "Wipe and polish mirrors, pictures and other wall hangings",
          "Wipe dust from skirting boards and decorations",
          "Dust all light fittings and lampshades",
          "Clean and polish metal ornaments",
          "Wipe and polish switches",
          "Carefully clean power sockets and extension cords",
          "Mop hard floors and laminate",
        ],
      },
      {
        category: "Bathrooms",
        items: [
          "Clean basins, taps and fittings",
          "Remove hard water stains",
          "Remove limescale if present",
          "Scrub and rinse soap dispensers",
          "Wipe and polish radiators and towel rails",
          "Scrub and rinse toilet and bidet",
          "Clean plumbing behind toilet if reachable",
          "Wipe marks and stains from shower screens",
          "Scrub and rinse bath marks and signs of mildew",
          "Clean drains thoroughly",
          "Wipe and polish mirrors and glass surfaces",
          "Descale, rinse and wipe showerheads, taps and metal surfaces",
          "Scrub and rinse accumulated dirt from the toothbrush area",
          "Clean extractor fans",
          "Wipe reachable bathroom tiles",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Wash and polish all worktops, countertops and the sink area",
          "Clean inside cupboards, drawers and shelving",
          "Wash and polish sinks and shine taps",
          "Remove accumulated limescale",
          "De-grease and polish wall tiles",
          "Remove mould growth between grout",
          "Clean and de-grease ovens internally and externally",
          "Clean grime from extractors and hobs",
          "Scrub gas rings and gas control knobs",
          "Clean microwaves inside and out",
          "Clean out the fridge and freezer",
          "Clean the washing machine inside and out",
          "Clean the dishwasher inside and out",
          "Clean exterior of all appliances",
          "Clean outside of cupboards and drawers",
          "Clean inside of windows and wipe down sills, ledges and frames",
          "Wipe dirt from woodwork, doors, handles, frames and skirting boards",
          "Wipe down radiators if applicable and accessible",
          "Remove dust from plugs and light switches",
          "Vacuum, mop and polish floors",
        ],
      },
      {
        category: "Living Room",
        items: [
          "Remove cobwebs",
          "Clean and polish mirrors and picture frames",
          "Clean and polish windows internally, sills and ledges",
          "Wipe down doors and clean on top of doors",
          "Clean skirting boards and woodwork of dust",
          "Clean light switches, fittings, lamp shades, plugs and sockets",
          "Clean inside, behind and on top of cupboards",
          "Clean behind and under furniture",
          "Dust and polish all surfaces",
          "Vacuum and mop hard floors",
        ],
      },
      { category: "Furnishings", items: ["Wipe and polish tables, countertops and other worktop surfaces", "Remove fingerprints and marks", "Look out for oil stains", "Move furnishings to vacuum underneath", "Wipe and polish all wooden units"] },
      { category: "Carpets", items: ["Thoroughly vacuum all carpet edges", "Move furniture and vacuum underneath", "Steam clean where possible", "Spot-treat stains if machine is unavailable"] },
      { category: "Windows", items: ["Remove marks, fingerprints and oily stains", "Wipe down to prevent streaks when drying", "Dust and clean windowsills", "Wipe down frames", "Dust blinds, curtains and shades"] },
      { category: "Cupboards & Drawers", items: ["Clear drawers inside and out", "Remove any unnecessary items or leftover goods", "Wipe down the inside and out", "Wipe around handles"] },
      {
        category: "Appliances",
        items: [
          "Dishwasher: clean food and soap deposits, remove mildew, inspect and clean filters, wipe rubber seal, clean underneath and behind, wipe dispenser drawer and handles",
          "Washing Machine: clean drum, inspect rubber seal, move and clean underneath and behind, wipe dispenser drawer and handles",
          "Tumble Dryer: clean inside and out, inspect rubber seal, clean dispenser drawer, inspect and clean filter",
          "Oven and Microwave: de-grease oven, extractor, hob and grill, clean microwave inside and out, clean grill pan and racks, wipe rubber seals, wipe buttons and exterior",
          "Toaster: clean and polish exterior, remove crumbs and deposits, degrease handles",
        ],
      },
      { category: "Smaller Details", items: ["Clean and dry all kitchen tiles", "Remove leftover rubbish", "Rinse out rubbish bins", "De-grease fans and extractors", "Tick every item to secure your full deposit"] },
    ],
  },
  {
    slug: "deep-spring-cleaning",
    title: "Deep & Spring Cleaning",
    desc: "A full, detailed property refresh to brighten your home, clear clutter and remove built-up dust from neglected spaces.",
    image: "/services/deep.png",
    includes: ["Top-to-bottom deep clean", "All surfaces & fixtures", "Windows & blinds", "Floors mopped & vacuumed"],
    checklist: [
      {
        category: "Entrance & Hallways",
        items: [
          "Remove cobwebs from ceilings, corners and light fittings",
          "Detail dusting of skirting boards, door frames, architraves and banisters",
          "Wipe doors, handles, letterbox, light switches and sockets",
          "Clean internal glass panels and hallway mirrors to a streak-free finish",
          "Vacuum edges and behind and under furniture, mop hard floors",
          "Wipe radiator fronts and accessible behind-areas, clean vents and grilles",
        ],
      },
      {
        category: "Bedrooms",
        items: [
          "Ceilings and corners de-webbed with light fixtures dusted",
          "Detail dusting of headboards, bedside tables, shelving and picture frames",
          "Clean mirrors and glass, wipe switches, sockets, door and wardrobe handles",
          "Vacuum mattress surface (on request) and under the bed where accessible",
          "Skirting boards wiped with radiators, vents and grilles cleaned",
          "Vacuum carpets including edges, mop hard floors",
          "Inside wardrobes and drawers on request if emptied beforehand",
        ],
      },
      {
        category: "Bathrooms & Toilets",
        items: [
          "Descale taps, shower heads and screens, scrub grout and silicone edges",
          "Sanitise toilets including under rim, hinges, base and plumbing if reachable",
          "Clean basins, bathtubs and trays, remove soap scum and water marks",
          "Polish chrome and metal, mirrors to a streak-free finish, wipe cabinets and unit exteriors",
          "Wipe tiles, radiators, towel rails and extractor cover",
          "Vacuum and mop floors with detail around edges and behind fixtures",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Degrease hob, splashback, extractor fascia and filter cover",
          "Clean worktops, sink and taps (descale), tiles and kickboards",
          "Exterior wipe of cupboards and units with handles, edges and plinths detailed",
          "Exterior wipe of fridge, freezer, dishwasher, washing machine and appliances",
          "Inside empty cupboards and drawers on request",
          "Pull out and clean behind and under movable appliances where safe",
          "Vacuum and mop floors with detail at edges and under units",
        ],
      },
      {
        category: "Living Areas",
        items: [
          "Dust media units, shelves and bookcases, wipe remotes and switches",
          "Polish glass tables and internal glass, clean mirrors",
          "Lift light furniture to vacuum edges and underneath where safe",
          "Detail clean skirting boards, door frames and window ledges",
          "Vacuum upholstery surfaces and soft furnishings",
          "Vacuum carpets thoroughly and mop hard floors",
        ],
      },
      { category: "Windows & Glass", items: ["Clean internal window panes, frames and handles", "Wipe tracks and rails (reachable), dust blinds and wipe shutters at surface level", "Polish mirrors and interior glass partitions and balustrades"] },
      { category: "Doors & Woodwork", items: ["Wipe doors on both sides, tops of doors and frames", "Detail clean around handles, fingerplates and light switches", "Skirting boards, window boards and trims wiped dust-free", "Radiators, vents and accessible behind-areas cleaned"] },
      {
        category: "Utility & Storage",
        items: ["Wipe appliance exteriors (washing machine, dryer), counters, sinks and taps", "Clean cupboard fronts, inside if emptied on request", "Vacuum and mop floors with detail around plinths and edges", "Wipe accessible traps, drain covers and ventilation grills"],
      },
      {
        category: "Stairs & Landings",
        items: ["Dust and clean bannisters, spindles and stringers, wipe skirtings", "Vacuum stair treads and risers carefully including edges and nosings", "Landings: dust tops of doors, frames and radiators", "Balcony (if safe and accessible): sweep, mop, wipe rails and ledges"],
      },
      { category: "High-Touch & Hygiene", items: ["Sanitise door handles, light switches, handrails and remote controls", "Wipe thermostat, keypads and commonly touched surfaces", "Freshen bins: empty, wipe and deodorise, replace liners"] },
      { category: "Final Quality Check", items: ["Room airing where possible, odour neutraliser on request", "Edge inspection: skirtings, corners, under furniture and fixtures", "Glass and mirror re-polish if needed for a streak-free finish", "Final vacuum and mop pass with team leader sign-off"] },
    ],
  },
  {
    slug: "after-builders-cleaning",
    title: "After Builders",
    desc: "Removes renovation dust, plaster, paint marks and debris, leaving your home spotless.",
    image: "/services/builders.png",
    includes: ["Dust & debris removal", "Paint & plaster marks", "All floors & surfaces", "Windows & frames"],
    checklist: [
      {
        category: "Dust & Debris",
        items: [
          "HEPA vacuum of floors, edges, radiators, skirtings and vents",
          "Wipe-down of ceilings, coving, switches, sockets, rails, door tops and frames",
          "Plastic and adhesive residue removal, light paint specks lifted from hard surfaces",
          "Internal windows, frames, sills and tracks detail cleaned",
          "Final dust check with microfiber and anti-static wipes before handover",
        ],
      },
      {
        category: "Kitchen",
        items: [
          "Degrease and wipe cabinets inside and out, remove sawdust and construction residue",
          "Descale taps and sink, polish stainless steel, remove silicone and grout haze where safe",
          "Worktops, splashbacks and tiles cleaned with paint specks carefully lifted",
          "Appliance exteriors cleaned (interiors on request)",
          "Floor vacuum and mop with edges and kickboards detailed",
        ],
      },
      {
        category: "Bathrooms",
        items: [
          "Limescale removal on taps and showerheads, polish glass and chrome",
          "Tile film and grout haze removal after works, sealant residue spot removal where safe",
          "Toilets, basins, baths and trays disinfected with silicone edges wiped clean",
          "Mirrors de-smeared, extractor fans dusted and vents vacuumed",
          "Floors vacuumed and mopped with edges and thresholds detailed",
        ],
      },
      {
        category: "Living Areas",
        items: [
          "All surfaces dusted with tape and glue residue lifted carefully",
          "Internal glass, mirrors and fixtures polished with sockets and switches wiped",
          "Skirting boards, door leaves and handles detailed with banisters wiped",
          "Carpets vacuumed (steam clean available) and hard floors mopped",
          "Final visual snag check",
        ],
      },
      {
        category: "Windows & Frames",
        items: [
          "Internal panes, frames, sills and tracks deep cleaned with stickers and light specks removed",
          "Blind dusting and pelmet wipe-down where accessible",
          "Exterior window cleaning available as an add-on",
          "Handles, catches and rails wiped with safe adhesive removal",
          "Final clean to a streak-free finish",
        ],
      },
      {
        category: "Debris & Final Tidy",
        items: [
          "Bag loose dust and light debris created by cleaning",
          "Construction debris removal available via partners (quote required)",
          "Site sweep, thresholds and entry points detailed with signage and stickers removed where approved",
          "Final inspection checklist completed for handover or move-in",
        ],
      },
    ],
  },
  {
    slug: "carpet-rug-cleaning",
    title: "Carpet & Rug Cleaning",
    desc: "Hot water extraction for carpets and rugs to revive fibres and remove stains and odours.",
    image: "/services/carpet.png",
    includes: ["Hot water extraction", "Stain treatment", "Odour removal", "Quick dry results"],
    checklist: [
      {
        category: "What We Clean",
        items: ["Carpets, all types and sizes, fully deep cleaned", "Rugs, deep extractor clean", "Mattresses, hygienic refresh", "Curtains (per pair), on-site clean", "Blinds, detailed clean", "Sofas and settees, all sizes", "Upholstery including chairs, cushions and fabrics"],
      },
      {
        category: "4-Step Method",
        items: ["Fibre ID and stain survey, then targeted pre-treatments", "Agitation to lift soil, edges detailed and traffic lanes restored", "Hot-water extraction (steam cleaning) for deep rinsing and deodorising", "High-lift extraction and airflow for faster drying with a groomed finish"],
      },
      { category: "On the Day", items: ["Access to running water and electricity required", "Team inspects carpets and notes areas for stain removal", "Remove smaller items and valuables from rooms beforehand", "After-care advice provided at the end", "Most carpets dry in 2 to 6 hours"] },
    ],
  },
  {
    slug: "oven-appliance-cleaning",
    title: "Oven & Appliances",
    desc: "Deep cleaning for ovens, extractors, fridges, freezers, dishwashers and all kitchen appliances.",
    image: "/services/oven.png",
    includes: ["Oven interior degreasing", "Extractor fan clean", "Fridge & freezer", "Dishwasher & microwave"],
    checklist: [
      {
        category: "Ovens",
        items: [
          "Single Oven: degrease interior, racks and trays, door glass, knobs and surround",
          "Double Oven: complete clean including trays, knobs and polish",
          "AGA Oven: specialist deep clean",
          "Range Cooker: multiple ovens and hob areas carefully cleaned",
          "Cooker: full clean of oven and hob combined units",
          "Hob: treat burnt-on residue, rings and pans with detail around controls",
        ],
      },
      {
        category: "Appliances",
        items: [
          "Extractor Fan and Hood: degrease hood and filters, wipe casing and edges",
          "Washing Machine: drawer and drum area, seals and surround, descale and odour removal",
          "Dishwasher: clean filters, spray arms and seals, treat limescale and neutralise odours",
          "Tumble Dryer: lint area and door seal wipe, exterior clean",
          "Fridge: shelves, drawers and seals, sanitise and deodorise",
          "Freezer: wipe interior and baskets after safe defrost, clean seals and remove odours",
          "Microwave: interior splatter removal, turntable clean and deodorise, wipe exterior",
        ],
      },
      { category: "Bundle Options", items: ["Oven, Hob and Extractor bundle", "Fridge, Freezer and Dishwasher bundle", "Full Kitchen Appliance Deep Clean covering all appliances"] },
      {
        category: "Important Notes",
        items: [
          "Appliances are not dismantled or reassembled",
          "No mechanical repairs are performed",
          "Access, water and power required on the day",
          "Empty fridge and freezer beforehand for best results",
          "Heavy burnt-in carbon or pre-existing damage may not fully clear",
          "Re-clean within 7 days if something is missed",
        ],
      },
    ],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    desc: "Jet-wash cleaning for patios, driveways, walls, decking and all exterior hard surfaces.",
    image: "/services/pressure.png",
    includes: ["Patios & driveways", "Decking & pathways", "Walls & render", "All exterior surfaces"],
    checklist: [
      { category: "Who We Serve", items: ["Residential properties including driveways, patios and exterior surfaces", "Commercial properties including offices, warehouses, restaurants and retail spaces"] },
      { category: "Surfaces Covered", items: ["Concrete driveways", "Stone patios", "Brick walls", "Decking", "Large commercial cladding and exterior facades"] },
      {
        category: "Key Notes",
        items: [
          "Minimum coverage of 20 square metres per visit",
          "Oil and grease stains removed with professional-grade degreasers",
          "External water tap access required on-site",
          "Eco-friendly approach, prioritising high-pressure water over chemicals, safe for pets and plants",
          "Commercial-grade jet washers with 3 times the power of domestic units",
          "Recommended every 12 to 18 months for driveways",
        ],
      },
    ],
  },
];

// ── About Section ─────────────────────────────────────────────
export const ABOUT_CONTENT = {
  headline: "Why tenants and landlords book us again",
  description: "We focus on one thing: handing back a property your agent signs off first time. Every job follows an agent-approved checklist, and we return free if anything is flagged.",
  cta: { label: "Get a Free Quote", href: "/contact" },
};

// ── FAQ Section ───────────────────────────────────────────────
export const FAQ_HEADER = {
  headline: "Questions we hear most",
  subtitle: "Still unsure? Message us on WhatsApp and a real person will reply.",
};

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What is included in an End of Tenancy Cleaning?",
    a: "Our end of tenancy clean covers every room top to bottom, kitchen appliances, oven, fridge, bathrooms, limescale removal, skirting boards, inside cupboards, carpets, and more. We follow a comprehensive checklist accepted by letting agents and landlords across Central Scotland.",
  },
  {
    q: "How long does a deep clean typically take?",
    a: "A standard deep clean for a 2-bedroom property usually takes 4 to 6 hours. Larger properties or those requiring extra attention may take longer. We always stay until every item on the checklist is completed.",
  },
  {
    q: "Are your cleaning teams fully insured?",
    a: "Yes, all our teams are fully insured and vetted. We carry comprehensive public liability insurance on every job, so you can have complete peace of mind when we're in your home.",
  },
  {
    q: "Do you offer last-minute or same-day bookings?",
    a: "Absolutely. We understand that sometimes you need a clean at short notice. We accept last-minute bookings subject to availability, contact us directly for urgent requests and we'll do our best to accommodate you.",
  },
  {
    q: "Do you supply all cleaning equipment and products?",
    a: "Yes, all equipment and professional-grade cleaning supplies are included in our price. You don't need to provide anything, our teams arrive fully equipped and ready to work.",
  },
];

// ── How It Works ──────────────────────────────────────────────
export const HOW_IT_WORKS_HEADER = {
  headline: "Booked in minutes, cleaned in a day",
  subtitle: "Three steps from quote to a property ready for inspection.",
  cta: { label: "Get a Free Quote", href: "/contact" },
};

export const STEPS: { num: number; side: "left" | "right"; title: string; desc: string }[] = [
  {
    num: 1,
    side: "right",
    title: "Get your quote",
    desc: "Answer a few quick questions online or give us a call. It takes under two minutes.",
  },
  {
    num: 2,
    side: "left",
    title: "We arrive equipped",
    desc: "Our vetted team brings professional tools and products, and works through the full checklist.",
  },
  {
    num: 3,
    side: "right",
    title: "Hand back the keys",
    desc: "Your property is inspection-ready. If anything is flagged, we come back free.",
  },
];

// ── Testimonials ──────────────────────────────────────────────
// TODO: replace with real Clean Tenancy reviews before launch.
export const TESTIMONIALS: { name: string; role: string; initials: string; quote: string }[] = [
  {
    name: "Sarah Mitchell",
    role: "Tenant, Glasgow",
    initials: "SM",
    quote: "They worked through every item on the checklist and the flat looked better than when I moved in. Full deposit back, no arguments.",
  },
  {
    name: "James Robertson",
    role: "Landlord, Edinburgh",
    initials: "JR",
    quote: "I book them for every turnover between tenants. Always on time, always thorough, and new tenants notice the difference.",
  },
  {
    name: "Priya Sharma",
    role: "Letting Agent, Stirling",
    initials: "PS",
    quote: "Our go-to team for managed properties. Their after-builders clean made a refurbished flat look brand new.",
  },
  {
    name: "David Thomson",
    role: "Homeowner, Falkirk",
    initials: "DT",
    quote: "Booked a deep clean with two days' notice and they still delivered. Quick, careful and genuinely friendly.",
  },
];

export const STATS: { value: string; label: string }[] = [
  { value: "500+", label: "Happy Clients" },
  { value: "12+", label: "Years Experience" },
  { value: "100%", label: "Deposit Success" },
  { value: "50mi", label: "Coverage Radius" },
];

// ── Room-by-Room Protocol (Homepage) ─────────────────────────
// ── Gallery ───────────────────────────────────────────────────
export const GALLERY_HEADER = {
  headline: "See the difference for yourself",
  subtitle: "Real jobs, photographed before and after. Wipe the photo to clean the room yourself.",
};

export const GALLERY_ITEMS: { id: string; room: string; tag: string; before: string; after: string }[] = [
  {
    id: "kitchen",
    room: "Kitchen Deep Clean",
    tag: "Deep Clean",
    before: "/before/Kitchen Deep Clean.png",
    after: "/after/Kitchen Deep Clean.png",
  },
  {
    id: "tenancy",
    room: "End of Tenancy Cleaning",
    tag: "Tenancy Clean",
    before: "/before/End of Tenancy.png",
    after: "/after/End of Tenancy.png",
  },
  {
    id: "oven",
    room: "Oven Restoration",
    tag: "Appliance Clean",
    before: "/before/Oven Restoration.png",
    after: "/after/Oven Restoration.png",
  },
  {
    id: "carpet",
    room: "Carpet Revival",
    tag: "Carpet Clean",
    before: "/before/Carpet Revival.png",
    after: "/after/Carpet Revival.png",
  },
  {
    id: "driveway",
    room: "Driveway Wash",
    tag: "Pressure Wash",
    before: "/before/Driveway Wash.png",
    after: "/after/Driveway Wash.png",
  },
];

// ── Footer ────────────────────────────────────────────────────
export const FOOTER_CONTENT = {
  brandName: "Clean Tenancy",
  tagline: "End of tenancy, deep and specialist cleaning for tenants, landlords and letting agents across Central Scotland.",
  workingHours: "Mon to Sun: 08:30 AM to 08:00 PM",
  workingDays: "Seven Days a Week",
  phone: SITE.phoneDisplay,
  email: SITE.email,
  addressLine1: SITE.addressLine1,
  addressLine2: SITE.addressLine2,
};

export const FOOTER_SERVICES = SERVICES.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
}));

export const FOOTER_QUICK_LINKS: { label: string; href?: string; section?: string }[] = [
  { label: "About Us", section: "about" },
  { label: "Coverage Areas", section: "coverage" },
  { label: "How It Works", section: "how-it-works" },
  { label: "Testimonials", section: "testimonials" },
  { label: "FAQ", section: "faq" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms-and-condition" },
];

export const FOOTER_NAV: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Checklist", href: "/checklist" },
  { label: "Coverage Area", href: "/coverage" },
  { label: "Contact Us", href: "/contact" },
];
