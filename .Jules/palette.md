## 2025-06-15 - ARIA Toggles & Missing Labels
**Learning:** Adding ARIA toggles (like `aria-expanded` and `aria-pressed`) to custom React components provides much-needed screen reader feedback for stateful components lacking standard HTML semantics.
**Action:** Always ensure custom menus and custom radio buttons use `aria-expanded`, `aria-pressed`, and appropriate standard ARIA labels, adding missing translations for them where required to prevent prerender failures.
