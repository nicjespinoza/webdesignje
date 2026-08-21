## 2024-08-21 - Accessible Mobile Navigation
**Learning:** Missing aria-labels on icon-only interactive toggle buttons (like mobile menus) make them inaccessible to screen readers, especially since these elements often have dynamic states.
**Action:** Always ensure icon-only buttons have descriptive aria-labels, and for toggle buttons, dynamically update the aria-label to reflect the current action (e.g., open vs close) and include `aria-expanded`.
