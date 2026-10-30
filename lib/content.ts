// Single source of truth for all site copy. Edit here, not in the pages.

export const SITE = {
  name: "Eximeria Trading Co.",
  tagline: "Connecting global markets with precision, compliance, and scale. Your trusted partner in international trade.",
  email: "teameximeriatrading@gmail.com",
  phoneDisplay: "+91 95619 48925",
  phoneHref: "tel:+919561948925",
  whatsappHref: "https://wa.me/919561948925",
  hours: "Mon – Sat, 9:00 AM – 7:00 PM IST",
  // Used everywhere the site states experience (the design had "15 years" in one place,
  // "two decades" in another and a blank on About). Set the true figure here.
  yearsInBusiness: 15,
  certifications: ["ISO 9001", "FIEO", "DGFT"],
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Category = {
  slug: string;
  badge: string;
  title: string;
  short: string;
  tagline: string;
  image: string;
  description: string;
  range: string[];
  certifications: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "agri-food",
    badge: "Agriculture",
    title: "Agri & Food",
    short: "Grains, pulses, spices, oilseeds, sugar, and processed foods sourced from certified farms worldwide.",
    tagline: "From farm to global table",
    image: "/images/agri.jpg",
    description:
      "We trade in a comprehensive range of agricultural commodities and processed food products — grains, pulses, spices, oilseeds, sugar, rice, and fresh produce. Our sourcing network spans certified farms across South Asia, Southeast Asia, and Africa, with full phytosanitary and food safety compliance.",
    range: [
      "Grains & Pulses (wheat, rice, lentils, chickpeas)",
      "Spices & Condiments (turmeric, pepper, cumin, coriander)",
      "Oilseeds & Edible Oils",
      "Sugar, Jaggery & Sweeteners",
      "Fresh & Frozen Produce",
      "Processed & Packaged Foods",
    ],
    certifications: "FSSAI, HACCP, ISO 22000, Organic Certified",
  },
  {
    slug: "textiles-apparel",
    badge: "Textiles",
    title: "Textiles & Apparel",
    short: "Raw yarn, greige fabric, finished garments, and technical textiles from leading mills.",
    tagline: "Fabric of global commerce",
    image: "/images/textiles.jpg",
    description:
      "Our textiles division covers the full spectrum — from raw yarn and greige fabric to finished garments and technical textiles. We work with mills and manufacturers in India, Bangladesh, Vietnam, and Turkey, offering competitive pricing, quality inspection, and compliance with international labelling and safety standards.",
    range: [
      "Cotton, Polyester & Blended Fabrics",
      "Ready-Made Garments (RMG)",
      "Denim, Knits & Wovens",
      "Technical & Industrial Textiles",
      "Home Textiles (bedding, towels, curtains)",
      "Yarn & Fibre",
    ],
    certifications: "OEKO-TEX, GOTS, ISO 9001, WRAP",
  },
  {
    slug: "industrial-machinery",
    badge: "Machinery",
    title: "Industrial Machinery",
    short: "Construction, food processing, textile, and precision engineering equipment.",
    tagline: "Powering production worldwide",
    image: "/images/machinery.jpg",
    description:
      "We source and export a wide range of industrial machinery and equipment — from construction and mining equipment to food processing lines, textile machinery, and precision engineering tools. Our technical team assists with specifications, factory audits, and after-sales support coordination.",
    range: [
      "Construction & Earthmoving Equipment",
      "Food Processing & Packaging Machinery",
      "Textile & Garment Machinery",
      "Agricultural Equipment & Implements",
      "Precision Engineering Tools",
      "Pumps, Compressors & Industrial Systems",
    ],
    certifications: "CE Marked, ISO 9001, BIS Certified",
  },
  {
    slug: "raw-materials",
    badge: "Materials",
    title: "Raw Materials",
    short: "Minerals, metals, ores, chemicals, and construction materials in bulk volumes.",
    tagline: "The building blocks of industry",
    image: "/images/materials.jpg",
    description:
      "Eximeria trades in bulk raw materials and industrial inputs — minerals, metals, ores, chemicals, and construction materials. We manage large-volume shipments with full documentation, assay reports, and logistics coordination from mine or plant to destination port.",
    range: [
      "Iron Ore, Bauxite & Mineral Ores",
      "Ferrous & Non-Ferrous Metals",
      "Industrial Chemicals & Solvents",
      "Construction Materials (cement, aggregates)",
      "Plastic Granules & Polymers",
      "Rubber & Latex",
    ],
    certifications: "SGS Inspected, ISO 9001, REACH Compliant",
  },
  {
    slug: "consumer-goods",
    badge: "FMCG",
    title: "Consumer Goods",
    short: "FMCG, electronics, household products, and branded merchandise for global retail.",
    tagline: "Retail-ready, globally sourced",
    image: "/images/consumer.jpg",
    description:
      "Our consumer goods division handles FMCG, electronics, household products, personal care, and branded merchandise for retail chains, distributors, and e-commerce platforms worldwide. We manage product compliance, labelling, and last-mile logistics.",
    range: [
      "FMCG & Packaged Consumer Products",
      "Electronics & Electrical Appliances",
      "Household & Kitchen Products",
      "Personal Care & Hygiene Products",
      "Stationery & Office Supplies",
      "Toys, Sports & Leisure Goods",
    ],
    certifications: "CE, RoHS, BIS, ISO 9001",
  },
];

