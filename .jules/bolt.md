## 2026-02-28 - [React.memo() on Static Sections]
**Learning:** `App.tsx` has global states (`lang`, `isDark`) that cause the entire app tree to re-render. Some heavy sections like `Scene3D` (Three.js canvas) and `ParticleBackground` (HTML5 Canvas) and large static sections (`Projects`, `About`) do not use these props but were re-rendering.
**Action:** Wrap heavy static components and canvas roots with `React.memo()` to prevent expensive VDOM diffing and potential re-initialization on language/theme toggle.
