---
id: accessibility-standards
type: constraint
domain: web-development
severity: error
---

# Accessibility Standards

## WCAG 2.1 AA Compliance

### Level A Requirements (Must Pass)
- All functionality available via keyboard
- No keyboard traps
- Unique page titles
- Focus order is logical
- Images have alt text
- Form inputs have labels
- Color is not the only means of conveying information
- Sufficient color contrast (3:1 for large text)

### Level AA Requirements (Should Pass)
- Color contrast ratio of at least 4.5:1 for normal text
- Color contrast ratio of at least 3:1 for large text (18px+ or 14px+ bold)
- Focus visible with 2px outline minimum
- Multiple ways to find pages (navigation, search)
- Headings and labels describe topic/purpose
- Language of page is specified (lang attribute)
- No content that flashes more than 3 times per second

## Implementation Checklist

### Semantic HTML
- [ ] Use `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- [ ] Heading hierarchy (h1 → h2 → h3) without skipping levels
- [ ] Lists use `<ul>`, `<ol>`, `<dl>` appropriately
- [ ] Tables have `<caption>` or associated headers

### Interactive Elements
- [ ] All buttons are `<button>` or `[role="button"]`
- [ ] Links use `<a>` with meaningful href
- [ ] Custom controls have ARIA roles and keyboard handlers
- [ ] Focus states visible on all interactive elements

### Images and Media
- [ ] Informative images have descriptive alt text
- [ ] Decorative images have `alt=""` and `role="presentation"`
- [ ] Complex images have long descriptions linked
- [ ] Icons have `aria-label` or `aria-hidden` as appropriate

### Forms
- [ ] All inputs have associated `<label>` elements
- [ ] Error messages are clearly identified
- [ ] Required fields are indicated (aria-required)
- [ ] Form validation errors are accessible

### Dynamic Content
- [ ] Live regions announced (aria-live)
- [ ] Modal dialogs trap focus and have aria-modal
- [ ] Tab panels use proper ARIA tab pattern
- [ ] Loading states are announced

### Motion and Animation
- [ ] Respect `prefers-reduced-motion` media query
- [ ] No auto-playing content with motion > 5 seconds
- [ ] User can pause, stop, or hide moving content

## Testing Tools

1. **Automated**: axe-core, WAVE, Lighthouse
2. **Manual**: Keyboard navigation, screen reader (NVDA/VoiceOver)
3. **Color Contrast**: WebAIM Contrast Checker

## Severity Enforcement
- **Error**: Missing alt text, missing labels, keyboard traps
- **High**: Insufficient contrast, missing focus states
- **Medium**: Skipped heading levels, missing landmarks
- **Low**: Minor ARIA attribute improvements

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Checklist](https://webaim.org/standards/wcag/checklist)
- [A11y Project](https://www.a11yproject.com/)
