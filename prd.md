
RentFlow
Rental Management Platform for Landlords & Tenants
FRONTEND PRODUCT REQUIREMENTS DOCUMENT
Frontend-Only Build Phase  ·  React (JavaScript, no TypeScript)  ·  Mock-Data Architecture
Prepared for: Amoo Quadri
Version 1.0  ·  June 2026
 
Table of Contents


1. Executive Summary
RentFlow is a rental management platform that replaces the notebook-and-WhatsApp workflow Nigerian and African landlords currently use to track rent, with a single branded product: landlords manage properties, units and tenants from one dashboard, while tenants pay rent, view their lease and log maintenance requests from their own portal.
Scope of this document: This PRD covers the FRONTEND ONLY. The goal is to ship a complete, production-grade, fully responsive React interface — marketing site plus both dashboards — wired to realistic mock data, with no backend, no real authentication, and no TypeScript. Every screen should look and feel like a finished product an investor or paying customer could use today. The backend (Node.js/Express, PostgreSQL, Paystack, etc.) will be built in a separate phase and is intentionally out of scope here.
This PRD is written to be handed directly to an AI coding agent (see Section 19) and should be saved as prd.md in the root of the project so the agent can reference it throughout the build.
1.1 What “production-level” means for this phase
•	Every one of the ~39 routes listed in Section 5 is built, styled, responsive and animated — not a wireframe.
•	A consistent design system (Section 4) is applied everywhere; no ad-hoc colors, fonts or spacing.
•	All data on screen comes from a mock service layer (Section 14) that behaves like a real API — loading states, empty states and error states all exist.
•	The UI is built so that swapping mock services for real API calls later requires touching only the service layer, not the components.
2. Product Vision & Goals
2.1 Vision
Give every landlord in Africa a professional, trustworthy digital storefront for their rental business, and give every tenant proof, transparency and convenience they have never had before.
2.2 Goals for the frontend phase
•	Replace informal rent tracking with a polished, branded digital experience landlords are proud to send tenants a link to.
•	Build instant trust through design quality — the product should not look like a student project or a generic admin template.
•	Make the two core flows — paying rent and logging a maintenance request — feel effortless, in three clicks or fewer.
•	Produce a frontend codebase clean and modular enough to plug in a real backend later without a rewrite.
•	Produce a portfolio centerpiece: a multi-page, animated, fully responsive product that demonstrates real production React skills.
2.3 Explicitly out of scope for this phase
•	Real authentication / JWT / sessions — simulated with mock login and Zustand-held session state.
•	Real Paystack integration — the pay-rent flow is fully designed and interactive but resolves against mock data.
•	Real email/SMS sending, real file storage, real PDF generation — all stubbed with realistic UI feedback (e.g. “Receipt sent” toast).
•	Server-side logic of any kind.
2.4 Target users
•	Landlords: manage 1–50 properties across Nigeria/Africa, currently using cash, bank transfer, notebooks and WhatsApp groups to track rent.
•	Tenants: want proof of payment, visibility into lease terms and a simple way to report maintenance issues without having to call or visit the landlord.
3. Design Direction & Inspiration
RentFlow should read as an “editorial fintech” product: warm, confident and premium — not another generic purple-to-blue-gradient SaaS template. Pull directly from current best-in-class sources rather than defaulting to bootstrap-style layouts:
•	Awwwards: oversized, confident hero typography; generous whitespace; asymmetric (not perfectly centered) section layouts; scroll-triggered reveals that feel cinematic, not gimmicky.
•	Dribbble: card-based dashboard widgets, soft warm-tinted shadows, 8–12px rounded corners (not pill-everything), tasteful micro-icons next to stat numbers.
•	Behance: editorial photography treatment of African homes/urban life with a warm duotone or grain overlay tying images back to the brand palette, instead of generic stock photography.
•	Landbook / SaaS landing patterns: a proven funnel order — hero → social proof → features → how it works → pricing → final CTA — so visitors are guided rather than dumped into a wall of sections.
•	Figma Community & Canva: rigorous component consistency and accessible color contrast — every button, card and input should look like it came from one disciplined system, not assembled page by page.
3.1 Mood words
Trustworthy · Warm · Modern · Premium · African-rooted · Confident · Uncluttered.
3.2 Explicitly avoid
•	Generic purple-to-blue gradient “AI SaaS” look.
•	Default shadcn/Bootstrap spacing and card styling left unstyled.
•	Stock photography that looks staged or non-African.
•	Dense, cluttered admin-template dashboards with no visual hierarchy.
•	Cold, purely corporate blue-and-white finance-app look.
4. Design System
4.1 Color Palette
Token	Hex	Usage
Primary — Forest Teal	#0B4F45	Primary buttons, links, active nav states, brand mark
Primary Dark	#073A33	Hover/active states, dashboard sidebar background
Accent — Sunclay	#C75B30	Secondary CTAs, highlights, badges, tenant-portal accents
Accent Light	#E79868	Subtle accent backgrounds, hover tints
Warm Background	#FAF7F2	Page background (off-white, never pure white)
Surface / Card	#FFFFFF	Cards, modals, inputs
Charcoal (headings)	#1B1F1D	Headings, high-emphasis text
Body Text	#4A4F4C	Paragraph and label text
Muted Text	#8A8F8B	Captions, placeholders, secondary metadata
Border	#E5E1DA	Hairline borders, dividers
Success	#1E9E6A	Paid / resolved / confirmed states
Warning	#E8A23D	Due soon / pending states
Error	#D14343	Overdue / failed / destructive actions
Info	#3B7DD8	Informational banners, tooltips

