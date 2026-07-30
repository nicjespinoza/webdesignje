## 2023-10-27 - Icon-only Mobile Toggle Button
**Learning:** Icon-only buttons (like mobile hamburger menus) often lack `aria-label`s, which makes them inaccessible to screen readers. Mobile toggle states also need context whether they open or close the menu, requiring dynamic ARIA labels (e.g. `aria-label={isOpen ? 'Close' : 'Open'}`). They also require focus styles (`focus-visible`) since they are commonly reached via keyboard.
**Action:** Always verify icon-only buttons have dynamic `aria-label`s corresponding to their state and verify visual focus indicators are present.
