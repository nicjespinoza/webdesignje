## 2025-02-06 - Memory Optimization in React Three Fiber

**Learning:** Instantiating `new THREE.Vector3()` inside a `useFrame` loop creates unnecessary memory allocations every frame, triggering frequent garbage collection which leads to stuttering animations. This codebase heavily uses `@react-three/fiber`, making this a critical pattern to follow.
**Action:** Always instantiate reusable Three.js objects (like `new THREE.Vector3()`) outside of the `useFrame` loop (using `useMemo` if needed) and mutate them internally (e.g., `.subVectors()`, `.copy()`) to prevent garbage collection stutters.
