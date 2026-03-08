## 2026-03-08 - Missing ARIA Labels on Icon Buttons
**Learning:** Found a pattern where icon-only interactive elements (like theme toggles and mobile menus) lack `aria-label` attributes and focus visible styles, which impairs screen reader accessibility and keyboard navigation visibility.
**Action:** Always ensure icon-only buttons include a descriptive `aria-label` attribute and use `focus-visible:ring-2 focus-visible:outline-none` Tailwind classes for clear keyboard focus states.
