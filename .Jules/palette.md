## 2024-05-23 - Add ARIA Labels and Accessibility Enhancements to Navbar

**Learning:** When language toggles or mobile menu buttons lack proper ARIA labels and expanded/controls states, it severely degrades the experience for screen reader users and those navigating via keyboard. Additionally, interactive elements without visible focus outlines make keyboard navigation difficult.

**Action:** Consistently apply `aria-label`, `aria-expanded`, and `aria-pressed` to icon-only buttons and language selectors. Also, apply `focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none` for a clear, accessible focus state.
