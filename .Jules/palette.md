## 2024-06-09 - Accessible Mobile Menu Toggle
**Learning:** Adding ARIA attributes like `aria-expanded` and `aria-label` to custom mobile menu toggles (e.g., using icons like Menu/X) ensures screen readers can identify the button's purpose and state properly.
**Action:** Always include `aria-label` or visually hidden text for icon-only toggles, and use `aria-expanded={isOpen}` to communicate the state of the associated menu or dropdown dynamically.
