## 2024-03-24 - Missing ARIA Labels on Interactive Elements
**Learning:** React components containing only icon components (e.g., from `lucide-react`) often lack accessible names when rendered, making them invisible or confusing for screen reader users.
**Action:** When creating icon-only buttons or links, ensure they always have an `aria-label` attribute providing a clear description of the action, and include focus visible styles (like `focus-visible:ring-2` and `focus-visible:outline-none`) to support keyboard navigation.
