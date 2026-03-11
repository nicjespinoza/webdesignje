## 2024-03-11 - Accessible Icon-Only Buttons and Links
**Learning:** Icon-only interactive elements (like buttons and links using lucide-react icons) are completely invisible to screen readers without descriptive text. Furthermore, they need proper visual focus states for keyboard users.
**Action:** Always add `aria-label` attributes describing the action or destination, and include `focus-visible:ring-2 focus-visible:outline-none` Tailwind classes to ensure proper keyboard navigation visibility for all icon-only interactive elements.
