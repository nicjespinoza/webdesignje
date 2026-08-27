## 2024-08-27 - Icon Button Accessibility
**Learning:** Icon-only buttons (like the mobile menu toggle) in this app often lack `aria-label` and `aria-expanded`/`aria-controls` attributes, which are critical for screen reader users to understand the button's purpose and state.
**Action:** Always add `aria-label` (and `aria-expanded`/`aria-controls` for toggles) to icon-only buttons to ensure they are accessible.
