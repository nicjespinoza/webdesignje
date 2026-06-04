## 2024-06-25 - Node connection loops in 3D scenes
**Learning:** Using `distanceTo` in O(n^2) rendering loops calculating line nodes can cause performance regressions because it computes expensive `Math.sqrt` per iteration.
**Action:** When calculating node intersections, hoist threshold math (e.g. `threshold * threshold`) outside the loop and use `distanceToSquared()` or custom `x*x + y*y + z*z` threshold checks.
