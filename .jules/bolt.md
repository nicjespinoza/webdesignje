## 2024-10-24 - Unnecessary Off-Screen Canvas Rendering
**Learning:** Running `requestAnimationFrame` continuously for `canvas` elements that are currently scrolled out of view unnecessarily consumes CPU and GPU cycles, impacting power efficiency and overall UI smoothness, especially in large single-page applications.
**Action:** Always wrap background animation loops (like particles) with an `IntersectionObserver`. Only execute the drawing logic when the canvas is actually visible (`isIntersecting`).
