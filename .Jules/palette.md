## 2024-08-18 - Missing ARIA States on Toggle Components
**Learning:** Custom interactive components like mobile menu toggles and language selectors in this app frequently lack essential ARIA state attributes (`aria-expanded`, `aria-pressed`) and linkage (`aria-controls`), which renders them confusing for screen readers despite having visual cues.
**Action:** Always ensure custom toggles have properly bound `aria-expanded` or `aria-pressed` attributes matching their internal React state, and link them to their target containers using `aria-controls`.
