## 2024-05-30 - Added ARIA attributes to Mobile Menu Toggle
**Learning:** Added `aria-label`, `aria-expanded` and `aria-controls` to the mobile menu hamburger button so that screen readers can correctly identify the state of the navigation menu.
**Action:** Always ensure that icon-only interactive elements like hamburger menus have an `aria-label` that dynamically updates based on their state, and use `aria-expanded` and `aria-controls` for related hidden elements to ensure a fully accessible interface.