Dashboard dark mode (sidebar only, not full app): background #0E2522, text #F4F1EA, active item uses Sunclay accent.
4.2 Typography
•	Display / Headings — Cabinet Grotesk: bold, geometric, distinctive; used for all H1–H3 and hero statements. Tight letter spacing (–2%) on large display sizes.
•	Body — Inter: all paragraph copy, labels, navigation, form fields. Weights 400 / 500 / 600.
•	Numeric / Data — JetBrains Mono: rent amounts, transaction IDs, dates inside tables and receipts — gives a precise, fintech feel that visually distinguishes data from prose.
Both Cabinet Grotesk and JetBrains Mono are free (Fontshare / Google Fonts) and load via @font-face or a CDN link in index.html; Inter loads from Google Fonts.
Style	Size (desktop / mobile)	Weight	Usage
Display / H1	56px / 36px	700	Marketing hero headlines
H2	40px / 28px	700	Section titles
H3	28px / 22px	600	Card titles, sub-sections
H4	20px / 18px	600	Widget titles, form section labels
Body	16px / 16px	400	Paragraphs, descriptions
Small	14px / 14px	400/500	Captions, table cells, helper text
Micro	12px / 12px	500	Badges, timestamps, tags
4.3 Spacing & Grid
•	8px base spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
•	12-column grid. Marketing max content width 1280px; dashboard max content width 1440px. Gutters 24px.
•	Vertical rhythm between marketing sections: 96–128px desktop, 64px mobile.
4.4 Radius, Elevation & Borders
•	Radius scale: 4px (inputs, small chips) · 12px (cards, buttons) · 20px (hero panels, modals) · full (avatars, pill badges).
•	Shadows are soft and warm-tinted (never pure black): sm = 0 1px 2px rgba(27,31,29,0.06); md = 0 8px 24px rgba(27,31,29,0.08); lg = 0 24px 48px rgba(27,31,29,0.12).
•	Card borders: 1px solid #E5E1DA, used together with shadow-sm rather than relying on shadow alone.
4.5 Iconography
lucide-react throughout, 1.5–2px stroke weight, default 20px in body/forms and 24px in nav/dashboard widgets. No mixed icon sets.
4.6 Imagery Style
Warm-toned photography of African homes, courtyards and urban streetscapes, treated with a subtle warm duotone/grain overlay tying every image back to the Forest Teal / Sunclay palette. Where photography isn’t practical (e.g. empty states), use flat geometric line-art illustrations in the same two-color palette — never generic blue-purple SaaS illustrations.
4.7 Core Components — Visual Spec
•	Buttons: primary = filled Forest Teal, 12px radius, white Inter 600 text; secondary = 1.5px Forest Teal outline, transparent fill; ghost = text-only with underline-on-hover; sizes sm (36px) / md (44px) / lg (52px); disabled = 40% opacity; loading = spinner replaces label, button stays fixed width.
•	Inputs: 44px height, 4px radius, 1px #E5E1DA border, focus = 2px Forest Teal ring, error = red border + helper text below in red.
•	Cards: white surface, 12px radius, 1px border + shadow-sm, 24px internal padding, hover (where clickable) lifts –4px with shadow-md.
•	Badges / status pills: full radius, micro text, color-coded background tint at 12% opacity with full-opacity text of the same hue (e.g. Paid = green tint/green text, Overdue = red tint/red text, Pending = amber tint/amber text).
4.8 Motion Principles
•	Micro-interactions (button hover, card lift): 150–200ms, ease-out.
•	Section/page reveals: 400–600ms, custom ease-out-expo-style curve, fade + 16px upward slide.
•	Marketing sections animate in on scroll with staggered children (Framer Motion whileInView), not on every re-render.
•	Route changes animate with a short fade + 8px slide via Framer Motion AnimatePresence.
•	Dashboard: animated count-up on stat-card numbers, skeleton shimmer while mock data “loads,” smooth sidebar collapse/expand, toasts slide in from the top-right.
•	Hero treatment: a subtle animated gradient mesh or floating line-art illustration behind the headline gives Awwwards-grade impact without requiring a 3D library; this keeps the frontend-only build light and dependency-free.
•	All motion respects prefers-reduced-motion — reveals become instant fades, count-ups become static numbers.
5. Information Architecture — Full Sitemap
39 routes total: 15 public marketing pages, 6 authentication/onboarding pages, 11 landlord-dashboard pages and 7 tenant-dashboard pages.
5.1 Marketing site (public)
Route	Page
/	Home
/features	Features overview
/for-landlords	Landlord-focused landing page
/for-tenants	Tenant-focused landing page
/how-it-works	How It Works
/pricing	Pricing
/testimonials	Testimonials & case studies
/about	About Us
/faq	FAQ
/blog	Blog / resources listing
/blog/:slug	Blog post detail
/contact	Contact
/privacy-policy	Privacy Policy
/terms-of-service	Terms of Service
/404	Not Found
5.2 Authentication & onboarding
Route	Page
/login	Login (role-aware)
/signup	Sign up with role selection (Landlord / Tenant)
/forgot-password	Forgot password
/reset-password	Reset password
/verify-email	Verify email notice
/onboarding/invite/:token	Tenant invite acceptance
5.3 Landlord dashboard (protected, role = landlord)
Route	Page
/landlord/dashboard	Overview
/landlord/properties	Properties list
/landlord/properties/new	Add property
/landlord/properties/:id	Property detail (units & tenants)
/landlord/properties/:id/edit	Edit property
/landlord/tenants	Tenants list
/landlord/tenants/:id	Tenant detail
/landlord/payments	Payments / transaction history
/landlord/maintenance	Maintenance requests board
/landlord/reports	Financial reports & analytics
/landlord/notifications	Notifications
/landlord/settings	Account & business settings
5.4 Tenant dashboard (protected, role = tenant)
Route	Page
/tenant/dashboard	Overview
/tenant/lease	My lease
/tenant/pay-rent	Pay rent
/tenant/payments	Payment history & receipts
/tenant/maintenance	Maintenance requests
/tenant/notifications	Notifications
/tenant/settings	Profile settings
6. Marketing Site — Page-by-Page Specifications
Shared marketing shell: sticky transparent-to-solid navbar (logo, Features / For Landlords / For Tenants / Pricing / About links, Log In + role-aware “Get Started” button) and a footer with sitemap columns, social links and a newsletter input. Navbar condenses into a slide-in drawer below 1024px.
6.1  Home
Route: /      Access: Public
Purpose: Convert first-time visitors (landlords or tenants) by clearly explaining what RentFlow does and routing them toward the right path.
Key sections / layout (top to bottom):
•	Hero: oversized headline (“Rent, finally organized.”), one-line subhead, dual CTA (“I’m a Landlord” / “I’m a Tenant”), animated gradient-mesh or line-art background, a floating mock screenshot of the dashboard.
•	Trust strip: logos/stats row (e.g. “2,400+ units managed”, “₦180M+ collected”) — placeholder numbers, styled as real social proof.
•	Problem → solution split section with before/after visual (notebook/WhatsApp vs. RentFlow dashboard).
•	Feature highlight grid (4 cards): Online rent payment, PDF receipts, Maintenance tracking, Financial dashboard.
•	How it works — condensed 3-step visual summary linking to /how-it-works.
•	Testimonial carousel (2–3 quotes).
•	Pricing teaser card linking to /pricing.
•	Final CTA band with the same dual-path buttons as the hero.
Interactions & motion:
•	Hero background subtly animates (slow drifting gradient or parallax line-art) on load and continues looping.
•	Each section fades/slides up as it scrolls into view, staggered by child element.
•	Testimonial carousel auto-advances and supports swipe on mobile.
Tone / copy guidance: Confident, plain-spoken, benefit-first. Avoid jargon; speak directly to the pain of chasing rent over WhatsApp.

