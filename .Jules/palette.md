## 2025-01-21 - Accessible Toggle Buttons
**Learning:** Icon-only toggle buttons on mobile need an explicit aria-expanded attribute, dynamic aria-label, and clear focus styles to ensure screen reader users and keyboard navigators understand their state and location.
**Action:** Always add aria-expanded={isOpen}, a dynamic aria-label, and focus-visible:ring-2 (or equivalent focus rings) to mobile menu toggles.
