# CSS Modularization Guide

## Architecture Overview

The CSS has been modularized from a single 3300+ line file into organized, maintainable modules.

## Module Structure

```
assets/css/modules/
├── variables.css        # Design tokens (colors, typography, spacing)
├── reset.css            # CSS reset and base styles
├── animations.css       # Keyframe animations
├── components.css       # Reusable UI components
├── layout.css           # Layout structures
├── sections/            # Section-specific styles
│   ├── sidebar.css      # Profile sidebar
│   ├── navbar.css       # Navigation bar
│   ├── about.css        # About section
│   ├── resume.css       # Resume/education section
│   ├── publications.css # Publications section
│   ├── contact.css      # Contact section
│   └── hero.css         # Hero banner
├── responsive.css       # Media queries
├── accessibility.css    # Accessibility enhancements
└── print.css            # Print styles
```

## Module Responsibilities

### 1. variables.css
Contains CSS custom properties (design tokens):
- Animation timings
- Typography (fonts, sizes, weights)
- Spacing scale
- Border radius values
- Color palettes (light/dark themes)
- Shadows and glows
- Legacy color mappings

### 2. reset.css
Base reset and normalization:
- Box-sizing reset
- Element defaults
- Focus styles
- Body background pattern
- Ambient glow effects

### 3. animations.css
Shared keyframe definitions:
- `shimmer` - Shimmer effects
- `float` - Floating animation
- `pulse-glow` - Pulsing glow
- `gradient-shift` - Gradient animation
- `fade-in`, `slide-up`, `scale-in`

### 4. components.css
Reusable components:
- Main container
- Card styles (sidebar, article)
- Icon boxes
- Typography (h1-h5)
- Titles and underlines
- Scrollbars
- Content cards
- Award cards

### 5. layout.css
Layout structures:
- Main content wrapper

### 6. sections/*.css
Section-specific styles organized by feature.

### 7. responsive.css
All media queries organized by breakpoint:
- 450px, 580px, 768px, 1024px, 1250px

### 8. accessibility.css
Accessibility features:
- Reduced motion support
- High contrast mode
- Focus visible enhancement
- Skip link

### 9. print.css
Print-specific styles:
- Hide interactive elements
- Simplify backgrounds
- Adjust borders

## Import Order

CSS modules must be imported in this specific order:

1. variables.css (dependencies first)
2. reset.css
3. animations.css
4. components.css
5. layout.css
6. sections/*.css
7. responsive.css
8. accessibility.css
9. print.css

## Benefits

### Maintainability
- Each module has a single responsibility
- Easier to find and edit specific styles
- Reduced merge conflicts

### Performance
- Potential for code splitting
- Only load needed modules

### Collaboration
- Clear ownership of modules
- Parallel development
- Easier code reviews

### Scalability
- Add new sections without bloating files
- Clear patterns for new features

## Migration Notes

The original `style.css` (3312 lines) has been preserved for backward compatibility. To fully migrate:

1. Update HTML to use modular imports
2. Test across browsers
3. Remove bundled file if no longer needed

## File Size Comparison

| Module | Lines | Purpose |
|--------|-------|---------|
| variables.css | ~190 | Design tokens |
| reset.css | ~85 | Base styles |
| animations.css | ~50 | Keyframes |
| components.css | ~280 | Reusable UI |
| layout.css | ~10 | Layout |
| sections/*.css | ~1800 | All sections |
| responsive.css | ~550 | Media queries |
| accessibility.css | ~60 | A11y |
| print.css | ~20 | Print |
| **Total** | ~3045 | Modular |

---

**Created**: 2026-03-31
