## 2023-10-27 - ARIA Controls for Mobile Menus
**Learning:** When adding ARIA properties like `aria-controls` to interactive toggles (e.g., mobile menus), the target container must possess the matching DOM `id` to avoid creating orphaned controls that negatively impact screen readers.
**Action:** Always verify that the target element of an `aria-controls` attribute has the corresponding `id` attribute.
