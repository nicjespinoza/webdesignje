## 2026-07-26 - Prevent GC stutters in React Three Fiber
**Learning:** Instantiating objects (like `new THREE.Vector3()`) inside `useFrame` or at the module level can lead to garbage collection stutters and state conflicts.
**Action:** Cache reusable Three.js objects via component-level hooks like `useMemo` and mutate them internally (e.g., using `.subVectors()`) instead of creating new instances per frame.