6.2  Features
Route: /features      Access: Public
Purpose: Give a complete, scannable tour of every capability for visitors who want depth before signing up.
Key sections / layout (top to bottom):
•	Page header with short intro line.
•	Six feature sections, alternating image-left/image-right layout: Property & Tenant Management, Online Rent Payment, Auto-Generated Receipts, Late Payment Tracking, Maintenance Requests, Financial Dashboard.
•	Each feature section: headline, 2–3 sentence description, bullet list of specifics, supporting screenshot mock.
•	Closing CTA band.
Interactions & motion:
•	Alternating sections reveal on scroll with image and text staggered slightly apart for visual interest.
Tone / copy guidance: Specific and concrete — describe the exact moment a feature helps (e.g. “Tenant taps Pay Rent, gets a receipt before they’ve put their phone away”).

6.3  For Landlords
Route: /for-landlords      Access: Public
Purpose: A dedicated, persuasion-focused landing page for the landlord audience, usable as a standalone ad-traffic destination.
Key sections / layout (top to bottom):
•	Hero tailored to landlord pain points (chasing payments, no visibility across properties).
•	“What you get” 4-card grid focused on landlord-side features and the financial dashboard.
•	Multi-property scaling section: visual showing one dashboard managing many properties.
•	Pricing teaser scoped to landlord plans.
•	FAQ accordion (landlord-specific questions: payouts, fees, security).
•	CTA: “List your first property free”.
Interactions & motion:
•	Accordion items expand/collapse with smooth height animation.
Tone / copy guidance: Speaks to landlords as small business owners; ROI- and time-saved-oriented.

6.4  For Tenants
Route: /for-tenants      Access: Public
Purpose: A dedicated landing page reassuring tenants this is safe, easy and benefits them too — important since tenants are usually invited, not self-signed-up.
Key sections / layout (top to bottom):
•	Hero focused on convenience and proof of payment.
•	3-step “How paying rent works” visual.
•	Trust/security reassurance section (data protection, official receipts).
•	Maintenance request highlight — photo upload and status tracking.
•	FAQ accordion (tenant-specific: is this safe, what if my landlord isn’t on RentFlow yet).
•	CTA: “Ask your landlord about RentFlow” + secondary login link.
Interactions & motion:
•	Step visual animates sequentially as it scrolls into view.
Tone / copy guidance: Warm, reassuring, plain language; tenants are skeptical of new payment apps so trust signals come first.

6.5  How It Works
Route: /how-it-works      Access: Public
Purpose: Walk both landlord and tenant journeys end-to-end in one place.
Key sections / layout (top to bottom):
•	Tab or toggle switch: “For Landlords” / “For Tenants”.
•	Landlord journey: Sign up → Add property → Invite tenant → Track payments → Get paid out.
•	Tenant journey: Receive invite → View lease → Pay rent → Download receipt → Log maintenance.
•	Each step shown as a numbered card with icon, short description and supporting visual.
•	Closing CTA band.
Interactions & motion:
•	Switching the toggle cross-fades between the two journeys rather than reloading the page.
Tone / copy guidance: Procedural and clear; this page should remove any remaining confusion before signup.

6.6  Pricing
Route: /pricing      Access: Public
Purpose: Present landlord pricing tiers clearly and push toward signup; tenants pay nothing.
Key sections / layout (top to bottom):
•	Header with monthly/annual billing toggle (annual shows a discount badge).
•	3-column pricing table: Starter (₦3,000/property/month), Growth/Premium (₦8,000/property/month, bulk SMS + CSV export), and a custom/Enterprise tier for portfolios.
•	Transaction fee note: 0.5% per rent collected, shown transparently beneath the table.
•	Feature comparison table expanding on what each tier includes.
•	FAQ accordion (billing, refunds, switching plans).
•	Final CTA.
Interactions & motion:
•	Billing toggle animates the price numbers with a quick count-up/down rather than an abrupt swap.
•	Recommended tier card is visually elevated (scale + shadow) and slightly larger than its siblings.
Tone / copy guidance: Transparent and simple; no hidden-fee feeling — the 0.5% transaction fee is stated plainly, not buried.

