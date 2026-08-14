## 2024-08-14 - Mobile Menu Accessibility
**Learning:** Adding `aria-controls` to interactive toggles requires ensuring the target container possesses the matching DOM `id` to avoid creating orphaned controls that negatively impact screen readers.
**Action:** Always verify the target container has the corresponding `id` when adding `aria-controls` to toggle buttons.
