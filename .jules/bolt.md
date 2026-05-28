## 2024-05-28 - Optimize nested loops physics calculations
**Learning:** In 2D Canvas loops or high-frequency ThreeJS animation loops with O(n^2) nested particles, using standard `Math.sqrt()` or `distanceTo()` calculations drastically reduces performance.
**Action:** Always replace basic distance calculations with squared distance comparisons (`dx*dx + dy*dy` and `distanceToSquared()`) when calculating collision/connection thresholds inside loops.
