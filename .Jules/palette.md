## 2024-11-21 - Accessible State Toggles and Keyboard Focus
**Learning:** Custom toggle controls like language selectors or mobile menus, when implemented purely with `button` elements, lack state context for screen readers and visible focus styles by default.
**Action:** Always verify that interactive elements representing a selected state utilize `aria-pressed` or `aria-expanded`, and include a `focus-visible` CSS class to ensure robust accessibility across diverse input modalities.
