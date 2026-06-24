## 2024-06-24 - Mobile Menu Toggle Accessibility
**Learning:** Icon-only mobile menu toggles require not just an `aria-label`, but also `aria-expanded` and `aria-controls` connected to the menu container ID to properly announce the state to screen readers.
**Action:** Always pair `aria-expanded` and `aria-controls` with mobile menu toggles and ensure they have visible focus rings (`focus-visible:ring-2`).
