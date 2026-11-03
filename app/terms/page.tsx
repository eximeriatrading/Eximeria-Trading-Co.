import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <>
      <section className="page-hero page-hero--center" style={{ padding: "80px 0" }}>
        <div className="container">
          <h1 className="h1" style={{ fontSize: 44 }}>Terms of Use</h1>
        </div>
      </section>
      <section className="section section--white">
        <div className="container prose">
          <p>These placeholder terms govern use of the {SITE.name} website. Have them reviewed by a legal professional before launch.</p>
          <h2>Information on this site</h2>
          <p>Content on this website is provided for general information. Product availability, certifications, pricing and lead times are confirmed only in a written quotation.</p>
          <h2>Enquiries</h2>
          <p>Submitting an enquiry does not create a contract. Any trade is governed by the agreement signed between the parties.</p>
          <h2>Liability</h2>
          <p>To the extent permitted by law, {SITE.name} is not liable for losses arising from use of this website.</p>
          <h2>Contact</h2>
          <p>
            Questions about this page? Email <a className="gold" href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
