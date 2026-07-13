## 2024-05-27 - Reuse Three.js Vector3 in useFrame loops
**Learning:** When writing logic for high-frequency animation loops like `useFrame` in `@react-three/fiber`, creating object instances on every frame (like `new THREE.Vector3()`) leads to frequent garbage collection, causing micro-stutters.
**Action:** Always instantiate reusable objects (like `new THREE.Vector3()`) outside of `useFrame` loops, and mutate them internally (e.g., using `.subVectors()` or `.copy()`) instead of creating new instances per frame.
