import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE } from "@/lib/content";
import { getSiteUrl, isIndexable } from "@/lib/site-url";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_URL = getSiteUrl();
const DESCRIPTION =
  "Eximeria Trading Co. connects global buyers and sellers across agri, textiles, machinery, raw materials, and consumer goods, with precision, compliance, and scale.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eximeria Trading Co. | Global Import & Export Trading",
    template: "%s | Eximeria Trading Co.",
  },
  description: DESCRIPTION,
  applicationName: SITE.name,
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Eximeria Trading Co. | Global Import & Export Trading",
    description: DESCRIPTION,
    locale: "en_IN",
    images: [{ url: "/images/hero-port-poster.jpg", width: 1280, height: 720, alt: "Container port at dusk" }],
  },
  twitter: { card: "summary_large_image" },
  // Google Search Console's "HTML tag" verification: paste only the content="..." value into this env var.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

// Structured data so search engines can show the company name, logo and contact details.
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: SITE.email,
  telephone: SITE.phoneHref.replace("tel:", ""),
  description: DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phoneHref.replace("tel:", ""),
    availableLanguage: ["English"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
