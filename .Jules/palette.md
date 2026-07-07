## 2025-02-18 - Interactive Navbar Elements
**Learning:** Custom interactive elements (language toggles, mobile menu) often lack essential accessibility attributes.
**Action:** Always include `aria-pressed` for custom toggles, `aria-expanded` and `aria-controls` for menus, descriptive `aria-label`s for screen readers, and `focus-visible` styles with sufficient contrast (e.g., `focus-visible:ring-[#C69320]`) for keyboard navigation.
