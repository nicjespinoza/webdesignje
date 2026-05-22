## 2024-05-18 - Optimize Three.js Scene3D distanceTo
**Learning:** O(n^2) connection loops in Three.js (`p1.distanceTo(p2)`) are severe CPU bottlenecks because `distanceTo` calls `Math.sqrt()` continuously on every frame for thousands of connections.
**Action:** Always replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold`. Hoist the squared threshold outside loops.
