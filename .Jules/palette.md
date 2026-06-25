## 2024-06-25 - ARIA Labels for Icon Buttons
**Learning:** Found an icon-only menu toggle button in the Navbar (`components/landing/Navbar.tsx`) that was missing an `aria-label` and `aria-expanded` attributes, making it difficult for screen readers to understand its purpose and state.
**Action:** Always add `aria-label` and `aria-expanded` to icon-only toggle buttons.
