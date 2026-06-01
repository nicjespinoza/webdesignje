## 2024-05-22 - distanceToSquared Optimization
**Learning:** In highly iterated loops for 3D/Canvas rendering (like `useFrame` or nested loops computing node connections), calculating exact distance using `Math.sqrt()` (via `Vector3.distanceTo`) is a significant performance bottleneck.
**Action:** When comparing distances against a threshold, hoist the squared threshold and use `distanceToSquared()` instead to avoid the expensive square root operation.
