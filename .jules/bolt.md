## 2025-02-18 - Avoid distanceTo in high-frequency animation and nested loops
**Learning:** Three.js `Vector3.distanceTo` implicitly calls `Math.sqrt`, which is computationally expensive when executed inside `useFrame` animation loops or O(n²) nested loop connection algorithms (like in 3D networks/graphs).
**Action:** Replace `distanceTo(v) < threshold` with `distanceToSquared(v) < threshold * threshold` to eliminate the square root computation while maintaining exact logical equivalence. Ensure `threshold * threshold` is hoisted outside the loop to maximize gains.
