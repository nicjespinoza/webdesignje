
## 2024-04-03 - Accessible Mobile Menus
**Learning:** Using raw `<Menu />` icons and `<div>` tags with `onClick` handlers for mobile menus hides these critical navigation controls from screen readers and keyboard users.
**Action:** Always wrap interactive icon-only components in semantic `<button>` tags, include a descriptive `aria-label` (and `title` for visual users), and provide explicit `focus-visible` states to ensure full accessibility.
