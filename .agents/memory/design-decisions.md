---
id: design-decisions
type: memory
domain: design
tags: [decisions, css, typography, color]
---

# Design Decisions Memory

## Purpose
Track important design decisions and their rationale for future reference.

## Documented Decisions

### 2026-03-31: Theme Color Strategy
**Decision**: Maintain dual-theme architecture with distinct personalities

**Rationale**:
- Light mode ("Warm Academic Parchment") conveys approachability and traditional academic values
- Dark mode ("Molecular Observatory") appeals to modern tech aesthetic and reduces eye strain

**Colors Selected**:
- Light accent: Deep Ocean Blue (#0369a1) - trust, professionalism, depth
- Light secondary: Warm Amber (#b45309) - energy, warmth, creativity
- Dark accent: Electric Cyan (#22d3ee) - innovation, technology, clarity
- Dark secondary: Stellar Gold (#fbbf24) - achievement, quality, distinction

**How to Apply**:
- Use primary accent for interactive elements (links, buttons, focus states)
- Use secondary accent for highlights, badges, and secondary actions
- Maintain 4.5:1 contrast ratio minimum

### 2026-03-31: Typography Hierarchy
**Decision**: Use fluid typography with clamp() for responsive scaling

**Rationale**:
- Smooth scaling between breakpoints
- No sudden jumps in font size
- Better reading experience on all devices

**Implementation**:
```css
font-size: clamp(1.5rem, 4vw, 2rem);
```

### 2026-03-31: Animation Philosophy
**Decision**: Subtle, purposeful animations only

**Rationale**:
- Animations should enhance UX, not distract
- Respect users with vestibular disorders
- Performance priority (60fps target)

**Duration Guidelines**:
- Micro-interactions: 150-250ms
- Page transitions: 300-500ms
- Complex animations: 500-800ms

### 2026-03-31: Hero Section Approach
**Decision**: Add hero banner with abstract scientific visualization

**Rationale**:
- Creates immediate visual impact
- Establishes research identity
- Differentiates from generic academic templates

**Implementation Notes**:
- Use AI-generated molecular/crystal lattice abstract art
- Ensure text overlay remains readable (gradient overlay)
- Parallax effect optional (respect reduced-motion)

## Decisions Pending

1. Custom icon set vs. Ionicons (current)
2. Research gallery grid layout
3. Publication thumbnail strategy

## References
- Specification: `.omc/autopilot/spec.md`
- Image prompts: `assets/images/IMAGE_PROMPTS.md`
