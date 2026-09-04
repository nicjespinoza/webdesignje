## 2024-09-04 - Interactive Toggle Accessibility
**Learning:** Adding ARIA properties like `aria-controls` to interactive toggles (e.g., mobile menus) without ensuring the target container possesses a matching DOM `id` creates orphaned controls that negatively impact screen readers.
**Action:** When making toggles accessible, always pair `aria-expanded` and `aria-controls` on the button with a matching `id` on the controlled container.
