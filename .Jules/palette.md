## 2025-05-18 - Accessibility: Icon-only buttons
**Learning:** Icon-only buttons like those for month navigation or closing modals lack context for screen readers and can be difficult to navigate via keyboard if focus styles aren't prominent.
**Action:** Always add descriptive `aria-label` and `title` attributes (using translated strings) to icon-only interactive elements. Add explicit focus styling like `focus-visible:ring-2 focus-visible:outline-none` so keyboard navigation is visibly clear.
