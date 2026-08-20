## 2025-02-28 - Accessible Mobile Menus
**Learning:** Adding ARIA properties like `aria-controls` to interactive toggles (e.g., mobile menus) requires ensuring the target container possesses the matching DOM `id` (e.g., `id="mobile-menu"`) to avoid creating orphaned controls that negatively impact screen readers.
**Action:** Always verify the target element exists with the correct ID when implementing `aria-controls` for accessibility.
