## 2024-05-21 - Replace `distanceTo` with `distanceToSquared` in Scene3D
**Learning:** In Three.js applications with many particles or nodes, calculating distance using `distanceTo` involves a computationally expensive `Math.sqrt()` operation.
**Action:** When comparing distances against a threshold, use `distanceToSquared` and compare it against the threshold squared. This avoids the square root calculation and improves performance, especially in nested loops or frequent updates.
