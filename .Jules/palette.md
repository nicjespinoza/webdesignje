## 2024-07-28 - Accessible Mobile Menu Toggle
**Learning:** Found a common accessibility gap in mobile nav toggles. Adding `aria-expanded`, `aria-controls`, and `aria-label` provides crucial context for screen readers. Added visual focus states with gold theme (`focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none`) to improve keyboard navigation in the nav header.
**Action:** Always ensure mobile menu toggles have `aria-expanded` and link them to their content via `aria-controls`. Also, confirm focus indicators align with the app's theme colors.
