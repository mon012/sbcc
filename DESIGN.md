---
name: SBCC Engineering & Supply
description: A photo-led construction system that turns real jobsite evidence into a practical next action.
colors:
  construction-ink: "#0e1b26"
  engineering-navy: "#07345f"
  deep-site-navy: "#032846"
  paper: "#f4f7f8"
  surface: "#ffffff"
  field-muted: "#5b6872"
  structural-line: "#d8e0e4"
  technical-blue: "#93bfcd"
  pale-blue: "#dcebf0"
  action-orange: "#ff5a1f"
  action-orange-deep: "#d83f0a"
typography:
  display:
    fontFamily: "Noto Sans Thai, Arial, sans-serif"
    fontSize: "clamp(3rem, 6.2vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Noto Sans Thai, Arial, sans-serif"
    fontSize: "clamp(2.25rem, 4.1vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Noto Sans Thai, Arial, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Noto Sans Thai, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  surface: "0.875rem"
  compact: "0.6rem"
  pill: "999px"
  circle: "50%"
spacing:
  hairline: "1px"
  compact: "0.8rem"
  card: "1.6rem"
  shell-gutter: "28px"
  shell-gutter-mobile: "16px"
  section: "clamp(5.5rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.45rem"
    height: "54px"
  button-primary-hover:
    backgroundColor: "{colors.action-orange-deep}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.engineering-navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.8rem 1.45rem"
    height: "54px"
  content-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.construction-ink}"
    rounded: "{rounded.surface}"
    padding: "{spacing.card}"
---

# Design System: SBCC Engineering & Supply

## Overview

**Creative North Star: "The Site Photo Is the Brief"**

SBCC lives inside the scale and material reality of construction: deep navy jobsite photography, oversized white Thai type, clean white working fields, pale technical blue, and one decisive orange action. The system makes an incomplete inquiry feel actionable. A visitor can arrive with only a site photograph and immediately understand what to do next.

This is a photo-led construction standard, not a generic contractor homepage assembled from interchangeable cards. Real website photography establishes the world; typography, rules, and linked rows organize it. The visual system is practical, direct, evidence-led, and calm enough to support technical decisions without becoming corporate or sterile.

**Key Characteristics:**

- Full-bleed, deep-navy construction photography as the primary atmospheric material.
- Oversized Thai headlines that state the practical next step in plain language.
- Clean white and pale-blue fields structured by sparse one-pixel rules.
- Bright orange reserved for high-intent contact and quotation actions.
- Real project and product evidence presented without invented proof or decorative framing.

## Colors

The palette moves from the darkness of a real jobsite into clean working surfaces, with technical blue for quiet support and orange for action.

### Primary

- **Action Orange** (`#ff5a1f`): The decisive contact color for LINE, quotation, and other high-intent actions. Its rarity preserves urgency.
- **Deep Action Orange** (`#d83f0a`): Hover and active feedback for orange actions; never a second decorative accent.

### Secondary

- **Engineering Navy** (`#07345f`): Brand-bearing dark fields, image fallbacks, and supporting emphasis.
- **Technical Blue** (`#93bfcd`): Focus outlines and compact informational accents such as footer labels.
- **Pale Technical Blue** (`#dcebf0`): Quiet evidence and informational section fields.

### Neutral

- **Deep Site Navy** (`#032846`): The deepest photographic treatment, service field, footer, and mobile action foundation.
- **Construction Ink** (`#0e1b26`): Primary text on light surfaces.
- **Cool Paper** (`#f4f7f8`): Cool page-neutral surface where a subtle distinction from white is needed.
- **Surface White** (`#ffffff`): Main content ground and readable content panels.
- **Field Muted** (`#5b6872`): Supporting copy on light surfaces.
- **Structural Line** (`#d8e0e4`): Sparse dividers, grid seams, and boundaries.

### Named Rules

**The One Orange Move Rule.** Orange identifies the action that advances the job. Do not distribute it across decoration, headings, or passive surfaces.

**The Navy-to-White Rule.** Use deep photographic navy to establish the work, then move into clear white or pale-blue fields to explain the next step.

## Typography

**Display Font:** Noto Sans Thai (self-hosted weights 500–900, with Arial and sans-serif fallback)  
**Body Font:** Arial (with Helvetica and sans-serif fallback)

**Character:** Noto Sans Thai is dense, modern, and assured at construction scale. Arial keeps explanations, requirements, and contact guidance neutral and fast to read.

### Hierarchy

- **Display** (800, responsive to 6rem, 1.08): Hero statements and the largest page-level declarations; the homepage hero may use 700 for a more open photographic composition.
- **Headline** (800, responsive to 4.75rem, 1.08): Section decisions, capability statements, and conversion closures.
- **Title** (700, 1.45rem, 1.08): Product, service, and component headings.
- **Body** (400, 1rem, 1.65): Practical instructions and descriptive copy; lead copy grows responsively and stays near 720px maximum width.
- **Label** (700, 0.82rem, 1.2): Navigation, buttons, linked rows, and compact operational UI.

### Named Rules

**The Two-Voice Rule.** Use Noto Sans Thai for headings, navigation, actions, and emphasized UI; use Arial or the system sans stack for explanatory body copy.

**The Heading-Starts-the-Section Rule.** Do not place a kicker, eyebrow, or tiny category label above a heading. The heading carries the hierarchy itself.

