## 2024-05-24 - Optimize Three.js Distance Checks
**Learning:** Using `distanceTo()` inside high-frequency `O(N^2)` loops or `useFrame` calls introduces performance overhead due to `Math.sqrt()`.
**Action:** Always use `distanceToSquared()` when comparing against a constant threshold (by squaring the threshold) to avoid the square root calculation entirely.
