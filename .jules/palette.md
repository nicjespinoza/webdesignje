## 2024-03-13 - Icon-only Element Accessibility
**Learning:** Found multiple instances where icon-only buttons and links (such as theme toggles, mobile menu buttons, modal close buttons, and social links) lacked accessible names, making them difficult to use for screen reader users and users relying on keyboard navigation.
**Action:** Always add descriptive `aria-label` attributes and ensure proper visible focus states using `focus-visible:ring-2 focus-visible:outline-none` on all interactive elements that do not contain visible text content.
