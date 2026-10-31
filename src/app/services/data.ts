import { SERVICES } from "@/app/data";

type ServiceDetails = {
  heading: string;
  description: string;
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  questions: { q: string; a: string }[];
  guide: { slug: string; label: string };
};

const DETAILS: Record<string, ServiceDetails> = {
  "end-of-tenancy-cleaning": {
    heading: "End of Tenancy Cleaning",
    description: "End of tenancy cleaning across Glasgow, Edinburgh, Stirling and Falkirk. Explore our room-by-room checklist and request a free moving-out cleaning quote.",
    intro: "Moving out brings enough to organise without a final clean taking over your last day. Our end of tenancy service works through the property room by room, focusing on the kitchen, bathrooms, cupboards, floors and fittings that are easy to miss during a move. It is suitable for tenants preparing to hand back keys and for landlords getting a property ready for its next occupants.",
    sections: [
      { heading: "A clean planned around your handover", paragraphs: [
        "Tell us your checkout date, property size and whether the home will be furnished or empty. We can then plan the clean around access and the areas that need attention. If your letting agent has supplied an inventory or cleaning requirements, share those when requesting a quote so we can compare them with our checklist before the visit.",
        "Where possible, book after your belongings have been removed and any maintenance is finished. Empty cupboards and clear floors make it easier to reach corners and work systematically. If furniture must remain, let us know in advance; accessible areas can still be cleaned, but large or fixed items may restrict access behind and underneath them.",
      ] },
      { heading: "Kitchens, bathrooms and overlooked details", paragraphs: [
        "Kitchens receive attention inside cupboards and across worktops, sinks, splashbacks and accessible fittings. The checklist also covers oven cleaning, with other appliances discussed as part of your booking. Remove food and personal items beforehand, and tell us about any freezer that will need defrosting so it can be prepared safely before we arrive.",
        "Bathrooms are cleaned around basins, taps, toilets and reachable plumbing, with attention to soap residue and limescale. Elsewhere, the team follows the room checklist for dusting, switches, door frames, skirting boards, mirrors and floors. Cleaning can remove dirt and residue, but it cannot repair damaged sealant, worn finishes, permanent staining or other maintenance issues.",
      ] },
      { heading: "Carpets and additional requirements", paragraphs: [
        "Routine floor cleaning and specialist carpet extraction are different tasks. If your inventory asks for a professional carpet clean, mention the number of carpeted rooms, stairs and rugs when enquiring. We can discuss the appropriate carpet service alongside the tenancy clean so the scope is clear before you book, rather than assuming every floor requires the same treatment.",
        "Let us know about balconies, external windows, upholstery or any other areas outside the main room checklist. Photos are useful when there is heavy grease, unusually dense limescale or long-standing build-up. They help us understand the work and explain any limitations. Keep electricity and running water available until the cleaning appointment has finished.",
      ] },
    ],
    questions: [
      { q: "Does this guarantee that my deposit will be returned?", a: "The cleaning guarantee applies to issues on our agreed cleaning checklist: if your agent flags a covered item, we return to put it right at no extra cost. Deposit decisions can also involve rent, damage and the tenancy agreement, so a clean cannot guarantee the outcome of the whole deposit assessment. See our terms for the applicable conditions." },
      { q: "Do I need to stay at the property?", a: "Discuss key collection and access when arranging your appointment. You can explain priorities before work begins and agree how the property will be secured afterwards. If you cannot be present, provide a reachable contact and any entry instructions. Make sure the team can access every room included in the quote without waiting for another contractor." },
      { q: "How much will the clean cost?", a: "The quote depends on property size, bathrooms, condition, furnishings and the additional services you choose. Share these details through the quote form, along with your preferred date and postcode. We can then confirm the proposed scope and price. A small flat with clear access and an occupied house with extensive build-up require different amounts of work." },
    ],
    guide: { slug: "end-of-tenancy-cleaning-guide", label: "Read our end of tenancy cleaning guide" },
  },
  "deep-spring-cleaning": {
    heading: "Deep & Spring Cleaning",
    description: "Deep and spring cleaning for homes in Glasgow, Edinburgh, Stirling and Falkirk. See the detailed room checklist and request a free property cleaning quote.",
    intro: "A deep clean gives attention to the parts of a lived-in home that ordinary weekly cleaning may not reach. It can be useful before visitors arrive, after a busy period or whenever dust and kitchen or bathroom build-up need a more thorough reset. Our team works through a detailed room checklist, with the priorities and access arrangements agreed around your home.",
    sections: [
      { heading: "A refresh for an occupied home", paragraphs: [
        "Unlike a moving-out clean, a spring clean often takes place around furniture, belongings and everyday routines. Tell us which rooms matter most, where dust tends to collect and whether any areas need particular care. We can use that information alongside our checklist to plan the visit and identify anything that needs a separate specialist service.",
        "The entrance and hallways set the starting point: door frames, handles, skirting boards, banisters and reachable fittings all collect marks and dust. Bedrooms and living spaces are treated with the same attention to edges and accessible surfaces. We work around the property as presented, so clearing loose belongings beforehand gives the team more time to focus on cleaning.",
      ] },
      { heading: "Detail beyond a routine tidy", paragraphs: [
        "Our room checklist includes detail dusting, reachable radiators and vents, mirrors, internal glass, switches and floor edges. Accessible spaces underneath furniture can also need attention. Point out delicate objects, unstable furniture, loose fittings or surfaces with special care instructions before the work starts, so the cleaning plan can reflect their condition and finish.",
        "In kitchens and bathrooms the focus shifts to residue, grease, soap deposits and limescale where suitable for the material. Different surfaces need different treatment; an abrasive method that works on one finish may damage another. Deep cleaning is a thorough clean of accessible areas, rather than a repair service for scratched surfaces, failed grout or deteriorated coatings.",
      ] },
      { heading: "Choose the extras your home actually needs", paragraphs: [
        "If carpets, rugs or sofas need extraction cleaning, tell us separately so they can be assessed and quoted for the appropriate treatment. Likewise, an oven with substantial baked-on grease may need a dedicated appliance clean. Combining services can be convenient, but listing the work clearly avoids confusion about what a general deep clean includes.",
        "You do not need to make your home spotless before we arrive. Focus on removing valuable or fragile objects, clearing floor space and putting away loose items from the surfaces you want cleaned. Let us know if pets will be at home, how parking and entry work, and whether there are rooms that should remain undisturbed during the appointment.",
      ] },
    ],
    questions: [
      { q: "Is spring cleaning only available in spring?", a: "No. This is a one-off deep cleaning service that can be requested throughout the year. The name describes the level of attention rather than a seasonal restriction. Tell us what has prompted the clean, whether it is accumulated dust, a special occasion or a general refresh, so the team understands the priorities for your property." },
      { q: "Does a deep clean include decluttering?", a: "The service focuses on cleaning surfaces, fittings and floors. Sorting possessions, deciding what to discard and reorganising storage should be handled before the visit unless you have separately agreed otherwise. Clear worktops and accessible floor space make a significant difference. If clutter prevents access to a particular area, discuss that when requesting your quote." },
      { q: "Can I book only some rooms?", a: "Describe the areas you want cleaned when you enquire. A kitchen and bathroom refresh has a different scope from a whole-house deep clean, and the quote should reflect that distinction. Share the number and approximate size of rooms, their condition and any specialist requests. We will confirm what can be included before the booking is agreed." },
      { q: "What should I arrange before the appointment?", a: "Make sure running water, electricity and safe entry are available. Put away personal documents, valuables and fragile decorations, and identify surfaces that need special care. If you want cleaning behind a large item, discuss safe access in advance instead of assuming it can be moved on the day. Keep children and pets clear of the working areas." },
    ],
    guide: { slug: "deep-cleaning-benefits", label: "Read about the benefits of deep cleaning" },
  },
  "after-builders-cleaning": {
    heading: "After Builders Cleaning",
    description: "After builders cleaning across Glasgow, Edinburgh, Stirling and Falkirk. Remove renovation dust and surface residue. Explore the checklist and get a quote.",
    intro: "Building work can leave fine dust on surfaces long after the tools have been packed away. Our after builders service focuses on that final cleaning stage, addressing accessible dust, light construction residue and the details around new or renovated rooms. Tell us what work has been done and which areas are affected so we can plan a clean suited to the property and its finishes.",
    sections: [
      { heading: "Book once the dusty work has finished", paragraphs: [
        "The most useful time for a final clean is after sanding, drilling, plastering and other dust-producing work is complete. If trades are still working, cleaned surfaces may quickly collect fresh dust. Explain your handover or moving-in date and whether contractors need to return, so we can discuss sensible timing rather than cleaning around an active building site.",
        "Before the appointment, arrange for the builders to remove tools, rubble and bulky waste. Our cleaning checklist covers light residue and accessible surfaces; it is not a substitute for construction waste disposal or a site safety assessment. The rooms need safe access, working utilities and surfaces that are ready to be cleaned under the manufacturer's care instructions.",
      ] },
      { heading: "Fine dust needs a systematic approach", paragraphs: [
        "Dust can gather along skirting boards, door tops, radiator surfaces, vents and window tracks, as well as on visible floors and worktops. The checklist combines vacuuming and surface cleaning to address those collection points. Tell us if dust has travelled beyond the renovated room so we can include affected hallways, adjoining spaces or stairs in the proposed scope.",
        "Kitchens and bathrooms may also need sawdust removed from cupboards, fittings wiped and appropriate treatment for grout haze or light paint specks. Internal windows, frames and sills receive detail cleaning. Because renovation residue differs from ordinary household dirt, photos of representative areas help explain how much remains and whether the work involves more than a final surface clean.",
      ] },
      { heading: "Protecting newly finished surfaces", paragraphs: [
        "Fresh paint, natural stone, coated flooring and new appliances can require particular care. Share the finish details and any instructions left by your installer. Adhesives, silicone, cement and plaster cannot all be removed by the same method, and some residue may need the original contractor's attention. We discuss what can be treated safely rather than promising that every mark will disappear.",
        "Let us know about loose electrical fittings, exposed areas, damaged glass or other unfinished work before booking. Hazardous materials and suspect dust require specialist assessment outside an ordinary cleaning visit. Where a room is ready, the aim is to remove the cleaning residue left by renovation and leave accessible surfaces easier to inspect before furniture and belongings are brought back.",
      ] },
    ],
    questions: [
      { q: "Do you take away rubble or building waste?", a: "Bulky waste, spare materials and rubble should be removed by your builder or an appropriate waste service before the clean. A clear site allows safe access to surfaces and floors. Tell us what remains when you enquire, including bags or protective coverings, so the quoted work is based on the actual condition rather than an assumed empty property." },
      { q: "Can you remove all paint and plaster marks?", a: "Light surface marks may be treatable where the underlying finish allows it. The result depends on the residue, how long it has been present and the material beneath it. Some removal methods could damage fresh finishes or glass. Share photos and finish information in advance; we will explain limitations and identify anything better referred back to the contractor." },
      { q: "Can I book after just one room is renovated?", a: "Yes, describe the renovated room and any other spaces affected by travelling dust. A new bathroom can leave residue along the hallway even if the rest of the home was not being refurbished. Include access routes and nearby rooms in your enquiry so we can agree which areas need cleaning and which should be left undisturbed." },
      { q: "What information helps you prepare a quote?", a: "Send your postcode, property or room sizes, the type of renovation and your preferred date. Photos showing both the general space and close-up residue are particularly useful. Mention whether the property is furnished, whether trades have finished and whether water and electricity are available. These details help distinguish a final sparkle clean from a heavier post-renovation visit." },
    ],
    guide: { slug: "after-builders-cleaning", label: "Read our after builders cleaning guide" },
  },
  "carpet-rug-cleaning": {
    heading: "Carpet & Rug Cleaning",
    description: "Carpet and rug cleaning in Glasgow, Edinburgh, Stirling and Falkirk. Explore fibre assessment, stain treatment and extraction cleaning, then request a quote.",
    intro: "Carpets and rugs collect tracked-in dirt, everyday spills and dust that ordinary vacuuming can leave behind. Our specialist cleaning service begins with the material and its condition, then considers suitable stain treatment and extraction. Whether you are refreshing a living room or preparing carpeted rooms for a tenancy handover, tell us what needs cleaning and which areas concern you most.",
    sections: [
      { heading: "Start with the fibre and condition", paragraphs: [
        "A rug, fitted bedroom carpet and heavily used stair runner do not necessarily need identical treatment. The team checks the material, visible wear and stains before deciding how to proceed. Share labels or care instructions where available, particularly for valuable rugs or unfamiliar fabrics. Mention any existing colour change, damage, loose backing or shrinkage so it can be considered during the initial assessment.",
        "Tell us about previous cleaning attempts and any products applied to spills. Household spot treatments can leave residue or alter how a stain responds, even when the surface looks dry. An honest history helps set realistic expectations. The aim is to lift suitable soil and improve the appearance of the material, rather than promise the reversal of permanent fibre damage or bleaching.",
      ] },
      { heading: "Targeted treatment and extraction", paragraphs: [
        "For suitable materials, the process includes a fibre and stain survey, targeted pre-treatment and agitation to loosen soil. Traffic lanes and edges receive attention before hot water extraction rinses the fibres. Extraction also removes moisture, followed by advice on airflow and aftercare. The precise approach depends on the material and the concerns identified at the start of the visit.",
        "Stains are assessed individually because a food spill, ingrained dirt and a dye mark behave differently. Some improve substantially; others may remain visible after cleaning. Odours can also have sources below the surface, including backing or underlay. Describe recurring smells and affected areas when enquiring so we can discuss whether carpet cleaning alone is likely to address the problem.",
      ] },
      { heading: "Preparing rooms and planning drying time", paragraphs: [
        "Remove small items, toys, cables and valuables from the areas to be cleaned. Tell us which furniture can remain and whether there is clear access to stairs or upper floors. Large items may limit the floor space we can reach, so furniture movement should be discussed in advance. Access to water and electricity is needed for the appointment.",
        "Our existing checklist gives a typical carpet drying range of two to six hours, but the actual time varies with fibre, ventilation, temperature and how much treatment was needed. Plan some flexibility before replacing items or using the room normally. Follow the team's advice, keep the area ventilated where practical and wait until the material is sufficiently dry before covering it.",
      ] },
      { heading: "Rugs, upholstery and tenancy bookings", paragraphs: [
        "If you want rugs, sofas, mattresses or other soft furnishings assessed at the same time, list them individually with approximate sizes and material information. They may need different methods and drying arrangements from fitted carpet. Photographs of the whole item and its care label can help us understand the request before the visit and confirm which items can be included.",
        "For moving-out appointments, check the inventory or agent's instructions to see exactly which rooms require specialist carpet cleaning. Arrange the work after removal of belongings where possible, leaving time for drying before checkout. A separate room clean may still be needed for cupboards, bathrooms and kitchens; extraction cleaning focuses on the agreed carpet, rug or fabric areas rather than the whole property.",
      ] },
    ],
    questions: [
      { q: "Will every stain disappear?", a: "No individual stain can be guaranteed to disappear before assessment. Its age, source, previous treatment and the fibre all affect the result. Some marks are permanent colour changes or wear rather than removable dirt. Explain the stains that matter most and share photos when requesting a quote so we can discuss realistic expectations before the appointment." },
      { q: "Can you clean a rug with no care label?", a: "Let us know that the label is missing and send clear photographs of the front, reverse and any damaged areas. The material still needs to be assessed before treatment is agreed. If there is uncertainty about suitability, that should be resolved before cleaning proceeds. Valuable or delicate items may require a different specialist approach." },
      { q: "How is the quote worked out?", a: "List the carpeted rooms, hallways, stairs and rugs, with approximate sizes and information about stains or odours. Include your postcode, floor level and access arrangements. If you are also requesting upholstery cleaning, describe each item separately. These details let us quote for the actual areas and treatments rather than treating every property as the same job." },
    ],
    guide: { slug: "carpet-rug-cleaning-guide", label: "Read our carpet and rug cleaning guide" },
  },
  "oven-appliance-cleaning": {
    heading: "Oven & Appliance Cleaning",
    description: "Oven and appliance cleaning across Glasgow, Edinburgh, Stirling and Falkirk. See what is covered for ovens, hoods and kitchen appliances, then get a quote.",
    intro: "Grease, cooking residue and everyday spills can build up in the appliances you use most. Our oven and appliance service focuses on the accessible parts of the items agreed in your booking, from oven interiors and racks to fridge shelves and extractor filters. You can request an individual appliance clean or discuss adding it to a wider property cleaning appointment.",
    sections: [
      { heading: "Match the booking to your oven", paragraphs: [
        "Tell us whether you have a single oven, double oven, range cooker or another model, and share a photograph if you are unsure. The number of cavities, trays and cooking surfaces affects the scope. Mention specialist finishes or self-cleaning features so the cleaning approach can reflect the appliance rather than assuming every interior is made from the same material.",
        "Our oven checklist covers accessible interior surfaces, racks, trays, door glass, knobs and the surrounding area. Hobs and extractor hoods can be discussed alongside the oven. Heavy carbon deposits, worn coatings or damaged seals may affect the result, so describe the appliance's condition honestly. Cleaning removes suitable residue; it does not replace servicing or repair a faulty heating element.",
      ] },
      { heading: "Beyond the oven cavity", paragraphs: [
        "Extractor hoods can collect grease around the casing, edges and suitable filters. Fridges need attention to shelves, seals and internal surfaces, while microwaves collect splashes around the cavity and turntable. Each appliance should be listed in the quote request so the team knows what work is expected. A booking for an oven alone does not automatically include every kitchen appliance.",
        "For dishwashers and washing machines, accessible filters, drawers and seals can hold residue and odours. Let us know if an appliance is not draining, leaking or displaying an error: those are potential maintenance issues that cleaning may not resolve. We can discuss the agreed cleaning areas, but internal mechanical repairs, electrical work and disconnection are outside a routine appliance clean.",
      ] },
      { heading: "Prepare appliances before the visit", paragraphs: [
        "Leave the oven switched off and cool before the appointment, and tell us about any cleaning product recently used inside it. Remove food and personal items from a fridge that is included in the booking. If freezer cleaning is requested, agree defrosting arrangements in advance and allow enough time; it should not be left as a surprise task once the team arrives.",
        "Provide clear access around the appliance and mention anything built into cabinetry or positioned in a tight space. Do not move a heavy appliance or interfere with gas, water or electrical connections simply to prepare for cleaning. If an inaccessible area matters to you, discuss it when enquiring so we can explain what can safely be reached without dismantling or disconnecting the unit.",
      ] },
      { heading: "Combine appliance care with a property clean", paragraphs: [
        "Appliance cleaning is often useful before new occupants arrive or when a kitchen needs more attention than a routine wipe-down. Check your tenancy checklist if the appointment is part of moving out: it may specify the oven, fridge, freezer or extractor individually. Sharing that list helps us agree the work, avoid duplicate bookings and identify any preparation needed before the day.",
        "A kitchen deep clean and an appliance clean serve related but different purposes. Cupboards, worktops, tiles and flooring belong in the room scope, while detailed appliance interiors need their own attention. If you want both, include them in a single enquiry. We can then explain the proposed combination and make clear which appliances, surfaces and accessible parts are covered by the quote.",
      ] },
    ],
    questions: [
      { q: "Can I book just my oven?", a: "Yes, request the oven clean you need and describe the appliance type, size and condition. If you also want the hob or hood cleaned, include them explicitly. Photos are helpful for range cookers or appliances with multiple cavities. We will confirm the scope and availability before agreeing the booking rather than assume you need a full kitchen clean." },
      { q: "Do you repair appliances?", a: "This is a cleaning service. Faulty controls, leaks, damaged seals and electrical or gas issues need an appropriate repair professional. Let us know about known faults before booking, as they may affect whether cleaning can proceed safely. Cleaning may improve removable residue and surface build-up, but it should not be presented as a fix for an underlying mechanical problem." },
      { q: "When can I use the appliance afterwards?", a: "Follow the advice given for the particular appliance and cleaning method at the end of the visit. Different materials and tasks can need different drying or reassembly arrangements. Ask before switching anything on if you are unsure, especially for a fridge or freezer that has been emptied or defrosted. There is no single restart time that suits every appliance." },
    ],
    guide: { slug: "oven-appliance-cleaning", label: "Read our oven and appliance cleaning guide" },
  },
  "pressure-washing": {
    heading: "Pressure Washing",
    description: "Pressure washing for patios, driveways and suitable exterior surfaces in Glasgow, Edinburgh, Stirling and Falkirk. Explore the service and request a quote.",
    intro: "Patios, paths and driveways can develop layers of dirt and organic build-up that change how the space looks and feels underfoot. Our pressure washing service is planned around the surface, its condition and safe access to the area. Tell us what you want cleaned and send photographs so we can discuss an appropriate approach before arranging the visit.",
    sections: [
      { heading: "The surface determines the method", paragraphs: [
        "A concrete path, block-paved drive, timber deck and painted wall do not respond to cleaning in the same way. Age, coatings, loose joints and existing damage also matter. Describe the material if you know it and point out areas that are cracked, unstable or recently installed. Suitable pressure and technique should be chosen for the surface, rather than using maximum force everywhere.",
        "Our exterior checklist covers patios, driveways, pathways, decking and suitable walls or fencing. Not every finish is suitable for pressure washing. Where a delicate coating, weak joint or damaged material is a concern, we discuss that before treatment. If you have installation or maintenance instructions, share them with the enquiry so the cleaning plan can take them into account.",
      ] },
      { heading: "Plan access, water and drainage", paragraphs: [
        "The team needs safe access to the working area and an appropriate water supply. Tell us whether the space is reached through a side gate, shared passage or the house, and mention steps or narrow entrances. Equipment and hose routes should be considered in advance so they do not unexpectedly block a neighbour's access or cross a busy doorway.",
        "Drainage also affects how the job is planned. Cleaning loosens dirt and produces wastewater that needs a suitable route away from the surface. Explain any existing pooling, blocked drains or restrictions when you enquire. Access and drainage details are particularly useful for enclosed back gardens, shared courtyards and areas beside doors where water must be managed carefully.",
      ] },
      { heading: "Preparing the outdoor area", paragraphs: [
        "Move vehicles, furniture, plant pots, toys and other loose items from the section being cleaned where you can do so safely. Close nearby windows and doors and let us know about vulnerable plants, loose lighting or external electrical fittings. If heavy objects cannot be moved, identify them beforehand so we can agree the accessible area rather than promise to clean underneath everything.",
        "Keep children and pets away from the working area and allow for wet surfaces during and immediately after the appointment. Discuss any adjoining public path or shared entrance before the visit. Photos showing the full space help us understand these practical points; close-up pictures alone may show the dirt but miss the access and surroundings needed to plan the work.",
      ] },
      { heading: "Set expectations for the finished surface", paragraphs: [
        "Pressure washing can remove suitable surface dirt and build-up, but it cannot repair cracks, replace worn coatings or reverse every oil or rust mark. Existing discolouration may remain even after loose material has been cleaned away. Identify specific stains when requesting your quote so we can explain what might be treatable and what may need another approach or a repair.",
        "Cleaning block paving can disturb loose jointing material. Any re-sanding, sealing or remedial work should be explicitly discussed rather than assumed to be included in a washing quote. Likewise, a cleaned deck may still need separate maintenance. We will focus the booking on the agreed cleaning work and explain relevant follow-up considerations for the material and its condition.",
      ] },
    ],
    questions: [
      { q: "Can you clean decking and painted surfaces?", a: "Tell us the material, finish and condition first. Timber, composite boards and painted surfaces can need gentler or different methods from hard paving, and some finishes may not be suitable for pressure washing. Share care instructions and photographs of worn or peeling areas. Suitability should be agreed before the appointment, rather than treating all outdoor surfaces as interchangeable." },
      { q: "Is sealing included with driveway cleaning?", a: "Do not assume sealing or re-sanding is included in the pressure washing service. Those tasks need their own assessment, materials and suitable conditions. If you want them considered, mention that in your enquiry so we can confirm the available scope. Washing alone does not renew damaged joints, fill cracks or provide a new protective coating." },
      { q: "What do you need for a quote?", a: "Share your postcode, approximate area or dimensions, the surface material and clear photos of the whole space. Add information about stains, drainage, water access and any objects that cannot be moved. Mention shared access and your preferred date. These details help us plan the work and discuss practical limitations before confirming the proposed cleaning appointment." },
    ],
    guide: { slug: "pressure-washing-guide", label: "Read our pressure washing guide" },
  },
};

export const SERVICE_PAGES = SERVICES.map((service) => ({
  ...service,
  ...DETAILS[service.slug],
}));

export function getService(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}
