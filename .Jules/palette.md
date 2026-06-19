
## 2026-06-19 - Added ARIA Label and Focus Styles to Mobile Nav Toggle
**Learning:** Icon-only buttons on mobile layouts (like the hamburger menu) often lack accessible names, making them invisible to screen readers, and frequently omit explicit focus indicators, hindering keyboard navigation on devices that support it.
**Action:** Always verify that icon-only buttons have an `aria-label` (using translation strings where applicable) and explicit `focus-visible` styles with sufficient contrast (e.g., `focus-visible:ring-2 focus-visible:ring-[#C69320]`) to support all users.
