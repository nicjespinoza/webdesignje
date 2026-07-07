## 2024-07-07 - Prevent garbage collection stutters in React Three Fiber
**Learning:** Instantiating new objects like `new THREE.Vector3()` inside `useFrame` loops, especially inside `.forEach`, causes frequent garbage collection which leads to rendering stutters.
**Action:** Always instantiate reusable objects (like `new THREE.Vector3()`) outside of `useFrame` loops and mutate them internally using methods like `.subVectors()` or `.copy()`.
