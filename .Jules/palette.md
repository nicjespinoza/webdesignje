## 2024-10-27 - Navbar Icon Button Accessibility
**Learning:** Icon-only buttons like hamburger menus require `aria-label`, `aria-expanded`, and `aria-controls` to be properly accessible to screen readers, especially when they toggle complex UI elements like mobile menus.
**Action:** Always ensure that any button without explicit text content receives an appropriate `aria-label` and, if it controls another element, the appropriate state and structural ARIA attributes.