6.7  Testimonials & Case Studies
Route: /testimonials      Access: Public
Purpose: Build credibility through relatable, specific stories rather than generic praise.
Key sections / layout (top to bottom):
•	Header.
•	Filter chips: All / Landlords / Tenants.
•	Masonry or grid of testimonial cards (name, role, property count or city, quote, photo or avatar).
•	1–2 expanded case-study blocks with a short narrative and a results callout (e.g. “Reduced late payments by 40%”).
•	Closing CTA.
Interactions & motion:
•	Filter chips animate the grid with a smooth re-layout/fade when switching categories.
Tone / copy guidance: Specific numbers and concrete outcomes over vague enthusiasm.

6.8  About
Route: /about      Access: Public
Purpose: Establish the team and mission behind RentFlow for trust-building, especially with landlords handling tenants’ money.
Key sections / layout (top to bottom):
•	Mission statement hero.
•	Origin story section (the notebook/WhatsApp problem, told narratively).
•	Values grid (3–4 cards).
•	Team grid (photo, name, role) — placeholder content.
•	Press/recognition strip (optional, placeholder logos).
•	CTA band.
Interactions & motion:
•	Standard scroll reveals; team cards have a subtle hover tilt/lift.
Tone / copy guidance: Human and grounded in the real African rental experience; avoid corporate-mission-statement clichés.

6.9  FAQ
Route: /faq      Access: Public
Purpose: Centralized answer hub reducing support burden and pre-signup hesitation.
Key sections / layout (top to bottom):
•	Search input to filter questions.
•	Category tabs: General, Payments, Security, Landlords, Tenants.
•	Accordion list of Q&A per category.
•	“Still have questions?” CTA linking to /contact.
Interactions & motion:
•	Search filters the list live as the user types; accordion items animate open/closed.
Tone / copy guidance: Short, direct answers — two to four sentences each.

6.10  Blog / Resources
Route: /blog and /blog/:slug      Access: Public
Purpose: Long-term SEO and credibility play; demonstrates expertise on rental management in African markets.
Key sections / layout (top to bottom):
•	Listing page: featured post banner, category filter, grid of post cards (cover image, title, excerpt, read time).
•	Detail page: cover image, title, author/date meta, rich-text article body, related-posts strip at the end.
Interactions & motion:
•	Listing grid filters/animates by category; detail page shows a thin scroll-progress bar at the top.
Tone / copy guidance: Practical, advice-driven (e.g. “5 ways to reduce late rent payments”) — placeholder articles for now.

6.11  Contact
Route: /contact      Access: Public
Purpose: Capture inbound leads and support requests.
Key sections / layout (top to bottom):
•	Two-column layout: contact form (name, email, role, message, submit) on one side, contact details + office/illustration + map placeholder on the other.
•	Success state replaces the form with a confirmation message and icon.
Interactions & motion:
•	Form validates inline; on submit, a brief loading state on the button precedes the success swap (mocked, no real send).
Tone / copy guidance: Friendly and responsive-feeling; set the expectation that a real human replies within 24 hours.

6.12  Legal — Privacy Policy & Terms of Service
Route: /privacy-policy, /terms-of-service      Access: Public
Purpose: Required legal pages, styled consistently with the rest of the site rather than left as unstyled text dumps.
Key sections / layout (top to bottom):
•	Sticky in-page section navigation (left rail on desktop, top dropdown on mobile) linking to each clause.
•	Clean typographic body content with generous line-height for long-form reading.
•	Last-updated date at the top.
Interactions & motion:
•	Section nav highlights the currently-in-view clause as the user scrolls (scrollspy).
Tone / copy guidance: Placeholder legal copy is acceptable; structure and styling are what matter for this phase.

6.13  404 Not Found
Route: /404 (catch-all)      Access: Public
Purpose: On-brand error page that keeps users moving instead of bouncing.
Key sections / layout (top to bottom):
•	Large stylized “404” using the display font, short friendly message, illustration consistent with the brand’s line-art style, primary button back to Home, secondary link to Contact.
Interactions & motion:
•	Illustration has a subtle idle animation (gentle float/loop).
Tone / copy guidance: Light, brief, on-brand — a small moment of personality.

7. Authentication & Onboarding Flow
Auth pages share a distinct, simpler shell: centered card (max 440px) on a softly textured Forest Teal background with the RentFlow mark above the card. No navbar/footer — keep focus tight.
7.1  Login
Route: /login      Access: Public
Purpose: Single login form serving both roles; the mock auth layer determines role from the mock user record and redirects accordingly.
Key sections / layout (top to bottom):
•	RentFlow mark + “Welcome back” headline.
•	Email + password fields, “Forgot password?” link, primary “Log In” button.
•	Divider, then a note: “Don’t have an account? Sign up” linking to /signup.
Interactions & motion:
•	Inline validation on blur; failed mock login shakes the card slightly and shows an inline error banner.
Tone / copy guidance: Minimal, no marketing copy on this screen.

7.2  Sign Up
Route: /signup      Access: Public
Purpose: New landlord registration (tenants are normally invited — see 7.5 — but a tenant can also start here and be redirected to wait for an invite).
Key sections / layout (top to bottom):
•	Step 1: role selection — two large selectable cards, “I’m a Landlord” / “I’m a Tenant”, each with a short description.
•	Step 2 (landlord path): name, email, phone, password, business name, “Create Account” button.
•	Step 2 (tenant path): explanatory message that tenants join via a landlord’s invite link, with a field to enter an invite code if they have one.
•	Progress indicator (Step 1 of 2) at the top.
Interactions & motion:
•	Role cards animate a selected-state highlight on click before advancing; step transition slides horizontally.
Tone / copy guidance: Encouraging, low-friction — reinforce that setup takes minutes.

