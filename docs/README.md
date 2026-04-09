# Portfolio Website Documentation

## Overview

This is an enhanced academic portfolio website for Dr. Muhammad Fahad Arshad, featuring a modern design with light/dark theme support, responsive layouts, and accessibility compliance.

## Project Structure

```
portfolio_website/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.css       # Bundled stylesheet (legacy)
│   │   └── modules/        # Modular CSS architecture
│   │       ├── variables.css
│   │       ├── reset.css
│   │       ├── animations.css
│   │       ├── components.css
│   │       ├── layout.css
│   │       ├── sections/
│   │       │   ├── sidebar.css
│   │       │   ├── navbar.css
│   │       │   ├── about.css
│   │       │   ├── resume.css
│   │       │   ├── publications.css
│   │       │   ├── contact.css
│   │       │   └── hero.css
│   │       ├── responsive.css
│   │       ├── accessibility.css
│   │       └── print.css
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   ├── images/
│   │   └── IMAGE_PROMPTS.md
│   └── cv.pdf
├── .agents/                # AI agent configuration
│   ├── manifest.json
│   ├── context/
│   ├── workflows/
│   ├── skills/
│   ├── hooks/
│   ├── constraints/
│   └── memory/
├── .omc/                   # Open Context Framework
│   └── autopilot/
└── docs/                   # Documentation (this folder)
```

## Design System

### Color Palette

#### Light Mode - Warm Academic Parchment
- **Background**: `#faf9f6` (warm off-white)
- **Surface**: `#f5f3ed` (warm gray)
- **Accent**: `#0369a1` (Deep Ocean Blue)
- **Secondary Accent**: `#b45309` (Warm Amber)

#### Dark Mode - Molecular Observatory
- **Background**: `#0a0e1a` (deep navy)
- **Surface**: `#0f1428` (rich navy)
- **Accent**: `#22d3ee` (Electric Cyan)
- **Secondary Accent**: `#fbbf24` (Stellar Gold)

### Typography

| Role | Font | Usage |
|------|------|-------|
| Display | DM Serif Display | Headings, titles |
| Body | Syne | Body text, paragraphs |
| Mono | JetBrains Mono | Code, technical content |

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |

### Border Radius

| Token | Value |
|-------|-------|
| `--radius-sm` | 6px |
| `--radius-md` | 10px |
| `--radius-lg` | 14px |
| `--radius-xl` | 20px |
| `--radius-full` | 9999px |

## Features

### Core Functionality
- Light/dark theme toggle with localStorage persistence
- Responsive sidebar navigation (mobile-optimized)
- Single-page application with page navigation
- Contact form with validation
- Testimonials modal
- CV download

### Accessibility
- WCAG 2.1 AA compliance
- Skip link for keyboard navigation
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode support (`prefers-contrast`)
- Enhanced focus visible states
- Semantic HTML structure
- ARIA labels on interactive elements

### Responsive Breakpoints
- Mobile: < 450px
- Small: 450px - 579px
- Medium: 580px - 767px
- Large: 768px - 1023px
- XL: 1024px - 1249px
- XXL: ≥ 1250px

## Sections

1. **Hero** - Full-width banner with animated gradient
2. **About** - Research summary and highlights
3. **Resume** - Education, experience, skills
4. **Publications** - Journal articles and conferences
5. **Contact** - Form and contact information
6. **Affiliations** - Funding and institutional logos
7. **Land Acknowledgment** - Indigenous land recognition

## Development

### Using Modular CSS

To use individual CSS modules instead of the bundled file:

```html
<!-- In <head> -->
<link rel="stylesheet" href="assets/css/modules/variables.css">
<link rel="stylesheet" href="assets/css/modules/reset.css">
<link rel="stylesheet" href="assets/css/modules/animations.css">
<link rel="stylesheet" href="assets/css/modules/components.css">
<link rel="stylesheet" href="assets/css/modules/layout.css">
<link rel="stylesheet" href="assets/css/modules/sections/sidebar.css">
<link rel="stylesheet" href="assets/css/modules/sections/navbar.css">
<link rel="stylesheet" href="assets/css/modules/sections/about.css">
<link rel="stylesheet" href="assets/css/modules/sections/resume.css">
<link rel="stylesheet" href="assets/css/modules/sections/publications.css">
<link rel="stylesheet" href="assets/css/modules/sections/contact.css">
<link rel="stylesheet" href="assets/css/modules/sections/hero.css">
<link rel="stylesheet" href="assets/css/modules/responsive.css">
<link rel="stylesheet" href="assets/css/modules/accessibility.css">
<link rel="stylesheet" href="assets/css/modules/print.css">
```

### Customization

#### Changing Colors
Edit `assets/css/modules/variables.css` to modify theme colors.

#### Adding Sections
1. Add HTML structure to `index.html`
2. Create corresponding CSS in `assets/css/modules/sections/`
3. Import in the manifest

#### Modifying Animations
Edit `assets/css/modules/animations.css` for animation changes.

## AI Agent Configuration

The `.agents/` directory contains configuration for AI-assisted development:

- **manifest.json** - Project capabilities and context
- **context/** - Academic portfolio background
- **workflows/** - Implementation procedures
- **skills/** - Design guidelines
- **hooks/** - Quality checks
- **constraints/** - Accessibility standards
- **memory/** - Design decisions

## Image Generation

See `assets/images/IMAGE_PROMPTS.md` for AI image generation prompts for:
- Hero backgrounds
- Research icons
- Publication thumbnails
- Affiliation logos

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

## License

This project is for personal/academic use.

---

**Last Updated**: 2026-03-31
