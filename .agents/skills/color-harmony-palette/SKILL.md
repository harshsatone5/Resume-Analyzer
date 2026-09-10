---
name: color-harmony-palette
description: >-
  Sophisticated, human-centric color harmony for dark-mode web applications.
  Apply to select accent palettes, surface layers, status colors, and gradient
  compositions that feel warm, trustworthy, and premium rather than generic tech.
---

# Color Harmony & Palette Engineering

## Surface Layer System (Dark Mode)

| Layer | Role | Color | Border |
|-------|------|-------|--------|
| L0 Canvas | Page background | `#0c0d12` | none |
| L1 Elevated | Cards, sidebars | `#141520` | `rgba(255,255,255,0.06)` |
| L2 Inset | Inputs, wells | `#0f1018` | `rgba(255,255,255,0.04)` |
| L3 Overlay | Modals, popovers | `#181a24` | `rgba(255,255,255,0.08)` + `backdrop-blur(20px)` |

## Accent Palettes (Choose ONE per product)

- **Ocean Depth**: `#3b82f6` → `#1d4ed8` (trustworthy, technical)
- **Warm Indigo**: `#6366f1` → `#4f46e5` (creative, modern)
- **Sage Green**: `#22c55e` → `#16a34a` (growth, success)
- **Sunset Amber**: `#f59e0b` → `#d97706` (energy, warmth)
- **Rose Quartz**: `#f43f5e` → `#e11d48` (bold, attention)

## Gradient Rules

1. Never use gradients with more than 2 stops in UI elements.
2. Gradient direction should follow reading direction (left→right) or gravity (top→bottom).
3. CTA buttons: subtle same-hue gradient (e.g., `from-indigo-600 to-indigo-700`).
4. Hero backgrounds: radial glow, not linear stripe (`radial-gradient` from accent/10 to transparent).
5. Text gradients only for hero headlines, never body text.

## Status Color Tokens

| State | Background | Text | Border |
|-------|-----------|------|--------|
| Success | `rgba(34,197,94,0.08)` | `#4ade80` | `rgba(34,197,94,0.2)` |
| Warning | `rgba(245,158,11,0.08)` | `#fbbf24` | `rgba(245,158,11,0.2)` |
| Error | `rgba(239,68,68,0.08)` | `#f87171` | `rgba(239,68,68,0.2)` |
| Info | `rgba(59,130,246,0.08)` | `#60a5fa` | `rgba(59,130,246,0.2)` |

## Contrast & Accessibility

- Primary text on L0: minimum `#d4d4d8` (zinc-300) = 7.2:1 ratio.
- Muted text: `#71717a` (zinc-500) minimum on dark backgrounds.
- Never use pure white `#ffffff` for body text on dark backgrounds — use `#f4f4f5`.