export type IconName =
  | "globe" | "truck" | "shield" | "document" | "chart" | "banknote"
  | "mail" | "phone" | "clock" | "check" | "chat" | "badge";

export type Service = {
  slug: string;
  title: string;
  icon: IconName;
  description: string;
  included: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "import-export",
    title: "Import & Export Management",
    icon: "globe",
    description:
      "We handle the complete import and export cycle — from supplier identification and price negotiation to order management, quality inspection, and shipment coordination. Whether you're a first-time importer or a seasoned exporter, our trade desk manages complexity on your behalf.",
    included: [
      "Supplier identification and vetting",
      "Price negotiation and contract management",
      "Purchase order and proforma invoice handling",
      "Pre-shipment quality inspection",
      "Export packing and marking compliance",
      "Multi-origin consolidation",
    ],
  },
  {
    slug: "freight-logistics",
    title: "Freight & Logistics",
    icon: "truck",
    description:
      "We coordinate sea freight, air freight, and multimodal transport across all major global trade lanes. Our logistics team works with a network of freight forwarders, shipping lines, and inland transport providers to ensure cost-effective, on-time delivery.",
    included: [
      "FCL and LCL sea freight",
      "Air freight for time-sensitive cargo",
      "Multimodal and intermodal transport",
      "Port-to-port and door-to-door delivery",
      "Freight insurance and cargo protection",
      "Real-time shipment tracking",
    ],
  },
  {
    slug: "regulatory-compliance",
    title: "Regulatory Compliance",
    icon: "shield",
    description:
      "International trade is governed by a complex web of regulations — import duties, export controls, product standards, and country-specific requirements. Our compliance team ensures your shipments meet all applicable regulations, minimising the risk of delays, penalties, or seizures.",
    included: [
      "Import and export licensing",
      "Sanctions and restricted-party screening",
      "Product certification and standards compliance",
      "Country-of-origin determination",
      "Anti-dumping and countervailing duty analysis",
      "Trade agreement tariff optimisation",
    ],
  },
  {
    slug: "documentation-customs",
    title: "Documentation & Customs",
    icon: "document",
    description:
      "Accurate, complete documentation is the backbone of smooth international trade. We prepare and manage all trade documents — from commercial invoices and packing lists to certificates of origin, letters of credit, and customs declarations.",
    included: [
      "Commercial invoice and packing list preparation",
      "Bill of lading and airway bill management",
      "Certificate of origin (CO) and GSP forms",
      "Letter of credit (LC) management",
      "Customs entry and clearance filing",
      "Phytosanitary and health certificates",
    ],
  },
  {
    slug: "supply-chain",
    title: "Supply Chain Management",
    icon: "chart",
    description:
      "We help businesses build resilient, cost-efficient supply chains by identifying the right sourcing markets, optimising procurement cycles, and managing supplier relationships — at both the strategic and day-to-day level.",
    included: [
      "Sourcing market analysis and benchmarking",
      "Supplier qualification and audit management",
      "Inventory and lead-time optimisation",
      "Multi-supplier risk diversification",
      "Procurement process outsourcing",
      "Ongoing supplier performance monitoring",
    ],
  },
  {
    slug: "trade-finance",
    title: "Trade Finance Support",
    icon: "banknote",
    description:
      "We assist buyers and sellers in structuring and navigating trade finance instruments — letters of credit, bank guarantees, documentary collections, and open account terms. Our team liaises with banks and financial institutions to facilitate smooth payment flows.",
    included: [
      "Letter of credit (LC) advisory and structuring",
      "Bank guarantee and standby LC support",
      "Documentary collection (D/P and D/A)",
      "Open account and advance payment terms",
      "Trade credit insurance guidance",
      "Payment term negotiation support",
    ],
  },
];

