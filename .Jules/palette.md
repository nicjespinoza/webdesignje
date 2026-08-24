## 2026-05-21 - Added Accessibility Features to Navbar

**Learning:** Added `aria-*` tags and keyboard focus (`focus-visible`) styles to interactive mobile menu components to improve a11y for mobile devices and screen readers. Ensured `id` of target container matches `aria-controls` attribute of toggling button to avoid orphaned controls. Noticed the `t` function from `useTranslation` can be used safely as long as `useTranslation` is imported and invoked correctly (which was confirmed to exist in this file).
**Action:** Consistently apply complete `aria-*` properties including matching `aria-controls` ID maps and appropriate translations, and ensure keyboard navigation visibility for all interactive elements in similar toggle scenarios.
