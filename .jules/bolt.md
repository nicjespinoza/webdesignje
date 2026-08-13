## 2024-08-13 - Prevent GC stutter in useFrame
**Learning:** Instantiating reusable objects like `THREE.Vector3` inside `@react-three/fiber` `useFrame` loops causes garbage collection stutters.
**Action:** Always instantiate reusable objects outside of `useFrame` using component-level hooks like `useMemo` and mutate them internally.
