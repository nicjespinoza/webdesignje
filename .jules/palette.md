## 2026-03-14 - Focus Visible with ARIA Labels
**Learning:** In this project's component system, adding `aria-label` alone to icon-only buttons is insufficient for full accessibility. Explicit `focus-visible:ring-2` and `focus-visible:outline-none` Tailwind classes must be added because standard browser focus outlines are often suppressed or don't render visibly around nested SVG icons.
**Action:** Always pair `aria-label` with explicit `focus-visible` utility classes on interactive, icon-only elements to ensure they are perceivable by both screen readers and keyboard users.
