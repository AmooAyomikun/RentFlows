---
name: Proportional Sophistication
colors:
  surface: '#f7faf6'
  surface-dim: '#d8dbd7'
  surface-bright: '#f7faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f1'
  surface-container: '#ecefeb'
  surface-container-high: '#e6e9e5'
  surface-container-highest: '#e0e3e0'
  on-surface: '#181c1a'
  on-surface-variant: '#404946'
  inverse-surface: '#2d312f'
  inverse-on-surface: '#eef1ee'
  outline: '#707976'
  outline-variant: '#bfc9c5'
  surface-tint: '#2c685d'
  primary: '#00372f'
  on-primary: '#ffffff'
  primary-container: '#0b4f45'
  on-primary-container: '#84bfb2'
  inverse-primary: '#96d2c5'
  secondary: '#3a665e'
  on-secondary: '#ffffff'
  secondary-container: '#bae9df'
  on-secondary-container: '#3e6b62'
  tertiary: '#591a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#7f2800'
  on-tertiary-container: '#ff9973'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1efe1'
  primary-fixed-dim: '#96d2c5'
  on-primary-fixed: '#00201b'
  on-primary-fixed-variant: '#0d5046'
  secondary-fixed: '#bdece1'
  secondary-fixed-dim: '#a1d0c6'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#214e47'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59b'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#812900'
  background: '#f7faf6'
  on-background: '#181c1a'
  surface-variant: '#e0e3e0'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 24px
  gutter: 16px
  card-gap: 20px
  sidebar-width: 260px
---

## Brand & Style
This design system establishes a high-performance B2B environment that balances institutional trust with modern operational agility. The aesthetic is rooted in **Corporate Minimalism** with a **Tactile Edge**, utilizing intentional whitespace and precision-engineered components to convey a premium, reliable service for property management and financial operations. 

The target audience consists of asset managers and operations directors who require clarity amidst high-density data. The UI evokes a sense of "calm control" through a warm, grounded color palette and a structured architectural layout inspired by high-end financial platforms.

## Colors
The palette is built on a foundation of organic, grounded tones. The **Forest Teal** serves as the primary brand anchor, used for headers, active states, and navigation sidebar backgrounds. **Sunclay Orange** is reserved strictly for high-impact calls to action and critical highlights, ensuring high conversion through contrast.

Functional colors follow standard industry heuristics but are adjusted for harmony with the warm off-white background (#FAF7F2). Text follows a strict hierarchy: **Charcoal** for headlines to ensure maximum legibility, and a softer grey for body text to reduce visual fatigue during long sessions.

## Typography
The typographic system utilizes a triple-font approach to maximize clarity across different data types. 
- **Sora** provides a geometric, modern authority for headlines. 
- **Inter** handles the bulk of the UI for its exceptional legibility and neutral character. 
- **JetBrains Mono** is utilized for financial figures, transaction IDs, and dates, ensuring that numerical data remains aligned and easy to scan in table views.

For mobile, large display titles scale down aggressively to prevent awkward wrapping, while body sizes remain constant at 16px to maintain accessibility.

## Layout & Spacing
The layout employs a **Fluid Grid** system on an 8px baseline. 
- **Desktop:** A fixed 260px sidebar is paired with a flexible main content area. Content is contained within a max-width of 1440px to ensure line lengths remain readable.
- **Tablet:** The sidebar collapses into a narrow icon-only rail or hidden drawer. Padding reduces to 16px.
- **Mobile:** A single-column flow with 16px horizontal margins. 

Spacing between functional groups (e.g., card to card) should use 20px or 24px, while internal component spacing (e.g., label to input) should adhere to the 8px or 12px increments.

## Elevation & Depth
Depth is communicated through **Layered Surface Tiers** and **Ambient Shadows**. 
- **Level 0 (Base):** The #FAF7F2 warm background.
- **Level 1 (Surfaces):** White (#FFFFFF) cards and containers featuring a 1px hairline border in a muted grey-teal (#E5EAE9).
- **Level 2 (Interaction):** Elements like dropdowns and active cards use a soft, warm-tinted shadow: `0 4px 20px rgba(11, 79, 69, 0.08)`.
- **Level 3 (Overlay):** Modals use a deeper shadow and a backdrop blur of 8px to focus the user's attention.

Avoid heavy black shadows; always tint shadows with the Primary Forest Teal to maintain the premium, integrated feel.

## Shapes
The shape language is a mix of "Architectural" and "Accessible." 
- **Cards & Primary Containers:** 12px radius (`rounded-lg`) provides a modern, approachable feel.
- **Buttons:** Match the 12px card radius to create visual cohesion.
- **Inputs & Form Fields:** 4px radius (`rounded-sm`) to signal precision and structure.
- **Badges/Status Chips:** Always use the `pill` (fully rounded) shape to differentiate them from interactive buttons.

## Components
- **Buttons:** 
  - *Primary:* Sunclay Orange background with white text. 
  - *Secondary:* Forest Teal background with white text.
  - *Ghost:* No background, Teal text, 1px Teal border.
- **Inputs:** White background, 1px border (#D1D5D4). On focus, the border changes to Forest Teal with a 2px outer glow in a semi-transparent teal.
- **Lists & Tables:** Use JetBrains Mono for all numeric columns. Rows should have a subtle hover state (#F5F8F7) and 1px horizontal dividers.
- **Chips/Badges:** Small, pill-shaped elements with low-opacity backgrounds (e.g., Success Green at 10% opacity with 100% opacity text).
- **Cards:** White background, 12px radius, 1px hairline border. Header sections within cards should have a subtle bottom divider.
- **Navigation:** The sidebar uses the Primary Dark (#073A33) for the background, with active links highlighted by a vertical Sunclay Orange indicator on the left edge.
