import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import ServiceTabs from "@/components/ServiceTabs";
import { SERVICES, SERVICES_WHY, SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Import & export management, freight & logistics, compliance, documentation, supply chain and trade finance support.",
};

export default function ServicesPage() {
  return (
    <>
      {/* 7.1 Page hero */}
      <section className="page-hero">
        <div className="page-hero__bg" style={{ backgroundImage: "url(/images/services-hero.jpg)" }} />
        <div className="container">
          <span className="eyebrow-pill">Trade Services</span>
          <h1 className="h1">
            Full-Spectrum Trade
            <br />
            Support.
          </h1>
          <p className="lead">
            From sourcing and compliance to freight and final delivery — we manage every step of the international trade
            journey so you can focus on your business.
          </p>
        </div>
      </section>

      {/* 7.2 / 7.3 Service areas */}
      <section className="section section--white">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">What We Do</span>
            <h2 className="h2">Our Service Areas</h2>
          </Reveal>
          <ServiceTabs />
        </div>
      </section>

      {/* 7.4 Full Service Range */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="section-head">
            <span className="eyebrow">Full Service Range</span>
            <h2 className="h2">Everything you need to trade globally</h2>
          </Reveal>
          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <a href={`#${s.slug}`} className="svc-card" style={{ height: "100%" }}>
                  <span className="icon-tile">
                    <Icon name={s.icon} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5 Why Eximeria */}
      <section className="section section--dark">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Why Eximeria</span>
            <h2 className="h2">One partner. Every trade need.</h2>
            <p className="lead" style={{ color: "var(--text-on-dark)" }}>
              We&apos;ve spent {SITE.yearsInBusiness} years building the networks, processes, and expertise that make
              international trade predictable. Our clients don&apos;t manage logistics — they manage their business.
            </p>
          </Reveal>
          <div className="grid-2">
            {SERVICES_WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 80} className="dark-card bullet-card">
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7.6 CTA band */}
      <div className="cta-wrap">
        <div className="container">
          <Reveal className="cta-band cta-band--center">
            <h2>Ready to simplify your trade operations?</h2>
            <p>
              Talk to our trade specialists about your import or export requirements. We&apos;ll design a service package
              that fits your business.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--inverse">
                Speak to a Trade Specialist <span className="arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