7.3  Forgot Password / Reset Password
Route: /forgot-password, /reset-password      Access: Public
Purpose: Standard recovery flow, fully mocked.
Key sections / layout (top to bottom):
•	Forgot: email field, “Send reset link” button, confirmation state after submit.
•	Reset: new password + confirm password fields with strength indicator, “Reset Password” button, success state with a link back to /login.
Interactions & motion:
•	Password strength indicator animates color/width as the user types.
Tone / copy guidance: Reassuring and brief.

7.4  Verify Email
Route: /verify-email      Access: Public
Purpose: Holding screen shown right after signup, mocked to auto-advance after a short delay or on a “I’ve verified” button click.
Key sections / layout (top to bottom):
•	Icon/illustration, “Check your inbox” message, “Resend email” link with a cooldown timer, manual continue button for demo purposes.
Interactions & motion:
•	Resend button disables and shows a countdown after each click.
Tone / copy guidance: Light reassurance that this is a normal, quick step.

7.5  Tenant Invite Acceptance
Route: /onboarding/invite/:token      Access: Public (token-gated)
Purpose: The real tenant entry point — a landlord invites a tenant by email, and this page lets them set a password and land directly in their lease context.
Key sections / layout (top to bottom):
•	Personalized header pulling the landlord/property name from the mock invite record (“You’ve been invited to join Acme Properties on RentFlow”).
•	Lease summary preview card (property, unit, rent amount, due date) shown read-only.
•	Set-password form, “Accept & Continue” button routing into /tenant/dashboard.
Interactions & motion:
•	Lease summary card animates in first to build context before the form appears.
Tone / copy guidance: Warm and specific — this is often a tenant’s first interaction with the product and must feel legitimate, not like spam.

8. Landlord Dashboard — Page-by-Page Specifications
Shared dashboard shell: fixed left sidebar (Forest Teal Dark, collapsible to icon-only) with logo, primary nav (Dashboard, Properties, Tenants, Payments, Maintenance, Reports, Settings) and a bottom user/account menu; top bar with page title, global search, notification bell with unread dot, and avatar menu. Content area sits on the warm off-white background with a 1440px max width.
8.1  Dashboard Overview
Route: /landlord/dashboard      Access: Landlord
Purpose: At-a-glance health check across the whole portfolio the moment a landlord logs in.
Key sections / layout (top to bottom):
•	Greeting header (“Good morning, [Name]”) with current date.
•	4 stat cards: Total Properties, Occupied Units, Monthly Revenue Collected, Outstanding Balance — each with an icon, animated count-up number and a small trend indicator.
•	Revenue trend chart (line/area, last 6 months) spanning roughly two-thirds width.
•	Recent activity feed (payments received, maintenance updates) in the remaining third.
•	Upcoming/overdue payments table preview (5 rows) with a “View all” link to /landlord/payments.
•	Maintenance snapshot — count of open requests by status with a link to /landlord/maintenance.
Interactions & motion:
•	Stat numbers count up on first render; chart line draws in on mount; activity feed items fade in staggered.

8.2  Properties List
Route: /landlord/properties      Access: Landlord
Purpose: Manage the full property portfolio.
Key sections / layout (top to bottom):
•	Header with “+ Add Property” primary button and a search/filter bar (by occupancy status, by city).
•	Grid of property cards: cover image, property name, address, unit count, occupancy badge, monthly revenue.
•	Empty state for first-time landlords with zero properties — illustration + “Add your first property” CTA.
Interactions & motion:
•	Cards lift on hover; list/grid toggle switches layout with a smooth re-flow.

8.3  Add / Edit Property
Route: /landlord/properties/new, /landlord/properties/:id/edit      Access: Landlord
Purpose: Multi-step form to create or update a property and its units.
Key sections / layout (top to bottom):
•	Stepper: Property Details → Units → Review.
•	Step 1: name, address, city/state, cover photo upload (mocked), property type.
•	Step 2: dynamic repeatable unit rows (unit label, bedrooms, rent amount, due-day-of-month) with add/remove controls.
•	Step 3: read-only summary with an “Edit” shortcut back to any step, then “Save Property”.
Interactions & motion:
•	Stepper transitions slide horizontally; adding/removing a unit row animates height smoothly.

8.4  Property Detail
Route: /landlord/properties/:id      Access: Landlord
Purpose: Deep-dive into one property’s units, tenants and financials.
Key sections / layout (top to bottom):
•	Header: property name, address, edit/delete actions.
•	Tabs: Overview, Units & Tenants, Payments, Maintenance.
•	Overview tab: occupancy donut chart, revenue summary, quick stats.
•	Units & Tenants tab: table of units with assigned tenant, rent, status, and an “Invite Tenant” action per vacant unit.
•	Payments tab: filtered payment history scoped to this property.
•	Maintenance tab: filtered maintenance requests scoped to this property.
Interactions & motion:
•	Tab switches cross-fade content without a full page reload feel.

8.5  Tenants List
Route: /landlord/tenants      Access: Landlord
Purpose: Portfolio-wide view of every tenant regardless of property.
Key sections / layout (top to bottom):
•	Search + filter (by property, by payment status).
•	Data table: avatar/name, property/unit, rent amount, status badge (Paid / Due / Overdue), last payment date, row action menu (View, Message, Remove).
Interactions & motion:
•	Table rows hover-highlight; status badges use the color-coded pill style from Section 4.7.

8.6  Tenant Detail
Route: /landlord/tenants/:id      Access: Landlord
Purpose: Full profile and history for a single tenant.
Key sections / layout (top to bottom):
•	Header: avatar, name, contact info, current lease summary card.
•	Tabs: Payment History, Maintenance Requests, Documents (lease PDF placeholder).
•	Payment History tab: full table with export-to-CSV button (mocked).
Interactions & motion:
•	Standard tab cross-fade; export button shows a brief “preparing file” loading state before a mocked download toast.

