## 2025-03-08 - Icon-Only Interactivity Accessibility

**Learning:** When using components that rely purely on lucide-react or similar iconography for interaction (e.g., Theme toggles, Modal closers, Social links), screen readers often announce nothing or just the underlying HTML tag, and keyboard users lack a clear focus ring, which severely impacts a11y.
**Action:** Always ensure that icon-only `<button>` and `<a>` elements have descriptive `aria-label` attributes and include explicit `focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-indigo` Tailwind classes (or equivalent semantic focus styling) to support both screen reader semantics and visual keyboard navigation.
