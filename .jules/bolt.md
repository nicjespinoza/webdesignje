## 2025-02-18 - Optimize Vector3 Instantiation in React Three Fiber

**Learning:** Instantiating new objects (like `new THREE.Vector3()`) inside `useFrame` or `requestAnimationFrame` loops in Three.js causes frequent garbage collection, which leads to frame stutters.
**Action:** Extract the instantiation outside the high-frequency loop and use a reusable instance, mutating it using methods like `.copy()`, `.subVectors()`, or `.add()` to maintain performance.
