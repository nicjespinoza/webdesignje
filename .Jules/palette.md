## 2024-08-08 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Icon-only interactive elements (like the mobile menu toggle in the Navbar) were missing ARIA labels, making them invisible or confusing to screen reader users. Additionally, visible focus states were lacking for keyboard navigation.
**Action:** Always verify that every icon-only button contains an appropriate `aria-label` attribute and incorporates explicit focus indicators using `focus-visible` classes aligned with the design system (e.g. `focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none`).
