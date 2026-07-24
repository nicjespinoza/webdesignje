## 2024-05-24 - Prevent garbage collection in useFrame
**Learning:** Instantiating objects like new THREE.Vector3() inside high-frequency animation loops (useFrame) or component bodies without memoization triggers excessive garbage collection, leading to performance stutters in React Three Fiber applications.
**Action:** Always instantiate reusable Three.js objects (vectors, matrices, colors) outside of useFrame using component-level hooks like useMemo and mutate them internally (e.g., using .subVectors() or .copy()) to prevent unnecessary allocations.
