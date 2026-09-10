---
name: karpathy-engineering
description: >-
  Andrej Karpathy's core engineering philosophy: radical simplicity, first-principles thinking,
  deep layer understanding, zero unnecessary bloat, self-contained architecture, and observable state.
  Apply when writing, structuring, or refactoring code to ensure rock-solid simplicity and elegance.
---

# Andrej Karpathy Engineering Principles Skill

Inspired by Andrej Karpathy's software and AI engineering approach: build simple, readable, self-contained systems where you understand every line from first principles.

## Core Directives

1. **Radical Simplicity & Anti-Bloat**:
   - Do not install heavy dependencies when 20 lines of clear, robust JavaScript/TypeScript can do the job reliably.
   - Favor straightforward, understandable code over convoluted design patterns or deep inheritance hierarchies.
   - Keep data structures plain, predictable, and transparent (JSON-serializable).

2. **First-Principles Architecture**:
   - Understand the exact browser rendering mechanics (e.g. DOM updates, CSS print box model, hardware acceleration).
   - Direct state updates should be atomic and unambiguous.
   - Avoid mysterious abstractions that obscure where data flows.

3. **Observable & Deterministic State**:
   - All state must be verifiable in one glance: inspectable in localStorage, exportable to JSON, cleanly loggable.
   - Zero hidden side effects in UI rendering components.

4. **Iterative Debugging & Testing**:
   - Test the simplest component first before assembling the complex pipeline.
   - Validate corner cases (e.g. empty lists, long strings without spaces, special characters, zero data).
   - Fail gracefully with fallback defaults.

5. **Self-Documenting Code**:
   - Meaningful naming over cryptic abbreviations.
   - Clear typescript types acting as the single source of truth.
