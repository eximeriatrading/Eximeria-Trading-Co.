import type { Metadata } from "next";
import Link from "next/link";
import ProductTabs from "@/components/ProductTabs";
import Reveal from "@/components/Reveal";
import { CATEGORIES, STEPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "Agri & Food, Textiles & Apparel, Industrial Machinery, Raw Materials and Consumer Goods, sourced and delivered worldwide.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      {/* 6.1 Page hero */}
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url(/images/products-hero.jpg)" }} />
        <div className="container">
          <span className="eyebrow-pill">Trade Categories</span>
          <h1 className="h1">
            Every Commodity.
            <br />
            Every Market.
          </h1>
          <p className="lead">
            We source, verify, and deliver across five major trade verticals — connecting certified suppliers with global
            buyers at scale.
          </p>
        </div>
      </section>

      {/* 6.2 / 6.3 Category tabs + detail panel */}
      <section className="section section--white" style={{ paddingTop: 64 }}>
        <div className="container">
          <ProductTabs />
        </div>
      </section>

      {/* 6.4 Browse by Trade Category */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">All Verticals</span>
            <h2 className="h2">Browse by Trade Category</h2>
          </Reveal>
          <div className="cards-center">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.slug} delay={i * 70}>
                <a href={`#${c.slug}`} className="img-card" style={{ height: "100%" }}>
                  <div className="img-card__media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.image} alt="" loading="lazy" />
                  </div>
                  <div className="img-card__body">
                    <h3>{c.title}</h3>
                    <p>{c.tagline}</p>
                    <span className="link-arrow">
                      View details <span>›</span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6.5 How It Works */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">How It Works</span>
            <h2 className="h2">From inquiry to delivery — we handle it all.</h2>
          </Reveal>
          <div className="grid-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="dark-card">
                <span className="num num--muted">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6.6 CTA band */}
      <div className="cta-wrap">
        <div className="container">
          <Reveal className="cta-band cta-band--center">
            <h2>Looking for a specific product?</h2>
            <p>
              Our trade specialists can source virtually any commodity. Send us your requirements and we&apos;ll get back
              within 24 hours.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--inverse">
                Send an enquiry <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
