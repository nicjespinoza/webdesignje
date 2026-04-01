## 2024-05-17 - Distance Calculation Optimization
**Learning:** Found multiple instances where Three.js `distanceTo` was being used in tight animation loops (e.g. `useFrame` or during initialization of connections) to calculate distances between vectors. This relies on `Math.sqrt`, which is computationally expensive when called repeatedly for hundreds/thousands of particle combinations.
**Action:** Replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold` to avoid the square root operation and significantly improve performance in high-frequency functions.
