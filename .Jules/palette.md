## 2025-02-18 - Mobile Menu Toggle Accessibility
**Learning:** Icon-only buttons for mobile menus often lack context for screen readers and don't indicate their open/closed state.
**Action:** When implementing mobile toggle menus, always ensure `aria-expanded` and `aria-controls` are present on the toggle button, link it to the menu container via ID, and provide a clear `aria-label` or fallback text.

## 2025-02-18 - Language Selector ARIA States
**Learning:** Custom interactive language selection pills often act like radio buttons but lack the native semantic states.
**Action:** Use `aria-pressed={lang === currentLang}` on custom interactive selection items to correctly indicate the active state to assistive technologies, and provide fully localized `aria-label` descriptions if the visual text is abbreviated.
