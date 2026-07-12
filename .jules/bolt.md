## 2024-05-22 - Instantiating Objects in useFrame

**Learning:** When using Three.js / @react-three/fiber, repeatedly calling `new THREE.Vector3()` or similar inside a `useFrame` animation loop can cause rapid memory allocations, leading to garbage collection pauses and noticeable stutters during rendering.

**Action:** Declare reusable, mutable objects (like `const tempDir = new THREE.Vector3();`) outside the `useFrame` loop and mutate their properties directly inside the loop (e.g. `tempDir.subVectors(...)`). This prevents unnecessary memory allocation and garbage collection.
