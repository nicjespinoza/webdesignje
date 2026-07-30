## 2026-06-16 - Math.sqrt bottlenecks in O(n²) 3D loops
**Learning:** High-frequency loop animations (like `useFrame` in `@react-three/fiber`) nested with O(n²) operations to calculate distances using `Math.sqrt` via `distanceTo` create significant CPU overhead.
**Action:** When finding 3D node distances for thresholds, always prefer squared distances (`distanceToSquared` and `threshold * threshold`) over absolute distances requiring square roots to dramatically improve framerates on heavy particle systems.
