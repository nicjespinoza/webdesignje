## YYYY-MM-DD - Missing aria-labels on icon-only links
**Learning:** Found several icon-only links (like social media links in the footer) that are missing `aria-label`s. This makes them inaccessible to screen readers.
**Action:** Always verify that icon-only interactive elements (`<a>`, `<button>`) include an `aria-label` or visually hidden text, and ensure keyboard focus states (`focus-visible:ring-2`) are present.
