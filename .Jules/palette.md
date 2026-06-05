
## 2024-05-21 - Mobile Menu Toggle Accessibility
**Learning:** The mobile menu toggle button (`Navbar.tsx`) lacked ARIA attributes, making it difficult for screen readers to identify its state. Adding `aria-label`, `aria-expanded`, and `aria-controls`, along with `focus-visible` styles, significantly improves accessibility without breaking the layout.
**Action:** Always ensure interactive elements like menu toggles have localized `aria-label`s, communicate their state using `aria-expanded`, and are discoverable via keyboard using `focus-visible`.
