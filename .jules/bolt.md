
## 2025-03-25 - Squared Distance Optimization
**Learning:** High-frequency rendering loops (e.g., `useFrame` in Three.js) often involve heavy distance calculations for node/agent movement. Using `distanceTo()` triggers `Math.sqrt`, which is computationally expensive in O(N^2) or continuous update scenarios.
**Action:** Replace `distanceTo()` with `distanceToSquared()` and compare against the square of the threshold distance. This small mathematical adjustment bypasses `Math.sqrt` and optimizes performance without sacrificing logic.