8.7  Payments / Transactions
Route: /landlord/payments      Access: Landlord
Purpose: Full financial ledger across the whole portfolio.
Key sections / layout (top to bottom):
•	Filter bar: date range, property, status (Paid/Pending/Overdue/Refunded).
•	Summary strip: total collected this period, pending, overdue.
•	Transactions data table: tenant, property/unit, amount (JetBrains Mono), date, status badge, receipt download icon.
•	Pagination footer.
Interactions & motion:
•	Filter changes animate the summary strip numbers with a quick recount; table rows fade in on filter/page change.

8.8  Maintenance Requests Board
Route: /landlord/maintenance      Access: Landlord
Purpose: Kanban-style tracking of every maintenance request across properties.
Key sections / layout (top to bottom):
•	Three columns: Received, In Progress, Resolved.
•	Each card: tenant name, property/unit, short description, photo thumbnail if attached, submitted date, priority tag.
•	Card click opens a detail drawer with full description, photo, status-change controls and an internal note field.
Interactions & motion:
•	Cards support drag-and-drop between columns (or a status dropdown as a simpler fallback) with a smooth drop animation; drawer slides in from the right.

8.9  Financial Reports
Route: /landlord/reports      Access: Landlord
Purpose: Deeper analytics for tax season and portfolio performance review.
Key sections / layout (top to bottom):
•	Date range selector and property filter.
•	Revenue-by-property bar chart.
•	Monthly trend line chart with a comparison toggle (this year vs. last year, using mock data).
•	Outstanding balances table.
•	“Export to CSV” primary action (mocked).
Interactions & motion:
•	Charts animate in on load; toggling the comparison view morphs the chart rather than replacing it abruptly.

8.10  Notifications
Route: /landlord/notifications      Access: Landlord
Purpose: Central log of payment confirmations, maintenance updates and system messages.
Key sections / layout (top to bottom):
•	Filter tabs: All, Payments, Maintenance, System.
•	Chronological list with unread indicators, grouped by day.
•	“Mark all as read” action.
Interactions & motion:
•	New/unread items have a subtle accent-colored left border; marking as read fades the indicator out.

8.11  Settings
Route: /landlord/settings      Access: Landlord
Purpose: Account, business and notification preferences.
Key sections / layout (top to bottom):
•	Side tab navigation: Profile, Business Details, Notifications, Security, Billing.
•	Profile: avatar upload, name, email, phone.
•	Business Details: business name, payout bank details (mocked, masked).
•	Notifications: toggles for email/SMS alert types.
•	Security: change password, mocked 2FA toggle.
•	Billing: current plan summary with an “Upgrade” CTA linking conceptually to /pricing.
Interactions & motion:
•	Switching side tabs cross-fades the panel; toggles animate with a smooth thumb slide; saving shows a brief inline success state.

9. Tenant Dashboard — Page-by-Page Specifications
Shared tenant shell: simpler top navigation bar (not a sidebar) since a tenant only has one lease to manage — logo, Dashboard / My Lease / Pay Rent / Maintenance links, notification bell, avatar menu. On mobile this collapses into a bottom tab bar (Dashboard, Pay, Maintenance, More) for thumb-friendly access.
9.1  Dashboard Overview
Route: /tenant/dashboard      Access: Tenant
Purpose: Tenant’s home screen — answers “what do I owe and is anything urgent” in one glance.
Key sections / layout (top to bottom):
•	Greeting header with current date.
•	Hero rent-status card: amount due, due date, a prominent “Pay Rent” button, and a colored urgency state (on-time/due-soon/overdue).
•	Lease summary mini-card (property, unit, landlord contact).
•	Recent activity: last payment, last maintenance update.
•	Quick-action tiles: Pay Rent, Log Maintenance Request, View Receipts.
Interactions & motion:
•	Rent-status card color/urgency animates a gentle pulse if overdue (respecting reduced-motion); quick-action tiles have a tactile press-down effect on tap.

9.2  My Lease
Route: /tenant/lease      Access: Tenant
Purpose: Full transparency into lease terms — something tenants currently never get in writing.
Key sections / layout (top to bottom):
•	Property/unit header with photo.
•	Lease detail card: rent amount, due day, lease start/end date, deposit amount, landlord contact card.
•	Lease document preview/download (mocked PDF placeholder).
Interactions & motion:
•	Document preview opens in a modal with a subtle scale-in animation.

9.3  Pay Rent
Route: /tenant/pay-rent      Access: Tenant
Purpose: The single most important conversion flow in the tenant experience — must feel instant and trustworthy.
Key sections / layout (top to bottom):
•	Amount-due summary card (rent + any late fee, clearly itemized).
•	Payment method selection (mocked options: Card, Bank Transfer, Paystack — visual only).
•	“Pay Now” primary button leading to a mocked processing state, then a success screen.
•	Success screen: animated checkmark, transaction summary, “Download Receipt” button, “Back to Dashboard” link.
Interactions & motion:
•	Processing state shows a branded loading animation for ~1.5s before resolving to success (simulated latency so the flow feels real); success checkmark animates in with a small bounce.

9.4  Payment History & Receipts
Route: /tenant/payments      Access: Tenant
Purpose: Tenant’s personal payment ledger and proof-of-payment archive.
Key sections / layout (top to bottom):
•	Filter by date range/status.
•	List/table of past payments: date, amount (JetBrains Mono), status badge, “Download Receipt” icon per row.
•	Empty state for new tenants with no payment history yet.
Interactions & motion:
•	Receipt download shows a brief loading spinner on the icon before a mocked-download toast confirms.

