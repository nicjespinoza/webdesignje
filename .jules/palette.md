
## 2025-02-17 - Accessible Action Buttons for Hidden Elements
**Learning:** Icon-only buttons or buttons that hide their text on mobile via CSS (e.g., Tailwind's `hidden` which maps to `display: none;`) lose their accessible name for screen readers. Using the text explicitly as an `aria-label` ensures the action remains accessible across all breakpoints. Adding `focus-visible` styles also guarantees keyboard accessibility is visually apparent.
**Action:** Always map explicit strings or `title` props to `aria-label` on buttons that primarily rely on icons or hide textual labels under certain responsive conditions. Ensure that interactive elements always have clear focus states using classes like `focus-visible:ring-2 focus-visible:outline-none`.
