
## 2025-03-16 - Accessible Labeling for Icon-only Interactive Elements
**Learning:** Icon-only interactive elements (like the theme toggle, mobile menu, and language toggles in the header) using `lucide-react` icons were missing accessible labeling and clear visual focus indicators, making them difficult to use for screen reader users and keyboard navigators.
**Action:** Always include a descriptive `aria-label` attribute on `<button>` elements that only contain an icon, and apply `focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-brand-indigo` Tailwind classes to ensure proper focus states are visible during keyboard navigation. Extended this to `<a>` links inside the header as well.