## Layout

The shared shell is capped at 1240px with 28px desktop gutters and 16px mobile gutters. Sections use a generous responsive vertical rhythm, while internal structures stay precise: split image-and-copy capabilities, rule-separated intake steps, and dense project evidence grids. Large fields are allowed to touch viewport edges when photography or a tonal section needs full scale.

The homepage navigation overlays the hero so the photograph owns the first viewport; all other routes use a solid, sticky white header. At 980px the desktop navigation becomes a menu control. Capability splits stack below 860px, catalog grids move from one to two columns at 640px and to four at 1024px, and the fixed mobile actions appear below 760px.

On small screens, preserve the photographic opening, a readable two-line Thai action statement, and the immediate LINE action. The bottom action bar must keep three distinct jobs visible: urgent call, send a site photo by LINE, and request a quote from a drawing or BOM.

## Elevation & Depth

The system is flat by default. Depth comes from photography, dark-to-light field transitions, crop scale, and one-pixel seams. The single shared shadow is reserved for the open mobile navigation panel (`0 24px 70px rgba(3, 40, 70, 0.14)`); cards and evidence tiles do not float.

### Shadow Vocabulary

- **Mobile Menu Overlay** (`0 24px 70px rgba(3, 40, 70, 0.14)`): The open mobile navigation panel only.

### Named Rules

**The Evidence Stays Flat Rule.** Real photography does not need a decorative shadow, glass surface, or floating card to feel important.

## Shapes

Actions use full pills, and compact directional links use circular arrow boundaries. Broad content and photographic fields remain restrained or square; the shared surface radius is modest rather than soft or playful. Borders are one pixel and cool gray-blue. Large media clips cleanly, while authored line arrows provide the repeated directional geometry.

**The Pill Means Action Rule.** Reserve pills for controls and high-intent actions. Do not turn labels, cards, sections, or passive metadata into pills.

## Components

### Buttons

- **Shape:** Full pill with a 54px minimum height; compact header actions may use 44px.
- **Primary:** Action Orange with white, bold Noto Sans Thai and generous horizontal padding.
- **Hover / Focus:** Lift 2–3px, deepen to Deep Action Orange, and retain a visible 3px Technical Blue focus outline.
- **Secondary:** Transparent with an Engineering Navy border and text; invert to navy with white text on hover.
- **Footer Pairing:** Place the outlined quotation action beside the orange LINE action in the footer conversion block; on narrow screens the pair may wrap without changing action priority.

### Cards / Containers

- **Character:** Evidence or content first, not a default homepage composition.
- **Corner Style:** Modest rounding for reusable catalog cards; project evidence and split capabilities stay square.
- **Background:** Surface White on light fields; Deep Site Navy for service and footer fields.
- **Shadow Strategy:** None at rest.
- **Border:** Structural Line used as a sparse divider or one-pixel joined-grid seam.
- **Image State:** A restrained 1.025–1.045 scale on hover without lifting the container.
- **Pending Product Content:** Use a pale-blue, non-decorative placeholder and omit the product-detail section until approved content is available. Never substitute unrelated imagery or invent specifications.
- **Pending Service Content:** Apply the same placeholder and omission pattern to new services until their scope, imagery, and technical details are approved.

### Navigation

The homepage header is transparent and overlays the hero photograph in white. Other pages use a solid, sticky white header with Deep Site Navy text. Desktop links use 1.0075rem semibold Noto Sans Thai and a one-pixel authored underline reveal. Below 980px, a pill menu control opens a full-width white panel; the LINE row remains orange.

The footer LINE QR is 144px square. When the footer collapses to one column at 600px and below, center the QR block while keeping contact details left-aligned.

### Directional Links

Text links and capability rows pair a clear Thai label with the authored `ArrowIcon` line SVG. Use right, down, or up-right direction according to destination; do not substitute emoji, Unicode arrows, or icon-font glyphs.

### Mobile Action Bar

Below 760px, a fixed three-column Deep Site Navy bar remains available. Each column has a distinct job and two-level label; the center “send site photo by LINE” action is orange. Do not collapse these three intents into three visually identical generic links.

### Project Evidence

Use real existing website photography with decisive crops. The homepage evidence grid presents unlabelled, non-interactive images; visitors continue to the Facebook portfolio through the explicit link below the grid. Do not generate substitute project evidence or attach unsupported clients, metrics, certifications, or outcomes.

## Do's and Don'ts

### Do:

- **Do** start the visual world with real construction photography and let its structural scale lead the composition.
- **Do** use large white Thai type over a controlled Deep Site Navy image treatment when text overlays photography.
- **Do** move from the photographic opening into clean white and pale-blue working fields.
- **Do** keep Orange focused on LINE, quotation, and other actions that advance the job.
- **Do** use the authored SVG arrow language for directional controls and links.
- **Do** preserve keyboard focus, readable Thai line breaks, reduced-motion behavior, and the fixed mobile contact jobs.

### Don't:

- **Don't** fall back to a generic card-first contractor homepage.
- **Don't** place kickers, eyebrows, or small category labels above headings.
- **Don't** use generated or stock imagery in place of real existing website photography.
- **Don't** turn passive labels, content blocks, or metadata into pills.
- **Don't** decorate surfaces with gradients; gradients are allowed only as photographic readability treatments.
- **Don't** fabricate technical proof, client claims, project outcomes, or service promises.
