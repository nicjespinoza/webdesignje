## 2024-12-07 - Avoid distanceTo in O(N²) loops
**Learning:** In Three.js and Canvas applications, using `distanceTo()` inside O(N²) nested loops or high-frequency `useFrame` animation loops creates a severe performance bottleneck due to the computationally expensive `Math.sqrt()` calculation on every iteration.
**Action:** Always replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold` to avoid the square root operation and significantly improve frame rates, especially when calculating connections between hundreds of nodes.
