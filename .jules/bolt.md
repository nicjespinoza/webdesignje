## 2025-02-18 - Avoid Vector Allocations in Three.js Render Loops
**Learning:** Instantiating new objects (e.g., `new THREE.Vector3()`) inside high-frequency animation loops like `@react-three/fiber`'s `useFrame` generates significant garbage collection overhead, leading to stutters and dropped frames in WebGL applications.
**Action:** When calculating positions or directions frame-by-frame, declare temporary/reusable objects (e.g., `const tempDir = new THREE.Vector3()`) outside the render loop and reuse them internally via `.copy()`, `.subVectors()`, or `.set()`.
