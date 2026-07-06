## 2024-07-06 - Accessible Mobile Navigation Toggle
**Learning:** Icon-only buttons in mobile layouts often lack descriptive accessibility labels. Furthermore, interactive custom buttons acting as toggles require `aria-expanded` and explicit `focus-visible` styling to allow navigation via keyboards and screen readers.
**Action:** When adding or verifying mobile menu toggles, always ensure `aria-label` is present and localized, `aria-expanded` reflects the active state, and a clear `focus-visible` outline is provided for keyboard users.
