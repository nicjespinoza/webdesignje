## 2026-07-18 - Missing Aria Labels on Icon-Only Elements
**Learning:** Custom UI elements like hamburger menus often lack native semantic value and accessible states (like aria-expanded, aria-controls, and clear focus indicators) compared to standard elements. In React/Next apps, it's crucial to explicitly manage these when building custom toggles to maintain screen reader support.
**Action:** Always ensure that icon-only interactive elements implement descriptive `aria-label`, correct ARIA state attributes (like `aria-expanded`), and explicit `focus-visible` styling for keyboard navigation.
