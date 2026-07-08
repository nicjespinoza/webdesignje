## 2025-02-18 - Optimize garbage collection in Three.js Scene3D
**Learning:** Garbage collection stutters occur when a large number of vector allocations happen within `useFrame` render loop.
**Action:** Move instantiation of static vectors like `new THREE.Vector3()` outside of loops so they can be reused continuously via mutating methods like `.subVectors()` or `.copy()`.
