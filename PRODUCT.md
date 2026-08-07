# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Thai contractors, engineers, procurement teams, and property or facility owners who need construction and engineering supplies, on-site technical services, or both. They typically arrive with a drawing, bill of materials, site photograph, product list, or an initial description of the job and need help identifying the appropriate next step.

## Product Purpose

SBCC Engineering & Supply helps customers obtain suitable engineering and construction products and arrange related on-site work. The website should make it easy to understand the available products and services, share project information, receive practical guidance, and request a prompt quotation.

Success means a prospective customer can move from an incomplete or technical requirement to a well-scoped inquiry or quotation request without needing to know specialist terminology in advance.

## Positioning

One SBCC team can advise on specifications, supply the required products, assess site conditions, perform installation or field work, and prepare an urgent quotation. Product supply and execution are handled with a shared understanding of the real jobsite requirement rather than as disconnected transactions.

## Operating Context

- Customers may begin with drawings, material schedules, photographs, requested product models, quantities, site constraints, or a preliminary description.
- SBCC reviews specifications, quantities, site conditions, and timing before recommending the next step or preparing a quotation.
- Customers contact the team through LINE, telephone, email, or the website quotation form.
- The business serves projects including buildings, factories, educational institutions, government organizations, and infrastructure work.
- The website is Thai-first and supports customers seeking nationwide product delivery or on-site services.

## Capabilities and Constraints

- Supplies engineering and construction products, including chemical anchors, rebar anchoring chemicals, bolts, nuts, washers, steel channels, support systems, and related equipment.
- Provides field services including chemical-anchor installation, rebar drilling and installation, concrete coring, floor repair, and Hilti system installation.
- Provides specification guidance, site assessment, work planning, product supply, installation, and quotation support.
- Built as a focused static Astro website with TypeScript, GSAP enhancements, and sitemap generation.
- Keep the published site limited to the reviewed primary product, service, company, contact, privacy, and quotation routes. Legacy project URLs redirect to the Facebook portfolio; legacy article URLs redirect to the external article archive.
- Do not fabricate product specifications, certifications, client names, project outcomes, testimonials, pricing, delivery times, or service coverage not supported by verified source material.

## Brand Commitments

- Brand name: SBCC Engineering & Supply.
- Legal name: บริษัท เอสบีซีซี เอ็นจิเนียริ่ง แอนด์ ซัพพลาย จำกัด.
- Thai-first communication using clear, practical language that does not require customers to know technical terminology before making contact.
- Preserve the current verified telephone, LINE, email, and business details defined in `src/config/site.ts`.
- Preserve the current product and service scope unless the business confirms a change.

## Evidence on Hand

- Existing product and service content in `src/data/catalog.ts`.
- Selected project and jobsite imagery retained for the homepage evidence grid in `public/legacy-assets/` and `public/images/`.
- The homepage links to SBCC's existing Facebook project portfolio.
- Brand logo at `public/images/sbcc-logo.png`.
- No verified testimonials, performance benchmarks, customer logos, certifications, pricing, or quantified project outcomes are currently established as approved evidence; future work must not invent them.

## Product Principles

1. Start from the customer's real job, even when the inquiry is incomplete or non-technical.
2. Connect product selection with site execution so recommendations remain practical.
3. Make urgent contact and quotation requests direct and easy to complete.
4. Build trust with verifiable products, services, and project evidence rather than unsupported promotional claims.
5. Preserve Thai-first clarity while retaining precise engineering terminology where customers need it.

## Accessibility & Inclusion

No product-specific accessibility standard has been confirmed. Treat the required conformance level as an open decision; continue supporting semantic structure, keyboard access, reduced motion, readable Thai typography, and responsive use as baseline product requirements.
