---
id: implement-feature
type: workflow
domain: web-development
tags: [feature, implementation, frontend]
---

# Implement Feature Workflow

## Purpose
Standard workflow for implementing new features on the portfolio website.

## Steps

### Phase 1: Analysis
1. Read relevant context from `.agents/context/`
2. Check existing implementation in `index.html` and `style.css`
3. Identify required changes and dependencies

### Phase 2: Design
1. Determine visual design based on design system
2. Select appropriate colors from theme variables
3. Plan responsive behavior breakpoints

### Phase 3: Implementation
1. **HTML Structure**
   - Add semantic HTML5 elements
   - Include appropriate ARIA attributes
   - Maintain heading hierarchy

2. **CSS Styling**
   - Use existing CSS variables where possible
   - Add new variables if needed (in `:root`)
   - Follow mobile-first approach
   - Test all breakpoints: 450px, 580px, 768px, 1024px, 1250px

3. **JavaScript Enhancement**
   - Use strict mode
   - Follow existing code patterns
   - Add event listeners for interactivity

### Phase 4: Validation
1. **Accessibility Check**
   - Verify keyboard navigation
   - Check focus states
   - Validate color contrast
   - Test with screen reader

2. **Performance Check**
   - Verify no layout shifts
   - Check animation performance (60fps)
   - Ensure images are optimized

3. **Responsive Check**
   - Test on mobile (< 580px)
   - Test on tablet (580px - 1024px)
   - Test on desktop (> 1024px)

### Phase 5: Documentation
1. Update this workflow if new patterns discovered
2. Add notes to `.agents/memory/` for future reference

## Exit Criteria
- [ ] Feature implemented and functional
- [ ] All validation checks passed
- [ ] Code follows established patterns
- [ ] No console errors or warnings
