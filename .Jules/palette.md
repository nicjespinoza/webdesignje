## 2025-02-06 - Accessible Navigation Controls
**Learning:** Icon-only navigation toggle buttons require dynamically updated `aria-expanded` and `aria-label` attributes to communicate their state effectively to screen readers. For language selector groups acting like toggles, `aria-pressed` should be used to denote the selected state.
**Action:** When creating or modifying mobile navigation or toggle button groups, ensure `aria-pressed`, `aria-expanded`, and descriptive localized `aria-label`s are implemented alongside visual state indicators.
