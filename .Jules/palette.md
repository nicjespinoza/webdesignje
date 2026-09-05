## 2024-05-21 - Mobile Menu ARIA Attributes
**Learning:** When interacting with hamburger menus, screen readers require `aria-expanded`, `aria-controls`, and an `aria-label` on the toggle button, along with a matching `id` on the container, to properly announce the menu's state and context. This is a common accessibility gap in mobile-responsive React components.
**Action:** Always add `aria-label`, `aria-expanded`, and `aria-controls` to mobile menu toggles, ensure the target container has a matching `id`, and add `focus-visible` classes for keyboard navigation.
