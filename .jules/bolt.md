## 2024-10-24 - [React Three Fiber Object Pooling]
**Learning:** Allocating new objects like `THREE.Vector3` inside `useFrame` causes garbage collection stutters.
**Action:** Instantiate reusable objects outside the `useFrame` loop (e.g., with `useMemo`) and mutate them. Use squared distances to skip `Math.sqrt`.
