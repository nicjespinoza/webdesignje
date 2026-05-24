
## 2024-05-24 - Accessible Language Selectors and Mobile Menus
**Learning:** Icon-only buttons (like the mobile menu toggle) and custom language selector buttons lack semantic state (`aria-pressed`, `aria-expanded`) and visible focus states for keyboard users in custom implementations.
**Action:** Always ensure that custom button groups acting as radio/toggle elements have `aria-pressed`, toggle buttons that control elements have `aria-expanded` and `aria-controls`, and all interactive elements have strong `focus-visible` styles with sufficient contrast (e.g., `focus-visible:ring-[#C69320]`).
