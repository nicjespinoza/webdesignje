## 2024-04-23 - Interactive Elements A11y
**Learning:** Icon-only interactive elements in navigational components (like Theme toggles or Mobile menus) lack descriptive context for screen readers and keyboard users if they do not include standard focus rings and translation-aware ARIA labels.
**Action:** Always ensure that structural changes explicitly include `aria-label` mapped to an i18n key (`t('nav.toggleTheme')`) and standard `focus-visible:ring-2` Tailwind utility classes for accessibility before committing UI updates.
