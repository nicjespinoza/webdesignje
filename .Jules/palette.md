## 2024-08-09 - Added Focus States for Keyboard Navigation
**Learning:** Found that key interactive elements (language selector, mobile menu toggle, modal close button) lacked visible focus states for keyboard users, making keyboard navigation difficult or confusing.
**Action:** Always ensure `focus-visible` styles (using project colors, e.g., `focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none`) are applied to all interactive elements, especially icon-only buttons or custom UI components that might not inherit default browser focus styles.
