import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <section className="page-hero page-hero--center" style={{ padding: "80px 0" }}>
        <div className="container">
          <h1 className="h1" style={{ fontSize: 44 }}>Privacy Policy</h1>
        </div>
      </section>
      <section className="section section--white">
        <div className="container prose">
          <p>This placeholder policy explains how {SITE.name} handles information you share through this website. Have it reviewed by a legal professional before launch.</p>
          <h2>What we collect</h2>
          <p>When you submit the enquiry form we receive your name, email address, and, if you provide them, your phone number, company name, product category and enquiry details.</p>
          <h2>How we use it</h2>
          <p>We use this information only to respond to your enquiry and to provide quotations or trade services you request. We do not sell your information.</p>
          <h2>Retention</h2>
          <p>Enquiries are kept in our business email for as long as needed to serve you and meet legal record-keeping obligations.</p>
          <h2>Contact</h2>
          <p>
            Questions about this page? Email <a className="gold" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
