## 2024-05-15 - Optimize Three.js distance calculations
**Learning:** In Three.js applications, `distanceTo` involves a computationally expensive `Math.sqrt` operation. When calculating distances in high-frequency animations or nested loops (like O(n²) operations for generating connections between particles), this becomes a performance bottleneck.
**Action:** Replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold` to avoid the `Math.sqrt` and improve rendering performance.
