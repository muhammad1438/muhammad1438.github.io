---
id: css-quality-check
type: hook
trigger: PostToolUse
tool: edit_file
filter: "*.css"
---

# CSS Quality Check Hook

## Purpose
Ensure all CSS changes meet quality standards before committing.

## Validation Rules

### 1. CSS Variables
- [ ] New colors use CSS variable tokens
- [ ] Variables follow naming convention (`--property-modifier`)
- [ ] Light and dark mode values defined

### 2. Responsive Design
- [ ] Mobile-first approach used
- [ ] Breakpoints match existing: 450px, 580px, 768px, 1024px, 1250px
- [ ] No fixed widths without max-width fallback

### 3. Performance
- [ ] No expensive selectors (`[class*="prefix-"]`)
- [ ] Animations use transform/opacity (GPU accelerated)
- [ ] No universal selector (*) in nested rules

### 4. Accessibility
- [ ] Focus states defined for interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Reduced motion media query respected

### 5. Code Quality
- [ ] Comments explain "why" not "what"
- [ ] Related rules grouped together
- [ ] Consistent formatting (2 spaces, no trailing whitespace)

## Auto-Fix Actions

### Prettier Formatting
Run automatically after edit:
```bash
prettier --write assets/css/style.css
```

### CSS Linting
If stylelint configured:
```bash
stylelint assets/css/style.css
```

## Failure Behavior
If validation fails:
1. Report specific issues found
2. Suggest fixes
3. Do not block commit (warning only)
