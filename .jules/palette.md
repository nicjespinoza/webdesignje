## 2026-03-12 - Missing Accessibility for Icon-Only Interactive Elements
**Learning:** This application extensively uses icon-only interactive elements (like theme toggles, close buttons, and social links) without proper accessibility markup, making them invisible to screen readers and difficult to navigate for keyboard users.
**Action:** Always ensure that icon-only buttons and links include a descriptive `aria-label` attribute and use `focus-visible:ring-2 focus-visible:outline-none` Tailwind classes to provide a visible focus indicator for keyboard navigation.
