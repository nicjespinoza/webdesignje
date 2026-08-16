
## 2024-08-16 - [Three.js Optimization: Squared Distance and Object Reuse]
**Learning:** Using `.distanceTo()` forces an expensive `Math.sqrt()` calculation which degrades performance in high-frequency loops and O(N^2) iterations. Additionally, instantiating new objects (e.g., `new THREE.Vector3()`) inside `useFrame` triggers garbage collection stutters. Redundant checking in connection iterations (`i !== j`) doubles the necessary computational work.
**Action:** Always prefer `.distanceToSquared()` by comparing against the squared threshold. Instantiate reusable objects (like `Vector3` or `Object3D`) outside of `useFrame` using `useMemo` and mutate them internally. Use `j > i` instead of `i !== j` for bidirectional network connections.
