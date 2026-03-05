
## 2025-03-09 - Missing ARIA Labels on Icon Buttons
**Learning:** In this application's components, icon-only buttons and links frequently lack `aria-label` attributes and proper focus states, specifically in the Navbar, Modals, and Social Media footers. This limits screen-reader accessibility and keyboard navigation.
**Action:** When creating new icon-only buttons/links, consistently add `aria-label` (or `aria-expanded` for toggles) and `focus-visible:ring-2 focus-visible:outline-none` to ensure complete accessibility.
