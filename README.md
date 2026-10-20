# Dhanjit Boro — Engineering Portfolio

[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=three.js)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![Vulnerabilities](https://img.shields.io/badge/vulnerabilities-0-brightgreen.svg?style=flat-square)](https://github.com/dhanjit97)

A distinctive, human-authored neo-brutalist engineering portfolio for **Dhanjit Boro**, Computer Science and Engineering student based in Kokrajhar, India.

---

## 🛠 Creative Thesis & Design System

The portfolio is structured around **The Engineer's Workbench**—a tactile, editorial, and technically grounded design language avoiding generic corporate AI templates:

- **Strict 60-30-10 Color Architecture:**
  - `60%` Primary Surface: Warm draft paper (`#F4EFE6` / `#FAF6EE`)
  - `30%` Typographic Ink & Borders: Deep technical ink (`#141413`) with solid $2\text{px}$–$3\text{px}$ strokes and tactile offset drop shadows (`4px 4px 0px #141413`)
  - `10%` Signal Accents: Acid chartreuse (`#D7FF3F`) for focus states and signal vermilion (`#F04828`) for technical indicators
- **Expressive Typography:**
  - Display: `Bricolage Grotesque` (bold, tight tracking, expressive geometric letterforms)
  - Body: `Plus Jakarta Sans` (open counters, clean legibility across small screens)
  - Technical & Data: `JetBrains Mono` (code specimens, memory counters, sequence headers)
- **Zero-Pill Discipline:**
  - Avoids decorative rounded badge pills. Metadata is presented with clean unboxed text separated by typographic middots (`·`) or monospace brackets.
- **Accessibility & Touch Ergonomics:**
  - WCAG AA compliant text contrast ($>14:1$ for primary ink on cream paper)
  - All interactive controls adhere to minimum touch targets of $\ge 44\text{px} \times 44\text{px}$

---

## 📦 Verified Engineering Work

All project entries, claims, and links reflect verified public source repositories:

1. **AetherLink: Optical QR Stream File Transfer** (Pinned Repository / Experiment)
   - *Problem:* Moving data across physically air-gapped workstations without electromagnetic radio emissions or untrusted physical USB drives.
   - *Architecture:* High-frequency dynamic QR code sequence streaming engine in TypeScript/React, paired with computer vision camera capture, CRC-16 frame synchronization, and bitstream reassembly.
2. **Spam Classification App with DeepCNN** (Prototype / Experiment)
   - *Problem:* Fast NLP inference latency without recurrent network overhead.
   - *Architecture:* 1D Convolutional Neural Network with multi-scale kernel filters (sizes 3, 4, 5) running local CPU tensor inference with hot-swappable model checkpoints.
3. **Wordlist Generator** (Shipped Utility / 1 GitHub Star)
   - *Problem:* Large combinatorial permutations crashing memory buffers.
   - *Architecture:* Python streaming lazy generator iterators with buffered disk flushing and a CustomTkinter desktop interface.
4. **Lab Management System** (Forked Project)
   - *Problem:* Lab slot reservation conflicts without complex database setups.
   - *Architecture:* Lightweight Tkinter application utilizing interval overlap conflict resolution with structured CSV flat-file persistence.

---

## ⚡ Three.js Signature Specimen

- **Specimen 01 — Optical Data Rotor & Laser Aperture:**
  - 100% procedural WebGL composite model using vanilla Three.js (no external 3D asset downloads or 404 risks).
  - 7 geometric assemblies: outer gimbal cage, optical prism core, lens turret, laser guide path, fiducial alignment marks, and calibration dials.
  - Interactive orbit damping, auto-rotation toggle, and wireframe/exploded view modes.
  - Performance & accessibility: Pauses automatically when offscreen via `IntersectionObserver`, respects `prefers-reduced-motion`, and cleans up geometries, materials, and canvas contexts on unmount.

---

## 🔒 Security Posture & Hardening

This codebase has undergone a comprehensive security audit for public GitHub hosting:

- **Zero Secrets / API Keys in Client Code:** No credentials, tokens, or private secrets exist in source files. `.env.example` provides documentation templates while `.gitignore` strictly blocks all `.env*` files.
- **Reverse Tabnabbing Protection:** All external links (`target="_blank"`) enforce `rel="noopener noreferrer"`.
- **Zero XSS / Unsafe DOM Operations:** No usage of `dangerouslySetInnerHTML`, `innerHTML`, or `eval()`.
- **Browser Security Directives:** `index.html` includes `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
- **Dependency Audit:** Clean dependency tree with `0` npm vulnerabilities (`npm audit` verified).

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or higher
- npm `9.x` or higher

### Installation
```bash
# Clone repository
git clone https://github.com/dhanjit97/portfolio.git
cd portfolio

# Install dependencies (lockfile validated)
npm install
```

### Local Development
```bash
# Start Vite development server on port 3000
npm run dev
```
Open `http://localhost:3000` in your browser.

### Production Build
```bash
# Type check and compile production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

### Code Quality & Validation
```bash
# Run TypeScript compilation check
npm run lint
```

---

## 📁 Repository Structure

```
.
├── .env.example              # Environment variable documentation template
├── .gitignore                # Comprehensive ignore rules for secrets & builds
├── LICENSE                   # MIT License
├── README.md                 # Project documentation & architecture overview
├── docs/
│   ├── CONTENT_VERIFICATION.md # Verified claims, repository URLs, and sources
│   └── DESIGN_EXPLORATION.md   # Visual architecture & color mathematics
├── index.html                # HTML entry point with security meta tags & fonts
├── metadata.json             # AI Studio configuration manifest
├── package.json              # Dependencies and build scripts
├── package-lock.json         # Audited dependency tree (0 vulnerabilities)
├── src/
│   ├── App.tsx               # Main layout sequence
│   ├── index.css             # Tailwind CSS tokens & neo-brutalist tactile utilities
│   ├── main.tsx              # React DOM entry point
│   ├── assets/               # Generated technical schematics & visual blueprints
│   ├── components/
│   │   ├── AboutSection.tsx        # Engineering background & principles
│   │   ├── ContactSection.tsx      # Verified email copy & profile links
│   │   ├── FieldNotes.tsx          # Works in progress with technical inquiry notes
│   │   ├── Footer.tsx              # Minimalist compliant footer
│   │   ├── Hero.tsx                # Asymmetrical editorial grid & 3D specimen
│   │   ├── MarqueeTape.tsx         # Tactile hazard marquee separator
│   │   ├── Navbar.tsx              # Top Bar Contract (Wordmark - Links - Primary CTA)
│   │   ├── ProjectDetailModal.tsx  # Deep-dive architecture dossier modal
│   │   ├── ProjectShowcase.tsx     # Verified code showcase & grid layout
│   │   ├── ProjectVisuals.tsx      # Canvas 2D programmatic architecture diagrams
│   │   ├── ScrollProgress.tsx      # Top progress bar & jump-to-top button
│   │   ├── TechnicalFocus.tsx      # Core engineering inquiry pillars
│   │   ├── ThreeSpecimen.tsx       # Procedural Three.js 3D model
│   │   └── VisualAssetGenerator.tsx# Live telemetry & NLP classification simulator
│   ├── data/
│   │   └── portfolioData.ts        # Grounded facts, projects, and personal data
│   └── types/
│       └── portfolio.ts            # Strict TypeScript interfaces
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite configuration with React & Tailwind plugins
```

---

## 📄 License & Credits

- Created and maintained by **[Dhanjit Boro](https://github.com/dhanjit97)**
- Licensed under the **[MIT License](./LICENSE)**
#   P o r t f o l i o  
 