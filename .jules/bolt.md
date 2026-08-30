## 2024-08-30 - Prevent GC spikes in Three.js useFrame
**Learning:** Creating new THREE objects (like `new THREE.Vector3()`) inside the high-frequency `useFrame` animation loop causes severe garbage collection spikes and frame drops, as these objects are reallocated on every single frame.
**Action:** Always pre-allocate and reuse mutable THREE objects (via `useMemo` or outside the loop) when performing calculations inside `useFrame` (e.g., use a single shared `.subVectors()` result rather than instantiating a new vector per iteration).
