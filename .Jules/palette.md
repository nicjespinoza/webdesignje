## 2024-05-18 - Icon-Only Button Accessibility Pattern
**Learning:** Icon-only toggle buttons (like mobile menus) strictly require dynamic `aria-expanded` properties and a linked `aria-controls` target container with a matching `id` to provide full context to screen readers, especially when the icon changes dynamically.
**Action:** Always verify that elements referenced by `aria-controls` actually possess the target `id` attribute to avoid creating orphaned accessibility controls.
