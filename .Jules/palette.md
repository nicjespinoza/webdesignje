## 2024-06-08 - Icon-Only Button Accessibility
**Learning:** Found several icon-only links and buttons in FooterSection and Navbar that lack accessible names (aria-label). Screen readers wouldn't announce their purpose.
**Action:** Always add `aria-label` to links/buttons that contain only icons and no visible text to ensure they are accessible to screen reader users. Also adding focus-visible states where they are lacking.
