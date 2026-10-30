import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { APART, SITE, VALUES } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Built on trust, driven by trade. Learn about Eximeria Trading Co.'s mission, vision and values.",
};

export default function AboutPage() {
  return (
    <>
      {/* 8.1 Page hero */}
      <section className="page-hero page-hero--center">
        <div className="container">
          <Reveal>
            <span className="eyebrow">About Eximeria</span>
            <h1 className="h1">Built on Trust. Driven by Trade.</h1>
            <p className="lead">
              For over {SITE.yearsInBusiness} years, Eximeria Trading Co. has connected businesses across continents —
              delivering reliable sourcing, compliant logistics, and end-to-end trade management at scale.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8.2 Mission / Vision */}
      <section className="section section--white">
        <div className="container split mv">
          <Reveal>
            <span className="eyebrow">Our Mission</span>
            <h2>Simplifying global trade for every business.</h2>
            <p>
              Our mission is to make international trade accessible, transparent, and efficient for businesses of every
              size — from first-time importers to established exporters managing complex multi-market supply chains.
            </p>
            <p>
              We handle the complexity so our clients can focus on growth. Every shipment we manage is backed by rigorous
              compliance checks, verified supplier relationships, and a freight network built for reliability.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="eyebrow">Our Vision</span>
            <h2>A world where borders don&apos;t limit business.</h2>
            <p>
              We envision a global trade ecosystem where any business — regardless of size or geography — can source,
              sell, and ship with the same confidence as the world&apos;s largest trading houses.
            </p>
            <p>
              Eximeria is building that future: one verified supplier, one compliant shipment, and one trusted partnership
              at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 8.3 Core Values */}
      <section className="section section--cream">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">Core Values</span>
            <h2 className="h2">What we stand for.</h2>
          </Reveal>
          <div className="grid-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="value-card">
                <span className="icon-tile">{v.letter}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8.4 What Sets Us Apart */}
      <section className="section section--dark">
        <div className="container">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">Why Eximeria</span>
            <h2 className="h2">What sets us apart.</h2>
            <p className="lead">
              Hundreds of trading companies exist. Very few combine the compliance depth, supplier reach, and operational
              precision that Eximeria brings to every trade.
            </p>
          </Reveal>
          <div className="grid-3">
            {APART.map((a, i) => (
              <Reveal key={a.title} delay={i * 70} className="dark-card">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8.5 CTA band (full-bleed, ink text) */}
      <section className="cta-full">
        <div className="container">
          <Reveal>
            <h2>Ready to trade with confidence?</h2>
            <p>Let&apos;s talk about your sourcing or export requirements.</p>
            <Link href="/contact" className="btn btn--dark">
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
