---
name: awesome-design-system
description: >-
  State-of-the-art design systems inspired by Google Stitch, Linear, Apple, and Vercel.
  Apply when creating visual components, color palettes, dark/light themes, typography scales,
  cards, badges, modals, and print layouts.
---

# Awesome Design System Skill

A design system guide to build modern, captivating web interfaces that feel like modern desktop apps.

## Visual Design Tokens

1. **Surfaces & Layers**:
   - `Layer 0 (Canvas)`: `#131418` or `#191a1f`
   - `Layer 1 (Cards & Sidebars)`: `#1e2026` / `rgba(255,255,255,0.03)` with `border: 1px solid rgba(255,255,255,0.08)`
   - `Layer 2 (Inputs & Insets)`: `#141519`
   - `Layer 3 (Modals & Overlays)`: `#1c1e24` with `backdrop-filter: blur(16px)`

2. **Typography Hierarchy**:
   - Display: 28px–32px, font-bold, `letter-spacing: -0.02em`
   - Section Title: 14px–16px, font-semibold, `letter-spacing: -0.01em`
   - Body: 13px–14px, font-normal, `line-height: 1.5`
   - Micro/Caption: 11px–12px, font-medium, `letter-spacing: 0.02em`, `text-zinc-400`

3. **Accent Themes**:
   - Electric Indigo: `#3b82f6` -> `#6366f1`
   - Executive Obsidian: `#0f172a` -> `#334155`
   - Emerald Pulse: `#10b981` -> `#059669`
   - Royal Violet: `#8b5cf6` -> `#7c3aed`

4. **Component Patterns**:
   - **Pill Chips**: `px-2.5 py-1 text-xs rounded-lg font-medium border`
   - **Gradient Accents**: Subtle gradients on primary CTAs (`from-blue-600 to-indigo-600`) with matching soft colored box-shadows (`shadow-lg shadow-indigo-500/20`).
   - **Template Preview Cards**: Live visual badges representing document structure.
