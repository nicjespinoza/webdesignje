## 2025-06-14 - Optimize Three.js distance calculations
**Learning:** In Three.js and 2D canvas apps, using `distanceTo` involves calculating `Math.sqrt` which can be extremely slow inside nested O(n^2) loops (like for generating connections between particles/neurons) or inside the `useFrame` render loop.
**Action:** Always replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold` in high-frequency rendering loops or O(n^2) nested loops to significantly improve performance.
