## 2024-05-17 - Sidebar Accessibility

**Learning:** The `MobileSidebar` component relied on raw `<Menu>` and `<X>` lucide-react icons wrapped in `div`s with `onClick` handlers. This pattern creates completely inaccessible interactive elements for screen readers and keyboard users (no tab focus, no semantic role, no accessible name).
**Action:** Always replace icon-only `onClick` wrappers with semantic `<button>` elements. Ensure they include localized `aria-label` and `title` attributes (using `useAppTranslations`), and add `focus-visible:ring-2` to support proper keyboard navigation and visual focus feedback.
