## 2025-03-09 - Accessible Icon-only Buttons
**Learning:** Icon-only interactive elements (such as links and buttons utilizing lucide-react icons) often fail basic accessibility checks because they lack a descriptive `aria-label` attribute. Furthermore, they can be invisible to keyboard users without explicit `focus-visible` styles.
**Action:** Always add a descriptive `aria-label` attribute and use `focus-visible:ring-2 focus-visible:outline-none` Tailwind classes on icon-only interactive elements to ensure proper keyboard navigation visibility and screen reader support.
