## 2024-07-27 - [Optimize Three.js allocations]
**Learning:** Instantiating objects like `new THREE.Vector3()` inside `useFrame` triggers frequent garbage collection cycles that cause stuttering in React Three Fiber components.
**Action:** Always instantiate reusable Three.js objects (e.g., using `useMemo`) outside the render loop and reuse them (e.g., via `.subVectors()` or `.copy()`) in `useFrame`.
