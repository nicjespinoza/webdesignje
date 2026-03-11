## 2024-03-07 - Icon-only buttons lack ARIA labels and focus states
**Learning:** Found an accessibility issue pattern where interactive elements like theme toggles, mobile menu buttons, modal close buttons, and social links are missing `aria-label` attributes and keyboard focus indicators, making them unusable for screen reader and keyboard-only users.
**Action:** Always verify that buttons/links containing only icons have a descriptive `aria-label` and use `focus-visible:ring-2 focus-visible:outline-none` Tailwind classes to ensure proper accessibility.
