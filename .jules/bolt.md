## 2024-05-27 - Initial Setup
**Learning:** Initialized Bolt journal.
**Action:** Use this file to track critical performance learnings.
## 2024-05-27 - Three.js Object Allocation in useFrame
**Learning:** Instantiating objects like `new THREE.Vector3()` inside a `useFrame` loop or component body causes severe garbage collection stutters and performance degradation in high-frequency React Three Fiber animation loops.
**Action:** Always pre-allocate reusable Three.js objects (like `Vector3`, `Object3D`) outside of the component or loop, and mutate them in place using methods like `.subVectors()` or `.copy()` to ensure a stable 60 FPS.
