## 2024-08-19 - Ensure `aria-controls` target containers have matching `id`
**Learning:** When adding `aria-controls` to interactive toggles (like mobile menus), it is critical to ensure the target container actually possesses the matching DOM `id`. Otherwise, it creates orphaned controls that confuse and negatively impact screen readers.
**Action:** Always verify and add the corresponding `id` (e.g., `id="mobile-menu"`) to the target container when implementing `aria-controls` on the toggle button.
