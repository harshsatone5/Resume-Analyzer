---
name: essential-web-dev
description: >-
  Essential frontend engineering practices for modern React, Vite, and TypeScript applications.
  Apply to enforce strict type-safety, efficient rendering performance, zero console errors,
  fast bundle times, and accessibility compliance.
---

# Essential Web Development Skill

Best practices and core standards for building rock-solid React + TypeScript web applications.

## Technical Standards

1. **Strict TypeScript & Zero Build Errors**:
   - Explicit types or type imports (`import type { ... }`).
   - Clean handling of optional properties (`?.` and default fallbacks).
   - Zero unused imports or dead variables (`noUnusedLocals`).

2. **React 19 & Performance Optimization**:
   - Avoid redundant re-renders with strategic state colocation.
   - Use standard browser APIs (e.g. `Blob`, `FileReader`, `URL.createObjectURL`, `window.print`) for high performance.
   - Clean component boundaries and single responsibility principle.

3. **Storage & State Resilience**:
   - Safe `localStorage` wrappers with try/catch to handle private browsing and quota errors.
   - Immediate feedback upon state modification.

4. **DOM & Styling Hygiene**:
   - Responsive flexbox and grid layouts without horizontal overflow.
   - Proper accessible labeling (`aria-label`, `<label htmlFor="...">`).
   - Print stylesheet optimization with `@page { size: A4; margin: 0; }`.
