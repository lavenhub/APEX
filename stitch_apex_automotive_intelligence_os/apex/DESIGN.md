---
name: Apex
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#e8bcb7'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#af8783'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4ab'
  primary: '#ffb4ab'
  on-primary: '#690005'
  primary-container: '#ff5449'
  on-primary-container: '#5c0004'
  inverse-primary: '#c00011'
  secondary: '#ffe5b1'
  on-secondary: '#3f2e00'
  secondary-container: '#fec300'
  on-secondary-container: '#6d5200'
  tertiary: '#c8c6c5'
  on-tertiary: '#303030'
  tertiary-container: '#929090'
  on-tertiary-container: '#2a2a2a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ab'
  on-primary-fixed: '#410002'
  on-primary-fixed-variant: '#93000a'
  secondary-fixed: '#ffdf99'
  secondary-fixed-dim: '#f7be00'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0em
  subheading:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-mono:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.15em
  caption:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.02em
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1440px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is a high-performance framework built for futuristic automotive intelligence and motorsport telemetry. It draws inspiration from cinematic "dark studio" photography, where precision engineering meets high-contrast lighting. The aesthetic is aggressive, utilitarian, and technologically advanced.

The visual direction combines **Minimalism** with **High-Contrast / Bold** elements. It emphasizes "engineered" layouts that feel like a cockpit HUD or a laboratory testing suite. Key principles include:
- **Cinematic Atmosphere:** Deep blacks and matte textures create a vacuum-like space where data and vehicles are spotlighted.
- **Precision Engineering:** Sharp lines, technical monospaced details, and telemetry-inspired framing.
- **Aggressive Intelligence:** A functionalist approach that prioritizes rapid data ingestion and high-stakes performance monitoring.

## Colors

This design system utilizes a strictly dark-mode palette to simulate a high-end garage or trackside control center.

- **Primary (Race Red):** Reserved for critical alerts, primary actions, and "live" indicators.
- **Secondary (Telemetry Gold):** Used for highlighting technical specifications, active states, and secondary telemetry data.
- **Neutral (Engineered White):** High-legibility text and primary UI icons.
- **Surfaces:** A tiered dark hierarchy. `#050505` acts as the void (background), while `#111111` and `#2B2B2B` define structural components and metallic containers.
- **Functional Accents:** Minimal use of neon glows (limited to 1-2px strokes) to represent active power states or data streams.

## Typography

The system utilizes **Space Grotesk** for all roles to maintain a cohesive, "engineered" look. The font's geometric construction and open apertures provide excellent legibility at high speeds and in low-light environments.

- **Display & Headlines:** Heavy weights with tight tracking create a forceful, cinematic impact.
- **Subheadings:** Increased letter-spacing and uppercase styling are used to denote technical categories and sections.
- **Labels:** Small, wide-tracked uppercase labels simulate technical schematics and HUD markings.
- **Scale:** Maintain a vertical rhythm based on an 8px grid. Headlines should feel massive and authoritative, while data points should feel precise.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. Content is housed within a maximum width for readability, but background elements and technical "framing" lines stretch to the screen edges.

- **Grid:** A 12-column grid for desktop with 24px gutters.
- **Technical Framing:** Use 1px wide lines (Metal Gray) to create a sense of structure. These lines should often extend beyond content containers to meet the viewport edge, mimicking blueprint layouts.
- **Spacing Rhythm:** Based on a 4px baseline. Use wide margins (64px+) on desktop to create a "gallery" feel for vehicle assets.
- **Density:** High density for data-heavy sections (telemetry) and low density (heavy whitespace) for hero and marketing sections.

## Elevation & Depth

This design system rejects soft shadows in favor of **Tonal Layers** and **Light-source directionalism**.

- **Stacked Depth:** Depth is achieved by transitioning from the Background (`#050505`) to Surface (`#111111`).
- **Spotlight Effect:** Use radial gradients with very low opacity (5-10%) to subtly highlight specific areas of the screen as if caught by a studio light.
- **Sharp Borders:** Instead of shadows, use 1px solid borders in Metal Gray (`#2B2B2B`) to define element boundaries.
- **Active States:** Active or "elevated" items are indicated by a 1px border of Primary Red or Secondary Gold, rather than a vertical shadow.

## Shapes

The shape language is **Sharp (0px)**. 

- **Hard Edges:** All buttons, cards, and input fields must use 90-degree corners to reflect industrial precision.
- **Angled Accents:** Use 45-degree clipped corners (chamfers) for decorative UI elements or "tag" style labels to enhance the futuristic military/aerospace aesthetic.
- **Icons:** Use stroke-based icons with sharp terminals. Avoid rounded endpoints.

## Components

### Buttons
- **Primary:** Solid Red background with White text. No border. Sharp corners.
- **Ghost:** 1px Metal Gray border, transparent background. Red text on hover.
- **Telemetry Toggle:** Small, square buttons with a "scan-line" texture when active.

### Cards & Containers
- Surfaces should be `#111111` with a top-left or bottom-right "accent notch" (a 1px line that extends 20px beyond the corner).
- Use `label-mono` typography for card headers to mimic serial numbers.

### Input Fields
- Underline-only or 1px bordered boxes. Focus state triggers a solid Secondary Gold left-border (3px wide).
- Placeholder text in Metal Gray.

### Chips & Tags
- Rectangular with 1px borders. 
- Use uppercase `label-mono` text. 
- For "Live" data, include a small pulsating Red dot.

### Telemetry Widgets
- Use mono-spaced numeric displays.
- Integrate 1px grid-line patterns into the background of charts and data visualizations.
- Gauges should be linear rather than circular, following the sharp-edge design principle.