## 2026-05-21 - Added focus-visible and aria attributes to interactive elements
**Learning:** Found multiple icon-only buttons (like the mobile menu and language toggles) and dynamic project type selectors that lacked proper ARIA labeling and visual focus indicators for keyboard navigation.
**Action:** Always ensure custom interactive elements like `<button>` tags include `aria-label`s when the text content is not explicit, and apply `focus-visible:ring-2 focus-visible:outline-none` (using project-specific colors like `#C69320`) to provide clear visual feedback for keyboard users.
