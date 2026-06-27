## 2024-07-28 - Navbar Accessibility Polish
**Learning:** For interactive UI elements relying heavily on client-side state (like mobile dropdown menus toggled via React states), dynamically adding `aria-expanded` and explicit translation labels is essential for screen reader support and better internationalization.
**Action:** When adding language-related interactivity, always ensure ARIA labels correspond appropriately using `react-i18next` localized strings to maintain multilingual accessibility.
