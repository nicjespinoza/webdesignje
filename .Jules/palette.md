## 2024-05-06 - Missing ARIA labels and titles on icon-only buttons
**Learning:** Found several icon-only buttons in `PatientHeader.tsx` and `PatientInfoCard.tsx` that lack both `aria-label` for screen readers and `title` attributes for tooltips, making them inaccessible.
**Action:** Always add `aria-label` and `title` to icon-only buttons to improve accessibility and provide hover tooltips for sighted users. Ensure `focus-visible` classes are used for keyboard navigation.
