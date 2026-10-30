# Eximeria Trading Co. — Marketing Website

Next.js 14 (App Router) + TypeScript site built from the *Eximeria UI/UX Documentation*.
Five pages (Home, Products, Services, About, Contact), plus Privacy, Terms and a 404 page.
The contact form sends enquiries by email over SMTP (Nodemailer).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in SMTP credentials (see below)
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`, or deploy the folder to Vercel and add the same
environment variables in the project settings.

## Contact form email setup

The form posts to `POST /api/contact` ([app/api/contact/route.ts](app/api/contact/route.ts)), which:

1. validates input (shared rules in [lib/enquiry.ts](lib/enquiry.ts)), with a honeypot field and a per-IP rate limit
2. emails the enquiry to `CONTACT_TO`, with **Reply-To set to the visitor**, so you can just hit Reply
3. sends the visitor a short confirmation email (turn off with `SEND_AUTO_REPLY=false`)

**Using the Gmail inbox `teameximeriatrading@gmail.com`:**

1. Turn on 2-Step Verification for the Google account.
2. Go to Google Account → Security → **App passwords** and create one.
3. Put it in `.env.local` as `SMTP_PASS` (the 16 characters, no spaces).

Any other SMTP provider (Zoho, Google Workspace, Brevo, SendGrid, Amazon SES, Resend SMTP) works:
just change `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER` and `SMTP_PASS`.

If SMTP isn't configured, the form shows a friendly error and the server logs what's missing.

## Pre-filled enquiries

Every CTA passes context to the form:

| Link | Pre-fills |
| --- | --- |
| `/contact?role=buyer` / `?role=seller` | "I am a" |
| `/contact?category=raw-materials` | Product Category |
| `/contact?service=trade-finance` | Service of interest |

Tabs are deep-linkable: `/products#textiles-apparel`, `/services#freight-logistics`.

## Editing content

All copy (categories, services, stats, regions, values, contact details) lives in
[lib/content.ts](lib/content.ts). `SITE.yearsInBusiness` drives every "years of experience" mention.

Images are in `public/images/` (stock photos from Unsplash). Replace them with your own using the
same file names. The logo is an SVG placeholder in [components/Logo.tsx](components/Logo.tsx);
swap in the real logo file there.

Design tokens (colours, fonts, spacing) are CSS variables at the top of [app/globals.css](app/globals.css).

## Project layout

```
app/
  page.tsx               Home
  products/page.tsx      Products (category tabs)
  services/page.tsx      Services (vertical tabs)
  about/page.tsx         About
  contact/page.tsx       Contact
  api/contact/route.ts   Email endpoint
components/              Header, Footer, tabs, form, icons, scroll-reveal
lib/                     content + validation
public/images/           photography
```
