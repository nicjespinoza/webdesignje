## 2024-05-18 - Added ARIA labels to interactive elements in landing page
**Learning:** Found several icon-only buttons (like theme toggle, menu toggle, and chat controls) lacking accessible names, which are critical for screen reader users to understand their function. Added translations in `i18n.ts` for dynamic labels where appropriate.
**Action:** Always ensure icon-only buttons have an `aria-label` (and often a `title` for visual users) to explain their purpose, and use i18n keys for these labels if the app supports multiple languages.
