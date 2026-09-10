---
name: frontend-ui-engineering
description: >-
  Production-grade frontend UI engineering standards from Addy Osmani's agent skills.
  Apply to ensure user-facing interfaces feel crafted by a design-aware human engineer
  rather than generic AI output, with strict WCAG AA accessibility, cohesive design tokens,
  and deliberate interaction design.
---

# Frontend UI Engineering (Addy Osmani)

This skill enforces high-standard frontend engineering and visual discipline to prevent generic "AI aesthetic" and deliver authentic, delightful digital experiences.

## Core Directives

1. **Anti-AI Aesthetic & Humanization**:
   - Avoid generic glowing cards, oversaturated neon purples, and artificial decorative clutter.
   - Use intentional, calibrated spacing systems (4px/8px scale).
   - Provide generous breathing room around focal elements.

2. **Design Tokens & Theme Harmony**:
   - Strictly derive all UI colors, borders, and shadows from a defined token hierarchy.
   - Neutral backgrounds (`zinc-950`, `zinc-900`, `zinc-800`) paired with subtle 1px borders (`border-white/[0.08]`).
   - Use authentic elevation shadows with soft diffusion rather than stark outlines.

3. **Accessibility (WCAG 2.1 AA)**:
   - Ensure text has at least 4.5:1 contrast against its background.
   - Interactive controls must have clear keyboard `:focus-visible` styling.
   - All icons and form controls must have accessible labels (`aria-label` or `<label>`).

4. **Micro-Interactions & State Resilience**:
   - Provide instant tactile feedback on buttons (`active:scale-[0.98]`).
   - Gracefully handle empty states, loading states, and error fallbacks.
   - Never cause unexpected layout shifts (CLS = 0).