export const STATS = [
  { value: "50+", label: "Countries" },
  { value: "100+", label: "Product Lines" },
  { value: "20+", label: "Logistics Partners" },
  { value: "100%", label: "Satisfied Customers" },
];

export const HOME_WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "globe", title: "End-to-End Trade Management", text: "From supplier identification to final delivery, we own every step of the trade cycle." },
  { icon: "shield", title: "Compliance-First Operations", text: "Every shipment is screened for regulatory compliance, sanctions, and product standards before it moves." },
  { icon: "truck", title: "Global Freight Network", text: "Sea, air, and multimodal freight across all major trade lanes with real-time tracking." },
  { icon: "badge", title: "Verified Supplier Network", text: "500+ pre-qualified suppliers across 50 countries, audited for quality and reliability." },
];

export const REGIONS = [
  { title: "South & Southeast Asia", countries: "India, Bangladesh, Vietnam, Thailand, Indonesia" },
  { title: "Middle East & Africa", countries: "UAE, Saudi Arabia, Kenya, South Africa, Egypt" },
  { title: "Europe & CIS", countries: "Germany, Turkey, Poland, Ukraine, Kazakhstan" },
  { title: "Americas & Oceania", countries: "USA, Brazil, Canada, Australia, Mexico" },
];

export const STEPS = [
  { title: "Submit Your Inquiry", text: "Tell us what you need — product type, quantity, destination, and timeline. Our trade specialists respond within 24 hours." },
  { title: "Sourcing & Quotation", text: "We identify verified suppliers, conduct quality checks, and provide a competitive landed-cost quotation." },
  { title: "Documentation & Compliance", text: "We handle all export/import documentation, customs clearance, and regulatory compliance for your shipment." },
  { title: "Shipment & Delivery", text: "Your goods are shipped via the optimal route — sea, air, or land — with real-time tracking until delivery." },
];

export const SERVICES_WHY = [
  { title: "Years of Trade Expertise", text: "Deep domain knowledge across five trade verticals and 50+ countries." },
  { title: "End-to-End Ownership", text: "We manage the full trade cycle — no handoffs, no gaps, no surprises." },
  { title: "Compliance-First Approach", text: "Every shipment is screened for regulatory compliance before it moves." },
  { title: "Dedicated Trade Desk", text: "A named trade specialist handles your account from inquiry to delivery." },
];

export const VALUES = [
  { letter: "I", title: "Integrity", text: "We operate with full transparency — in pricing, documentation, and every commitment we make to clients and partners." },
  { letter: "P", title: "Precision", text: "Trade leaves no room for error. We apply rigorous standards to every shipment, document, and compliance check." },
  { letter: "P", title: "Partnership", text: "We don't just execute transactions — we build long-term relationships with clients, suppliers, and freight partners worldwide." },
  { letter: "A", title: "Agility", text: "Markets move fast. Our team adapts quickly to regulatory changes, supply disruptions, and evolving client needs." },
];

export const APART = [
  { title: "Years of Trade Expertise", text: `${SITE.yearsInBusiness}+ years of navigating complex trade lanes, regulatory frameworks, and market shifts across 50+ countries.` },
  { title: "Verified Supplier Network", text: "Every supplier in our network is audited for quality, compliance, and reliability — so you never have to take a risk on an unknown source." },
  { title: "End-to-End Ownership", text: "From sourcing to final delivery, we own the entire trade cycle. One point of contact. Zero handoff gaps." },
  { title: "Compliance-First Approach", text: "Sanctions screening, product certification, customs documentation — every shipment is cleared before it moves." },
  { title: "Multi-Modal Freight Network", text: "Sea, air, and road freight across all major trade corridors, with real-time tracking and dedicated freight managers." },
  { title: "Sector Depth Across 5 Verticals", text: "Agri & Food, Textiles, Machinery, Raw Materials, and Consumer Goods — deep expertise in every category we trade." },
];

export const ROLES = ["Buyer / Importer", "Seller / Exporter", "Distributor / Retailer", "Other"];
