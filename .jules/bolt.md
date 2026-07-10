## YYYY-MM-DD - [Title]
**Learning:** [Insight]
**Action:** [How to apply next time]
## 2025-05-23 - Prevent GC Stutters in React Three Fiber
**Learning:** Instantiating new `THREE.Vector3` objects inline within the `useFrame` loop of React Three Fiber components can cause severe garbage collection stutters and memory pressure, as `useFrame` executes 60 times per second.
**Action:** Always instantiate reusable Three.js objects (like `THREE.Vector3`, `THREE.Object3D`, `THREE.Color`) outside of the render loop and reuse them by mutating their values using methods like `.copy()` or `.subVectors()` instead of creating new instances per frame.
