## 2024-08-06 - Improve accessibility for mobile menu toggle button
**Learning:** Icon-only buttons used for navigation toggling (like a hamburger menu) need aria-labels for screen reader accessibility. I found one on `components/landing/Navbar.tsx` that didn't have any aria-label.
**Action:** Adding `aria-label` to the mobile menu button for better screen reader accessibility and `aria-expanded` to communicate its state. Also applying similar enhancements to other icon-only buttons if identified.
