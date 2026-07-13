## 2024-07-13 - Missing aria-label for language selector flags and mobile menu button

**Learning:** Buttons that contain only icons or images with empty `alt` text (like the mobile menu toggle and the language selection buttons on mobile) require an `aria-label` attribute or proper `alt` text to be accessible to screen readers. If the `alt` text is empty, the screen reader cannot interpret the button's purpose.
**Action:** Ensure all icon-only buttons, as well as buttons wrapping an image with `alt=""`, contain an `aria-label` attribute that clearly explains the button's function.

## 2024-07-13 - Add focus visible ring for keyboard accessibility

**Learning:** Buttons without explicit `focus-visible` styles can be difficult to perceive for users relying on keyboard navigation.
**Action:** Add `focus-visible:ring-2 focus-visible:ring-[#FBE18D] focus-visible:outline-none` or similar classes to all interactive elements to ensure they have a visible focus state.
