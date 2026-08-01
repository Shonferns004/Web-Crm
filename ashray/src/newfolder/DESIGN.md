---
name: Kindred Path
colors:
  surface: '#faf9fb'
  surface-dim: '#dadadc'
  surface-bright: '#faf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f5'
  surface-container: '#eeedf0'
  surface-container-high: '#e8e8ea'
  surface-container-highest: '#e3e2e4'
  on-surface: '#1a1c1d'
  on-surface-variant: '#464651'
  inverse-surface: '#2f3032'
  inverse-on-surface: '#f1f0f2'
  outline: '#777683'
  outline-variant: '#c7c5d3'
  surface-tint: '#5355ab'
  primary: '#27277d'
  on-primary: '#ffffff'
  primary-container: '#3f4095'
  on-primary-container: '#b3b3ff'
  inverse-primary: '#c1c1ff'
  secondary: '#825500'
  on-secondary: '#ffffff'
  secondary-container: '#feae2b'
  on-secondary-container: '#6b4500'
  tertiary: '#6f0000'
  on-tertiary: '#ffffff'
  tertiary-container: '#9a0001'
  on-tertiary-container: '#ffa293'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1dfff'
  primary-fixed-dim: '#c1c1ff'
  on-primary-fixed: '#0b0466'
  on-primary-fixed-variant: '#3b3c91'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#ffb952'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#633f00'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#930001'
  background: '#faf9fb'
  on-background: '#1a1c1d'
  surface-variant: '#e3e2e4'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is built on a foundation of empathy, urgency, and institutional reliability. It targets a dual audience: the compassionate individual donor looking for trust, and the institutional partner seeking professional transparency. 

The visual style is **Corporate / Modern** with **Tactile** influences. It balances high-readability typography with soft, organic container shapes to avoid a cold, clinical feel. The aesthetic should feel grounded and established, yet approachable and warm, evoking a sense of community and collective progress.

## Colors

This color palette is strategically chosen to balance trust with action.
- **Primary Blue (#3F4095):** Used for deep headers, navigation, and primary buttons to establish authority and stability.
- **Secondary Orange (#F4A621):** Used for highlighting community-focused content, impact stats, and supportive callouts.
- **Tertiary Red (#E32619):** Reserved strictly for urgent calls to action, such as "Donate Now," to draw immediate ocular attention.
- **Neutral Gray (#58595B):** Used for body text and secondary labels to ensure high legibility without the harshness of pure black.
- **Background Tints:** A very light blue-wash (#F0F4FA) is used for section backgrounds to distinguish content blocks from the pure white page background.

## Typography

The system uses a pairing of **Plus Jakarta Sans** for headlines and **Work Sans** for body text. 

Plus Jakarta Sans provides a friendly, modern geometry that feels optimistic, especially in its bolder weights. For body text, Work Sans is utilized for its exceptional legibility and neutral, professional character. 

Headlines should utilize tight letter spacing to create a cohesive visual block, while body text should maintain generous line heights (1.5x - 1.6x) to ensure accessibility for a wide range of age groups and reading abilities.

## Layout & Spacing

The design system utilizes a **Fluid Grid** model within a maximum container width of 1280px.
- **Desktop:** A 12-column grid with 24px gutters. Sections are separated by large 80px vertical margins to allow the content to breathe and prevent cognitive overload.
- **Mobile:** A 4-column grid with 16px margins. Content cards typically stack vertically, but horizontal carousels are encouraged for "Latest News" or "Partners" to preserve vertical space.
- **Rhythm:** Internal component spacing follows a 4px/8px base-2 scale, ensuring consistent alignment between icons, text, and container edges.

## Elevation & Depth

Depth in the design system is conveyed through **Tonal Layers** and **Soft Ambient Shadows**.
- **Surfaces:** Main content lives on white (#FFFFFF) cards. These cards are placed on light-tinted backgrounds (#F0F4FA) to create a subtle layered effect without using heavy borders.
- **Shadows:** Use extremely diffused shadows with a large blur radius (e.g., `0px 10px 30px rgba(63, 64, 149, 0.08)`). The shadow color is slightly tinted with the primary blue to keep the UI looking "airy" rather than "dirty."
- **Interactive States:** When a user hovers over a card or button, the elevation should increase (shadow becomes slightly more opaque and the element shifts up by 2px) to provide tactile feedback.

## Shapes

The design system adopts a **Rounded** shape language to appear welcoming.
- **Standard Corners:** Most UI elements (input fields, small cards) use a 0.5rem (8px) radius.
- **Signature Containers:** Large featured hero sections or prominent content cards should use a **unique asymmetric corner** (e.g., 80px radius on top-left and bottom-right, 0px on others) to mimic the organic feel of the foundation's branding.
- **Interactive Elements:** Buttons utilize the standard 0.5rem radius, while status chips and tags use a fully pill-shaped (rounded-full) radius.

## Components

### Buttons
- **Primary:** Solid Primary Blue with white text. High contrast, used for navigation and general actions.
- **Urgent (Donate):** Solid Tertiary Red. This is the "North Star" action and should only appear 1-2 times per page.
- **Secondary:** Outlined Blue or Light Gray for "Learn More" actions to maintain hierarchy.

### Cards
Cards are the primary vehicle for "Projects" and "Articles." They must feature a large image at the top with the signature asymmetric rounded corners. Text content within the card should have 24px of internal padding.

### Chips & Labels
Used for dates or categories (e.g., "News & Blog"). These should have a light background tint of the secondary color with darkened text for legibility.

### Inputs
Fields should have a subtle 1px border in light gray, which transitions to Primary Blue on focus. Use Work Sans for placeholder text to maintain a professional, clean look.

### Lists
Lists of impact (e.g., "What we do") should use custom checkmark icons in Secondary Orange to associate progress with the brand's warmth.