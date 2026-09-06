## 2024-05-14 - Mobile Menu Accessibility Enhancements
**Learning:** Icon-only mobile menu toggles without descriptive labels (`aria-label`) and state indicators (`aria-expanded`) are inaccessible to screen reader users. Additionally, linking the control to the menu via `aria-controls` improves navigation.
**Action:** When implementing mobile menus, always ensure the toggle button has `aria-label`, `aria-expanded`, and `aria-controls` linked to a corresponding `id` on the menu container. Add keyboard focus rings using `focus-visible` Tailwind classes matching the project theme.
