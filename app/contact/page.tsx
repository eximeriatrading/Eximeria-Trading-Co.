import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send Eximeria Trading Co. a trade enquiry. Our trade desk replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* 9.1 Hero */}
      <section className="page-hero page-hero--center">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Contact Us</span>
            <h1 className="h1">Let&apos;s Talk Trade.</h1>
            <p className="lead">
              Whether you&apos;re looking to source products or expand into new markets, our trade desk is ready to help.
              Fill in the form and we&apos;ll get back to you within 24 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 9.2 Reach us + enquiry form */}
      <section className="section section--white">
        <div className="container contact-grid">
          <Reveal>
            <span className="eyebrow">Reach Us Directly</span>
            <h2 className="h2" style={{ fontSize: 28 }}>Get in touch directly.</h2>
            <p className="lead">
              Prefer to reach us directly? Use the details below. Our trade desk is available Monday to Saturday.
            </p>
            <div className="info-card">
              <span className="icon-tile"><Icon name="mail" /></span>
              <div>
                <div className="info-card__label">Email</div>
                <a className="info-card__value" href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
            <div className="info-card">
              <span className="icon-tile"><Icon name="phone" /></span>
              <div>
                <div className="info-card__label">Phone</div>
                <a className="info-card__value" href={SITE.phoneHref}>{SITE.phoneDisplay}</a>
              </div>
            </div>
            <div className="info-card">
              <span className="icon-tile"><Icon name="clock" /></span>
              <div>
                <div className="info-card__label">Working Hours</div>
                <span className="info-card__value">{SITE.hours}</span>
                <p className="info-card__note">Typical response within 24 hours</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="eyebrow">Send an Enquiry</span>
            <h2 className="h2" style={{ fontSize: 28 }}>Start a conversation.</h2>
            <p className="lead">Tell us about your trade requirement and we&apos;ll match you with the right solution.</p>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      {/* 9.3 Not ready band */}
      <section className="cta-dark">
        <div className="container">
          <h2>Not ready to enquire yet?</h2>
          <p>Explore our product categories or trade services first.</p>
          <div className="btn-row">
            <Link href="/products" className="btn btn--primary">Browse Products</Link>
            <Link href="/services" className="btn btn--text">View Services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
