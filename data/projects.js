// Real, shipped projects. Adding an object here creates its page (/projects/[slug]), sitemap entry and
// metadata automatically. `liveUrl` is the deployed site — shown as "Visit live site" on the project page.
// clientId links to data/clients.js.

export const projects = [
  {
    id: "faces-by-gauri",
    slug: "faces-by-gauri",
    title: "Faces by Gauri",
    headline: "Bridal & Arabic Makeup Artist Website",
    client: "Faces by Gauri Makeup Artist",
    clientId: "faces-by-gauri",
    category: "Booking Website",
    year: "2026",
    liveUrl: "https://facesbygauri.com/",
    description:
      "A booking-first site for a bridal and Arabic-makeup studio, built around a direct 'Book Your Slot' flow instead of a contact form.",
    technologies: ["Next.js"],
    image: "/projects/faces-by-gauri.jpg",
    imageAlt: "Stylised preview of the Faces by Gauri homepage — dark, editorial, bridal makeup studio site",
    gallery: ["/projects/faces-by-gauri-2.svg", "/projects/faces-by-gauri-3.svg"],
    featured: true,
    challenge:
      "Bookings were happening over Instagram DMs and phone calls, one service description at a time, for an artist with 8,000+ clients and six distinct service tiers.",
    strategy:
      "Turn every service into its own bookable page with a clear price tier, then make the shortest path from any page back to a confirmed slot.",
    solution:
      "A dark, editorial site with a service catalogue (bridal, Arabic, party, hairstyling), a photo-only portfolio grid, and a 'Book Your Slot' link on every service card that pre-fills the booking flow.",
    design:
      "Warm near-black background, generous portrait photography and large serif-adjacent headlines, so the makeup work stays the visual focus rather than site chrome.",
    development:
      "Built on Next.js with optimised image delivery for a large gallery, direct tel: and WhatsApp links for same-day enquiries, and a service-aware booking route (?service=arabic-makeup) so a visitor never re-selects what they already chose.",
    features: [
      "Six-service catalogue, each with its own booking link",
      "Unfiltered portfolio gallery organised by look",
      "One-tap call and WhatsApp for urgent enquiries",
      "Google Maps link straight to the studio",
      "FAQ covering payments, travel charges and inclusions",
    ],
    features_note: "",
    results: [
      "Every service now links straight to a pre-filled booking slot",
      "Studio address, hours and both phone numbers surfaced without a contact form",
    ],
    metrics: [],
  },
  {
    id: "golden-crust",
    slug: "golden-crust",
    title: "Golden Crust",
    headline: "Multi-Kitchen Central Inventory & Production Management System",
    client: "Golden Crust",
    clientId: "golden-crust",
    category: "desktop Application",
    year: "2026",
    description:
      "A centralized inventory and multi-kitchen management system engineered for Golden Crust to handle stock distribution, inward goods receipts, daily production, and waste tracking across infinite individual kitchen units from a single main inventory.",
    technologies: ["Next.js", "Tailwind CSS", "Vercel"],
    image: "/projects/golden-crust1.jpg",
    imageAlt: "Preview of Golden Crust KitchenStock dashboard — multi-kitchen stock management interface with role-based portals",
    gallery: [
      "/projects/golden-crust2.jpg",
      "/projects/golden-crust3.jpg",
    ],
    featured: true,
    challenge:
      "Commercial culinary operations were struggling with disconnected paper registers across multiple kitchen facilities, leading to unrecorded batch consumption, lack of real-time visibility into branch stock levels, and untracked ingredient wastage.",
    strategy:
      "Architect a hub-and-spoke inventory hierarchy where a central warehouse supplies an unlimited network of kitchen units, pairing automated ingredient deductions during production runs with dedicated role-based portals for administrators and branch kitchen managers.",
    solution:
      "A multi-tenant responsive web application separating central warehouse operations from individual branch kitchens, featuring real-time stock transfer workflows, goods receipt logging, automatic recipe-based deduction upon recording production, and granular waste auditing.",
    design:
      "A crisp, functional UI built around deep forest green and high-contrast alert states, pairing dense tabular data displays with quick-action status badges, clean summary cards, and streamlined modal flows for fast-paced kitchen environments.",
    development:
      "Built with Next.js and Tailwind CSS featuring role-based access control dividing full-visibility Administrators from single-kitchen Managers, dynamic goods receipt forms that write directly to the stock ledger, automated batch usage calculations, and printable kitchen dispatch delivery slips.",
    features: [
      "Hub-and-spoke inventory architecture supporting unlimited individual kitchen outlets from one main store",
      "Role-based authentication splitting central Administrator controls from scoped Kitchen Manager views",
      "Supplier goods receipt logging with automated unit cost updates and ledger entries",
      "Inter-kitchen transfer request and dispatch pipeline with printable delivery slips",
      "One-click production recording that automatically deduces raw ingredient quantities",
      "Granular waste recording and audit history for spoiled, expired, or lost stock",
      "Threshold-based inventory health monitoring with automated low-stock and out-of-stock indicators",
    ],
    features_note: "",
    results: [
      "Eliminated manual paper registers across central stores and branch kitchens",
      "Delivered complete real-time traceability for every item received, transferred, produced, and wasted",
      "Enabled instantaneous multi-kitchen scaling without requiring changes to the central inventory architecture",
    ],
    metrics: [],
  },
  {
    id: "dermacare-skin-clinic",
    slug: "dermacare-skin-clinic",
    title: "DermaCare Skin Clinic",
    headline: "Dermatology & Aesthetic Clinic Booking Platform",
    client: "DR. Ashwant",
    clientId: "dermacare-skin-clinic",
    category: "Healthcare & Booking",
    year: "2026",
    liveUrl: "https://drashwantsclinic.com/",
    description:
      "A clinical booking and patient portal web platform for an advanced dermatology and laser practice, streamlining direct consultation scheduling across aesthetic, hair, and skin procedures.",
    technologies: ["Next.js", "Tailwind CSS"],
    image: "/projects/dermacare-1.jpg",
    imageAlt: "Preview of DermaCare Skin Clinic homepage — modern aesthetic dermatology and patient care portal",
    gallery: [
      "/projects/dermacare-2.jpg",
      "/projects/dermacare-3.jpg",
    ],
    featured: true,
    challenge:
      "Patients had to coordinate consultations, inquiries, and follow-up sessions manually over phone calls, creating booking bottlenecks and making it difficult to clearly present advanced clinical technology, procedural prerequisites, and pricing.",
    strategy:
      "Design a clean, clinical yet inviting web presence with dedicated procedure breakdowns, clear doctor credentials, direct consultation booking flows, and an intuitive patient portal.",
    solution:
      "A responsive healthcare platform featuring an itemized treatment directory (lasers, MNRF, chemical peels, and hair restoration), transparent clinical technology overviews, patient reviews, and integrated digital appointment scheduling.",
    design:
      "Clean clinical aesthetic utilizing serene sage greens, crisp white surfaces, readable modern typography, and structured consultation cards that instill patient trust and medical authority.",
    development:
      "Built with Next.js featuring fast static service pages, optimized responsive imagery, doctor-specific booking routing, patient portal authentication, and direct click-to-call and location actions.",
    features: [
      "Treatment and laser procedure directory with dedicated care details",
      "Direct consultation booking flow with doctor and treatment routing",
      "Advanced clinical equipment and technology showcase",
      "Patient testimonials and treatment review gallery",
      "Direct phone assistance, WhatsApp connect, and Google Maps integration",
      "Dedicated patient sign-in portal",
    ],
    features_note: "",
    results: [
      "Streamlined consultation booking without back-and-forth reception coordination",
      "Clear patient education on treatments and laser technology prior to clinic visits",
    ],
    metrics: [],
  },
  {
    id: "ritu-mahajan-makeovers",
    slug: "ritu-mahajan-makeovers",
    title: "Ritu Mahajan Makeovers",
    headline: "Two-Studio Bridal & Salon Booking Platform",
    client: "Ritu Mahajan Makeovers",
    clientId: "ritu-mahajan-makeovers",
    category: "Booking Platform",
    year: "2026",
    liveUrl: "https://www.ritumahajanmakeovers.com/",
    description:
      "A booking site spanning two physical studios and six service categories, where every service can be booked at either location.",
    technologies: ["Next.js"],
    image: "/projects/ritu-mahajan-makeovers.jpg",
    imageAlt: "Stylised preview of the Ritu Mahajan Makeovers homepage — deep maroon bridal studio site",
    gallery: ["/projects/ritumahajanmakeovers2.svg", "/projects/ritumahajanmakeovers3.svg"],
    featured: true,
    challenge:
      "One studio brand, two physical locations (Mukerian and Datarpur), and six service categories meant a booking couldn't just ask 'what service' — it had to ask 'where' and 'when' too, without turning into a maze.",
    strategy:
      "Treat location as a first-class filter alongside service and date, and give bridal bookings their own path since a trial, a fixed artist and a wedding-day timeline don't fit the same flow as a walk-in blow-dry.",
    solution:
      "A studio locator with maps and hours for each location, a shared service catalogue bookable at either studio, and a dedicated bridal section explaining the trial-to-wedding-day timeline before the person ever opens the booking form.",
    design:
      "A deep maroon and warm-ivory palette that reads as salon-luxury rather than clinical, with large stat callouts (years in business, studios, clients) doing the trust-building instead of paragraphs of copy.",
    development:
      "Next.js site with location- and service-aware booking links (?location=mukerian-studio, ?service=bridal-makeup), embedded Google Maps for both studios, and a review section pulling in real client quotes.",
    features: [
      "Two-studio locator with embedded maps, hours and phone numbers",
      "Six-category service catalogue, bookable at either studio",
      "Dedicated bridal section covering the trial-to-wedding timeline",
      "Instant booking confirmation flow, no manual approval step",
      "FAQ covering rescheduling, travel and seasonal booking windows",
    ],
    results: [
      "Every service page routes directly into a location- and date-aware booking form",
      "Bridal enquiries now land on a page that sets trial and timeline expectations upfront",
    ],
    metrics: [],
  },

  {
    id: "mahajan-furniture-house",
    slug: "mahajan-furniture-house",
    title: "Mahajan Furniture House",
    headline: "Furniture Showroom Catalogue Website",
    client: "Mahajan Furniture House",
    clientId: "mahajan-furniture-house",
    category: "Catalogue Website",
    year: "2026",
    liveUrl: "https://www.mahajanfurniturehouse.com/",
    description:
      "A product catalogue for a 45-year-old furniture showroom, built so a WhatsApp enquiry is never more than one tap from any product photo.",
    technologies: ["Next.js"],
    image: "/projects/mahajan-furniture-house.jpg",
    imageAlt: "Stylised preview of the Mahajan Furniture House homepage — warm-toned furniture showroom catalogue",
    gallery: ["/projects/mahajan-furniture-house2.svg", "/projects/mahajan-furniture-house-3.svg"],
    featured: true,
    challenge:
      "A showroom running since 1981 on foot traffic and word of mouth had no way for someone to browse the collection, or even confirm a piece was in stock, before making the trip to Talwara Road.",
    strategy:
      "Put the full catalogue online by category, and make every single product enquiry a pre-filled WhatsApp message rather than a generic contact form.",
    solution:
      "A five-category catalogue (beds, dining, centre tables, cabinets & console, sofas), with individual product pages that open straight into WhatsApp with the product name already in the message.",
    design:
      "Warm, wood-toned imagery and a showroom-brochure feel, letting the furniture photography carry the page instead of decorative UI.",
    development:
      "Next.js catalogue with per-product static pages, WhatsApp deep links carrying the product name (wa.me links with a pre-filled message), a Google Maps embed for the showroom, and a Google Reviews-sourced testimonial section.",
    features: [
      "Five-category product catalogue with dedicated pages per design",
      "One-tap WhatsApp enquiry, pre-filled with the exact product",
      "Click-to-call for the showroom",
      "Embedded showroom map, hours and directions",
      "FAQ covering delivery, customisation and payment methods",
    ],
    results: [
      "Every product now opens directly into a pre-filled WhatsApp enquiry",
      "Full five-category catalogue browsable online for the first time",
    ],
    metrics: [],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getProjectByClient = (clientId) => projects.find((p) => p.clientId === clientId);
export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
