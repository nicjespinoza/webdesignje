## 2024-05-21 - Added aria-label to ChatWidget
**Learning:** I learned that components/landing/ChatWidget.tsx uses `framer-motion` and `lucide-react` but was missing `useTranslation` from `react-i18next`. The app does not have `t` in the global scope.
**Action:** When adding i18n accessibility labels in next.js, make sure to import `useTranslation` if it doesn't already exist in the file.
