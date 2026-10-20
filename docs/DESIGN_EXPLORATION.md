# Design Exploration & Visual Architecture — Dhanjit Boro

## 1. Creative Thesis: The Engineer's Workbench & Digital Field Notes
The portfolio embodies the philosophy of **"The Engineer's Workbench"**: tactile, confident, grounded, and technically curious. Rather than an interchangeable SaaS template or a generic AI landing page, it presents Dhanjit Boro's identity as a Computer Science & Engineering student in Kokrajhar who builds software, conducts computer vision experiments, and explores systems programming.

## 2. Color Palette & 60-30-10 System
- **60% Dominant Neutral Canvas**: Warm technical paper `#F4EFE6` (`#FAF6EE` for soft elevated surfaces). Avoids cold digital sterile whites or washed-out purple tints.
- **30% Structural Foundations**: Deep typographic ink `#141413` with 2px solid structural outlines, hairlines, and 3px–4px hard offset shadows (`box-shadow: 4px 4px 0px #141413`).
- **10% High-Intent Accents**:
  - **Signal Acid Chartreuse** (`#D7FF3F`): Used for primary calls to action, active inspect modes, and interactive highlights.
  - **Signal Vermilion** (`#F04828`): Used selectively for status badges, live transmission indicators, and warning/air-gap callouts.

## 3. Typographic System (2+1 Font Rule)
- **Display**: `Bricolage Grotesque` (Oversized, confident, human-crafted architectural sans with ink traps and high character).
- **Body / Prose**: `Plus Jakarta Sans` (Clean, balanced geometric clarity at 15–16px with 1.6 line height for effortless long-form readability).
- **Technical & Annotations**: `JetBrains Mono` (Tabular numerals, technical coordinates, file transfer specifications, and repository URLs).

## 4. Anti-Slop & Zero-Pill Discipline
- **Zero Static Pill Enclosures**: No rounded-full capsule chips around metadata. All tags and dates use unboxed text with typographic separators (`·` or `/`).
- **No Pseudo-Code Headers**: No `//` comment prefixes, no fake compiler tags ("SYNTHEX v4.0"), no fake scorecards.
- **No Ghost Typography**: No low-opacity giant background watermarks.
- **Single Elevation Depth**: High contrast borders and flat offset drop-shadows create tactile physical depth without messy card-in-card nesting.

## 5. Signature Three.js Metaphor: The Optical Aperture / AetherLink Specimen
Echoing Dhanjit's flagship project **AetherLink** (optical QR stream data transfer), the Three.js experience renders an interactive **Optical Data Rotor / Precision Aperture Specimen**:
- 7-part procedural composite model (`THREE.Group`):
  1. Outer calibration chassis ring with etched tick marks.
  2. Hexagonal optical prism core with transmissive refractive material.
  3. Brass pivot gimbal mounts.
  4. Dual optical data emitter bars.
  5. Concentric rotating encoder rings.
  6. Grounding contact shadow plate to ensure grounded physical presence.
  7. Interactive laser stream / pulse alignment.
- Interaction & Performance:
  - Responsive pointer tracking with silky exponential damping (`THREE.MathUtils.damp`).
  - Collapsible bottom control dock with interactive modes: Solid / Wireframe, Speed Adjustment, Optical Core Disassembly (Exploded view), and Emitter Pulse toggle.
  - Automatic pause when scrolled off-screen via `IntersectionObserver` to save GPU cycles.
  - Native fallback for WebGL-disabled environments or reduced motion preference (`prefers-reduced-motion`).
  - 100% zero-dependency procedural geometry and canvas-generated data maps (zero external 404 assets).

## 6. Usability & NN/g Neo-Brutalism Guardrails
- **WCAG AA Contrast**: Deep ink (`#141413`) on warm paper (`#F4EFE6`) yields an exceptional 14.8:1 contrast ratio, far exceeding the 4.5:1 standard.
- **Interactive Affordances**: Buttons and links have unambiguous hover/active states with physical tactile depression (`translate(2px, 2px)` with shadow collapse).
- **Keyboard Navigation & Visible Focus**: Every interactive control has a 2px offset solid focus ring.
