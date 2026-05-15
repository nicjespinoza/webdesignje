## 2024-05-18 - Improve Form Labeling Accessibility
**Learning:** Found an accessibility pattern where form inputs (`<input>`, `<textarea>`) are preceded by `<label>` elements but without the `htmlFor` attributes connecting to `id` attributes on the input fields. Additionally, icon-only social links lack `aria-label`s.
**Action:** Always associate labels with inputs using `htmlFor` and `id`, add `focus-visible` styles for better keyboard navigation, and add `aria-label` to icon-only interactive links.
