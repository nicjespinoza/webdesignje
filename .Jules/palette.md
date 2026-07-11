## 2024-07-11 - Navbar Navigation Accessibility Improvement
**Learning:** Adding ARIA properties without proper visual indication limits overall accessibility.
**Action:** When adding standard interactive menu attributes like `aria-expanded` and `aria-controls` to toggles, or `aria-pressed` to custom language selectors, always ensure they are accompanied by strongly contrasting keyboard focus styles such as `focus-visible:ring-2` to maximize accessibility for keyboard users.
