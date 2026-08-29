## 2024-08-29 - Mobile Menu ARIA Relationships
**Learning:** When adding `aria-expanded` and `aria-controls` to a mobile menu toggle button, it is critical to ensure the target menu container has a matching `id` (e.g., `id="mobile-menu"`). Without this explicit linkage, screen readers cannot properly associate the control with the content, creating an orphaned control that negatively impacts the accessibility experience.
**Action:** Always verify and add the corresponding `id` to the target container when implementing `aria-controls` on toggles.