9.5  Maintenance Requests
Route: /tenant/maintenance      Access: Tenant
Purpose: Let tenants log and track issues without phone calls.
Key sections / layout (top to bottom):
•	“+ New Request” button opening a form: description, category dropdown, photo upload (mocked), submit.
•	List of past/active requests as cards: description excerpt, status badge (Received/In Progress/Resolved), submitted date, thumbnail if photo attached.
•	Card click opens a detail view with full description, photo and a status timeline.
Interactions & motion:
•	New-request form opens in a modal with scale/fade-in; status timeline animates each completed step in sequence.

9.6  Notifications
Route: /tenant/notifications      Access: Tenant
Purpose: Payment reminders and maintenance status updates in one feed.
Key sections / layout (top to bottom):
•	Chronological list grouped by day, unread indicators, “Mark all as read” action.
Interactions & motion:
•	Same pattern as the landlord notifications page for consistency.

9.7  Settings
Route: /tenant/settings      Access: Tenant
Purpose: Basic profile and notification preferences.
Key sections / layout (top to bottom):
•	Profile: avatar, name, email, phone.
•	Notifications: email/SMS toggle preferences.
•	Security: change password.
Interactions & motion:
•	Consistent with landlord settings page patterns for a unified feel across roles.

10. Shared Component Library
Build these once in src/components/ui and reuse everywhere — no page should define its own one-off button or card style.
Component	Description & key variants
Button	primary / secondary / ghost / destructive; sm / md / lg; default / loading / disabled states; optional left/right icon
Input / Textarea	label, helper text, error state, optional left icon, password show/hide toggle
Select / Dropdown	searchable option list, custom styled chevron, keyboard navigable
Checkbox / Toggle Switch	animated thumb/check transition, disabled state
Modal	centered overlay, scale+fade transition, closes on overlay click or Escape, focus-trapped
Drawer / Side Panel	slides in from right, used for maintenance detail and filters on mobile
Toast / Notification	success / error / info variants, auto-dismiss with progress bar, stacked queue
Badge / Status Pill	color-coded by status (paid, pending, overdue, resolved, etc.)
Card	base surface used everywhere; optional hoverable + clickable variants
StatCard	icon + animated count-up number + label + trend arrow, used on both dashboards
DataTable	sortable columns, row hover, pagination footer, responsive stacked-card fallback on mobile
Tabs	underline-indicator style, animates the indicator between tabs
Avatar	image or initials fallback, size variants, optional status dot
ProgressBar / Stepper	used in multi-step forms (signup, add property)
EmptyState	icon/illustration + message + optional CTA, used across every list page
SkeletonLoader	shimmer placeholder shapes matching the layout of the content it precedes
Pagination	page numbers + prev/next, used with DataTable
FileUpload / PhotoDropzone	drag-and-drop or click-to-upload, image preview, mocked upload progress
DateRangePicker	used in payments/reports filters
ConfirmDialog	destructive-action confirmation (e.g. delete property), built on Modal
Breadcrumbs	used on nested dashboard pages (e.g. Properties > Acme House > Edit)
11. Responsive Design Strategy
Breakpoint	Range	Key adaptations
Mobile	< 640px	Single column; dashboard sidebar becomes a slide-out drawer (landlord) or bottom tab bar (tenant); tables collapse into stacked cards
Tablet	640px – 1023px	Two-column grids where marketing used three; sidebar collapses to icon-only by default
Desktop	1024px – 1439px	Full multi-column layouts as designed
Wide	≥ 1440px	Content stays capped at max-width (1280px marketing / 1440px dashboard) and centers, never stretches edge-to-edge
Every page in Sections 6–9 must be designed and implemented mobile-first, not just “squeezed to fit” — navigation patterns, table-to-card conversions and touch target sizes (minimum 44px) are first-class requirements, not an afterthought pass at the end.
12. Accessibility
•	Color contrast meets WCAG AA at minimum for all text/background combinations in the palette (Section 4.1 has already been chosen with this in mind, but verify any new combinations).
•	All interactive elements are reachable and operable by keyboard; modals and drawers trap focus and return it to the trigger element on close.
•	All images and icons that convey meaning have descriptive alt text or aria-labels; purely decorative graphics are marked aria-hidden.
•	Form fields have associated labels (not placeholder-only labeling) and clear error messaging tied to the field via aria-describedby.
•	All motion specified in Section 4.8 respects prefers-reduced-motion, falling back to instant or minimal-motion alternatives.
•	Status is never conveyed by color alone — badges/pills always pair color with text (e.g. “Overdue”, not just a red dot).
13. Frontend Tech Stack (Plain JavaScript — No TypeScript)
All files are .jsx / .js. No TypeScript, no .ts/.tsx files, no type annotations. Use clear naming and JSDoc comments where extra clarity helps instead of types.
Tool	Purpose
React 18 + Vite	Core framework and build tooling; plain JavaScript template, not the TypeScript template
React Router v6	Client-side routing for all 39 routes, nested layouts, and protected/role-based routes
Tailwind CSS	Utility-first styling, configured with the custom color/spacing/font tokens from Section 4
Framer Motion	Page transitions, scroll reveals, micro-interactions, drawer/modal animation
Zustand	Lightweight global state: mock auth/session, current role, UI state (sidebar collapsed, theme)
TanStack Query (React Query)	Data-fetching/caching layer wired to the mock service functions in Section 14, so the calling pattern is identical to a real API integration later
React Hook Form + Zod	Form state and validation across all forms (signup, add property, pay rent, settings, etc.)
Recharts	Revenue trend, occupancy donut and reports charts
lucide-react	Icon set, used consistently per Section 4.5
date-fns	Date formatting/calculations (due dates, lease terms, “time ago” on notifications)
Axios	HTTP client used inside the service layer; swapped from mock resolvers to real calls later with no component changes
sonner (or react-hot-toast)	Toast notifications for success/error feedback throughout both dashboards
14. Mock Data & Service Layer Strategy
Because the backend doesn’t exist yet, every “API call” in this build goes through a thin service layer that behaves like a real one, so the eventual backend swap touches only this layer.
14.1 Structure
•	src/mocks/ — static JSON fixtures: properties.json, units.json, tenants.json, payments.json, maintenanceRequests.json, notifications.json, currentUser.json, blogPosts.json, testimonials.json.
•	src/services/ — one file per resource (propertyService.js, paymentService.js, tenantService.js, maintenanceService.js, authService.js, etc.), each exporting async functions named the way real endpoints would be (getProperties(), getPropertyById(id), createPayment(data), updateMaintenanceStatus(id, status)…).
•	Each mock service function returns a Promise that resolves (or occasionally rejects, to test error states) after a simulated delay of 400–900ms, so loading skeletons are genuinely exercised during development.
•	CRUD operations performed during a session (adding a property, submitting a maintenance request) persist to localStorage so the demo data survives a page refresh — this is purely a development convenience, never used for real secrets or production data.
14.2 Why this matters
Components call useQuery/useMutation against these service functions exactly as they would against a real Axios call to a real backend. When the backend is built in the next phase, only the contents of src/services/*.js change (swap the mock resolver for a real axios.get/post call) — no component, page or store needs to be touched.
15. Project Folder Structure
rentflow-frontend/
├── public/
├── src/
│   ├── assets/                  images, illustrations, fonts
│   ├── components/
│   │   ├── ui/                  Button, Input, Modal, Card, DataTable, etc.
│   │   ├── layout/               Navbar, Footer, Sidebar, Topbar, layout shells
│   │   ├── marketing/            Hero, FeatureGrid, PricingTable, Testimonials...
│   │   └── dashboard/             StatCard, PropertyCard, MaintenanceBoard...
│   ├── pages/
│   │   ├── marketing/             Home.jsx, Features.jsx, Pricing.jsx, ...
│   │   ├── auth/                  Login.jsx, Signup.jsx, ...
│   │   ├── landlord/              Dashboard.jsx, Properties.jsx, ...
│   │   └── tenant/                Dashboard.jsx, PayRent.jsx, ...
│   ├── routes/                   AppRouter.jsx, ProtectedRoute.jsx, RoleRoute.jsx
│   ├── store/                    authStore.js, uiStore.js  (Zustand)
│   ├── services/                 propertyService.js, paymentService.js, ...
│   ├── mocks/                    properties.json, tenants.json, ...
│   ├── hooks/                    useCountUp.js, useMediaQuery.js, ...
│   ├── utils/                    formatCurrency.js, formatDate.js, ...
│   ├── constants/                 colors.js, routes.js, roles.js
│   ├── styles/                    global.css, fonts.css
│   ├── App.jsx
│   └── main.jsx
├── prd.md                        <-- this document, read by the AI build agent
├── package.json
├── tailwind.config.js
└── vite.config.js

16. State Management Strategy
•	Zustand — authStore: holds the mocked current user, role (landlord/tenant), and isAuthenticated flag; persisted to localStorage so a refresh doesn’t log the user out during development.
•	Zustand — uiStore: holds sidebar collapsed/expanded state, active modal/drawer, and any other cross-page UI state.
•	TanStack Query: owns all “server” (mock) data — properties, tenants, payments, maintenance requests, notifications — with caching, refetching and mutation handling exactly as it would against a real backend.
•	Local component state (useState): for purely local UI concerns — form inputs before submit, accordion open/closed, current carousel slide.
17. Success Criteria for This Phase
•	All ~39 routes from Section 5 exist, render correctly, and are reachable through real navigation (not just typed URLs).
•	Every page matches its Section 6–9 spec for layout, content sections and at least the specified interactions/motion.
•	Design tokens from Section 4 are used consistently — no hard-coded one-off colors, fonts or spacing values anywhere in the codebase.
•	Fully responsive across the four breakpoints in Section 11, tested at minimum at 375px, 768px, 1280px and 1440px widths.
•	Loading, empty and error states are implemented for every data-driven page, not just the happy path.
•	No console errors or warnings; no unused dependencies; no TypeScript files anywhere in the project.
•	Lighthouse scores (run locally) of 90+ on Performance and Accessibility for the marketing Home page and the two dashboard Overview pages.
•	Motion respects prefers-reduced-motion throughout.
18. Recommended Build Phases
Follow this order — each phase produces something visibly testable before moving to the next.
Phase	Deliverable
Phase 0 — Foundation	Vite + React scaffold (plain JS), Tailwind configured with the Section 4 design tokens, fonts loaded, folder structure from Section 15, routing skeleton with placeholder pages for all 39 routes.
Phase 1 — Component library	Build every component in Section 10 in isolation with realistic mock props before wiring any real page, so the rest of the build only assembles existing pieces.
Phase 2 — Marketing site	Build all 15 public pages from Section 6, navbar and footer, fully responsive and animated.
Phase 3 — Auth & onboarding	Build the 6 pages in Section 7, wire mock authService and the role-selection/redirect logic.
Phase 4 — Landlord dashboard	Build the dashboard shell, then the 11 pages in Section 8, wired to mock services and TanStack Query.
Phase 5 — Tenant dashboard	Build the tenant shell, then the 7 pages in Section 9, including the full pay-rent flow.
Phase 6 — Mock data depth & polish	Flesh out mocks/*.json with enough realistic, varied records to make every list, chart, empty state and filter behave convincingly; add the simulated network delay/error behavior from Section 14.
Phase 7 — Responsive, accessibility & performance pass	Audit every page against Sections 11, 12 and 17; fix breakpoints, contrast, focus states and Lighthouse scores.


