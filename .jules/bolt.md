## 2024-05-24 - Prevent GC Stutters in React Three Fiber
**Learning:** Instantiating reusable objects (like new THREE.Vector3()) inside useFrame loops causes significant garbage collection stuttering. Caching these objects outside of useFrame using component-level hooks like useMemo prevents GC issues and avoids state conflicts when multiple instances of the component render simultaneously.
**Action:** Always instantiate reusable objects outside of useFrame using useMemo and mutate them internally (e.g., using .subVectors() or .copy()) instead of creating new instances per frame.
