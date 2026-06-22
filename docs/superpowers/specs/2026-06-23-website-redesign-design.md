# Website Redesign Design Spec

**Date:** 2026-06-23  
**Project:** Dr. Muhammad Fahad Arshad — Personal Researcher Portfolio  
**Reference inspiration:** [embe-vice.com/works-default](https://www.embe-vice.com/works-default) (Azurio Template)  
**Direction:** Scientific Editorial — keep the scientific identity (catalysis/crystallography motifs), elevate with editorial polish

---

## 1. Context & Problem Statement

The current site (`muhammad1438.github.io`) is a Next.js 16 static-export portfolio for Dr. Muhammad Fahad Arshad, an experimental & computational catalysis researcher. It has good content and clever on-theme interactive elements (perovskite crystal canvas, skills constellation, OpenAlex publications), but several critical issues:

### Issues to Fix
1. **Light mode is completely broken** — `page.tsx` and most components hardcode dark colors (`text-white`, `bg-[#0c101c]`, `border-white/[0.06]`, `text-[#9aa3b8]`, `text-[#00d4ff]`, `text-[#f5a623]`). Light theme CSS variables are defined in `globals.css` but never referenced by components.
2. **`SectionBadge` uses non-existent `light:` variant** — Tailwind v4 has `dark:` variant only, not `light:`.
3. **`MolecularLattice` and `SkillsConstellation`** use hardcoded canvas colors that don't adapt to light mode.
4. **670-line `page.tsx`** — all sections inline in one file, unmaintainable.
5. **Font choice** — Plus Jakarta Sans body font is decent but Inter is the research-backed best choice for readability.
6. **No fluid type scale** — sizes use static Tailwind breakpoints (`text-4xl sm:text-5xl md:text-7xl`) instead of smooth `clamp()` scaling.
7. **No scroll-reveal animations** — sections appear statically (the reference uses smooth scroll-reveal).
8. **`PublicationsList` uses relative import** `../../data/publications.json` instead of `@/data/`.
9. **No `prefers-reduced-motion` support** — 3D and animations always run.
10. **No WebGL fallback** — if canvas/WebGL unavailable, blank background.

---

## 2. Tech Stack

| Component | Current | Change |
|-----------|---------|--------|
| Framework | Next.js 16.2.9 (static export) | Keep |
| React | 19.2.4 | Keep |
| Styling | Tailwind CSS v4 | Keep |
| Animation | Framer Motion 12 | Keep |
| Theme | next-themes 0.4.6 | Keep |
| UI primitives | shadcn/ui (base-nova) | Keep |
| Icons | lucide-react | Keep |
| 3D | None (2D canvas) | **Add: @react-three/fiber + @react-three/drei + three** |
| Heading font | Instrument Serif | Keep |
| Body font | Plus Jakarta Sans | **Switch to Inter** |
| Mono font | JetBrains Mono | Keep |

**Static export constraint:** `next.config.ts` has `output: "export"`. The WebGL crystal must be loaded via `next/dynamic` with `ssr: false` to work with static export. All data is client-side (publications JSON is bundled, not fetched at runtime).

**Next.js 16 breaking changes:** Per `AGENTS.md`, this is NOT the Next.js from training data. Must consult `node_modules/next/dist/docs/` before writing Next.js-specific code (App Router conventions, metadata, font loading, etc.).

---

## 3. Theme System

### Semantic Token Layer

All components reference semantic tokens — never raw hex values. Both themes map to the same tokens.

```css
/* globals.css — token definitions */

/* ─── Dark theme (default) ─── */
:root, .dark {
  --bg-base:           #080c18;
  --surface-1:         #0d1220;   /* cards */
  --surface-2:         #0c101c;   /* alt section bg */
  --text-heading:      #ffffff;
  --text-body:         #c8cdde;
  --text-muted:        #9aa3b8;
  --accent-primary:    #00d4ff;   /* cyan */
  --accent-secondary:  #f5a623;   /* gold */
  --border-subtle:     rgba(255, 255, 255, 0.07);
  --border-hover:      rgba(0, 212, 255, 0.25);
  --glass-bg:          rgba(255, 255, 255, 0.02);
  --glass-border:      rgba(255, 255, 255, 0.06);
}

/* ─── Light theme (warm scientific paper) ─── */
.light {
  --bg-base:           #f5f2ec;
  --surface-1:         #faf8f4;   /* cards */
  --surface-2:         #f0ede5;   /* alt section bg */
  --text-heading:      #1a1c22;
  --text-body:         #3d4452;
  --text-muted:        #6b7280;
  --accent-primary:    #0369a1;   /* deeper cyan for contrast */
  --accent-secondary:  #b45309;   /* deeper gold for contrast */
  --border-subtle:     rgba(26, 28, 34, 0.10);
  --border-hover:      rgba(3, 105, 161, 0.25);
  --glass-bg:          rgba(0, 0, 0, 0.02);
  --glass-border:      rgba(26, 28, 34, 0.08);
}
```

### Tailwind v4 Integration

Map tokens to Tailwind theme in `@theme inline`:

```css
@theme inline {
  --color-accent-primary:   var(--accent-primary);
  --color-accent-secondary: var(--accent-secondary);
  --color-text-heading:     var(--text-heading);
  --color-text-body:        var(--text-body);
  --color-text-muted:       var(--text-muted);
  --color-surface-1:        var(--surface-1);
  --color-surface-2:        var(--surface-2);
  --color-border-subtle:    var(--border-subtle);
  /* ...existing shadcn tokens... */
}
```

Components then use `text-text-heading`, `bg-surface-1`, `border-border-subtle`, `text-accent-primary`, etc. — all theme-aware automatically.

### Background gradients (both themes)

Dark: radial cyan/gold glows on deep navy (keep current, refined).  
Light: subtle warm radial tints on cream (keep current light body background, refined).

---

## 4. Typography

### Font Pairing

| Role | Font | Weights | Rationale |
|------|------|---------|-----------|
| Headings | **Instrument Serif** | 400 + italic | "Elegant high-contrast display serif, distinctly 2026" (research). Editorial/scientific authority. Already in use — keep. |
| Body | **Inter** | 300, 400, 500, 600 | "Strongest free option for UI body text — large x-height, open apertures, clear letterform distinction" (research). Variable font = better performance. Switch from Plus Jakarta Sans. |
| Mono | **JetBrains Mono** | 400 | Standard for technical labels, data, crystallography notation. Already in use — keep. |

### next/font/google Configuration

```tsx
// layout.tsx
const instrumentSerif = Instrument_Serif({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
```

### Fluid Type Scale (clamp(), 320px → 1440px)

| Element | Mobile | Desktop | CSS | Line-height | Letter-spacing | Weight | Font |
|---------|--------|---------|-----|-------------|----------------|--------|------|
| Hero (h1) | 2.5rem (40px) | 5rem (80px) | `clamp(2.5rem, 1rem + 5vw, 5rem)` | 0.95 | -0.03em | 400 | Serif |
| Section (h2) | 1.75rem (28px) | 3rem (48px) | `clamp(1.75rem, 1rem + 3vw, 3rem)` | 1.1 | -0.02em | 400 | Serif |
| Subsection (h3) | 1.25rem (20px) | 1.75rem (28px) | `clamp(1.25rem, 1rem + 1vw, 1.75rem)` | 1.25 | -0.01em | 600 | Sans |
| Card title (h4) | 1.063rem (17px) | 1.25rem (20px) | `clamp(1.063rem, 1rem + 0.3vw, 1.25rem)` | 1.3 | 0 | 600 | Sans |
| Body (p) | 1rem (16px) | 1.125rem (18px) | `clamp(1rem, 0.94rem + 0.2vw, 1.125rem)` | 1.65 | 0 | 400 | Sans |
| Small/caption | 0.875rem (14px) | 0.875rem | `0.875rem` | 1.5 | 0 | 400 | Sans |
| Mono label | 0.75rem (12px) | 0.75rem | `0.75rem` | 1.4 | 0.05em | 400 | Mono |
| Nav | 0.8125rem (13px) | 0.8125rem | `0.8125rem` | 1 | 0.02em | 500 | Sans |

Implemented as CSS custom properties in `globals.css` and/or Tailwind utility classes. The `clamp()` form `Xvw + Yrem` ensures WCAG 1.4.4 compliance (browser zoom works).

---

## 5. 3D WebGL Crystal Structure

### Library
`@react-three/fiber` + `@react-three/drei` + `three`

### Subject
Perovskite ABO₃ supercell — **LaCoO₃** (directly relevant to Dr. Arshad's PhD thesis on La-based transition metal oxide catalysts). 2×2×2 supercell.

### Atoms
| Site | Element | Color token | Radius | Material |
|------|---------|-------------|--------|----------|
| A | La (Lanthanum) | accent-secondary (gold) | 0.8 | metalness 0.6, roughness 0.3 |
| B | Co (Cobalt) | text-heading (silver/ink) | 0.5 | metalness 0.7, roughness 0.25 |
| O | O (Oxygen) | accent-primary (cyan) | 0.35 | emissive glow, emissiveIntensity 0.4 |

### Bonds
B–O octahedral bonds as thin cylinders (radius 0.04), color = accent-primary at low opacity (0.3). Crystallographically accurate — same bond logic as current `MolecularLattice`.

### Motion & Interaction
- **Auto-rotation:** slow Y-axis rotation (0.0012 rad/frame equivalent)
- **X-oscillation:** subtle sinusoidal tilt
- **Mouse parallax:** camera position shifts slightly with cursor
- **Scroll-reactive:** as user scrolls past hero, camera dollies out slightly and rotation speed increases (subtle, not distracting)
- **Phonon breathing:** subtle scale pulsation (±2.5%) on the whole crystal
- **`prefers-reduced-motion`:** static pose, no animation, no parallax

### Performance
- `dpr={[1, 2]}` — retina-aware, capped at 2x
- Lazy-loaded: `dynamic(() => import('./CrystalScene'), { ssr: false })` — required for static export
- IntersectionObserver: pause rendering when hero is off-screen
- Fallback: if WebGL context fails, show a CSS radial-gradient placeholder (same accent colors)
- Atom count: ~63 atoms (27 A + 8 B + 28 O) — lightweight scene

### Theme Adaptation
Atom and bond colors read from CSS variables (`getComputedStyle`) or passed as props from a theme-aware wrapper. Crystal glows in dark mode, is subtler in light mode.

### Placement
Fixed behind the **hero section only** (not full-page). `position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0.7` (dark) / `opacity: 0.4` (light). Content sits at `z-index: 10`.

---

## 6. Component Architecture

### New file structure

```
src/
  app/
    layout.tsx          — fonts (Inter swap), metadata, Providers
    page.tsx            — thin composition: imports section components
    globals.css         — token system, type scale, utilities
    providers.tsx       — ThemeProvider + TooltipProvider (keep)
  components/
    three/
      CrystalScene.tsx       — Canvas, lights, camera, OrbitControls (disabled), lazy wrapper
      PerovskiteCrystal.tsx  — builds atoms + bonds, animation logic
      Atom.tsx               — single atom mesh (reusable, props: position, color, radius, material)
    sections/
      HeroSection.tsx
      AboutSection.tsx
      ExperienceSection.tsx
      EducationSection.tsx
      SkillsSection.tsx
      ProjectsSection.tsx
      PublicationsSection.tsx
      AwardsSection.tsx
      ContactSection.tsx
      FooterSection.tsx
    Navbar.tsx           — refactor: use tokens for accent colors
    SectionBadge.tsx     — fix: use dark: variant instead of light:
    Typewriter.tsx       — refactor: cursor color → token
    StatsCounter.tsx     — keep (no color issues)
    SkillsConstellation.tsx — refactor: read CSS vars for colors, theme-aware edges
    PublicationsList.tsx — refactor: tokens, fix import path to @/data/
    ContactForm.tsx      — refactor: tokens
    ui/                  — keep existing shadcn primitives
  lib/
    utils.ts             — keep
```

### Deleted files
- `src/components/MolecularLattice.tsx` — replaced by `three/` directory

### page.tsx (new — thin composition)
```tsx
// ~40 lines: imports all sections, composes them, scroll-top button
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
// ... etc
export default function HomePage() {
  // scroll-top state + button only
  return (
    <div className="relative min-h-screen ...">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <PublicationsSection />
      <AwardsSection />
      <ContactSection />
      <FooterSection />
      {/* scroll-top button */}
    </div>
  );
}
```

---

## 7. Layout & Visual Polish

### Whitespace & Rhythm
- Section vertical padding: `clamp(5rem, 10vw, 8rem)` (fluid, more generous than current `py-24`)
- Max content width: `max-w-[1180px]` (keep)
- Horizontal padding: `px-6` (keep)

### Editorial Headlines
- Instrument Serif at fluid scale (Section 4)
- Accent words in `text-accent-primary` (cyan) and `text-accent-secondary` (gold) — keep current pattern, refine
- Example: "A researcher at the boundary of **simulation** and the **flask**."

### Section Badges (crystallography notation)
- Keep `SectionBadge` with ⟨h k l⟩ notation — distinctive, on-brand
- Fix: replace `light:text-[#0369a1]` with `dark:text-accent-primary` + base `text-accent-primary` (since accent-primary is already theme-aware via token)
- Keep IntersectionObserver reveal animation

### Scroll-Reveal Animations
- Framer Motion `whileInView` with `viewport={{ once: true, margin: "-80px" }}`
- Fade-up: `initial={{ opacity: 0, y: 24 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Staggered children for card grids (0.08s delay between items)
- `prefers-reduced-motion`: skip animations (set initial = animate)

### Cards
- `glass-panel` class (keep, refactor to tokens): `bg-glass-bg border border-glass-border backdrop-blur-xl rounded-2xl`
- Hover: `border-border-hover`, subtle lift (`translateY(-2px)`), accent glow shadow
- Theme-aware in both modes

### Marquee CTA
- In the contact section, add a subtle infinite-scroll marquee with research keywords:
  "H₂ Production · CO₂ Valorisation · DFT · Molecular Dynamics · Machine Learning · Zeolites · Heterogeneous Catalysis · ..."
- CSS animation (`@keyframes marquee`), `prefers-reduced-motion` → static
- Inspired by the reference's marquee CTA, but text-based (no images needed for a researcher site)

### Skills Constellation (refactored)
- Keep the canvas-based interactive graph (it's good and on-theme)
- Read node colors from CSS variables (via `getComputedStyle` on mount + theme change)
- Edge color: `rgba(var(--text-body-rgb), 0.05)` — theme-aware
- Tooltip: use tokens
- Legend buttons: use tokens

### Navbar (refactored)
- Already mostly token-based — just replace remaining `#00d4ff` hardcoded accents with `text-accent-primary`
- Keep scroll-spy, smooth scroll, theme toggle, mobile sheet

---

## 8. Responsive Design

- **Mobile (< 640px):** single column, hero stacks (info above orb), nav becomes sheet, constellation height 400px, font sizes at clamp minimums
- **Tablet (640-1024px):** 2-column grids where appropriate, hero 12-col grid activates
- **Desktop (> 1024px):** full layout, 12-col grids, constellation 500px
- All fluid type sizes scale smoothly — no breakpoint snaps
- Test: 320px, 375px, 768px, 1024px, 1440px, 1920px

---

## 9. Accessibility

- **Color contrast:** WCAG AA (4.5:1 body, 3:1 large text) in both themes — verified with the chosen token values
- **`prefers-reduced-motion`:** disable 3D animation, scroll reveals, marquee, typewriter
- **Keyboard navigation:** all interactive elements focusable, visible focus rings (`outline-ring/40`)
- **Semantic HTML:** proper heading hierarchy (h1 → h2 → h3), section landmarks, alt text on images
- **ARIA:** theme toggle has `aria-label`, canvas elements are decorative (`aria-hidden`)

---

## 10. Build & Deployment

- **Static export:** `output: "export"` in `next.config.ts` — produces `out/` directory
- **WebGL + static export:** Crystal loaded via `dynamic(..., { ssr: false })` — renders client-side only
- **GitHub Pages:** deploy `out/` to `muhammad1438.github.io` repo
- **Verification:** `npm run build` must succeed, `out/` must contain all assets, no runtime errors in browser console

---

## 11. Content (No Changes)

All existing content is preserved:
- Hero: name, title, tagline, quote, CV/PDF/publications links, quick stats (citations, h-index, i10-index, countries)
- About: bio narrative, identity card, animated counters
- Experience: 3 positions (UM6P, CAS, PITAC) with timeline
- Education: PhD (UCAS) + BSc (UET) cards
- Skills: 5 groups (Computational, Experimental, AI/ML, Research focus, Languages) with constellation
- Projects: 4 software cards (Autoclave Calculator, oa_corpus, scrysrust, OpenContextFramework)
- Publications: 11 papers from `data/publications.json` with search/filter/sort
- Awards: 3 awards + 3 conferences/teaching
- Contact: mailto form + contact info + social links (GitHub, LinkedIn, ORCID)
- Footer: copyright + keyword line

---

## 12. Out of Scope (YAGNI)

- No blog/CMS
- No i18n
- No backend/API routes (static export)
- No image optimization (unoptimized per config)
- No analytics
- No contact form backend (mailto only — keep current approach)
- No multi-page routing (single-page scroll site — keep current approach)
- No GSAP/Lenis smooth scroll (Framer Motion is sufficient and already installed)
