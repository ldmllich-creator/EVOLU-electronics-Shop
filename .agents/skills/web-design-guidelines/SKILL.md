---
name: web-design-guidelines
description: Modern web design guidelines for creating beautiful, responsive, and accessible websites and web applications. Covers UI/UX best practices, color theory, typography, and layout patterns.
---

# Web Design Guidelines

Modern design standards for web projects.

## Design Principles

1. **Clarity** — every element should have a purpose
2. **Consistency** — use the same patterns throughout
3. **Hierarchy** — guide the eye with size, color, spacing
4. **Feedback** — respond to user actions immediately
5. **Accessibility** — design for everyone

## Color System

### Color Palette Structure
- **Primary** — main brand color (buttons, links, accents)
- **Secondary** — supporting color
- **Neutral** — grays for text and backgrounds
- **Success** — green for positive actions
- **Warning** — yellow/orange for caution
- **Error** — red for errors and destructive actions

### Dark Mode
- Background: #0a0a0a to #1a1a1a
- Surface: #1a1a1a to #2a2a2a
- Text: #ffffff (primary), #a0a0a0 (secondary)
- Ensure 4.5:1 contrast ratio minimum

## Typography

### Font Stack
```css
/* Modern system fonts */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Headings */
h1: 2.5rem (40px), font-weight: 700
h2: 2rem (32px), font-weight: 600
h3: 1.5rem (24px), font-weight: 600
p: 1rem (16px), font-weight: 400, line-height: 1.6
```

### Google Fonts Recommended
- **Inter** — universal, clean
- **Outfit** — modern, geometric
- **Roboto** — friendly, readable
- **Space Grotesk** — techy, stylish

## Layout

### Spacing Scale
```
4px → 8px → 12px → 16px → 24px → 32px → 48px → 64px → 96px
```

### Container
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 24px;
```

### Responsive Breakpoints
```css
@media (max-width: 768px)  /* tablet */
@media (max-width: 480px)  /* mobile */
```

## UI Components

### Buttons
- Primary: filled, brand color
- Secondary: outline or subtle background
- Border-radius: 8px–12px
- Padding: 12px 24px
- Hover: darken by 10% + subtle shadow

### Cards
- Background: slightly elevated
- Border-radius: 12px–16px
- Padding: 24px
- Box-shadow: 0 2px 8px rgba(0,0,0,0.1)

### Forms
- Input height: 44px minimum (touch-friendly)
- Border: 1px solid #e0e0e0
- Focus: brand color border + subtle glow
- Labels: always above input, never inside

## Animations
```css
/* Smooth transitions */
transition: all 0.2s ease;

/* Subtle hover effects */
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(0,0,0,0.15);

/* Page load fadeIn */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Checklist
- [ ] Responsive on mobile/tablet/desktop
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Font sizes readable on all devices
- [ ] Interactive elements have hover/focus states
- [ ] Loading states for async actions
- [ ] Error states for forms
- [ ] Consistent spacing throughout
