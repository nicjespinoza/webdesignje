## 2025-02-18 - Localized Accessibility Attributes
**Learning:** Hardcoding accessibility strings in multi-language applications prevents them from correctly matching the selected locale. It's crucial to map ARIA labels to local dictionaries, even for structural/hidden UI elements.
**Action:** When adding ARIA labels or titles to structural interactive elements (e.g. mobile toggles, social icons), always use the existing `i18n` translation function (`t()`) instead of hardcoding strings to ensure a fully accessible and localized experience.
