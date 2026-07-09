## 2024-07-09 - Added ARIA Attributes to Navbar
**Learning:** Found that keyboard navigation indicators (`focus-visible:ring-2 focus-visible:ring-[#C69320] focus-visible:outline-none`) and proper ARIA states (`aria-pressed`, `aria-label`, `aria-expanded`, `aria-controls`) were missing on interactive elements like the mobile menu toggle and language selector in `components/landing/Navbar.tsx`.
**Action:** Always ensure interactive elements (like custom toggle buttons) explicitly state their action and current state for screen readers, and have visual focus indicators.
