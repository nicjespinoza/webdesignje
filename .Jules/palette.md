## 2026-06-29 - Navbar Accessibility Refinement
**Learning:** Adding stateful ARIA properties like `aria-pressed`, `aria-expanded` and `aria-controls` to custom UI interactive elements significantly improves the context available to screen reader users without altering design layout. The `t()` function must rely on verified translation keys to avoid prerender crashes.
**Action:** Always implement `aria-pressed` for visual radio buttons and `aria-expanded`/`aria-controls` for mobile menus.
